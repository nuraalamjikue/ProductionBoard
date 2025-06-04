import React from 'react';
import {StyleSheet, ViewStyle, TextStyle, Dimensions} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown'; // Replace with your dropdown library

type GlobalDropdownProps = {
  data: Array<{label: string; value: string | number}>;
  placeholder?: string;
  searchPlaceholder?: string;
  selectedValue?: string | number | null;
  onChange: (item: {label: string; value: string | number}) => void;
  style?: ViewStyle;
  placeholderStyle?: TextStyle;
  selectedTextStyle?: TextStyle;
  inputSearchStyle?: TextStyle;
  iconStyle?: ViewStyle;
  maxHeight?: number;
  width?: number;
  fontSize?: number;
};

const GlobalDropdown: React.FC<GlobalDropdownProps> = ({
  data,
  placeholder = 'Select an option',
  searchPlaceholder = 'Search...',
  selectedValue,
  onChange,
  style,
  placeholderStyle,
  selectedTextStyle,
  inputSearchStyle,
  iconStyle,
  maxHeight,
  width,
  fontSize,
}) => {
  return (
    <Dropdown
      style={[
        styles.dropdown,
        {width: width || styles.dropdown.width},
        {height: maxHeight || styles.dropdown.height},
        style,
      ]}
      placeholderStyle={[
        styles.placeholderStyle,
        placeholderStyle,
        {fontSize: fontSize || height * 0.015},
      ]}
      selectedTextStyle={[
        styles.selectedTextStyle,
        selectedTextStyle,
        {fontSize: fontSize || height * 0.015},
      ]}
      inputSearchStyle={[
        styles.inputSearchStyle,
        inputSearchStyle,
        {fontSize: fontSize || height * 0.015},
      ]}
      iconStyle={[styles.iconStyle]}
      itemTextStyle={{
        color: '#000',
        fontSize: fontSize || height * 0.015,
      }}
      data={data}
      search
      maxHeight={maxHeight}
      labelField="label"
      valueField="value"
      placeholder={placeholder}
      searchPlaceholder={searchPlaceholder}
      //value={selectedValue}
      onChange={onChange}
    />
  );
};
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  dropdown: {
    borderColor: 'gray',
    width: Dimensions.get('window').width * 0.45,
    borderWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
    height: height * 0.06,
  },
  placeholderStyle: {
    color: '#000',
    fontSize: height * 0.015,
  },
  selectedTextStyle: {
    fontSize: height * 0.015,
    color: '#000',
  },
  inputSearchStyle: {
    height: 40,
    fontSize: height * 0.015,
    color: '#000',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});

export default GlobalDropdown;
