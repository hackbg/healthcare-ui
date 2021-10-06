/* eslint no-undef: "off" */
import Vue from "vue";
import Web3 from "web3";
import store from "../store";

export default function createWeb3() {
  if (window.ethereum) {
    if (store.state.web3) return true;
    const web3 = new Web3(Web3.givenProvider);
    store.commit("web3", web3);
    try {
      // Request account access if needed
      ethereum.enable();
      web3.eth.subscribe("newBlockHeaders", async (error, event) => {
        const blockTxHashes = (await web3.eth.getBlock(event.hash))
          .transactions;
        const pendingTxHashes = store.state.pendingTxHashes;
        const forRemove = [];

        pendingTxHashes.forEach((pendingTxHash) => {
          if (blockTxHashes.includes(pendingTxHash.tx)) {
            // console.log(pendingTxHash.msg);
            Vue.$toast.open({
              message: pendingTxHash.msg,
              type: "success",
              duration: 10000,
              pauseOnHover: true,
              position: "top-right",
            });
            forRemove.push(pendingTxHash);
          }
        });

        if (forRemove.length > 0) {
          forRemove.forEach((tx) => {
            pendingTxHashes.filter((e) => e !== tx);
          });
          store.commit("pendingTxHashes", pendingTxHashes);
        }
      });
      return true;
    } catch (error) {
      // User denied account access...
      return false;
    }
  } else {
    // Non-dapp browsers...
    // alert(
    //   'Non-Ethereum browser detected. You should consider trying MetaMask!'
    // );
    return false;
  }
}
