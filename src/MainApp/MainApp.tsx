import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import {RootState} from '../redux/store';
import MenuHeader from '../screens/menu/MenuHeader';
import {Dimensions, StyleSheet, Text, View} from 'react-native';

import Employeeinfodata from '../screens/EmployeeInfo/Employeeinfodata';
import LaywiseCutting from '../screens/Cutting/LaywiseCutting';
import LaywiseCuttingEdit from '../screens/Cutting/LaywiseCuttingEdit';
import QRCodescannerSceen from '../screens/Cutting/QRCodescannerSceen';
import DashboardScreen from '../screens/Dashboard/DashboardScreen';
import {MQTTProvider} from '../MqttContext/MqttContext';
import QRCodescanOnEmployeecode from '../screens/Cutting/QRCodescanOnEmployeecode';
import CuttingTableWiseEmployeeSet from '../screens/Cutting/CuttingTableWiseEmployeeSet';
import SpreadingList from '../screens/Cutting/SpreadingList';

// const Stack = createNativeStackNavigator();
type RootStackParamList = {
  Home: undefined;
  Employeeinfodata: undefined; // Add all your routes here
  Login: undefined;
  LaywiseCutting: undefined;
  LaywiseCuttingEdit: {id: number; QrCode: string; EmployeeQrcodeData: string};
  QRCodescannerSceen: {id: number};
  DashboardScreen: undefined;
  QRCodescanOnEmployeecode: {id: number};
  CuttingTableWiseEmployeeSet: undefined;
  SpreadingList: undefined;
};
const Stack = createNativeStackNavigator<RootStackParamList>();

const MainApp = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const user = useSelector((state: RootState) => state.auth.user);
  //console.log('isLoggedIn 777 ---- ', user);

  return (
    <MQTTProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={({navigation}) => ({
            headerBackTitleVisible: false,
            headerStyle: {
              backgroundColor: '#fff',
              fontSize: height * 0.012,
            },
            gestureEnabled: true,
            unmountOnBlur: true,
            animationEnabled: true,
            headerRight: () => (
              <View style={styles.headerRightContainer}>
                <Text style={styles.headerText}>
                  {user?.employeeName ? `${user.employeeName}` : 'Guest'}
                </Text>
                <MenuHeader />
              </View>
            ),
          })}>
          {isLoggedIn ? (
            <>
              {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
              {/* <Stack.Screen
              name="Employeeinfodata"
              component={Employeeinfodata}
              options={{headerShown: true}}
            /> */}

              <Stack.Screen
                name="DashboardScreen"
                component={DashboardScreen}
                options={{
                  headerShown: true,
                  headerTitle: 'Dashboard Screen',
                  headerTitleStyle: {
                    fontSize: height * 0.018,
                    fontWeight: 'bold',
                    color: '#333',
                  },
                }}
              />

              <Stack.Screen
                name="LaywiseCutting"
                component={LaywiseCutting}
                options={{
                  headerShown: true,
                  headerTitle: 'Laywise Cutting',
                  headerTitleStyle: {
                    fontSize: height * 0.018,
                    fontWeight: 'bold',
                    color: '#333',
                  },
                }}
              />

              <Stack.Screen
                name="SpreadingList"
                component={SpreadingList}
                options={{
                  headerShown: true,
                  headerTitle: 'Laywise Cutting',
                  headerTitleStyle: {
                    fontSize: height * 0.018,
                    fontWeight: 'bold',
                    color: '#333',
                  },
                }}
              />

              {/* <Stack.Screen
              name="LaywiseCutting"
              component={LaywiseCutting}
              options={{headerShown: true}}
            /> */}

              <Stack.Screen
                name="LaywiseCuttingEdit"
                component={LaywiseCuttingEdit}
                options={{
                  headerShown: true,
                  headerTitle: 'Laywise Cutting Edit',
                  headerTitleStyle: {
                    fontSize: height * 0.012,
                    fontWeight: 'bold',
                    color: '#333',
                  },
                }}
              />
              <Stack.Screen
                name="QRCodescannerSceen"
                component={QRCodescannerSceen}
                options={{
                  headerShown: false,
                  headerTitle: 'QR Codes canner ',
                  headerTitleStyle: {
                    fontSize: height * 0.012,
                    fontWeight: 'bold',
                    color: '#333',
                  },
                }}
              />

              <Stack.Screen
                name="CuttingTableWiseEmployeeSet"
                component={CuttingTableWiseEmployeeSet}
                options={{
                  headerShown: false,
                  headerTitle: 'QR Codes canner ',
                  headerTitleStyle: {
                    fontSize: height * 0.012,
                    fontWeight: 'bold',
                    color: '#333',
                  },
                }}
              />

              <Stack.Screen
                name="QRCodescanOnEmployeecode"
                component={QRCodescanOnEmployeecode}
                options={{
                  headerShown: false,
                  headerTitle: 'QR Codes canner ',
                  headerTitleStyle: {
                    fontSize: height * 0.012,
                    fontWeight: 'bold',
                    color: '#333',
                  },
                }}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{headerShown: false}}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </MQTTProvider>
  );
};
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  headerRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    paddingRight: '5%',
    fontSize: height * 0.012,
    textAlign: 'center',
    color: '#000',
  },
});
export default MainApp;
