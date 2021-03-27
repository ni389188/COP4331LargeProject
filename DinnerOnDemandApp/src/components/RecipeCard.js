import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function RecipeCard({item})
{
  const navigation = useNavigation();
  return(
    <View style = {styles.container}>
      <TouchableOpacity 
      style = {styles.background}
      onPress = {() =>
      {navigation.navigate('RecipePage', {item})}}
      >
        <View style = {styles.imageSection}>
          <Image
          style={styles.image}
          source={{uri: item !== undefined ? item.image : null}}
          />
        </View>
        <View style = {styles.textSection}>
          <Text style = {styles.buttonText}>Name: </Text>
          <Text style = {styles.buttonText}>Flavor: </Text>
          <Text style = {styles.buttonText}>Time: </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  background: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 2,
    height: 150,
    width: 300,
  },
  imageSection: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 150,
      width: 150,
      borderWidth: 2,
  },
  textSection: {
      justifyContent: 'center',
      alignItems: 'flex-start',
      height: 150,
      width: 150,
  },
  image: {
      height: 150,
      width: 150,
  },
  buttonText: {
    fontSize: 13,
    margin: 10,
  },
})

export default RecipeCard;