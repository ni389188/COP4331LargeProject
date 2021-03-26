import React, { useEffect, useState } from 'react';
import { FlatList, TextInput, View, Text, StyleSheet, Image } from 'react-native';

import PageTitle from '../components/PageTitle';
import NavigationBar from '../components/NavigationBar';
import NavigationButton from '../components/NavigationButton';
import axios from "axios";

// import { Container } from './styles';

const APIKEY = '7bfd691826fd4d31834f7728f67c9b3e';

const SearchPage = () =>
{
    const [ingredients, setIngredients] = useState("");
    const [results, setResult] = useState(null);
    const [loading, setLoading] = useState(true);

    function search()
    {
        axios
        .get(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients.replace(" ", "+")}&apiKey=${APIKEY}`)
        .then((response) =>
        {
            setResult(response.data)
            setLoading(false)
        })
    };

    const renderResults = ({item}) =>
    {
        return (
            <View style={{paddingHorizontal: 15, paddingVertical: 10, backgroundColor: "black"}}>
                <Text style={{color: "white"}}>
                    {item.title}
                </Text>
                <Image
                    source={{uri: item.image}}
                    style={{width: 312, height: 231}}
                />
                {/* <View style = {styles.button}>
                    <NavigationButton
                    name = 'Search'
                    destination = 'ResultsPage'
                    />
                </View> */}
            </View>
        )
    };

    return (
        <View style = {styles.container}>
            <View style = {styles.header}>
                <PageTitle text = 'Search for Recipes' />
            </View>
            <View style = {styles.body}>
                <View style={{alignItems: "center"}}>
                    <TextInput
                        placeholder={"Search for Ingredients/Recipes here"}
                        placeholderTextColor={"black"}
                        value={ingredients}
                        onChangeText={setIngredients}
                        onSubmitEditing={() => search()}
                        style={{backgroundColor: "white", padding: 5, borderWidth: 1.5,
                            borderRadius: 10, borderColor: "black", color: "black", width: "90%", margin: 20}}
                    />
                    {
                        loading ?
                            <Text style={{color: "black", textAlign: "center", justifyContent: "center"}}>
                                Search for ingredients/recipes first then the results will be displayed here.
                            </Text>
                        :
                            <FlatList
                                data={results}
                                key={item => `item - ${item.index}`}
                                numColumns={1}
                                renderItem={renderResults}
                            />
                    }
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
});

export default SearchPage;