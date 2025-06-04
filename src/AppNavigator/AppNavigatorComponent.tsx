// import * as React from 'react';
// import {NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {useSelector} from 'react-redux';
// import SettingsComponent from '../Settings/SettingsComponent';
// import MainComponent from '../MainScreen/MainComponent';
// import VedioComponent from '../VedioScreen/VedioComponent';
// import {RootState} from '../redux/store';
// import {StatusBar} from 'react-native';

// const Stack = createNativeStackNavigator();

// const AppNavigatorComponent = () => {
//   const settingData = useSelector(
//     (state: RootState) => state.Setting.settingData,
//   );

//   const initialRoute = settingData ? 'MainComponent' : 'SettingsComponent';

//   return (
//     <NavigationContainer>
//       <StatusBar hidden={true} />
//       <Stack.Navigator initialRouteName={initialRoute}>
//         <Stack.Screen
//           name="SettingsComponent"
//           component={SettingsComponent}
//           options={{
//             headerShown: true,
//             title: 'Settings',
//             headerBackVisible: false,
//           }}
//         />
//         <Stack.Screen
//           name="MainComponent"
//           component={MainComponent}
//           options={{headerShown: false}}
//         />
//         <Stack.Screen
//           name="VedioComponent"
//           component={VedioComponent}
//           options={{headerShown: false}}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default AppNavigatorComponent;

// import * as React from 'react';
// import {NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {useSelector} from 'react-redux';
// import SettingsComponent from '../Settings/SettingsComponent';
// import MainComponent from '../MainScreen/MainComponent';
// import VedioComponent from '../VedioScreen/VedioComponent';
// import {RootState} from '../redux/store';
// import {StatusBar, View} from 'react-native';
// import useAppUpdateCheck from '../hooks/useAppUpdateCheck';
// import UpdateProgressModal from '../hooks/UpdateProgressModal';

// const Stack = createNativeStackNavigator();

// const AppNavigatorComponent = () => {
//   const settingData = useSelector(
//     (state: RootState) => state.Setting.settingData,
//   );
//   const {progressVisible, downloadProgress} = useAppUpdateCheck();

//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         {!settingData ? (
//           <>
//             <Stack.Screen
//               name="SettingsComponent"
//               component={SettingsComponent}
//               options={{
//                 headerShown: true,
//                 title: 'Settings',
//                 headerBackVisible: false,
//               }}
//             />
//             <Stack.Screen
//               name="MainComponent"
//               component={MainComponent}
//               options={{headerShown: false}}
//             />
//             <View style={{flex: 1}}>
//               {/* Your app UI */}
//               <UpdateProgressModal
//                 visible={progressVisible}
//                 progress={downloadProgress}
//               />
//             </View>
//           </>
//         ) : (
//           <>
//             <Stack.Screen
//               name="MainComponent"
//               component={MainComponent}
//               options={{headerShown: false}}
//             />
//             <Stack.Screen
//               name="VedioComponent"
//               component={VedioComponent}
//               options={{headerShown: false}}
//             />
//             <Stack.Screen
//               name="SettingsComponent"
//               component={SettingsComponent}
//               options={{headerShown: false}}
//             />
//             <View style={{flex: 1}}>
//               {/* Your app UI */}
//               <UpdateProgressModal
//                 visible={progressVisible}
//                 progress={downloadProgress}
//               />
//             </View>
//           </>
//         )}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default AppNavigatorComponent;

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import SettingsComponent from '../Settings/SettingsComponent';
import MainComponent from '../MainScreen/MainComponent';
import VedioComponent from '../VedioScreen/VedioComponent';
import {RootState} from '../redux/store';
import {StatusBar, View} from 'react-native';
import useAppUpdateCheck from '../hooks/useAppUpdateCheck';
import UpdateProgressModal from '../hooks/UpdateProgressModal';

const Stack = createNativeStackNavigator();

const AppNavigatorComponent = () => {
  const settingData = useSelector(
    (state: RootState) => state.Setting.settingData,
  );
  const {progressVisible, downloadProgress} = useAppUpdateCheck();

  return (
    <NavigationContainer>
      <View style={{flex: 1}}>
        <Stack.Navigator>
          {!settingData ? (
            <>
              <Stack.Screen
                name="SettingsComponent"
                component={SettingsComponent}
                options={{
                  headerShown: true,
                  title: 'Settings',
                  headerBackVisible: false,
                }}
              />
              <Stack.Screen
                name="MainComponent"
                component={MainComponent}
                options={{headerShown: false}}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="MainComponent"
                component={MainComponent}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="VedioComponent"
                component={VedioComponent}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="SettingsComponent"
                component={SettingsComponent}
                options={{headerShown: false}}
              />
            </>
          )}
        </Stack.Navigator>

        {/* ✅ Move the modal here, OUTSIDE the Navigator */}
        <UpdateProgressModal
          visible={progressVisible}
          progress={downloadProgress}
        />
      </View>
    </NavigationContainer>
  );
};
export default AppNavigatorComponent;
