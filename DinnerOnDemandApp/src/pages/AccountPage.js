import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';

import PageTitle from '../components/PageTitle';
import AccountButton from '../components/AccountButton';

const AccountPage = ({navigation}) =>
{
    return(
      <View style = {styles.container}>
        <View style={styles.logoOrientation}>
          <Image
          style={styles.logo}
          source={require('../components/Logo.png')}
          />
        </View>
        <View style = {styles.buttonOrientation}>
          <AccountButton
          name = 'Login'
          destination = 'LoginPage'
          />
        </View>
        <View style = {styles.buttonOrientation}>
          <AccountButton
          name = 'Register'
          destination = 'RegisterPage'
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