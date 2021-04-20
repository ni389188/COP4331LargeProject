import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Card } from '@ui-kitten/components';
import { ThemeContext } from './theme-context';

function RecipeCard({ item }, random) {
  const navigation = useNavigation();
  const themeContext = React.useContext(ThemeContext);

  const header = () => {
    return (
      <Text style={[styles.buttonText, {color: themeContext.theme === "light" ? "black" : "white"}]}>
        {item !== undefined ? item.title : ""}
      </Text>
    )
  }

  return (
    <Card header={header}
      style={{ margin: 2, width: "80%", alignSelf: "center", borderColor: "red", marginBottom: 15 }} 
      onPress={() => navigation.navigate('RecipePage', { item })}
      disabled={random ? true : false}
    >
      <Image
        style={styles.image}
        source={{ uri: item !== undefined ? item.image : null }}
      />
    </Card>
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
    alignContent: "center",
    alignSelf: "center"
  },
  buttonText: {
    fontSize: 18,
    margin: 10,
    fontWeight: "bold",
    alignSelf: "center"
  },
})

export default RecipeCard;