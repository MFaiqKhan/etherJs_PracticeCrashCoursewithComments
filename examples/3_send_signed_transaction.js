// creating transaction with ether.js
// writing information to the blockchain is transaction.
// using test net for transactions
// will be sending ether to some recipient

require('dotenv').config();
const { ethers } = require("ethers");

const API_KEY = process.env.INFURA_API_KEY;
const provider = new ethers.providers.JsonRpcProvider(`https://rinkeby.infura.io/v3/${API_KEY}`)

const senderAddress = process.env.senderAddress;
const recipientAddress = "0xC8285Dda852BBdAd41C966D6fF92eAA0d9961556" 

const privateKey = process.env.privateKey;
const Wallet = new ethers.Wallet(privateKey, provider); // creating an instance of the wallet, from which we can instantiate a transaction
// we are creating externally owned wallet, so we need to pass in the private key


const main =  async () => {

    const senderBalanceBefore = await provider.getBalance(senderAddress);
    const recipientBalanceBefore = await provider.getBalance(recipientAddress);

    console.log(`Sender's balance before transaction: ${ethers.utils.formatEther(senderBalanceBefore)}`);
    console.log(`Recipient's balance before transaction: ${ethers.utils.formatEther(recipientBalanceBefore)}`);

    // creating a transaction
    const tx = await Wallet.sendTransaction({ // we don't need to provide from address, because we are using the wallet instance of the sender(private key automatically recognized)
        to: recipientAddress,
        value: ethers.utils.parseEther("0.025"),
    });

    await tx.wait(); // waiting for the transaction to be mined, because it takes time to send the transaction to the network
    console.log(tx); // this will print out the transaction info we usually see in etherscan any transaction

    const senderBalanceAfter = await provider.getBalance(senderAddress);
    const recipientBalanceAfter = await provider.getBalance(recipientAddress);

    console.log(`Sender's balance after transaction: ${ethers.utils.formatEther(senderBalanceAfter)}`);
    console.log(`Recipient's balance after transaction: ${ethers.utils.formatEther(recipientBalanceAfter)}`);

}

main()

// what is wait() ? 
// wait() is a method of the transaction object, which waits for the transaction to be mined.
// wait() is coming from the ethers library.