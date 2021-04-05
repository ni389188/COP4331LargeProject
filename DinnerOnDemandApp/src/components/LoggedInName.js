import React from 'react';
import {View, Text} from 'react-native';
import jwt_decode from 'jwt-decode';

function LoggedInName()
{
  const storage = require('../tokenStorage.js');  
  var tok = storage.retrieveToken();
  var firstName = '';
  var lastName = ''
  if(tok != null)
  {
    var ud = jwt_decode(tok);
    firstName = ud.firstName;
    lastName = ud.lastName; 
  }
  console.log(ud);
  return(
   <View style = {{flex:1, alignItems: 'center', width: '100%'}}>
    <Text style = {{fontSize:23}}>{firstName} {lastName}</Text>
   </View>
  );
};

export default LoggedInName;