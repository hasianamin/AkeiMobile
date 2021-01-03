import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableWithoutFeedback,
    Image
} from 'react-native'
import { API_URL } from '../helpers';
import axios from 'axios'
import {Icon, Badge} from 'react-native-elements'
import { COLORS, FONTS } from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux';




const ProductDetails=({route,navigation})=>{
    const {product_id} = route.params

    const Auth = useSelector(state=>state.Auth)
    const dispatch = useDispatch()

    const [product,setProduct] = useState(null)
    const [toggle, setToggle] = useState(false)
    const [qty,setQty] = useState(1)
    const [badgeValue,setBadgeValue] = useState(null)

    useEffect(()=>{
        fetchDetailProduct()
    },[])

    useEffect(()=>{
        setBadgeValue(Auth.cartLength)
    },[Auth.cartLength])

    const fetchDetailProduct=async()=>{
        await axios.get(`${API_URL}/admin/getproduct/${product_id}`)
        .then((res)=>{
            setProduct(res.data[0])
            console.log(res.data[0])
        }).catch((err)=>console.log(err))
    }

    const modQty=(type)=>{
        if(type === 1){
            setQty(qty+1)
        } else{
            if(qty===1) {
                setToggle(false)
                setQty(1)
            }else{
                setQty(qty-1)
            }
        }
    }

    const addToCart=()=>{
        console.log('item added ' + qty)
        axios.post(`${API_URL}/cart/gettrx`,{
            user_id : Auth.user_id,
            product_id: product_id,
            quantity: qty
        }).then(()=>{
            axios.get(`${API_URL}/cart/cartlength/${Auth.user_id}`)
            .then((res)=>{
                dispatch({type:'ADD',payload:0})
                dispatch({type:'ADD',payload:res.data[0].cart})
                setToggle(false)
                setQty(1)
            }).catch((err)=>console.log(err))
        }).catch((err)=>console.log(err))
    }

    useEffect(()=>{
        console.log(qty)
    })

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
                <Text style={FONTS.h2}>{product.product_name}</Text>
                <View style={{
                    padding:10,
                    borderRadius:100,
                    backgroundColor:COLORS.primary,
                    elevation: 5,
                }}>
                    <TouchableWithoutFeedback onPress={()=>navigation.navigate('cart')}>
                        <View>
                            <Icon
                                type='FontAwesome5'
                                color='white'
                                name='shopping-cart'
                                size={24}
                            />
                            {
                                badgeValue > 0 ?
                                <Badge
                                    value={badgeValue}
                                    status='error'
                                    containerStyle={{
                                        position: 'absolute',
                                        top: -8,
                                        right: -10,
                                        elevation:10
                                    }}
                                /> : null
                            }
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} style={{
                flex:1,
                marginHorizontal:14,
            }}>
                {
                    product?
                    <View style={{
                        display:'flex',
                        flexDirection:'column',
                        justifyContent:'center',
                    }}>
                        <Image source={{uri:API_URL+product.image}}
                            style={{
                                height:320,
                                width:'100%',
                                resizeMode:'contain',
                                marginTop:56
                            }}
                        />
                        <View style={{
                            marginTop:24,
                            marginBottom:112
                        }}>
                            <View style={{
                                backgroundColor:COLORS.gray,
                                alignSelf: 'flex-start',
                                paddingHorizontal:12,
                                paddingVertical:8,
                                borderRadius:12,
                                marginBottom:10
                            }}>
                                <Text style={[FONTS.h3,{color:'white'}]}>{product.category_name}</Text>
                            </View>
                            <Text style={[FONTS.h2,{marginBottom:10}]}>Rp {product.price}</Text>
                            <Text>Description:</Text>
                            <Text style={FONTS.h3}>{product.description}</Text>
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
                alignItems:'center',
            }}>
                <View>
                    {
                        toggle?
                        <TouchableWithoutFeedback onPress={()=>setToggle(true)}>
                            <View style={{
                                alignSelf:'flex-start',
                                backgroundColor:COLORS.primary,
                                width:'100%',
                                paddingVertical:18,
                                display:'flex',
                                flexDirection:'row',
                                justifyContent:'center',
                                alignItems:'center',
                                borderRadius:24,
                                marginBottom:8,
                                elevation:5
                            }}>
                                <TouchableWithoutFeedback onPress={()=>modQty(2)}>
                                    <View style={{
                                        backgroundColor:'white',
                                        height:28,
                                        width:28,
                                        borderRadius:28,
                                        display:'flex',
                                        alignItems:'center',
                                        justifyContent:'center',
                                        elevation:5
                                    }}>
                                        <Text style={FONTS.h2}>-</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                                <Text style={{textAlign:'center',color:'black', marginHorizontal:14, fontSize:22}}>{qty}</Text>
                                <TouchableWithoutFeedback onPress={()=>modQty(1)}>
                                    <View style={{
                                        backgroundColor:'white',
                                        height:28,
                                        width:28,
                                        borderRadius:28,
                                        display:'flex',
                                        alignItems:'center',
                                        justifyContent:'center',
                                        elevation:5
                                    }}>
                                        <Text style={FONTS.h2}>+</Text>
                                    </View>
                                </TouchableWithoutFeedback>                                
                            </View>
                        </TouchableWithoutFeedback>
                        : null
                    }
                    <TouchableWithoutFeedback onPress={ toggle? ()=>addToCart() : ()=>setToggle(true)}>
                        <View style={{
                            alignSelf:'flex-start',
                            backgroundColor: toggle? COLORS.gray : COLORS.primary,
                            width:'100%',
                            paddingVertical:24,
                            display:'flex',
                            flexDirection:'row',
                            justifyContent:'center',
                            borderRadius:24,
                            elevation:5
                        }}>
                            {
                                toggle?
                                <Text style={{textAlign:'center',color:'white', marginLeft:10}}>Add</Text>
                                :
                                <>
                                    <Icon
                                        type='FontAwesome5'
                                        color='white'
                                        name='shopping-cart'
                                        size={24}
                                    />
                                    <Text style={{textAlign:'center',color:'white', marginLeft:10}}>Add to Cart</Text>
                                </>
                            }
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        </>
    )
}



export default ProductDetails