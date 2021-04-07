import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function RecipeCard({item})
{
  const navigation = useNavigation();
  return(
    // <View style = {styles.container}>
    //   <TouchableOpacity 
    //   style = {styles.background}
    //   onPress = {() =>
    //   {navigation.navigate('RecipePage', {item})}}
    //   >
    //     <View style = {styles.imageSection}>
    //     <View style = {styles.textSection}>
    //       <Text style = {styles.buttonText}>Name: {item !== undefined ? item.title : ""}</Text>
    //     </View>
    //       <Image
    //       style={styles.image}
    //       source={{uri: item !== undefined ? item.image : null}}
    //       />
    //     </View>
    //   </TouchableOpacity>
    // </View>

    <TouchableOpacity onPress={() => navigation.navigate('RecipePage', {item})} style={styles.background}>
      <View style={{alignSelf: "center", alignItems: 'center',}}>
        <Text style={styles.buttonText}>
          {item !== undefined ? item.title : ""}
        </Text>
        <Image
          style={styles.image}
          source={{uri: item !== undefined ? item.image : null}}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  background: {
    backgroundColor: "#ABDDDC", padding: 10, borderColor: "red",
    borderWidth: 1, borderRadius: 5, marginBottom: 5,
    width: "80%", alignSelf: "center", justifyContent: 'center',
  },
  textSection: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: 150,
    width: 150,
  },
  image: {
    height: 173,
    width: 234,
    alignContent: "center"
  },
  buttonText: {
    fontSize: 18,
    margin: 10,
    fontWeight: "bold"
  },
})

export default RecipeCard;