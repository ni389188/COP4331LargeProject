import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, ScrollView } from 'react-native';

import PageTitle from '../components/PageTitle';
import NavigationBar from '../components/NavigationBar';
import axios from 'axios';

const APIKEY = '7bfd691826fd4d31834f7728f67c9b3e';

const RecipePage = ({ navigation, route : {params : {item}} }) =>
{
  const [instructions, setInstructions] = useState([]);
  const ingredients = [...item.usedIngredients, ...item.missedIngredients]

  useEffect(() =>
  {
    axios.get(`https://api.spoonacular.com/recipes/${item.id}/analyzedInstructions?apiKey=${APIKEY}`)
    .then(res =>
    {
      setInstructions(res.data)
    })
  }, []);

  const addToShop = () =>
  {

  }

  const favorite = () =>
  {
    
  }

  const share = () =>
  {

  }

  return (
    <View style={styles.container}>
      {/* {console.log(ingredients)} */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text>Back</Text>
        </TouchableOpacity>
        <PageTitle text={item.title} />
      </View>
      <ScrollView style={{height: "95%"}}>
        <View style={[styles.body, {marginBottom: 50}]}>
          <Image
            style={[styles.image, {backgroundColor: "#ABDDDC", padding: 10, borderColor: "red",
            borderWidth: 1, borderRadius: 5,}]}
            source={{uri: item.image}}
          />
          {/* Ingredients */}
          <Text style={{fontSize: 20, fontWeight: "bold"}}>Ingredients</Text>
          <View>
            {
              ingredients.map((ingredient, index) =>
              {
                return (
                  <View key={index} style={{
                      backgroundColor: "#ABDDDC", padding: 10, borderColor: "red",
                      borderWidth: 1, borderRadius: 5, marginBottom: 5, flexDirection: "row",
                      width: "80%"
                    }}
                  >
                    <Image
                      style={{width: 50, height: 50}}
                      source={{uri: ingredient.image}}
                    />
                    <View style={{flexDirection: "column", marginStart: 5}}>
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
                  return (
                    <Text key={index} style={{marginBottom: 5}}>
                      {`${index + 1}. ${desc.step}`}
                    </Text>
                  )
                })
              :
                null
            }
          </View>

          <View style={{flexDirection: "row", marginTop: 10}}>
            {/* Add to Shopping List */}
            <TouchableOpacity onPress={() => null}>
              <Image style={{width: 30, height: 30}} source={require('../components/share.png')} />
            </TouchableOpacity>
            {/* Add/Remove from Recipes */}
            <TouchableOpacity style={{marginHorizontal: 50}} onPress={() => null}>
              <Image style={{width: 30, height: 30}} source={require('../components/share.png')} />
            </TouchableOpacity>
            {/* Share */}
            <TouchableOpacity onPress={() => null}>
              <Image style={{width: 30, height: 30}} source={require('../components/share.png')} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
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
    width: '100%',
  },
  body: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
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