import React from 'react';
import {
    View,
    Text, TouchableOpacity,
    Image,
    StyleSheet,
} from 'react-native';
import * as Resources from '../constants';

export default ({ leftIcon,onLeftIconPress, rightIcon,onRighticonPress, title }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.leftBtn}
                onPress={onLeftIconPress}>
                <Image
                    source={leftIcon}
                    style={styles.icon} />
            </TouchableOpacity>

            <View style={styles.titleContainer}>
                <View
                    style={styles.titleBackground}>
                    <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={[{ ...Resources.FONTS.h3 }, { color: Resources.COLORS.black }]}>{title}</Text>
                </View>
            </View>

            <TouchableOpacity
            onPress={onRighticonPress}
                style={styles.rightBtn}>
                <Image
                    source={rightIcon}
                    style={styles.icon} />
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    icon: {
        resizeMode: 'contain',
        width: 24,
        height: 24,
        tintColor:Resources.COLORS.primary,
    },
    container: {
        flexDirection: 'row',
        height: '8%',
        marginBottom:10,
    },
    titleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Resources.SIZES.padding * 1.2,
    },
    titleBackground: {
        width: '90%',
        height: '100%',
        backgroundColor: Resources.COLORS.lightGray3,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Resources.SIZES.radius,

    },
    leftBtn: {
        width: 50,
        paddingLeft: Resources.SIZES.padding * 2,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: Resources.SIZES.padding * 1.2,

    },
    rightBtn: {
        width: 50,
        paddingRight: Resources.SIZES.padding * 2,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: Resources.SIZES.padding * 1.2,


    },
});
