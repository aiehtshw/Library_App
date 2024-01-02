import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import {Colors} from '../../utils/colors';
import styles from './styles';

type CheckBoxProps = {
  text: string;
  onClick: () => void;
  value?: boolean;
};
const CheckBox: React.FC<CheckBoxProps> = ({onClick, text, value}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onClick} style={styles.checkBox}>
        {value && <AntDesign name="check" size={16} color={Colors.Black} />}
      </TouchableOpacity>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default CheckBox;
