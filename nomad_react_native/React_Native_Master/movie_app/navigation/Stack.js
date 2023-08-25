import React from 'react'
import { createNativeStackNavigator} from '@react-navigation/native-stack'
import { Text, View, TouchableOpacity } from 'react-native';
import { YELLOW_COLOR } from '../colors';

const ScreenOne = ({navigation: {navigate}}) => {
  return (
    <TouchableOpacity onPress={() => navigate('Two')}>
      <Text>go to two</Text>
    </TouchableOpacity>
  )
}
const ScreenTwo = ({navigation: {navigate}}) => {
  return (
    <TouchableOpacity onPress={() => navigate('Three')}>
      <Text>go to three</Text>
    </TouchableOpacity>
  )
}
const ScreenThree = ({navigation: {navigate}}) => {
  return (
    <TouchableOpacity onPress={() => navigate('Tabs', {screen: 'Search'})}>
      <Text>Change Title</Text>
    </TouchableOpacity>
  )
}

const NativeStack = createNativeStackNavigator();

const Stack = () => {
  return (

    <NativeStack.Navigator screenOptions={{
      headerBackTitleVisible: false,
      headerTintColor: YELLOW_COLOR,
    }}>
    <NativeStack.Screen name="One" component={ScreenOne} />
    <NativeStack.Screen name="Two" component={ScreenTwo} />
      <NativeStack.Screen name="Three" component={ScreenThree}
        options={{
          presentation: 'modal'
        }}
      />
  </NativeStack.Navigator>
    )
}

export default Stack;