import React from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';

import PageTitle from '../components/PageTitle';
import NavigationBar from '../components/NavigationBar';
import NavigationButton from '../components/NavigationButton';

const CreatePage = ({navigation}) =>
{
    return(
      <View style = {styles.container}>
        <View style = {styles.header}>
          <PageTitle text = 'Create a Recipe' />
        </View>
        <View style = {styles.body}>
          <View style = {styles.background}>
            <TextInput style = {styles.input} placeholder="Add name of dish" textAlign='center' />
          </View>
          <View style = {styles.background}>
            <TextInput style = {styles.input} placeholder="Add flavor of dish" textAlign='center' />
          </View>
          <View style = {styles.background}>
            <TextInput style = {styles.input} placeholder="Add time to make" textAlign='center' />
          </View>
          <View style = {styles.background}>
            <TextInput style = {styles.input} placeholder="Add Ingredients one at a time" textAlign='center' />
          </View>
          <View style = {styles.background}>
            <TextInput style = {styles.input} placeholder="Add Instuctions step-by-step" textAlign='center' />
          </View>
          <View style = {styles.background}>
            <TextInput style = {styles.input} placeholder="Add image of dish" textAlign='center' />
          </View>
          <View style = {styles.background}>
            <NavigationButton
              name = 'Save Recipe'
              destination = 'RecipePage'
            />
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
  background: {
    marginTop: 20,
    width: '85%',
  },
  input: {
    color: 'black',
    borderColor: 'grey',
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 2.5,
  },
});

export default CreatePage;