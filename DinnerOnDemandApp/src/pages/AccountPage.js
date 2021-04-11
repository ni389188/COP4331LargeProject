import React, {useEffect} from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';

import PageTitle from '../components/PageTitle';
import NavigationButton from '../components/NavigationButton';

const AccountPage = ({navigation}) =>
{
  const storage = require('../tokenStorage');
  useEffect(() =>
  {
    if(storage.retrieveToken('user_data') != null)
    {
      navigation.navigate('NavigationBar');
    }
  });
  return(
    <View style = {styles.container}>
      <View style={styles.logoOrientation}>
        <Image
        style={styles.logo}
        source={require('../components/Logo.png')}
        />
      </View>
      <View style = {styles.buttonOrientation}>
        <NavigationButton
        name = 'Login'
        doFunction = {() => navigation.navigate('LoginPage')}
        />
      </View>
      <View style = {styles.buttonOrientation}>
        <NavigationButton
        name = 'Register'
        doFunction = {() => navigation.navigate('RegisterPage')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ABDDDC',
  },
  logo: {
      height: 200,
      width: 200,
  },
  logoOrientation: {
    paddingTop: 125,
    paddingBottom: 50,
  },
  buttonOrientation: {
    width: '85%',
    marginTop: 50,
  },
})

export default AccountPage;
