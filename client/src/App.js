import React, { useEffect, useState } from 'react';
import { getWeb3 } from './utils.js';
// import logo from '../logo.png';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Product from "./components/Product";
import Navigation from "./components/Navigation";
import Supplier from "./components/Supplier";
import CustomSupCh from "./contracts/CustomSupCh.json";
import Web3 from "web3";


const states = ['Create','Sold','Shipped','Received'];

function App() {
  const [web3, setWeb3] = useState(undefined);
  const [socketInstance, setSocketInstance] = useState(undefined);
  const [accounts, setAccounts] = useState(undefined);
  const [contract, setContract] = useState(undefined);
  const [game, setGame] = useState({state: '0'});
  const [move, setMove] = useState();

  useEffect(() => {
    const init = async () => {
      const web3 = await getWeb3();
      const web3socket = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:7545'))
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = CustomSupCh.networks[networkId];
      const contract = new web3.eth.Contract(
        CustomSupCh.abi,
        deployedNetwork && deployedNetwork.address,
      );

      const socketInstance = new web3socket.eth.Contract(
        CustomSupCh.abi, 
        deployedNetwork && deployedNetwork.address,
        );
      setWeb3(web3);
      setSocketInstance(socketInstance);
      setAccounts(accounts);
      setContract(contract);
    }    
    init();
    window.ethereum.on('accountsChanged', accounts => {
      setAccounts(accounts);
    });
  }, []);

  const isReady = () => {
    return (
      typeof contract !== 'undefined' 
      && typeof web3 !== 'undefined'
      && typeof accounts !== 'undefined'
    );
  }

  useEffect(() => {
    if(isReady()) {
    }
  }, [accounts, contract, web3, socketInstance]);

  return (    
      <div className="App">
       <Router>
       <Navigation />
       <Routes>
         <Route path="/" element={<Supplier socketInstance={socketInstance} accounts={accounts} contract={contract} web3={web3}/>} />
         <Route path="/products" element={<Product accounts={accounts} contract={contract} web3={web3}/>} />
       </Routes>
       </Router>
       </div>
    );
  }

export default App;