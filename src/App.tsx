import React from "react";
import { ethers } from "ethers";
import "./App.css";

export default function App() {
  const wave = () => {
    console.log('Wave!');
  };

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
      </div>
    </div>
  );
}
