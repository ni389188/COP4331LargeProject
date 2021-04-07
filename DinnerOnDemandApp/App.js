/*
Things to remember
//cd ../Backend/npm start
//npx react-native run-android
//ctrl j hides terminal
*/

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import 'localstorage-polyfill';

import AccountPage from './src/pages/AccountPage';
import LoginPage from './src/pages/LoginPage';
import ForgotPasswordPage from './src/pages/ForgotPasswordPage';
import RegisterPage from './src/pages/RegisterPage';
import RecipeListPage from './src/pages/RecipeListPage';
import SearchPage from './src/pages/SearchPage';
import ShoppingListPage from './src/pages/ShoppingListPage';
import SettingsPage from './src/pages/SettingsPage';
import RecipePage from './src/pages/RecipePage';
import CreatePage from './src/pages/CreatePage';
import ResultsPage from './src/pages/ResultsPage';
import CurrentRecipesPage from './src/pages/CurrentRecipesPage';
import ProfilePage from './src/pages/ProfilePage';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import store from "./src/redux/store"
import { Provider } from "react-redux"
import NavigationBar from './src/components/NavigationBar';

import WIPPage from './src/pages/AccountPage';
{/* Change location to work on desired work in progress page */}

const Stack = createStackNavigator();

const App: () => React$Node = () => {
  return (
    <Provider store={store}>
      <View style={styles.body}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="WIPPage" component={WIPPage} />
            <Stack.Screen name="AccountPage" component={AccountPage} />
            <Stack.Screen name="NavigationBar" component={NavigationBar} />
            <Stack.Screen name="LoginPage" component={LoginPage} />
            <Stack.Screen name="ForgotPasswordPage" component={ForgotPasswordPage} />
            <Stack.Screen name="RegisterPage" component={RegisterPage} />
            <Stack.Screen name="SettingsPage" component={SettingsPage} />
            <Stack.Screen name="RecipePage" component={RecipePage} />
            <Stack.Screen name="CreatePage" component={CreatePage} />
            <Stack.Screen name="ResultsPage" component={ResultsPage} />
            <Stack.Screen name="CurrentRecipesPage" component={CurrentRecipesPage} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: 'grey',
    flex: 1,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;