import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SearchPage from '../pages/SearchPage';

// import { Container } from './styles';

const Tab = createBottomTabNavigator();

const NavigationBar = () =>
{
    return (
        <Tab.Navigator>
            <Tab.Screen name="Search" component={SearchPage}/>
        </Tab.Navigator>
    )
}

export default NavigationBar;