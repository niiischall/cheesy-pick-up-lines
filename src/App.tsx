import React, { useEffect, useState, useCallback } from "react";
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
    color: "##d1495b",
    fontFamily: "Poppins",
    fontWeight: 500,
  },
  "& label": {
    color: "#d1495b",
    fontFamily: "Poppins",
    fontWeight: 500,
    marginRight: "5px",
  },
  "& label.Mui-focused": {
    color: "#d1495b",
    fontFamily: "Poppins",
    fontWeight: 500,
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#d1495b",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderWidth: "2.5px",
      borderColor: "#d1495b",
    },
    "&:hover fieldset": {
      borderColor: "#d1495b",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#d1495b",
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
  const [twitterShare, setTwitterShare] = useState<any>(null);
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

  const shareOnTwitter = (message: any) => {
    setTwitterShare(null);
    ReactGA.event({
      category: "SOCIAL_SHARE",
      action: "COPY_TEXT",
      label: "TWITTER",
    });
    setTwitterShare(message);
    setOpenShareDialog(true);
  };

  const handleNetworkSwitch = async () => {
    setError("");
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: `0x${Number(4).toString(16)}` }],
    });
  };

  const handleShare = (event: any) => {
    event.preventDefault();
    console.log("Share!");
    const add = twitterShare.address.substr(0, 7);
    navigator.clipboard.writeText(
      `🧀🧀🧀\n${twitterShare.line}\n🧀🧀🧀\n\n#pickuplines #${add}`
    );
    handleShareDialogClose(event);
    setOpenSnackbar(true);
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
    <div className="mainContainer">
      <div className="shownews">
        <div id="news">
          <h3 id="text">
            New to Web3?{" "}
            <a
              className="shownews-link"
              href="https://sassy-beast-257.notion.site/Web3-Apps-for-Dummies-104b941995a548838d8070937b0cc46c"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read this!
            </a>{" "}
            🚀
          </h3>
        </div>
      </div>
      <header className="header">
        <div className="super-header">
          <span>
            Stand a chance to win ₹1000 worth of ETH! Send an OG 🧀 pick up line
            before
            <br className="super-header-break" /> 30th of April, 2022.
          </span>
        </div>
        <h1 className="heading">🧀 Pick Up Lines</h1>
      </header>
      <main className="dataContainer">
        {!currentAccount ? (
          <div className="welcome-container">
            <div className="wallet-connect">
              <Button
                variant="contained"
                startIcon={<Plugs size={32} weight="light" />}
                onClick={() => connectWallet()}
                style={{
                  width: 250,
                  height: 64,
                  margin: "16px auto",
                  fontFamily: "Poppins",
                  fontWeight: 500,
                }}
                color="secondary"
              >
                {!window.ethereum ? "Get A Wallet" : "Connect Wallet"}
              </Button>
              <p>It's free. It's cupid. It's Web3.0!</p>
            </div>
            {error && <p className="error-message">{error}</p>}
            <div className="bio">
              <div className="bio-section">
                <img
                  src="/assets/love-remember.png"
                  className="bio-section-icon"
                  alt="Love Remember"
                />
                <h1>
                  Can’t find the right words to say to that special someone?
                </h1>
              </div>
              <div className="bio-section">
                <h1>These cheesy pickup lines may be corny...</h1>
                <img
                  src="/assets/everywhere-together.png"
                  className="bio-section-icon"
                  alt="Everywhere Together"
                />
              </div>
              <div className="bio-section">
                <img
                  src="/assets/spread-love.png"
                  className="bio-section-icon"
                  alt="Spread Love"
                />
                <h1>But they’re sure to make someone crack a smile.</h1>
              </div>
              <div className="bio-section">
                <h1>If you’re bold enough to try them out!</h1>
                <img
                  src="/assets/intense-feeling.png"
                  className="bio-section-icon"
                  alt="Intense Feeling"
                />
              </div>
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
                  {!window.ethereum ? "Get A Wallet" : "Connect Wallet"}
                </Button>
              </div>
            </div>
          </div>
        ) : (
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
              <Heart size={32} weight="fill" color="#d1495b" />
            </IconButton>
          </form>
        )}
        <div className="loader-container">
          {loading && <LinearProgress color="secondary" />}
        </div>
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
                    onClick={() => shareOnTwitter(line)}
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
            vertical: "top",
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
      </main>
      <footer className="footer">
        <h3 style={{ marginRight: 10 }}>Built by </h3>
        <TwitterLogo color="#00acee" size={32} weight="fill"></TwitterLogo>
        <h3>
          <a
            href="https://twitter.com/niiischall"
            target="_blank"
            rel="noopener noreferrer"
          >
            @niiischall
          </a>
        </h3>
      </footer>
      <ConnectWallletDialog
        open={openWalletDialog}
        onClose={handleWalletDialogClose}
      />
      <ShareQuoteDialog
        open={openShareDialog}
        onShare={handleShare}
        onClose={handleShareDialogClose}
      />
    </div>
  );
}
