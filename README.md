# healthcare-ui

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Overview
This repo includes responsive single-page application written with web3, Vue.js and Buefy and the ABIs for the smart contracts which can be found in the repo [healthcare](https://github.com/hackbg/healthcare)

### Addressess for my test network
Account 1 - Doctor  
Account 2 - Insurer  
Account 3 - Patient  
Accounr 4 - Pharmacy

## About Healthcare

* Insurance company could have smartcontracts in a blockchain with added walet addresses for all insurers in the company and all the hospitals and emergency medical services(common walet for the whole hospital, instead separate for each doctor) or the doctors working in it.  
  
* Each insurer can create new tokens("Ins") that could be added in patient's walet who pay for insurance.  
  
* Patients can't exchange tokens between each other because the insurance is personal. Id the patient need emergency or to go to a hospital the doctor can check does the patient has enough tokens in the walet and ask from the patient to send the amount of tokens to the doctors address.  
  
* The patients can send tokens only to doctors/hospital.  
  
* The doctors can't send tokens to nobody. With the amount of tokens in their walet they can prove how much the insurer need to pay them. After that the tokens are burned.  
  
* Such vouchers or cards can be realized both electronically with a database and in a blockchain. The advantage of a blockchain over a centralized database is the easy traceability of each voucher, the inability of the database owner to manipulate or modify or destroy it if there is a hacker attack, the lack of contentious situations that require maintenance and investigation of any potential complaint by the client, whether it is real or not and many others.
  
 * In the case of a healthcare system implemented with a blockchain, one of the usabilitys is for health insurance, providing credit which can be used for health care. For example, a patient may pay $100 for insurance, and that give her/him right to use for emergency medical care up to $10,000. We are talking about countries where the emergency medical care is not free, like in Bulgaria, for example the United States.  
   
 * Except the fact that there is no free transfer of tokens between users, all other needs for this type of token are covered by ERC20, which is tested, there are many compatible applications with that token, such as metamask and libraries such as web3, which make the usage and the development easier. That why is choosen slightly modified version of ERC20, in which user types are added and free transactions are prohibited.  
   
* Another important feature for any healthcare system are the prescriptions for medicines. Especially the prescriptions for free or restricted medicines, such as strong painkillers. Such prescriptions are one-time, when presented in a pharmacy, the medicine is received and the prescription can no longer be used. The doctor give a prescription to the patient, the patient cannot give it to anyone other than a pharmacy and the pharmacy must keep it as a prove.  
  
* Here again, the blockchain can come to the rescue, because the abuses of free drugs, strong painkillers and other types of dangerous medicines is very big problem all over the world. The blockchain is much more secure and difficult to manipulate than a centralized database. Unlike the insurance the prescriptions need to be a unique token to represent each prescription. Such is the NTF token ERC721, which can also be modified for this needs. Again can be forbiden who can transfer prescriptions with who. In this case, doctors can create new tokens("DRG) that could be send in patients' wallets. Patients can only send them to pharmacies, but only with the consent of the pharmacy, and pharmacies cannot send them to anyone. Also is possible to add validity to the tokens, to become invalid after a certain time.  
  
* How are stored the medicines in ERC721(NFT) - In principle, can be written only the uri, which points to somewhere (for example to some digital art) because the uri is text(string) you can actually put any text and not just an address pointing somewhere. In this case, is stored the list of medicines separated by commas. Each prescription is unique and can be used by the person. In principle, it could have been done in another way - to add another array for medicines lists, but this is waste of space and would make transactions more expensive.  
