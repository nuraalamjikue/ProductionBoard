import React from 'react';
import {Text, View} from 'react-native';

const MachineStatus = () => {
  return (
    <View style={{flex: 1, flexDirection: 'column', backgroundColor: '#fff'}}>
      <View style={{flex: 1, backgroundColor: '#808080'}}>
        <Text>'Head'</Text>
      </View>
      <View style={{flex: 6, backgroundColor: '#D3D3D3'}}>
        <Text>'Body'</Text>
      </View>
      <View style={{flex: 1, backgroundColor: '#808080'}}>
        <Text>'Foot'</Text>
      </View>
    </View>
  );
};

export default MachineStatus;
