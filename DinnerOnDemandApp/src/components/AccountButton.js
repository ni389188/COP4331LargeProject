import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

function AccountButton(props)
{
  return(
    <View style = {styles.container}>
      <TouchableOpacity 
        style = {styles.buttonBackground}
        onPress = {() =>
        {props.navigate(props.destination)}}
        >
        <Text style = {styles.buttonText}>{props.name}</Text>
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
    borderRadius: 25,
    width: '100%',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 23,
    margin: 10,
  },
})

export default AccountButton;