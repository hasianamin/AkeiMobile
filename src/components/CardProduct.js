import React, {useState,useEffect} from 'react';
import {
    View,
    Text,
    Image,
    Dimensions,
    TouchableWithoutFeedback 
} from 'react-native'
import { COLORS, FONTS } from '../../constants';
import { API_URL, PriceFormatter } from '../helpers';
import { useNavigation } from '@react-navigation/native'
import LinearGradient from 'react-native-linear-gradient'

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

const CardProduct=(props)=>{

    const navigation = useNavigation()

    const [dimensions, setDimensions] = useState({ window, screen });
    const onChange = ({ window, screen }) => {
        setDimensions({ window, screen });
    };
    
    useEffect(() => {
        Dimensions.addEventListener("change", onChange);
        return () => {
            Dimensions.removeEventListener("change", onChange);
        };
    });

    return (
        <TouchableWithoutFeedback onPress={()=>navigation.navigate('detail',{product_id:props.product.product_id})}>
            <View style={{
                width:dimensions.screen.width/2-22,
                height:230,
                justifyContent:'center',
                marginBottom:12,
                borderRadius: 20,
                display:'flex',
                flexDirection:'column',
                elevation: 5
            }}>
                <LinearGradient
                        style={{
                            flex:1,
                            alignItems:'center',
                            justifyContent:'center',
                            borderRadius:15
                        }}
                        colors={[COLORS.primary,'#fff']}
                        start={{x:0.3,y:0}}
                        end={{x:0,y:1}}
                >
                    <View style={{
                        height:'60%'
                    }}>
                        <Image
                            source={{uri:API_URL+props.product.image}}
                            resizeMode='contain'
                            style={{
                                height:'100%',
                                width:159
                            }}
                        />

                    </View>
                    <View style={{ 
                        display:'flex',
                        justifyContent:'center',
                        alignItems:'center',
                        resizeMode:'contain'
                    }}>
                        <Text style={{textAlign:'right', fontSize:16,fontWeight:'600',color:COLORS.black}}>{props.product.product_name}</Text>
                        <Text style={[{color:'#355070',fontSize:16,fontWeight:'700'}]}>Rp {PriceFormatter(props.product.price)}</Text>
                    </View>
                </LinearGradient>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default CardProduct