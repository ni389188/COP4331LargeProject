import React from 'react';
import { View, StyleSheet } from 'react-native';

import NavigationButton from '../components/NavigationButton';
{/*Delete this import when working on page*/}

const ForgotPasswordPage = ({navigation}) =>
{
    return(
      <View style = {styles.container}>
        <NavigationButton
          name = 'Todo'
          doFunction = {() => navigation.navigate('AccountPage')}
        />
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignContent: 'center',
  },
});

export default ForgotPasswordPage;