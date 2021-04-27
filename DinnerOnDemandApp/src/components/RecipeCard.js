import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Card } from '@ui-kitten/components';
import { ThemeContext } from './theme-context';

function RecipeCard({ item, custom, favorite }) {
  const navigation = useNavigation();
  const themeContext = React.useContext(ThemeContext);
  const [results, setResults] = useState({})

  useEffect(() =>
  {
    if (favorite)
      getData();
  }, [])

  const header = () => 
  {
    return (
      <Text style={[styles.buttonText, {color: themeContext.theme === "light" ? "black" : "white"}]}>
        {item !== undefined ? item.Title ? item.Title : item.title : ""}
      </Text>
    )
  }

  function buildPath(route)
  {
    if (process.env.NODE_ENV === 'production')
      return 'https://' + app_name + '.herokuapp.com/' + route;
    else
      return 'http://10.0.2.2:5000/' + route;
  };

  const getData = async () =>
  {
    var js = JSON.stringify({ RecipeID: item.RecipeID });

    try {
      const response = await fetch(buildPath('api/getrecipedetails'),
      {
        method: 'POST',
        body: js,
        headers:
        {
          'Content-Type': 'application/json'
        }
      });

      var res = JSON.parse(await response.text());

      if (!res.found) {
        alert(res.error);
      }
      else {
        res.obj[0].RecipeID = item.RecipeID;
        setResults(res.obj[0])
      }
    }
    catch (e) {
      alert(e.toString());
    }
  }

  return (
    <Card header={header}
      style={{ margin: 2, width: "80%", alignSelf: "center", borderColor: "red", marginBottom: 15 }} 
      onPress={() => navigation.navigate('RecipePage', { item: favorite ? results : item, custom, favoriteItem: favorite })}
    >
      <Image
        style={styles.image}
        source={{ uri: favorite ? results.image : item !== undefined ? item.Image ? item.Image : item.image : null }}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  background: {
    backgroundColor: "#ABDDDC", padding: 10, borderColor: "red",
    borderWidth: 1, borderRadius: 5, marginBottom: 5,
    width: "80%", alignSelf: "center", justifyContent: 'center',
  },
  textSection: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: 150,
    width: 150,
  },
  image: {
    height: 173,
    width: 234,
    alignContent: "center",
    alignSelf: "center"
  },
  buttonText: {
    fontSize: 18,
    margin: 10,
    fontWeight: "bold",
    alignSelf: "center"
  },
})

export default RecipeCard;