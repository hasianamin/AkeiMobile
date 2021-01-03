import React, { useState,useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    Image,
    TouchableWithoutFeedback,
    ImageBackground,
} from 'react-native'
import { FONTS,COLORS, images } from '../../constants';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { API_URL } from '../helpers';
import {useNavigation} from '@react-navigation/native'


const CartScreen=()=>{

    const [dataCart,setDataCart] = useState([])
    const [changeQty,setChangeQty] = useState(0)

    const navigation = useNavigation()

    const Auth = useSelector(state=>state.Auth)
    const dispatch = useDispatch()

    useEffect(()=>{
        fetchOrder()
    },[changeQty,Auth.cartLength])

    const fetchOrder=async()=>{
        await axios.get(`${API_URL}/cart/getcart/${Auth.user_id}`)
        .then((res)=>{
            setDataCart(res.data.cartData)
        }).catch((err)=>console.log(err))
    }

    const modifyQty=(type,product_id,transaction_id,quantity)=>{
        let modQty = 0
        if(type){
            modQty = quantity + 1
        } else modQty = quantity - 1
        if(modQty){
            let obj = {
                idprod: product_id,
                idtrans: transaction_id,
                quantity: modQty
            }
            axios.post(`${API_URL}/cart/updatecart`,obj)
            .then(()=>{
                setChangeQty(changeQty+1)
            }).catch((err)=>console.log(err))
        } else {
            axios.post(`${API_URL}/cart/deletecart`,{
                idtrans: transaction_id,
                idprod: product_id
            }).then(()=>{
                setChangeQty(changeQty+1)
                axios.get(`${API_URL}/cart/cartlength/${Auth.user_id}`)
                .then((res)=>{
                    dispatch({type:'ADD',payload:res.data[0].cart})
                }).catch((err)=>console.log(err))
            }).catch((err)=>console.log(err))
        }
    }

    const renderOrder=()=>{
        return dataCart.map((val,index)=>{
            return (
                <View key={index}
                    style={{
                    width:'100%',
                    display:'flex',
                    alignItems:'center',
                    flexDirection:'row',
                    backgroundColor:COLORS.white,
                    marginBottom:10,
                    borderRadius:20,
                    elevation:5
                }}>
                    <View style={{
                        width:'40%',
                        marginRight:26,
                    }}>
                        <Image source={{uri:API_URL+val.image}}
                            style={{
                                height:100,
                                width:'100%',
                                resizeMode:'contain',
                                margin:10
                            }}
                        />
                    </View>
                    <View>
                        <Text style={FONTS.h3}>{val.product_name}</Text>
                        <Text style={FONTS.h4}>Rp {val.price}</Text>
                        <View style={{
                            marginTop:10,
                            display:'flex',
                            flexDirection:'row',
                            alignItems:'center'
                        }}>
                            <TouchableWithoutFeedback onPress={()=>modifyQty(0,val.idprod,val.idtrans,val.quantity)}>
                                <View style={{
                                    backgroundColor:'white',
                                    height:28,
                                    width:28,
                                    borderRadius:28,
                                    display:'flex',
                                    alignItems:'center',
                                    justifyContent:'center',
                                    marginRight:10,
                                    elevation:5
                                }}>
                                    <Text style={FONTS.h2}>-</Text>
                                </View>
                            </TouchableWithoutFeedback> 
                            <Text>{val.quantity}</Text>
                            <TouchableWithoutFeedback onPress={()=>modifyQty(1,val.idprod,val.idtrans,val.quantity)}>
                                <View style={{
                                    backgroundColor:'white',
                                    height:28,
                                    width:28,
                                    borderRadius:28,
                                    display:'flex',
                                    alignItems:'center',
                                    justifyContent:'center',
                                    marginLeft:10,
                                    elevation:5
                                }}>
                                    <Text style={FONTS.h2}>+</Text>
                                </View>
                            </TouchableWithoutFeedback> 
                        </View>
                    </View>
    
                </View>
            )
        })
    }

    return (
        <>
            <View style={{
                paddingVertical:16,
                alignItems:'center',
                justifyContent:'center',
                backgroundColor:COLORS.primary,
                borderBottomRightRadius:30,
                borderBottomLeftRadius:30,
            }}>
                <Text style={[FONTS.h2,{color:COLORS.white}]}>
                    Cart
                </Text>
            </View>
            {
                dataCart?
                <>

                    <ScrollView showsVerticalScrollIndicator={false}
                        style={{
                        flex:1,
                        marginBottom:80,
                        paddingTop:10
                    }}>
                        <View>
                            {
                                dataCart? renderOrder() : null
                            }
                        </View>
                    </ScrollView>
                    <View style={{
                        width:'100%',
                        position:'absolute',
                        bottom:'2%',
                        display:'flex',
                        flexDirection:'row',
                        justifyContent:'center',
                        alignItems:'center',
                        elevation:5
                    }}>
                        <TouchableWithoutFeedback onPress={()=>navigation.navigate('payment',{cart: dataCart})}>
                            <View style={{
                                alignSelf:'flex-start',
                                backgroundColor: COLORS.primary,
                                width:'100%',
                                paddingVertical:20,
                                display:'flex',
                                flexDirection:'row',
                                justifyContent:'center',
                                borderRadius:24
                            }}>
                                <Text style={{color:'white'}}>Checkout</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </>
                : 
                <View style={{
                    height:'100%',
                    justifyContent:'center',
                    backgroundColor:'white',
                    paddingHorizontal:14
                }}>
                    <ImageBackground source={images.emptyCart} style={{
                        height:400,
                        resizeMode:'contain',
                        justifyContent: "center",
                        alignItems:'center'
                    }}>
                    </ImageBackground>
                    <Text style={[FONTS.h2,{textAlign:'center'}]}>Your cart is still empty</Text>
                </View>
            }
        </>
    )
}

export default CartScreen