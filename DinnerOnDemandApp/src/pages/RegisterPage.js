import React, {useState} from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from "react-redux";
import SaveUser from "../redux/Actions/SaveUser";

import PageTitle from '../components/PageTitle';
import NavigationButton from '../components/NavigationButton';

const RegisterPage = ({navigation, mapDispatchToProps, user}) =>
{
  const [firstName, onChangeFirstName] = useState(''); 
  const [lastName, onChangeLastName] = useState(''); 
  const [email, onChangeEmail] = useState(''); 
  const [password, onChangePassword] = useState(''); 
  const [cPassword, onChangeCPassword] = useState(''); 
  const storage = require('../tokenStorage');

  const saveToRedux = () =>
  {
    mapDispatchToProps({name: "Carl", email: "carlantoine14@gmail.com", favorites: []})
  }

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

  const doRegister = async event =>     
  {
    event.preventDefault();
    var valid = isValid()
    if(valid != '')
    {
      alert(valid);
      return;
    }
    if(password != cPassword)
    {
      alert('Passwords do not match');
      return;
    }    
    var obj = {FirstName:firstName, LastName:lastName, Email:email, Password:password};
    var js = JSON.stringify(obj);
    try        
    {                
      const response = await fetch(buildPath('api/register'), {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
      var res = JSON.parse(await response.text());
      if( res.accessToken )            
      {                
        storage.storeToken(res);
        navigation.push('NavigationBar');   
      }            
      else
      {                
        alert("Email is already in use.");         
      }        
    }        
    catch(e)        
    {            
        alert(e.toString());            
        return;        
    }        
  };

  const isValid = () =>
  {
    var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]){8,}/
    if(emailRegex.test(email) == true)
    {
      if(passwordRegex.test(password) == true)
      {
        return '';
      }
      return "Passwords must contain at least 8 characters and one of each of the following:\n-A lowercase letter\n-An uppercase letter\n-A number\n-A special character";
    }
    return "Please enter a valid email";
  }

  return(
    <View style = {styles.container}>
      <View style = {styles.header}>
        <PageTitle text = "Dinner on Demand" />
      </View>
      <View style = {styles.body}>
        <View style = {styles.background}>
          <Text style = {styles.loginTitle}>Register{"\n"}</Text>
          <Text style = {styles.inputTitle}> First Name</Text>
          <TextInput 
          style = {styles.input} 
          placeholder="Please enter your first name" 
          onChangeText = {onChangeFirstName}
          />
          <Text style = {styles.inputTitle}> Last Name</Text>
          <TextInput 
          style = {styles.input} 
          placeholder="Please enter your last name" 
          onChangeText = {onChangeLastName}
          />
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
          <Text style = {styles.inputTitle}> Confirm Password</Text>
          <TextInput 
          style = {styles.input} 
          placeholder="Please confirm password" 
          onChangeText = {onChangeCPassword}
          secureTextEntry = {true}
          />
          <TouchableOpacity 
          style = {styles.buttonBackground}
          onPress = {doRegister}
          >
            <Text style = {styles.buttonText}>Create Account</Text>
          </TouchableOpacity>
          <View style = {styles.loginText}>
            <Text style = {{color: 'black'}}>Already have an account?</Text>
            <TouchableOpacity onPress = {() => navigation.navigate('LoginPage')}>
              <Text style = {styles.signUpText}>{"\t"}Sign In</Text>
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
    fontSize: 30,
  },
  inputTitle:{
    color: 'black',
    marginTop: 5,
  },
  input: {
    color: 'black',
    borderColor: 'grey',
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 2.5,
  },
  signUpText: {
    color: 'blue',
  },
  buttonBackground: {
    backgroundColor: 'blue',
    width: '100%',
    borderWidth: 1,
    marginTop: 20,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 23,
    margin: 10,
  },
  loginText: {
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

export default connect(mapStateToProps, { mapDispatchToProps })(RegisterPage);