import React, { useState } from 'react';
import {
    View,
    Text,
    ImageBackground
} from 'react-native'
import { images,FONTS } from '../../constants';

const OngoingScreen=()=>{

    const [dataOnGoing,setDataOnGoing] = useState(null)

    return (
        <View>
            {
                dataOnGoing?
                null
                :
                <View style={{
                    height:'100%',
                    justifyContent:'center',
                    backgroundColor:'white',
                    paddingHorizontal:14
                }}>
                    <ImageBackground source={images.emptyOrder} style={{
                        height:400,
                        resizeMode:'contain',
                        justifyContent: "center",
                        alignItems:'center'
                    }}>
                    </ImageBackground>
                    <Text style={[FONTS.h2,{textAlign:'center'}]}>Your order is still empty</Text>
                </View>

            }
        </View>
    )
}

export default OngoingScreen