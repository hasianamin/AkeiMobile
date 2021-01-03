import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableWithoutFeedback,
    Image
} from 'react-native'
import { API_URL, PriceFormatter } from '../helpers';
import axios from 'axios'
import {Icon, } from 'react-native-elements'
import { COLORS, FONTS } from '../../constants';
import { useSelector } from 'react-redux';





const PaymentScreen=({route,navigation})=>{

    const {cart} = route.params

    const Auth = useSelector(state=>state.Auth)

    const [dataCart,setDataCart] = useState(null)
    
    useEffect(()=>{
        setDataCart(cart)
        console.log(cart)
    },[])

    const renderItem=()=>{
        return dataCart.map((val,index)=>{
            return (
                <View key={index} style={{
                    flexDirection:'column',
                    backgroundColor:'white',
                    marginVertical:8,
                    paddingVertical:12,
                    paddingHorizontal:10,
                    borderRadius:10,
                    elevation:5
                }}>
                    <View style={{
                        flex:1,
                        flexDirection:'row',
                    }}>
                        <View style={{
                            flexBasis:'10%'
                        }}>
                            <Text style={FONTS.h3}>{index+1}</Text>
                        </View>
                        <View style={{flexBasis:'90%'}}>
                            <Text style={FONTS.h3}>{val.product_name}</Text>
                            <View>
                                <Text>{val.price} x {val.quantity}</Text>
                            </View>
                        </View>
                    </View>
                    <View>
                        <Text style={[FONTS.h2,{textAlign:'right'}]}>Rp {PriceFormatter(val.quantity * val.price)}</Text>
                    </View>
                </View>
            )
        })
    }
    
    return (
        <>
            <View style={{
                display:'flex',
                flexDirection:'row',
                alignItems:'center',
                marginHorizontal:14,
                marginTop:10,
                justifyContent:'space-between'
            }}>
                <View style={{
                    padding:10,
                    borderRadius:100,
                    backgroundColor:COLORS.primary,
                    elevation: 5,
                    marginRight:20
                }}>
                    <TouchableWithoutFeedback onPress={()=>navigation.goBack()}>
                        <Icon
                            type='Ionicons'
                            color='white'
                            name='arrow-back'
                            size={24}
                        />
                    </TouchableWithoutFeedback>
                </View>
                <Text style={FONTS.h2}>Payment</Text>
                <View style={{
                    padding:10,
                    borderRadius:100,
                    backgroundColor:COLORS.primary,
                    elevation: 5,
                }}>
                    <TouchableWithoutFeedback onPress={()=>navigation.navigate('cart')}>
                        <View>
                            <Icon
                                    type='Ionicons'
                                    color='white'
                                    name='arrow-forward'
                                    size={24}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} style={{
                flex:1,
                marginHorizontal:14,
                marginTop:10
            }}>
                {
                    dataCart?
                    <View style={{
                        display:'flex',
                        flexDirection:'column',
                        justifyContent:'center',
                        marginBottom:112
                    }}>
                        <View style={{
                            marginTop:10
                        }}>
                            {renderItem()}
                        </View>
                    </View>
                    :null
                }
            </ScrollView>
            <View style={{
                width:'100%',
                position:'absolute',
                bottom:'5%',
                display:'flex',
                flexDirection:'row',
                justifyContent:'center',
                alignItems:'center'
            }}>
                <View>
                    <TouchableWithoutFeedback>
                        <View style={{
                            alignSelf:'flex-start',
                            backgroundColor: COLORS.primary,
                            width:'100%',
                            paddingVertical:24,
                            display:'flex',
                            flexDirection:'row',
                            justifyContent:'center',
                            borderRadius:24,
                            elevation:5
                        }}>
                            <Text style={{textAlign:'center',color:'white', marginLeft:10}}>Submit</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        </>
    )
}



export default PaymentScreen