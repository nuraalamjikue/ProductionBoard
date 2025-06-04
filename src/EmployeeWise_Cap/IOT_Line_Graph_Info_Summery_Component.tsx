import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {instance} from '../Axiosinstance';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';

type _EmployeeSummeryCapacityItem = {
  capHR: string;
  currentPcs: number;
  workerPotential: number;
  totalCycleTime: number;
  capacityGap: string;
  lineBalance: string;
  bottleNeckPoint: number;
  workerPerformance: number;
  lowestCapacity: number;
};
const IOT_Line_Graph_Info_Summery_Component = () => {
  const [data, setData] = useState<_EmployeeSummeryCapacityItem[]>([]);
  const settingData = useSelector(
    (state: RootState) => state.Setting.settingData,
  );

  const get_EmployeeSummeryCapacityData = async () => {
    try {
      const response = await instance.get(
        `/Get_ProductionBoard_all_Info/GetIOT_Line_Graph_Info/${settingData?.setCompanyID}/${settingData?.setLineID}`,
      );
      // Assuming response.data.data is ChartItem[]
      setData(response.data.data);
      // console.log(
      //   'response.data.data ' + JSON.stringify(response.data.data, null, 2),
      // );
    } catch (error: any) {
      console.error('Error fetching data:', error.response || error.message);
    }
  };

  useEffect(() => {
    get_EmployeeSummeryCapacityData(); // Initial fetch

    const intervalId = setInterval(() => {
      get_EmployeeSummeryCapacityData();
      console.log('Component Reload Worker Performance');
    }, 3300000); // 30 minutes in milliseconds
    return () => clearInterval(intervalId); // Cleanup
  }, []);

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     get_EmployeeSummeryCapacityData();
  //     console.log('Component Reload');
  //   }, 10000); // 100ms interval

  //   return () => clearInterval(intervalId);
  // }, []);

  return (
    <View style={{flex: 1, flexDirection: 'column', backgroundColor: '#fff'}}>
      <View
        style={{flex: 8, backgroundColor: '#D3D3D3', flexDirection: 'column'}}>
        <View style={styles.row}>
          <View style={styles.columnfrist}>
            <Text style={styles.leftTitle}> Current PCS </Text>
          </View>
          <View style={styles.columnsecound}>
            <Text style={styles.qty}>
              {data.length > 0 ? data[0].currentPcs : '0'}
            </Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.columnfrist}>
            <Text style={styles.leftTitle}> Worker Potential Pcs </Text>
          </View>
          <View style={styles.columnsecound}>
            <Text style={styles.qty}>
              {data.length > 0 ? data[0].workerPotential : '0'}
            </Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.columnfrist}>
            <Text style={styles.leftTitle}> Lowest Capacity </Text>
          </View>
          <View style={styles.columnsecound}>
            <Text style={styles.qty}>
              {data.length > 0 ? data[0].lowestCapacity : '0'}
            </Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.columnfrist}>
            <Text style={styles.leftTitle}> Total Cycle Time </Text>
          </View>
          <View style={styles.columnsecound}>
            <Text style={styles.qty}>
              {data.length > 0 ? data[0].totalCycleTime : '0'}
            </Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.columnfrist}>
            <Text style={styles.leftTitle}>Capacity Gap</Text>
          </View>
          <View style={styles.columnsecound}>
            <Text style={styles.qty}>
              {data.length > 0 ? data[0].capacityGap : '0'}
            </Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.columnfrist}>
            <Text style={styles.leftTitle}> Worker Performance </Text>
          </View>
          <View style={styles.columnsecound}>
            <Text style={styles.qty}>
              {' '}
              {data.length > 0 ? data[0].workerPerformance : '0'}
            </Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.columnfrist}>
            <Text style={styles.leftTitle}> Line Balance</Text>
          </View>
          <View style={styles.columnsecound}>
            <Text style={styles.qty}>
              {data.length > 0 ? data[0].lineBalance : '0'}
            </Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.columnfrist}>
            <Text style={styles.leftTitle}> Bottol Neck Point </Text>
          </View>
          <View style={styles.columnsecound}>
            <Text style={styles.qty}>
              {data.length > 0 ? data[0].bottleNeckPoint : '0'}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  row: {
    flex: 1,
    backgroundColor: '#142433',
    flexDirection: 'row',
    borderColor: '#000',
    borderBottomWidth: 1,
  },
  columnfrist: {
    width: '60%',
    backgroundColor: '#F0FFFF',
    justifyContent: 'center',
    borderColor: '#000',
    borderRightWidth: 1,
  },
  columnsecound: {
    width: '40%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    borderColor: '#000',
    borderRightWidth: 1,
  },
  leftTitle: {
    fontSize: height * 0.01,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
  },
  qty: {
    fontSize: height * 0.01,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
  },
});

export default React.memo(IOT_Line_Graph_Info_Summery_Component);
