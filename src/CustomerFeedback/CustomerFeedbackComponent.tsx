// import React, {useRef, useEffect, useState} from 'react';
// import {Animated, Text, View, StyleSheet, Dimensions} from 'react-native';
// import Svg, {Polygon} from 'react-native-svg';

// const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('screen');

// const CustomerFeedbackComponent = () => {
//   const translateX = useRef(new Animated.Value(SCREEN_WIDTH)).current;
//   const [textWidth, setTextWidth] = useState(0);

//   const marqueeText = `SNOWTEX SPORTSWEAR LTD OUR SENSE - "BE HAPPY, MAKE HAPPY" OUR VALUES - "HONESTY & COMMITMENT" Developed By "SNOWTEX"   `;

//   useEffect(() => {
//     if (textWidth === 0) return;

//     const startAnimation = () => {
//       translateX.setValue(SCREEN_WIDTH);
//       Animated.timing(translateX, {
//         toValue: -textWidth,
//         duration: 50000, // Adjust for speed
//         useNativeDriver: true,
//       }).start(() => startAnimation());
//     };

//     startAnimation();
//   }, [textWidth]);

//   return (
//     <View style={styles.container}>
//       <View style={styles.labelContainer}>
//         <Svg height="100%" width="100%">
//           <Polygon points="15,0 120,0 110,15 0,15" fill="red" />
//         </Svg>
//         <Text style={styles.labelText}>Customer Feedback</Text>
//       </View>

//       <View style={styles.marqueeWrapper}>
//         <Animated.Text
//           onLayout={e => setTextWidth(e.nativeEvent.layout.width)}
//           style={[styles.marqueeText, {transform: [{translateX}]}]}>
//           {marqueeText}
//         </Animated.Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     width: SCREEN_WIDTH,
//     height: SCREEN_HEIGHT * 0.035,
//     // backgroundColor: '#000',
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   labelContainer: {
//     width: '15%',
//     height: SCREEN_HEIGHT * 0.04,
//     // backgroundColor: '#000',
//     justifyContent: 'center',
//     alignItems: 'center',
//     position: 'relative',
//     overflow: 'hidden',
//   },
//   labelText: {
//     fontSize: SCREEN_HEIGHT * 0.012,
//     color: '#fff',
//     fontWeight: 'bold',
//     position: 'absolute',
//     top: 2,
//     textAlign: 'center',
//   },
//   marqueeWrapper: {
//     width: '90%',
//     overflow: 'hidden',
//     height: SCREEN_HEIGHT * 0.04,
//     justifyContent: 'center',
//   },
//   marqueeText: {
//     color: '#fff',
//     fontSize: SCREEN_HEIGHT * 0.014,
//     fontWeight: 'bold',
//     textAlign: 'left',
//     position: 'absolute',
//   },
// });

// export default CustomerFeedbackComponent;

import React, {useRef, useEffect, useState} from 'react';
import {Animated, Text, View, StyleSheet, Dimensions} from 'react-native';
import Svg, {Polygon} from 'react-native-svg';
import {instance} from '../Axiosinstance';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('screen');

const LABEL_WIDTH = SCREEN_WIDTH * 0.12;
const LABEL_HEIGHT = SCREEN_HEIGHT * 0.035;

const trianglePoints = () => {
  const p1 = `15,0`;
  const p2 = `${LABEL_WIDTH},0`;
  const p3 = `${LABEL_WIDTH - 10},${LABEL_HEIGHT}`;
  const p4 = `0,${LABEL_HEIGHT}`;
  return `${p1} ${p2} ${p3} ${p4}`;
};

const CustomerFeedbackComponent = () => {
  const translateX = useRef(new Animated.Value(SCREEN_WIDTH)).current;
  const [textWidth, setTextWidth] = useState(0);
  const settingData = useSelector(
    (state: RootState) => state.Setting.settingData,
  );

  const [feedbackData, setFeedbackData] = useState<string>('');

  const Get_Customer_Feedback = async () => {
    try {
      const response = await instance.get(
        `/Get_ProductionBoard_all_Info/Get_Customer_Feedback/${settingData?.setLineID}`,
      );

      const data = response.data?.data?.[0];

      if (data) {
        const combinedText = `${data.name} | ${data.title} | ${data.msg}`;
        setFeedbackData(combinedText);
      }
    } catch (error: any) {
      console.error('Error fetching data:', error.response || error.message);
    }
  };

  useEffect(() => {
    Get_Customer_Feedback(); // Initial fetch

    const intervalId = setInterval(() => {
      Get_Customer_Feedback();
      console.log('Component Reload Customer_Feedback');
    }, 3600000); // 30 minutes in milliseconds
    return () => clearInterval(intervalId); // Cleanup
  }, []);

  const marqueeText = `SNOWTEX SPORTSWEAR LTD OUR SENSE - "BE HAPPY, MAKE HAPPY" OUR VALUES - "HONESTY & COMMITMENT" Developed By "SNOWTEX"   `;

  useEffect(() => {
    if (textWidth === 0) return;

    const startAnimation = () => {
      translateX.setValue(SCREEN_WIDTH);
      Animated.timing(translateX, {
        toValue: -textWidth,
        duration: 50000, // Adjust for speed
        useNativeDriver: true,
      }).start(() => startAnimation());
    };

    startAnimation();
  }, [textWidth]);

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Svg width={LABEL_WIDTH} height={LABEL_HEIGHT}>
          <Polygon points={trianglePoints()} fill="red" />
        </Svg>
        <Text style={styles.labelText}>Customer Feedback</Text>
      </View>

      <View style={styles.marqueeWrapper}>
        <Animated.Text
          onLayout={e => setTextWidth(e.nativeEvent.layout.width)}
          style={[styles.marqueeText, {transform: [{translateX}]}]}>
          {feedbackData}
        </Animated.Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    height: LABEL_HEIGHT,
    // backgroundColor: '#000',
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelContainer: {
    width: LABEL_WIDTH,
    height: LABEL_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  labelText: {
    fontSize: SCREEN_HEIGHT * 0.012,
    color: '#fff',
    fontWeight: 'bold',
    position: 'absolute',
    // top: 4,
    textAlign: 'center',
  },
  marqueeWrapper: {
    width: SCREEN_WIDTH - LABEL_WIDTH,
    overflow: 'hidden',
    height: LABEL_HEIGHT,
    justifyContent: 'center',
  },
  marqueeText: {
    color: '#fff',
    fontSize: SCREEN_HEIGHT * 0.014,
    fontWeight: 'bold',
    position: 'absolute',
  },
});

export default CustomerFeedbackComponent;
