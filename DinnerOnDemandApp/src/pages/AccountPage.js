import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

import PageTitle from '../components/PageTitle';
import Logo from '../components/Logo';
import AccountButton from '../components/AccountButton';

const AccountPage = ({navigation}) =>
{
    return(
      <View style = {styles.container}>
        <View style={styles.logoOrientation}>
          <Logo />
        </View>
        <View style = {styles.buttonOrientation}>
          <AccountButton
          navigate = {navigation.navigate}
          destination = 'LoginPage'
          name = 'Login'
          />
        </View>
        <View style = {styles.buttonOrientation}>
          <AccountButton
          navigate = {navigation.navigate}
          destination = 'RegisterPage'
          name = 'Register'
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