# blockchain-developer-bootcamp-final-project
ConsenSys Academy Final Project 2021

## CustomSupCh

The actors of the smart contract are the owner and the supplier.

The owner can add the supplier to the list of verified suppliers in order to be able to add products. If the supplier is verified then has the access to add a product to the list and its price. Afterwards the item can be purchased from the list.


## Project Structure
client: The front-end application implemented with ReactJs and by using the web3.js library in js

contracts: Contains the contract

test: The unit test of the contract.

## How to run the project locally
Due to time limitations, I didn't manage to deploy my contract to a testnet or upload the interface to a hosting server. It is only deployed and tested locally.

### Preresquities
npm : 8.1.2

nodejs : 16.13.0

ganache : 2.5.4

Truffle : 5.4.16

solidity : 0.8.0

web3js : 1.5.3

### Contract deployment
You sould have truffle and ganache installed. Ganache should run.

Clone the project and run ```truffle deploy --reset```.

### Frontend deployment
For the frontend deployment

```cd client```

```npm install```

```npm start```

Open http://localhost:3000/ and connect Metamask to the network that contract was deployed

## Tests
Run ```truffle test```

## Video
https://www.loom.com/share/f7a4b2e7095e4647a8bcc7e14e5c602e

Difficulties with the Javascript part:
I wasn't able to add the events correctly due to lack of experience with React.

