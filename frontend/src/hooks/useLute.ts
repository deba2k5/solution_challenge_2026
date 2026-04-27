import { useState, useEffect } from 'react';
import LuteConnect from 'lute-connect';
import algosdk from 'algosdk';

const ALGOD_SERVER = 'https://testnet-api.algonode.cloud';
const ALGOD_PORT = '';
const ALGOD_TOKEN = '';

const lute = new LuteConnect();
const algodClient = new algosdk.Algodv2(ALGOD_TOKEN, ALGOD_SERVER, ALGOD_PORT);

export const useLute = () => {
  const [address, setAddress] = useState<string | null>(
    localStorage.getItem('lute_address') || 'USV5UCAG2V26B5Q7G75KDKHI2UWBOU7NCAYOGNA3ZIK4WD2D3EPJORFRTI'
  );
  const [isConnecting, setIsConnecting] = useState(false);

  const connect = async () => {
    setIsConnecting(true);
    try {
      const genesis = await algodClient.genesis().do();
      const genesisID = `${genesis.network}-${genesis.id}`;
      
      const addresses = await lute.connect(genesisID);
      if (addresses && addresses.length > 0) {
        const connectedAddress = addresses[0];
        setAddress(connectedAddress);
        localStorage.setItem('lute_address', connectedAddress);
        return connectedAddress;
      }
    } catch (error) {
      console.error('Lute connection failed:', error);
    } finally {
      setIsConnecting(false);
    }
    return null;
  };

  const disconnect = () => {
    setAddress(null);
    localStorage.removeItem('lute_address');
  };

  return {
    address,
    isConnecting,
    connect,
    disconnect,
    isConnected: !!address
  };
};
