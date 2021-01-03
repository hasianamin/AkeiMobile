import React, { useState,useEffect } from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {View, Text} from 'react-native'
import {Icon} from 'native-base'
import ProfileScreen from '../screen/ProfileScreen';
import HomeScreen from './../screen/HomeScreen';
import ProductScreen from './../screen/ProductScreen'
import CartScreen from './../screen/CartScreen'
import {COLORS} from './../../constants'
import {Badge} from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage'
import TopTab from './TopTabRoot';
import {useSelector} from 'react-redux'



const Tab=createBottomTabNavigator()

const TabRoot=()=>{

    const [badgeValue,setBadgeValue] = useState(0)

    const Auth = useSelector(state=>state.Auth)

    useEffect(()=>{
        setBadgeValue(Auth.cartLength)
    },[Auth.cartLength])

    return (
        <Tab.Navigator
        screenOptions={({route})=>({
            tabBarIcon:({focused,color})=>{
                let iconName, type
                if(route.name==='home'){
                    iconName='home'
                    type='FontAwesome5'
                } else if(route.name==='toptab'){
                    iconName='history'
                    type='FontAwesome5'
                }else if (route.name === 'product'){
                    iconName='search'
                    type='FontAwesome5'
                } else if(route.name === 'cart'){
                    iconName='shopping-cart'
                    type='FontAwesome5'
                } else {
                    iconName='user'
                    type='FontAwesome5'
                }
                return (
                    <View>
                        <Icon name={iconName} type={type} style={{fontSize:22,color}}  />
                        {
                            route.name === 'cart'?
                            <Badge
                                value={badgeValue}
                                status='error'
                                containerStyle={{
                                    position: 'absolute',
                                    top: -8,
                                    right: -10,
                                    elevation:10
                                }}
                            />
                            : null
                        }
                    </View>
                )
            },
            tabBarLabel:()=>{
                return null
            }
        })}

        tabBarOptions={{
            activeTintColor:COLORS.primary,
            inactiveTintColor:'#B5D2DE'
        }}>
            <Tab.Screen name='home' component={HomeScreen}/>
            <Tab.Screen name='toptab' component={TopTab}/>
            <Tab.Screen name='product' component={ProductScreen}/>
            <Tab.Screen name='cart' component={CartScreen}/>
            <Tab.Screen name='profile' component={ProfileScreen}/>
        </Tab.Navigator>
    )
}

export default TabRoot