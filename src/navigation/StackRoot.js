import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import TabRoot from './TabRoot';
import ProductDetails from '../screen/ProductDetails';
import PaymentScreen from '../screen/PaymentScreen';

const Stack = createStackNavigator()

const StackRoot=()=>{
    return (
        <Stack.Navigator headerMode='none'>
            <Stack.Screen name='tab' component={TabRoot}/>
            <Stack.Screen name='detail' component={ProductDetails}/>
            <Stack.Screen name='payment' component={PaymentScreen}/>
        </Stack.Navigator>
    )
}

export default StackRoot