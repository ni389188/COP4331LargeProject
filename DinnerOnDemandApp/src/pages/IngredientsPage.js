import React from 'react';
import { View, StyleSheet } from 'react-native';

import AccountButton from '../components/AccountButton';
{/*Delete this import when working on page*/}

const IngredientsPage = ({navigation}) =>
{
    return(
      <View style = {styles.container}>
        <AccountButton
          name = 'Todo'
          destination = 'AccountPage'
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

export default IngredientsPage;