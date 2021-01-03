import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import RegisterScreen from '../screen/RegisterScreen';
import LoginScreen from '../screen/LoginScreen';

const Stack = createStackNavigator()

const AuthStackRoot=()=>{
    return (
        <Stack.Navigator headerMode='none'>
            <Stack.Screen name='login' component={LoginScreen}/>
            <Stack.Screen name='register' component={RegisterScreen}/>
        </Stack.Navigator>
    )
}

export default AuthStackRoot