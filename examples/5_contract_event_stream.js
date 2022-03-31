//entertaining event by etherjs
// smart contract event stream

const { ethers } = require("ethers");
require('dotenv').config();

const API_KEY = process.env.INFURA_API_KEY
const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${API_KEY}`)

const maticToken = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address) view returns (uint)",

    "event Transfer(address indexed from, address indexed to, uint amount)" // event
];

const address = '0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0'
const contract = new ethers.Contract(address, maticToken, provider)

const main = async () => {
    const block = await provider.getBlockNumber() // get current block number (latest block number)
    // const block = await provider.getBlock() // get the block information by providing block number

    const transferEvents = await contract.queryFilter('Transfer', block - 1, block) // get events from second last block to latest block
    console.log(transferEvents)
}


main()