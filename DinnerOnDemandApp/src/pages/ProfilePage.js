import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

import PageTitle from '../components/PageTitle';
import NavigationBar from '../components/NavigationBar';
import NavigationButton from '../components/NavigationButton';
import LoggedInName from '../components/LoggedInName';

const ProfilePage = ({navigation}) =>
{
  const storage = require('../tokenStorage');
  const doLogout = async event =>     
  {
    if(storage.retrieveToken('user_data') != null)
    {
      storage.removeToken('user_data');
    }
    navigation.navigate('AccountPage');
  };
  return(
    <View style = {styles.container}>
      <View style = {styles.header}>
        <PageTitle text = 'Your Profile' />
      </View>
      <View style = {styles.body}>
        <View style = {styles.imageSection}>
          <Image
          style={styles.image}
          source={require('../components/Logo.png')}
          />
        </View>
        <View style = {styles.textSection}>
          <LoggedInName />
        </View>
        <View style = {styles.button}>
          <NavigationButton
          name = 'Edit Profile'
          doFunction = {() => navigation.navigate('SettingsPage')}
          />
        </View>
        <View style = {styles.button}>
          <NavigationButton
          name = 'Log Out'
          doFunction = {doLogout}
          />
        </View>
      </View>
      {/* <View style = {styles.footer}>
        <NavigationBar />
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ABDDDC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flex: 1,
    width: '100%',
  },
  body: {
    flex: 11,
    alignItems: 'center',
    width: '100%',
  },
  footer: {
    flex: 1.5,
    width: '100%',
  },
  background: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 50,
    height: 150,
    width: 300,
  },
  imageSection: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 150,
      width: 150,
      marginTop: 50,
  },
  textSection: {
      justifyContent: 'center',
      alignItems: 'flex-start',
      height: 150,
      width: 150,
      marginTop: 20,
  },
  image: {
      height: 150,
      width: 150,
  },
  buttonText: {
    fontSize: 23,
    margin: 10,
  },
  button: {
    width: '85%',
    marginTop: 20,
  },
});

export default ProfilePage;