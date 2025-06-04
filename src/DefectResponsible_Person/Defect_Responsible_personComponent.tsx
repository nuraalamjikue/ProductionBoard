import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import MarqueeView from 'react-native-marquee-view';
import {instance} from '../Axiosinstance';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
const tableData = [
  {label: 'Current PCS', value: '240'},
  {label: 'Worker Potential Pcs', value: '310'},
  {label: 'Lowest Capacity', value: '180'},
  {label: 'Total Cycle Time', value: '95'},
  {label: 'Capacity Gap', value: '70'},
];

type ResponsibleWithDefectItem = {
  name: string;
  opName: string;
  status: string;
  responsible: string;
  qty: number;
};

type Defect_PersonItem = {
  op: string;
  qty: number;
};

type DHUItem = {
  responsible: string;
  dhu: number;
};
type Bottleneck_Positionitem = {
  opName: string;
  production: number;
};

const DefectResponsiblePersonComponent = () => {
  const [data, setData] = useState<ResponsibleWithDefectItem[]>([]);
  const [defect_Person, setDefect_Person] = useState<Defect_PersonItem[]>([]);
  const [dhu, setDHU] = useState<DHUItem[]>([]);
  const [bottleneck, setBottleneck] = useState<Bottleneck_Positionitem[]>([]);
  const settingData = useSelector(
    (state: RootState) => state.Setting.settingData,
  );
  const getGlobalStyle = useSelector((state: RootState) => state.Setting);
  useEffect(() => {
    if (settingData?.setLineID && getGlobalStyle?.settingStyleData) {
      get_Top_5_Bottleneck_Position();
      console.log(' Get_Weekly_Performance_Chart Bottleneck');
    }
  }, [JSON.stringify(getGlobalStyle), settingData?.setLineID]);

  // console.log(
  //   'cycleCount  settingStyleData ' +
  //     JSON.stringify(getGlobalStyle.settingStyleData, null, 2),
  // );
  const get_BasicInfoData = async () => {
    try {
      const response = await instance.get(
        `/Get_ProductionBoard_all_Info/Get_Top_5_ResponsibleWithDefect/${settingData?.setCompanyID}/${settingData?.setLineID}`,
      );
      console.log('');

      // Assuming response.data.data is ChartItem[]
      setData(response.data.data);
    } catch (error: any) {
      console.error('Error fetching data:', error.response || error.message);
    }
  };

  const get_Top_5_Defect_Person = async () => {
    try {
      const response = await instance.get(
        `/Get_ProductionBoard_all_Info/Top_5_Defect_Person/${settingData?.setLineID}`,
      );
      // Assuming response.data.data is ChartItem[]
      setDefect_Person(response.data.data);
    } catch (error: any) {
      console.error('Error fetching data:', error.response || error.message);
    }
  };

  const get_Top_5_GetResponsibleDHU = async () => {
    try {
      const response = await instance.get(
        `/Get_ProductionBoard_all_Info/Top_5_GetResponsibleDHU/${settingData?.setLineID}`,
      );
      // Assuming response.data.data is ChartItem[]
      setDHU(response.data.data);
    } catch (error: any) {
      console.error('Error fetching data:', error.response || error.message);
    }
  };

  const get_Top_5_Bottleneck_Position = async () => {
    try {
      const response = await instance.get(
        `/Get_ProductionBoard_all_Info/Top_5_Bottleneck_Position/${settingData?.setLineID}/${getGlobalStyle.settingStyleData}`,
      );
      const topFive = response.data.data.slice(0, 5);
      // Assuming response.data.data is ChartItem[]
      setBottleneck(topFive);
    } catch (error: any) {
      console.error('Error fetching data:', error.response || error.message);
    }
  };

  useEffect(() => {
    get_BasicInfoData();
    get_Top_5_Defect_Person();
    get_Top_5_GetResponsibleDHU();

    const intervalId = setInterval(() => {
      get_BasicInfoData();
      get_Top_5_Defect_Person();
      get_Top_5_GetResponsibleDHU();
      console.log('Component Reload Defect Responsible top 5');
    }, 3300000); // 55 minutes in milliseconds

    return () => clearInterval(intervalId); // Cleanup
  }, []);

  // console.log('bottleneck' + JSON.stringify(bottleneck, null, 2));

  return (
    <View style={styles.container}>
      {/* Defect Table */}
      <View style={styles.defectTable}>
        <Text
          style={{
            backgroundColor: '#DEB887',
            textAlign: 'center',
            fontSize: height * 0.01,
            color: '#000',
            fontWeight: 'bold',
          }}>
          Top 5 Defect With Responsible Person
        </Text>
        {/* Table Header */}
        <View style={[styles.row, styles.headerRow]}>
          <Text
            style={[styles.cellDefect, styles.headerText, {textAlign: 'left'}]}>
            Defect Name
          </Text>
          <Text style={[styles.cellQty, styles.headerText]}>Qty</Text>
          <Text style={[styles.cellOperator, styles.headerText]}>Operator</Text>
          <Text style={[styles.cellResponsible, styles.headerText]}>
            Responsible
          </Text>
          <Text style={[styles.cellStatus, styles.headerText]}>Status</Text>
        </View>

        {/* Table Rows */}
        {data &&
          data.map((item, index) => (
            <View
              key={index}
              style={[
                styles.row,
                {backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff'},
              ]}>
              <Text
                style={[styles.cellDefect, {textAlign: 'left'}]}
                numberOfLines={1}
                ellipsizeMode="tail">
                {item.name}
              </Text>
              <Text style={[styles.cellQty, {textAlign: 'left'}]}>
                {item.qty}
              </Text>
              <Text style={[styles.cellOperator, {textAlign: 'left'}]}>
                {item.opName}
              </Text>
              {/* <Text
              style={styles.cellResponsible}
              numberOfLines={1}
              ellipsizeMode="tail">
              {item.responsible}
                </Text>
                 */}
              <MarqueeView
                style={{
                  flex: 1,
                  // backgroundColor: 'blue',
                  // height: height * 0.06,
                  width: 300,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                autoPlay={true}
                delay={1000}
                speed={0.03}>
                <Text style={styles.cellResponsible}>{item.responsible}</Text>
              </MarqueeView>

              <Text style={styles.cellStatus}>{item.status}</Text>
            </View>
          ))}
      </View>

      <View style={styles.defectTable_Top_5_Defect_Person}>
        <Text
          style={{
            backgroundColor: '#DEB887',
            textAlign: 'center',
            fontSize: height * 0.01,
            color: '#000',
            fontWeight: 'bold',
          }}>
          Top 5 Defect Person
        </Text>
        {/* Table Header */}
        <View style={[styles.row, styles.headerRow]}>
          <Text
            style={[styles.cellDefect, styles.headerText, {textAlign: 'left'}]}>
            Emp. Name
          </Text>

          <Text style={[styles.cellStatus, styles.headerText]}>C</Text>
        </View>

        {/* Table Rows */}
        {defect_Person.map((item, index) => (
          <View
            key={index}
            style={[
              styles.row,
              {backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff'},
            ]}>
            <Text
              style={styles.cellDefect}
              numberOfLines={1}
              ellipsizeMode="tail">
              {item.op}
            </Text>

            <Text style={styles.cellStatus}>{item.qty}</Text>
          </View>
        ))}
      </View>

      <View style={styles.defectTable_Top_5_Defect_Person}>
        <Text
          style={{
            backgroundColor: '#DEB887',
            textAlign: 'center',
            fontSize: height * 0.01,
            color: '#000',
            fontWeight: 'bold',
          }}>
          Top 5 Responsible DHU
        </Text>
        {/* Table Header */}
        <View style={[styles.row, styles.headerRow]}>
          <Text
            style={[styles.cellDefect, styles.headerText, {textAlign: 'left'}]}>
            Emp. Name
          </Text>

          <Text style={[styles.cellStatus, styles.headerText]}>C</Text>
        </View>

        {/* Table Rows */}
        {dhu &&
          dhu.map((item, index) => (
            <View
              key={index}
              style={[
                styles.row,
                {backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff'},
              ]}>
              <Text
                style={styles.cellDefect}
                numberOfLines={1}
                ellipsizeMode="tail">
                {item.responsible}
              </Text>

              <Text style={styles.cellStatus}>{item.dhu}</Text>
            </View>
          ))}
      </View>

      <View
        style={[styles.defectTable_Top_5_Defect_Person, {marginHorizontal: 1}]}>
        <Text
          style={{
            backgroundColor: '#DEB887',
            textAlign: 'center',
            fontSize: height * 0.01,
            color: '#000',
            fontWeight: 'bold',
          }}>
          Top 5 Bottleneck Position
        </Text>
        {/* Table Header */}
        <View style={[styles.row, styles.headerRow]}>
          <Text
            style={[styles.cellDefect, styles.headerText, {textAlign: 'left'}]}>
            Emp. Name
          </Text>

          <Text style={[styles.cellStatus, styles.headerText]}>C</Text>
        </View>

        {/* Table Rows */}
        {bottleneck &&
          bottleneck.map((item, index) => (
            <View
              key={index}
              style={[
                styles.row,
                {backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff'},
              ]}>
              <Text
                style={styles.cellDefect}
                numberOfLines={1}
                ellipsizeMode="tail">
                {item.opName}
              </Text>

              <Text style={styles.cellStatus}>{item.production}</Text>
            </View>
          ))}
      </View>
    </View>
  );
};
const {width, height} = Dimensions.get('screen');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#8A2BE2',
  },
  defectTable: {
    flex: 2,
    marginLeft: 1,
  },
  defectTable_Top_5_Defect_Person: {
    flex: 1,
    marginLeft: 1,
  },
  row: {
    flexDirection: 'row',
    // borderBottomWidth: 0.5,
    borderBottomColor: '#000',
  },
  headerRow: {
    backgroundColor: '#007acc',
    borderWidth: 0.05, // Full border
    borderColor: '#000',
  },
  headerText: {
    fontSize: height * 0.008,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  cellDefect: {
    flex: 1.2,
    padding: 2,
    fontSize: height * 0.008,
    color: '#000',
    overflow: 'hidden',
    flexShrink: 1,

    textAlign: 'left',
  },
  cellQty: {
    flex: 0.5,
    padding: 2,
    fontSize: height * 0.008,
    textAlign: 'center',
    color: '#000',
  },
  cellOperator: {
    flex: 1.5,
    padding: 2,
    fontSize: height * 0.008,
    color: '#000',

    textAlign: 'center',
  },
  cellResponsible: {
    flex: 2,
    padding: 2,
    fontSize: height * 0.008,
    color: '#000',
    overflow: 'hidden',
    flexShrink: 1, // Allows truncation

    textAlign: 'center',
  },
  cellStatus: {
    flex: 1,
    padding: 2,
    fontSize: height * 0.008,
    textAlign: 'center',
    color: '#000',
  },
  sideBoxPink: {
    flex: 1,
    backgroundColor: '#FF69B4',
    // justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  sideBoxPurple: {
    flex: 1,
    backgroundColor: '#8A2BE2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sideBoxText: {
    color: '#000',
    fontSize: height * 0.01,
    fontWeight: 'bold',
  },
});

export default React.memo(DefectResponsiblePersonComponent);
