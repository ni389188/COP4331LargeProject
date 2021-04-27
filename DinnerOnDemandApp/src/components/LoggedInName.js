import React from 'react';
import {View} from 'react-native';
import jwt_decode from 'jwt-decode';
import { Layout, Toggle, Text } from '@ui-kitten/components';

function LoggedInName({size, font, align})
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
  if(size == 'first')
  {
    return(
      <View style = {{flex:1, alignItems:align, width: '100%', height:"100%"}}>
        <Text style = {{fontSize:font, color: 'black'}}>{firstName}</Text>
      </View>
    );
  }
  else if(size == 'last')
  {
    return(
      <View style = {{flex:1, alignItems:align, width: '100%', height:"100%"}}>
        <Text style = {{fontSize:font, color: 'black'}}>{lastName}</Text>
      </View>
    )
  }
  else
  {
    return(
      
      <View style = {{flex:1, alignItems:align, width: '100%', height:"100%"}}>
        <Text style = {{fontSize:font}}>{firstName} {lastName}</Text>
      </View>
    )
  }
};

export default LoggedInName;