import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

import PageTitle from '../components/PageTitle';
import NavigationBar from '../components/NavigationBar';
import NavigationButton from '../components/NavigationButton';

const RecipePage = ({navigation}) =>
{
    return(
      <View style = {styles.container}>
        <View style = {styles.header}>
          <PageTitle text = 'Recipe Name Here' />
        </View>
        <View style = {styles.body}>
          <Image
          style={styles.image}
          source={require('../components/Logo.png')}
          />
          <View style = {styles.button}>
            <NavigationButton
            name = 'Ingredients'
            destination = 'IngredientsPage'
          />
          </View>
          <View style = {styles.button}>
            <NavigationButton
            name = 'Instructions'
            destination = 'InstructionsPage'
          />
          </View>
          <View style = {styles.button}>
            <NavigationButton
            name = 'Add to Shopping List'
            destination = 'RecipePage'
          />
          </View>
          <View style = {styles.button}>
            <NavigationButton
            name = 'Add/Remove from Recipes'
            destination = 'RecipePage'
          />
          </View>
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
  image: {
    marginTop: 50,
    marginBottom: 30,
    height: 150,
    width: 150,
  },
  button: {
    marginTop: 20,
    width: '85%',
  },
});

export default RecipePage;