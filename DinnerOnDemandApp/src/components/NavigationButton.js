import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Layout, Text, Button } from '@ui-kitten/components';
// import { ThemeContext } from './src/components/theme-context';

function NavigationButton({name, doFunction, custom})
{
  const navigation = useNavigation();
  return(
    <View style = {styles.container}>
      <Button 
        style = {[styles.buttonBackground, custom]}
        onPress = {doFunction}
        >
        <Text style = {styles.buttonText}>{name}</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
  },
  buttonBackground: {
    width: '100%',
    borderWidth: 1,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 23,
    margin: 10,
    color: "white"
  },
})

export default NavigationButton;