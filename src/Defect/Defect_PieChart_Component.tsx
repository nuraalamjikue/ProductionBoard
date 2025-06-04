// import React from 'react';
// import {Text, View, StyleSheet, Dimensions} from 'react-native';
// import {PieChart} from 'react-native-svg-charts';
// import {Text as SvgText} from 'react-native-svg';

// interface PieData {
//   key: number;
//   amount: number;
//   svg: {
//     fill: string;
//   };
// }

// interface LabelProps {
//   slices: Array<{
//     pieCentroid: [number, number];
//     labelCentroid: [number, number];
//     data: PieData;
//   }>;
//   height: number;
//   width: number;
// }

// const data: PieData[] = [
//   {key: 1, amount: 50, svg: {fill: '#600080'}},
//   {key: 2, amount: 50, svg: {fill: '#9900cc'}},
//   {key: 3, amount: 40, svg: {fill: '#c61aff'}},
//   {key: 4, amount: 95, svg: {fill: '#d966ff'}},
//   {key: 5, amount: 35, svg: {fill: '#ecb3ff'}},
// ];

// const Labels: React.FC<LabelProps> = ({slices}) => {
//   return slices.map((slice, index) => {
//     const {pieCentroid, data} = slice;
//     return (
//       <SvgText
//         key={index}
//         x={pieCentroid[0]}
//         y={pieCentroid[1]}
//         fill={'white'}
//         textAnchor={'middle'}
//         alignmentBaseline={'middle'}
//         fontSize={14}
//         stroke={'black'}
//         strokeWidth={0.2}>
//         {data.amount}
//       </SvgText>
//     );
//   });
// };

// const Defect_PiChart_Component = () => {
//   return (
//     <View style={styles.container}>
//       {/* <Text style={styles.title}>Defect Pie Chart</Text> */}
//       <PieChart
//         style={styles.chart}
//         valueAccessor={({item}) => item.amount}
//         data={data}
//         spacing={0}
//         outerRadius={'95%'}>
//         <Labels />
//       </PieChart>
//     </View>
//   );
// };

// const {width, height} = Dimensions.get('screen');
// const styles = StyleSheet.create({
//   container: {
//     alignItems: 'center',
//     // paddingVertical: 20,
//   },
//   title: {
//     fontSize: height * 0.01,
//     marginBottom: 10,
//     fontWeight: 'bold',
//   },
//   chart: {
//     height: height * 0.2,
//     width: width * 0.3,
//   },
// });

// export default Defect_PiChart_Component;

// import React from 'react';
// import {Text, View, StyleSheet, Dimensions} from 'react-native';
// import {PieChart} from 'react-native-svg-charts';
// import {Text as SvgText} from 'react-native-svg';

// interface PieData {
//   key: number;
//   amount: number;
//   label: string; // <-- new field
//   svg: {
//     fill: string;
//   };
// }

// interface LabelProps {
//   slices: Array<{
//     pieCentroid: [number, number];
//     labelCentroid: [number, number];
//     data: PieData;
//   }>;
//   height: number;
//   width: number;
// }

// const data: PieData[] = [
//   {key: 1, amount: 50, label: 'Critical', svg: {fill: '#600080'}},
//   {key: 2, amount: 50, label: 'Major', svg: {fill: '#9900cc'}},
//   {key: 3, amount: 40, label: 'Minor', svg: {fill: '#c61aff'}},
//   {key: 4, amount: 50, label: 'Info', svg: {fill: '#d966ff'}},
//   {key: 5, amount: 35, label: 'Warning', svg: {fill: '#C2185B'}},
// ];

// const Labels: React.FC<LabelProps> = ({slices}) => {
//   return slices.map((slice, index) => {
//     const {pieCentroid, data} = slice;
//     return (
//       <React.Fragment key={index}>
//         <SvgText
//           x={pieCentroid[0]}
//           y={pieCentroid[1] - 5}
//           fill="white"
//           textAnchor="middle"
//           alignmentBaseline="middle"
//           fontSize={height * 0.015}
//           stroke="black"
//           strokeWidth={0.2}>
//           {data.amount}
//         </SvgText>

//         <SvgText
//           x={pieCentroid[0]}
//           y={pieCentroid[1] + 5}
//           fill="white"
//           textAnchor="middle"
//           alignmentBaseline="middle"
//           fontSize={height * 0.013}>
//           {data.label}
//         </SvgText>
//       </React.Fragment>
//     );
//   });
// };

// const Defect_PiChart_Component = () => {
//   return (
//     <View style={styles.container}>
//       <PieChart
//         style={styles.chart}
//         valueAccessor={({item}) => item.amount}
//         data={data}
//         spacing={0}
//         outerRadius={'95%'}>
//         <Labels />
//       </PieChart>
//     </View>
//   );
// };

// const {width, height} = Dimensions.get('screen');
// const styles = StyleSheet.create({
//   container: {
//     alignItems: 'center',
//     // paddingVertical: 20,
//   },
//   title: {
//     fontSize: height * 0.01,
//     marginBottom: 10,
//     fontWeight: 'bold',
//   },
//   chart: {
//     height: height * 0.2,
//     width: width * 0.3,
//   },
// });

// export default Defect_PiChart_Component;

import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import {PieChart} from 'react-native-svg-charts';
import {Text as SvgText} from 'react-native-svg';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {instance} from '../Axiosinstance';

interface PieData {
  key: number;
  amount: number;
  label: string;
  svg: {
    fill: string;
  };
}

interface LabelProps {
  slices: Array<{
    pieCentroid: [number, number];
    labelCentroid: [number, number];
    data: PieData;
  }>;
  height: number;
  width: number;
}

const COLORS = ['#BBAB4C', '#007EB1', '#BA4150', '#00BAAF', '#7A9CC1'];

const Labels: React.FC<LabelProps> = ({slices}) => {
  return slices.map((slice, index) => {
    const {pieCentroid, data} = slice;
    return (
      <React.Fragment key={index}>
        <SvgText
          x={pieCentroid[0]}
          y={pieCentroid[1] - 5}
          fill="#000"
          textAnchor="middle"
          alignmentBaseline="middle"
          fontSize={height * 0.017}
          stroke="black"
          strokeWidth={0.2}>
          {data.amount}
        </SvgText>
        <SvgText
          x={pieCentroid[0]}
          y={pieCentroid[1] + 5}
          fill="#000"
          textAnchor="middle"
          alignmentBaseline="middle"
          fontWeight={'bold'}
          fontSize={height * 0.01}>
          {data.label}
        </SvgText>
      </React.Fragment>
    );
  });
};

const Defect_PiChart_Component = () => {
  const [data, setData] = useState<PieData[]>([]);

  const settingData = useSelector(
    (state: RootState) => state.Setting.settingData,
  );

  const Get_PieChart_top5_Line_Dfect = async () => {
    try {
      const response = await instance.get(
        `/Get_ProductionBoard_all_Info/Get_PieChart_top5_Line_Dfect_Data/${settingData?.setLineID}`,
      );

      // Map response to PieData format
      const formattedData: PieData[] = response.data.data.map(
        (item: {label: string; amount: number}, index: number) => ({
          key: index + 1,
          amount: item.amount,
          label: item.label,
          svg: {fill: COLORS[index % COLORS.length]},
        }),
      );

      setData(formattedData);

      console.log(
        'Formatted PieChart Data:',
        JSON.stringify(formattedData, null, 2),
      );
    } catch (error: any) {
      console.error('Error fetching data:', error.response || error.message);
    }
  };

  useEffect(() => {
    Get_PieChart_top5_Line_Dfect(); // Initial fetch

    const intervalId = setInterval(() => {
      Get_PieChart_top5_Line_Dfect();
      console.log('Component Reload Pie Chart');
    }, 3300000); // 30 minutes in milliseconds
    return () => clearInterval(intervalId); // Cleanup
  }, []);

  return (
    <View style={{flex: 1, flexDirection: 'column', backgroundColor: '#fff'}}>
      <View
        style={{
          flex: 0.5,
          backgroundColor: '#DEB887',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{color: '#000', fontWeight: '900', fontSize: height * 0.01}}>
          Top 5 Defect Chart
        </Text>
      </View>
      <View style={{flex: 6, backgroundColor: '#D3D3D3'}}>
        {data.length > 0 ? (
          <PieChart
            style={styles.chart}
            valueAccessor={({item}) => item.amount}
            data={data}
            spacing={0}
            outerRadius={'95%'}>
            <Labels />
          </PieChart>
        ) : (
          <Text style={{color: '#fff', fontSize: height * 0.015}}>
            No data available
          </Text>
        )}
      </View>
    </View>
  );
};

const {width, height} = Dimensions.get('screen');
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#DDE3E9',
    // paddingVertical: 20,
    flex: 1,
  },
  title: {
    fontSize: height * 0.01,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  chart: {
    height: height * 0.19,
    width: width * 0.2,
  },
});

export default React.memo(Defect_PiChart_Component);
