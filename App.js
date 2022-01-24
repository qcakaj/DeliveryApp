import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Home, Restaurant, OrderDelivery } from './screens';
import Tabs from './navigation/tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GetLocation from 'react-native-get-location';
import { COLORS } from './constants';


const Stack = createNativeStackNavigator();

const App = () => {


    return (
        <NavigationContainer>
            <Stack.Navigator
                // screenOptions={{
                //     headerShown: false,
                // }}
                initialRouteName="Home">
                <Stack.Screen name="Home" component={Tabs} options={{
                    headerShown: false,
                }} />
                <Stack.Screen name="Restaurant"
                    component={Restaurant}
                    options={({ route }) => {

                        return ({
                            title: route.params.item?.name,

                            animation: 'slide_from_right',
                        });
                    }} />
                <Stack.Screen
                    name="OrderDelivery"
                    component={OrderDelivery}
                    options={({ route }) => {

                        return ({
                            headerShown: false,
                            animation: 'slide_from_right',
                        });
                    }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
export default () => {
    return <App />;
};
