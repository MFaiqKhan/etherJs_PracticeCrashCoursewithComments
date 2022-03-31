// *** First Lesson: 
// How to Import ethers in your project? ( run 'npm install --save ethers' )
// How to connect with the blockchain ?
// How to fetch data from the blockchain ? , e.g: how to get the account balance from the blockchain ?

// => will be getting account balance, then writing script to rerun that code of getting account balance

// Go to infura , create account -> create an app, 


require('dotenv').config();
const { ethers } = require('ethers');  // or import { ethers } from 'ethers'; 

const API_KEY = process.env.INFURA_API_KEY;

// A provider is use to instantiate a connection with ethereum network and is used to access the data on the blockchain
// JsonRpcProvider is a provider that uses JSON-RPC to connect to an ethereum node. our Infura api url supports JSON-RPC. (There are different provider modes, but the most common is JsonRpcProvider)
const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${API_KEY}`); // connecting to the node deployed on mainnet through the url which supports RPC connection

// wrapping it up in async function
const main = async () => {
const balance = await provider.getBalance("nathanng.eth"); // getting the balance of the account through ENS name or we can use address directly
// console.log(balance); // output: will be a promise , a big number 
console.log(`${ethers.utils.formatEther(balance)}`); // output: will be a number having eth value(means 18 number posi after decimal point, because it's a standard of eth), becuase we are using formatEther function to format the number
};

main(); // calling the main function




