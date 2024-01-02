import React from 'react';
import {Text, TextInput, View} from 'react-native';
import styles from './styles';

type InputWithLabelProps = {
  label: string;
  onChangeText?: (text: string) => void;
  value?: string;
};

const InputWithLabel: React.FC<InputWithLabelProps> = ({
  label,
  onChangeText,
  value,
}) => {
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput value={value} onChangeText={onChangeText} />
      </View>
    </>
  );
};

export default InputWithLabel;
