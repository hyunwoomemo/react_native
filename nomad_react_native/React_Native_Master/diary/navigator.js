import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home';
import Write from './screens/Write';

const Tabs = createStackNavigator()

const Navigator = () => <Tabs.Navigator screenOptions={{headerShown: false, presentation:'modal'}}>
  <Tabs.Screen name="home" component={Home} />
  <Tabs.Screen name="Write" component={Write} />
</Tabs.Navigator>

export default Navigator