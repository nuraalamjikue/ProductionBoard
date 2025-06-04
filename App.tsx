// import React from 'react';
// import {Provider} from 'react-redux';
// import {PersistGate} from 'redux-persist/integration/react';
// import {persistor, store} from './src/redux/store';
// import AppNavigatorComponent from './src/AppNavigator/AppNavigatorComponent';
// import {MQTTProvider} from './src/MqttContext/MqttContext';
// import NetworkHandler from './src/components/NetworkHandler/NetworkHandler';

// const App = () => {
//   return (
//     <Provider store={store}>
//       <PersistGate loading={null} persistor={persistor}>
//         <NetworkHandler>
//           <MQTTProvider>
//             <AppNavigatorComponent />
//           </MQTTProvider>
//         </NetworkHandler>
//       </PersistGate>
//     </Provider>
//   );
// };

// export default App;

import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/redux/store';
import AppNavigatorComponent from './src/AppNavigator/AppNavigatorComponent';
import {MQTTProvider} from './src/MqttContext/MqttContext';
import {View, Text} from 'react-native';
import {useNetwork} from './src/hooks/useNetwork';
import LoadingDots from 'react-native-loading-dots';
const AppContent = () => {
  const isConnected = useNetwork();

  if (isConnected === null) {
    // Still checking network status
    return null;
  }

  if (!isConnected) {
    // Show offline message and render app without MQTT
    return (
      <View style={{flex: 1, flexDirection: 'column', backgroundColor: '#fff'}}>
        <View style={{flex: 6}}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <LoadingDots />
          </View>
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: 'red', fontSize: 18}}>
            📴 No Internet Connection
          </Text>
          <Text style={{color: 'red', fontSize: 12}}>
            For any query please contact 2735
          </Text>
        </View>
      </View>
    );
  }

  // Online: mount everything including MQTT
  return (
    <MQTTProvider>
      <AppNavigatorComponent />
    </MQTTProvider>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppContent />
      </PersistGate>
    </Provider>
  );
};

export default App;
