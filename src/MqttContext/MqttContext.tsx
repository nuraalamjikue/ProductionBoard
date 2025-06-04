// // import React, {createContext, useContext, useEffect, useState} from 'react';
// // import MQTT from 'sp-react-native-mqtt';

// // interface MQTTContextProps {
// //   client: any;
// //   connect: () => void;
// //   disconnect: () => void;
// //   sendMessage: (message: string) => void;
// //   receivedMessage: (message: string) => void;
// //   cycleCount: string | null;
// //   resetCycleCount: () => void; // Added reset function
// // }

// // const MQTTContext = createContext<MQTTContextProps | undefined>(undefined);

// // export const useMQTT = () => {
// //   const context = useContext(MQTTContext);
// //   if (!context) {
// //     throw new Error('useMQTT must be used within an MQTTProvider');
// //   }
// //   return context;
// // };

// // export const MQTTProvider: React.FC<{children: React.ReactNode}> = ({
// //   children,
// // }) => {
// //   const [client, setClient] = useState<any>(null);
// //   const [cycleCount, setCycleCount] = useState<string | null>(null);

// //   useEffect(() => {
// //     console.log('Initializing MQTT Client...');
// //     const randomNumber = String(
// //       Math.floor(Math.random() * 100000000000),
// //     ).padStart(11, '0');

// //     MQTT.createClient({
// //       uri: 'mqtt://172.16.16.4:1883',
// //       clientId: randomNumber,
// //     })
// //       .then(client => {
// //         client.on('closed', () => {
// //           console.log('mqtt.event.closed');
// //         });

// //         client.on('error', msg => {
// //           console.log('mqtt.event.error', msg);
// //         });

// //         client.on('message', msg => {
// //           console.log('mqtt.event.message ++++', msg);
// //           try {
// //             const parsed = JSON.parse(msg.data);
// //             if (parsed?.cycleCount) {
// //               setCycleCount(parsed.cycleCount);
// //               console.log('Parsed cycleCount:', parsed.cycleCount);
// //             }
// //           } catch (err) {
// //             console.log('Error parsing MQTT message:', err);
// //           }
// //         });

// //         client.on('connect', () => {
// //           console.log('MQTT connected');
// //           client.subscribe('Production/ProductionBoard/run_video', 0);
// //         });

// //         setClient(client);
// //         client.connect();
// //       })
// //       .catch(err => {
// //         console.log('MQTT connection error:', err);
// //       });

// //     return () => {
// //       if (client) {
// //         client.disconnect();
// //       }
// //     };
// //   }, []);

// //   const connect = () => {
// //     if (client) {
// //       client.connect();
// //     }
// //   };

// //   const disconnect = () => {
// //     if (client) {
// //       client.disconnect();
// //     }
// //   };

// //   const sendMessage = (message: string) => {
// //     if (client) {
// //       client.publish('Production/ProductionBoard/run_video', message, 0, false);
// //     }
// //   };

// //   const receivedMessage = (message: string) => {
// //     if (client) {
// //       client.subscribe('Production/ProductionBoard/run_video', 0);
// //     }
// //   };

// //   const resetCycleCount = () => {
// //     setCycleCount(null);
// //   };

// //   return (
// //     <MQTTContext.Provider
// //       value={{
// //         client,
// //         connect,
// //         disconnect,
// //         sendMessage,
// //         receivedMessage,
// //         cycleCount,
// //         resetCycleCount,
// //       }}>
// //       {children}
// //     </MQTTContext.Provider>
// //   );
// // };

// // import React, {createContext, useContext, useEffect, useState} from 'react';
// // import {useSelector} from 'react-redux';
// // import MQTT from 'sp-react-native-mqtt';
// // import {RootState} from '../redux/store';

// // interface MQTTContextProps {
// //   client: any;
// //   connect: () => void;
// //   disconnect: () => void;
// //   sendMessage: (message: string) => void;
// //   receivedMessage: () => void;
// //   cycleCount: string | null;
// //   resetCycleCount: () => void;
// // }

// // const MQTTContext = createContext<MQTTContextProps | undefined>(undefined);

// // export const useMQTT = () => {
// //   const context = useContext(MQTTContext);
// //   if (!context) {
// //     throw new Error('useMQTT must be used within an MQTTProvider');
// //   }
// //   return context;
// // };

// // export const MQTTProvider: React.FC<{children: React.ReactNode}> = ({
// //   children,
// // }) => {
// //   const [client, setClient] = useState<any>(null);
// //   const [cycleCount, setCycleCount] = useState<string | null>(null);

// //   const settingData = useSelector(
// //     (state: RootState) => state.Setting.settingData,
// //   );

// //   console.log(
// //     'settingData chakeing Data' +
// //       JSON.stringify(settingData?.setCompanyID, null, 2),
// //   );

// //   const getTopic = (): string | null => {
// //     return settingData?.setLineName
// //       ? `Production/ProductionBoard/run_video/${settingData.setLineName}`
// //       : null;
// //   };

// //   useEffect(() => {
// //     console.log('Initializing MQTT Client...');
// //     const randomClientId = String(
// //       Math.floor(Math.random() * 100000000000),
// //     ).padStart(11, '0');

// //     // SSL URL : mqtt://172.16.16.4:1883
// //     // SOL URL : mqtt://172.16.1.4:1883

// //     MQTT.createClient({
// //       uri:
// //         settingData?.setCompanyID === 2
// //           ? 'mqtt://172.16.16.4:1883'
// //           : 'mqtt://172.16.1.4:1883',
// //       clientId: randomClientId,
// //     })
// //       .then(mqttClient => {
// //         mqttClient.on('closed', () => {
// //           console.log('MQTT connection closed');
// //         });

// //         mqttClient.on('error', msg => {
// //           console.log('MQTT connection error:', msg);
// //         });

// //         mqttClient.on('message', msg => {
// //           console.log('MQTT message received:', msg);
// //           try {
// //             const parsed = JSON.parse(msg.data);
// //             if (parsed?.cycleCount) {
// //               setCycleCount(parsed.cycleCount);
// //               console.log('Parsed cycleCount:', parsed.cycleCount);
// //             }
// //           } catch (err) {
// //             console.log('Error parsing MQTT message:', err);
// //           }
// //         });

// //         mqttClient.on('connect', () => {
// //           console.log('MQTT connected');
// //           const topic = getTopic();
// //           if (topic) {
// //             console.log('Subscribing to topic:', topic);
// //             mqttClient.subscribe(topic, 0);
// //           } else {
// //             console.warn('Line name missing. Subscription skipped.');
// //           }
// //         });

// //         setClient(mqttClient);
// //         mqttClient.connect();
// //       })
// //       .catch(err => {
// //         console.log('MQTT connection failed:', err);
// //       });

// //     return () => {
// //       if (client) {
// //         client.disconnect();
// //       }
// //     };
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, []);

// //   const connect = () => {
// //     if (client) {
// //       client.connect();
// //     }
// //   };

// //   const disconnect = () => {
// //     if (client) {
// //       client.disconnect();
// //     }
// //   };

// //   const sendMessage = (message: string) => {
// //     const topic = getTopic();
// //     if (client && topic) {
// //       client.publish(topic, message, 0, false);
// //     } else {
// //       console.warn('Cannot publish. MQTT client or topic is unavailable.');
// //     }
// //   };

// //   // const receivedMessage = () => {
// //   //   const topic = getTopic();
// //   //   if (client && topic) {
// //   //     client.subscribe(topic, 0);
// //   //     console.log('Subscribed to topic (on demand):', topic);
// //   //   } else {
// //   //     console.warn('Cannot subscribe. MQTT client or topic is unavailable.');
// //   //   }
// //   // };

// //   const receivedMessage = () => {
// //     if (client && settingData?.setLineName) {
// //       client.subscribe(
// //         `Production/ProductionBoard/run_video/${settingData.setLineName}`,
// //         0,
// //       );
// //     }
// //   };

// //   const resetCycleCount = () => {
// //     setCycleCount(null);
// //   };

// //   return (
// //     <MQTTContext.Provider
// //       value={{
// //         client,
// //         connect,
// //         disconnect,
// //         sendMessage,
// //         receivedMessage,
// //         cycleCount,
// //         resetCycleCount,
// //       }}>
// //       {children}
// //     </MQTTContext.Provider>
// //   );
// // };

// import React, {
//   createContext,
//   useContext,
//   useEffect,
//   useRef,
//   useState,
// } from 'react';
// import {useSelector} from 'react-redux';
// import MQTT from 'sp-react-native-mqtt';
// import NetInfo from '@react-native-community/netinfo';
// import {RootState} from '../redux/store';

// interface MQTTContextProps {
//   client: any;
//   connect: () => void;
//   disconnect: () => void;
//   sendMessage: (message: string) => void;
//   receivedMessage: () => void;
//   cycleCount: string | null;
//   resetCycleCount: () => void;
// }

// const MQTTContext = createContext<MQTTContextProps | undefined>(undefined);

// export const useMQTT = () => {
//   const context = useContext(MQTTContext);
//   if (!context) {
//     throw new Error('useMQTT must be used within an MQTTProvider');
//   }
//   return context;
// };

// export const MQTTProvider: React.FC<{children: React.ReactNode}> = ({
//   children,
// }) => {
//   const [client, setClient] = useState<any>(null);
//   const [cycleCount, setCycleCount] = useState<string | null>(null);
//   const isConnectedRef = useRef(false); // Prevent duplicate reconnections
//   const clientRef = useRef<any>(null);
//   const settingData = useSelector(
//     (state: RootState) => state.Setting.settingData,
//   );

//   const getTopic = (): string | null => {
//     return settingData?.setLineName
//       ? `Production/ProductionBoard/run_video/${settingData.setLineName}`
//       : null;
//   };

//   const initializeMQTT = () => {
//     if (clientRef.current) return; // Already connected or connecting

//     const randomClientId = String(
//       Math.floor(Math.random() * 100000000000),
//     ).padStart(11, '0');

//     MQTT.createClient({
//       uri:
//         settingData?.setCompanyID === 2
//           ? 'mqtt://172.16.16.4:1883'
//           : 'mqtt://172.16.1.4:1883',
//       clientId: randomClientId,
//     })
//       .then(mqttClient => {
//         clientRef.current = mqttClient;
//         setClient(mqttClient);

//         mqttClient.on('closed', () => {
//           console.log('MQTT connection closed');
//           clientRef.current = null;
//         });

//         mqttClient.on('error', msg => {
//           console.log('MQTT error:', msg);
//           clientRef.current = null;
//         });

//         mqttClient.on('message', msg => {
//           console.log('MQTT message received:', msg);
//           try {
//             const parsed = JSON.parse(msg.data);
//             if (parsed?.cycleCount) {
//               setCycleCount(parsed.cycleCount);
//               console.log('Parsed cycleCount:', parsed.cycleCount);
//             }
//           } catch (err) {
//             console.log('Error parsing MQTT message:', err);
//           }
//         });

//         mqttClient.on('connect', () => {
//           console.log('MQTT connected');
//           const topic = getTopic();
//           if (topic) {
//             mqttClient.subscribe(topic, 0);
//           }
//         });

//         mqttClient.connect();
//       })
//       .catch(err => {
//         console.log('MQTT connection failed:', err);
//         clientRef.current = null;
//       });
//   };

//   // Monitor network changes
//   useEffect(() => {
//     const unsubscribe = NetInfo.addEventListener(state => {
//       const online = state.isConnected && state.isInternetReachable;
//       if (online && !isConnectedRef.current) {
//         isConnectedRef.current = true;
//         initializeMQTT();
//       } else if (!online) {
//         isConnectedRef.current = false;
//         if (clientRef.current) {
//           clientRef.current.disconnect();
//           clientRef.current = null;
//           setClient(null);
//         }
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   // Initial MQTT setup
//   useEffect(() => {
//     initializeMQTT();
//     return () => {
//       if (clientRef.current) {
//         clientRef.current.disconnect();
//         clientRef.current = null;
//       }
//     };
//   }, [settingData]);

//   const connect = () => {
//     if (clientRef.current) {
//       clientRef.current.connect();
//     }
//   };

//   const disconnect = () => {
//     if (clientRef.current) {
//       clientRef.current.disconnect();
//       clientRef.current = null;
//     }
//   };

//   const sendMessage = (message: string) => {
//     const topic = getTopic();
//     if (clientRef.current && topic) {
//       clientRef.current.publish(topic, message, 0, false);
//     }
//   };

//   const receivedMessage = () => {
//     const topic = getTopic();
//     if (clientRef.current && topic) {
//       clientRef.current.subscribe(topic, 0);
//     }
//   };

//   const resetCycleCount = () => setCycleCount(null);

//   return (
//     <MQTTContext.Provider
//       value={{
//         client,
//         connect,
//         disconnect,
//         sendMessage,
//         receivedMessage,
//         cycleCount,
//         resetCycleCount,
//       }}>
//       {children}
//     </MQTTContext.Provider>
//   );
// };

// import React, {
//   createContext,
//   useContext,
//   useEffect,
//   useRef,
//   useState,
// } from 'react';
// import {useSelector} from 'react-redux';
// import MQTT from 'sp-react-native-mqtt';
// import NetInfo from '@react-native-community/netinfo';
// import {RootState} from '../redux/store';

// interface MQTTContextProps {
//   client: any;
//   connect: () => void;
//   disconnect: () => void;
//   sendMessage: (message: string) => void;
//   receivedMessage: () => void;
//   cycleCount: string | null;
//   resetCycleCount: () => void;
// }

// const MQTTContext = createContext<MQTTContextProps | undefined>(undefined);

// export const useMQTT = () => {
//   const context = useContext(MQTTContext);
//   if (!context) {
//     throw new Error('useMQTT must be used within an MQTTProvider');
//   }
//   return context;
// };

// export const MQTTProvider: React.FC<{children: React.ReactNode}> = ({
//   children,
// }) => {
//   const [client, setClient] = useState<any>(null);
//   const [cycleCount, setCycleCount] = useState<string | null>(null);
//   const isConnectedRef = useRef(false); // Track network state
//   const clientRef = useRef<any>(null);
//   const settingData = useSelector(
//     (state: RootState) => state.Setting.settingData,
//   );

//   const getTopic = (): string | null => {
//     return settingData?.setLineName
//       ? `Production/ProductionBoard/run_video/${settingData.setLineName}`
//       : null;
//   };

//   const initializeMQTT = () => {
//     if (clientRef.current) return;

//     const randomClientId = String(
//       Math.floor(Math.random() * 100000000000),
//     ).padStart(11, '0');

//     MQTT.createClient({
//       uri:
//         settingData?.setCompanyID === 2
//           ? 'mqtt://172.16.16.4:1883'
//           : 'mqtt://172.16.1.4:1883',
//       clientId: randomClientId,
//     })
//       .then(mqttClient => {
//         clientRef.current = mqttClient;
//         setClient(mqttClient);

//         mqttClient.on('closed', () => {
//           console.log('MQTT connection closed');
//           clientRef.current = null;
//         });

//         mqttClient.on('error', msg => {
//           if (!isConnectedRef.current) return; // Don't do anything if offline

//           // console.log('MQTT error:', msg);
//           clientRef.current = null;
//         });

//         mqttClient.on('message', msg => {
//           console.log('MQTT message received:', msg);
//           try {
//             const parsed = JSON.parse(msg.data);
//             if (parsed?.cycleCount) {
//               setCycleCount(parsed.cycleCount);
//               console.log('Parsed cycleCount:', parsed.cycleCount);
//             }
//           } catch (err) {
//             console.log('Error parsing MQTT message:', err);
//           }
//         });

//         mqttClient.on('connect', () => {
//           console.log('MQTT connected');
//           const topic = getTopic();
//           if (topic) {
//             mqttClient.subscribe(topic, 0);
//           }
//         });

//         mqttClient.connect();
//       })
//       .catch(err => {
//         console.log('MQTT connection failed:', err);
//         clientRef.current = null;
//       });
//   };

//   // Monitor network changes and manage MQTT connection
//   useEffect(() => {
//     const unsubscribe = NetInfo.addEventListener(state => {
//       const online = state.isConnected && state.isInternetReachable;

//       if (online && !isConnectedRef.current) {
//         isConnectedRef.current = true;
//         console.log('Network is online - initializing MQTT...');
//         initializeMQTT();
//       } else if (!online && isConnectedRef.current) {
//         isConnectedRef.current = false;
//         console.log('Network is offline - disconnecting MQTT...');
//         if (clientRef.current) {
//           clientRef.current.disconnect();
//           clientRef.current = null;
//           setClient(null);
//         }
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   // Reinitialize MQTT on settings change
//   useEffect(() => {
//     if (isConnectedRef.current) {
//       initializeMQTT();
//     }

//     return () => {
//       if (clientRef.current) {
//         clientRef.current.disconnect();
//         clientRef.current = null;
//         setClient(null);
//       }
//     };
//   }, [settingData]);

//   const connect = () => {
//     if (clientRef.current) {
//       clientRef.current.connect();
//     }
//   };

//   const disconnect = () => {
//     if (clientRef.current) {
//       clientRef.current.disconnect();
//       clientRef.current = null;
//       setClient(null);
//     }
//   };

//   const sendMessage = (message: string) => {
//     const topic = getTopic();
//     if (clientRef.current && topic) {
//       clientRef.current.publish(topic, message, 0, false);
//     }
//   };

//   const receivedMessage = () => {
//     const topic = getTopic();
//     if (clientRef.current && topic) {
//       clientRef.current.subscribe(topic, 0);
//     }
//   };

//   const resetCycleCount = () => setCycleCount(null);

//   return (
//     <MQTTContext.Provider
//       value={{
//         client,
//         connect,
//         disconnect,
//         sendMessage,
//         receivedMessage,
//         cycleCount,
//         resetCycleCount,
//       }}>
//       {children}
//     </MQTTContext.Provider>
//   );
// };

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {useSelector} from 'react-redux';
import MQTT from 'sp-react-native-mqtt';
import NetInfo from '@react-native-community/netinfo';
import {RootState} from '../redux/store';

interface MQTTContextProps {
  client: any;
  connect: () => void;
  disconnect: () => void;
  sendMessage: (message: string) => void;
  receivedMessage: () => void;
  cycleCount: string | null;
  resetCycleCount: () => void;
}

const MQTTContext = createContext<MQTTContextProps | undefined>(undefined);

export const useMQTT = () => {
  const context = useContext(MQTTContext);
  if (!context) {
    throw new Error('useMQTT must be used within an MQTTProvider');
  }
  return context;
};

export const MQTTProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [client, setClient] = useState<any>(null);
  const [cycleCount, setCycleCount] = useState<string | null>(null);
  const isConnectedRef = useRef(false); // Track network state
  const clientRef = useRef<any>(null);
  const reconnectAttemptRef = useRef(0);
  const settingData = useSelector(
    (state: RootState) => state.Setting.settingData,
  );

  const MAX_RECONNECT_ATTEMPTS = 5;
  const RECONNECT_INTERVAL = 5000; // 5 seconds

  const getTopic = (): string | null => {
    return settingData?.setLineName
      ? `Production/ProductionBoard/run_video/${settingData.setLineName}`
      : null;
  };

  const initializeMQTT = () => {
    if (clientRef.current) return;

    const randomClientId = String(
      Math.floor(Math.random() * 100000000000),
    ).padStart(11, '0');

    MQTT.createClient({
      uri:
        settingData?.setCompanyID === 2
          ? 'mqtt://172.16.16.4:1883'
          : 'mqtt://172.16.1.4:1883',
      clientId: randomClientId,
    })
      .then(mqttClient => {
        clientRef.current = mqttClient;
        setClient(mqttClient);

        mqttClient.on('closed', () => {
          console.log('MQTT connection closed');
          clientRef.current = null;
          // Attempt to reconnect if network is available
          if (isConnectedRef.current) {
            scheduleReconnect();
          }
        });

        mqttClient.on('error', msg => {
          console.log('MQTT error:', msg);
          clientRef.current = null;
          // Attempt to reconnect if network is available
          if (isConnectedRef.current) {
            scheduleReconnect();
          }
        });

        mqttClient.on('message', msg => {
          console.log('MQTT message received:', msg);
          try {
            const parsed = JSON.parse(msg.data);
            if (parsed?.cycleCount) {
              setCycleCount(parsed.cycleCount);
              console.log('Parsed cycleCount:', parsed.cycleCount);
            }
          } catch (err) {
            console.log('Error parsing MQTT message:', err);
          }
        });

        mqttClient.on('connect', () => {
          console.log('MQTT connected');
          reconnectAttemptRef.current = 0; // Reset reconnect attempts on successful connection
          const topic = getTopic();
          if (topic) {
            mqttClient.subscribe(topic, 0);
          }
        });

        mqttClient.connect();
      })
      .catch(err => {
        console.log('MQTT connection failed:', err);
        clientRef.current = null;
        // Attempt to reconnect if network is available
        if (isConnectedRef.current) {
          scheduleReconnect();
        }
      });
  };

  const scheduleReconnect = () => {
    if (reconnectAttemptRef.current >= MAX_RECONNECT_ATTEMPTS) {
      console.log('Max reconnect attempts reached');
      return;
    }

    reconnectAttemptRef.current += 1;
    console.log(
      `Scheduling MQTT reconnect attempt ${reconnectAttemptRef.current}`,
    );

    setTimeout(() => {
      if (isConnectedRef.current && !clientRef.current) {
        initializeMQTT();
      }
    }, RECONNECT_INTERVAL);
  };

  // Monitor network changes and manage MQTT connection
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      const online = state.isConnected && state.isInternetReachable;

      if (online && !isConnectedRef.current) {
        isConnectedRef.current = true;
        console.log('Network is online - initializing MQTT...');
        initializeMQTT();
      } else if (!online && isConnectedRef.current) {
        isConnectedRef.current = false;
        console.log('Network is offline - disconnecting MQTT...');
        if (clientRef.current) {
          clientRef.current.disconnect();
          clientRef.current = null;
          setClient(null);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // Reinitialize MQTT on settings change
  useEffect(() => {
    if (isConnectedRef.current) {
      initializeMQTT();
    }

    return () => {
      if (clientRef.current) {
        clientRef.current.disconnect();
        clientRef.current = null;
        setClient(null);
      }
    };
  }, [settingData]);

  const connect = () => {
    if (!clientRef.current && isConnectedRef.current) {
      initializeMQTT();
    }
  };

  const disconnect = () => {
    if (clientRef.current) {
      clientRef.current.disconnect();
      clientRef.current = null;
      setClient(null);
    }
  };

  const sendMessage = (message: string) => {
    const topic = getTopic();
    if (clientRef.current && topic) {
      clientRef.current.publish(topic, message, 0, false);
    }
  };

  const receivedMessage = () => {
    const topic = getTopic();
    if (clientRef.current && topic) {
      clientRef.current.subscribe(topic, 0);
    }
  };

  const resetCycleCount = () => setCycleCount(null);

  return (
    <MQTTContext.Provider
      value={{
        client,
        connect,
        disconnect,
        sendMessage,
        receivedMessage,
        cycleCount,
        resetCycleCount,
      }}>
      {children}
    </MQTTContext.Provider>
  );
};
