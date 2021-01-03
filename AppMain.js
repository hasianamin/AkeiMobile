import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import SplashScreen from './src/screen/SplashScreen';
import StackRoot from './src/navigation/StackRoot';
import AuthStackRoot from './src/navigation/AuthRoot';
import axios from 'axios';
import { API_URL } from './src/helpers';


const AppMain = () => {
    const Auth = useSelector(state=>state.Auth)
    const dispatch = useDispatch()
    const [isLoading,setIsLoading] = useState(true)

    useEffect(()=>{
        AsyncStorage.getItem('iduser')
        .then((value)=>{
            if(value!==null){
                console.log(value)
                axios.get(`${API_URL}/auth/keeplogin/${value}`)
                .then((res)=> {
                    AsyncStorage.setItem('user',JSON.stringify(res.data.dataLogin))
                    .then(()=>{
                        AsyncStorage.setItem('cart',JSON.stringify(res.data.dataCart))
                        .then(()=>{
                            let obj = {...res.data.dataLogin, cartLength: res.data.dataCart.length}
                            console.log(res.data.dataCart.length)
                            dispatch({type:'LOGIN',payload:obj})
                        }).catch(()=>{
                            dispatch({type: 'ERROR'})
                        })
                    }).catch((err)=>{
                        dispatch({type: 'ERROR'})
                    }) 
                }).catch((err)=> {
                    dispatch({type: 'ERROR'})
                    console.log(err);
                })
            } else {
                setIsLoading(false)
            }
        }).catch((err)=>setIsLoading(false))
        .finally(()=>setIsLoading(false))
    },[])

    if(isLoading){
        return <SplashScreen/>
    }

    return (
        <NavigationContainer>
            {
                Auth.isLogin? <StackRoot/> : <AuthStackRoot/>
            }
        </NavigationContainer>
    )
}

export default AppMain