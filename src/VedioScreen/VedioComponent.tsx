import React, {useEffect} from 'react';
import {View, StyleSheet, Dimensions, StatusBar} from 'react-native';
import Video from 'react-native-video';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../types';

const {width} = Dimensions.get('window');

const VedioComponent = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('MainComponent'); // navigate back after 10 seconds
    }, 211000); // 3 minutes 31 seconds in milliseconds

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <Video
        source={{
          uri: 'http://192.168.1.232:84/Videos/Video_20250518_114726Video_Play_For_Board.mp4',
        }}
        style={styles.video}
        controls={true} // show playback controls
        resizeMode="contain" // adjust video aspect ratio
        repeat={true} // loop video playback
        paused={false} // start playing immediately
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black', // better for video playback
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: width,
    height: (width * 9) / 16, // 16:9 aspect ratio
  },
});

export default VedioComponent;
