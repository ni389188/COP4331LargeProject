import React, { useEffect, useState } from 'react';
import { FlatList, TextInput, View, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BouncyCheckbox from "react-native-bouncy-checkbox";

import PageTitle from '../components/PageTitle';
import axios from "axios";
import RecipeCard from '../components/RecipeCard';

import * as eva from '@eva-design/eva';
import { Layout, Text, CheckBox, Input, Icon } from '@ui-kitten/components';

// import { Container } from './styles';

const APIKEY = '7bfd691826fd4d31834f7728f67c9b3e';

const SearchPage = () => {
    // const navigation = useNavigation();
    const [ingredients, setIngredients] = useState("");
    const [results, setResult] = useState([]);
    const [loading, setLoading] = useState(true);
    const [useCustom, setUseCustom] = useState(false);

    const app_name = 'cop4331din';

    function buildPath(route) {
        if (process.env.NODE_ENV === 'production') {
            return 'https://' + app_name + '.herokuapp.com/' + route;
        }
        else {
            return 'http://localhost:5000/' + route;
        }
    };

    const search = async () => {
        setLoading(!loading)

        if (useCustom) {
            // Call searchrecipe api
            // var js = JSON.stringify({ ingredients: ingredients.replace(" ", ""), limit: "10" });
            // try {
            //     const response = await fetch(buildPath('api/searchrecipe'),
            //     {
            //         method: 'post',
            //         body: js,
            //         headers:
            //         {
            //             'Content-Type': 'application/json'
            //         }
            //     });

            //     var res = JSON.parse(await response.text());

            //     if (res.error) {
            //         alert(res.error);
            //     }
            //     else {
            //         console.log(res)
            //         // storage.storeToken(res);
            //     }
            // }
            // catch (e) {
            //     alert(e.toString());
            //     return;
            // }

            axios.post(buildPath('api/searchrecipe'),
            {
                ingredients: "apples",
                limit: "10"
            })
            .then((response) =>
            {
                console.log(response);
            }, (error) =>
            {
                console.log(error);
            });
        }
        else {
            axios
            .get(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients.replace(" ", "+")}&apiKey=${APIKEY}`)
            .then((response) => {
                console.log(response.data[1])
                setResult(response.data)
                setLoading(false)
            })
        }
    };

    const renderResults = ({ item }) => {
        return (
            <RecipeCard item={item} />
        )
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView behavior={"height"} style={{ flex: 1 }}>
                <Layout style={{ flex: 1 }}>
                    <View style={styles.header}>
                        <PageTitle text='Search for Recipes' />
                    </View>
                    <View style={styles.body}>
                        <View style={{ flexDirection: "column", alignItems: "center", paddingTop:10 }}>
                            <CheckBox checked={useCustom} onChange={() => setUseCustom(!useCustom)}>
                                <Text>Search Custom Recipes</Text>
                            </CheckBox>
                            <Input
                                placeholder={"Search for Ingredients/Recipes here"}
                                // placeholderTextColor={"black"}
                                value={ingredients}
                                onChangeText={setIngredients}
                                onSubmitEditing={() => ingredients !== "" ? search() : null}
                                caption={"Seperate each ingrediant with a comma"}
                                style={{ width: "90%", marginVertical: 10 }}
                            />
                        </View>
                        {
                            loading ?
                                <Text style={{ textAlign: "center", justifyContent: "center" }}>
                                    Search for ingredients/recipes first then the results will be displayed here.
                                </Text>
                                :
                                <FlatList
                                    data={results}
                                    keyExtractor={(item, index) => index.toString()}
                                    numColumns={1}
                                    renderItem={renderResults}
                                    ListFooterComponent={<View style={{ height: 150 }} />}
                                />
                        }
                    </View>
                    {/* <View style={styles.container}>
                        <View style={styles.header}>
                            <PageTitle text='Search for Recipes' />
                        </View>
                        <View style={styles.body, { marginTop: 10, }}>
                            <View style={{ flexDirection: "column", alignItems: "center" }}>
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
                                    onSubmitEditing={() => ingredients !== "" ? search() : null}
                                    style={{
                                        backgroundColor: "white", padding: 5, borderWidth: 1.5,
                                        borderRadius: 10, borderColor: "black", color: "black", margin: 10
                                    }}
                                />
                            </View>
                            {
                                loading ?
                                    <Text style={{ color: "black", textAlign: "center", justifyContent: "center" }}>
                                        Search for ingredients/recipes first then the results will be displayed here.
                                    </Text>
                                    :
                                    <FlatList
                                        data={results}
                                        keyExtractor={(item, index) => index.toString()}
                                        numColumns={1}
                                        renderItem={renderResults}
                                        ListFooterComponent={<View style={{ height: 150 }} />}
                                    />
                            }
                        </View>
                    </View> */}
                </Layout>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        width: '100%',
        height: '100%',
        flex: 1,
    },
    body: {
        flex: 11,
        alignItems: 'center',
        width: '100%',
    },
    button: {
        marginTop: 20,
        width: '85%',
    },
});

export default SearchPage;