import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RecipeListPage from '../pages/RecipeListPage';
import ShoppingListPage from '../pages/ShoppingListPage';
import SearchPage from '../pages/SearchPage';
import ProfilePage from '../pages/ProfilePage';

function MyTabBar({ state, descriptors, navigation }) {
    return (
        <View style={styles.container}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TouchableOpacity
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={styles.tab}
                        key={label}
                    >
                        <Image
                            style={styles.icon}
                            source={
                                label === 'Recipe' ?
                                    require('./recipesIcon.png')
                                :
                                label === 'Shopping' ?
                                    require('./ingredientsIcon.png')
                                :
                                label === 'Search' ?
                                    require('./searchIcon.png')
                                :
                                    require('./profileIcon.png')
                            }
                        />
                        <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
                            {label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const Tab = createBottomTabNavigator();

const NavigationBar = () => {
    return (
        <>
            <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
                <Tab.Screen name="Recipe" component={RecipeListPage} />
                <Tab.Screen name="Shopping" component={ShoppingListPage} />
                <Tab.Screen name="Search" component={SearchPage} />
                <Tab.Screen name="Profile" component={ProfilePage} />
            </Tab.Navigator>
        </>
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