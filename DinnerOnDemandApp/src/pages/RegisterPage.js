import React, {useState} from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from "react-redux";
import SaveUser from "../redux/Actions/SaveUser";

import PageTitle from '../components/PageTitle';
import NavigationButton from '../components/NavigationButton';

const RegisterPage = ({navigation, mapDispatchToProps, user}) =>
{
  const saveToRedux = () =>
  {
    mapDispatchToProps({name: "Carl", email: "carlantoine14@gmail.com", favorites: []})
  }
  
  return(
    <View style = {styles.container}>
      <View style = {styles.header}>
        <PageTitle text = "Dinner on Demand" />
      </View>
      <View style = {styles.body}>
        <View style = {styles.background}>
          <Text style = {styles.loginTitle}>Register{"\n"}</Text>
          <Text style = {styles.inputTitle}> First Name</Text>
          <TextInput style = {styles.input} placeholder="Please enter your first name" />
          <Text style = {styles.inputTitle}> Last Name</Text>
          <TextInput style = {styles.input} placeholder="Please enter your last name" />
          <Text style = {styles.inputTitle}> Email</Text>
          <TextInput style = {styles.input} placeholder="Please enter email" />
          <Text style = {styles.inputTitle}> Password</Text>
          <TextInput style = {styles.input} placeholder="Please enter password" />
          <Text style = {styles.inputTitle}> Confirm Password</Text>
          <TextInput style = {styles.input} placeholder="Please confirm password" />
          <View style = {styles.buttonOrientation}>
            <NavigationButton
              name = 'Create Account'
              destination = 'RecipeListPage'
            />
          </View>
          <View style = {styles.loginText}>
            <Text style = {{color: 'black'}}>Already have an account?</Text>
            <TouchableOpacity onPress = {() => navigation.navigate('LoginPage')}>
              <Text style = {styles.signUpText}>{"\t"}Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  header: {
    flex: 1,
    width: '100%',
  },
  body: {
    flex: 11,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  background: {
    backgroundColor: '#ABDDDC',
    borderRadius: 10,
    justifyContent: 'center',
    padding: 25,
    width: '85%',
    height: '90%',
  },
  loginTitle: {
    textAlign: 'center',
    fontSize: 30,
  },
  inputTitle:{
    color: 'black',
    marginTop: 5,
  },
  input: {
    color: 'black',
    borderColor: 'grey',
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 2.5,
  },
  signUpText: {
    color: 'blue',
  },
  buttonOrientation: {
    marginTop: 20,
    width: '100%',
  },
  loginText: {
    flexDirection: 'row', 
    justifyContent: 'center',
    marginTop: 20,
  },
})

const mapStateToProps = ({UserReducer: { user }}) =>
{
  return {
    user
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    reduxSaveUser:(user) => dispatch(SaveUser(user))
  }
}

export default connect(mapStateToProps, { mapDispatchToProps })(RegisterPage);