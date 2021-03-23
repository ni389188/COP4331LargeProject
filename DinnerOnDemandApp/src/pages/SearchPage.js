import React, { useEffect, useState } from 'react';
import { FlatList, TextInput, View, Text, Image, TouchableOpacity } from 'react-native';
import axios from "axios"

// import { Container } from './styles';

const APIKEY = '7bfd691826fd4d31834f7728f67c9b3e';

const SearchPage = () =>
{
    const [ingredients, setIngredients] = useState("");
    const [results, setResult] = useState(null);
    const [loading, setLoading] = useState(true);

    function search()
    {
        axios.get(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients.replace(" ", "+")}&apiKey=${APIKEY}`)
        .then((response) =>
        {
            setResult(response.data)

            setLoading(false)
        });
    }

    const renderResults = ({item}) =>
    {
        return (
            <View style={{paddingHorizontal: 15, paddingVertical: 10,}}>
                <Text>
                    {item.title}
                </Text>
                <Image
                    source={{uri: item.image}}
                    style={{width: 312, height: 231}}
                />
            </View>
        )
    }

    return (
        <View style={{alignItems: "center", paddingBottom: 80}}>
            <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                <TextInput
                    placeholder={"Search for Ingredients/Recipes here"}
                    placeholderTextColor={"black"}
                    value={ingredients}
                    onChangeText={setIngredients}
                    style={{backgroundColor: "white", padding: 5, borderWidth: 1.5,
                        borderRadius: 10, borderColor: "black", color: "black", width: "70%", marginVertical: 20}}
                />
                <TouchableOpacity onPress={() => ingredients !== "" ? search() : null}>
                    <Text>Search</Text>
                </TouchableOpacity>
            </View>
            {
                loading ?
                    <Text style={{color: "black", textAlign: "center", justifyContent: "center"}}>
                        Search for ingredients/recipes first then the results will be displayed here.
                    </Text>
                :
                    <FlatList
                        data={results}
                        key={item => `${item.index}`}
                        numColumns={1}
                        renderItem={renderResults}
                    />
            }
        </View>
    );
}

export default SearchPage;