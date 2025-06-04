import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import CombinedChartClustered from '../BarChart/CombinedChartClustered';
import HourlyTargetComponent from '../HourlyTargetScreen/HourlyTargetComponent';
import MarqueeText from 'react-native-marquee';
import EmployeeWise_cap_Compnent from '../EmployeeWise_Cap/EmployeeWise_cap_Compnent';
import IOT_Line_Graph_Info_Summery_Component from '../EmployeeWise_Cap/IOT_Line_Graph_Info_Summery_Component';
import InlineTable from '../BarChart/InlineTable';
import Svg, {Polygon} from 'react-native-svg';
import BasicInfoConponent from '../BasicInfo/BasicInfoConponent';
import Defect_Responsible_personComponent from '../DefectResponsible_Person/Defect_Responsible_personComponent';
import Weekly_PerformanceComponent from '../Weekly_Performance_chart/Weekly_PerformanceComponent';
import MarqueeView from 'react-native-marquee-view';
import Machine_Status_Component from '../CustomerFeedback/Machine_Status_Component';
import {useMQTT} from '../MqttContext/MqttContext';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../types';
import Icon from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../redux/slices/logoutSlice';
import {RootState} from '../redux/store';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import Defect_PieChart_Component from '../Defect/Defect_PieChart_Component';
import {instance} from '../Axiosinstance';

import KeepAwake from 'react-native-keep-awake';
import LiveClock from '../LiveClock/LiveClock';
import CustomerFeedbackComponent from '../CustomerFeedback/CustomerFeedbackComponent';
const squareData = Array.from({length: 50}, (_, i) => i + 1); // [1, 2, ..., 50]

type NextstyleItem = {
  layoutInfo: string;
};

const MainComponent: React.FC = () => {
  const [nextstyledata, setNextstyleData] = useState<NextstyleItem[]>([]);
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {cycleCount, receivedMessage, resetCycleCount} = useMQTT();

  const settingData = useSelector(
    (state: RootState) => state.Setting.settingData,
  );

  // console.log('cycleCount ' + settingData?.setLineName);

  useEffect(() => {
    receivedMessage();
  }, [settingData]);

  useEffect(() => {
    console.log('cycleCount:', cycleCount);
    if (cycleCount === '3232') {
      navigation.navigate('VedioComponent');
      resetCycleCount(); // reset after navigation to avoid repeated navigation
    }
  }, [cycleCount, navigation, resetCycleCount]);

  const get_NextLayout_Data = async () => {
    try {
      const response = await instance.get(
        `/Get_ProductionBoard_all_Info/Get_NextLayout_Data/${settingData?.setLineName}`,
      );
      // Assuming response.data.data is ChartItem[]
      setNextstyleData(response.data.data);
    } catch (error: any) {
      console.error('Error fetching data:', error.response || error.message);
    }
  };

  useEffect(() => {
    get_NextLayout_Data();
  }, []);

  useEffect(() => {
    // Activate keep-awake when component mounts
    KeepAwake.activate();

    // Optional: Deactivate when component unmounts
    return () => {
      KeepAwake.deactivate();
    };
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate('SettingsComponent');
    console.log('Logout hit');
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#7360F2',
        paddingHorizontal: 1.5,
      }}>
      <StatusBar animated={true} hidden={true} />

      <View
        style={{
          flex: 0.3,
          backgroundColor: '#00A1F4',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '35%',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            flexDirection: 'row',
          }}>
          <View style={{width: '15%'}}>
            <Pressable onPress={handleLogout}>
              <Icon
                name="logout"
                size={height * 0.02}
                style={{
                  color: '#fff',
                  marginHorizontal: 15,
                }}
              />
            </Pressable>
          </View>

          <View style={{width: '85%'}}>
            <Text
              style={{
                fontSize: height * 0.018,
                // textAlign: 'center',
                color: '#fff',
                fontWeight: 'bold',
              }}>
              Production Board : {settingData && settingData?.setLineName}
            </Text>
          </View>
        </View>
        <View
          style={{
            width: '25%',
            backgroundColor: '#000000',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}>
          <Text
            style={{
              fontSize: height * 0.018,
              textAlign: 'center',
              color: '#fff',
              fontWeight: 'bold',
            }}>
            <LiveClock />
            {/* <Text style={styles.clockText}>time</Text> */}
          </Text>
        </View>
        <View
          style={{
            width: '40%',
            backgroundColor: '#8B4513',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}>
          <Text
            style={{
              fontSize: height * 0.015,
              textAlign: 'center',
              color: '#fff',
              fontWeight: 'bold',
              backgroundColor: '#8B4513',
            }}>
            Next Layout :{nextstyledata && nextstyledata[0]?.layoutInfo}
          </Text>
        </View>
      </View>

      <View
        style={{flex: 3.7, backgroundColor: '#7360F2', flexDirection: 'row'}}>
        <View
          style={{
            width: '35%',
            backgroundColor: '#7360F2',
          }}>
          <HourlyTargetComponent />
        </View>
        <View
          style={{
            width: '65%',
            backgroundColor: '#7360F2',
            flexDirection: 'column',
            marginVertical: 0.5,
          }}>
          <View
            style={{
              flex: 1,
              backgroundColor: '#7360F2',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              marginVertical: 0.5,
            }}>
            <View
              style={{
                flex: 1,
                backgroundColor: '#7360F2',
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 0.5,
              }}>
              <BasicInfoConponent />
            </View>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: '#ADFF2F',
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 0.5,
            }}>
            <Defect_Responsible_personComponent />
          </View>
          <View
            style={{
              flexGrow: 1, // Allow it to expand vertically if inside ScrollView
              backgroundColor: '#00CED1',
              justifyContent: 'flex-start', // Align from top (not center)
              alignItems: 'stretch', // Allow full width usage
            }}>
            <Weekly_PerformanceComponent />
          </View>
        </View>
      </View>
      {/* MACHINE STATUS area */}
      <View
        style={{
          flex: 0.3,
          flexDirection: 'row',
          marginVertical: 0.5,
          alignItems: 'center',
          backgroundColor: '#fff',
        }}>
        <Machine_Status_Component />
      </View>

      {/* Chart area */}
      <View
        style={{
          flex: 3,
          flexDirection: 'row',
          backgroundColor: '#7360F2',
          marginVertical: 1,
        }}>
        <View style={{flex: 3, paddingRight: 1}}>
          <InlineTable />
        </View>
        <View style={{flex: 7}}>
          <CombinedChartClustered />
        </View>
      </View>

      {/* Current Worker Potential  */}
      <View
        style={{
          flex: 2,
          backgroundColor: '#7360F2',
          flexDirection: 'row',
          marginVertical: 0.5,
        }}>
        <View
          style={{
            flex: 1.5,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#000',
            marginHorizontal: 10,
          }}>
          <Defect_PieChart_Component />
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 2,
          }}>
          <IOT_Line_Graph_Info_Summery_Component />
        </View>

        <View
          style={{
            flex: 5.5,
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: '#000',
            marginHorizontal: 0.5,
          }}>
          <EmployeeWise_cap_Compnent />
        </View>
      </View>

      {/* CUSTOMER FEEDBACK area */}
      <View
        style={{
          flex: 0.3,
          // flexDirection: 'row',
          borderColor: '#E1E6ED',
          borderTopWidth: 0.5,
          marginVertical: 0.5,
          // alignItems: 'center',
          // backgroundColor: '#000',
        }}>
        <CustomerFeedbackComponent />
      </View>
    </View>
  );
};
const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    // marginTop: 100,
    // paddingHorizontal: 20,
    alignItems: 'center',
  },
  marqueeText: {
    textAlign: 'center',
    fontSize: height * 0.015,
  },

  CustomerFeedback_svg: {
    position: 'absolute',
    top: -2,
    left: 0,
  },
  CustomerFeedback_text: {
    fontSize: height * 0.015,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  CustomerFeedback_mainArea: {
    position: 'relative',
    width: 125,
    height: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  MACHINE_text: {
    fontSize: height * 0.012,
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  boxWrapper: {
    margin: 1,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  MACHINE_square: {
    width: 15, // Updated from 21 to 50 if you want
    height: 15,
    backgroundColor: '#286090',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
  },
  MACHINE_Item_text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: height * 0.01,
  },

  clockText: {
    fontSize: height * 0.025,
    fontWeight: 'bold',
    color: '#fff',
    // fontFamily: 'monospace', // optional
  },
});
export default React.memo(MainComponent);
