import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';

import PageTitle from '../components/PageTitle';
import NavigationBar from '../components/NavigationBar';
import NavigationButton from '../components/NavigationButton';
import LoggedInName from '../components/LoggedInName';
import ProfileImage from '../components/ProfileImage';


import { Layout, Toggle, Text, Modal, Card, Button } from '@ui-kitten/components';
import { ThemeContext } from '../components/theme-context';

// 🌜
// 🌞

const ProfilePage = ({ navigation }) => {
  const themeContext = React.useContext(ThemeContext);
  const storage = require('../tokenStorage.js');

  const [visible, setVisible] = useState(false);

  const doLogout = async event => {
    if (storage.retrieveToken('user_data') != null) {
      storage.removeToken('user_data');
    }
    navigation.navigate('AccountPage');
  };
  return (
    <View style={styles.container}>
      <Layout style={styles.body}>
        <Toggle style={{ position: "absolute", alignSelf: "flex-end", top: 10 }} checked={themeContext.theme === "light" ? false : true}
          onChange={() => themeContext.toggleTheme()}
        >
          {<Text style={{ fontSize: 20 }}>{themeContext.theme === "light" ? "🌞" : "🌜"}</Text>}
        </Toggle>
        <View style={styles.imageSection}>
          <ProfileImage/>
        </View>
        <View style={styles.textSection}>
          <Text style={{ fontSize: 23 }}>Welcome,</Text>
          <LoggedInName
            size='full'
            font={23}
            align='center'
          />
        </View>
        <View style={styles.button}>
          <NavigationButton
            name='Edit Profile'
            doFunction={() => navigation.push('SettingsPage')}
          />
        </View>
        <View style={styles.button}>
          <NavigationButton
            name='Change Password'
            doFunction={() => navigation.navigate('ChangePasswordPage')}
          />
        </View>
        <View style={styles.button}>
          <NavigationButton
            name='Log Out'
            doFunction={() => setVisible(true)}
          />
          <Modal
            visible={visible}
            backdropStyle={styles.backdrop}
            onBackdropPress={() => setVisible(false)}>
            <Card disabled={true}>
              <Text>Are you sure you want to log out?</Text>
              <Button onPress={() => doLogout()} status='danger' style={{marginVertical: 10}}>YES</Button>

              <Button onPress={() => setVisible(false)}>NO</Button>
            </Card>
          </Modal>
        </View>
      </Layout>
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
    width: '90%',
    borderRadius: 20,
    marginVertical: 20,
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
    marginTop: 20,
  },
  textSection: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '15%',
    width: '85%',
    marginTop: 30,
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
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default ProfilePage;