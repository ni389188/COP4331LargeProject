import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function NavigationButton({name, destination})
{
  const navigation = useNavigation();
  return(
    <View style = {styles.container}>
      <TouchableOpacity 
        style = {styles.buttonBackground}
        onPress = {() =>
        {navigation.navigate(destination)}}
        >
        <Text style = {styles.buttonText}>{name}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  buttonBackground: {
    backgroundColor: 'blue',
    width: '100%',
    borderWidth: 1,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 23,
    margin: 10,
  },
})

export default NavigationButton;