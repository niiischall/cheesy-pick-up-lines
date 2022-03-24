import { useEffect, useState, useCallback } from "react";
import { ethers } from "ethers";
import { Heart, Plugs, TwitterLogo } from "phosphor-react";
import {
  TextField,
  Button,
  IconButton,
  LinearProgress,
  Snackbar,
  styled,
} from "@material-ui/core";
import ReactGA from "react-ga";
import { SnackbarOrigin } from "@material-ui/core/Snackbar";
import moment from "moment";

import "./App.css";
import ConnectWallletDialog from "./ConnectWalletDialog";
import { ShareQuoteDialog } from "./ShareQuoteDialog";
import abi from "./utils/PickUpLines.json";

declare global {
  interface Window {
    ethereum: any;
  }
}

const CustomTextField = styled(TextField)({
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

const contractAddress = "0x3740805a2A54a8C8A60faa3fD89A7840f71e3505";
const contractABI = abi.abi;

ReactGA.initialize("G-36EJ961NWW", { debug: true });

export interface State extends SnackbarOrigin {
  open: boolean;
}

export default function App() {
  const [currentAccount, setCurrentAccount] = useState("");
  const [allLines, setAllLines] = useState<any[]>([]);
  const [message, setMessage] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [openWalletDialog, setOpenWalletDialog] = useState<boolean>(false);
  const [openShareDialog, setOpenShareDialog] = useState<boolean>(false);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

  const pageTracking = () => {
    if (window.location.pathname) {
      ReactGA.pageview(window.location.pathname);
    }
  };

  const pickup = async () => {
    try {
      setError("");
      ReactGA.event({
        category: "WEBSITE_INTERACTION",
        action: "POST_LINE",
        label: "SUBMIT",
      });
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        setLoading(true);
        let contractTxn = await contract.newLine(message, { gasLimit: 300000 });
        await contractTxn.wait();
        setLoading(false);
        setMessage("");
      }
    } catch (error: any) {
      setError("Failed transaction 🤨! Wanna try again?");
      setMessage("");
      setLoading(false);
    }
  };

  const getLines = async () => {
    try {
      setError("");
      ReactGA.event({
        category: "WEBSITE_INTERACTION",
        action: "GET_LINES",
        label: "FETCH",
      });
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const Contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        const lines = await Contract.getAllLines();
        let linesCleaned: any[] = [];
        lines.forEach((line: any) => {
          linesCleaned.push({
            address: line.writer,
            timestamp: new Date(line.timestamp * 1000),
            line: line.line,
          });
        });
        setAllLines(linesCleaned);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      setError("Connect your wallet to see what's been 🧑‍🍳");
      console.log(error);
    }
  };

  const checkIfWalletIsConnected = useCallback(async () => {
    try {
      setError("");
      const { ethereum } = window;
      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length !== 0) {
        const account = accounts[0];
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found");
      }
    } catch (error) {
      setError("Failed transaction 🤨! Wanna try again?");
      console.log(error);
    }
  }, []);

  const connectWallet = async () => {
    try {
      setError("");
      ReactGA.event({
        category: "WEBSITE_INTERACTION",
        action: "CONNECT_WALLET",
        label: "CONNECT",
      });
      const { ethereum } = window;
      if (!ethereum) {
        setOpenWalletDialog(true);
        return;
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      setError("Failed transaction 🤨! Wanna try again?");
      console.log(error);
    }
  };

  useEffect(() => {
    let contract: any;
    const onNewLine = (from: string, timestamp: any, line: string) => {
      setAllLines((prevState: any[]) => [
        ...prevState,
        {
          address: from,
          timestamp: new Date(timestamp * 1000),
          line: line,
        },
      ]);
    };

    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      contract = new ethers.Contract(contractAddress, contractABI, signer);
      contract.on("NewPickUpLine", onNewLine);
    }

    return () => {
      if (contract) {
        contract.off("NewPickUpLine", onNewLine);
      }
    };
  }, []);

  const handleChange = (event: any) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    pickup();
  };

  const handleWalletDialogClose = (event: any) => {
    event.preventDefault();
    setOpenWalletDialog(false);
  };

  const handleShareDialogClose = (event: any) => {
    console.log("close share dialog!");
    event.preventDefault();
    setOpenShareDialog(false);
  };

  const handleSnackbarClose = (event: any) => {
    event.preventDefault();
    setOpenSnackbar(false);
  };

  const shareOnTwitter = (message: string) => {
    ReactGA.event({
      category: "SOCIAL_SHARE",
      action: "COPY_TEXT",
      label: "TWITTER",
    });
    setOpenShareDialog(true);
  };

  const handleNetworkSwitch = async () => {
    setError("");
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: `0x${Number(4).toString(16)}` }],
    });
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [checkIfWalletIsConnected]);

  useEffect(() => {
    const { ethereum } = window;
    if (ethereum) {
      getLines();
    }
  }, [currentAccount]);

  useEffect(() => {
    const { ethereum } = window;
    if (ethereum) {
      handleNetworkSwitch();
    }
  }, [currentAccount]);

  useEffect(() => {
    pageTracking();
  }, []);

  return (
    <main className="mainContainer">
      <header className="header">
        <div className="super-header">
          <span>
            Stand a chance to win ₹1000 worth of ETH! Send an OG 🧀 pick-up line
            before 30th of April, 2022.
          </span>
        </div>
        <h1 className="heading">🧀 Pick Up Lines</h1>
      </header>
      <div className="dataContainer">
        <div className="bio">
          <p>
            Can’t find the right words to say to that special someone? These
            cheesy pickup lines may be corny, but they’re sure to make someone
            crack a smile if you’re bold enough to try them out!
          </p>
        </div>
        {!currentAccount && (
          <div className="wallet-connect">
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
          </div>
        )}
        {currentAccount && (
          <form className="form-box" onSubmit={handleSubmit}>
            <CustomTextField
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
        {error && <p className="error-message">{error}</p>}
        {loading && <LinearProgress color="secondary" />}
        <div className="message-container">
          {allLines.map((line: any, index: number) => {
            const d = new Date(line.timestamp.toString());
            const time = moment.utc(d).local().startOf("seconds").fromNow();
            return (
              <div key={index} className="message-section">
                <div className="message-box">
                  <h1 className="message-heading">{line.line}</h1>
                  <div className="message-details">
                    <h3 className="message-text-address">✍🏻 {line.address}</h3>
                    <h5 style={{ color: "#7678ED" }}>{time}</h5>
                  </div>
                </div>
                <div className="twitter-box">
                  <IconButton
                    onClick={() => shareOnTwitter(line.line)}
                    style={{
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <TwitterLogo color="#00acee" size={32} weight="fill" />
                  </IconButton>
                </div>
              </div>
            );
          })}
        </div>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={openSnackbar}
          onClose={handleSnackbarClose}
          autoHideDuration={1000}
        >
          <div className="snackbar">
            <span>Copied to Clipboard. Tweet it!</span>
          </div>
        </Snackbar>
      </div>
      <ConnectWallletDialog
        open={openWalletDialog}
        onClose={handleWalletDialogClose}
      />
      <ShareQuoteDialog
        open={openShareDialog}
        onClose={handleShareDialogClose}
      />
    </main>
  );
}
