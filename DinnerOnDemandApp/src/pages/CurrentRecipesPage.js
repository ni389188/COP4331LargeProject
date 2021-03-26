import React from 'react';
import { View, StyleSheet } from 'react-native';

import PageTitle from '../components/PageTitle';
import NavigationBar from '../components/NavigationBar';
import NavigationButton from '../components/NavigationButton';
import RecipeCard from '../components/RecipeCard';
import Counter from '../components/Counter';

const CurrentRecipesPage = ({navigation}) =>
{
    return(
      <View style = {styles.container}>
        <View style = {styles.header}>
          <PageTitle text = 'Recipes in Shopping List' />
        </View>
        <View style = {styles.body}>
          <View style = {styles.background}>
            <View style = {styles.counterSection}>
              <Counter 
              number = {5}
              direction = 'column'
              />
            </View>
            <View style = {styles.cardSection}>
              <RecipeCard />
            </View>
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
  button: {
    marginTop: 20,
    width: '85%',
  },
  background: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  counterSection: {
    flex: 1,
  },
  cardSection: {
    flex: 5,
  },
});

export default CurrentRecipesPage;