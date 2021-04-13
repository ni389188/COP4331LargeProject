import React, {useState} from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from "react-redux";
import SaveUser from "../redux/Actions/SaveUser";

import PageTitle from '../components/PageTitle';
import NavigationButton from '../components/NavigationButton';

const LoginPage = ({navigation, mapDispatchToProps, user}) =>
{
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const storage = require('../tokenStorage.js');

  const saveToRedux = () =>
  {
    mapDispatchToProps({name: "Carl", email: "carlantoine14@gmail.com", favorites: []})
  };

  const app_name = 'cop4331din';
  function buildPath(route)
  {    
    if (process.env.NODE_ENV === 'production')     
    {        
      return 'https://' + app_name +  '.herokuapp.com/' + route;
    }
    else
    {
      return 'http://10.0.2.2:5000/' + route;   
    }
  };

  const doLogin = async event =>     
  {
    event.preventDefault();        
    var obj = {Email:email,Password:password};
    var js = JSON.stringify(obj);
    try        
    {                
      const response = await fetch(buildPath('api/login'), {method:'post',body:js,headers:{'Content-Type': 'application/json'}});
      var res = JSON.parse(await response.text());
      if(res.LoggedIn)            
      {                
        storage.storeToken(res);
        navigation.navigate('NavigationBar');   
      }            
      else
      {                
         alert("Invalid email or password"); 
      }        
    }        
    catch(e)        
    {            
        alert(e.toString());            
        return;        
    }      
  };

  return(
    <View style = {styles.container}>
      <View style = {styles.header}>
        <PageTitle text = "Dinner on Demand" />
      </View>
      <View style = {styles.body}>
        <View style = {styles.background}>
          <Text style = {styles.loginTitle}>Sign In{"\n"}</Text>
          <Text style = {styles.inputTitle}> Email</Text>
          <TextInput 
          style = {styles.input} 
          placeholder="Please enter email"
          onChangeText = {onChangeEmail}
          />
          <Text style = {styles.inputTitle}> Password</Text>
          <TextInput 
          style = {styles.input} 
          placeholder="Please enter password" 
          onChangeText = {onChangePassword}
          secureTextEntry = {true}
          />
          <TouchableOpacity onPress = {() => navigation.navigate('ForgotPasswordPage')}>
            <Text style = {styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
          <NavigationButton 
          name = 'Login'
          doFunction = {doLogin}
          />
          <View style = {styles.registerText}>
            <Text style = {{color: 'black'}}>Don't have an account?</Text>
            <TouchableOpacity onPress = {() => navigation.navigate('RegisterPage')}>
              <Text style = {styles.signUpText}>{"\t"}Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  header: {
    flex: 1,
    width: '100%',
  },
  body: {
    flex: 11,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  background: {
    backgroundColor: '#ABDDDC',
    borderRadius: 10,
    justifyContent: 'center',
    padding: 25,
    width: '85%',
    height: '90%',
  },
  loginTitle: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 40,
  },
  inputTitle:{
    color: 'black',
    marginTop: 10,
  },
  input: {
    color: 'black',
    borderColor: 'grey',
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 2.5,
  },
  forgotPasswordText: {
    color: 'blue',
    textAlign: 'right',
    marginTop: 2.5,
    marginBottom: 20,
  },
  signUpText: {
    color: 'blue',
  },
  registerText: {
    flexDirection: 'row', 
    justifyContent: 'center',
    marginTop: 20,
  },
})

const mapStateToProps = ({UserReducer: { user }}) =>
{
  return {
    user
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    reduxSaveUser:(user) => dispatch(SaveUser(user))
  }
}

export default connect(mapStateToProps, { mapDispatchToProps })(LoginPage);