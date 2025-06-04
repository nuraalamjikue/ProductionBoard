// import React, {useEffect, useState} from 'react';
// import {View, Text, FlatList, StyleSheet, Dimensions} from 'react-native';
// import {instance} from '../Axiosinstance';

// type _EmployeeCapacityItem = {
//   swsp: string;
//   capEff: string;
//   capH: number;
//   names: string;
//   employeeID: string;
//   sl: number;
//   capHR: string;
// };

// const EmployeeWise_cap_Compnent = () => {
//   const [data, setData] = useState<_EmployeeCapacityItem[]>([]);

//   const Get_Employee_Capacity = async () => {
//     try {
//       const response = await instance.get(
//         '/Get_ProductionBoard_all_Info/Get_Employee_Capacity/2/2',
//       );
//       setData(response.data.data);
//     } catch (error: any) {
//       console.error('Error fetching data:', error.response || error.message);
//     }
//   };
//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       Get_Employee_Capacity();
//       console.log('Component Reload');
//     }, 10000); // 100ms interval

//     return () => clearInterval(intervalId);
//   }, []);

//   const tableHeader = () => (
//     <View style={[styles.tableRow, styles.header]}>
//       <Text style={[styles.columnCellSl, styles.headerTextSl]}>SL</Text>
//       <Text style={[styles.columnCell, styles.headerText]}>EmpID</Text>
//       <Text style={[styles.columnCell, styles.headerText]}>Name</Text>
//       <Text style={[styles.columnCell, styles.headerText]}>Cap/H</Text>
//       <Text style={[styles.columnCell, styles.headerText]}>CPEff</Text>
//       <Text style={[styles.columnCell, styles.headerText]}>SW/SP</Text>
//     </View>
//   );

//   return (
//     <FlatList
//       data={data}
//       keyExtractor={(item, index) => index.toString()}
//       ListHeaderComponent={tableHeader}
//       stickyHeaderIndices={[0]}
//       renderItem={({item, index}) => (
//         <View
//           style={[
//             styles.tableRow,
//             {backgroundColor: index % 2 === 1 ? '#F0FBFC' : 'white'},
//           ]}>
//           <Text style={styles.columnCellSl}>{index + 1}</Text>
//           <Text style={styles.columnCell}>{item.employeeID || 0}</Text>
//           <Text style={styles.columnCell}>{item.names}</Text>
//           <Text style={styles.columnCell}>{item.capH}</Text>
//           <Text style={styles.columnCell}>{item.capEff}</Text>
//           <Text style={styles.columnCell}>{item.swsp}</Text>
//         </View>
//       )}
//     />
//   );
// };

// const {width, height} = Dimensions.get('screen');

// const styles = StyleSheet.create({
//   tableRow: {
//     flexDirection: 'row',
//   },
//   columnCell: {
//     flex: 1,
//     textAlign: 'center',
//     fontSize: height * 0.007,
//     borderWidth: 0.3,
//     borderColor: '#ccc',
//     paddingVertical: 2,
//   },
//   columnCellSl: {
//     flex: 0.5,
//     textAlign: 'center',
//     fontSize: height * 0.006,
//     paddingVertical: 2,
//   },
//   header: {
//     backgroundColor: '#007AFF',
//   },
//   headerText: {
//     color: 'white',
//     fontWeight: 'bold',
//     fontSize: height * 0.006,
//   },
//   headerTextSl: {
//     flex: 0.5,
//     fontSize: height * 0.006,
//     color: 'white',
//     fontWeight: 'bold',
//   },
// });

// export default EmployeeWise_cap_Compnent;

import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Dimensions, ScrollView} from 'react-native';
import {instance} from '../Axiosinstance';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';

type _EmployeeCapacityItem = {
  swsp: string;
  capEff: string;
  capH: number;
  names: string;
  employeeID: string;
  sl: number;
  capHR: string;
};

const EmployeeWise_cap_Compnent = () => {
  const [data, setData] = useState<_EmployeeCapacityItem[]>([]);

  const settingData = useSelector(
    (state: RootState) => state.Setting.settingData,
  );

  const Get_Employee_Capacity = async () => {
    try {
      const response = await instance.get(
        `/Get_ProductionBoard_all_Info/Get_Employee_Capacity/${settingData?.setLineID}`,
      );
      setData(response.data.data);
    } catch (error: any) {
      console.error('Error fetching data:', error.response || error.message);
    }
  };

  useEffect(() => {
    Get_Employee_Capacity(); // Initial fetch

    const intervalId = setInterval(() => {
      Get_Employee_Capacity();
      console.log('Component Reload Emp Capacity');
    }, 3300000); // 30 minutes in milliseconds
    return () => clearInterval(intervalId); // Cleanup
  }, []);

  const SliceDatatop_76 = data.slice(0, 76);

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     Get_Employee_Capacity();
  //     // console.log('Component Reload');
  //   }, 10000); // 100ms interval

  //   return () => clearInterval(intervalId);
  // }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.row, styles.headerRow]}>
        <View style={styles.cellSl}>
          <Text style={[styles.headerText]}>SL</Text>
        </View>
        <View style={styles.cellEmpID}>
          <Text style={[styles.headerText]}>EmpID</Text>
        </View>
        <View style={styles.cellEmpName}>
          <Text style={[styles.headerText]}>Name</Text>
        </View>
        <View style={styles.cellEmpID}>
          <Text style={[styles.headerText]}>Cap/H</Text>
        </View>
        <View style={styles.cellEmpID}>
          <Text style={[styles.headerText]}>CPEff</Text>
        </View>
        <View style={styles.cellEmpID}>
          <Text style={[styles.headerText]}>SW</Text>
        </View>
      </View>

      {/* Body Rows */}
      {SliceDatatop_76.map((row, index) => (
        <View
          key={index}
          style={[
            styles.row,
            {backgroundColor: index % 2 === 0 ? '#ffffff' : '#ffffff'},
          ]}>
          <View style={styles.cellSl}>
            <Text style={styles.cellTextLeft}>{row.sl}</Text>
          </View>
          <View style={styles.cellEmpID}>
            <Text style={styles.cellTextRight}>{row.employeeID}</Text>
          </View>
          <View style={styles.cellEmpName}>
            <Text style={styles.cellTextRight}>{row.names}</Text>
          </View>
          <View style={styles.cellEmpID}>
            <Text style={styles.cellTextRight}>{row.capH}</Text>
          </View>
          <View style={styles.cellEmpID}>
            <Text style={styles.cellTextRight}>{row.capEff}</Text>
          </View>
          <View style={styles.cellEmpID}>
            <Text style={styles.cellTextRight}>{row.swsp}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};
const {width, height} = Dimensions.get('screen');
const styles = StyleSheet.create({
  container: {
    // width: '87%',
    transform: [{rotate: '-90deg'}],
    marginLeft: height * -0.07,
    height: height, // height of the entire screen
    width: height * 0.21,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
  },
  headerRow: {
    backgroundColor: '#007acc',
  },
  cellSl: {
    width: '10%',
    padding: 0.9,
    justifyContent: 'center',
    borderLeftWidth: 0.3,
    borderLeftColor: '#000',
  },
  cellEmpID: {
    width: '15%',
    // padding: 3,
    justifyContent: 'center',
    borderLeftWidth: 0.3,
    borderLeftColor: '#000',
  },
  cellEmpName: {
    width: '30%',
    // padding: 3,
    justifyContent: 'center',
    borderLeftWidth: 0.3,
    borderLeftColor: '#000',
  },
  // cellLeft: {
  //   width: '65%',
  //   padding: 3,
  //   justifyContent: 'center',
  // },
  // cellRight: {
  //   width: '35%',
  //   padding: 3,
  //   justifyContent: 'center',
  //   borderLeftWidth: 1,
  //   borderLeftColor: '#ccc',
  // },
  headerText: {
    fontSize: height * 0.007,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  cellTextLeft: {
    fontSize: height * 0.007,
    fontWeight: '400',
    color: '#333',
  },
  cellTextRight: {
    fontSize: height * 0.007,
    // fontWeight: 'bold',
    textAlign: 'center',
    color: '#222',
  },
});

export default React.memo(EmployeeWise_cap_Compnent);
