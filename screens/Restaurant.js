/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState, useRef, useMemo, useCallback,useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Animated, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../constants';
import * as Resources from '../constants';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import PagerView from 'react-native-pager-view';
import PaginationDot from 'react-native-animated-pagination-dot';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { PrimaryButton } from '../components';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
 import { TouchableOpacity } from 'react-native';


const Restaurant = ({ navigation, route }) => {
    const [restaurant, setRestaurant] = useState();
    const [currentLocation, setCurrentLocation] = useState();
    const [currentPage, setCurrentPage] = useState(0);
    const [orderItems, setOrderItems] = useState([]);
    const [listMode,setListMode] = useState(false);
    // const scrollX = new Animated.Value(0);
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => renderListIcon(),
        });
    });

    // hooks
    const sheetRef = useRef(null);
    const snapPoints = useMemo(() => ['13%', '57%'], []);
    const renderListIcon = () => {
     return (
       <TouchableOpacity
       onPress={()=> {
           setListMode(!listMode);
       }}
            style={{
                width: 24,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Image
                source={Resources.icons.list}
                style={{
                    resizeMode: 'contain',
                    width: 24,
                    height: 24,
                    tintColor: Resources.COLORS.primary,
                }} />
        </TouchableOpacity>);
    };
    const handleSheetChange = useCallback((index) => {
        console.log('handleSheetChange', index);
    }, []);


    const editOrder = (action, menuId, price) => {
        const orderList = orderItems.slice();
        const item = orderList.filter(order => order.menuId === menuId);
        if (action === '+') {
            console.log(item.length);
            if (item.length > 0) {

                let newQty = item[0].qty + 1;
                item[0].qty = newQty;
                item[0].total = item[0].qty * price;
            } else {
                const newItem = {
                    menuId: menuId,
                    qty: 1,
                    price: price,
                    total: price,
                };
                console.log('newItem', newItem);
                orderList.push(newItem);
            }
            console.log('setOrderList', orderList);
            setOrderItems(orderList);
        } else {
            if (item.length > 0) {
                if (item[0]?.qty > 0) {
                    let newQty = item[0].qty - 1;
                    item[0].qty = newQty;
                    item[0].total = newQty * price;
                }
            }
            setOrderItems(orderList);
        }
    };

    const getOrderQty = (menuId) => {
        const orderItem = orderItems.filter(order => order.menuId === menuId);

        if (orderItem.length > 0) {
            return orderItem[0].qty;
        } else {
            return 0;
        }
    };

    const getBasketItemCount = () => {
        return orderItems.reduce((prev, next) => prev + (next.qty || 0), 0);
    };

    const sumOrder = () => {
        return orderItems.reduce((prev, next) => prev + (next.total || 0), 0).toFixed(2);
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
                    paddingHorizontal: '10%',
                    shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 1,

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

                </View>
                <Text
                    style={{textAlign:'center',
                        color: Resources.COLORS.black,
                        ...Resources.FONTS.body2,
                    }}>{item.name}</Text>
            </TouchableOpacity>);

    };
    useEffect(() => {
        setRestaurant(route.params.item);
        setCurrentLocation(route.params.currentLocation);
    }, [route.params]);
    return (
        <SafeAreaView style={[styles.container,{ paddingBottom: listMode === true ? '50%' : 0,
    }]}>
        <GestureHandlerRootView
        style ={{flex:1}}>
            {/* <Header
                leftIcon={Resources.icons.back}
                onLeftIconPress={() => navigation.goBack()}
                rightIcon={Resources.icons.list}
                title={restaurant?.name}
            /> */}
           {!listMode ?  <PagerView
                style={{ flex: 1 }}
                orientation="horizontal"
                showPageIndicator={true}
                initialPage={0}
                onPageSelected={e => setCurrentPage(e.nativeEvent.position)}
            >
                {
                    restaurant?.menu.map((item, index) => {
                        return (
                            <View
                                key={`menu-${index}`}
                                style={{ alignItems: 'center' }}
                            >
                                <View
                                    style={{
                                        height: Resources.SIZES.height * 0.35,
                                    }}>
                                    <Image
                                        source={item.photo}
                                        style={{
                                            resizeMode: 'cover',
                                            width: Resources.SIZES.width,
                                            height: '100%',
                                        }}
                                    />
                                    <View
                                        style={{
                                            position: 'absolute',
                                            bottom: -20,
                                            width: Resources.SIZES.width,
                                            height: 40,
                                            justifyContent: 'center',
                                            flexDirection: 'row',
                                        }}>


                                        <TouchableOpacity
                                            activeOpacity={0.8}
                                            onPress={() => editOrder('-', item.menuId, item.price)}
                                            style={{
                                                width: 40,
                                                backgroundColor: COLORS.white,
                                                alignItems: 'center',
                                                padding: 0,
                                                // flex: 1,
                                                justifyContent: 'center',
                                                borderTopLeftRadius: 25,
                                                borderBottomLeftRadius: 25,

                                            }}
                                        >
                                            <Text
                                                style={{ textAlign: 'center', alignSelf: 'center', color: COLORS.black, ...Resources.FONTS.body1 }}>-</Text>
                                        </TouchableOpacity>

                                        <View
                                            style={{
                                                width: 40,
                                                backgroundColor: COLORS.white,
                                                alignItems: 'center',
                                                justifyContent: 'center',

                                            }}>
                                            <Text
                                                style={{ color: COLORS.black, ...Resources.FONTS.h2 }}>{getOrderQty(item.menuId)}</Text>
                                        </View>
                                        <TouchableOpacity
                                            activeOpacity={0.8}
                                            onPress={() => editOrder('+', item.menuId, item.price)}
                                            style={{
                                                width: 40,
                                                backgroundColor: COLORS.white,
                                                alignItems: 'center',
                                                padding: 0,
                                                // flex: 1,
                                                justifyContent: 'center',
                                                borderTopRightRadius: 25,
                                                borderBottomRightRadius: 25,

                                            }}
                                        >
                                            <Text
                                                style={{ color: COLORS.black, ...Resources.FONTS.body1 }}>+</Text>
                                        </TouchableOpacity>

                                    </View>

                                </View>
                                <View
                                    style={{
                                        width: Resources.SIZES.width,
                                        alignItems: 'center',
                                        marginTop: 15,
                                        paddingHorizontal: Resources.SIZES.padding * 2,

                                    }}>
                                    <Text
                                        style={{ color: COLORS.primary, marginVertical: 10, textAlign: 'center', ...Resources.FONTS.h3 }}>{item.name} - {item.price.toFixed(2)}</Text>
                                    <Text style={{ textAlign: 'center', color: COLORS.black, ...Resources.FONTS.body3 }}>{item.description}</Text>

                                    <View style={{
                                        flexDirection: 'row',
                                        marginTop: 10,
                                    }}>
                                        <Image
                                            source={Resources.icons.fire}
                                            style={{
                                                width: 20,
                                                height: 20,
                                                marginRight: 10,
                                            }}
                                        />
                                        <Text
                                            style={{
                                                ...Resources.FONTS.body3, color: COLORS.darkgray,
                                            }}>{item.calories.toFixed(2)} cal</Text>
                                    </View>
                                </View>
                            </View>
                        );
                    })
                }
            </PagerView> :
            <FlatList
            contentContainerStyle={{
                paddingTop:"5%",
                paddingBottom:"20%"
            }}
        data={restaurant?.menu}
        renderItem={ ({item}, index) =>  {
            console.log(item);
         return <ItemRestaurant item={item}/>;
        }
        }
        keyExtractor={({index}) => index}
      /> }
            <View
                style={{
                    position: 'absolute',
                    alignItems: 'center',
                    alignSelf: 'center',
                    paddingBottom: 0,
                    bottom: snapPoints[0],
                    right: 0,
                    left: 0,
                }}>
              {!listMode ?  <PaginationDot

                    activeDotColor={COLORS.primary}
                    curPage={currentPage}
                    maxPage={restaurant?.menu.length ? restaurant?.menu.length : 1}
                />
              : null}
            </View>
            <BottomSheet
                ref={sheetRef}
                index={0}
                snapPoints={snapPoints}
                onChange={handleSheetChange}>
                <BottomSheetScrollView
                    contentContainerStyle={{ flex: 1, backgroundColor: COLORS.white, justifyContent: 'space-between' }}>
                    <View>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                paddingVertical: Resources.SIZES.padding * 2,
                                paddingHorizontal: Resources.SIZES.padding * 3,
                                borderBottomColor: COLORS.lightGray,
                                borderBottomWidth: 1,

                            }}>
                            <Text
                                style={{
                                    ...Resources.FONTS.h3, color: COLORS.black,
                                }}>{getBasketItemCount()} items in Cart</Text>
                            <Text
                                style={{
                                    ...Resources.FONTS.h3, color: COLORS.black,
                                }}>${sumOrder()}</Text>

                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                paddingVertical: Resources.SIZES.padding * 2,
                                paddingHorizontal: Resources.SIZES.padding * 3,

                            }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                }}>

                                <Image
                                    source={Resources.icons.pin}
                                    style={{
                                        resizeMode: 'contain',
                                        width: 20,
                                        height: 20,
                                        tintColor: COLORS.darkgray,
                                    }}
                                />
                                <Text
                                    style={{
                                        color: COLORS.black, marginLeft: Resources.SIZES.padding, ...Resources.FONTS.h4,
                                    }}>Location</Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                }}>
                                <Image
                                    source={Resources.icons.master_card}
                                    style={{
                                        resizeMode: 'contain',
                                        width: 20,
                                        height: 20,
                                        tintColor: COLORS.darkgray,
                                    }}
                                />
                                <Text
                                    style={{ color: COLORS.black, marginLeft: Resources.SIZES.padding, ...Resources.FONTS.h4 }}>8888</Text>
                            </View>
                        </View>
                    </View>
                    <PrimaryButton
                        text="Order"
                        onPress={() => {
                            navigation.navigate(
                                'OrderDelivery',  {
                                    restaurant: restaurant,
                                    currentLocation: currentLocation,
                                }

                            );
                        }}
                    />
                </BottomSheetScrollView>
            </BottomSheet>

</GestureHandlerRootView>
        </SafeAreaView>

    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGray2,
    },
});
export default Restaurant;
