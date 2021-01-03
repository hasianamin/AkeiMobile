import React, { useState } from 'react';
import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native'
import { images, FONTS } from '../../constants';
import {Input, Icon, Button} from 'react-native-elements'
import {useDispatch,useSelector} from 'react-redux'
import axios from 'axios';
import { API_URL } from '../helpers';
import AsyncStorage from '@react-native-async-storage/async-storage';


const LoginScreen=({navigation})=>{

    const Auth=useSelector(state=>state.Auth)
    const dispatch=useDispatch()

    const [onFocus,setOnFocus] = useState({status:false, type:0})
    const [isVisible,setIsVisible] = useState(true)
    const [dataUser,setDataUser] = useState({
        email: '',
        password: ''
    })

    const onInputEmail=(text)=>{
        if(text) setDataUser({...dataUser,email:text})
    }

    const onInputPassword=(text)=>{
        if(text) setDataUser({...dataUser,password:text})
    }

    const onLoginPress=()=>{
        if(dataUser.email && dataUser.password) {
            dispatch({type:'LOADING'})
            axios.post(`${API_URL}/auth/login`,{
                emailuser: dataUser.email,
                password: dataUser.password
            })
            .then((res)=>{
                let id = res.data.dataLogin.user_id+''
                console.log('masuk sini dong')
                console.log(id)
                AsyncStorage.setItem('iduser',id)
                .then(()=>{
                    dispatch({type:'LOGIN',payload:res.data.dataLogin,cart:res.data.dataCart})
                }).catch((err)=>{
                    alert(err)
                })                
            }).catch((err)=>{
                console.log(err)
                dispatch({type:'ERROR'})
            })
        } else {
            
        }
    }

    return (
        <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
            <View style={styles.container}>
                <ImageBackground source={images.loginBg} style={styles.image}>
                    <View style={{
                        width:'100%',
                        backgroundColor:'white',
                        height:'65%',
                        position: 'absolute',
                        bottom:0,
                        opacity:0.85,
                        borderTopLeftRadius: 25,
                        borderTopRightRadius: 25,
                        paddingHorizontal:30,
                        paddingTop:40
                    }}>
                        <Text style={[{...FONTS.h2},{textAlign:'center', marginBottom:15, marginTop:-5}]}>Welcome to Akei</Text>
                        <Input
                            value={dataUser.email}
                            onChangeText={onInputEmail}
                            leftIcon={{type:'font-awesome',name:'user',color:'black'}}
                            inputContainerStyle={{borderColor:onFocus.status && (onFocus.type===1)?'black':'gray'}}
                            label={'Email'}
                            labelStyle={styles.primaryColor}
                            inputStyle={styles.primaryColor}
                            onFocus={()=>setOnFocus({status:true,type:1})}
                            onBlur={()=>setOnFocus({status:false,type:0})}
                        />
                        <Input
                            value={dataUser.password}
                            onChangeText={onInputPassword}
                            leftIcon={{type:'font-awesome',name:'lock',color:'black'}}
                            inputContainerStyle={{borderColor:onFocus.status && (onFocus.type===1)?'black':'gray'}}
                            label={'Password'}
                            secureTextEntry={isVisible}
                            labelStyle={styles.primaryColor}
                            inputStyle={styles.primaryColor}
                            onFocus={()=>setOnFocus({status:true,type:2})}
                            onBlur={()=>setOnFocus({status:false,type:0})}
                            rightIcon={
                                <Icon
                                  type='font-awesome'
                                  name={isVisible?'eye-slash':'eye'}
                                  color={isVisible?'gray':'black'}
                                  onPress={()=>setIsVisible(!isVisible)}
                                />
                            }
                        />
                        <Button
                            title='Login'
                            loading={Auth.isLoading}
                            onPress={()=>onLoginPress()}
                            buttonStyle={{
                                marginTop:10
                            }}
                        />
                        <Button
                            title='Register'
                            loading={Auth.isLoading}
                            onPress={()=>navigation.navigate('register')}
                            buttonStyle={{
                                marginTop:10,
                                backgroundColor:'gray'
                            }}
                        />

                    </View>
                </ImageBackground>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    image: {
        flex: 1,
        resizeMode:'cover',
        justifyContent: 'center'
    },
    primaryColor:{
        color:'black'
    }
})

export default LoginScreen