import React, { useEffect, useState, useCallback } from "react";
import { ethers } from "ethers";
import { Heart, Plugs } from "phosphor-react";
import {
  TextField,
  Button,
  IconButton,
  LinearProgress,
  styled,
} from "@material-ui/core";
import "./App.css";

import abi from "./utils/WavePortal.json";

declare global {
  interface Window {
    ethereum: any;
  }
}

const CssTextField = styled(TextField)({
  "& textarea": {
    color: "#ffffff",
    fontFamily: "Poppins",
    fontWeight: 500,
  },
  "& label": {
    color: "white",
    fontFamily: "Poppins",
    fontWeight: 500,
    marginRight: "5px",
  },
  "& label.Mui-focused": {
    color: "white",
    fontFamily: "Poppins",
    fontWeight: 500,
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "yellow",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderWidth: "2.5px",
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "yellow",
    },
    "&.Mui-focused fieldset": {
      borderColor: "yellow",
    },
  },
});

const contractAddress = "0xC9A2992E7303334cEe47Ae3779de2bd0CF84140F";
const contractABI = abi.abi;

export default function App() {
  const [currentAccount, setCurrentAccount] = useState("");
  const [allWaves, setAllWaves] = useState<any[]>([]);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const wave = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        setLoading(true);
        let waveTxn = await wavePortalContract.wave(message);
        await waveTxn.wait();
        waveSuccess();
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const waveSuccess = () => {
    setLoading(false);
    setMessage("");
    getWaves();
  };

  const getWaves = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        const waves = await wavePortalContract.getAllWaves();
        let wavesCleaned: any[] = [];
        waves.forEach((wave: any) => {
          wavesCleaned.push({
            address: wave.waver,
            timestamp: new Date(wave.timestamp * 1000),
            message: wave.message,
          });
        });
        setAllWaves(wavesCleaned);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfWalletIsConnected = useCallback(
    () => async () => {
      try {
        const { ethereum } = window;
        if (!ethereum) {
          console.log("Make sure you have metamask!");
          return;
        } else {
          console.log("We have the ethereum object", ethereum);
          getWaves();
        }
        const accounts = await ethereum.request({ method: "eth_accounts" });
        if (accounts.length !== 0) {
          const account = accounts[0];
          console.log("Found an authorized account:", account);
          setCurrentAccount(account);
        } else {
          console.log("No authorized account found");
        }
      } catch (error) {
        console.log(error);
      }
    },
    []
  );

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
      getWaves();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [checkIfWalletIsConnected]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    wave();
  };

  return (
    <main className="mainContainer">
      <header className="header">
        <div className="super-header">
          <span>
            Stand a chance to win ₹500 worth of ETH! Send an OG 🧀 pick-up line
            before 31st of March, 2022.
          </span>
        </div>
        <h1 className="heading">🧀 Cheesy Pick-Up Lines</h1>
      </header>
      <div className="dataContainer">
        <div className="bio">
          <p>
            Can’t find the right words to say to that special someone? These
            cheesy pickup lines may be corny, but they’re sure to make someone
            crack a smile if you’re bold enough to try them out!
          </p>
        </div>
        <div className="wallet-connect">
          {!currentAccount && (
            <Button
              variant="contained"
              startIcon={<Plugs size={32} weight="light" />}
              onClick={() => connectWallet()}
              style={{
                width: 250,
                height: 64,
                margin: "0px auto",
                fontFamily: "Poppins",
                fontWeight: 500,
              }}
              color="secondary"
            >
              Connect Wallet
            </Button>
          )}
        </div>
        {currentAccount && (
          <form className="form-box" onSubmit={handleSubmit}>
            <CssTextField
              id="message-field"
              label="Get super cheesy!"
              multiline
              maxRows={4}
              value={message}
              variant="outlined"
              style={{ width: 320 }}
              onChange={handleChange}
            />
            <IconButton
              type="submit"
              style={{ marginLeft: 10, backgroundColor: "transparent" }}
            >
              <Heart size={32} weight="fill" color="#ffffff" />
            </IconButton>
          </form>
        )}
        {loading && <LinearProgress color="secondary" />}
        <div className="message-container">
          {allWaves.map((wave: any, index: number) => {
            const d = new Date(wave.timestamp.toString());
            return (
              <div key={index} className="message-box">
                <div className="message">
                  <p className="message-text">
                    <strong>🕰️</strong>
                    <br />
                    <em>{d.toLocaleString("en-IN")}</em>
                  </p>
                </div>
                <div className="message">
                  <p className="message-text">
                    <strong>🧀</strong>
                    <br />
                    {wave.message}
                  </p>
                </div>
                <div className="message">
                  <p className="message-text-address">
                    <strong>✍🏻</strong>
                    <br />
                    {wave.address}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
