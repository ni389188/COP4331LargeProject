import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

import PageTitle from '../components/PageTitle';
import NavigationBar from '../components/NavigationBar';
import RecipeCard from '../components/RecipeCard';

const RecipeListPage = ({navigation}) =>
{
    return(
      <View style = {styles.container}>
        <View style = {styles.header}>
          <PageTitle text = 'Your Recipes' />
        </View>
        <View style = {styles.body}>
          <View style = {styles.cards}>
            <RecipeCard />
          </View>
          <TouchableOpacity 
          style = {styles.createBackground}
          onPress = {() =>
          {navigation.navigate('CreatePage')}}
          >
            <Text style = {styles.createText}>+ Add Custom Recipe</Text>
          </TouchableOpacity>
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
    alignItems: 'center',
    width: '100%',
  },
  footer: {
    flex: 1.5,
    width: '100%',
  },
  cards: {
    marginTop: 20,
  },
  createBackground: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
    borderWidth: 2,
    height: 150,
    width: 300,
    marginTop: 20,
  },
  createText: {
    fontSize: 23,
  },
});

export default RecipeListPage;