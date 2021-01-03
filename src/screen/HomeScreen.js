import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    FlatList,
    Image
} from 'react-native'
import { useSelector } from 'react-redux';
import { COLORS, FONTS } from '../../constants';
import CardProduct from '../components/CardProduct';
import Categories from '../components/Categories';
import { API_URL } from '../helpers';

const HomeScreen=()=>{

    const Auth = useSelector(state=>state.Auth)

    const [dataCategory,setDataCategory] = useState(null) 
    const [dataPopularProducts,setDataPopularProducts] = useState(null) 
    const [dataNewProducts,setDataNewProducts] = useState(null) 
    const [imgProfile,setImageProfile] = useState(null)

    useEffect(()=>{
        fetchCategory()
        fetchPopularProducts()
        fetchNewProducts()
        AsyncStorage.getItem('cart')
        .then((value)=>{
            console.log('cek cart')
            console.log(value)
        }).catch((err)=>console.log(err))
        AsyncStorage.getItem('user')
        .then((val)=>{
            let user = JSON.parse(val)
            setImageProfile(user.photo)
            console.log(user.photo)
        })
    },[])

    const fetchCategory = async()=>{
        await axios.get(`${API_URL}/admin/category`)
        .then((res)=>{
            setDataCategory(res.data)
            console.log(res.data)
        })
        .catch((err)=>console.log(err))
    }

    const fetchPopularProducts = async()=>{
        await axios.get(`${API_URL}/admin/popular`)
        .then((res)=>{
            setDataPopularProducts(res.data)
            console.log(res.data)
        })
        .catch((err)=>console.log(err))
    }

    const fetchNewProducts = async()=>{
        await axios.get(`${API_URL}/admin/newarrival`)
        .then((res)=>{
            setDataNewProducts(res.data)
            console.log(res.data)
        })
        .catch((err)=>console.log(err))
    }

    const renderCategory=({item})=>{
        return (
            <Categories key={item.category_id} name={item.category_name}/>
        )
    }

    const renderCard=({item})=>{
        return (
            <CardProduct key={item.product_id} product={item}/>
        )
    }

    const renderNewArrivals=()=>{
        if(dataNewProducts){
            return dataNewProducts.map((item)=>{
                return (
                    <CardProduct key={item.product_id} product={item}/>
                )
            })
        }
    }

    return (
        <ScrollView 
            showsVerticalScrollIndicator={false}
            style={{flex:1}}
            horizontal={false}
        >
            {/* banner */}
            <View style={{
                backgroundColor:COLORS.primary,
                height:100,
                borderRadius: 25,
                marginHorizontal: 14,
                marginVertical: 10,
                paddingHorizontal:16,
                paddingVertical:12,
                display: 'flex',
                flexDirection: 'row',
            }}>
                <View style={{
                    width:80,
                    height: 80,
                    backgroundColor:COLORS.gray,
                    borderRadius:100,
                    justifyContent:'center',
                    alignItems:'center',
                    marginRight:12,
                    elevation:5               
                }}>
                    <Image
                        source={{uri:API_URL+imgProfile}}
                        resizeMode='cover'
                        style={{
                            height:80,
                            width:80,
                            borderRadius:100
                        }}
                    />
                </View>
                <View>
                    <View>
                        <Text style={[FONTS.h3,{textTransform:'capitalize', color:COLORS.black}]}>Welcome, {Auth.username}</Text>
                        <Text style={FONTS.h5}>Balance:</Text>
                        <Text style={FONTS.h2}>Rp 0,00</Text>
                    </View>
                </View>
            </View>
            {/* category */}
            <FlatList 
                showsHorizontalScrollIndicator={false}
                horizontal
                data={dataCategory}
                renderItem={renderCategory}
                keyExtractor={(val)=>String(val.category_id)}
                style={{
                height:50,
                marginVertical:6,
                marginHorizontal: 14,
                }}
            />
            {/* best product */}
            <View style={{
                marginVertical:6,
                marginHorizontal: 14,
                flex:1
            }}>
                <Text style={FONTS.h2}>Popular Products</Text>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    data={dataPopularProducts}
                    renderItem={renderCard}
                    keyExtractor={(val)=>String(val.product_id)}
                    contentContainerStyle={{flexGrow: 1, justifyContent: 'space-between'}}
                    style={{
                        flex:1,
                        marginVertical:10
                    }}
                />
            </View>
            <View style={{
                marginVertical:6,
                marginHorizontal: 14,
                flex:1
            }}>
                <Text style={FONTS.h2}>New Arrivals</Text>
                <View style={{
                    display:'flex',
                    flex:1,
                    flexDirection:'row',
                    flexWrap:'wrap',
                    justifyContent:'space-between'
                }}>
                    {renderNewArrivals()}
                </View>
            </View>
        </ScrollView>
    )
}

export default HomeScreen