import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, ScrollView, Linking, Share, TextInput } from 'react-native';
import PageTitle from '../components/PageTitle';
import NavigationBar from '../components/NavigationBar';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { Layout, Text } from '@ui-kitten/components';
import { ThemeContext } from '../components/theme-context';

const APIKEY = '7bfd691826fd4d31834f7728f67c9b3e';

const RecipePage = ({ navigation, route: { params: { item, custom, favoriteItem } } }) => {
  const themeContext = React.useContext(ThemeContext);

  const [instructions, setInstructions] = useState([]);
  const ingredients = favoriteItem ? [...item.ingredients] 
    : item !== undefined ? item.usedIngredients !== undefined 
    ? [...item.usedIngredients, ...item.missedIngredients] : [...item.Ingredients] : null
  let newIngredientObj = []
  let steps = []

  const storage = require('../tokenStorage.js');
  var userID = '';
  var tok = storage.retrieveToken();

  if (tok != null) {
    var ud = jwtDecode(tok);
    userID = ud.userId;
  }

  useEffect(() => {
    if (!favoriteItem && !custom && item !== undefined && item.usedIngredients !== undefined)
    {
      axios.get(`https://api.spoonacular.com/recipes/${item.id}/analyzedInstructions?apiKey=${APIKEY}`)
        .then(res => {
          setInstructions(res.data)
        })
    }
    else if (favoriteItem)
    {
      setInstructions([item.instructions])
    }
    else if (item !== undefined || custom)
    {
      setInstructions([...item.Instructions])
    }
  }, []);

  const app_name = 'cop4331din';

  const buildPath = (route) => {
    if (process.env.NODE_ENV === 'production') {
      return 'https://' + app_name + '.herokuapp.com/' + route;
    }
    else {
      return 'http://10.0.2.2:5000/' + route;
    }
  };

  const favorite = async () => {
    var js = JSON.stringify({ UserID: userID, RecipeID: item.id, Title: item.title });

    try {
      const response = await fetch(buildPath('api/addrecipe'),
        {
          method: 'POST',
          body: js,
          headers:
          {
            'Content-Type': 'application/json'
          }
        });

      var res = JSON.parse(await response.text());

      if (res.Added) {
        // Let the user know it has been added to favorites
        alert("Recipe has been added to Favorites!")
      }
      else {
        // Let them know an error occured
        alert("Error or recipe added already")
      }
    }
    catch (e) {
      alert(e.toString());
      // return;
    }
  }

  const unFavorite = async () =>
  {
    var js = JSON.stringify({ UserID: userID, RecipeID: item.RecipeID, Title: item.title});

    try {
      const response = await fetch(buildPath('api/removerecipe'),
        {
          method: 'POST',
          body: js,
          headers:
          {
            'Content-Type': 'application/json'
          }
        });

      var res = JSON.parse(await response.text());

      console.log(res);

      if (res.removed) {
        // Let the user know it has been added to favorites
        alert("Recipe Removed")
        navigation.pop();
      }
      else {
        // Let them know an error occured
        alert(res.error)
      }
    }
    catch (e)
    {
      alert(e.toString());
      // return;
    }
  }

  const tweetNow = () => {
    let twitterParameters = [];

    twitterParameters.push('text=' + encodeURI(`Recipe ${item.title}`));

    const url = 'https://twitter.com/intent/tweet?' + twitterParameters.join('&');

    Linking.openURL(url)
      .then((data) => {
        // alert('Twitter Opened');
      })
      .catch(() => {
        // alert('Something went wrong');
      });
  };

  return (
    <>
      <View style={styles.container}>
        {/* {console.log(ingredients)} */}
        <View style={styles.header}>
          <PageTitle text={custom ? item.Title : item.title} back navigate={navigation} />
        </View>
        <Layout style={styles.body}>
          <ScrollView contentContainerStyle={{ alignItems: 'center', paddingBottom: 100 }} style={{ flex: 1 }}>
            <Image
              style={[styles.image, {
                backgroundColor: "#ABDDDC", padding: 10, borderColor: "red",
                borderWidth: 1, borderRadius: 5,
              }]}
              source={{ uri: custom ? item.Image : item.image }}
            />
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              {/* Add/Remove from Recipes */}
              <TouchableOpacity onPress={() => custom || favoriteItem ? null : favorite()} style={{ alignItems: "center", display: custom || favoriteItem ? "none" : null }}>
                <Image style={{ width: 30, height: 30, marginBottom: 5, tintColor: themeContext.theme === "light" ? "black" : "white" }} source={require('../components/heart-492.png')} />
                <Text>Add</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => favoriteItem ? unFavorite() : null} style={{ alignItems: "center", display: favoriteItem ? null : "none", marginHorizontal: custom || favoriteItem ? 0 : 50, }}>
                <Image style={{ width: 30, height: 30, marginBottom: 5, tintColor: themeContext.theme === "light" ? "black" : "white" }} source={require('../components/brokenHeart.png')} />
                <Text>Remove</Text>
              </TouchableOpacity>
              {/* Share */}
              <TouchableOpacity onPress={() => tweetNow()} style={{ alignItems: "center", marginLeft: 50 }}>
                <Image style={{ width: 30, height: 30, marginBottom: 5, tintColor: themeContext.theme === "light" ? "black" : "white" }} source={require('../components/share.png')} />
                <Text>Share</Text>
              </TouchableOpacity>
            </View>
            {/* Ingredients */}
            <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>Ingredients</Text>
            <View>
              {
                ingredients.map((ingredient, index) => {
                  if (custom !== true)
                    newIngredientObj.push({ image: ingredient.image, originalString: ingredient.originalString, amount: ingredient.amount });

                  return (
                    <View key={index} style={{
                      backgroundColor: "#ABDDDC", padding: 10, borderColor: "red",
                      borderWidth: 1, borderRadius: 5, marginBottom: 5, flexDirection: "row",
                    }}
                    >
                      <Image
                        style={{ width: 50, height: 50 }}
                        source={ !custom && ingredient.image !== undefined ? { uri: ingredient.image } : require("../components/Logo.png")}
                      />
                      <View style={{ flexDirection: "column", marginStart: 5, width: "80%", }}>
                        <Text style={{color: "black"}}>
                          Ingredient: {custom ? ingredient : ingredient.originalString}
                        </Text>
                        <Text style={{color: "black"}}>
                          Amount: {custom ? "N/A" : ingredient.amount}
                        </Text>
                      </View>
                    </View>
                  )
                })
              }
            </View>

            {/* Instructions */}
            <Text style={{ fontSize: 20, fontWeight: "bold", marginVertical: 10 }}>Instructions</Text>
            <View style={{
              backgroundColor: "#ABDDDC", padding: 10, borderColor: "red",
              borderWidth: 1, borderRadius: 5, marginBottom: 5,
              width: "95%"
            }}
            >
              {
                instructions.length > 0 ?
                  favoriteItem ?
                    <Text style={{ color: "black" }}>{instructions[0]}</Text>
                  :
                    custom ?
                      instructions.map((desc, index) => {
                        return (
                          <Text key={index} style={{ marginBottom: 5, color: "black" }}>
                            {`${index + 1}. ${desc}`}
                          </Text>
                        )
                      })
                      :
                      instructions[0].steps.map((desc, index) => {
                        steps.push({ step: desc.step });
                        return (
                          <Text key={index} style={{ marginBottom: 5, color: "black" }}>
                            {`${index + 1}. ${desc.step}`}
                          </Text>
                        )
                      })
                  :
                  <Text>No Instructions</Text>
              }
            </View>
          </ScrollView>
        </Layout>
      </View>
    </>
  );
};

const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
    },
    header: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
    },
    body: {
      flex: 11,
      alignItems: 'center',
      width: '100%',
      height: '95%',
    },
    image: {
      margin: 20,
      width: 312,
      height: 231,
    },
    button: {
      marginTop: 20,
      width: '85%',
    },
  });

export default RecipePage;