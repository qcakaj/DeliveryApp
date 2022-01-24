import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import { Home } from '../screens';


import { COLORS, icons } from '../constants';


const Tab = createBottomTabNavigator();

const Tabs = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: 'white',
                    position: 'absolute',
                    borderTopWidth: 0,
                    elevation: 0,
                },
                tabBarIcon: ({ focused, color, size }) => {
                    let source;

                    if (route.name === 'Home') {
                        source = icons.cutlery;
                        // ? 'ios-information-circle'
                        // : 'ios-information-circle-outline';
                    } else if (route.name === 'Search') {
                        source = icons.search;
                    } else if (route.name === 'User') {
                        source = icons.user;
                    } else if (route.name === 'Like') {
                        source = icons.like;
                    }

                    // You can return any component that you like here!
                    return <Image source={source} style={{ width: size, height: size }} tintColor={color} />;
                },
                tabBarActiveTintColor: COLORS.primary,
                tabBarInactiveTintColor: COLORS.secondary,
            })}
        >
            <Tab.Screen
                name="Home"
                component={Home}

            />
            <Tab.Screen
                name="Search"
                component={Home}
                options={{
                    headerShown: false,
                }}
            />

            <Tab.Screen
                name="User"
                component={Home}
                options={{
                    headerShown: false,
                }}
            />

        </Tab.Navigator>
    );
};

export default Tabs;
