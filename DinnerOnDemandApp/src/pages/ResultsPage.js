import React from 'react';
import { View, StyleSheet } from 'react-native';

import PageTitle from '../components/PageTitle';
import NavigationBar from '../components/NavigationBar';
import RecipeCard from '../components/RecipeCard';

const ResultsPage = ({navigation, route : {params : {item}}}) =>
{
    return(
      <View style = {styles.container}>
        {console.log(item)}
        <View style = {styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text>Back</Text>
          </TouchableOpacity>
          <PageTitle text = 'Results' />
        </View>
        <View style = {styles.body}>
          <View style = {styles.cards}>
            <RecipeCard />
          </View>
        </View>
        {/* <View style = {styles.footer}>
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
  cards: {
    marginTop: 20,
  },
});

export default ResultsPage;