// import React, {useEffect, useState} from 'react';
// import {View, Text, StyleSheet, Dimensions} from 'react-native';
// import {instance} from '../Axiosinstance';
// import {useSelector} from 'react-redux';
// import {RootState} from '../redux/store';

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

// const InlineTable = () => {
//   const [data, setData] = useState<ChartItem[]>([]);
//   const settingData = useSelector(
//     (state: RootState) => state.Setting.settingData,
//   );

//   const fetchLineGraphInfo = async () => {
//     try {
//       const response = await instance.get(
//         `/Get_ProductionBoard_all_Info/line-graph-info/${settingData?.setLineID}`,
//       );
//       setData(response.data.data);
//     } catch (error: any) {
//       console.error('Error fetching data:', error?.response || error.message);
//     }
//   };

//   useEffect(() => {
//     fetchLineGraphInfo();
//   }, []);

//   // useEffect(() => {
//   //   fetchLineGraphInfo(); // Initial fetch
//   //   const intervalId = setInterval(() => {
//   //     fetchLineGraphInfo();
//   //     console.log('Component Reload');
//   //   }, 10000);

//   //   return () => clearInterval(intervalId);
//   // }, []);

//   const visibleRows = data.filter(item => item.isVisibleInLine === 1);
//   const SliceDatatop_15 = visibleRows.slice(0, 18);

//   return (
//     <View style={styles.container}>
//       <View style={styles.tableWrapper}>
//         {/* Header */}
//         <View style={[styles.row, styles.headerRow]}>
//           <View style={styles.cellLeft}>
//             <Text style={[styles.headerText]}>OP Name</Text>
//           </View>
//           <View style={styles.cellpart_capacit}>
//             <Text style={[styles.headerText]}>Part Name</Text>
//           </View>
//           <View style={styles.cellRight}>
//             <Text style={[styles.headerText]}>Cap</Text>
//           </View>
//           <View style={styles.cellRight}>
//             <Text style={[styles.headerText]}>1</Text>
//           </View>
//           <View style={styles.cellRight}>
//             <Text style={[styles.headerText]}>2</Text>
//           </View>
//           <View style={styles.cellRight}>
//             <Text style={[styles.headerText]}>3</Text>
//           </View>
//           <View style={styles.cellRight}>
//             <Text style={[styles.headerText]}>4</Text>
//           </View>
//           <View style={styles.cellRight}>
//             <Text style={[styles.headerText]}>5</Text>
//           </View>
//           <View style={styles.cellRight}>
//             <Text style={[styles.headerText]}>6</Text>
//           </View>
//           <View style={styles.cellRight}>
//             <Text style={[styles.headerText]}>7</Text>
//           </View>

//           <View style={styles.cellRight}>
//             <Text style={[styles.headerText]}>8</Text>
//           </View>
//           <View style={styles.cellRight}>
//             <Text style={[styles.headerText]}>9</Text>
//           </View>
//           <View style={styles.cellRight}>
//             <Text style={[styles.headerText]}>10</Text>
//           </View>
//           <View style={styles.cellRight}>
//             <Text style={[styles.headerText_Cap]}>O.Cap</Text>
//           </View>
//           <View style={styles.cellRightLast}>
//             <Text style={[styles.headerText_Cap]}>MC Cap</Text>
//           </View>
//         </View>

//         {/* Body Rows */}
//         {SliceDatatop_15.map((row, index) => (
//           <View
//             key={index}
//             style={[
//               styles.row,
//               {backgroundColor: index % 2 === 0 ? '#f2f2f2' : '#ffffff'},
//             ]}>
//             <View style={styles.cellLeft}>
//               <Text style={styles.cellTextLeft}>{row.opName}</Text>
//             </View>
//             <View style={styles.cellpart_capacit}>
//               <Text style={styles.cellTextRight}>{row.part}</Text>
//             </View>
//             <View style={styles.cellRight}>
//               <Text style={styles.cellTextRight}>{row.opCapacity}</Text>
//             </View>
//             <View style={styles.cellRight}>
//               <Text style={styles.cellTextRight}>{row.s1}</Text>
//             </View>
//             <View style={styles.cellRight}>
//               <Text style={styles.cellTextRight}>{row.s2}</Text>
//             </View>

//             <View style={styles.cellRight}>
//               <Text style={styles.cellTextRight}>{row.s3}</Text>
//             </View>

//             <View style={styles.cellRight}>
//               <Text style={styles.cellTextRight}>{row.s4}</Text>
//             </View>

//             <View style={styles.cellRight}>
//               <Text style={styles.cellTextRight}>{row.s5}</Text>
//             </View>

//             <View style={styles.cellRight}>
//               <Text style={styles.cellTextRight}>{row.s6}</Text>
//             </View>
//             <View style={styles.cellRight}>
//               <Text style={styles.cellTextRight}>{row.s7}</Text>
//             </View>
//             <View style={styles.cellRight}>
//               <Text style={styles.cellTextRight}>{row.s8}</Text>
//             </View>
//             <View style={styles.cellRight}>
//               <Text style={styles.cellTextRight}>{row.s9}</Text>
//             </View>
//             <View style={styles.cellRight}>
//               <Text style={styles.cellTextRight}>{row.s10}</Text>
//             </View>

//             <View style={styles.cellRight}>
//               <Text style={styles.cellTextRight}>{row.othersCapacity}</Text>
//             </View>

//             <View style={styles.cellRightLast}>
//               <Text style={styles.cellTextRight}>
//                 {row.machineDownTimeCapacity}
//               </Text>
//             </View>
//           </View>
//         ))}
//       </View>
//     </View>
//   );
// };

// const {width, height} = Dimensions.get('window');

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     paddingHorizontal: 2,
//     paddingVertical: 1,
//   },
//   tableWrapper: {
//     flex: 6,
//     borderRightWidth: 1,
//     borderLeftColor: '#ddd',
//     // backgroundColor: '#D3D3D3',
//   },
//   row: {
//     flexDirection: 'row',
//     borderBottomWidth: 1,
//     borderBottomColor: '#ddd',
//   },
//   headerRow: {
//     backgroundColor: '#007acc',
//   },
//   cellpart_capacit: {
//     width: '18%',
//     padding: 1.5,
//     justifyContent: 'center',
//     borderLeftWidth: 1,
//     borderLeftColor: '#ccc',
//   },
//   cellothers_capacit: {
//     width: '8%',
//     padding: 1.5,
//     justifyContent: 'center',
//     borderLeftWidth: 1,
//     borderLeftColor: '#ccc',
//   },
//   cellLeft: {
//     width: '15%',
//     padding: 1.5,
//     justifyContent: 'center',
//   },
//   cellRight: {
//     width: '5%',
//     padding: 1.5,
//     justifyContent: 'center',
//     borderLeftWidth: 1,
//     borderLeftColor: '#ccc',
//   },
//   headerText: {
//     fontSize: height * 0.009,
//     // fontWeight: 'bold',
//     color: '#fff',
//     textAlign: 'center',
//   },
//   headerText_Cap: {
//     fontSize: height * 0.006,
//     // fontWeight: 'bold',
//     color: '#fff',
//     textAlign: 'center',
//   },
//   cellTextLeft: {
//     fontSize: height * 0.006,
//     // fontWeight: '600',
//     color: '#333',
//   },
//   cellTextRight: {
//     fontSize: height * 0.006,
//     // fontWeight: 'bold',
//     textAlign: 'center',
//     color: '#222',
//   },

//   cellRightLast: {
//     width: '6%',
//     padding: 1.5,
//     justifyContent: 'center',
//     borderLeftWidth: 1,
//     borderLeftColor: '#ccc',
//   },
// });

// export default InlineTable;

import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {instance} from '../Axiosinstance';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';

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

const InlineTable = () => {
  const [data, setData] = useState<ChartItem[]>([]);
  const settingData = useSelector(
    (state: RootState) => state.Setting.settingData,
  );

  const fetchLineGraphInfo = async () => {
    try {
      const response = await instance.get(
        `/Get_ProductionBoard_all_Info/line-graph-info/${settingData?.setLineID}`,
      );
      setData(response.data.data);
    } catch (error: any) {
      console.error('Error fetching data:', error?.response || error.message);
    }
  };

  useEffect(() => {
    fetchLineGraphInfo(); // Initial fetch

    const intervalId = setInterval(() => {
      fetchLineGraphInfo();
      console.log('Component Reload OP Table graph left');
    }, 600000); // 10 minutes in milliseconds
    return () => clearInterval(intervalId); // Cleanup
  }, []);

  const visibleRows = data.filter(item => item.isVisibleInLine === 1);
  const SliceDatatop_15 = visibleRows.slice(0, 18);

  return (
    <>
      {data.length > 0 ? (
        <View
          style={{
            flex: 1,
            backgroundColor: '#004FFF',
            flexDirection: 'row',
          }}>
          <View style={[styles.tableWrapper_Name]}>
            <Text style={[styles.headerText]}>OP Name</Text>
          </View>
          <View style={styles.tableWrapper_Part}>
            <Text style={[styles.headerText]}>Part Name</Text>
          </View>
          <View style={styles.tableWrapper_Part}>
            <Text style={[styles.headerText]}>Capacity</Text>
          </View>
          <View style={styles.tableWrapper}>
            <Text style={[styles.headerText]}>1</Text>
          </View>
          <View style={styles.tableWrapper}>
            <Text style={[styles.headerText]}>2</Text>
          </View>
          <View style={styles.tableWrapper}>
            <Text style={[styles.headerText]}>3</Text>
          </View>
          <View style={styles.tableWrapper}>
            <Text style={[styles.headerText]}>4</Text>
          </View>
          <View style={styles.tableWrapper}>
            <Text style={[styles.headerText]}>5</Text>
          </View>
          <View style={styles.tableWrapper}>
            <Text style={[styles.headerText]}>6</Text>
          </View>
          <View style={styles.tableWrapper}>
            <Text style={[styles.headerText]}>7</Text>
          </View>
          <View style={styles.tableWrapper}>
            <Text style={[styles.headerText]}>8</Text>
          </View>
          <View style={styles.tableWrapper}>
            <Text style={[styles.headerText]}>9</Text>
          </View>
          <View style={styles.tableWrapper}>
            <Text style={[styles.headerText]}>10</Text>
          </View>
          <View style={styles.tableWrapper}>
            <Text style={[styles.headerText]}>O.Cap</Text>
          </View>
          <View style={styles.tableWrapper}>
            <Text style={[styles.headerText]}>MC Cap</Text>
          </View>
        </View>
      ) : (
        <Text
          style={{
            flex: 1,
            textAlign: 'center',
            alignContent: 'center',
            justifyContent: 'center',
            color: '#fff',
          }}>
          No data available
        </Text>
      )}
      {/* Body Rows */}
      {SliceDatatop_15.map((row, index) => (
        <View
          style={{
            flex: 1,
            backgroundColor: index % 2 === 0 ? '#f2f2f2' : '#ffffff',
            flexDirection: 'row',
          }}>
          <View style={styles.cell_Name}>
            <Text style={[styles.cellTextLeft, {textAlign: 'center'}]}>
              {row.opName}
            </Text>
          </View>
          <View style={styles.cell_Part}>
            <Text style={styles.cellTextRight}>{row.part}</Text>
          </View>
          <View style={styles.cell_Part}>
            <Text style={styles.cellTextRight}>{row.opCapacity}</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellTextRight}>{row.s1}</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellTextRight}>{row.s2}</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellTextRight}>{row.s3}</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellTextRight}>{row.s4}</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellTextRight}>{row.s5}</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellTextRight}>{row.s6}</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellTextRight}>{row.s7}</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellTextRight}>{row.s8}</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellTextRight}>{row.s9}</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellTextRight}>{row.s10}</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellTextRight}>{row.othersCapacity}</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellTextRight}>
              {row.machineDownTimeCapacity}
            </Text>
          </View>
        </View>
      ))}
    </>
  );
};

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  tableWrapper: {
    flex: 1,
    backgroundColor: '#004FFF',
    justifyContent: 'center',
    alignContent: 'center',
    borderColor: '#000',
    borderWidth: 0.3,
  },

  cell: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    borderColor: '#000',
    borderWidth: 0.3,
  },

  tableWrapper_Name: {
    flex: 2,
    backgroundColor: '#004FFF',
    justifyContent: 'center',
    alignContent: 'center',
    borderColor: '#000',
    borderWidth: 0.3,
  },

  cell_Part: {
    flex: 1.5,
    justifyContent: 'center',
    alignContent: 'center',
    borderColor: '#000',
    borderWidth: 0.3,
  },

  tableWrapper_Part: {
    flex: 1.5,
    backgroundColor: '#004FFF',
    justifyContent: 'center',
    alignContent: 'center',
    borderColor: '#000',
    borderWidth: 0.3,
  },

  cell_Name: {
    flex: 2,
    justifyContent: 'center',
    alignContent: 'center',
    borderColor: '#000',
    borderWidth: 0.3,
  },

  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    borderColor: '#000',
    borderWidth: 0.3,
  },
  headerRow: {
    backgroundColor: '#007acc',
  },
  cellpart_capacit: {
    width: '18%',
    padding: 1.5,
    justifyContent: 'center',
    borderLeftWidth: 1,
    borderLeftColor: '#ccc',
  },
  cellothers_capacit: {
    width: '8%',
    padding: 1.5,
    justifyContent: 'center',
    borderLeftWidth: 1,
    borderLeftColor: '#ccc',
  },
  cellLeft: {
    width: '15%',
    padding: 1.5,
    justifyContent: 'center',
  },
  cellRight: {
    width: '5%',
    padding: 1.5,
    justifyContent: 'center',
    borderLeftWidth: 1,
    borderLeftColor: '#ccc',
  },
  headerText: {
    fontSize: height * 0.008,
    // fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  headerText_Cap: {
    fontSize: height * 0.008,
    // fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  cellTextLeft: {
    fontSize: height * 0.008,
    fontWeight: '600',
    color: '#000',
  },
  cellTextRight: {
    fontSize: height * 0.008,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
  },

  cellRightLast: {
    width: '6%',
    padding: 1.5,
    justifyContent: 'center',
    borderLeftWidth: 1,
    borderLeftColor: '#ccc',
  },
});

export default React.memo(InlineTable);
