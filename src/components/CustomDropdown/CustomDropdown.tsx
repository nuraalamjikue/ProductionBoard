// src/components/CustomDropdown.tsx
import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

interface DropdownProps {
  data: {value: string | number; label: string}[];
  isVisible: boolean;
  onClose: () => void;
  selectedItems: (string | number)[]; // Update this line
  onSelect: (value: string | number) => void;
}

const CustomDropdown: React.FC<DropdownProps> = ({
  data,
  isVisible,
  onClose,
  selectedItems,
  onSelect,
}) => {
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)', // Background dim effect
        }}>
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 10,
            padding: 16,
            width: '80%',
            maxHeight: '70%',
          }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              marginBottom: 10,
            }}>
            Select Items
          </Text>

          {/* Scrollable List */}
          <ScrollView>
            <FlatList
              data={data}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => onSelect(item.value)}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 8,
                  }}>
                  {/* Custom Checkbox */}
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 5,
                      borderWidth: 2,
                      borderColor: selectedItems.includes(item.value)
                        ? '#007AFF'
                        : '#ccc',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 10,
                    }}>
                    {selectedItems.includes(item.value) && (
                      <View
                        style={{
                          width: 12,
                          height: 12,
                          backgroundColor: '#007AFF',
                          borderRadius: 3,
                        }}
                      />
                    )}
                  </View>

                  <Text style={{fontSize: 16}}>{item.label}</Text>
                </TouchableOpacity>
              )}
              initialNumToRender={10} // Render first 10 items initially
              maxToRenderPerBatch={10} // Load in batches
            />
          </ScrollView>

          {/* Close Button */}
          <TouchableOpacity
            onPress={onClose}
            style={{
              backgroundColor: '#FF3B30',
              padding: 12,
              borderRadius: 8,
              alignItems: 'center',
              marginTop: 10,
            }}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CustomDropdown;
