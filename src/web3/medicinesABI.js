import web3 from './web3';

const address = '0x039E82DDDf42F6C3B77C272831F1E90B792c7D87'; // THE CONTRACT ADDRESS

const medicinesABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      }
    ],
    "name": "addMedicine",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint32",
        "name": "",
        "type": "uint32"
      }
    ],
    "name": "medicines",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "medicinesCount",
    "outputs": [
      {
        "internalType": "uint32",
        "name": "",
        "type": "uint32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
  ]; // THE ABI

  let contract = new web3.eth.Contract(medicinesABI, localStorage.address || address);
  
  const module = {
    getContract: () => contract,
    changeAddress: (addr) => {
      localStorage.address = addr;
      contract = new web3.eth.Contract(medicinesABI, addr);
    }
  }
  
  Object.freeze(module); // doesn't allow to add new properties to the object
  
  export default module;