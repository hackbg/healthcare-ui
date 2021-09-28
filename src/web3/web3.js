/* eslint no-undef: "off" */
import Vue from 'vue';
import Web3 from 'web3';
import store from '../store';

if (window.ethereum) {
  window.web3 = new Web3(Web3.givenProvider);
  try {
    // Request account access if needed
    ethereum.enable();
    window.web3.eth.subscribe('newBlockHeaders', async (error, event) => {
      const blockTxHashes = (await window.web3.eth.getBlock(event.hash)).transactions;
      const pendingTxHashes = store.state.pendingTxHashes;
      const forRemove = [];

      pendingTxHashes.forEach(pendingTxHash => {
        if (blockTxHashes.includes(pendingTxHash.tx)) {
          // console.log(pendingTxHash.msg);
          Vue.$toast.open({
            message: pendingTxHash.msg,
            type: 'success',
            duration: 10000,
            pauseOnHover: true,
            position: 'top-right',
          });
          forRemove.push(pendingTxHash);
        }
      });

      if(forRemove.length > 0) {
        forRemove.forEach(tx => {
          pendingTxHashes.filter(e => e !== tx);
        });
        store.commit('pendingTxHashes', pendingTxHashes);
      }
    });
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
