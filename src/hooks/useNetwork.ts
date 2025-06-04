import {useEffect, useState} from 'react';
import NetInfo from '@react-native-community/netinfo';

export const useNetwork = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      // ONLY check for network connection, not internet reachability
      setIsConnected(state.isConnected ?? false);
    });

    return () => unsubscribe();
  }, []);

  return isConnected;
};
