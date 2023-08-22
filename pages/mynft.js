// import Navbar from "./Navbar";
import { useLocation, useParams } from 'react-router-dom';
import nftcontract from '../NFTContract.json';
import axios from "axios";
import { useState } from "react";
import NFTTile from "./nfttile";
import { useRouter } from 'next/router';

const alchemyApiKey = process.env.REACT_APP_TESTNET_ALCHEMY_KEY;

function Mynft() {
    const [data, updateData] = useState([]);
    const [dataFetched, updateFetched] = useState(false);
    const [address, updateAddress] = useState("0x");
    const [totalPrice, updateTotalPrice] = useState("0");
    
    const { Network, Alchemy } = require('alchemy-sdk');
    const settings = {
        apiKey: alchemyApiKey, // Replace with your Alchemy API Key.
        network: Network.ETH_GOERLI, // Replace with your network.
    };
    const alchemy = new Alchemy(settings);

    async function getNFTDataWithAPI() {
        let sumPrice = 0;
        const ethers = require("ethers");
        //After adding your Hardhat network to your metamask, this code will get providers and signers
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        
        const signer = provider.getSigner();
        const addr = await signer.getAddress();
        const options = {
            contractAddresses: [nftcontract.address]
        };
        const nfts = await alchemy.nft.getNftsForOwner(addr, options).then((res) => {
            return res.ownedNfts.map(i=>{
                let price = i.rawMetadata.price;
                let nft = {
                    price,
                    tokenId: i.tokenId,
                    name: i.rawMetadata.name,
                    image: i.rawMetadata.image,
                    description: i.rawMetadata.description,
                }
                sumPrice += Number(price);
                return nft;
            })
        });
        updateData(nfts);
        updateFetched(true);
        updateAddress(addr);
        updateTotalPrice(sumPrice.toPrecision(3));
    }

    const router = useRouter();
    const currAddress = router.query.currAddress;

    console.log("currAddress===",currAddress);
    if(!dataFetched)
        getNFTDataWithAPI();

    return (
        <div className="profileClass" style={{"minHeight":"100vh"}}>
            {/* <Navbar></Navbar> */}
            {/* <Link href={{pathname:'/',
                         query:{currAddress:currAddress}
                        }}>Back</Link> */}
            <a href="/" className="font-bold mt-10 w-full bg-purple-500 text-white rounded p-2 shadow-lg">Back</a>
            <div className="profileClass">
            <div className="flex text-center flex-col mt-11 md:text-2xl text-purple-500">
                <div className="mb-5">
                    <h2 className="font-bold">Wallet Address</h2>  
                    {address}
                </div>
            </div>
            <div className="flex flex-row text-center justify-center mt-10 md:text-2xl text-purple-500">
                    <div>
                        <h2 className="font-bold">No. of NFTs</h2>
                        {data.length}
                    </div>
                    <div className="ml-20">
                        <h2 className="font-bold">Total Value</h2>
                        {totalPrice} ETH
                    </div>
            </div>
            <div className="flex flex-col text-center items-center mt-11 text-purple-500">
                <h2 className="font-bold">Your NFTs</h2>
                <div className="flex justify-center flex-wrap max-w-screen-xl">
                    {data.map((value, index) => {
                    return <NFTTile data={value} key={index}></NFTTile>;
                    })}
                </div>
                <div className="mt-10 text-xl">
                    {data.length == 0 ? "Oops, No NFT data to display (Are you logged in?)":""}
                </div>
            </div>
            </div>
        </div>
    )
}

export default Mynft;