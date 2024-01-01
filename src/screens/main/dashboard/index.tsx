import React from 'react';
import {Text, View} from 'react-native';
import {NativeStackScreenProps} from 'react-native-screens/native-stack';
import {MainScreens, MainStackParamList} from '../../../navigation/routes';

type DashboardProps = NativeStackScreenProps<
  MainStackParamList,
  MainScreens.Dashboard
>;

const Dashboard: React.FC<DashboardProps> = () => {
  return (
    <View>
      <Text>Empty</Text>
    </View>
  );
};

export default Dashboard;
