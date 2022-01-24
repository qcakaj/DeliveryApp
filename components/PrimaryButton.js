/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS, FONTS, SIZES } from '../constants';


export default ({borderRadius, width, text, onPress,color}) => {
return (
    <View
    style ={{
        padding:SIZES.padding * 2,
        alignItems:'center',
        justifyContent: 'center',

    }}>
     <TouchableOpacity
     onPress={onPress}
     style={{
         width:width ?  width : SIZES.width * 0.9,
         padding: SIZES.padding,
         backgroundColor: color ? color : COLORS.primary,
         alignItems: 'center',
         borderRadius: borderRadius ? borderRadius : SIZES.radius,
     }}>
       <Text
       style={{color:COLORS.white,...FONTS.h2}}>{text}</Text>
     </TouchableOpacity>
    </View>
);
};
