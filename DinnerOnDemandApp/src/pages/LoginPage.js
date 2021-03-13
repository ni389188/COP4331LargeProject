import React from 'react';
import { View } from 'react-native'

import PageTitle from '../components/PageTitle';
import Login from '../components/Login';

const LoginPage = ({navigation}) =>
{
    return(
      <View>
        <View>
          <PageTitle />
        </View>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Login navigation={navigation}/>
        </View>
      </View>
    );
};

export default LoginPage;