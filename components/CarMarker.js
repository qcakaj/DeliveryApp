import React from 'react';
import { Marker } from 'react-native-maps';
import { Image, StyleSheet } from 'react-native';
import * as Resources from '../constants';


export default ({ fromLocation, angle }) => {
    return (
        <Marker
            coordinate={fromLocation}
            anchor={{ x: 0.5, y: 0.5 }}
            flat={true}
        >
            <Image

                source={Resources.icons.car}
                style={{
                    transform: [{ rotate: `${angle}deg` }],
                    ...styles.image,
                }}
            />
        </Marker>
    );
};
const styles = StyleSheet.create({
    image: {
        width: 40,
        height: 40,
    },
});
