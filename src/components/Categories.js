import React from 'react';
import {
    View,
    Text
} from 'react-native'
import { COLORS } from '../../constants';
import LinearGradient from 'react-native-linear-gradient'


const Categories=(props)=>{
    return (
        <LinearGradient
            style={{
                paddingHorizontal:26,
                paddingVertical:8,
                marginRight:8,
                alignItems:'center',
                justifyContent:'center',
                borderRadius: 20
            }}
            colors={[COLORS.gray,COLORS.gray]}
            start={{x:0,y:0}}
            end={{x:1,y:1}}
        >
            <Text style={{
                color:'white'
            }}>{props.name}</Text>
        </LinearGradient>
    )

}

export default Categories