import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const [isConnected, setIsConnected] = useState(false);
  const navigate = useNavigate();

  const connectWallet = async () => {
    setIsConnected(true);
    navigate('/connect-wallet');
  }

  return (
    <div className="home">
      <h1>Welcome to Cheth</h1>
      <button onClick={connectWallet}>Connect Wallet</button>
    </div>
  );
};

export default Home;
