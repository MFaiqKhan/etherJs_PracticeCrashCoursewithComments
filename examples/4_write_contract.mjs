// Writing smart contracts using ether.js
// using testnet 
// using link token to send from one address to another address


import { ethers } from 'ethers';
import "dotenv/config";	

const API_KEY = process.env.INFURA_API_KEY
const provider = new ethers.providers.JsonRpcProvider(`https://rinkeby.infura.io/v3/${API_KEY}`)

const senderAddress = process.env.senderAddress;
const recipientAddress = "0xC8285Dda852BBdAd41C966D6fF92eAA0d9961556" 

const privateKey = process.env.privateKey;
const wallet = new ethers.Wallet(privateKey, provider); 

const contractAddress ="0x01BE23585060835E02B77ef475b0Cc51aA1e0709";

const contractAbi = [
    "function balanceOf(address _owner) public view returns (uint256)",
    "function transfer(address _to, uint256 _value) public returns (bool)", // we can use this function to send ether to another address
];

const contract = new ethers.Contract(contractAddress,contractAbi,provider);

const balance = await contract.balanceOf(senderAddress);
console.log(ethers.utils.formatEther(balance));

const contractWithWallet = contract.connect(wallet);  
const tx = await contractWithWallet.transfer(recipientAddress, 900000000);
await tx.wait();
console.log(tx);

const balanceAfter = await contract.balanceOf(senderAddress);
console.log(ethers.utils.formatEther(balanceAfter));
const balanceRecipient = await contract.balanceOf(recipientAddress);
console.log(ethers.utils.formatEther(balanceRecipient));


