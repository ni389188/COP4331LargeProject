import React, {useState} from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';

import PageTitle from '../components/PageTitle';
import NavigationButton from '../components/NavigationButton';

const ForgotPasswordPage = ({navigation}) =>
{
  const [email, onChangeEmail] = useState('');
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
  const doSearch = async event =>
  {
    console.log(email);
    var obj = {Email:email};
    var js = JSON.stringify(obj);
    try        
    {                
      const response = await fetch(buildPath('api/reset'), {method:'post',body:js,headers:{'Content-Type': 'application/json'}});
      var res = JSON.parse(await response.text());
      console.log(res);
      return;
      if(res)            
      {                
        console.log(res);
        navigation.goBack();   
      }            
      else
      {
        alert("This email address is not registered"); 
      }        
    }        
    catch(e)        
    {            
        alert(e.toString());                 
    }      
  }
  return(
    <View style = {styles.container}>
      <View style = {styles.header}>
        <PageTitle 
        text = "Dinner on Demand" 
        back = {1}
        navigate = {navigation}
        />
      </View>
      <View style = {styles.body}>
        <View style = {styles.background}>
          <Text style = {styles.loginTitle}>Forgot{"\n"}Password?</Text>
          <Text style = {styles.inputTitle}> Email</Text>
          <TextInput 
          style = {styles.input} 
          placeholder="Please enter email"
          onChangeText = {onChangeEmail}
          />
          <NavigationButton 
          name = 'Login'
          doFunction = {doSearch}
          />
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
    padding: 25,
    width: '85%',
    height: '90%',
  },
  loginTitle: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 40,
  },
  inputTitle:{
    color: 'black',
    marginTop: 30,
  },
  input: {
    color: 'black',
    borderColor: 'grey',
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 50,
  },
});

export default ForgotPasswordPage;