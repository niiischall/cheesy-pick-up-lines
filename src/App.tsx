import { useEffect, useState, useCallback } from "react";
import { ethers } from "ethers";
import ReactGA from "react-ga";

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

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
const contractABI = abi.abi;

ReactGA.initialize("G-36EJ961NWW", { debug: true });

export const App:React.FC<{}> = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [allLines, setAllLines] = useState<any[]>([]);
  const [message, setMessage] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [openWalletDialog, setOpenWalletDialog] = useState<boolean>(false);
  const [twitterShare, setTwitterShare] = useState<any>(null);
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
    console.log(twitterShare);
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

  return (
    <div className="mainContainer">
      <Banner />
      <Header />
      <Layout
        allLines={allLines}
        error={error}
        loading={loading}
        message={message}
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
        shareOnTwitter={shareOnTwitter}
      />
      <Footer />
    </div>
  );
}

export default App;