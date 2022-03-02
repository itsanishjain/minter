import { Contract, providers, utils } from "ethers";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import Web3Modal from "web3modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Card from "../src/components/Card";
import Button from "../src/components/Button";
import Loader from "../src/components/Loader";

import { abi, NFT_CONTRACT_ADDRESS } from "../src/constants";
import Form from "../src/components/Form";

export default function Web3Rocks() {
  const [walletConnected, setWalletConnected] = useState(false);

  const [loading, setLoading] = useState(false);
  const [tokenIdsMinted, setTokenIdsMinted] = useState("0");
  const [nftUrl, setNftUrl] = useState(false);

  const web3ModalRef = useRef();

  const publicMint = async () => {
    try {
      const signer = await getProviderOrSigner(true);

      const whitelistContract = new Contract(NFT_CONTRACT_ADDRESS, abi, signer);

      const tx = await whitelistContract.mint({
        value: utils.parseEther("0.01"),
      });
      setLoading(true);
      await tx.wait();
      setLoading(false);
      setNftUrl(true);
      toast("You successfully minted a web3Rocks!");
    } catch (err) {
      console.error(err);
    }
  };

  const connectWallet = async () => {
    try {
      await getProviderOrSigner();
      setWalletConnected(true);
    } catch (err) {
      console.error(err);
    }
  };

  const getTokenIdsMinted = async () => {
    try {
      const provider = await getProviderOrSigner();
      const nftContract = new Contract(NFT_CONTRACT_ADDRESS, NFT_CONTRACT_ABI, provider);
      const _tokenIds = await nftContract.tokenIds();
      setTokenIdsMinted(_tokenIds.toString());
    } catch (err) {
      console.error(err);
    }
  };

  const getProviderOrSigner = async (needSigner = false) => {
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);
    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 4) {
      window.alert("Change the network to Rinkeby");
      throw new Error("Change network to Rinkeby");
    }

    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };

  useEffect(() => {
    if (!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        network: "rinkeby",
        providerOptions: {},
        disableInjectedProvider: false,
      });
      connectWallet();
      // getTokenIdsMinted();
    }
  }, [walletConnected]);

  const renderButton = () => {
    if (!walletConnected)
      return <Button text={"Connect your wallet"} onClick={connectWallet} />;
    if (loading) return <Loader />;
    else {
      return <Button onClick={publicMint} text="Public Mint 🚀" />;
    }
  };

  return (
    <div className="m-2">
      <Head>
        <title>Web3 Rocks</title>
        <meta name="description" content="Whitelist-Dapp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastContainer />

      <Card
        name="Welcome to Web3 Rocks!"
        designation={`Its an NFT collection for developers in Web3 ${tokenIdsMinted}/20 have been minted `}
        imageUrl="rocket.svg"
      />
      {nftUrl && (
        <div className="text-center mt-4">
          <a
            className="text-lg font-medium  text-black cursor-pointer underline"
            href={`https://testnets.opensea.io/assets/${NFT_CONTRACT_ADDRESS}/${tokenIdsMinted}`}
          >
            Here is your NFT
          </a>
        </div>
      )}

      
        
      <Form />

      <div className="max-w-sm mx-auto text-center mt-8 text-xl font-medium ">
        {renderButton()}
      </div>
    </div>
  );
}
