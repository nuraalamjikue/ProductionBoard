// src/components/NetworkHandler.tsx

import React, {useEffect, useState} from 'react';
import NetInfo from '@react-native-community/netinfo';
import {View, Text, StyleSheet, Button} from 'react-native';

const NetworkHandler = ({children}: {children: React.ReactNode}) => {
  const [isConnected, setIsConnected] = useState(true);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      const connected = state.isConnected && state.isInternetReachable;
      setIsConnected(connected ?? false);

      if (connected) {
        // Trigger app "reload" by changing key
        setReloadKey(prev => prev + 1);
      }
    });

    return () => unsubscribe();
  }, []);

  if (!isConnected) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>📴 No Internet Connection</Text>
      </View>
    );
  }

  return <React.Fragment key={reloadKey}>{children}</React.Fragment>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    color: 'red',
  },
});

export default NetworkHandler;
