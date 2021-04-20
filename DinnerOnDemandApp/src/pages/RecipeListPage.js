import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';

import PageTitle from '../components/PageTitle';
import NavigationBar from '../components/NavigationBar';
import RecipeCard from '../components/RecipeCard';
import { Button, Layout, Text } from '@ui-kitten/components';
import axios from 'axios';

const RecipeListPage = ({ navigation }) => 
{
  const [results, setResults] = useState([]);
  const [main, setMain] = useState({});

  useEffect(() => {
    // getFavorites();
  }, [])

  const app_name = 'cop4331din';

  const buildPath = (route) => {
    if (process.env.NODE_ENV === 'production') {
      return 'https://' + app_name + '.herokuapp.com/' + route;
    }
    else {
      return 'http://localhost:5000/' + route;
    }
  };

  const getFavorites = async () => {
    // call api/getrecipe
    // Takes in userID
    let userID = JSON.parse(localStorage.getItem('user_data')).id;

    var js = JSON.stringify({ userID: userID });

    try {
      const response = await fetch(buildPath('api/getrecipes'),
        {
          method: 'POST',
          body: js,
          headers:
          {
            'Content-Type': 'application/json'
          }
        });

      var res = JSON.parse(await response.text());

      if (res.found)
      {
        setMain(res.recipes[0])
        setResults(res.recipes)
      }
      // else

    }
    catch (e) {
      console.log(e.toString());
    }
  }

  return (
    <Layout style={styles.container}>
      <View style={styles.header}>
        <PageTitle text='Your Recipes' />
      </View>
      <FlatList
        contentContainerStyle={styles.body}
        data={results}
        keyExtractor={(item, index) => index.toString()}
        numColumns={1}
        renderItem={({ item }) => <RecipeCard item={item} />}
        ListHeaderComponent={
          <View style={[styles.body, { marginBottom: 20 }]}>
            <View style={styles.cards}>
              <RecipeCard item={main} random/>
            </View>
            <Button onPress={() => { navigation.navigate('CreatePage') }}>
              <Text>+ Add Custom Recipe</Text>
            </Button>
          </View>
        }
        ListFooterComponent={
          results.length === 0 ?
            <Text>No Recipes try adding some!</Text>
          :
            null
        }
      />
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
    marginVertical: 25
  },
  body: {
    alignItems: 'center',
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