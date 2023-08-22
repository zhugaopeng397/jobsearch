import { useSearchParams } from 'next/navigation'
import { useState } from "react";
import { useRouter } from 'next/router.js';
import nftcontract from '../NFTContract.json';
const {  testauth, uploadFromBuffer, uploadFileToIPFS, uploadJSONToIPFS } = require("../lib/pinata.js");
const ethers = require('ethers');



// const alchemyKey =  process.env.REACT_APP_TESTNET_ALCHEMY_KEY;

// const provider = new ethers.providers.AlchemyProvider(
//   'goerli',
//   alchemyKey
// );

function Listnft() {
    const searchParams = useSearchParams();
    const currAddress = searchParams.get('currAddress');
    const [fileURL, setFileURL] = useState(null);
    const [formParams, updateFormParams] = useState({ name: '', description: '', price: ''});
    const [message, updateMessage] = useState('');

    const router = useRouter();


    async function OnChangeFileForAPI(e) {
        var file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        //check for file extension
        try {
            //upload the file to IPFS
            await fetch('http://localhost:3000/nft/uploadFile', {
                method: 'POST',
                body: formData
            }).then((res) => res.json()).then((res)=>{
                if (res.success == true) {
                    console.log("Uploaded image to Pinata: ", res.pinataURL)
                    setFileURL(res.pinataURL);
                }
            })
        }
        catch(e) {
            console.log("Error during file upload", e);
        }
    }

    async function OnChangeFile(e) {
        var file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        try {
            //upload the file to IPFS
            const response = await uploadFileToIPFS(file);
            console.log("response===",response);
            if(response.success === true) {
                console.log("Uploaded image to Pinata: ", response.pinataURL)
                setFileURL(response.pinataURL);
            }
        }
        catch(error) {
            console.log("Error during file upload", error);
        }
    }

    //This function uploads the metadata to IPFS
    async function uploadMetadataToIPFS() {
        const {name, description, price} = formParams;
        //Make sure that none of the fields are empty
        if( !name || !description || !price || !fileURL)
            return;

        const nftJSON = {
            name, description, price, image: fileURL
        }

        try {
            //upload the metadata JSON to IPFS
            const response = await fetch('http://localhost:3000/nft/listnft', {
                method: 'POST',
                body: nftJSON
            })
            // const response = await uploadJSONToIPFS(nftJSON);
            if(response.result === true){
                console.log("Uploaded JSON to Pinata: ", response)
                return response.pinataURL;
            }
        }
        catch(e) {
            console.log("error uploading JSON metadata:", e)
        }
        return;
    }

    async function listNFT(e) {
        e.preventDefault();

        const {name, description, price} = formParams;
        //Make sure that none of the fields are empty
        if( !name || !description || !price || !fileURL) {
            console.log("fileURL==",fileURL);
            return;
        }
        const nftJSON = {
            name, description, price, image: fileURL
        }
        console.log("nftJSON===",nftJSON);
        console.log("JSON.stringify(nftJSON)===",JSON.stringify(nftJSON));

        try {
            const response = await uploadJSONToIPFS(nftJSON);

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            updateMessage("Please wait.. uploading (upto 5 mins)")

            //Pull the deployed contract instance
            let contractNft = new ethers.Contract(nftcontract.address, nftcontract.abi, signer)


            if(response.success === true){
                console.log("Uploaded JSON to Pinata: ", response.pinataURL);
              
                // const metadataURL = await uploadMetadataToIPFS(metadata);
                const price = ethers.utils.parseUnits(nftJSON.price, 'ether');
                console.log("price===", price);
                let listingPrice = await contractNft.getListPrice();
                listingPrice = listingPrice.toString();
                console.log("listingPrice===", listingPrice);
          
                //actually create the NFT
                let transaction = await contractNft.createToken(response.pinataURL, price, { value: listingPrice });
                await transaction.wait();
                alert("NFT listed successfully!");
            }
            updateMessage("");
            updateFormParams({ name: '', description: '', price: ''});
            setFileURL("");
        }
        catch(error) {
            alert( "error message: " + error);
        }
    }

    const handleGoHome = () => {
        router.push('/');
        // window.location.href = "http://localhost:3010/#";
    }

    return (
        <div className="">
        <a href="/" className="font-bold mt-10 w-full bg-purple-500 text-white rounded p-2 shadow-lg">Back</a>
        <div className="flex flex-col place-items-center mt-10" id="nftForm">
            <form className="bg-white shadow-md rounded px-8 pt-4 pb-8 mb-4">
            <h3 className="text-center font-bold text-purple-500 mb-8">Upload your NFT to the marketplace</h3>
                <div className="mb-4">
                    <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="name">NFT Name</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Axie#4563" 
                    onChange={e => updateFormParams({...formParams, name: e.target.value})} value={formParams.name}></input>
                </div>
                <div className="mb-6">
                    <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="description">NFT Description</label>
                    <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" cols="40" rows="5" id="description" type="text" placeholder="Axie Infinity Collection" 
                    onChange={e => updateFormParams({...formParams, description: e.target.value})} value={formParams.description}></textarea>
                </div>
                <div className="mb-6">
                    <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="price">Price (in ETH)</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" placeholder="Min 0.01 ETH" step="0.01" 
                    onChange={e => updateFormParams({...formParams, price: e.target.value})} value={formParams.price}></input>
                </div>
                <div>
                    <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="image">Upload Image</label>
                    <input type="file" onChange={OnChangeFile} ></input>
                </div>
                <br></br>
                <div className="text-green text-center">{message}</div>
                <button onClick={listNFT} className="font-bold mt-10 w-full bg-purple-500 text-white rounded p-2 shadow-lg">
                    List NFT
                </button>
                {/* <button onClick={handleGoHome} className="font-bold mt-10 w-full bg-purple-500 text-white rounded p-2 shadow-lg">
                    Back
                </button> */}
                <br></br><br></br>
            </form>
        </div>
        </div>
    )
}

export default Listnft;