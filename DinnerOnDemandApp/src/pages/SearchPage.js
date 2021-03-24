import React, { useEffect, useState } from 'react';
import { FlatList, TextInput, View, Text, StyleSheet } from 'react-native';

import PageTitle from '../components/PageTitle';
import NavigationBar from '../components/NavigationBar';

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

    };

    const renderResults = ({item}) =>
    {
        console.log(item);
    };

    return (
        <View style = {styles.container}>
            <View style = {styles.header}>
                <PageTitle text = 'Your Recipes' />
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
                                keyExtractor={item => `item - ${item}`}
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
  },
  footer: {
    flex: 1.5,
    width: '100%',
  },
});

export default SearchPage;