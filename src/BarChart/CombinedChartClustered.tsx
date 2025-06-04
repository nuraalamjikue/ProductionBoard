// import React, {useEffect, useState} from 'react';
// import {Dimensions, StyleSheet, Text, View} from 'react-native';
// import {
//   StackedBarChart,
//   LineChart,
//   XAxis,
//   YAxis,
//   Grid,
// } from 'react-native-svg-charts';
// import {Circle, G, Line, Text as SVGText, TSpan} from 'react-native-svg';
// import * as scale from 'd3-scale';
// import {instance} from '../Axiosinstance';
// import CustomXAxisLabels from './CustomXAxisLabels';
// import {RootState} from '../redux/store';
// import {useSelector} from 'react-redux';
// import Spinner from 'react-native-loading-spinner-overlay';
// type ChartItem = {
//   employeeName: string;
//   s1: number;
//   s2: number;
//   s3: number;
//   s4: number;
//   s5: number;
//   s6: number;
//   s7: number;
//   s8: number;
//   s9: number;
//   s10: number;
//   defect: number;
//   production: number;
//   productionS: number;
//   opName: string;
//   opid: string;
//   part: string;
//   isVisibleInLine: number;
//   opCapacity: number;
//   othersCapacity: number;
//   machineDownTimeCapacity: number;
// };

// const legends = [
//   {color: 'red', label: 'Defect'},
//   {color: '#A52A2A', label: 'MachineDownTimecap'},
//   {color: '#D3D3D3', label: 'Hour 1'},
//   {color: '#FFF8DC', label: 'Hour 2'},
//   {color: '#FFD700', label: 'Hour 3'},
//   {color: '#D3D3D3', label: 'Hour 4'},
//   {color: '#BDB76B', label: 'Hour 5'},
//   {color: '#418CF0', label: 'Hour 6'},
//   {color: '#FCB441', label: 'Hour 7'},
//   {color: '#E0400A', label: 'Hour 8'},
//   {color: '#3359A3', label: 'Hour 9'},
//   {color: '#BFBFBF', label: 'Hour 10'},
//   {color: '#1A3B69', label: 'Hour 11'},
//   {color: '#FFE382', label: 'Hour 12'},

//   // {color: '#8e7cc3', label: 'Purple'},
//   // {color: '#76a5af', label: 'Teal'},
//   // {color: '#93c47d', label: 'Green'},
// ];

// const CombinedChartClustered: React.FC = () => {
//   const [data, setData] = useState<ChartItem[]>([]);
//   const [spinner, setSpinner] = useState(false);

//   const settingData = useSelector(
//     (state: RootState) => state.Setting.settingData,
//   );

//   const get_line_graph_info = async () => {
//     try {
//       setSpinner(true);
//       const response = await instance.get(
//         `/Get_ProductionBoard_all_Info/line-graph-info/${settingData?.setLineID}`,
//       );
//       // Assuming response.data.data is ChartItem[]
//       setData(response.data.data);
//       setSpinner(false);
//       // console.log(
//       //   'response.data.data' + JSON.stringify(response.data.data, null, 2),
//       // );
//     } catch (error: any) {
//       console.error('Error fetching data:', error.response || error.message);
//     }
//   };

//   useEffect(() => {
//     get_line_graph_info();
//   }, []);
//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       get_line_graph_info();
//       console.log('Component Reload Hourly Target');
//     }, 600000); // 10 minutes in milliseconds

//     return () => clearInterval(intervalId);
//   }, []);

//   // useEffect(() => {
//   //   const intervalId = setInterval(() => {
//   //     get_line_graph_info();
//   //     console.log('Component Reload');
//   //   }, 10000); // 100ms interval

//   //   return () => clearInterval(intervalId);
//   // }, []);

//   // Prepare clustered data: two bars per employee (normal stacked and defect stacked)
//   const clusteredData = data.flatMap(employee => [
//     {
//       // Normal keys stacked
//       employeeName: employee.employeeName,
//       s1: employee.s1,
//       s2: employee.s2,
//       s3: employee.s3,
//       s4: employee.s4,
//       s5: employee.s5,
//       s6: employee.s6,
//       s7: employee.s7,
//       s8: employee.s8,
//       s9: employee.s9,
//       s10: employee.s10,

//       defect: 0,
//       production: employee.production,
//       opName: employee.opName,
//       part: employee.part,
//     },
//     {
//       // Defect bar only
//       employeeName: employee.employeeName,
//       s1: 0,
//       s2: 0,
//       s3: 0,
//       s4: 0,
//       s5: 0,
//       s6: 0,
//       s7: 0,
//       s8: 0,
//       s9: 0,
//       s10: 0,
//       defect: employee.defect,
//       production: employee.production,
//       opName: employee.opName,
//       part: employee.part,
//     },
//   ]);

//   // Keys to stack on
//   const keys: (keyof ChartItem)[] = [
//     's1',
//     's2',
//     's3',
//     's4',
//     's5',
//     's6',
//     's7',
//     's8',
//     's9',
//     's10',
//     'defect',
//   ];

//   // Colors: last color for defect
//   const colors = [
//     '#D3D3D3', // 'Hour 1'},
//     '#FFF8DC', // 'Hour 2'},
//     '#FFD700', //'Hour 3'},
//     '#D3D3D3', // 'Hour 4'},
//     '#BDB76B', //'Hour 5
//     '#418CF0', // Hour 6
//     '#FCB441', // Hour 7
//     '#E0400A', //Hour 8
//     '#3359A3', //Hour9
//     '#BFBFBF', //Hour10
//     '#1A3B69', //Hour 11
//     '#FFE382', //Hour 12
//   ];

//   // Compute totals per bar for labels and line chart points
//   const totals = clusteredData.map(item =>
//     keys.reduce((sum, key) => sum + item[key], 0),
//   );

//   const productionLineData = clusteredData
//     .filter((_, idx) => idx % 2 === 0)
//     .map(item => item.production);

//   // console.log(
//   //   'productionLineData ' + JSON.stringify(productionLineData, null, 2),
//   // );

//   // const productionLineData = clusteredData.map(item => item.production); // or relevant key

//   // Labels for stacked bars (values inside bars)
//   const Labels = ({
//     x,
//     y,
//     bandwidth,
//     data,
//   }: {
//     x: (index: number) => number;
//     y: (value: number) => number;
//     bandwidth: number;
//     data: typeof clusteredData;
//   }) =>
//     data.map((bar, barIndex) => {
//       let cumulative = 0;
//       return keys.map((key, keyIndex) => {
//         const value = bar[key];
//         const start = cumulative;
//         cumulative += value;
//         if (value === 0) return null;
//         const yPos = y(start + value / 2);
//         const xPos = x(barIndex) + bandwidth / 2;
//         return (
//           <SVGText
//             key={`${barIndex}-${keyIndex}`}
//             x={xPos}
//             y={yPos}
//             fontSize={height * 0.007}
//             fill="black"
//             alignmentBaseline="middle"
//             textAnchor="middle">
//             {value}
//           </SVGText>
//         );
//       });
//     });

//   // Total labels above each stacked bar
//   const TotalLabels = ({
//     x,
//     y,
//     bandwidth,
//   }: {
//     x: (index: number) => number;
//     y: (value: number) => number;
//     bandwidth: number;
//   }) =>
//     totals.map((total, index) => (
//       <SVGText
//         key={`total-${index}`}
//         x={x(index) + bandwidth / 2}
//         y={y(total) - 10}
//         fontSize={height * 0.007}
//         fill="black"
//         fontWeight="bold"
//         alignmentBaseline="middle"
//         textAnchor="middle">
//         {total}
//       </SVGText>
//     ));

//   const AxisLines = () => (
//     <G>
//       {/* Left Y-axis line */}
//       <Line x1="0" y1="0" x2="0%" y2="50%" stroke="black" strokeWidth={1} />
//       {/* Bottom X-axis line */}
//       <Line x1="0" y1="90%" x2="90%" y2="90%" stroke="black" strokeWidth={1} />
//     </G>
//   );

//   // Calculate max Y value for YAxis scale to cover stacked bars and production line
//   const maxStackValue = totals && totals.length > 0 ? Math.max(...totals) : 0;
//   const maxProductionValue =
//     productionLineData && productionLineData.length > 0
//       ? Math.max(...productionLineData)
//       : 0;

//   const yMax = Math.max(maxStackValue, maxProductionValue) * 1.1;

//   const xScale = scale
//     .scaleBand()
//     .domain(clusteredData.map((_, i) => i.toString()))
//     .range([10, width - 10])
//     .paddingInner(0.3)
//     .paddingOuter(0.1);

//   const bandwidth = xScale.bandwidth();

//   return (
//     <View
//       style={{
//         flex: 1,
//         paddingHorizontal: 1,
//         paddingVertical: 1,
//         backgroundColor: '#fff',
//       }}>
//       <Spinner
//         visible={spinner}
//         textContent={'Loading...'}
//         textStyle={styles.spinnerTextStyle}
//       />

//       <View style={styles.colorcontainer}>
//         {legends.map((item, index) => (
//           <View style={styles.item} key={index}>
//             <View style={[styles.colorBox, {backgroundColor: item.color}]} />
//             <Text style={styles.label}>{item.label}</Text>
//           </View>
//         ))}
//       </View>
//       <View style={{flexDirection: 'row', flex: 1}}>
//         <YAxis
//           // data={[0, yMax]}
//           data={productionLineData}
//           contentInset={{top: 5, bottom: 60}}
//           svg={{fontSize: height * 0.007, fill: 'grey'}}
//           numberOfTicks={15}
//           min={0}
//           max={yMax}
//         />
//         <View style={{flex: 1, marginLeft: 2}}>
//           <View style={{flex: 1}}>
//             <StackedBarChart
//               style={{flex: 1, zIndex: 1}}
//               keys={keys}
//               colors={colors}
//               data={clusteredData}
//               showGrid={false}
//               contentInset={{top: 30, bottom: 20}}
//               animate
//               spacingInner={0.3}
//               spacingOuter={0.1}
//               xAccessor={({index}) => index}>
//               <Grid />
//               <AxisLines />
//               <Labels data={clusteredData} />
//               <TotalLabels />
//             </StackedBarChart>

//             <LineChart
//               style={[StyleSheet.absoluteFill, {zIndex: 1}]}
//               data={productionLineData}
//               svg={{stroke: 'black', strokeWidth: 0.5}}
//               contentInset={{top: 10, bottom: 30}}
//               pointerEvents="none"
//               xAccessor={({index}) => index}
//               yMin={0}
//               yMax={yMax}
//             />

//             <XAxis
//               style={{height: 10}}
//               data={data}
//               scale={scale.scaleBand}
//               formatLabel={() => ''}
//             />
//             <CustomXAxisLabels
//               clusteredData={data}
//               x={xScale}
//               bandwidth={bandwidth}
//               height={100}
//             />
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// };
// const {width, height} = Dimensions.get('window');

// const styles = StyleSheet.create({
//   // ---Heaader Color----------------------
//   colorcontainer: {
//     flexDirection: 'row',
//     padding: 1,
//     backgroundColor: '#fff',
//   },
//   item: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginRight: 10,
//   },
//   colorBox: {
//     width: width * 0.01,
//     height: height * 0.01,
//     marginRight: 5,
//     borderWidth: 1,
//     borderColor: '#000',
//   },
//   label: {
//     fontSize: height * 0.008,
//   },
//   spinnerTextStyle: {
//     color: '#FFF',
//   },
// });
// export default React.memo(CombinedChartClustered);

import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  StackedBarChart,
  LineChart,
  XAxis,
  YAxis,
  Grid,
} from 'react-native-svg-charts';
import {Circle, G, Line, Text as SVGText, TSpan} from 'react-native-svg';
import * as scale from 'd3-scale';
import {instance} from '../Axiosinstance';
import CustomXAxisLabels from './CustomXAxisLabels';
import {RootState} from '../redux/store';
import {useSelector} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
type ChartItem = {
  employeeName: string;
  s1: number;
  s2: number;
  s3: number;
  s4: number;
  s5: number;
  s6: number;
  s7: number;
  s8: number;
  s9: number;
  s10: number;
  defect: number;
  production: number;
  productionS: number;
  opName: string;
  opid: string;
  part: string;
  isVisibleInLine: number;
  opCapacity: number;
  othersCapacity: number;
  machineDownTimeCapacity: number;
};

const legends = [
  {color: 'red', label: 'Defect'},
  {color: '#A52A2A', label: 'MachineDownTimecap'},
  {color: '#D3D3D3', label: 'Hour 1'},
  {color: '#FFF8DC', label: 'Hour 2'},
  {color: '#FFD700', label: 'Hour 3'},
  {color: '#D3D3D3', label: 'Hour 4'},
  {color: '#BDB76B', label: 'Hour 5'},
  {color: '#418CF0', label: 'Hour 6'},
  {color: '#FCB441', label: 'Hour 7'},
  {color: '#E0400A', label: 'Hour 8'},
  {color: '#3359A3', label: 'Hour 9'},
  {color: '#BFBFBF', label: 'Hour 10'},
  {color: '#FF0000', label: 'Hour 11'},
  {color: '#FFE382', label: 'Hour 12'},

  // {color: '#8e7cc3', label: 'Purple'},
  // {color: '#76a5af', label: 'Teal'},
  // {color: '#93c47d', label: 'Green'},
];

const CombinedChartClustered: React.FC = () => {
  const [data, setData] = useState<ChartItem[]>([]);
  const [spinner, setSpinner] = useState(false);

  const settingData = useSelector(
    (state: RootState) => state.Setting.settingData,
  );

  const get_line_graph_info = async () => {
    try {
      setSpinner(true);
      const response = await instance.get(
        `/Get_ProductionBoard_all_Info/line-graph-info/${settingData?.setLineID}`,
      );
      // Assuming response.data.data is ChartItem[]
      setData(response.data.data);
      setSpinner(false);
      // console.log(
      //   'response.data.data' + JSON.stringify(response.data.data, null, 2),
      // );
    } catch (error: any) {
      console.error('Error fetching data:', error.response || error.message);
    }
  };

  useEffect(() => {
    get_line_graph_info(); // Initial fetch

    const intervalId = setInterval(() => {
      get_line_graph_info();
      console.log('Component Reload main Chart');
    }, 600000); // 10 minutes in milliseconds
    return () => clearInterval(intervalId); // Cleanup
  }, []);

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     get_line_graph_info();
  //     console.log('Component Reload');
  //   }, 10000); // 100ms interval

  //   return () => clearInterval(intervalId);
  // }, []);

  // Prepare clustered data: two bars per employee (normal stacked and defect stacked)
  const clusteredData = data.flatMap(employee => [
    {
      // Normal keys stacked
      employeeName: employee.employeeName,
      s1: employee.s1,
      s2: employee.s2,
      s3: employee.s3,
      s4: employee.s4,
      s5: employee.s5,
      s6: employee.s6,
      s7: employee.s7,
      s8: employee.s8,
      s9: employee.s9,
      s10: employee.s10,

      defect: 0,
      production: employee.production,
      opName: employee.opName,
      part: employee.part,
    },
    {
      // Defect bar only
      employeeName: employee.employeeName,
      s1: 0,
      s2: 0,
      s3: 0,
      s4: 0,
      s5: 0,
      s6: 0,
      s7: 0,
      s8: 0,
      s9: 0,
      s10: 0,
      defect: employee.defect,
      production: employee.production,
      opName: employee.opName,
      part: employee.part,
    },
  ]);

  // Keys to stack on
  const keys: (keyof ChartItem)[] = [
    's1',
    's2',
    's3',
    's4',
    's5',
    's6',
    's7',
    's8',
    's9',
    's10',
    'defect',
  ];

  // Colors: last color for defect
  const colors = [
    '#D3D3D3', // 'Hour 1'},
    '#FFF8DC', // 'Hour 2'},
    '#FFD700', //'Hour 3'},
    '#D3D3D3', // 'Hour 4'},
    '#BDB76B', //'Hour 5
    '#418CF0', // Hour 6
    '#FCB441', // Hour 7
    '#E0400A', //Hour 8
    '#3359A3', //Hour9
    '#BFBFBF', //Hour10
    '#FF0000', //Hour 11
    '#FFE382', //Hour 12
  ];

  // Compute totals per bar for labels and line chart points
  const totals = clusteredData.map(item =>
    keys.reduce((sum, key) => sum + item[key], 0),
  );

  const productionLineData = clusteredData
    .filter((_, idx) => idx % 2 === 0)
    .map(item => item.production);

  // console.log(
  //   'productionLineData ' + JSON.stringify(productionLineData, null, 2),
  // );

  // const productionLineData = clusteredData.map(item => item.production); // or relevant key

  // Labels for stacked bars (values inside bars)
  const Labels = ({
    x,
    y,
    bandwidth,
    data,
  }: {
    x: (index: number) => number;
    y: (value: number) => number;
    bandwidth: number;
    data: typeof clusteredData;
  }) =>
    data.map((bar, barIndex) => {
      let cumulative = 0;
      return keys.map((key, keyIndex) => {
        const value = bar[key];
        const start = cumulative;
        cumulative += value;
        if (value === 0) return null;
        const yPos = y(start + value / 2);
        const xPos = x(barIndex) + bandwidth / 2;
        return (
          <SVGText
            key={`${barIndex}-${keyIndex}`}
            x={xPos}
            y={yPos}
            fontSize={height * 0.007}
            fill="black"
            alignmentBaseline="middle"
            textAnchor="middle">
            {value}
          </SVGText>
        );
      });
    });

  // Total labels above each stacked bar
  const TotalLabels = ({
    x,
    y,
    bandwidth,
  }: {
    x: (index: number) => number;
    y: (value: number) => number;
    bandwidth: number;
  }) =>
    totals.map((total, index) => (
      <SVGText
        key={`total-${index}`}
        x={x(index) + bandwidth / 2}
        y={y(total) - 6}
        fontSize={height * 0.007}
        fill="black"
        fontWeight="bold"
        alignmentBaseline="middle"
        textAnchor="middle">
        {total}
      </SVGText>
    ));

  const AxisLines = () => (
    <G>
      {/* Left Y-axis line */}
      <Line x1="0" y1="0" x2="0%" y2="50%" stroke="black" strokeWidth={1} />
      {/* Bottom X-axis line */}
      <Line x1="0" y1="90%" x2="90%" y2="90%" stroke="black" strokeWidth={1} />
    </G>
  );

  // Calculate max Y value for YAxis scale to cover stacked bars and production line
  const maxStackValue = totals && totals.length > 0 ? Math.max(...totals) : 0;
  const maxProductionValue =
    productionLineData && productionLineData.length > 0
      ? Math.max(...productionLineData)
      : 0;

  const yMax = Math.max(maxStackValue, maxProductionValue) * 1.1;

  const xScale = scale
    .scaleBand()
    .domain(clusteredData.map((_, i) => i.toString()))
    .range([10, width - 10])
    .paddingInner(0.3)
    .paddingOuter(0.1);

  const bandwidth = xScale.bandwidth();

  return (
    <View style={{flex: 1, flexDirection: 'column', backgroundColor: '#fff'}}>
      <View style={{flex: 7}}>
        <Spinner
          visible={spinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />

        <View style={styles.colorcontainer}>
          {legends.map((item, index) => (
            <View style={styles.item} key={index}>
              <View style={[styles.colorBox, {backgroundColor: item.color}]} />
              <Text style={styles.label}>{item.label}</Text>
            </View>
          ))}
        </View>
        <View style={{flexDirection: 'row', flex: 1}}>
          <YAxis
            // data={[0, yMax]}
            data={productionLineData}
            contentInset={{top: 15, bottom: 30}}
            svg={{fontSize: height * 0.007, fill: 'grey'}}
            numberOfTicks={15}
            min={0}
            max={yMax}
          />
          <View style={{flex: 1, marginLeft: 2}}>
            <View style={{flex: 1}}>
              <StackedBarChart
                style={{flex: 1, zIndex: 1}}
                keys={keys}
                colors={colors}
                data={clusteredData}
                showGrid={false}
                contentInset={{top: 30, bottom: 20}}
                animate
                spacingInner={0.3}
                spacingOuter={0.1}
                xAccessor={({index}) => index}>
                <Grid />
                <AxisLines />
                <Labels data={clusteredData} />
                <TotalLabels />
              </StackedBarChart>

              <LineChart
                style={[StyleSheet.absoluteFill, {zIndex: 1}]}
                data={productionLineData}
                svg={{stroke: 'black', strokeWidth: 0.3}}
                contentInset={{top: 15, bottom: 30}}
                pointerEvents="none"
                xAccessor={({index}) => index}
                yMin={0}
                yMax={yMax}
              />

              <XAxis
                style={{height: 10}}
                data={data}
                scale={scale.scaleBand}
                formatLabel={() => ''}
              />
              {/* <CustomXAxisLabels
              clusteredData={data}
              x={xScale}
              bandwidth={bandwidth}
              height={100}
            /> */}
            </View>
          </View>
        </View>
      </View>
      <View style={{flex: 1, paddingLeft: 8}}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          {data.map((item, index) => (
            <View
              key={index}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  transform: [{rotate: '-90deg'}],
                }}>
                <Text
                  style={{
                    fontSize: height * 0.008,
                    textAlign: 'right',
                    width: height * 0.1,
                    color: '#000',
                  }}>
                  {item.opName}
                </Text>
                <Text
                  style={{
                    fontSize: height * 0.008,
                    textAlign: 'right',
                    width: height * 0.1,
                    color: '#000',
                  }}>
                  {item.part}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  // ---Heaader Color----------------------
  colorcontainer: {
    flexDirection: 'row',
    padding: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  colorBox: {
    width: width * 0.01,
    height: height * 0.01,
    marginRight: 4,
    // borderWidth: 1,
    // borderColor: '#000',
  },
  label: {
    fontSize: height * 0.008,
    color: '#000',
  },
  spinnerTextStyle: {
    color: '#FFF',
  },

  labelsRow: {
    flexDirection: 'row',

    // backgroundColor: '#000',
  },
  labelText: {
    fontSize: height * 0.006,
    color: '#000',
    transform: [{rotate: '-90deg'}],
  },
});
export default React.memo(CombinedChartClustered);
