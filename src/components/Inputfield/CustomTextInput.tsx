import React, {useState} from 'react';
import {View, TextInput, Text, StyleSheet, Dimensions} from 'react-native';

interface CustomTextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  errorMessage?: string;
  width?: number;
  keyboardType?:
    | 'default'
    | 'email-address'
    | 'numeric'
    | 'phone-pad'
    | 'decimal-pad'
    | 'twitter'
    | 'web-search'
    | 'ascii-capable'
    | 'numbers-and-punctuation'
    | 'url'
    | 'visible-password'; // Optional keyboard type
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder = '',
  secureTextEntry = false,
  errorMessage,
  width,
  keyboardType,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <View
      style={[
        styles.inputContainer,
        isFocused || value ? styles.focusedInput : null,
        {width: width}, // Apply custom width if provided
      ]}>
      <Text
        style={[
          styles.label,
          isFocused || value ? styles.floatingLabel : null,
        ]}>
        {label}
      </Text>
      <TextInput
        style={[styles.input, {width: width || '10%'}]}
        value={value}
        onChangeText={onChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={isFocused || value ? placeholder : undefined}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType} // Apply custom keyboard type
      />
      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
    </View>
  );
};
const {width: screenWidth, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  inputContainer: {
    position: 'relative',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    // marginBottom: 20,
  },
  label: {
    position: 'absolute',
    top: 10,
    left: 12,
    fontSize: height * 0.012,
    color: '#aaa',
  },
  floatingLabel: {
    top: -10,
    fontSize: height * 0.012,
    color: '#007BFF',
    backgroundColor: '#F9F9F9',
    paddingHorizontal: 5,
  },
  input: {
    height: height * 0.05,
    width: screenWidth * 0.025,
    paddingLeft: 12,
    //paddingTop: 10,
    fontSize: height * 0.02,
    color: '#333',
  },
  focusedInput: {
    borderColor: '#007BFF',
  },
  error: {
    color: 'red',
    fontSize: height * 0.012,
    position: 'absolute',
    bottom: -18,
    left: 12,
  },
});

export default CustomTextInput;
