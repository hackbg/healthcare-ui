/* eslint no-undef: "off" */
import Web3 from 'web3';

if (window.ethereum) {
  window.web3 = new Web3(Web3.givenProvider);
  try {
    // Request account access if needed
    ethereum.enable();
  } catch (error) {
    // User denied account access...
  }
} else {
  // Non-dapp browsers...
  alert(
    'Non-Ethereum browser detected. You should consider trying MetaMask!'
  );
}
console.log(web3);
export default web3;
