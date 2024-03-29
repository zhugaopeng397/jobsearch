// import Navbar from "./Navbar";
// import axie from "../tile.jpeg";
import { useLocation, useParams } from 'react-router-dom';
import nftcontract from '../NFTContract.json';
import { useRouter } from 'next/router';

import axios from "axios";
import { useState } from "react";

export default function NFTPage (props) {

    const [data, updateData] = useState({});
    const [dataFetched, updateFetched] = useState(false);
    const [message, updateMessage] = useState("");
    const [currAddress, updateCurrAddress] = useState("0x");
    const [sellPrice, updateSellPrice] = useState("");

    async function getNFTData(tokenId) {
        const ethers = require("ethers");
        //After adding your Hardhat network to your metamask, this code will get providers and signers
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        console.log("signer===",signer);
        //Pull the deployed contract instance
        let contract = new ethers.Contract(nftcontract.address, nftcontract.abi, signer)
        //create an NFT Token
        const tokenURI = await contract.tokenURI(tokenId);
        const listedToken = await contract.getListedTokenForId(tokenId);
        let meta = await axios.get(tokenURI);
        meta = meta.data;
        console.log("metadata==",meta);

        let item = {
            price: meta.price,
            tokenId: tokenId,
            seller: listedToken.seller,
            owner: listedToken.owner,
            image: meta.image,
            name: meta.name,
            description: meta.description,
            provider: meta.provider,
            enterprise: meta.enterprise, 
            leasing: meta.leasing, 
            equipstatus: meta.equipstatus
        }
        console.log(item);
        updateData(item);
        updateFetched(true);
        
        updateCurrAddress(await signer.getAddress());
    }

    async function buyNFT(tokenId) {
        try {
            const ethers = require("ethers");
            //After adding your Hardhat network to your metamask, this code will get providers and signers
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            //Pull the deployed contract instance
            let contract = new ethers.Contract(nftcontract.address, nftcontract.abi, signer);
            const salePrice = ethers.utils.parseUnits(data.price, 'ether')
            let transaction = await contract.executeSale(tokenId, {value:salePrice});
            await transaction.wait();
            updateMessage("You successfully bought the NFT!");
            alert('You successfully bought the NFT!');
        }
        catch(e) {
            updateMessage("Upload Error");
            alert("Upload Error"+e)
        }
    }

    async function sellNFT(tokenId) {
        try {
            const ethers = require("ethers");
            //After adding your Hardhat network to your metamask, this code will get providers and signers
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            //Pull the deployed contract instance
            let contract = new ethers.Contract(nftcontract.address, nftcontract.abi, signer);
            const price = ethers.utils.parseUnits(sellPrice, 'ether')
            let listingPrice = await contract.getListPrice()
            listingPrice = listingPrice.toString()
            //actually create the NFT
            let transaction = await contract.resellNft(tokenId, price, { value: listingPrice })
            await transaction.wait()
            
            updateMessage("Successfully listed your NFT!");
            alert("Successfully listed your NFT!");
        }
        catch(e) {
            updateMessage("Upload Error");
            alert("Upload Error"+e)
        }
    }

    const router = useRouter();
    const tokenId = router.query.tokenId;
    console.log("router.query===",tokenId);

    if(!dataFetched)
        getNFTData(tokenId);

    return(
        <div style={{"minHeight":"100vh"}}>
            {/* <Navbar></Navbar> */}
            <a href="/" className="font-bold mt-10 w-full bg-purple-500 rounded p-2 shadow-lg">Back</a>
            <div className="flex ml-20 mt-20">
                <img src={data.image} alt="" className="w-2/5" />
                <div className="text-xl ml-20 space-y-8 shadow-2xl rounded-lg border-2 p-5">
                    <div>
                        设备名称: {data.name}
                    </div>
                    <div>
                        设备描述: {data.description}
                    </div>
                    <div>
                        设备价格: <span className="">{data.price + " ETH"}</span>
                    </div>
                    <div>
                        设备拥有者: <span className="text-sm">{data.owner}</span>
                    </div>
                    <div>
                        设备卖方: <span className="text-sm">{data.seller}</span>
                    </div>
                    <div>
                        当前地址: <span className="text-sm">{currAddress}</span>
                    </div>
                    <div>
                        设备供应商: <span className="text-sm">{data.provider}</span>
                    </div>
                    <div>
                        租赁公司: <span className="text-sm">{data.leasing}</span>
                    </div>
                    <div>
                        小微企业: <span className="text-sm">{data.enterprise}</span>
                    </div>
                    <div>
                        设备状态:<span className="text-sm">{data.equipstatus}</span>
                    </div>
                    <div>
                    { currAddress == data.owner || currAddress == data.seller ?
                        <div className="text-emerald-700"><p>You are the owner of this NFT </p>
                        <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="price">Price (in ETH)</label>
                          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Min 0.01 ETH" step="0.01" type="number" value={sellPrice} onChange={e => updateSellPrice(e.target.value)}></input>
                          <button className="enableEthereumButton bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm" onClick={() => sellNFT(tokenId)}>Sell this NFT</button>
                        </div>
                        : <button className="enableEthereumButton bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm" onClick={() => buyNFT(tokenId)}>Buy this NFT</button>
                    }
                    
                    <div className="text-green text-center mt-3">{message}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}