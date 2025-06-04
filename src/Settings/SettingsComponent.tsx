// import React, {useEffect, useState} from 'react';
// import {Alert, Dimensions, StyleSheet, Text, View} from 'react-native';
// import GlobalDropdown from '../components/Dropdown/GlobalDropdown';
// import GlobalButton from '../components/Button/GlobalButton';
// import {useDispatch, useSelector} from 'react-redux';

// import {RootState} from '../redux/store';
// import {setSettingData} from '../redux/slices/SettingSlice';
// import {instance} from '../Axiosinstance';
// import {NavigationProp, useNavigation} from '@react-navigation/native';
// import {RootStackParamList} from '../../types';
// import Spinner from 'react-native-loading-spinner-overlay';

// const FloorarrayData = [
//   {label: 'SSL', value: '1'},
//   {label: 'SOL', value: '2'},
//   {label: 'B-10', value: '3'},
// ];

// const linearrayData = [
//   {label: 'SSL', value: '1'},
//   {label: 'SOL', value: '2'},
//   {label: 'B-10', value: '3'},
// ];

// type CompanyItem = {
//   label: string;
//   value: string | number;
// };

// type FloorItem = {
//   label: string;
//   value: string | number;
// };
// type LineItem = {
//   label: string;
//   value: string | number;
// };
// const SettingsComponent = () => {
//   const [company, setCompany] = useState<CompanyItem[]>([]);
//   const [companyValue, setCompanyValue] = useState<CompanyItem | null>(null);
//   const [spinner, setSpinner] = useState(false);

//   const [floor, setFloor] = useState<FloorItem[]>([]);
//   const [floorValue, setFloorValue] = useState<FloorItem | null>(null);

//   const [line, setLine] = useState<LineItem[]>([]);
//   const [lineValue, setLineValue] = useState<FloorItem | null>(null);
//   const navigation = useNavigation<NavigationProp<RootStackParamList>>();
//   const dispatch = useDispatch();
//   const handelsetSettingData = () => {
//     setSpinner(true);
//     if (!companyValue || !floorValue || !lineValue) {
//       Alert.alert('Missing Info', 'Please select Company, Floor, and Line');
//       setSpinner(false);
//       return;
//     }
//     console.log(
//       'get All Data',
//       companyValue,
//       floorValue?.label,
//       floorValue?.value,
//       lineValue?.label,
//       lineValue?.value,
//     );

//     const Settingdata = {
//       setCompanyName: companyValue?.label,
//       setCompanyID: companyValue?.value,
//       setFloorName: floorValue?.label,
//       setFloorID: floorValue?.value,
//       setLineName: lineValue?.label,
//       setLineID: lineValue?.value,
//     };

//     dispatch(setSettingData(Settingdata));
//     setFloorValue(null);
//     setLineValue(null);
//     setCompanyValue(null);
//     setFloor([]);
//     setLine([]);
//     setCompany([]);
//     handel_get_All_Company_Data();
//     navigation.navigate('MainComponent');
//     setSpinner(false);
//   };

//   // const settingData = useSelector(
//   //   (state: RootState) => state.Setting.settingData,
//   // );

//   // console.log('Get settingData ' + JSON.stringify(settingData, null, 2));

//   const handel_get_All_Company_Data = async () => {
//     setSpinner(true);
//     try {
//       const response = await instance.get(
//         '/Get_ProductionBoard_all_Info/Get_All_Company_cascading',
//       );

//       const newArray = response.data.data.map((item: any) => ({
//         value: item.id,
//         label: item.companyName,
//       }));

//       setCompany(newArray);
//       setSpinner(false);
//     } catch (error: any) {
//       console.error('Error fetching data:', error.response || error.message);
//     }
//   };

//   const handel_get_Floor_Data = async (companyID: number) => {
//     setSpinner(true);
//     try {
//       const response = await instance.get(
//         `/Get_ProductionBoard_all_Info/Get_Floor_cascading/${companyID}`,
//       );

//       const newArray = response.data.data.map((item: any) => ({
//         value: item.id,
//         label: item.floorName,
//       }));

//       setFloor(newArray);
//       setSpinner(false);
//     } catch (error: any) {
//       console.error('Error fetching data:', error.response || error.message);
//     }
//   };

//   const handel_get_Line_Data = async (FloorID: number) => {
//     setSpinner(true);
//     try {
//       const response = await instance.get(
//         `/Get_ProductionBoard_all_Info/Get_Line_cascading/${FloorID}`,
//       );

//       const newArray = response.data.data.map((item: any) => ({
//         value: item.id,
//         label: item.lineName,
//       }));

//       setLine(newArray);
//       setSpinner(false);
//     } catch (error: any) {
//       console.error('Error fetching data:', error.response || error.message);
//     }
//   };

//   useEffect(() => {
//     handel_get_All_Company_Data();
//   }, []);

//   return (
//     <View
//       style={{
//         flex: 1,
//         flexDirection: 'column',
//         backgroundColor: '#fff',
//         paddingHorizontal: 2,
//       }}>
//       <View style={{flex: 1, backgroundColor: '#D3D3D3'}}></View>

//       <View
//         style={{
//           flex: 6,
//           backgroundColor: '#D3D3D3',
//           alignItems: 'center',
//           //   flexDirection: 'row',
//         }}>
//         <View style={{paddingVertical: 10}}>
//           <GlobalDropdown
//             data={company}
//             placeholder="Select Company"
//             searchPlaceholder="Search Company"
//             onChange={(item: CompanyItem) => {
//               setCompanyValue(item);
//               handel_get_Floor_Data(Number(item.value));
//             }}
//             width={height / 2}
//             fontSize={height * 0.014}
//           />
//         </View>
//         <View style={{paddingVertical: 10}}>
//           <GlobalDropdown
//             data={floor}
//             onChange={(item: any) => {
//               console.log('Selected:', item);
//               setFloorValue(item);
//               handel_get_Line_Data(item.value);
//             }}
//             placeholder="Choose an Floor"
//             searchPlaceholder="Search Floor"
//             width={height / 2}
//             fontSize={height * 0.014}
//           />
//         </View>
//         <View style={{paddingVertical: 10}}>
//           <GlobalDropdown
//             data={line}
//             onChange={(item: any) => {
//               setLineValue(item);
//             }}
//             placeholder="Choose an Line"
//             searchPlaceholder="Search Line"
//             width={height / 2}
//             fontSize={height * 0.014}
//           />
//         </View>

//         <View style={{paddingVertical: 10}}>
//           <GlobalButton
//             //title={buyerValue ? 'Fetch Data' : 'Select a Buyer First'}
//             title={'Submit'}
//             onPress={() => {
//               handelsetSettingData();
//             }}
//             // disabled={!buyerValue}
//             fontSize={height * 0.022}
//             buttonStyle={{
//               // backgroundColor: buyerValue ? '#6200EE' : '#BDBDBD',
//               backgroundColor: '#0087D2',
//               width: height * 0.5,
//             }}
//           />
//         </View>
//         <Spinner
//           visible={spinner}
//           textContent={'Loading...'}
//           overlayColor="rgba(0,0,0,0.5)"
//           textStyle={{color: '#FFF'}}
//         />
//       </View>
//       <View style={{flex: 1, backgroundColor: '#D3D3D3'}}></View>
//     </View>
//   );
// };
// const {height, width} = Dimensions.get('screen');
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     justifyContent: 'center',
//     backgroundColor: '#f2f2f2',
//   },
//   title: {
//     fontSize: 20,
//     marginBottom: 16,
//     textAlign: 'center',
//   },
//   selectedText: {
//     marginTop: 20,
//     fontSize: 16,
//     textAlign: 'center',
//   },
//   spinnerTextStyle: {
//     color: '#FFF',
//   },
// });

// export default SettingsComponent;

// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   Dimensions,
// } from 'react-native';

// const DATA = [
//   {
//     name: 'Company A',
//     floors: [
//       {name: 'Floor 1', lines: ['Line 1', 'Line 2']},
//       {name: 'Floor 2', lines: ['Line 3']},
//     ],
//   },
//   {
//     name: 'Company B',
//     floors: [{name: 'Floor 3', lines: ['Line 4', 'Line 5']}],
//   },
// ];

// const SettingsComponent = () => {
//   const [selectedCompanyIndex, setSelectedCompanyIndex] = useState<
//     number | null
//   >(null);
//   const [selectedFloorIndex, setSelectedFloorIndex] = useState<number | null>(
//     null,
//   );

//   const selectedCompany =
//     selectedCompanyIndex !== null ? DATA[selectedCompanyIndex] : null;
//   const selectedFloor =
//     selectedCompany && selectedFloorIndex !== null
//       ? selectedCompany.floors[selectedFloorIndex]
//       : null;

//   return (
//     <View style={styles.container}>
//       <View style={styles.column}>
//         <Text style={styles.sectionTitle}>Company</Text>
//         <ScrollView>
//           {DATA.map((company, index) => (
//             <TouchableOpacity
//               key={index}
//               hasTVPreferredFocus={selectedCompanyIndex === null && index === 0}
//               onPress={() => {
//                 setSelectedCompanyIndex(index);
//                 setSelectedFloorIndex(null);
//               }}
//               style={[
//                 styles.item,
//                 selectedCompanyIndex === index && styles.selectedItem,
//               ]}>
//               <Text style={styles.text}>{company.name}</Text>
//             </TouchableOpacity>
//           ))}
//         </ScrollView>
//       </View>

//       <View style={styles.column}>
//         <Text style={styles.sectionTitle}>Floor</Text>
//         {selectedCompany ? (
//           <ScrollView>
//             {selectedCompany.floors.map((floor, index) => (
//               <TouchableOpacity
//                 key={index}
//                 hasTVPreferredFocus={selectedFloorIndex === null && index === 0}
//                 onPress={() => setSelectedFloorIndex(index)}
//                 style={[
//                   styles.item,
//                   selectedFloorIndex === index && styles.selectedItem,
//                 ]}>
//                 <Text style={styles.text}>{floor.name}</Text>
//               </TouchableOpacity>
//             ))}
//           </ScrollView>
//         ) : (
//           <Text style={styles.placeholderText}>Select a company</Text>
//         )}
//       </View>

//       <View style={styles.column}>
//         <Text style={styles.sectionTitle}>Line</Text>
//         {selectedFloor ? (
//           <ScrollView>
//             {selectedFloor.lines.map((line, index) => (
//               <TouchableOpacity
//                 key={index}
//                 onPress={() => console.log('Selected Line:', line)}
//                 style={styles.item}>
//                 <Text style={styles.text}>{line}</Text>
//               </TouchableOpacity>
//             ))}
//           </ScrollView>
//         ) : (
//           <Text style={styles.placeholderText}>Select a floor</Text>
//         )}
//       </View>
//     </View>
//   );
// };

// const {height, width} = Dimensions.get('screen');
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'row',
//     backgroundColor: '#1c1c1c',
//     padding: 10,
//   },
//   column: {
//     flex: 1,
//     marginHorizontal: 5,
//     backgroundColor: '#2e2e2e',
//     borderRadius: 10,
//     padding: 10,
//   },
//   sectionTitle: {
//     color: '#fff',
//     fontSize: height * 0.025,
//     marginBottom: 10,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     borderBottomWidth: 1,
//     borderBottomColor: '#444',
//     paddingBottom: 5,
//   },
//   item: {
//     padding: height * 0.025,
//     marginVertical: 6,
//     backgroundColor: '#444',
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   selectedItem: {
//     backgroundColor: '#FF9800',
//   },
//   text: {
//     color: '#fff',
//     fontSize: height * 0.022,
//     fontWeight: '500',
//   },
//   placeholderText: {
//     color: '#999',
//     textAlign: 'center',
//     marginTop: 20,
//     fontSize: height * 0.02,
//   },
// });

// export default SettingsComponent;

// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   Dimensions,
//   Alert,
//   ActivityIndicator,
// } from 'react-native';
// import {useNavigation} from '@react-navigation/native';
// import {useDispatch} from 'react-redux';
// import {setSettingData} from '../redux/slices/SettingSlice';
// import {instance} from '../Axiosinstance';

// interface SelectOption {
//   value: number;
//   label: string;
// }

// const SettingsComponent: React.FC = () => {
//   const [company, setCompany] = useState<SelectOption[]>([]);
//   const [floor, setFloor] = useState<SelectOption[]>([]);
//   const [line, setLine] = useState<SelectOption[]>([]);

//   const [selectedCompany, setSelectedCompany] = useState<SelectOption | null>(
//     null,
//   );
//   const [selectedFloor, setSelectedFloor] = useState<SelectOption | null>(null);
//   const [selectedLine, setSelectedLine] = useState<SelectOption | null>(null);

//   const [focusedCompanyIndex, setFocusedCompanyIndex] = useState<number | null>(
//     null,
//   );
//   const [focusedFloorIndex, setFocusedFloorIndex] = useState<number | null>(
//     null,
//   );
//   const [focusedLineIndex, setFocusedLineIndex] = useState<number | null>(null);
//   const [submitFocused, setSubmitFocused] = useState(false);
//   const [spinner, setSpinner] = useState<boolean>(false);

//   const navigation = useNavigation<any>();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     getAllCompanies();
//   }, []);

//   const getAllCompanies = async () => {
//     setSpinner(true);
//     try {
//       const response = await instance.get(
//         '/Get_ProductionBoard_all_Info/Get_All_Company_cascading',
//       );
//       const newArray = response.data.data.map((item: any) => ({
//         value: item.id,
//         label: item.companyName,
//       }));
//       setCompany(newArray);
//     } catch (error: any) {
//       console.error('Company fetch error:', error.response || error.message);
//     }
//     setSpinner(false);
//   };

//   const getFloors = async (companyID: number) => {
//     setSpinner(true);
//     try {
//       const response = await instance.get(
//         `/Get_ProductionBoard_all_Info/Get_Floor_cascading/${companyID}`,
//       );
//       const newArray = response.data.data.map((item: any) => ({
//         value: item.id,
//         label: item.floorName,
//       }));
//       setFloor(newArray);
//     } catch (error: any) {
//       console.error('Floor fetch error:', error.response || error.message);
//     }
//     setSpinner(false);
//   };

//   const getLines = async (floorID: number) => {
//     setSpinner(true);
//     try {
//       const response = await instance.get(
//         `/Get_ProductionBoard_all_Info/Get_Line_cascading/${floorID}`,
//       );
//       const newArray = response.data.data.map((item: any) => ({
//         value: item.id,
//         label: item.lineName,
//       }));
//       setLine(newArray);
//     } catch (error: any) {
//       console.error('Line fetch error:', error.response || error.message);
//     }
//     setSpinner(false);
//   };

//   const handleSetSettingData = () => {
//     if (!selectedCompany || !selectedFloor || !selectedLine) {
//       Alert.alert('Missing Info', 'Please select Company, Floor, and Line');
//       return;
//     }

//     const Settingdata = {
//       setCompanyName: selectedCompany.label,
//       setCompanyID: selectedCompany.value,
//       setFloorName: selectedFloor.label,
//       setFloorID: selectedFloor.value,
//       setLineName: selectedLine.label,
//       setLineID: selectedLine.value,
//     };

//     dispatch(setSettingData(Settingdata));
//     navigation.navigate('MainComponent');
//   };

//   const {height} = Dimensions.get('screen');

//   return (
//     <View style={styles.container}>
//       {spinner && (
//         <View style={styles.loader}>
//           <ActivityIndicator size="large" color="#FF9800" />
//         </View>
//       )}

//       {/* Company list */}
//       <View style={styles.column}>
//         <Text style={styles.sectionTitle}>Company</Text>
//         <ScrollView
//           showsVerticalScrollIndicator={false}
//           nestedScrollEnabled={true}>
//           {company.length === 0 && !spinner && (
//             <Text style={styles.placeholderText}>No companies found</Text>
//           )}
//           {company.map((item, index) => (
//             <TouchableOpacity
//               key={item.value}
//               focusable={true}
//               hasTVPreferredFocus={index === 0}
//               onFocus={() => setFocusedCompanyIndex(index)}
//               onBlur={() => setFocusedCompanyIndex(null)}
//               onPress={() => {
//                 setSelectedCompany(item);
//                 setSelectedFloor(null);
//                 setSelectedLine(null);
//                 setFloor([]);
//                 setLine([]);
//                 getFloors(item.value);
//               }}
//               style={[
//                 styles.item,
//                 selectedCompany?.value === item.value && styles.selectedItem,
//                 focusedCompanyIndex === index && styles.focusedItem,
//               ]}>
//               <Text style={styles.text}>{item.label}</Text>
//             </TouchableOpacity>
//           ))}
//         </ScrollView>
//       </View>

//       {/* Floor list */}
//       <View style={styles.column}>
//         <Text style={styles.sectionTitle}>Floor</Text>
//         {selectedCompany ? (
//           <ScrollView
//             showsVerticalScrollIndicator={false}
//             nestedScrollEnabled={true}>
//             {floor.length === 0 && !spinner && (
//               <Text style={styles.placeholderText}>No floors found</Text>
//             )}
//             {floor.map((item, index) => (
//               <TouchableOpacity
//                 key={item.value}
//                 focusable={true}
//                 hasTVPreferredFocus={index === 0}
//                 onFocus={() => setFocusedFloorIndex(index)}
//                 onBlur={() => setFocusedFloorIndex(null)}
//                 onPress={() => {
//                   setSelectedFloor(item);
//                   setSelectedLine(null);
//                   setLine([]);
//                   getLines(item.value);
//                 }}
//                 style={[
//                   styles.item,
//                   selectedFloor?.value === item.value && styles.selectedItem,
//                   focusedFloorIndex === index && styles.focusedItem,
//                 ]}>
//                 <Text style={styles.text}>{item.label}</Text>
//               </TouchableOpacity>
//             ))}
//           </ScrollView>
//         ) : (
//           <Text style={styles.placeholderText}>Select a company</Text>
//         )}
//       </View>

//       {/* Line list */}
//       <View style={styles.column}>
//         <Text style={styles.sectionTitle}>Line</Text>
//         {selectedFloor ? (
//           <ScrollView
//             showsVerticalScrollIndicator={false}
//             nestedScrollEnabled={true}>
//             {line.length === 0 && !spinner && (
//               <Text style={styles.placeholderText}>No lines found</Text>
//             )}
//             {line.map((item, index) => (
//               <TouchableOpacity
//                 key={item.value}
//                 focusable={true}
//                 hasTVPreferredFocus={index === 0}
//                 onFocus={() => setFocusedLineIndex(index)}
//                 onBlur={() => setFocusedLineIndex(null)}
//                 onPress={() => setSelectedLine(item)}
//                 style={[
//                   styles.item,
//                   selectedLine?.value === item.value && styles.selectedItem,
//                   focusedLineIndex === index && styles.focusedItem,
//                 ]}>
//                 <Text style={styles.text}>{item.label}</Text>
//               </TouchableOpacity>
//             ))}
//           </ScrollView>
//         ) : (
//           <Text style={styles.placeholderText}>Select a floor</Text>
//         )}
//       </View>

//       {/* Submit Button */}
//       <View style={styles.column}>
//         <Text style={styles.sectionTitle}>Action</Text>
//         <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//           <TouchableOpacity
//             focusable={true}
//             hasTVPreferredFocus={
//               !selectedCompany && !selectedFloor && !selectedLine
//             }
//             onFocus={() => setSubmitFocused(true)}
//             onBlur={() => setSubmitFocused(false)}
//             onPress={handleSetSettingData}
//             style={[
//               styles.submitButton,
//               submitFocused && styles.submitButtonFocused,
//             ]}>
//             <Text style={styles.submitText}>Submit</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// };

// const {height} = Dimensions.get('screen');

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'row',
//     backgroundColor: '#1c1c1c',
//     padding: 5,
//   },
//   column: {
//     flex: 1,
//     marginHorizontal: 2,
//     backgroundColor: '#2e2e2e',
//     borderRadius: 5,
//     padding: 10,
//   },
//   sectionTitle: {
//     color: '#fff',
//     fontSize: height * 0.025,
//     marginBottom: 4,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   item: {
//     backgroundColor: '#3a3a3a',
//     paddingVertical: 12,
//     marginVertical: 3,
//     borderRadius: 5,
//     justifyContent: 'center',
//   },
//   selectedItem: {
//     backgroundColor: '#FF9800',
//   },
//   focusedItem: {
//     borderWidth: 2,
//     borderColor: '#FF9800',
//   },
//   text: {
//     color: '#eee',
//     fontSize: height * 0.02,
//     textAlign: 'center',
//   },
//   placeholderText: {
//     color: '#aaa',
//     fontSize: height * 0.018,
//     textAlign: 'center',
//     marginTop: 20,
//   },
//   submitButton: {
//     backgroundColor: '#FF9800',
//     paddingVertical: 15,
//     paddingHorizontal: 30,
//     borderRadius: 5,
//   },
//   submitButtonFocused: {
//     backgroundColor: '#ffb74d',
//     borderWidth: 2,
//     borderColor: '#fff',
//   },
//   submitText: {
//     fontSize: height * 0.025,
//     fontWeight: 'bold',
//     color: '#222',
//     textAlign: 'center',
//   },
//   loader: {
//     position: 'absolute',
//     zIndex: 10,
//     top: '45%',
//     left: '45%',
//   },
// });

// export default SettingsComponent;

import React, {useState, useRef, useEffect} from 'react';
import {View, Text, StyleSheet, Alert, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import QRCode from 'react-native-qrcode-svg';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {setSettingData} from '../redux/slices/SettingSlice';
const MQTT = require('sp-react-native-mqtt');

const MQTT_URI = 'mqtt://172.16.16.4:1883';
const MQTT_TOPIC = 'Production/ProductionBoard/Seeting';

const generateClientId = () =>
  `ProductBoard_${Math.floor(Math.random() * 1000000)}`;

const SettingsComponent: React.FC = () => {
  const [clientId, setClientId] = useState(generateClientId());
  const [connected, setConnected] = useState(false);
  const [connectedCount, setConnectedCount] = useState<number>(0);
  const clientRef = useRef<any>(null);
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();

  const connectMqtt = (newClientId: string) => {
    MQTT.createClient({
      uri: MQTT_URI,
      clientId: newClientId,
    })
      .then(client => {
        if (clientRef.current) {
          clientRef.current.disconnect();
        }

        clientRef.current = client;

        client.on('closed', () => {
          console.log('MQTT connection closed');
          // setConnected(false);
        });

        client.on('error', (msg: any) => {
          console.log('MQTT error', msg);
          Alert.alert('MQTT Error', msg.toString());
        });

        client.on('message', (msg: any) => {
          console.log('MQTT message received:', msg);
          try {
            const parsed = JSON.parse(msg.data);

            if (parsed?.SettingData) {
              console.log('Parsed SettingData:', parsed.SettingData);
              console.log('Parsed SettingData:', parsed.setCompanyName);

              if (parsed.SettingData === '1234') {
                const newId = generateClientId();
                setClientId(newId);
                setConnected(true);
                setConnectedCount(prev => prev + 1);
              }

              if (parsed.SettingData === newClientId) {
                if (
                  !parsed.setCompanyName ||
                  !parsed.setCompanyID ||
                  !parsed.setFloorName ||
                  !parsed.setFloorID ||
                  !parsed.setLineName ||
                  !parsed.setLineID
                ) {
                  Alert.alert(
                    'Missing Info',
                    'Please select Company, Floor, and Line',
                  );
                  return;
                }

                const Settingdata = {
                  setCompanyName: parsed.setCompanyName,
                  setCompanyID: parsed.setCompanyID,
                  setFloorName: parsed.setFloorName,
                  setFloorID: parsed.setFloorID,
                  setLineName: parsed.setLineName,
                  setLineID: parsed.setLineID,
                };

                dispatch(setSettingData(Settingdata));
                navigation.navigate('MainComponent');

                setConnected(true);
              }
            }
          } catch (err) {
            console.log('Error parsing MQTT message:', err);
          }
        });

        client.on('connect', () => {
          console.log('Connected to MQTT broker');
          // setConnected(true);
          client.subscribe(MQTT_TOPIC, 0);
          client.publish(MQTT_TOPIC, 'Hello from React Native!', 0, false);
        });

        client.connect();
      })
      .catch((err: any) => {
        console.error('MQTT connection failed:', err);
      });
  };

  useEffect(() => {
    connectMqtt(clientId);

    return () => {
      if (clientRef.current) {
        clientRef.current.disconnect();
      }
    };
  }, [clientId]);

  return (
    <View style={{flex: 1, flexDirection: 'column', backgroundColor: '#fff'}}>
      <View
        style={{
          flex: 1,
          alignItems: 'flex-end',
          justifyContent: 'space-around',
          paddingHorizontal: 50,
        }}>
        <View style={{position: 'relative'}}>
          <Icon
            name={connected ? 'wifi' : 'wifi-off'}
            size={30}
            color={connected ? 'green' : 'red'}
          />
          <View
            style={{
              position: 'absolute',
              top: -6,
              right: -10,
              backgroundColor: 'red',
              borderRadius: 10,
              minWidth: 20,
              height: 20,
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 4,
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: height * 0.018,
                fontWeight: 'bold',
              }}>
              {connectedCount}
            </Text>
          </View>
        </View>
      </View>

      <View style={{flex: 7, justifyContent: 'center', alignItems: 'center'}}>
        {/* <Text style={styles.text}>
          {connected ? 'Connected to MQTT' : 'Not Connected'}
        </Text> */}

        <QRCode value={clientId} size={200} />
        <Text>{clientId}</Text>
      </View>
    </View>
  );
};
const {width, height} = Dimensions.get('screen');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  text: {marginTop: 10, fontSize: height * 0.18},
});

export default SettingsComponent;
