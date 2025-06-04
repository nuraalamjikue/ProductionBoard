import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {BarChart, Grid, XAxis, YAxis} from 'react-native-svg-charts';
import {G, Text as SVGText} from 'react-native-svg';
import * as scale from 'd3-scale';
import CustomXAxisLabels_Weekly_Performance from './CustomXAxisLabels_Weekly_Performance';
import {instance} from '../Axiosinstance';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';

type DataItem = {
  dates: string;
  dr: string;
  currentEficiency: number;
};

type responsdataItem = {
  sl: number;
  tEmpName: string;
  tScore: number;
  mEmpName: string;
  mScore: number;
};

const Weekly_PerformanceComponent = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [responsdata, setResponsdata] = useState<responsdataItem[]>([]);
  const settingData = useSelector(
    (state: RootState) => state.Setting.settingData,
  );
  const getGlobalStyle = useSelector((state: RootState) => state.Setting);

  const code = settingData?.setLineName;
  const prefixLineName = code.split('-')[0];
  useEffect(() => {
    if (settingData?.setLineID && getGlobalStyle?.settingStyleData) {
      Get_Weekly_Performance_Chart();
      console.log(' Get_Weekly_Performance_Chart');
    }
  }, [JSON.stringify(getGlobalStyle), settingData?.setLineID]);

  const Get_Weekly_Performance_Chart = async () => {
    try {
      const response = await instance.get(
        `/Get_ProductionBoard_all_Info/Get_Weekly_Performance_Chart/${settingData?.setLineID}/${getGlobalStyle.settingStyleData}`,
      );
      // const topFive = response.data.data.slice(0, 5);
      // Assuming response.data.data is ChartItem[]
      setData(response.data.data);
    } catch (error: any) {
      console.error('Error fetching data:', error.response || error.message);
    }
  };

  const get_Responsible_Scores = async () => {
    try {
      const response = await instance.get(
        '/Get_ProductionBoard_all_Info/GetResponsibleScore_With_FloorName/' +
          prefixLineName,
      );
      // Assuming response.data.data is ChartItem[]
      setResponsdata(response.data.data);
    } catch (error: any) {
      console.error('Error fetching data:', error.response || error.message);
    }
  };

  useEffect(() => {
    get_Responsible_Scores();

    const intervalId = setInterval(() => {
      get_Responsible_Scores();
      console.log('Component Reload Weekly Perform');
    }, 3300000); // // 55 minutes in milliseconds

    return () => clearInterval(intervalId); // Cleanup
  }, []);

  const drValues = data && data.map(item => item.dr);
  const efficiencyValues = data && data.map(item => item.currentEficiency);

  const barData = [
    {
      data: drValues.map(val => Number(val)),
      svg: {fill: '#FFA500'},
    },
    {
      data: efficiencyValues,
      svg: {fill: '#4682B4'},
    },
  ];

  const Labels = ({x, y, bandwidth}: any) => (
    <G>
      {data.map((_, index) => {
        const dr = drValues[index];
        const eff = efficiencyValues[index];
        const barWidth = bandwidth / 2;

        return (
          <G key={`label-${index}`}>
            <SVGText
              x={x(index) + barWidth * 0.25}
              y={y(dr) - 10}
              fontSize={height * 0.008}
              fill="black"
              alignmentBaseline="middle"
              textAnchor="middle">
              {dr}
            </SVGText>
            <SVGText
              x={x(index) + barWidth * 1.25}
              y={y(eff) - 10}
              fontSize={height * 0.008}
              fill="black"
              alignmentBaseline="middle"
              textAnchor="middle">
              {eff}
            </SVGText>
          </G>
        );
      })}
    </G>
  );

  return (
    <View style={{flex: 1, flexDirection: 'row', backgroundColor: '#7360F2'}}>
      <View style={{flex: 2, backgroundColor: '#fff', marginHorizontal: 1}}>
        <Text
          style={{
            backgroundColor: '#DEB887',
            textAlign: 'center',
            fontSize: height * 0.01,
            color: '#000',
            fontWeight: 'bold',
          }}>
          Weekly Performance Chart
        </Text>
        <View style={{height: 100, flexDirection: 'row'}}>
          <YAxis
            data={[...drValues, ...efficiencyValues]}
            contentInset={{top: 10, bottom: 30}}
            svg={{fontSize: height * 0.007, fill: 'grey'}}
            numberOfTicks={5}
          />
          <View style={{flex: 1, marginLeft: 5}}>
            <BarChart
              style={{flex: 1}}
              data={barData}
              yAccessor={({item}) => item}
              xAccessor={({index}) => index}
              contentInset={{top: 20, bottom: 30}}
              spacingInner={0.2}
              gridMin={0}
              numberOfTicks={4}>
              <Grid direction={Grid.Direction.HORIZONTAL} />
              <Labels />
            </BarChart>

            <CustomXAxisLabels_Weekly_Performance
              datas={data && data}
              chartWidth={150}
            />

            {/* <XAxis
              style={{marginTop: -25, height: 38}}
              data={data}
              scale={scale.scaleBand}
              formatLabel={(_, index) => data[index].date}
              svg={{
                fontSize: height * 0.006,
                fill: 'black',
                rotation: -45,
                textAnchor: 'middle',
              }}
            /> */}
          </View>
        </View>
      </View>

      <View style={{flex: 6, backgroundColor: '#D3D3D3'}}>
        <Text
          style={{
            backgroundColor: '#DEB887',
            textAlign: 'center',
            fontSize: height * 0.01,
            color: '#000',
            fontWeight: 'bold',
          }}>
          Responsible Scores
        </Text>

        <View
          style={{flex: 1, flexDirection: 'column', backgroundColor: '#fff'}}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              backgroundColor: '#0081CF',
            }}>
            <View style={{flex: 1}}>
              <Text
                style={[styles.cellStatus, {color: '#fff', textAlign: 'left'}]}>
                SL
              </Text>
            </View>
            <View style={{flex: 1}}>
              <Text
                style={[styles.cellStatus, {color: '#fff', textAlign: 'left'}]}>
                Technologist Name
              </Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={[styles.cellStatus, {color: '#fff'}]}>Score</Text>
            </View>
            <View style={{flex: 1}}>
              <Text
                style={[styles.cellStatus, {color: '#fff', textAlign: 'left'}]}>
                Mechanic Name
              </Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={[styles.cellStatus, {color: '#fff'}]}>Score</Text>
            </View>
          </View>
          {/* Table Rows */}
          {responsdata.map((item, index) => (
            <View
              key={index}
              style={{
                flex: 1,
                flexDirection: 'row',
                backgroundColor: index % 2 === 0 ? '#f2f2f2' : '#ffffff',
              }}>
              <View style={{flex: 1, width: '10%'}}>
                <Text style={[styles.cellStatus, {textAlign: 'left'}]}>
                  {item.sl}
                </Text>
              </View>
              <View style={{flex: 1, width: '40%'}}>
                <Text style={[styles.cellStatus, {textAlign: 'left'}]}>
                  {item.tEmpName}
                </Text>
              </View>
              <View style={{flex: 1, width: '10%'}}>
                <Text style={styles.cellStatus}>{item.mScore}</Text>
              </View>
              <View style={{flex: 1, width: '30%'}}>
                <Text style={[styles.cellStatus, {textAlign: 'left'}]}>
                  {item.tEmpName}
                </Text>
              </View>
              <View style={{flex: 1, width: '10%'}}>
                <Text style={styles.cellStatus}>{item.tScore}</Text>
              </View>
            </View>
          ))}
        </View>
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

    textAlign: 'center',
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
    paddingHorizontal: 6,
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

export default React.memo(Weekly_PerformanceComponent);
