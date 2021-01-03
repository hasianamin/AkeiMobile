import React, { useState } from 'react';
import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard,
    KeyboardAvoidingView
} from 'react-native'
import { images, FONTS } from '../../constants';
import {Input, Icon, Button} from 'react-native-elements'
import {useDispatch,useSelector} from 'react-redux'
import { NavigationContainer } from '@react-navigation/native';


const RegisterScreen=({navigation})=>{

    const Auth=useSelector(state=>state.Auth)
    const dispatch=useDispatch()

    const [onFocus,setOnFocus] = useState({status:false, type:0})
    const [isVisible,setIsVisible] = useState(true)
    const [dataUser,setDataUser] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        email: ''
    })

    const onInput=(text,type)=>{
        if(type === 1) setDataUser({...dataUser,username:text})
        if(type === 2) setDataUser({...dataUser,email:text})
        if(type === 3) setDataUser({...dataUser,password:text})
        if(type === 4) setDataUser({...dataUser,confirmPassword:text})
        
    }

    const onFocusInput=(type)=>{
        if(type === 1) setOnFocus({...onFocus,status:true,type:1})
        if(type === 2) setOnFocus({...onFocus,status:true,type:2})
        if(type === 3) setOnFocus({...onFocus,status:true,type:3})
        if(type === 4) setOnFocus({...onFocus,status:true,type:4})
    }

    const onLoginPress=()=>{
        dispatch({type:'LOADING'})
    }

    return (
        <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
            <KeyboardAvoidingView style={{flex:1}} behavior="padding" enabled>
                <ImageBackground source={images.loginBg} style={styles.image}>
                    <View style={{
                        width:'100%',
                        backgroundColor:'white',
                        height:'85%',
                        position: 'absolute',
                        bottom:0,
                        opacity:0.85,
                        borderTopLeftRadius: 25,
                        borderTopRightRadius: 25,
                        paddingHorizontal:30,
                        paddingTop:40
                    }}>
                        <Text style={[{...FONTS.h2},{textAlign:'center', marginBottom:15, marginTop:-5}]}>Create your account</Text>
                        <Input
                            value={dataUser.username}
                            onChangeText={(text)=>onInput(text,1)}
                            leftIcon={{type:'font-awesome',name:'user',color:'black'}}
                            inputContainerStyle={{borderColor:onFocus.status && (onFocus.type===1)?'black':'gray'}}
                            label={'Username'}
                            labelStyle={styles.primaryColor}
                            inputStyle={styles.primaryColor}
                            onFocus={()=>setOnFocus({status:true,type:1})}
                            onBlur={()=>setOnFocus({status:false,type:0})}
                        />
                        <Input
                            value={dataUser.email}
                            onChangeText={(text)=>onInput(text,2)}
                            leftIcon={{type:'feather',name:'mail',color:'black'}}
                            inputContainerStyle={{borderColor:onFocus.status && (onFocus.type===2)?'black':'gray'}}
                            label={'Email'}
                            labelStyle={styles.primaryColor}
                            inputStyle={styles.primaryColor}
                            onFocus={()=>setOnFocus({status:true,type:2})}
                            onBlur={()=>setOnFocus({status:false,type:0})}
                        />
                        <Input
                            value={dataUser.password}
                            onChangeText={(text)=>onInput(text,3)}
                            leftIcon={{type:'font-awesome',name:'lock',color:'black'}}
                            inputContainerStyle={{borderColor:onFocus.status && (onFocus.type===3)?'black':'gray'}}
                            label={'Password'}
                            secureTextEntry={isVisible}
                            labelStyle={styles.primaryColor}
                            inputStyle={styles.primaryColor}
                            onFocus={()=>setOnFocus({status:true,type:3})}
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
                        <Input
                            value={dataUser.confirmPassword}
                            onChangeText={(text)=>onInput(text,4)}
                            leftIcon={{type:'font-awesome',name:'lock',color:'black'}}
                            inputContainerStyle={{borderColor:onFocus.status && (onFocus.type===4)?'black':'gray'}}
                            label={'Confirm Password'}
                            secureTextEntry={isVisible}
                            labelStyle={styles.primaryColor}
                            inputStyle={styles.primaryColor}
                            onFocus={()=>setOnFocus({status:true,type:4})}
                            onBlur={()=>setOnFocus({status:false,type:0})}
                        />
                        <Button
                            title='Register'
                            loading={Auth.isLoading}
                            onPress={()=>onLoginPress()}
                            buttonStyle={{
                                marginTop:10
                            }}
                        />
                        <Button
                        buttonStyle={{
                            marginTop:10
                        }}
                            title="Already have an account? Login here"
                            type="clear"
                            onPress={()=>navigation.navigate('login')}
                        />
                    </View>
                </ImageBackground>
            </KeyboardAvoidingView>
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

export default RegisterScreen