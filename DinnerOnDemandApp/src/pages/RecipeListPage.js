import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import jwt_decode from 'jwt-decode';

import PageTitle from '../components/PageTitle';
import NavigationBar from '../components/NavigationBar';
import RecipeCard from '../components/RecipeCard';
import { Button, Layout, Text } from '@ui-kitten/components';
import axios from 'axios';

const RecipeListPage = ({ navigation }) => {
  const [refresh, setRefresh] = useState(false);
  const [results, setResults] = useState([]);
  const storage = require('../tokenStorage.js');
  var userID = '';

  useEffect(() => {
    getCustom();
  }, [])

  const app_name = 'cop4331din';

  const buildPath = (route) => {
    if (process.env.NODE_ENV === 'production') {
      return 'https://' + app_name + '.herokuapp.com/' + route;
    }
    else {
      return 'http://10.0.2.2:5000/' + route;
    }
  };

  const getCustom = async () => {
    var tok = storage.retrieveToken();

    if (tok != null)
    {
      var ud = jwt_decode(tok);
      userID = ud.userId;
    }

    // call api/getcustomrecipes
    // Takes in userID
    var js = JSON.stringify({ UserID: userID });

    try {
      const response = await fetch(buildPath('api/getcustomrecipes'),
        {
          method: 'POST',
          body: js,
          headers:
          {
            'Content-Type': 'application/json'
          }
        });

      var res = JSON.parse(await response.text());

      if (res.found) {
        setResults(res.recipes)
      }
      else
      {
// 
      }

      setRefresh(false);
    }
    catch (e) {
      console.log(e.toString());
    }
  }

  return (
    <Layout style={styles.container}>
      <FlatList
        contentContainerStyle={styles.body}
        data={results}
        keyExtractor={(item, index) => index.toString()}
        numColumns={1}
        onRefresh={() => setRefresh(true) & getCustom()}
        refreshing={refresh}
        renderItem={({ item }) => <RecipeCard item={item} custom={true}/>}
        ListHeaderComponent={
          <View style={[styles.body, { marginVertical: 20 }]}>
            <Button onPress={() => { navigation.navigate('CreatePage') }}>
              <Text>+ Add Custom Recipe</Text>
            </Button>
            <Text>Pull down to refresh list</Text>
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