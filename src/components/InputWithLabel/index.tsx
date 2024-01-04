import React from 'react';
import {Text, TextInput, View} from 'react-native';
import styles from './styles';

type InputWithLabelProps = {
  isPassword: boolean;
  label: string;
  onChangeText?: (text: string) => void;
  value?: string;
  editable?: boolean;
};

const InputWithLabel: React.FC<InputWithLabelProps> = ({
  isPassword,
  label,
  onChangeText,
  value,
  editable,
}) => {
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          editable={editable}
          value={value}
          onChangeText={onChangeText}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={isPassword}
        />
      </View>
    </>
  );
};

export default InputWithLabel;
