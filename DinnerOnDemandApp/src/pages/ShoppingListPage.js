import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import PageTitle from '../components/PageTitle';
import NavigationBar from '../components/NavigationBar';
import NavigationButton from '../components/NavigationButton';
import RecipeCard from '../components/RecipeCard';
import Counter from '../components/Counter';

const ShoppingListPage = ({navigation}) =>
{
    return(
      <View style = {styles.container}>
        <View style = {styles.header}>
          <PageTitle text = 'My Shopping List' />
        </View>
        <View style = {styles.body}>
          <View style = {styles.button}>
            <NavigationButton
            name = 'See Current Recipes'
            destination = 'CurrentRecipesPage'
            />
          </View>
          <View style = {styles.background}>
            <View style = {styles.counterSection}>
              <Counter 
              number = {5}
              direction = 'row'
              />
            </View>
            <View style = {styles.textSection}>
              <Text style = {styles.text}>Avocado</Text>
            </View>
          </View>
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
  button: {
    marginTop: 20,
    width: '85%',
  },
  background: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    width: '100%'
  },
  counterSection: {
    flex: 1,
  },
  textSection: {
    flex: 1,
  },
  cardSection: {
    flex: 5,
  },
  text: {
    fontSize: 23,
  },
});

export default ShoppingListPage;