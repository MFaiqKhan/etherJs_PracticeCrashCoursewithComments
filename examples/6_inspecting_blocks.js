// Inspecting information from blocks
// checking block information through running scripts in ether.js


const { ethers } = require("ethers");
require('dotenv').config();

const API_KEY = process.env.INFURA_API_KEY
const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${API_KEY}`)

const main = async () => {
    const latestBlockNumber = await provider.getBlockNumber() 

    console.log(`latest block Number = ${latestBlockNumber}`);
    const blockInfo = await provider.getBlock(latestBlockNumber)
    console.log(blockInfo);

    const blockTransactions = await provider.getBlockWithTransactions(latestBlockNumber)

}

main()