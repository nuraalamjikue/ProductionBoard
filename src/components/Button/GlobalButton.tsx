import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Pressable,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Dimensions,
} from 'react-native';

type GlobalButtonProps = {
  title: string;
  onPress: () => void;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  fontSize?: number;
  icon?: string;
  iconSize?: number;
};

const GlobalButton: React.FC<GlobalButtonProps> = ({
  title,
  onPress,
  buttonStyle,
  fontSize,
  disabled = false,
  icon,
  iconSize = 20,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        styles.button,
        buttonStyle,
        disabled && styles.disabledButton,
        pressed && !disabled && styles.pressedButton,
      ]}
      disabled={disabled}>
      <Text
        style={[
          styles.buttonText,
          {fontSize: fontSize || styles.buttonText.fontSize},
        ]}>
        {icon && <Icon name={icon} size={iconSize} color="#FFFFFF" />}
        {icon && title && ' '}
        {title}
      </Text>
    </Pressable>
  );
};
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#6200EE',
    paddingVertical: height * 0.01,
    paddingHorizontal: height * 0.008,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  buttonText: {
    fontSize: height * 0.012,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  pressedButton: {
    backgroundColor: '#3700B3',
  },
  disabledButton: {
    backgroundColor: '#BDBDBD',
  },
});

export default GlobalButton;
