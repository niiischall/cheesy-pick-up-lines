import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import "./App.css";

import abi from "./utils/WavePortal.json";

declare global {
  interface Window {
    ethereum: any;
  }
}

const contractAddress = "0x58D5e5D33512B1A178402dCe2C7841e6619Ec7C0";
const contractABI = abi.abi;

export default function App() {
  const [currentAccount, setCurrentAccount] = useState("");

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

        let waveCount = await wavePortalContract.getTotalWaves();
        console.log("Total Waves: " + waveCount);

        console.log("---------------------------------");

        const waveTransact = await wavePortalContract.wave();
        console.log("Mining..." + waveTransact.hash);

        await waveTransact.wait();
        console.log("Mined --" + waveTransact.hash);
        console.log("---------------------------------");

        waveCount = await wavePortalContract.getTotalWaves();
        console.log("Total Waves: " + waveCount);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfWalletIsConnected = async () => {
    try {
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
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found");
      }
    } catch (error) {
      console.log(error);
    }
  };

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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <div className="mainContainer">
      <div className="dataContainer">
        <div className="header">👋 Hey there!</div>

        <div className="bio">
          <p>I am Nischal and I build stuff that live on the internet.</p>
          <p>Connect your Ethereum wallet and wave at me!</p>
        </div>
        <button className="waveButton" onClick={wave}>
          Wave at Me
        </button>
        {!currentAccount && (
          <button className="waveButton" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  );
}
