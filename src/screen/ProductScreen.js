import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    FlatList
} from 'react-native'
import { useSelector } from 'react-redux';
import { COLORS, FONTS } from '../../constants';
import CardProduct from '../components/CardProduct';
import Categories from '../components/Categories';
import { API_URL } from '../helpers';

const ProductScreen=()=>{

    const Auth = useSelector(state=>state.Auth)

    const [dataCategory,setDataCategory] = useState(null) 
    const [dataProducts,setDataProducts] = useState(null) 

    useEffect(()=>{
        fetchCategory()
        fetchProducts()
    },[])

    const fetchCategory = async()=>{
        await axios.get(`${API_URL}/admin/category`)
        .then((res)=>{
            setDataCategory(res.data)
            console.log(res.data)
        })
        .catch((err)=>console.log(err))
    }

    const fetchProducts = async()=>{
        await axios.get(`${API_URL}/admin/getallproduct`)
        .then((res)=>{
            setDataProducts(res.data)
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

    const renderProducts=()=>{
        if(dataProducts){
            return dataProducts.map((item)=>{
                return (
                    <CardProduct key={item.product_id} product={item}/>
                )
            })
        }
    }

    return (
        <>
        {/* category */}
        <FlatList 
            showsHorizontalScrollIndicator={false}
            horizontal
            data={dataCategory}
            renderItem={renderCategory}
            keyExtractor={(val)=>String(val.category_id)}
            style={{
                height:50,
                marginBottom:8,
                marginTop:12,
                marginHorizontal: 14,
            }}
        />
        <ScrollView 
            showsVerticalScrollIndicator={false}
            horizontal={false}
            style={{height:800}}
        >
            <View style={{
                marginVertical:6,
                marginHorizontal: 14,
                flex:1
            }}>
                <Text style={FONTS.h2}>Our Products</Text>
                <View style={{
                    display:'flex',
                    flex:1,
                    flexDirection:'row',
                    flexWrap:'wrap',
                    justifyContent:'space-between'
                }}>
                    {renderProducts()}
                </View>
            </View>
        </ScrollView>
        </>
    )
}

export default ProductScreen