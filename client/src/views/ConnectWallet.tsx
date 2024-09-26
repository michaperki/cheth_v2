import React, { useState } from 'react';
import { ethers } from 'ethers';
import { submitWalletLogin } from '@/services/wallet'; // Import the submitWalletLogin function from the wallet.ts file
import './ConnectWallet.css'; 

const ConnectWallet: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [message] = useState<string>('Sign in to Virtual Labs');
  const [signature, setSignature] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        setLoading(true);
        setError(null);

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const accounts = await provider.send('eth_requestAccounts', []);
        const address = accounts[0];

        setWalletAddress(address);

        const signedMessage = await signer.signMessage(message);
        setSignature(signedMessage);

        // Call the login service to submit wallet address and signature
        const loginResponse = await submitWalletLogin(address, message, signedMessage);

        if (loginResponse.success && loginResponse.token) {
          setToken(loginResponse.token);
          console.log('Successfully logged in:', loginResponse.token);
        } else {
          setError(loginResponse.error || 'Failed to log in');
        }

      } catch (err) {
        setError('Error connecting to wallet or signing the message');
        console.error(err);
      } finally {
        setLoading(false);
      }
    } else {
      setError('MetaMask is not installed');
    }
  };

  return (
    <div className="wallet-container">
      <h2>Connect Wallet</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {!walletAddress && (
            <button className="wallet-button" onClick={connectWallet}>Connect Wallet</button>
          )}
          
          {walletAddress && (
            <div>
              <p className="wallet-address">Connected as: {walletAddress}</p>
            </div>
          )}

          {token && (
            <p className="success-message">Logged in successfully! Token: {token}</p>
          )}

          {error && (
            <p className="error-message">Error: {error}</p>
          )}
        </>
      )}
    </div>
  );
};

export default ConnectWallet;

