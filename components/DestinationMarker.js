

import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Marker } from 'react-native-maps';
import * as Resources from '../constants';

export default ({ toLocation }) => {
    return (<Marker
        coordinate={toLocation}>
        <View
            style={styles.parent}>
            <View
                style={styles.imageContainer}>
                <Image
                    source={Resources.icons.pin}
                    style={styles.image}
                />
            </View>
        </View>
    </Marker>);
};

const styles = StyleSheet.create({
    parent : {
        height: 40,
        width: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Resources.COLORS.white,

    },
    image: {
        width: 25,
        height: 25,
        tintColor: Resources.COLORS.white,
    },
    imageContainer: {
        height: 30,
        width: 30,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Resources.COLORS.primary,

    },
});
