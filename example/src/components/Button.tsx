import {
  Text,
  TouchableOpacity,
  StyleSheet,
  type TouchableOpacityProps,
} from 'react-native';
import React from 'react';

type Props = TouchableOpacityProps & {
  label: string;
  onPress: Function;
};

export const Button = ({ label = 'label', ...rest }: Props) => {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2196F3',
    borderWidth: 3,
    borderColor: '#FFF',
    borderRadius: 20,
    width: 'auto',
    height: 60,
    marginVertical: 5,
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFF',
  },
});
