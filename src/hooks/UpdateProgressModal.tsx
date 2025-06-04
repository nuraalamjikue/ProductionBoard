// UpdateProgressModal.tsx
import React from 'react';
import {Modal, View, Text, StyleSheet} from 'react-native';

interface Props {
  visible: boolean;
  progress: number;
}

const UpdateProgressModal: React.FC<Props> = ({visible, progress}) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.progressBox}>
          <Text style={styles.text}>Downloading Update...</Text>
          <View style={styles.progressBarBackground}>
            <View style={[styles.progressBarFill, {width: `${progress}%`}]} />
          </View>
          <Text style={styles.text}>{progress.toFixed(2)}%</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#00000080',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBox: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  progressBarBackground: {
    width: '100%',
    height: 10,
    backgroundColor: '#eee',
    borderRadius: 5,
    marginVertical: 15,
  },
  progressBarFill: {
    height: 10,
    backgroundColor: '#4caf50',
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
  },
});

export default UpdateProgressModal;
