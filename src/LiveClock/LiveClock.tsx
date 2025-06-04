// // LiveClock.tsx
// import React, {useEffect, useState} from 'react';
// import {Text, StyleSheet, Dimensions} from 'react-native';
// import dayjs from 'dayjs';

// const LiveClock = () => {
//   const [time, setTime] = useState(dayjs().format('HH:mm:ss'));

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTime(dayjs().format('HH:mm:ss'));
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);
//   return <Text style={styles.clockText}>{time}</Text>;
// };

// const {width, height} = Dimensions.get('screen');
// const styles = StyleSheet.create({
//   clockText: {
//     fontSize: height * 0.02,
//     fontWeight: 'bold',
//     color: '#fff',
//     textAlign: 'center',
//   },
// });

// export default React.memo(LiveClock); // <-- Memoized

import React, {useEffect, useState, useRef} from 'react';
import {Text, StyleSheet, Dimensions} from 'react-native';
import dayjs from 'dayjs';
import {instance} from '../Axiosinstance';

const LiveClock = () => {
  const [time, setTime] = useState('');
  const currentTimeRef = useRef<dayjs.Dayjs | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timer;

    const fetchTimeFromAPI = async () => {
      try {
        const response = await instance.get(
          '/Get_ProductionBoard_all_Info/GetTime',
        );
        const serverTime = dayjs(response.data.time); // API time: 2025-05-27T14:45:35.8696011+06:00
        currentTimeRef.current = serverTime;
        setTime(serverTime.format('hh:mm:ss A'));

        // Start interval to update every second
        timer = setInterval(() => {
          if (currentTimeRef.current) {
            currentTimeRef.current = currentTimeRef.current.add(1, 'second');
            setTime(currentTimeRef.current.format('hh:mm:ss A'));
          }
        }, 1000);
      } catch (error: any) {
        console.error('Error fetching time:', error.response || error.message);
      }
    };

    fetchTimeFromAPI();

    return () => clearInterval(timer); // Cleanup
  }, []);

  return <Text style={styles.clockText}>{time}</Text>;
};

const {height} = Dimensions.get('screen');
const styles = StyleSheet.create({
  clockText: {
    fontSize: height * 0.02,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
});

export default React.memo(LiveClock);
