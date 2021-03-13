import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from '../pages/HomePage';
import SearchPage from '../pages/SearchPage';

// import { Container } from './styles';

const Tab = createBottomTabNavigator();

const NavigationBar = () =>
{
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomePage}/>
            <Tab.Screen name="Search" component={SearchPage}/>
        </Tab.Navigator>
    )
}

export default NavigationBar;