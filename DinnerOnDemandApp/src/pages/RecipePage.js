import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, ScrollView, Linking, Share, TextInput } from 'react-native';

import PageTitle from '../components/PageTitle';
import NavigationBar from '../components/NavigationBar';
import axios from 'axios';

const app_name = 'cop4331din'
const APIKEY = '7bfd691826fd4d31834f7728f67c9b3e';

const RecipePage = ({ navigation, route : {params : {item}} }) =>
{
  const [instructions, setInstructions] = useState([]);
  const ingredients = item !== undefined ? item.usedIngredients !== undefined ? [...item.usedIngredients, ...item.missedIngredients] : [...item.ingredients] : null
  let newIngredientObj = []
  let steps = []

  useEffect(() =>
  {
    if (item !== undefined && item.usedIngredients !== undefined)
    {
      axios.get(`https://api.spoonacular.com/recipes/${item.id}/analyzedInstructions?apiKey=${APIKEY}`)
      .then(res =>
      {
        setInstructions(res.data)
      })
    }
    else if (item !== undefined)
    {
      setInstructions([...item.instructions])
    }
  }, []);

  const buildPath = (route) =>
  {    
      if (process.env.NODE_ENV === 'production')     
      {        
          return 'https://' + app_name +  '.herokuapp.com/' + route;
      }    
      else    
      {                
          return 'http://localhost:5000/' + route;    
      }
  }

  const addToShop = () =>
  {
    let obj =
    {
      title : item.title,
      image: item.image,
      ingredients : newIngredientObj,
      instructions : { steps: steps }
    }

    axios.post(buildPath(""), JSON.stringify(obj))
    .then(res =>
    {
      
    })
    .catch(res => alert(res));
  }

  const favorite = () =>
  {
    let obj =
    {
      title : item.title,
      image: item.image,
      ingredients : newIngredientObj,
      instructions : { steps: steps }
    }

    axios.post(buildPath(""), JSON.stringify(obj))
    .then(res =>
    {
      
    })
    .catch(res => alert(res));
  }

  const share = () =>
  {

  }

  const tweetNow = () =>
  {
    let twitterParameters = [];

    twitterParameters.push('text=' + encodeURI(`Recipe ${item.title}`));

    const url = 'https://twitter.com/intent/tweet?' + twitterParameters.join('&');

    Linking.openURL(url)
    .then((data) =>
    {
      // alert('Twitter Opened');
    })
    .catch(() =>
    {
      // alert('Something went wrong');
    });
  };

  return (
    <>
      <View style={styles.container}>
        {/* {console.log(ingredients)} */}
        <View style={styles.header}>
          <PageTitle text={item.title} back navigate={navigation}/>
        </View>
        <View style={styles.body}>
          <ScrollView contentContainerStyle = {{alignItems: 'center', paddingBottom: 50}} style = {{flex: 1}}>
            <Image
              style={[styles.image, {backgroundColor: "#ABDDDC", padding: 10, borderColor: "red",
              borderWidth: 1, borderRadius: 5,}]}
              source={{uri: item.image}}
            />
            <View style={{flexDirection: "row", marginTop: 10}}>
              {/* Add/Remove from Recipes */}
              <TouchableOpacity onPress={() => null} style={{alignItems: "center"}}>
                <Image style={{width: 30, height: 30, marginBottom: 5}} source={require('../components/unlike.png')} />
                <Text>Add Recipe</Text>
              </TouchableOpacity>
              {/* Add to Shopping List */}
              <TouchableOpacity style={{marginHorizontal: 50, alignItems: "center"}} onPress={() => null}>
                <Image style={{width: 30, height: 30, marginBottom: 5}} source={require('../components/plus.png')} />
                <Text>Add to Cart</Text>
              </TouchableOpacity>
              {/* Share */}
              <TouchableOpacity onPress={() => tweetNow()} style={{alignItems: "center"}}>
                <Image style={{width: 30, height: 30, marginBottom: 5}} source={require('../components/share.png')} />
                <Text>Share</Text>
              </TouchableOpacity>
            </View>
            {/* Ingredients */}
            <Text style={{fontSize: 20, fontWeight: "bold"}}>Ingredients</Text>
            <View>
              {
                ingredients.map((ingredient, index) =>
                {
                  newIngredientObj.push({image: ingredient.image, originalString: ingredient.originalString, amount: ingredient.amount});
                  return (
                    <View key={index} style={{
                        backgroundColor: "#ABDDDC", padding: 10, borderColor: "red",
                        borderWidth: 1, borderRadius: 5, marginBottom: 5, flexDirection: "row",
                      }}
                    >
                      <Image
                        style={{width: 50, height: 50}}
                        source={{uri: ingredient.image}}
                      />
                      <View style={{flexDirection: "column", marginStart: 5, width: "80%"}}>
                        <Text>
                          Ingredient: {ingredient.originalString}
                        </Text>
                        <Text>
                          Amount: {ingredient.amount}
                        </Text>
                      </View>
                    </View>
                  )
                })
              }
            </View>

            {/* Instructions */}
            <Text style={{fontSize: 20, fontWeight: "bold"}}>Instructions</Text>
            <View style={{
                backgroundColor: "#ABDDDC", padding: 10, borderColor: "red",
                borderWidth: 1, borderRadius: 5, marginBottom: 5,
                width: "95%"
              }}
            >
              {
                instructions.length > 0 ?
                  instructions[0].steps.map((desc, index) =>
                  {
                    steps.push({step: desc.step});
                    return (
                      <Text key={index} style={{marginBottom: 5}}>
                        {`${index + 1}. ${desc.step}`}
                      </Text>
                    )
                  })
                :
                  <Text>No Instructions</Text>
              }
            </View>
          </ScrollView>
        </View>
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