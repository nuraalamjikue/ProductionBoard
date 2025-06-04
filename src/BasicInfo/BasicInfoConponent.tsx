import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {instance} from '../Axiosinstance';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {
  SetLocalDR,
  setStyleData,
  setTodayTarget,
} from '../redux/slices/SettingSlice';

type BasicInfoItem = {
  style: string;
  buyer: string;
  todayTarget: number;
  daysRun: number;
  peakTarget: Number;
  mcQty: number;
  manPower: number;
  absent: number;
  sotValue: number;
};
type DRDataItem = {
  dr: number;
};
type last_day_variancedata = {
  plannedhitRateGap: number;
  cpmVariance: number;
  maxsl: number;
};
const BasicInfoConponent = () => {
  const [data, setData] = useState<BasicInfoItem[]>([]);
  const [drdata, setDRData] = useState<DRDataItem[]>([]);
  const [last_day_variancedata, setlast_day_variancedata] = useState<
    last_day_variancedata[]
  >([]);
  const dispatch = useDispatch();
  const settingData = useSelector(
    (state: RootState) => state.Setting.settingData,
  );

  // console.log('cycleCount ' + settingData?.setLineID);
  // const get_BasicInfoData = async () => {
  //   try {
  //     const response = await instance.get(
  //       `/Get_ProductionBoard_all_Info/GetLoadBasicInfo/${settingData?.setLineID}`,
  //     );
  //     console.log('');

  //     // Assuming response.data.data is ChartItem[]
  //     setData(response.data.data);
  //     // console.log('response.data.data[0].style ' + response.data.data[0].style);

  //     dispatch(setStyleData(response.data.data[0].style));
  //   } catch (error: any) {
  //     console.error('Error fetching data:', error.response || error.message);
  //   }
  // };

  const GetToday_Performance_DR_With_LineID_Data = async () => {
    try {
      const response = await instance.get(
        `/Get_ProductionBoard_all_Info/GetToday_Performance_DR_With_LineID/${settingData?.setLineID}`,
      );
      // Assuming response.data.data is ChartItem[]
      setDRData(response.data.data);
      dispatch(SetLocalDR(response.data.data[0]?.dr));

      // console.log(
      //   'drdata[0]?.dr' + JSON.stringify(response.data.data[0]?.dr, null, 2),
      // );
    } catch (error: any) {
      console.error('Error fetching data:', error.response || error.message);
    }
  };

  // const Get_Last_Day_Variance_Data = async () => {
  //   try {
  //     const response = await instance.get(
  //       `/Get_ProductionBoard_all_Info/Get_Weekly_Performance_Chart/${settingData?.setLineID}/${data[0]?.style}`,
  //     );
  //     // Assuming response.data.data is ChartItem[]
  //     setlast_day_variancedata(response.data.data);
  //     console.log(
  //       'Checking Data' + JSON.stringify(response.data.data, null, 2),
  //     );
  //   } catch (error: any) {
  //     console.error('Error fetching data:', error.response || error.message);
  //   }
  // };

  // useEffect(() => {
  //   get_BasicInfoData();
  //   GetToday_Performance_DR_With_LineID_Data();
  //   Get_Last_Day_Variance_Data();
  // }, []);

  useEffect(() => {
    const loadAll = async () => {
      try {
        const response = await instance.get(
          `/Get_ProductionBoard_all_Info/GetLoadBasicInfo/${settingData?.setLineID}`,
        );
        const basicData = response.data.data;
        setData(basicData);
        dispatch(setStyleData(basicData[0].style));
        dispatch(setTodayTarget(basicData[0].todayTarget));

        GetToday_Performance_DR_With_LineID_Data();

        const varianceResponse = await instance.get(
          `/Get_ProductionBoard_all_Info/Get_Weekly_Performance_Chart/${settingData?.setLineID}/${basicData[0].style}`,
        );
        setlast_day_variancedata(varianceResponse.data.data);
      } catch (error: any) {
        console.error('Error loading data:', error.response || error.message);
      }
    };

    // Initial load
    loadAll();

    // Set interval for every 50 minutes (50 * 60 * 1000 = 3,000,000 ms)
    const intervalId = setInterval(() => {
      loadAll();
      console.log('Reloading data after 50 minutes...');
    }, 3000000); // 3,000,000 ms = 50 minutes

    // Clear interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  const maxSlData =
    last_day_variancedata.length > 0
      ? last_day_variancedata.reduce((prev, current) =>
          current.maxsl > prev.maxsl ? current : prev,
        )
      : null; // or {} or some default value

  // console.log('setDRData ++++ ' + JSON.stringify(maxSlData, null, 2));

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     get_BasicInfoData();
  //     console.log('Component Reload');
  //   }, 10000); // 100ms interval

  //   return () => clearInterval(intervalId);
  // }, []);

  // if (data && data.length > 0) {
  //   console.log('response.data.data ' + JSON.stringify(data[0].buyer, null, 2));
  // } else {
  //   console.log('No data available');
  // }

  return (
    <View style={{flex: 1, flexDirection: 'row', backgroundColor: '#fff'}}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#7360F2',
          justifyContent: 'center',
          alignItems: 'center',
          paddingLeft: 1,
        }}>
        <View
          style={{
            flexDirection: 'row',
            marginLeft: 1,
            // borderWidth: 0.5,
            // borderColor: '#000',
            // marginHorizontal: 0.8,
            // width: '98%',
          }}>
          {/* Left Column */}
          <View
            style={{
              flex: 1,
            }}>
            <View style={styles.cellLeft}>
              <Text style={styles.text}>Buyer</Text>
            </View>
            <View style={styles.cellLeft}>
              <Text style={styles.text}>Style</Text>
            </View>
            <View style={styles.cellLeft}>
              <Text style={styles.text}>SOT</Text>
            </View>
          </View>

          {/* Right Column */}

          <View
            style={{
              flex: 1,
            }}>
            <View style={[styles.cellLeft, {backgroundColor: '#fff'}]}>
              <Text style={styles.text}>
                {data && data.length > 0 ? data[0].buyer : 'Loading ...'}
              </Text>
            </View>
            <View style={[styles.cellLeft, {backgroundColor: '#fff'}]}>
              <Text style={styles.text}>
                {data && data.length > 0 ? data[0].style : 'Loading ...'}
              </Text>
            </View>
            <View style={[styles.cellLeft, {backgroundColor: '#fff'}]}>
              <Text style={styles.text}>
                {data && data.length > 0 ? data[0].sotValue : 'Loading ...'}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          backgroundColor: '#7360F2',
          justifyContent: 'center',
          alignItems: 'center',
          paddingLeft: 1.5,
        }}>
        <View
          style={{
            flexDirection: 'row',
            // marginLeft: 1,
            // borderWidth: 0.5,
            // borderColor: '#000',
            // marginHorizontal: 0.8,
            // width: '98%',
          }}>
          {/* Left Column */}
          <View
            style={{
              flex: 1,
            }}>
            <View style={styles.cellLeft}>
              <Text style={styles.text}>Days Run</Text>
            </View>
            <View style={styles.cellLeft}>
              <Text style={styles.text}>Peak TGT/HR</Text>
            </View>
            <View style={styles.cellLeft}>
              <Text style={styles.text}>Today Target</Text>
            </View>
          </View>

          {/* Right Column */}

          <View
            style={{
              flex: 1,
            }}>
            <View style={[styles.cellLeft, {backgroundColor: '#fff'}]}>
              <Text style={styles.text}>
                {data && data.length > 0 ? data[0].daysRun : 'Loading ...'}
              </Text>
            </View>
            <View style={[styles.cellLeft, {backgroundColor: '#fff'}]}>
              <Text style={styles.text}>
                {data && data.length > 0
                  ? `${data[0].peakTarget}`
                  : 'Loading ...'}
              </Text>
            </View>
            <View style={[styles.cellLeft, {backgroundColor: '#fff'}]}>
              <Text style={styles.text}>
                {data && data.length > 0 ? data[0].todayTarget : 'Loading ...'}{' '}
                %
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: '#7360F2',
          justifyContent: 'center',
          alignItems: 'center',
          paddingLeft: 1.5,
        }}>
        <View
          style={{
            flexDirection: 'row',
            // borderWidth: 1,
            // borderColor: '#000',
            // marginRight: 1,
          }}>
          {/* Left Column */}
          <View
            style={{
              flex: 1,
            }}>
            <View style={styles.cellLeft}>
              <Text style={styles.text}>MC</Text>
            </View>
            <View style={styles.cellLeft}>
              <Text style={styles.text}>OP+HP</Text>
            </View>
            <View style={styles.cellLeft}>
              <Text style={styles.text}>Absent</Text>
            </View>
          </View>

          {/* Right Column */}
          <View style={{flex: 1}}>
            <View style={styles.cellRight}>
              <Text style={styles.text}>
                {data && data.length > 0 ? data[0].mcQty : 'Loading ...'}
              </Text>
            </View>
            <View style={styles.cellRight}>
              <Text style={styles.text}>
                {data && data.length > 0 ? data[0].manPower : 'Loading ...'}
              </Text>
            </View>
            <View style={styles.cellRight}>
              <Text style={styles.text}>
                {data && data.length > 0 ? data[0].absent : 'Loading ...'}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: '#7360F2',
          paddingLeft: 1.5,
          //   justifyContent: 'center',
          //   alignItems: 'center',
        }}>
        <Text
          style={{
            backgroundColor: '#D8E4BC',
            textAlign: 'center',
            fontSize: height * 0.01,
            color: '#000',
            fontWeight: 'bold',
          }}>
          Today Performance
        </Text>

        <View
          style={{
            flexDirection: 'row',
            // borderWidth: 1,
            // borderColor: '#000',
            // marginRight: 1,
          }}>
          {/* Left Column */}
          <View
            style={{
              flex: 1,
            }}>
            <View style={styles.cellLeft}>
              <Text style={styles.text}>DR %</Text>
            </View>
          </View>

          {/* Right Column */}
          <View style={{flex: 1}}>
            <View style={styles.cellRight}>
              <Text
                style={[
                  styles.text,
                  {color: drdata[0]?.dr >= 5 ? 'red' : 'black'},
                ]}>
                {drdata?.length ? Number(drdata[0]?.dr).toFixed(2) : '0.00'} %
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          backgroundColor: '#7360F2',
          paddingLeft: 1.5,
          //   justifyContent: 'center',
          //   alignItems: 'center',
        }}>
        <Text
          style={{
            backgroundColor: '#D8E4BC',
            textAlign: 'center',
            fontSize: height * 0.01,
            color: '#000',
            fontWeight: 'bold',
          }}>
          Last Day Variance
        </Text>
        <View
          style={{
            flexDirection: 'row',
          }}>
          {/* Left Column */}
          <View
            style={{
              flex: 1,
            }}>
            <View style={[styles.cellLeft, {height: height / 19}]}>
              <Text style={styles.text}>IE</Text>
            </View>
            <View style={[styles.cellLeft, {height: height / 19}]}>
              <Text style={styles.text}>CPM</Text>
            </View>
          </View>

          {/* Right Column */}
          <View style={{flex: 1}}>
            <View style={[styles.cellRight, {height: height / 19}]}>
              <Text style={styles.text}>
                {maxSlData
                  ? `${maxSlData?.plannedhitRateGap} %`
                  : 'No data available'}{' '}
                %
              </Text>
            </View>
            <View style={[styles.cellRight, {height: height / 19}]}>
              <Text style={styles.text}>
                {maxSlData
                  ? `${maxSlData?.cpmVariance} %`
                  : 'No data available'}
                %
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const {width, height} = Dimensions.get('screen');
const styles = StyleSheet.create({
  cellLeft: {
    backgroundColor: '#00CED1',
    borderBottomWidth: 0.8,
    borderColor: '#000',
    paddingVertical: height * 0.012,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellRight: {
    backgroundColor: '#fff',
    borderLeftWidth: 0.3,
    borderBottomWidth: 0.7,
    borderColor: '#000',
    paddingVertical: height * 0.012,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: height * 0.012,
  },
});
export default React.memo(BasicInfoConponent);
