import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CompletedScreen from '../screen/CompletedScreen';
import OnGoingScreen from '../screen/OngoingScreen';
import React from 'react';

const Tab = createMaterialTopTabNavigator();

const TopTab=()=> {
  return (
    <Tab.Navigator>
      <Tab.Screen name="ongoing" component={OnGoingScreen} />
      <Tab.Screen name="completed" component={CompletedScreen} />
    </Tab.Navigator>
  );
}

export default TopTab