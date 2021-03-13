import React, { useEffect, useState } from 'react';
import { FlatList, TextInput, View, Text } from 'react-native';

// import { Container } from './styles';

const SearchPage = () =>
{
    const [ingredients, setIngredients] = useState("");
    const [results, setResult] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() =>
    {
        // Do stuff
    }, [results]);

    const search = () =>
    {

    }

    const renderResults = ({item}) =>
    {
        console.log(item);
    }

    return (
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
                    <Text style={{color: "white", textAlign: "center", justifyContent: "center"}}>
                        Search for ingredients/recipes first then the results will be displayed here.
                    </Text>
                :
                    <FlatList
                        data={results}
                        keyExtractor={item => `item - ${item}`}
                        renderItem={renderResults}
                    />
            }
        </View>
    );
}

export default SearchPage;