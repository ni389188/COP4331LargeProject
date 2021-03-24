import React from 'react';
import { View, StyleSheet } from 'react-native';

import PageTitle from '../components/PageTitle';
import NavigationBar from '../components/NavigationBar';

const RecipeListPage = ({navigation}) =>
{
    return(
      <View style = {styles.container}>
        <View style = {styles.header}>
          <PageTitle text = 'Your Recipes' />
        </View>
        <View style = {styles.body}>
          
        </View>
        <View style = {styles.footer}>
          <NavigationBar />
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flex: 1,
    width: '100%',
  },
  body: {
    flex: 11,
  },
  footer: {
    flex: 1.5,
    width: '100%',
  },
});

export default RecipeListPage;