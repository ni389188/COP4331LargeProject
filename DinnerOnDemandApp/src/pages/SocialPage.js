import React from 'react';
import { View, StyleSheet } from 'react-native';

import AccountButton from '../components/AccountButton';
{/*Delete this import when working on page*/}

const SocialPage = ({navigation}) =>
{
    return(
      <View style = {styles.container}>
        <AccountButton
          navigate = {navigation.navigate}
          destination = 'AccountPage'
          name = 'Todo'
        />
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignContent: 'center',
  },
});

export default SocialPage;