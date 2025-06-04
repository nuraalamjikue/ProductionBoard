import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
  Text,
  Dimensions,
} from 'react-native';
interface GlobalTextInputProps extends TextInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  errorMessage?: string;
  secureTextEntry?: boolean;
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

const GlobalTextInput: React.FC<GlobalTextInputProps> = ({
  placeholder,
  value,
  onChangeText,
  errorMessage,
  secureTextEntry = false,
  width,
  keyboardType,
  ...rest
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, {width: width || '10%'}]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        placeholderTextColor="#aaa"
        keyboardType={keyboardType}
        {...rest}
      />
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
};
const {width: screenWidth, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    marginVertical: 0,
  },
  input: {
    height: height * 0.04,
    width: screenWidth * 0.025,
    borderColor: '#D3D3D3',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 5,
    fontSize: height * 0.018,
    color: '#333',
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
    paddingVertical: 1,
  },
  errorText: {
    color: '#FF0000',
    fontSize: screenWidth * 0.025,
    marginTop: 2,
    paddingHorizontal: 3,
  },
});

export default GlobalTextInput;
