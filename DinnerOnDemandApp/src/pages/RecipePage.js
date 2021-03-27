import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, ScrollView } from 'react-native';

import PageTitle from '../components/PageTitle';
import NavigationBar from '../components/NavigationBar';
import NavigationButton from '../components/NavigationButton';
import axios from 'axios';

const APIKEY = '7bfd691826fd4d31834f7728f67c9b3e';

const RecipePage = ({ navigation, route : {params : {item}} }) =>
{
  const [instructions, setInstructions] = useState([]);

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
      {/* {console.log(item.metaInformation)} */}
      <View style={styles.header}>
        <PageTitle text={item.title} />
      </View>
      <ScrollView>
        <View style={styles.body}>
          <Image
            style={styles.image}
            source={{uri: item.image}}
          />
          {/* Ingredients */}
          <View>
            <Text style={{color: "black"}}>Ingredients</Text>
            {
              item.usedIngredients.map((ingredient, index) =>
              {
                // console.log(ingredient)
                return (
                  <>
                    {/* <Image
                      style={{width: 50, height: 50}}
                      source={{uri: ingredient.image}}
                    /> */}
                    <Text key={index} >
                      Ingredient: {ingredient.originalString}
                    </Text>
                    <Text>
                      Ammount: {ingredient.amount}
                    </Text>
                  </>
                )
              })
            }
          </View>

          {/* Instructions */}
          <View>
            <Text>Instructions</Text>
            {
              instructions.length > 0 ?
                instructions[0].steps.map((desc, index) =>
                {
                  return (
                    <>
                      <Text key={index}>
                        {desc.step}
                      </Text>
                    </>
                  )
                })
              :
                null
            }
          </View>

          {/* Add to Shopping List */}

          {/* Add/Remove from Recipes */}

          {/* Share */}
          <TouchableOpacity>
            <Image style={{width: 30, height: 30}} source={require('../components/socialIcon.png')} />
          </TouchableOpacity>
        </View>
      </ScrollView>
      {/* <View style={styles.footer}>
        <NavigationBar />
      </View> */}
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
  image: {
    marginTop: 50,
    marginBottom: 30,
    width: 312,
    height: 231,
  },
  button: {
    marginTop: 20,
    width: '85%',
  },
});

export default RecipePage;