import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const NavigationBar = () =>
{
    const navigation = useNavigation();
    return (
        <View style = {styles.container}>
            <TouchableOpacity 
            onPress = {() => navigation.navigate('RecipeListPage')}
            style = {styles.tab}
            >
                <Image
                style={styles.icon}
                source={require('./recipesIcon.png')}
                />
                <Text>Recipes</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress = {() => navigation.navigate('SearchPage')}
            style = {styles.tab}
            >
                <Image
                style={styles.icon}
                source={require('./searchIcon.png')}
                />
                <Text>Search</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress = {() => navigation.navigate('ShoppingListPage')}
            style = {styles.tab}
            >
                <Image
                style={styles.icon}
                source={require('./ingredientsIcon.png')}
                />
                <Text>Shopping</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress = {() => navigation.navigate('SocialPage')}
            style = {styles.tab}
            >
                <Image
                style={styles.icon}
                source={require('./socialIcon.png')}
                />
                <Text>Social</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress = {() => navigation.navigate('ProfilePage')}
            style = {styles.tab}
            >
                <Image
                style={styles.icon}
                source={require('./profileIcon.png')}
                />
                <Text>Profile</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignContent: 'center',
  },
  tab: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      paddingVertical: 20,
  },
  icon: {
      height: 30,
      width: 30,
  },
});

export default NavigationBar;