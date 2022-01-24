/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import MapView, { PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import * as Resources from '../constants';
import axios from 'axios';
import { CarMarker, DestinationMarker, PrimaryButton } from '../components';
import { GestureHandlerRootView } from 'react-native-gesture-handler';



const OrderDelivery = ({ navigation, route }) => {
    const mapView = useRef();
    const [restaurant, setRestaurant] = useState(null);
    const [streetName, setStreetName] = useState('');
    const [fromLocation, setFromLocation] = useState(null);
    const [toLocation, setToLocation] = useState(null);
    const [region, setRegion] = useState(null);
    const [coordinates, setCoordinates] = useState([]);
    const [polySummary, setPolySummary] = useState({});



    useEffect(() => {

        const { restaurant, currentLocation } = route.params;
        const fromLoc = currentLocation.gps;
        const toLoc = restaurant.location;
        const street = currentLocation.streetName;
        const mapRegion = {
            latitude: (fromLoc.latitude + toLoc.latitude) / 2,
            longitude: (fromLoc.longitude + toLoc.longitude) / 2,
            latitudeDelta: Math.abs(fromLoc.latitude - toLoc.latitude) * 2,
            longitudeDelta: Math.abs(fromLoc.longitude - toLoc.longitude) * 2,

        };
        setRestaurant(restaurant);
        setStreetName(street);
        setFromLocation(fromLoc);
        setToLocation(toLoc);
        setRegion(mapRegion);
        const testArray = [];
        const fetchData = async () => {
            const result = await axios(
                `https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf6248025138ad0ae84b01a8736fbcaf8a312c&start=${fromLoc.longitude},${fromLoc.latitude}&end=${toLoc.longitude},${toLoc.latitude}`,
            );
            result.data.features[0].geometry.coordinates.forEach(element => {
                testArray.push({ latitude: element[1], longitude: element[0] });
                // polyLineCoordinates.push({latitude:element[0], longitude: element[1]});
            });
            setCoordinates(testArray);
            setPolySummary(result.data.features[0].properties.summary);
            setStreetName(result.data.features[0].properties.segments[0].steps[0].name);


            // setPolyLineData({ coordinates: testArray, summary: result.data.features[0].properties.summary });

            // onDataReceived(testArray,false);

            // setPolyLineCoordinates(...polyLineCoordinates);
            //   setData(result.data);
        };


        fetchData();

    }, [route.params]);





    const calculateAngle = (coordinates) => {
        let angle;
        try {
            const startLat = coordinates[0].latitude;
            const startLng = coordinates[0].longitude;
            const endLat = coordinates[1].latitude;
            const endLng = coordinates[1].longitude;
            const dx = endLat - startLat;
            const dy = endLng - startLng;
            angle = Math.atan2(dy, dx) * 180 / Math.PI;
        } catch {
            angle = 0;
        }
        return angle;



    };


    return (
        <View
            style={{
                flex: 1,
            }}>
            <GestureHandlerRootView
                style={{ flex: 1 }}>

                <MapView
                    provider={PROVIDER_GOOGLE}
                    initialRegion={region}
                    ref={mapView}
                    style={{ flex: 1, ...StyleSheet.absoluteFillObject }}>
                    <Polyline
                        coordinates={coordinates}
                        fillColor="rgba(255,0,0,0.5)"
                        strokeColor={Resources.COLORS.primary} // fallback for when `strokeColors` is not supported by the map-provider
                        strokeWidth={6}
                    />
                    <DestinationMarker toLocation={toLocation} />
                    <CarMarker fromLocation={fromLocation} angle={(coordinates !== undefined) ? calculateAngle(coordinates) : 90} />
                </MapView>
                <View
                    style={{
                        position: 'absolute',
                        top: 50,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: 50,
                        alignItems: 'center',
                        justifyContent: 'center',

                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: Resources.SIZES.width * 0.9,
                            paddingVertical: Resources.SIZES.padding,
                            paddingHorizontal: Resources.SIZES.padding,
                            borderRadius: Resources.SIZES.radius,
                            backgroundColor: Resources.COLORS.white,

                        }}>
                        <Image
                            source={Resources.icons.red_pin}
                            style={{
                                width: 30,
                                height: 30,
                                marginRight: Resources.SIZES.padding,

                            }}
                        />
                        <View
                            style={{
                                flex: 1,
                            }}>

                            <Text
                                style={{
                                    color: Resources.COLORS.black,
                                    ...Resources.FONTS.body3,
                                }}>{streetName}</Text>
                        </View>
                        <Text
                            style={{
                                color: Resources.COLORS.black,
                                ...Resources.FONTS.body3,
                            }}>{Math.ceil(polySummary.duration / 100)} mins</Text>
                    </View>
                </View>
                <View
                    style={{
                        position: 'absolute',
                        bottom: 50,
                        left: 0,
                        right: 0,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <View
                        style={{
                            width: Resources.SIZES.width * 0.9,
                            paddingVertical: Resources.SIZES.padding * 3,
                            // paddingHorizontal:Resources.SIZES.padding * 2,
                            borderRadius: Resources.SIZES.radius,
                            backgroundColor: Resources.COLORS.white,

                        }}>
                        <View
                            style={{
                                flexDirection: 'row', alignItems: 'center',
                            }}>
                            <Image
                                source={restaurant?.courier.avatar}
                                style={{
                                    width: 50,
                                    height: 50,
                                    borderRadius: 25,
                                    marginStart: Resources.SIZES.padding * 0.9

                                }}
                            />
                            <View style={{
                                flex: 1,
                                marginLeft: Resources.SIZES.padding,
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                }}>
                                    <Text style={{ color: Resources.COLORS.black, ...Resources.FONTS.h4 }}>{restaurant?.courier.name}</Text>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}>
                                        <Image
                                            source={Resources.icons.star}
                                            style={{
                                                width: 18,
                                                height: 18,
                                                tintColor: Resources.COLORS.primary,
                                                 marginRight: Resources.SIZES.padding * 0.3,
                                            }}
                                        />
                                        <Text style={{
                                            color: Resources.COLORS.black, ...Resources.FONTS.body3, paddingEnd: Resources.SIZES.padding * 2,
                                        }}>{restaurant?.rating}</Text>
                                    </View>
                                </View>
                                <Text style={{
                                    color: Resources.COLORS.darkgray,
                                    ...Resources.FONTS.body4,
                                }}>{restaurant?.name}</Text>
                            </View>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                marginTop: Resources.SIZES.padding * 2,
                                justifyContent: 'space-between',
                            }}>

                            <PrimaryButton
                                width={Resources.SIZES.width / 3}
                                borderRadius={10}
                                text="Call"
                                onPress={() => {
                                    navigation.navigate('Home');
                                }}
                            />
                            <PrimaryButton
                                color={Resources.COLORS.darkgray}
                                width={Resources.SIZES.width / 3}
                                borderRadius={10}
                                text="Cancel"
                                onPress={() => {
                                    navigation.goBack();
                                }}
                            />
                        </View>

                    </View>
                </View>
            </GestureHandlerRootView>
        </View>

    );
};

export default OrderDelivery;
