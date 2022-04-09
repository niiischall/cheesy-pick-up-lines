import React, { useEffect, useState, useCallback } from "react";
import { ethers } from "ethers";
import ReactGA from "react-ga";
import confetti from "canvas-confetti";
import { AbiItem } from "web3-utils";
import moment from "moment";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";

import Layout from "./containers/Layout";
import Header from "./components/Header";
import Banner from "./components/Banner";
import Footer from "./components/Footer";

import "./App.css";
import abi from "./utils/PickUpLines.json";

declare global {
  interface Window {
    ethereum: any;
  }
}

const contractAddress = "0x3740805a2A54a8C8A60faa3fD89A7840f71e3505";
const alchemyAddress =
  "https://eth-rinkeby.alchemyapi.io/v2/IcCFxDBw6Fb-Cbgsdt-hLFSZar5Inmm-";
const contractABI = abi.abi;
ReactGA.initialize("G-36EJ961NWW", { debug: true });
const confettiDuration = 5 * 1000;
const confettiEnd = Date.now() + confettiDuration;

export const App: React.FC<{}> = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [allLines, setAllLines] = useState<any[]>([]);
  const [message, setMessage] = useState<string>("");

  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [twitterShare, setTwitterShare] = useState<any>(null);
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
      setSubmitSuccess(false);
      ReactGA.event({
        category: "WEBSITE_INTERACTION",
        action: "POST_LINE",
        label: "SUBMIT",
      });
      const { ethereum } = window;
      if (ethereum && contractAddress) {
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
        setSubmitSuccess(true);
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
      ReactGA.event({
        category: "WEBSITE_INTERACTION",
        action: "GET_LINES",
        label: "FETCH",
      });
      if (window.ethereum && contractAddress) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
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
        linesCleaned.sort((x: any, y: any) => {
          const nextInSecond: any = moment(y.timestamp).toDate();
          const firstInSecond: any = moment(x.timestamp).toDate();
          return nextInSecond - firstInSecond;
        });
        setAllLines(linesCleaned);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getLinesFromAlch = async () => {
    const web3 = createAlchemyWeb3(alchemyAddress);
    const Contract: any = new web3.eth.Contract(
      contractABI as AbiItem[],
      contractAddress
    );

    const lines = await Contract.methods.getAllLines().call();
    let linesCleaned: any[] = [];
    lines.forEach((line: any) => {
      linesCleaned.push({
        address: line.writer,
        timestamp: new Date(line.timestamp * 1000),
        line: line.line,
      });
    });
    linesCleaned.sort((x: any, y: any) => {
      const nextInSecond: any = moment(y.timestamp).toDate();
      const firstInSecond: any = moment(x.timestamp).toDate();
      return nextInSecond - firstInSecond;
    });
    setAllLines(linesCleaned);
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

  const handleFeedExplore = (event: any) => {
    event.preventDefault();
  };

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
    const add = twitterShare.address.substr(0, 7);
    navigator.clipboard.writeText(
      `🧀🧀🧀\n${twitterShare.line}\n🧀🧀🧀\n\n#pickuplines #${add}`
    );
    handleShareDialogClose(event);
    setOpenSnackbar(true);
  };

  const handleConfetti = useCallback(() => {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
    });

    // keep going until we are out of time
    if (Date.now() < confettiEnd) {
      requestAnimationFrame(handleConfetti);
    }
  }, []);

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [checkIfWalletIsConnected]);

  useEffect(() => {
    if (currentAccount) {
      getLines();
    } else {
      getLinesFromAlch();
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

  useEffect(() => {
    let contract: any;
    const { ethereum } = window;
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
    if (ethereum && contractAddress) {
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

    if (window.ethereum && contractAddress) {
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

  useEffect(() => {
    if (submitSuccess) {
      handleConfetti();
    }
  }, [submitSuccess, handleConfetti]);

  return (
    <div className="mainContainer">
      <Banner />
      <Header />
      <Layout
        allLines={allLines}
        error={error}
        loading={loading}
        message={message}
        submitSuccess={submitSuccess}
        openWalletDialog={openWalletDialog}
        openShareDialog={openShareDialog}
        openSnackbar={openSnackbar}
        currentAccount={currentAccount}
        connectWallet={connectWallet}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleWalletDialogClose={handleWalletDialogClose}
        handleShare={handleShare}
        handleShareDialogClose={handleShareDialogClose}
        handleSnackbarClose={handleSnackbarClose}
        handleFeedExplore={handleFeedExplore}
        shareOnTwitter={shareOnTwitter}
      />
      <Footer />
    </div>
  );
};

export default App;
