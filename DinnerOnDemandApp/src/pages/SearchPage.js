import React, { useEffect, useState } from 'react';
import { FlatList, TextInput, View, Text, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BouncyCheckbox from "react-native-bouncy-checkbox";

import PageTitle from '../components/PageTitle';
import axios from "axios";
import RecipeCard from '../components/RecipeCard';
import NavigationButton from '../components/NavigationButton';

// import { Container } from './styles';

const APIKEY = '7bfd691826fd4d31834f7728f67c9b3e';

const SearchPage = () =>
{
    // const navigation = useNavigation();
    const [ingredients, setIngredients] = useState("");
    const [results, setResult] = useState([]);
    const [loading, setLoading] = useState(true);
    const [useCustom, setUseCustom] = useState(false);

    const search = () =>
    {
        setLoading(!loading)

        if (useCustom)
        {
            // Call api
            // axios
            // .get(``)
            // .then(res =>
            // {
            //     setResult(res.data)
            //     setLoading(false)
            // })
        }
        else
        {
            axios
            .get(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients.replace(" ", "+")}&apiKey=${APIKEY}`)
            .then((response) =>
            {
                setResult(response.data)
                setLoading(false)
            })
        }
    };

    const renderResults = ({item}) =>
    {
        return (
            <RecipeCard item={item} />
        )
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView behavior={"height"} style={{flex: 1}}>
            <View style = {styles.container}>
                <View style = {styles.header}>
                    <PageTitle text = 'Search for Recipes' />
                </View>
                <View style={styles.body, {marginTop: 10,}}>
                    <View style={{flexDirection: "column", alignItems: "center"}}>
                        <BouncyCheckbox
                            size={25}
                            fillColor="red"
                            unfillColor="#FFFFFF"
                            text="Custom Recipes"
                            iconStyle={{ borderColor: "red" }}
                            textStyle={{ fontFamily: "JosefinSans-Regular" }}
                            onPress={() => setUseCustom(!useCustom)}
                        />
                        <TextInput
                            placeholder={"Search for Ingredients/Recipes here"}
                            placeholderTextColor={"black"}
                            value={ingredients}
                            onChangeText={setIngredients}
                            onSubmitEditing={() => ingredients !== "" ? search() : null }
                            style={{backgroundColor: "white", padding: 5, borderWidth: 1.5,
                                borderRadius: 10, borderColor: "black", color: "black", margin: 10}}
                        />
                    </View>
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
                                ListFooterComponent={<View style={{height: 150}}/>}
                            />
                    }
                </View>
                <View style = {styles.button}>
                    <NavigationButton
                    name = 'Search'
                    doFunction = {() => navigation.navigate('ResultsPage')}
                    />
                </View>
            </View>
        </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: 'white',
  },
  header: {
    width: '100%',
  },
  body: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  button: {
      marginTop: 20,
      width: '85%',
  },
});

export default SearchPage;