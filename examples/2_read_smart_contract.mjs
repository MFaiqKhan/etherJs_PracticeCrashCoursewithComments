// Reading information from the real smart contract deployed on main net
// I am choosing matic token smart contract as an example.

// go to etherscan -> matic token -> contract -> read contract tab below -> there we cans ee number of different methods 
// we will be using those methods from our script that we will be coding below

import { ethers } from "ethers";
import 'dotenv/config';

const API_KEY = process.env.INFURA_API_KEY
const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${API_KEY}`);

const maticContractAddress = "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0";


const maticContractABI = [ // ethers allows us to save abi on an array and we can only write some of the functionality that we want to use from the smart contract
    // we can use the abi to read the data from the smart contract, we can directly write the functions available in solidity course code of matic token
    "function name() public view returns (string)", 
    "function symbol() public view returns (string)",
    "function decimals() public view returns (uint8)",
    "function totalSupply() public view returns (uint256)",
    "function balanceOf(address _owner) public view returns (uint256)",
];

const contract = new ethers.Contract(maticContractAddress, maticContractABI, provider); // creating a contract object using the provider , now we can call functions on this object, that acts as a instance of the smart contract
const name = await contract.name(); // calling the name function from the smart contract, top level await using .mjs extension
const sumbol = await contract.symbol(); // calling the symbol function from the smart contract, top level await using .mjs extension
const decimals = await contract.decimals(); // calling the decimals function from the smart contract, top level await using .mjs extension
const totalSupply = await contract.totalSupply(); // calling the totalSupply function from the smart contract, top level await using .mjs extension
const balanceOf = await contract.balanceOf("0x382113A01831286E412A0E1263d8784bAD07D974"); // calling the balanceOf function from the smart contract, top level await using .mjs extension

console.log(`name is : ${name}`); // output: Matic Token
console.log(`symbol is : ${sumbol}`); // output: MATIC
console.log(`decimals is : ${decimals}`); // output: 18
console.log(`totalSupply is : ${totalSupply}`); // output: 10000000000000000...
console.log(`balanceOf is : ${balanceOf}`); // that's a raw number, we need to format it
console.log(`balanceOf is : ${ethers.utils.formatEther(balanceOf)}`); // matic token value formatted


