import AionKeystore from "aion-web3-eth-accounts";
import Web3 from "aion-web3";
import { readFileSync } from "fs";
import { PRIVATE_KEY, NODESMITH_API } from "../credentials.js"; // This file has purposefully been omitted on github repo

// Initialize web3
const provider = new Web3.providers.HttpProvider(NODESMITH_API);
const web3 = new Web3(provider);

const deployContract = async () => {
  // Import Solidity Contract
  const solContract = readFileSync("src/contracts/Counter.sol", {
    encoding: "utf8"
  });

  // Initialize Account
  const aionKeystore = new AionKeystore(NODESMITH_API);
  const account = aionKeystore.privateKeyToAccount(
    PRIVATE_KEY // Add Private Key of Account that will be used to deploy contract
  );

  // Compile Contract
  const compiledContract = await web3.eth.compileSolidity(solContract);
  const contractAbi = compiledContract.Counter.info.abiDefinition;
  const contractCode = compiledContract.Counter.code;
  // Declare Contract
  const contract = new web3.eth.Contract(contractAbi);
  // Deploy Contract
  const deployableContract = await contract.deploy({
    data: contractCode,
    arguments: [1]
  });
  const contractData = deployableContract.encodeABI();

  // Get Transaction
  const transaction = await getTransactionObject(contractData, account.address, deployableContract);

  // Sign Transaction
  const signedTransaction = await account.signTransaction(transaction);
  console.log("Transaction signed!");

  // Send Raw Transaction
  const transactionReceipt = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);

  console.log("Transaction Receipt : ", transactionReceipt);
  console.log("Contract Address : ", transactionReceipt.contractAddress);
};

const getTransactionObject = async (contractData, address, deployableContract) => {
  // Get Gas Estimates and Nonce
  const nonce = await web3.eth.getTransactionCount(address);
  const gasPrice = await web3.eth.getGasPrice();
  const gas = await deployableContract.estimateGas();

  // Declare Transaction Obj
  const transaction = {
    from: address,
    nonce,
    gasPrice,
    gas:2000000,  //intentionally assigning value explicitly  
    data: contractData
  };
  return transaction;
};

deployContract();
