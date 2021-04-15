import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

import PageTitle from '../components/PageTitle';
import NavigationBar from '../components/NavigationBar';
import RecipeCard from '../components/RecipeCard';
import { Button, Layout, Text } from '@ui-kitten/components';
import axios from 'axios';

const RecipeListPage = ({ navigation }) =>
{
  useEffect(() =>
  {
    axios.get(``)
    .then(res =>
    {
      
    })
    .catch(console.log)
  }, []);

  return (
    <Layout style={styles.container}>
      <View style={styles.header}>
        <PageTitle text='Your Recipes' />
      </View>
      <ScrollView style={{height: "95%"}}>
        <View style={styles.body}>
          <View style={styles.cards}>
            <RecipeCard />
          </View>
          <Button
            onPress={() => { navigation.navigate('CreatePage') }}
            
          >
            <Text>+ Add Custom Recipe</Text>
          </Button>
        </View>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    width: '100%',
  },
  body: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    marginBottom: 50
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