import React, { useState } from "react";
import { ethers } from "ethers";
import { submitWalletLogin } from "@/services/wallet";
import { useRouter } from "next/router";

const ConnectWallet = () => {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [message, setMessage] = useState("");
  const [signature, setSignature] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { ethereum } = window as any;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setUser(address);
      const message = `I am signing my one-time nonce: ${Date.now()}`;
      const signature = await signer.signMessage(message);
      setMessage(message);
      setSignature(signature);
    }
  };

  const handleLogin = async () => {
    const response = await submitWalletLogin(user, message, signature);
    if (response.success) {
      router.push("/dashboard");
    } else {
      alert(response.error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-4">Connect Wallet</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="user" className="block text-sm font-medium text-gray-700">
              User
            </label>
            <input
              type="text"
              name="user"
              id="user"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="0x..."
              value={user}
	      onChange={(e) => setUser(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <input
              type="text"
              name="message"
              id="message"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="I am signing my one-time nonce"
              value={message}
	      onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="signature" className="block text-sm font-medium text-gray-700">
              Signature
            </label>
            <input
              type="text"
              name="signature"
              id="signature"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="0x..."
              value={signature}
	      onChange={(e) => setSignature(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};














































