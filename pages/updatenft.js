// import Navbar from "./Navbar";
// import axie from "../tile.jpeg";
import { useLocation, useParams } from 'react-router-dom';
import nftcontract from '../NFTContract.json';
import { useRouter } from 'next/router';

import axios from "axios";
import { useState } from "react";
const {  testauth, uploadFromBuffer, uploadFileToIPFS, uploadJSONToIPFS } = require("../lib/pinata.js");
const ethers = require('ethers');

export default function Updatenft (props) {

    const [data, updateData] = useState({});
    const [dataFetched, updateFetched] = useState(false);
    const [message, updateMessage] = useState("");
    const [currAddress, updateCurrAddress] = useState("0x");
    const [sellPrice, updateSellPrice] = useState("");
    const [metadata, updateMetadata] = useState({ tokenId:'', price: '', seller: '', owner: '', image: '', name: '', description: '', provider: '', enterprise: '', leasing: '', equipstatus: ''});

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
        console.log(listedToken);

        let item = {
            price: meta.price,
            tokenId: tokenId,
            seller: listedToken.seller,
            owner: listedToken.owner,
            image: meta.image,
            name: meta.name,
            description: meta.description,
        }
        console.log(item);
        updateData(item);
        updateMetadata(item);
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

    async function updateNFT(tokenId) {
        const {provider, enterprise, leasing, equipstatus} = metadata;
        //Make sure that none of the fields are empty
       
        // const nftJSON = {
        //     name, description, price, image: fileURL
        // }
        console.log("metadata===",metadata);
        console.log("JSON.stringify(metadata)===",JSON.stringify(metadata));

        try {
            const response = await uploadJSONToIPFS(metadata);

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            updateMessage("Please wait.. uploading (upto 5 mins)")

            //Pull the deployed contract instance
            let contractNft = new ethers.Contract(nftcontract.address, nftcontract.abi, signer)

            if(response.success === true){
                console.log("Uploaded JSON to Pinata: ", response.pinataURL);
              
                //actually udpate the NFT's metadata, tokenId won't be changed.
                let transaction = await contractNft.updateToken(response.pinataURL, tokenId);
                await transaction.wait();
                alert("NFT's metadata updated successfully!");
            }
            updateMessage("");
            updateMetadata({ tokenId:'', price: '', seller: '', owner: '', image: '', name: '', description: '', provider: '', enterprise: '', leasing: '', equipstatus: ''});
        }
        catch(error) {
            alert( "error message: " + error);
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
                <img src={metadata.image} alt="" className="w-2/5" />
                <div className="text-xl ml-20 space-y-8 shadow-2xl rounded-lg border-2 p-5">
                    <div>
                        设备名称: {metadata.name}
                    </div>
                    <div>
                        设备信息: {metadata.description}
                    </div>
                    <div>
                        交易价格: <span className="">{metadata.price + " ETH"}</span>
                    </div>
                    <div>
                        拥有者: <span className="text-sm">{metadata.owner}</span>
                    </div>
                    <div>
                        卖方: <span className="text-sm">{metadata.seller}</span>
                    </div>
                    <div>
                        设备供应商: <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="provider" type="text" placeholder="大族激光" 
                            onChange={e => updateMetadata({...metadata, provider: e.target.value})} value={metadata.provider}></input>
                    </div>
                    <div>
                        租赁公司: <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="leasing" type="text" placeholder="平安租赁" 
                            onChange={e => updateMetadata({...metadata, leasing: e.target.value})} value={metadata.leasing}></input>
                    </div>
                    <div>
                        小微企业: <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="enterprise" type="text" placeholder="小微企业" 
                            onChange={e => updateMetadata({...metadata, enterprise: e.target.value})} value={metadata.enterprise}></input>
                    </div>
                    <div>
                        设备状态: <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="equipstatus" type="text" placeholder="已结清" 
                            onChange={e => updateMetadata({...metadata, equipstatus: e.target.value})} value={metadata.equipstatus}></input>
                    </div>
                    <div>
                    
                    <button className="enableEthereumButton bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm" onClick={() => updateNFT(tokenId)}>Update this NFT</button>
                    <div className="text-green text-center mt-3">{message}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}