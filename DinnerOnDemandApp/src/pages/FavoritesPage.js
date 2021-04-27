import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import RecipeCard from '../components/RecipeCard';
import { Button, Card, Layout, Modal, Text } from '@ui-kitten/components';
import jwtDecode from 'jwt-decode';

const FavoritesPage = ({ navigation }) => {
  const [refresh, setRefresh] = useState(false);
  const [results, setResults] = useState([])
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState("");

  const storage = require('../tokenStorage.js');
  var userID = '';

  useEffect(() => {
    getRecipes();
  }, [])

  function buildPath(route) {
    if (process.env.NODE_ENV === 'production')
      return 'https://' + app_name + '.herokuapp.com/' + route;
    else
      return 'http://10.0.2.2:5000/' + route;
  };

  const getRecipes = async () => {
    var tok = storage.retrieveToken();

    setResults([])

    if (tok != null) {
      var ud = jwtDecode(tok);
      userID = ud.userId;
    }

    var js = JSON.stringify({ UserID: userID });

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

      if (res.found) {
        setResults(res.recipes)
      }

      setRefresh(false);
    }
    catch (e) {
      setError(e);
      setVisible(true);
    }
  }

  return (
    <Layout style={styles.container}>
      <FlatList
        data={results}
        renderItem={({ item }) => <RecipeCard item={item} favorite={true} />}
        keyExtractor={(item, index) => index.toString()}
        numColumns={1}
        contentContainerStyle={{ paddingVertical: 20 }}
        onRefresh={() => setRefresh(true) & getRecipes()}
        refreshing={refresh}
        ListHeaderComponent={
          results.length === 0 ?
            <Text style={{ width: "85%", textAlign: "center", fontSize: 20, fontWeight: "bold" }}>
              You don't have any favorite recipes, go the Search tab and look some up!
            </Text>
          :
            <Text style={{ marginVertical: 20 }}>Pull down to refresh list</Text>
        }
        ListHeaderComponentStyle={{alignItems: "center"}}
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

export default FavoritesPage;