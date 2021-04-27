import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import PageTitle from '../components/PageTitle';
import NavigationButton from '../components/NavigationButton';
import jwt_decode from 'jwt-decode';

const ChangePasswordPage = ({ navigation }) => {
  const storage = require('../tokenStorage');
  const [message, setMessage] = useState('');
  const [oPassword, onChangeOPassword] = useState('');
  const [password, onChangePassword] = useState('');
  const [cPassword, onChangeCPassword] = useState('');
  const app_name = 'cop4331din';
  function buildPath(route) {
    if (process.env.NODE_ENV === 'production') {
      return 'https://' + app_name + '.herokuapp.com/' + route;
    }
    else {
      return 'http://10.0.2.2:5000/' + route;
    }
  };
  const doSave = async event => {
    var valid = isValid()
    if (valid != '') {
      setMessage(valid);
      return;
    }
    if (password != cPassword) {
      setMessage('Passwords do not match');
      return
    }
    event.preventDefault();
    var ud = await jwt_decode(await storage.retrieveToken());
    var obj = { OldPassword: oPassword, Password: password, _id: ud.userId };
    var js = JSON.stringify(obj);
    try {
      const response = await fetch(buildPath('api/update'), { method: 'post', body: js, headers: { 'Content-Type': 'application/json' } });
      var res = JSON.parse(await response.text());
      if (res.accessToken) {
        alert("Password successfully updated")
        navigation.navigate('NavigationBar');
      }
      else {
        alert(res);
      }
    }
    catch (e) {
      alert(e.toString());
    }
  };
  const isValid = () => {
    var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]){8,}/
    if (passwordRegex.test(password) == true) {
      return '';
    }
    return "Passwords must contain at least 8 characters and one of each of the following:\n-A lowercase letter\n-An uppercase letter\n-A number\n-A special character";
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <PageTitle
          text='Change your password'
          back={1}
          navigate={navigation}
        />
      </View>
      <View style={styles.body}>
        <Layout style={styles.background}>
          <Text style={styles.inputTitle}> Current password</Text>
          <TextInput
            style={styles.input}
            placeholder="Please enter your current password"
            onChangeText={onChangeOPassword}
            secureTextEntry={true}
          />
          <Text style={styles.inputTitle}> New password</Text>
          <TextInput
            style={styles.input}
            placeholder="Please enter your new password"
            onChangeText={onChangePassword}
            secureTextEntry={true}
          />
          <Text style={styles.inputTitle}> Confirm new password</Text>
          <TextInput
            style={[styles.input, { marginBottom: 30 }]}
            placeholder="Please confirm your new password"
            onChangeText={onChangeCPassword}
            secureTextEntry={true}
          />
          <NavigationButton
            name="Save"
            doFunction={doSave}
          />
          <Text style={{ color: 'red', marginTop: 20 }}>{message}</Text>
        </Layout>
      </View>
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
    width: '85%',
    justifyContent: 'center'
  },
  background: {
    height: '60%',
    borderRadius: 20,
    paddingHorizontal: 20,
  },
  inputTitle: {
    marginTop: 20,
  },
  input: {
    color: 'white',
    borderColor: 'grey',
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 2.5,
    backgroundColor: 'black',
    fontSize: 18
  },
});

export default ChangePasswordPage;