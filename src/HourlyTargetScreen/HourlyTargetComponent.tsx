import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import {instance} from '../Axiosinstance';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';

type HourlyProductionItem = {
  StyleNo: string;
  hourNo: string;
  lineID: number;
  targetPcs: number;
  production: Number;
  alters: number;
  reject: number;
  hdr: number;
  htgt: number;
  cpmhtgt: number;
  todaysTargets: number;
  productionQty: number;
  lastHour: Number;
  cU_IE: number;
  cU_CPM: number;
  cU_PCS: number;
  hrAchiveEffi: number;
};

const legends = [
  {color: 'red', label: 'Out of Target/Maintenance'},
  {color: 'black', label: 'In Target'},
  {color: 'yellow', label: 'Quality'},
  {color: 'cyan', label: 'Others'},
  {color: 'peru', label: 'No OP'},
  {color: 'steelblue', label: 'OK'},
  {color: 'lightgreen', label: 'IE OP'},
];

const HourlyTargetComponent = () => {
  const [data, setData] = useState<HourlyProductionItem[]>([]);
  const [boardviewdata, setBoardViewData] = useState<HourlyProductionItem[]>(
    [],
  );
  const [dataLength, setDataLength] = useState<Number>(0);
  const settingData = useSelector(
    (state: RootState) => state.Setting.settingData,
  );
  const targetData = useSelector((state: RootState) => state.Setting);

  // console.log(
  //   'cycleCount ' + JSON.stringify(targetData.LocalSetDRData, null, 2),
  // );

  const get_ProductionBoard_all_Info = async () => {
    try {
      const response = await instance.get(
        `/Get_ProductionBoard_all_Info/GetHourlyIECPMTargetArea/${settingData?.setCompanyID}/${settingData?.setLineID}`,
      );

      // Get raw data
      const allData = response.data.data;

      // Filter hourNo from 1st to 10th
      const filteredData = allData.filter((item: any) => {
        const match = item.hourNo?.match(/^(\d+)(st|nd|rd|th)$/);
        if (match) {
          const hour = parseInt(match[1], 10);
          return hour >= 1 && hour <= 10;
        }
        return false;
      });

      // Set filtered data
      setData(response.data.data);
      setBoardViewData(filteredData);

      setDataLength(response.data.data.length);
    } catch (error: any) {
      console.error('Error fetching data:', error.response || error.message);
    }
  };

  useEffect(() => {
    get_ProductionBoard_all_Info(); // Initial fetch

    const intervalId = setInterval(() => {
      get_ProductionBoard_all_Info();
      console.log('Component Reload Hourly Target Check');
    }, 10000); // 10s interval

    return () => clearInterval(intervalId); // Cleanup
  }, []);

  //#region max CU_IE
  const getMaxCUIE = () => {
    const values = data
      .map(item => item.cU_IE)
      .filter(val => typeof val === 'number');
    const max = Math.max(...values);
    return max;
  };
  const Total_target_IE = getMaxCUIE();
  //#endregion
  //#region max CU_CPM
  const getMaxCUCPM = () => {
    const values = data
      .map(item => item.cU_CPM)
      .filter(val => typeof val === 'number');
    const max = Math.max(...values);
    return max;
  };
  const Total_target_CMP = getMaxCUCPM();
  //#endregion
  //#region max CU_CPM
  const getMaxcU_PC = () => {
    const values = data
      .map(item => item.cU_PCS)
      .filter(val => typeof val === 'number');
    const max = Math.max(...values);
    return max;
  };
  const Total_achieve_PCS = getMaxcU_PC();

  // console.log('String(item.htgt).length ' + dataLength);
  //#endregion
  return (
    <View style={styles.container}>
      {/* Header Row */}

      <View
        style={{
          // flex: 1,
          flexDirection: 'row',
          backgroundColor: '#fff',
          height: height * 0.05,
        }}>
        <View
          style={{
            flex: 1.1,
            borderColor: '#e1e1e1',
            borderWidth: 0.5,
            height: height * 0.05,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={[styles.headerText, {color: '#000'}]}>Hour</Text>
        </View>
        <View
          style={{
            flex: 2,
            borderColor: '#e1e1e1',
            borderWidth: 0.5,
            height: height * 0.05,
            flexDirection: 'column',
          }}>
          <View style={{flex: 1}}>
            <Text
              style={[styles.headerText, {color: '#000', textAlign: 'center'}]}>
              Target
            </Text>
          </View>
          <View style={{flex: 1}}>
            <View style={styles.row}>
              <View style={styles.subCellleft}>
                <Text style={[styles.subHeaderText, {color: '#000'}]}>IE</Text>
              </View>
              <View style={styles.subCellRight}>
                <Text style={[styles.subHeaderText, {color: '#000'}]}>CPM</Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 2,
            borderColor: '#e1e1e1',
            borderWidth: 0.5,
            height: height * 0.05,
            flexDirection: 'column',
          }}>
          <View style={{flex: 1}}>
            <Text
              style={[styles.headerText, {color: '#000', textAlign: 'center'}]}>
              Achieve
            </Text>
          </View>
          <View style={{flex: 1}}>
            <View style={styles.row}>
              <View style={styles.subCellleft}>
                <Text style={[styles.subHeaderText, {color: '#000'}]}>PCS</Text>
              </View>
              <View style={styles.subCellRight}>
                <Text style={[styles.subHeaderText, {color: '#000'}]}>
                  Effi
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 2,
            borderColor: '#e1e1e1',
            borderWidth: 0.5,
            height: height * 0.05,
            flexDirection: 'column',
          }}>
          <View style={{flex: 1}}>
            <Text
              style={[styles.headerText, {color: '#000', textAlign: 'center'}]}>
              Variance
            </Text>
          </View>
          <View style={{flex: 1}}>
            <View style={styles.row}>
              <View style={styles.subCellleft}>
                <Text style={[styles.subHeaderText, {color: '#000'}]}>IE</Text>
              </View>
              <View style={styles.subCellRight}>
                <Text style={[styles.subHeaderText, {color: '#000'}]}>CPM</Text>
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            borderColor: '#e1e1e1',
            borderWidth: 0.5,
            height: height * 0.05,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={[styles.headerText, {color: '#000', textAlign: 'center'}]}>
            DR %
          </Text>
        </View>
      </View>

      {boardviewdata.length > 0 ? (
        <View
          style={{flex: 1, flexDirection: 'column', backgroundColor: '#fff'}}>
          {boardviewdata.map((item, index) => {
            let IE_percentage = null;
            let CPM_percentage = null;
            // IE_percentage
            if (item.productionQty && item.htgt) {
              IE_percentage = +(
                ((item.productionQty - item.htgt) / item.htgt) *
                100
              ).toFixed(0);
            }
            // CPM_percentage
            if (item.productionQty && item.cpmhtgt) {
              CPM_percentage = +(
                ((item.productionQty - item.cpmhtgt) / item.cpmhtgt) *
                100
              ).toFixed(0);
            }
            // TotalEffi
            if (item.productionQty && item.cpmhtgt) {
              CPM_percentage = +(
                ((item.productionQty - item.cpmhtgt) / item.cpmhtgt) *
                100
              ).toFixed(0);
            }

            return (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  backgroundColor: '#fff',
                }}
                key={index}>
                <View
                  style={{flex: 1.1, borderColor: '#e1e1e1', borderWidth: 0.5}}>
                  <Text style={styles.HourText}>{item?.hourNo}</Text>
                </View>
                {/* Target */}
                <View
                  style={{flex: 1, borderColor: '#e1e1e1', borderWidth: 0.5}}>
                  <Text style={styles.topLeft}>{item.htgt}</Text>

                  {/* Divider Line */}
                  {item?.cU_IE !== 0 && (
                    <View
                      style={{
                        position: 'absolute',
                        top: Number(dataLength) > 10 ? -7 : -8,
                        right: 0,
                        width: '111%',
                        height: 1,
                        backgroundColor: '#e1e1e1',
                        transform: [
                          {translateX: 50},
                          {
                            rotate:
                              Number(dataLength) > 10 ? '-14.7deg' : '-17deg',
                          }, // note: no space in 'deg'
                          {translateX: -50},
                        ],
                      }}
                    />
                  )}
                  <Text style={styles.bottomRight}>
                    {item?.cU_IE !== undefined && item?.cU_IE !== 0
                      ? `${item.cU_IE}`
                      : ''}
                  </Text>
                </View>
                <View
                  style={{flex: 1, borderColor: '#e1e1e1', borderWidth: 0.5}}>
                  <Text style={styles.topLeft}>{item.cpmhtgt}</Text>

                  {/* Divider Line */}
                  {item?.cU_IE !== 0 && (
                    <View
                      style={{
                        position: 'absolute',
                        top: Number(dataLength) > 10 ? -7 : -8,
                        right: 0,
                        width: '111%',
                        height: 1,
                        backgroundColor: '#e1e1e1',
                        transform: [
                          {translateX: 50},
                          {
                            rotate:
                              Number(dataLength) > 10 ? '-14.7deg' : '-17deg',
                          }, // note: no space in 'deg'
                          {translateX: -50},
                        ],
                      }}
                    />
                  )}
                  <Text style={styles.bottomRight}>
                    {item?.cU_CPM !== undefined && item?.cU_CPM !== 0
                      ? `${item.cU_CPM}`
                      : ''}
                  </Text>
                </View>
                {/* End */}
                {/* Achieve */}
                <View
                  style={{flex: 1, borderColor: '#e1e1e1', borderWidth: 0.5}}>
                  <Text
                    style={[
                      styles.topLeft,
                      {
                        color:
                          typeof item.cpmhtgt === 'number' &&
                          typeof item.productionQty === 'number' &&
                          item.cpmhtgt > item.productionQty
                            ? '#9C0000'
                            : '#000',
                      },
                    ]}>
                    {item?.productionQty !== undefined &&
                    item?.productionQty !== 0
                      ? `${item.productionQty}`
                      : ''}
                  </Text>

                  {/* Divider Line */}
                  {item?.cU_IE !== 0 && (
                    <View
                      style={{
                        position: 'absolute',
                        top: Number(dataLength) > 10 ? -7 : -8,
                        right: 0,
                        width: '111%',
                        height: 1,
                        backgroundColor: '#e1e1e1',
                        transform: [
                          {translateX: 50},
                          {
                            rotate:
                              Number(dataLength) > 10 ? '-10deg' : '-17deg',
                          }, // note: no space in 'deg'
                          {translateX: -50},
                        ],
                      }}
                    />
                  )}
                  <Text
                    style={[
                      styles.bottomRight,
                      {
                        color:
                          typeof item.cU_CPM === 'number' &&
                          typeof item.productionQty === 'number' &&
                          item.cU_CPM > item.productionQty
                            ? '#9C0000'
                            : '#000',
                      },
                    ]}>
                    {item?.cU_PCS !== undefined && item?.cU_PCS !== 0
                      ? `${item.cU_PCS}`
                      : ''}
                  </Text>
                </View>
                <View
                  style={{flex: 1, borderColor: '#e1e1e1', borderWidth: 0.5}}>
                  <Text
                    style={[
                      styles.HourText,
                      {
                        color:
                          typeof item.cpmhtgt === 'number' &&
                          typeof item.productionQty === 'number' &&
                          item.cpmhtgt > item.productionQty
                            ? '#9C0000'
                            : '#000',
                      },
                    ]}>
                    {item?.hrAchiveEffi !== undefined &&
                    item?.hrAchiveEffi !== null
                      ? `${item.hrAchiveEffi} %`
                      : ''}
                  </Text>
                </View>
                {/* End */}
                {/* Variance */}
                <View
                  style={{flex: 1, borderColor: '#e1e1e1', borderWidth: 0.5}}>
                  <Text
                    style={[
                      styles.HourText,
                      {
                        color:
                          typeof item.htgt === 'number' &&
                          typeof item.productionQty === 'number' &&
                          item.htgt > item.productionQty
                            ? '#9C0000'
                            : '#000',
                      },
                    ]}>
                    {IE_percentage !== null ? `${IE_percentage}%` : ''}
                  </Text>
                </View>
                <View
                  style={{flex: 1, borderColor: '#e1e1e1', borderWidth: 0.5}}>
                  <Text
                    style={[
                      styles.HourText,
                      {
                        color:
                          typeof item.cpmhtgt === 'number' &&
                          typeof item.productionQty === 'number' &&
                          item.cpmhtgt > item.productionQty
                            ? '#9C0000'
                            : '#000',
                      },
                    ]}>
                    {CPM_percentage !== null ? `${CPM_percentage}%` : ''}
                  </Text>
                </View>
                {/* End */}

                <View
                  style={{flex: 1, borderColor: '#e1e1e1', borderWidth: 0.5}}>
                  <Text
                    style={[
                      styles.HourText,

                      {
                        color: item.hdr > 5 ? '#9C0000' : 'black',
                      },
                    ]}>
                    {item?.hdr !== undefined && item?.hdr !== null
                      ? `${item.hdr} %`
                      : ''}
                  </Text>
                </View>
              </View>
            );
          })}
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              backgroundColor: '#fff',
            }}>
            <View
              style={{
                flex: 1.1,
                borderColor: '#e1e1e1',
                borderWidth: 0.5,
                alignContent: 'center',
                justifyContent: 'center',
              }}>
              <Text style={styles.HourText}>Total</Text>
            </View>
            <View
              style={{
                flex: 1,
                borderColor: '#e1e1e1',
                borderWidth: 0.5,
                alignContent: 'center',
                justifyContent: 'center',
              }}>
              <Text style={styles.HourText}>{Total_target_IE}</Text>
            </View>
            <View
              style={{
                flex: 1,
                borderColor: '#e1e1e1',
                borderWidth: 0.5,
                alignContent: 'center',
                justifyContent: 'center',
              }}>
              <Text style={styles.HourText}>{Total_target_CMP}</Text>
            </View>

            <View
              style={{
                flex: 1,
                borderColor: '#e1e1e1',
                borderWidth: 0.5,
                alignContent: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={[
                  styles.HourText,
                  {
                    color:
                      typeof Total_target_CMP === 'number' &&
                      typeof Total_achieve_PCS === 'number' &&
                      Total_target_CMP > Total_achieve_PCS
                        ? '#9C0000'
                        : '#000',
                  },
                ]}>
                {Total_achieve_PCS}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                borderColor: '#e1e1e1',
                borderWidth: 0.5,
                alignContent: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={[
                  styles.HourText,
                  {
                    color:
                      (typeof Total_target_CMP === 'number' &&
                        typeof Total_achieve_PCS === 'number' &&
                        typeof Total_target_CMP === 'number' &&
                        Total_target_CMP > Total_achieve_PCS) ||
                      Total_target_CMP > Total_achieve_PCS
                        ? '#9C0000'
                        : '#000',
                  },
                ]}>
                {(
                  (Total_achieve_PCS / Total_target_CMP) *
                    Number(targetData.SettingTargetData) || 0
                ).toFixed(0)}
                %
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                borderColor: '#e1e1e1',
                borderWidth: 0.5,
                alignContent: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={[
                  styles.HourText,
                  {
                    color:
                      typeof Total_target_IE === 'number' &&
                      typeof Total_achieve_PCS === 'number' &&
                      Total_target_IE > Total_achieve_PCS
                        ? '#9C0000'
                        : '#000',
                  },
                ]}>
                {(
                  ((Total_achieve_PCS - Total_target_IE) / Total_target_IE) *
                  100
                ).toFixed(0)}
                %
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                borderColor: '#e1e1e1',
                borderWidth: 0.5,
                alignContent: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={[
                  styles.HourText,
                  {
                    color:
                      typeof Total_target_CMP === 'number' &&
                      typeof Total_achieve_PCS === 'number' &&
                      Total_target_CMP > Total_achieve_PCS
                        ? '#9C0000'
                        : '#000',
                  },
                ]}>
                {(
                  ((Total_achieve_PCS - Total_target_CMP) / Total_target_CMP) *
                  100
                ).toFixed(0)}
                %
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                borderColor: '#e1e1e1',
                borderWidth: 0.5,
                alignContent: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={[
                  styles.HourText,
                  {
                    color:
                      Number(targetData.LocalSetDRData) > 5
                        ? '#9C0000'
                        : 'black',
                  },
                ]}>
                {Number(targetData.LocalSetDRData).toFixed(2) || 0}%
              </Text>
            </View>
          </View>
        </View>
      ) : (
        <Text
          style={{
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            marginVertical: 80,
          }}>
          No data available
        </Text>
      )}
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 5,
          marginVertical: 5,
        }}>
        {legends.map((item, index) => (
          <View style={styles.item} key={index}>
            <View style={[styles.colorBox, {backgroundColor: item.color}]} />
            <Text style={styles.label}>{item.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
  },
  headerRow: {
    backgroundColor: '#808080',
    borderBottomWidth: 0.5,
    borderColor: '#000',
  },
  cell: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 3,
  },
  cellHour: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: '#999',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 3,
  },
  compositeHeader: {
    flex: 2,
    borderWidth: 1,
    borderColor: '#999',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 3,
  },

  subCellRight: {
    flex: 1,
    borderColor: '#e1e1e1',
    borderLeftWidth: 0.5,
    borderTopWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 1.5,
  },

  subCellleft: {
    flex: 1,
    borderColor: '#e1e1e1',
    borderTopWidth: 0.5,
    // borderTopWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 1.5,
  },
  headerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: height * 0.012,
  },
  subHeaderText: {
    color: '#fff',
    fontSize: height * 0.012,
  },

  topLeft: {
    position: 'absolute',
    top: 0,
    left: 1,
    fontWeight: '600',
    fontSize: height * 0.012,
    color: '#000',
  },
  bottomRight: {
    position: 'absolute',
    bottom: 0,
    right: 1,
    fontWeight: '600',
    fontSize: height * 0.012,
    color: '#000',
  },
  diagonalCell: {
    padding: 0,
    backgroundColor: '#fff',
  },
  diagonalLine: {
    position: 'absolute',
    top: -11,
    right: 0,
    width: '111%',
    height: 1,
    backgroundColor: '#e1e1e1',
    transform: [{translateX: 50}, {rotate: '-20deg'}, {translateX: -50}],
  },
  totalSingleText: {
    fontWeight: 'bold',
    fontSize: height * 0.012,
    color: '#333',
    textAlign: 'center',
  },
  HourText: {
    fontWeight: 'bold',
    fontSize: height * 0.012,
    // color: '#333',
    textAlign: 'center',
  },

  // ---Heaader Color----------------------
  colorcontainer: {
    flexDirection: 'row',
    padding: 1,
    backgroundColor: '#fff',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  colorBox: {
    width: width * 0.01,
    height: height * 0.01,
    marginRight: 5,
    // borderWidth: 1,
    // borderColor: '#000',
  },
  label: {
    fontSize: height * 0.008,
    color: '#000',
  },
});
export default React.memo(HourlyTargetComponent);

// import React, {useEffect, useState} from 'react';
// import {Text, View, StyleSheet, Dimensions} from 'react-native';
// import {instance} from '../Axiosinstance';
// import {useSelector} from 'react-redux';
// import {RootState} from '../redux/store';

// type HourlyProductionItem = {
//   StyleNo: string;
//   hourNo: string;
//   lineID: number;
//   targetPcs: number;
//   production: Number;
//   alters: number;
//   reject: number;
//   hdr: number;
//   htgt: number;
//   cpmhtgt: number;
//   todaysTargets: number;
//   productionQty: number;
//   lastHour: Number;
//   cU_IE: number;
//   cU_CPM: number;
//   cU_PCS: number;
//   hrAchiveEffi: number;
// };

// const legends = [
//   {color: 'red', label: 'Out of Target/Maintenance'},
//   {color: 'black', label: 'In Target'},
//   {color: 'yellow', label: 'Quality'},
//   {color: 'cyan', label: 'Others'},
//   {color: 'peru', label: 'No OP'},
//   {color: 'steelblue', label: 'OK'},
//   {color: 'lightgreen', label: 'IE OP'},
// ];

// const HourlyTargetComponent = () => {
//   const [data, setData] = useState<HourlyProductionItem[]>([]);
//   const settingData = useSelector(
//     (state: RootState) => state.Setting.settingData,
//   );

//   // console.log('cycleCount ' + settingData?.setLineID);

//   const get_ProductionBoard_all_Info = async () => {
//     try {
//       const response = await instance.get(
//         `/Get_ProductionBoard_all_Info/GetHourlyIECPMTargetArea/${settingData?.setCompanyID}/${settingData?.setLineID}`,
//       );
//       // Assuming response.data.data is ChartItem[]
//       setData(response.data.data);
//     } catch (error: any) {
//       console.error('Error fetching data:', error.response || error.message);
//     }
//   };

//   useEffect(() => {
//     get_ProductionBoard_all_Info();
//   }, []);

//   // useEffect(() => {
//   //   const intervalId = setInterval(() => {
//   //     get_ProductionBoard_all_Info();
//   //     console.log('Component Reload');
//   //   }, 10000); // 100ms interval

//   //   return () => clearInterval(intervalId);
//   // }, []);

//   //#region max CU_IE
//   const getMaxCUIE = () => {
//     const values = data
//       .map(item => item.cU_IE)
//       .filter(val => typeof val === 'number');
//     const max = Math.max(...values);
//     return max;
//   };
//   const maxCUIE = getMaxCUIE();
//   //#endregion
//   //#region max CU_CPM
//   const getMaxCUCPM = () => {
//     const values = data
//       .map(item => item.cU_CPM)
//       .filter(val => typeof val === 'number');
//     const max = Math.max(...values);
//     return max;
//   };
//   const maxCUCPM = getMaxCUCPM();
//   //#endregion
//   //#region max CU_CPM
//   const getMaxcU_PC = () => {
//     const values = data
//       .map(item => item.cU_PCS)
//       .filter(val => typeof val === 'number');
//     const max = Math.max(...values);
//     return max;
//   };
//   const maxCUPC = getMaxcU_PC();
//   //#endregion
//   return (
//     <View style={styles.container}>
//       {/* Header Row */}
//       <View style={[styles.row, styles.headerRow]}>
//         <View style={[styles.cellHour, {backgroundColor: '#D8E4BC'}]}>
//           <Text style={[styles.headerText, {color: '#000'}]}>Hour</Text>
//         </View>
//         <View style={[styles.compositeHeader, {backgroundColor: '#FFF8DC'}]}>
//           <Text style={[styles.headerText, {color: '#000'}]}>Target</Text>
//           <View style={styles.row}>
//             <View
//               style={[
//                 styles.subCell,
//                 {
//                   borderRightWidth: 1,
//                   borderColor: '#999',
//                 },
//               ]}>
//               <Text style={[styles.subHeaderText, {color: '#000'}]}>IE</Text>
//             </View>
//             <View style={styles.subCell}>
//               <Text style={[styles.subHeaderText, {color: '#000'}]}>CPM</Text>
//             </View>
//           </View>
//         </View>
//         <View style={[styles.compositeHeader, {backgroundColor: '#D8E4BC'}]}>
//           <Text style={[styles.headerText, {color: '#000'}]}>Achieve</Text>
//           <View style={styles.row}>
//             <View
//               style={[
//                 styles.subCell,
//                 {
//                   borderRightWidth: 1,
//                   borderColor: '#999',
//                 },
//               ]}>
//               <Text style={[styles.subHeaderText, {color: '#000'}]}>PCS</Text>
//             </View>

//             <View style={styles.subCell}>
//               <Text style={[styles.subHeaderText, {color: '#000'}]}>Effi</Text>
//             </View>
//           </View>
//         </View>
//         <View style={[styles.compositeHeader, {backgroundColor: '#FFF8DC'}]}>
//           <Text style={[styles.headerText, {color: '#000'}]}>Variance</Text>
//           <View style={styles.row}>
//             <View
//               style={[
//                 styles.subCell,
//                 {
//                   borderRightWidth: 1,
//                   borderColor: '#999',
//                 },
//               ]}>
//               <Text style={[styles.subHeaderText, {color: '#000'}]}>IE</Text>
//             </View>
//             <View style={styles.subCell}>
//               <Text style={[styles.subHeaderText, {color: '#000'}]}>CPM</Text>
//             </View>
//           </View>
//         </View>
//         <View style={[styles.cell, {backgroundColor: '#D8E4BC'}]}>
//           <Text style={[styles.headerText, {color: '#000'}]}> DR %</Text>
//         </View>
//       </View>

//       {data.map((item, index) => {
//         return (
//           <View key={index} style={styles.row}>
//             <View style={styles.cell}>
//               {item.hourNo === '13th' ? (
//                 <Text style={styles.HourText}>Total</Text>
//               ) : (
//                 <>
//                   <Text style={styles.HourText}>{item?.hourNo}</Text>
//                 </>
//               )}
//             </View>

//             {/* IE */}
//             <View style={[styles.cell, styles.diagonalCell]}>
//               {item.hourNo !== '13th' && item.htgt != null && (
//                 <View style={styles.diagonalLine} />
//               )}

//               {item.hourNo === '13th' ? (
//                 <Text style={styles.totalSingleText}>{maxCUIE}</Text>
//               ) : (
//                 <>
//                   <Text style={styles.topLeft}>{item.htgt}</Text>
//                   {item.htgt != null && (
//                     <Text style={styles.bottomRight}>{item.cU_IE}</Text>
//                   )}
//                 </>
//               )}
//             </View>

//             {/* CMP */}
//             <View style={[styles.cell, styles.diagonalCell]}>
//               {item.hourNo !== '13th' && item.htgt != null && (
//                 <View style={styles.diagonalLine} />
//               )}
//               {item.hourNo === '13th' ? (
//                 <Text style={styles.totalSingleText}>{maxCUCPM}</Text>
//               ) : (
//                 <>
//                   <Text style={styles.topLeft}>{item.cpmhtgt}</Text>
//                   {item.htgt != null && (
//                     <Text style={styles.bottomRight}>{item.cU_CPM}</Text>
//                   )}
//                 </>
//               )}
//             </View>

//             {/* PCS */}
//             <View style={[styles.cell, styles.diagonalCell]}>
//               {item.hourNo !== '13th' && item.htgt != null && (
//                 <View style={styles.diagonalLine} />
//               )}

//               {item.hourNo === '13th' ? (
//                 <Text style={styles.totalSingleText}>{maxCUPC}</Text>
//               ) : (
//                 <>
//                   <Text style={styles.topLeft}>
//                     {item.productionQty > 0 && item.productionQty}
//                   </Text>
//                   {item.htgt != null && (
//                     <Text style={styles.bottomRight}>{item.cU_PCS}</Text>
//                   )}
//                 </>
//               )}
//             </View>

//             {/* Fffi */}
//             <View style={[styles.cell, styles.diagonalCell]}>
//               <Text style={styles.HourText}>
//                 {item?.hrAchiveEffi !== undefined && item?.hrAchiveEffi !== null
//                   ? `${item.hrAchiveEffi} %`
//                   : ''}
//               </Text>
//             </View>

//             {/* Variance IF */}
//             <View style={[styles.cell, styles.diagonalCell]}>
//               <Text style={styles.HourText}>
//                 {item?.cpmhtgt !== undefined && item?.cpmhtgt !== null
//                   ? `${item.cpmhtgt} %`
//                   : ''}
//               </Text>
//             </View>

//             {/* Variance Cpm */}
//             <View style={[styles.cell, styles.diagonalCell]}>
//               <Text style={styles.HourText}>
//                 {item?.cpmhtgt !== undefined && item?.cpmhtgt !== null
//                   ? `${item.cpmhtgt} %`
//                   : ''}
//               </Text>
//             </View>

//             <View style={styles.cell}>
//               <Text
//                 style={[
//                   styles.HourText,
//                   {color: item?.hdr >= 5 ? 'red' : 'black'},
//                 ]}>
//                 {item?.hdr !== undefined && item?.hdr !== null
//                   ? `${item.hdr} %`
//                   : ''}
//               </Text>
//             </View>
//           </View>
//         );
//       })}

//       <View
//         style={{
//           flexDirection: 'row',
//           marginHorizontal: 5,
//           marginVertical: 5,
//         }}>
//         {legends.map((item, index) => (
//           <View style={styles.item} key={index}>
//             <View style={[styles.colorBox, {backgroundColor: item.color}]} />
//             <Text style={styles.label}>{item.label}</Text>
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
//   },
//   row: {
//     flexDirection: 'row',
//   },
//   headerRow: {
//     backgroundColor: '#808080',
//     borderBottomWidth: 0.5,
//     borderColor: '#000',
//   },
//   cell: {
//     flex: 1,
//     borderWidth: 0.5,
//     borderColor: '#000',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 3,
//   },
//   cellHour: {
//     flex: 1,
//     borderWidth: 0.5,
//     borderColor: '#999',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 3,
//   },
//   compositeHeader: {
//     flex: 2,
//     borderWidth: 1,
//     borderColor: '#999',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 3,
//   },

//   subCell: {
//     flex: 1,
//     borderTopWidth: 1,
//     borderColor: '#999',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 2.5,
//   },
//   headerText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: height * 0.01,
//   },
//   subHeaderText: {
//     color: '#fff',
//     fontSize: height * 0.01,
//   },

//   topLeft: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     fontWeight: '600',
//     fontSize: height * 0.01,
//     color: '#2a2a2a',
//   },
//   bottomRight: {
//     position: 'absolute',
//     bottom: 0,
//     right: 0,
//     fontWeight: '600',
//     fontSize: height * 0.01,
//     color: '#2a2a2a',
//   },
//   diagonalCell: {
//     padding: 0,
//     backgroundColor: '#fff',
//   },
//   diagonalLine: {
//     position: 'absolute',
//     top: -11,
//     right: 0,
//     width: '111%',
//     height: 1,
//     backgroundColor: '#e1e1e1',
//     transform: [{translateX: 50}, {rotate: '-20deg'}, {translateX: -50}],
//   },
//   totalSingleText: {
//     fontWeight: 'bold',
//     fontSize: height * 0.01,
//     color: '#333',
//     textAlign: 'center',
//   },
//   HourText: {
//     fontWeight: 'bold',
//     fontSize: height * 0.01,
//     color: '#333',
//     textAlign: 'center',
//   },

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
//     // borderWidth: 1,
//     // borderColor: '#000',
//   },
//   label: {
//     fontSize: height * 0.008,
//     color: '#000',
//   },
// });
// export default HourlyTargetComponent;
