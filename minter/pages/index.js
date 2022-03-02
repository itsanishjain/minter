import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="mt-8 p-12 rounded-md max-w-lg mx-auto bg-gradient-to-tr from-yellow-400 to-yellow-500  ">
      <p className="text-center text-4xl font-bold">
        Hey 🤗 These are my Projects on NFTs
      </p>
      <div className="space-x-4 mt-4 text-center">
        <Link href="/web3Rocks">
          <a className="text-lg font-medium  text-black cursor-pointer underline ">
            Mint Web3Rocks NFTs
          </a>
        </Link>
      </div>
    </div>
  );
}
