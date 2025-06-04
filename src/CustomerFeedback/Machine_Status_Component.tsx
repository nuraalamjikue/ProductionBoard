// import React, {useEffect, useState} from 'react';
// import {View, Text, StyleSheet, Dimensions} from 'react-native';
// import {instance} from '../Axiosinstance';
// import {useSelector} from 'react-redux';
// import {RootState} from '../redux/store';
// import Svg, {Polygon} from 'react-native-svg';

// const {height, width} = Dimensions.get('window');
// const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('screen');

// const LABEL_WIDTH = SCREEN_WIDTH * 0.1;
// const LABEL_HEIGHT = SCREEN_HEIGHT * 0.028;

// const trianglePoints = () => {
//   const p1 = `15,0`;
//   const p2 = `${LABEL_WIDTH},0`;
//   const p3 = `${LABEL_WIDTH - 10},${LABEL_HEIGHT}`;
//   const p4 = `0,${LABEL_HEIGHT}`;
//   return `${p1} ${p2} ${p3} ${p4}`;
// };

// type Machine_StatusItem = {
//   id: number;
//   department: string;
//   d: number; // used like defectId
//   cardPunch?: number; // optional card value
//   employeeName?: string; // optional tooltip info
//   times?: string; // optional tooltip info
// };

// const Machine_Status_Component: React.FC = () => {
//   const [data, setData] = useState<Machine_StatusItem[]>([]);
//   const [blink, setBlink] = useState(false); // State for blinking effect
//   const settingData = useSelector(
//     (state: RootState) => state.Setting.settingData,
//   );

//   // Toggle blink state every 500ms
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setBlink(prev => !prev);
//     }, 500);
//     return () => clearInterval(interval);
//   }, []);

//   const handle_Machine_Status_Data = async () => {
//     try {
//       const response = await instance.get(
//         `/Get_ProductionBoard_all_Info/Get_Machine_Status_Data_Line_Wise/${settingData?.setLineID}`,
//       );
//       setData(response.data.data);
//     } catch (error: any) {
//       console.error('Error fetching data:', error.response || error.message);
//     }
//   };

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       handle_Machine_Status_Data();
//       console.log('Component Reload Machane Status');
//     }, 10000); // 30s interval

//     return () => clearInterval(intervalId);
//   }, []);

//   const getBoxColor = (item: Machine_StatusItem) => {
//     if (item.department === 'Industrial Engineering') {
//       return '#90EE90'; // Light green
//     }
//     if (item.d === 3) {
//       // Return alternate colors for blinking effect
//       return blink ? '#004D90' : '#E10B17'; // Alternate between Tomato and Red
//     }
//     if (item.d === 2) {
//       return blink ? '#004D90' : '#FFFE00'; // Alternate between Tomato and Red
//     }
//     if (item.d === 4) {
//       return blink ? '#000' : '#05FCF8'; // Alternate between Tomato and Red
//     }
//     if (item.cardPunch === 0) {
//       return '#FFD700'; // Gold
//     }
//     return '#286090'; // Default blue
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.labelContainer}>
//         <Svg width={LABEL_WIDTH} height={LABEL_HEIGHT}>
//           <Polygon points={trianglePoints()} fill="#F5ED05" />
//         </Svg>
//         <Text style={styles.labelText}>Customer Feedback</Text>
//       </View>

//       {data.map((item, index) => (
//         <View
//           key={index}
//           style={[styles.boxWrapper, {backgroundColor: getBoxColor(item)}]}>
//           <View
//             style={[
//               styles.square,
//               {
//                 width:
//                   item.d === 4 || item.d === 2 || item.d === 3
//                     ? width / 50
//                     : width / 80,
//               },
//             ]}>
//             <Text
//               style={[
//                 styles.text,
//                 {
//                   color:
//                     item.department === 'Industrial Engineering'
//                       ? '#000'
//                       : '#fff',
//                 },
//               ]}>
//               {item.d}
//             </Text>

//             {item.times && (
//               <>
//                 <View style={styles.redLine} />
//                 <Text
//                   style={[
//                     styles.text,
//                     {
//                       color:
//                         item.department === 'Industrial Engineering'
//                           ? '#000'
//                           : '#fff',
//                     },
//                   ]}>
//                   {item.times}
//                 </Text>
//               </>
//             )}
//           </View>
//         </View>
//       ))}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     width: SCREEN_WIDTH,
//     // height: LABEL_HEIGHT,
//     // backgroundColor: '#000',

//     alignItems: 'center',
//   },
//   boxWrapper: {
//     margin: 0.5,
//     shadowColor: '#000',
//     shadowOffset: {width: 1, height: 1},
//     shadowOpacity: 0.3,
//     shadowRadius: 2,
//     elevation: 5,
//     borderRadius: 2,
//   },
//   square: {
//     width: width / 80,
//     height: width / 70,
//     justifyContent: 'center',
//     alignItems: 'center',
//     // borderRadius: 58,
//   },
//   redLine: {
//     width: '90%',
//     height: 0.4,
//     backgroundColor: '#000',
//   },
//   text: {
//     fontWeight: 'bold',
//     fontSize: height * 0.01,
//     textAlign: 'center',
//   },
//   MACHINE_text: {
//     fontSize: height * 0.01,
//     color: '#000',
//     fontWeight: 'bold',
//     textAlign: 'center',
//     // marginTop: 2,
//   },
//   labelText: {
//     fontSize: SCREEN_HEIGHT * 0.012,
//     color: '#000',
//     fontWeight: 'bold',
//     position: 'absolute',
//     // top: 2,
//     textAlign: 'center',
//   },
//   CustomerFeedback_svg: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     width: '95%',
//     height: '100%',
//   },
//   labelContainer: {
//     width: LABEL_WIDTH,
//     height: LABEL_HEIGHT,
//     justifyContent: 'center',
//     alignItems: 'center',
//     position: 'relative',
//     // overflow: 'hidden',
//   },
// });

// export default React.memo(Machine_Status_Component);

// import React, {useEffect, useState, useRef} from 'react';
// import {View, Text, StyleSheet, Dimensions, Animated} from 'react-native';
// import {instance} from '../Axiosinstance';
// import {useSelector} from 'react-redux';
// import {RootState} from '../redux/store';
// import Svg, {Polygon} from 'react-native-svg';

// const {height, width} = Dimensions.get('window');
// const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('screen');

// const LABEL_WIDTH = SCREEN_WIDTH * 0.1;
// const LABEL_HEIGHT = SCREEN_HEIGHT * 0.028;

// const trianglePoints = () => {
//   const p1 = `15,0`;
//   const p2 = `${LABEL_WIDTH},0`;
//   const p3 = `${LABEL_WIDTH - 10},${LABEL_HEIGHT}`;
//   const p4 = `0,${LABEL_HEIGHT}`;
//   return `${p1} ${p2} ${p3} ${p4}`;
// };

// type Machine_StatusItem = {
//   id: number;
//   department: string;
//   d: number;
//   cardPunch?: number;
//   employeeName?: string;
//   times?: string;
// };

// const Machine_Status_Component: React.FC = () => {
//   const [data, setData] = useState<Machine_StatusItem[]>([]);
//   const settingData = useSelector(
//     (state: RootState) => state.Setting.settingData,
//   );

//   const blinkAnim = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     Animated.loop(
//       Animated.sequence([
//         Animated.timing(blinkAnim, {
//           toValue: 1,
//           duration: 500,
//           useNativeDriver: false,
//         }),
//         Animated.timing(blinkAnim, {
//           toValue: 0,
//           duration: 500,
//           useNativeDriver: false,
//         }),
//       ]),
//     ).start();
//   }, []);

//   const Get_Weekly_Performance_Chart = async () => {
//     try {
//       const response = await instance.get(
//         `/Get_ProductionBoard_all_Info/Get_Machine_Status_Data_Line_Wise/${settingData?.setLineID}`,
//       );
//       setData(response.data.data);
//     } catch (error: any) {
//       console.error('Error fetching data:', error.response || error.message);
//     }
//   };

//   useEffect(() => {
//     Get_Weekly_Performance_Chart();
//   }, []);

//   const getBoxColor = (item: Machine_StatusItem) => {
//     if (item.department === 'Industrial Engineering') {
//       return '#90EE90';
//     }
//     if (item.cardPunch === 0) {
//       return '#FFD700';
//     }
//     return '#286090';
//   };

// const getAnimatedBackgroundColor = (item: Machine_StatusItem) => {
//   if (item.d === 3) {
//     return blinkAnim.interpolate({
//       inputRange: [0, 1],
//       outputRange: ['#286090', 'red'],
//     });
//   }
//   if (item.d === 2) {
//     return blinkAnim.interpolate({
//       inputRange: [0, 1],
//       outputRange: ['#286090', 'yellow'],
//     });
//   }
//   if (item.d === 4) {
//     return blinkAnim.interpolate({
//       inputRange: [0, 1],
//       outputRange: ['#286090', 'cyan'],
//     });
//   }
//   return getBoxColor(item);
// };

//   return (
//     <View style={styles.container}>
//       <View style={styles.labelContainer}>
//         <Svg width={LABEL_WIDTH} height={LABEL_HEIGHT}>
//           <Polygon points={trianglePoints()} fill="#F5ED05" />
//         </Svg>
//         <Text style={styles.labelText}>Machine Status</Text>
//       </View>

//       {data.map((item, index) => (
//         <Animated.View
//           key={index}
//           style={[
//             styles.boxWrapper,
//             {
//               backgroundColor:
//                 item.d === 3 || item.d === 2 || item.d === 4
//                   ? getAnimatedBackgroundColor(item)
//                   : getBoxColor(item),
//             },
//           ]}>
//           <View
//             style={[
//               styles.square,
//               {
//                 width:
//                   item.d === 3 || item.d === 2 || item.d === 4
//                     ? width / 60
//                     : width / 80,
//               },
//             ]}>
//             <Text
//               style={[
//                 styles.text,
//                 {
//                   color:
//                     item.department === 'Industrial Engineering'
//                       ? '#000'
//                       : '#fff',

//                   fontSize:
//                     item.d === 3 || item.d === 2 || item.d === 4
//                       ? height * 0.006
//                       : height * 0.01,
//                 },
//               ]}>
//               {item.id}
//             </Text>

//             {item.times && (
//               <>
//                 <View style={styles.redLine} />
//                 <Text
//                   style={[
//                     styles.text,
//                     {
//                       fontSize:
//                         item.d === 3 || item.d === 2 || item.d === 4
//                           ? height * 0.008
//                           : height * 0.006, // You can actually simplify this, see note below
//                       color:
//                         item.department === 'Industrial Engineering'
//                           ? '#000'
//                           : '#fff',
//                     },
//                   ]}>
//                   {item.times}
//                 </Text>
//               </>
//             )}
//           </View>
//         </Animated.View>
//       ))}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     width: SCREEN_WIDTH,
//     alignItems: 'center',
//   },
//   boxWrapper: {
//     margin: 0.5,
//     shadowColor: '#000',
//     shadowOffset: {width: 1, height: 1},
//     shadowOpacity: 0.3,
//     shadowRadius: 2,
//     elevation: 5,
//     borderRadius: 2,
//   },
//   square: {
//     width: width / 80,
//     height: width / 70,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   redLine: {
//     width: '90%',
//     height: 0.4,
//     backgroundColor: '#000',
//   },
//   text: {
//     fontWeight: 'bold',
//     fontSize: height * 0.01,
//     textAlign: 'center',
//   },
//   MACHINE_text: {
//     fontSize: height * 0.01,
//     color: '#000',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   labelText: {
//     fontSize: SCREEN_HEIGHT * 0.012,
//     color: '#000',
//     fontWeight: 'bold',
//     position: 'absolute',
//     textAlign: 'center',
//   },
//   CustomerFeedback_svg: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     width: '95%',
//     height: '100%',
//   },
//   labelContainer: {
//     width: LABEL_WIDTH,
//     height: LABEL_HEIGHT,
//     justifyContent: 'center',
//     alignItems: 'center',
//     position: 'relative',
//   },
// });

// export default React.memo(Machine_Status_Component);

import React, {useEffect, useState, useRef} from 'react';
import {View, Text, StyleSheet, Dimensions, Animated} from 'react-native';
import {instance} from '../Axiosinstance';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import Svg, {Polygon} from 'react-native-svg';

const {height, width} = Dimensions.get('window');
const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('screen');

const LABEL_WIDTH = SCREEN_WIDTH * 0.1;
const LABEL_HEIGHT = SCREEN_HEIGHT * 0.028;

const trianglePoints = () => {
  const p1 = `15,0`;
  const p2 = `${LABEL_WIDTH},0`;
  const p3 = `${LABEL_WIDTH - 10},${LABEL_HEIGHT}`;
  const p4 = `0,${LABEL_HEIGHT}`;
  return `${p1} ${p2} ${p3} ${p4}`;
};

type Machine_StatusItem = {
  id: number;
  department: string;
  d: number;
  cardPunch?: number;
  employeeName?: string;
  times?: string;
};

const Machine_Status_Component: React.FC = () => {
  const [data, setData] = useState<Machine_StatusItem[]>([]);
  const settingData = useSelector(
    (state: RootState) => state.Setting.settingData,
  );

  const blinkAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(blinkAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: false,
        }),
        Animated.timing(blinkAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: false,
        }),
      ]),
    ).start();
  }, []);

  const Get_Weekly_Performance_Chart = async () => {
    try {
      const response = await instance.get(
        `/Get_ProductionBoard_all_Info/Get_Machine_Status_Data_Line_Wise/${settingData?.setLineID}`,
      );
      setData(response.data.data);
    } catch (error: any) {
      console.error('Error fetching data:', error.response || error.message);
    }
  };

  useEffect(() => {
    Get_Weekly_Performance_Chart(); // Initial fetch

    const intervalId = setInterval(() => {
      Get_Weekly_Performance_Chart();
      console.log('Component Reload Machine Status');
    }, 10000); // 10s interval

    return () => clearInterval(intervalId); // Cleanup
  }, []);

  const getBoxColor = (item: Machine_StatusItem) => {
    if (item.department === 'Industrial Engineering') {
      return '#90EE90';
    }
    if (item.cardPunch === 0) {
      return '#FFD700';
    }
    return '#286090';
  };

  const getAnimatedBackgroundColor = (item: Machine_StatusItem) => {
    if (item.d === 3) {
      return blinkAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['#286090', 'red'],
      });
    }
    if (item.d === 2) {
      return blinkAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['#286090', 'yellow'],
      });
    }
    if (item.d === 4) {
      return blinkAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['#286090', 'cyan'],
      });
    }
    return getBoxColor(item);
  };

  const getGlowingStyle = (item: Machine_StatusItem) => {
    const backgroundColor = getAnimatedBackgroundColor(item);

    const shadowRadius = blinkAnim.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [2, 20, 2],
    });

    return {
      backgroundColor,
      shadowColor: '#FFFF00',
      shadowOffset: {width: 0, height: 0},
      shadowOpacity: 1,
      shadowRadius,
      elevation: 10, // Android shadow
    };
  };

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Svg width={LABEL_WIDTH} height={LABEL_HEIGHT}>
          <Polygon points={trianglePoints()} fill="#F5ED05" />
        </Svg>
        <Text style={styles.labelText}>Machine Status</Text>
      </View>

      {data.map((item, index) => (
        <Animated.View
          key={index}
          style={[
            styles.boxWrapper,
            item.d === 3 || item.d === 2 || item.d === 4
              ? getGlowingStyle(item)
              : {backgroundColor: getBoxColor(item)},
          ]}>
          <View
            style={[
              styles.square,
              {
                width:
                  item.d === 3 || item.d === 2 || item.d === 4
                    ? width / 60
                    : width / 80,
              },
            ]}>
            <Text
              style={[
                styles.text,
                {
                  color:
                    item.department === 'Industrial Engineering'
                      ? '#000'
                      : '#fff',
                  fontSize:
                    item.d === 3 || item.d === 2 || item.d === 4
                      ? height * 0.005
                      : height * 0.01,
                },
              ]}>
              {item.id}
            </Text>

            {item.times && (
              <>
                <View style={styles.redLine} />
                <Text
                  style={[
                    styles.text,
                    {
                      fontSize:
                        item.d === 3 || item.d === 2 || item.d === 4
                          ? height * 0.005
                          : height * 0.01,
                      color:
                        item.department === 'Industrial Engineering'
                          ? '#000'
                          : '#fff',
                    },
                  ]}>
                  {item.times}
                </Text>
              </>
            )}
          </View>
        </Animated.View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: SCREEN_WIDTH,
    alignItems: 'center',
  },
  boxWrapper: {
    margin: 0.5,
    borderRadius: 2,
  },
  square: {
    height: width / 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  redLine: {
    width: '90%',
    height: 0.4,
    backgroundColor: '#000',
  },
  text: {
    fontWeight: 'bold',
    fontSize: height * 0.01,
    textAlign: 'center',
  },
  labelText: {
    fontSize: SCREEN_HEIGHT * 0.012,
    color: '#000',
    fontWeight: 'bold',
    position: 'absolute',
    textAlign: 'center',
  },
  labelContainer: {
    width: LABEL_WIDTH,
    height: LABEL_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
});

export default React.memo(Machine_Status_Component);
