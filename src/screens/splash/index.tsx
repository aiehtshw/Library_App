import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Feather} from '@expo/vector-icons';
import {LocalizedString} from '../../utils/languages';

const Splash = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Feather name="book-open" size={50} color="black" />
        <Text style={styles.text}>{LocalizedString.welcome}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    marginTop: 10,
  },
});

export default Splash;
