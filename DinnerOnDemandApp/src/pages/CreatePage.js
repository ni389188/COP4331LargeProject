import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Alert, Image, ScrollView } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import jwt_decode from 'jwt-decode';

import PageTitle from '../components/PageTitle';
import NavigationBar from '../components/NavigationBar';
import NavigationButton from '../components/NavigationButton';
import { Layout, Text } from '@ui-kitten/components';

let options = {
  includeBase64: true,
  saveToPhotos: true
};

const CreatePage = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [ingredients, setIngredients] = useState(null);
  const [units, setUnits] = useState([""]);
  const [instructions, setInstructions] = useState(null);

  const storage = require('../tokenStorage.js');  
  var tok = storage.retrieveToken();
  var userID = '';

  if(tok != null)
  {
    var ud = jwt_decode(tok);
    userID = ud.userId;
  }

  const app_name = 'cop4331din';

  const buildPath = (route) => {
    if (process.env.NODE_ENV === 'production') {
      return 'https://' + app_name + '.herokuapp.com/' + route;
    }
    else {
      return 'http://10.0.2.2:5000/' + route;
    }
  };

  const addRecipe = async (tempIngre, tempInstr) => 
  {
    // Call addcustomrecipe api
    // Takes userID, title, image, ingredients, units, instructions

    var js = JSON.stringify(
      {
          UserID: userID,
          Title: title,
          Image: image,
          Ingredients: tempIngre,
          Units: units,
          Instructions: tempInstr
      });

    try {
      const response = await fetch(buildPath('api/addcustomrecipe'),
        {
          method: 'POST',
          body: js,
          headers:
          {
            'Content-Type': 'application/json'
          }
        });

      var res = JSON.parse(await response.text());

      if (res.Added) {
        // let the user know
        alert("Recipe has been added");
        setImage("")
        setTitle("")
        setIngredients("")
        setInstructions("")
      }
      else {
        // let them know it hasnt
        alert(res.error)
      }
    }
    catch (e) {
      alert(e.toString());
      // return;
    }
  }

  const checkData = () => {
    let tempIngre = ingredients !== null ? ingredients.split(/\n/) : [];
    let tempInstr = instructions !== null ? instructions.split(/\n/) : [];

    if (title.trim() === "" || tempIngre.length === 0 || tempInstr.length === 0) {
      alert("Make sure the title, ingredients, and instructions are inputed properly.")
    }
    else {
      addRecipe(tempIngre, tempInstr);
    }
    // navigation.navigate('RecipePage')
  }

  const chooseImage = (response) => {
    // console.log('Response = ', response);

    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
      alert(response.customButton);
    } else {
      const source = { uri: response.uri };
      setImage('data:image/jpeg;base64,' + response.base64)
    }
  }

  const renderFileData = () => {
    if (image) {
      return <Image source={{ uri: image }}
        style={{
          width: 250,
          height: 250,
          borderColor: 'black',
          borderWidth: 1,
          marginHorizontal: 3
        }}
      />
    } else {
      return null
    }
  }

  return (
    <Layout style={styles.container}>
      <View style={styles.header}>
        <PageTitle text='Create a Recipe' back navigate={navigation} />
      </View>
      <View style={styles.body}>
        <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
          <View style={styles.background}>
            <TextInput style={styles.input} placeholder="Add name of dish" textAlign='left' value={title}
              onChangeText={setTitle} placeholderTextColor="white"
            />
            <Text style={{ color: "red" }}>**Required**</Text>
          </View>
          <View style={styles.background}>
            <TextInput style={styles.input} placeholder="Add Ingredients one at a time" textAlign='left' multiline
              onChangeText={setIngredients} value={ingredients}
              placeholderTextColor="white"
            />
            <Text style={{ color: "red" }}>**Each ingredient on there own line**</Text>
          </View>
          <View style={styles.background}>
            <TextInput style={styles.input} placeholder="Add Instuctions step-by-step" textAlign='left'
              multiline value={instructions}
              onChangeText={setInstructions}
              placeholderTextColor="white"
            />
            <Text style={{ color: "red" }}>**Each instruction on there own line**</Text>
          </View>
          <View style={[styles.background, { alignItems: "center" }]}>
            <TouchableOpacity onPress={() => launchImageLibrary(options, chooseImage)}
              style={{ alignItems: "center" }}
            >
              {renderFileData()}
              <Text>Choose File</Text>
            </TouchableOpacity>
            <Text style={{ color: "red" }}>**Optional**</Text>
          </View>
          <View style={styles.background}>
            <NavigationButton
              name='Save Recipe'
              doFunction={() => checkData()}
            />
          </View>
        </ScrollView>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center'
  },
  header: {
    flex: 1,
    width: '100%',
  },
  body: {
    flex: 11,
    width: '100%',
    marginLeft: 60
  },
  background: {
    marginTop: 20,
    width: '85%',
  },
  input: {
    color: 'white',
    borderColor: 'grey',
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 2.5,
    backgroundColor: "black"
  },
});

export default CreatePage;