/* eslint-disable react-native/no-inline-styles */
import React, { useState, useLayoutEffect } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    Image,


} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import * as Resources from '../constants';
import { Header } from '../components';
import { useEffect } from 'react/cjs/react.development';
import GetLocation from 'react-native-get-location';

const Home = ({ navigation }) => {


    const { categoryData, restaurantData, initialCurrentLocation } = getDummyData();
    const [categories, setCategories] = useState(categoryData);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [restaurants, setRestaurants] = useState(restaurantData);
    const [currentLocation, setCurrentLocation] = useState(initialCurrentLocation);
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => renderBasketIcon(),
        });
    });
    useEffect(() => {
        const location = GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
            .then(latlng => {

                currentLocation.gps = {
                    latitude: latlng.latitude,
                    longitude: latlng.longitude,
                };
                setCurrentLocation(currentLocation);
            })
            .catch(error => {
                const { code, message } = error;
                console.warn(code, message);
            });

        return () => location();
    }, [currentLocation]);

    const onSelectCategory = (category) => {
        const restaurantList = restaurantData.filter(rest => rest.categories.includes(category.id));
        setRestaurants(restaurantList);
        setSelectedCategory(category);
    };
    const getCategoryNameById = (id) => {
        const category = categories.filter(a => a.id === id);
        if (category.length > 0) {
            return category[0].name;
        } else {
            return '';
        }
    };

    const ItemFood = (item) => {

        return (
            <TouchableOpacity
                delayPressIn={10}
                activeOpacity={0.8}
                style={{
                    padding: Resources.SIZES.padding,
                    paddingBottom: Resources.SIZES.padding * 2,
                    backgroundColor: (selectedCategory?.id === item.id) ? Resources.COLORS.primary : Resources.COLORS.white,
                    borderRadius: Resources.SIZES.radius,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: Resources.SIZES.padding,
                    ...styles.shadow,

                }}
                onPress={() => {
                    onSelectCategory(item);
                }}>
                <View
                    style={{
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: (selectedCategory?.id === item.id) ? Resources.COLORS.white : Resources.COLORS.lightGray,
                    }}>
                    <Image
                        source={item.icon}
                        style={{
                            resizeMode: 'contain',
                            width: '75%',
                            height: '75%',
                        }}
                    />
                </View>
                <Text
                    style={{
                        marginTop: Resources.SIZES.padding,
                        color: (selectedCategory?.id === item.id) ? Resources.COLORS.white : Resources.COLORS.black,
                        ...Resources.FONTS.body5,
                    }}>{item.name}</Text>
            </TouchableOpacity>
        );
    };
    const MainCategories = () => {

        return (
            <View style={{ padding: Resources.SIZES.padding * 1.5 }}>
                {/* <Text style={[{ ...Resources.FONTS.h1 }, { color: Resources.COLORS.black }]}>Main</Text>
                <Text style={[{ ...Resources.FONTS.h1 }, { color: Resources.COLORS.black }]}>Categories</Text> */}
                <FlatList
                    data={categories}
                    horizontal
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => {
                        return ItemFood(item);
                    }}
                    contentContainerStyle={{ paddingVertical: Resources.SIZES.padding * 2 }}
                />
            </View>
        );
    };


    const ItemRestaurant = ({ item }) => {
        return (
            <TouchableOpacity
                delayPressIn={10}
                activeOpacity={0.8}
                onPress={() => navigation.navigate('Restaurant', {
                    item,
                    currentLocation,
                })}
                style={{
                    flex: 1,
                    marginBottom: Resources.SIZES.padding * 2,
                }}>
                <View
                    style={{
                        marginBottom: Resources.SIZES.padding,
                    }}>
                    <Image
                        source={item.photo}
                        style={{
                            resizeMode: 'cover',
                            width: '100%',
                            height: 200,
                            borderRadius: Resources.SIZES.radius,
                        }}
                    />
                    <View
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            backgroundColor: 'white',
                            height: 50,
                            width: '40%',
                            borderTopRightRadius: Resources.SIZES.radius,
                            borderBottomLeftRadius: Resources.SIZES.radius,
                            alignItems: 'center',
                            justifyContent: 'center',
                            ...styles.shadow,
                        }} >
                        <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={{
                                color: Resources.COLORS.black,
                                ...Resources.FONTS.h4,
                            }}
                        >{item.duration}</Text>
                    </View>
                </View>
                <Text
                    style={{
                        color: Resources.COLORS.black,
                        ...Resources.FONTS.body2,
                    }}>{item.name}</Text>

                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }} >
                    <Image
                        source={Resources.icons.star}
                        style={{
                            height: 20,
                            width: 20,
                            tintColor: Resources.COLORS.primary,
                            marginRight: 10,
                        }}
                    />
                    <Text
                        style={{

                            color: Resources.COLORS.primary,
                            ...Resources.FONTS.body3,
                        }}>{item.rating}</Text>

                    <View
                        style={{
                            flexDirection: 'row',
                            marginLeft: 10,

                        }}>
                        {
                            item.categories.map((categoryId) => {
                                return (
                                    <View
                                        style={{
                                            flexDirection: 'row',

                                        }}
                                        key={categoryId}>

                                        <Text
                                            style={{
                                                ...Resources.FONTS.body3,
                                                color: Resources.COLORS.secondary,
                                            }}>{getCategoryNameById(categoryId)}</Text>
                                        <Text
                                            style={{
                                                ...Resources.FONTS.h3,
                                                color: Resources.COLORS.primary,
                                            }}> . </Text>
                                    </View>


                                );
                            })
                        }
                        {[1, 2, 3].map((priceRating) => {
                            return <Text
                                key={priceRating}
                                style={{
                                    ...Resources.FONTS.body3,
                                    color: (priceRating >= item.priceRating) ? Resources.COLORS.secondary : Resources.COLORS.darkgray,
                                }}>$</Text>;

                        })}


                    </View>
                </View>
            </TouchableOpacity>);

    };
    const RestaurantList = () => {

        return (
            <FlatList
                data={restaurants}
                keyExtractor={item => `${item.id}`}
                renderItem={ItemRestaurant}
                contentContainerStyle={{
                    paddingHorizontal: Resources.SIZES.padding * 2,
                    paddingBottom: 20,
                }}
            />
        );
    };
    const renderBasketIcon = () => {
        return (
            <TouchableOpacity
                style={{
                    width: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Image
                    source={Resources.icons.basket}
                    style={{
                        resizeMode: 'contain',
                        width: 24,
                        height: 24,
                        tintColor: Resources.COLORS.primary,
                    }} />
            </TouchableOpacity>);
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* <Header
                leftIcon={Resources.icons.nearby}
                rightIcon={Resources.icons.basket}
                title={currentLocation.streetName}
            /> */}
            {MainCategories()}
            {RestaurantList()}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Resources.COLORS.lightGray4,
        paddingBottom: '10%',
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 1,
    },
});

export default Home;
function getDummyData() {
    //34T 513674.08493164 4724485.449312
    const initialCurrentLocation = {
        streetName: 'Xhambazet',
        // 42.66769209037638, 21.172060726734905/
        gps: {
            latitude: 42.655577678144525,
            longitude: 21.17380162489031,
        },
    };

    const categoryData = [
        {
            id: 1,
            name: 'Rice',
            icon: Resources.icons.rice_bowl,
        },
        {
            id: 2,
            name: 'Noodles',
            icon: Resources.icons.noodle,
        },
        {
            id: 3,
            name: 'Hot Dogs',
            icon: Resources.icons.hotdog,
        },
        {
            id: 4,
            name: 'Salads',
            icon: Resources.icons.salad,
        },
        {
            id: 5,
            name: 'Burgers',
            icon: Resources.icons.hamburger,
        },
        {
            id: 6,
            name: 'Pizza',
            icon: Resources.icons.pizza,
        },
        {
            id: 7,
            name: 'Snacks',
            icon: Resources.icons.fries,
        },
        {
            id: 8,
            name: 'Sushi',
            icon: Resources.icons.sushi,
        },
        {
            id: 9,
            name: 'Desserts',
            icon: Resources.icons.donut,
        },
        {
            id: 10,
            name: 'Drinks',
            icon: Resources.icons.drink,
        },
    ];

    // price rating
    const affordable = 1;
    const fairPrice = 2;
    const expensive = 3;

    const restaurantData = [
        {
            id: 1,
            name: 'Viva Fresh Rruga B',
            rating: 4.8,
            categories: [5, 7],
            priceRating: affordable,
            photo: Resources.images.burger_restaurant_1,
            duration: '30 - 45 min',
            //42.64624141977682, 21.170386042073936
            location: {
                latitude: 42.64624141977682,
                longitude: 21.170386042073936,
            },
            courier: {
                avatar: Resources.images.avatar_1,
                name: 'Amy',
            },
            menu: [
                {
                    menuId: 1,
                    name: 'Crispy Chicken Burger',
                    photo: Resources.images.crispy_chicken_burger,
                    description: 'Burger with crispy chicken, cheese and lettuce',
                    calories: 200,
                    price: 10,
                },
                {
                    menuId: 2,
                    name: 'Crispy Chicken Burger with Honey Mustard',
                    photo: Resources.images.honey_mustard_chicken_burger,
                    description: 'Crispy Chicken Burger with Honey Mustard Coleslaw',
                    calories: 250,
                    price: 15,
                },
                {
                    menuId: 3,
                    name: 'Crispy Baked French Fries',
                    photo: Resources.images.baked_fries,
                    description: 'Crispy Baked French Fries',
                    calories: 194,
                    price: 8,
                },
            ],
        },
        {
            id: 2,
            name: 'Viva Vresh Veternik',
            rating: 4.8,
            categories: [2, 4, 6],
            priceRating: expensive,
            photo: Resources.images.pizza_restaurant,
            duration: '15 - 20 min',
            //42.63003383354936, 21.151636311394366
            location: {
                latitude: 42.63003383354936,
                longitude: 21.151636311394366,
            },
            courier: {
                avatar: Resources.images.avatar_2,
                name: 'Jackson',
            },
            menu: [
                {
                    menuId: 4,
                    name: 'Hawaiian Pizza',
                    photo: Resources.images.hawaiian_pizza,
                    description: 'Canadian bacon, homemade pizza crust, pizza sauce',
                    calories: 250,
                    price: 15,
                },
                {
                    menuId: 5,
                    name: 'Tomato & Basil Pizza',
                    photo: Resources.images.pizza,
                    description: 'Fresh tomatoes, aromatic basil pesto and melted bocconcini',
                    calories: 250,
                    price: 20,
                },
                {
                    menuId: 6,
                    name: 'Tomato Pasta',
                    photo: Resources.images.tomato_pasta,
                    description: 'Pasta with fresh tomatoes',
                    calories: 100,
                    price: 10,
                },
                {
                    menuId: 7,
                    name: 'Mediterranean Chopped Salad ',
                    photo: Resources.images.salad,
                    description: 'Finely chopped lettuce, tomatoes, cucumbers',
                    calories: 100,
                    price: 10,
                },
            ],
        },
        {
            id: 3,
            name: 'Viva Fresh A.Krasniqi',
            rating: 4.8,
            categories: [3],
            priceRating: expensive,
            photo: Resources.images.hot_dog_restaurant,
            duration: '20 - 25 min',
            // 42.65635353405917, 21.146402811395053
            location: {
                latitude: 42.65635353405917,
                longitude: 21.146402811395053,
            },
            courier: {
                avatar: Resources.images.avatar_3,
                name: 'James',
            },
            menu: [
                {
                    menuId: 8,
                    name: 'Chicago Style Hot Dog',
                    photo: Resources.images.chicago_hot_dog,
                    description: 'Fresh tomatoes, all beef hot dogs',
                    calories: 100,
                    price: 20,
                },
            ],
        },
        {
            id: 4,
            name: 'Meridian, A.Harapi',
            rating: 4.8,
            categories: [8],
            priceRating: expensive,
            photo: Resources.images.japanese_restaurant,
            duration: '10 - 15 min',
            location: {
                latitude: 42.65190656064133,
                longitude: 21.155133343918283,
            },
            courier: {
                avatar: Resources.images.avatar_4,
                name: 'Ahmad',
            },
            menu: [
                {
                    menuId: 9,
                    name: 'Sushi sets',
                    photo: Resources.images.sushi,
                    description: 'Fresh salmon, sushi rice, fresh juicy avocado',
                    calories: 100,
                    price: 50,
                },
            ],
        },
        {
            id: 5,
            name: 'Vipros',
            rating: 4.8,
            categories: [1, 2],
            priceRating: affordable,
            photo: Resources.images.noodle_shop,
            duration: '15 - 20 min',
            location: {
                latitude: 42.65792269305009,
                longitude: 21.14605624391849,
            },
            courier: {
                avatar: Resources.images.avatar_4,
                name: 'Muthu',
            },
            menu: [
                {
                    menuId: 10,
                    name: 'Kolo Mee',
                    photo: Resources.images.kolo_mee,
                    description: 'Noodles with char siu',
                    calories: 200,
                    price: 5,
                },
                {
                    menuId: 11,
                    name: 'Sarawak Laksa',
                    photo: Resources.images.sarawak_laksa,
                    description: 'Vermicelli noodles, cooked prawns',
                    calories: 300,
                    price: 8,
                },
                {
                    menuId: 12,
                    name: 'Nasi Lemak',
                    photo: Resources.images.nasi_lemak,
                    description: 'A traditional Malay rice dish',
                    calories: 300,
                    price: 8,
                },
                {
                    menuId: 13,
                    name: 'Nasi Briyani with Mutton',
                    photo: Resources.images.nasi_briyani_mutton,
                    description: 'A traditional Indian rice dish with mutton',
                    calories: 300,
                    price: 8,
                },
            ],
        },
        {
            id: 6,
            name: 'Dimis Dessets',
            rating: 4.9,
            categories: [9, 10],
            priceRating: affordable,
            photo: Resources.images.kek_lapis_shop,
            duration: '35 - 40 min',
            location: {
                latitude: 42.624164049044026,
                longitude: 21.18716468562599,
            },
            courier: {
                avatar: Resources.images.avatar_1,
                name: 'Jessie',
            },
            menu: [
                {
                    menuId: 12,
                    name: 'Teh C Peng',
                    photo: Resources.images.teh_c_peng,
                    description: 'Three Layer Teh C Peng',
                    calories: 100,
                    price: 2,
                },
                {
                    menuId: 13,
                    name: 'ABC Ice Kacang',
                    photo: Resources.images.ice_kacang,
                    description: 'Shaved Ice with red beans',
                    calories: 100,
                    price: 3,
                },
                {
                    menuId: 14,
                    name: 'Kek Lapis',
                    photo: Resources.images.kek_lapis,
                    description: 'Layer cakes',
                    calories: 300,
                    price: 20,
                },
            ],
        },
    ];
    return { categoryData, restaurantData, initialCurrentLocation };
}

