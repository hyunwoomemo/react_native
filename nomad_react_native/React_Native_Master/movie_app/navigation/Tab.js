import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Movies from '../screens/Movies';
import Tv from '../screens/Tv';
import Search from '../screens/Search';
import { Text, View, useColorScheme } from 'react-native';
import { BLACK_COLOR, DARKGRAY_COLOR, LIGHTGRAY_COLOR, YELLOW_COLOR } from '../colors';
import { Ionicons } from '@expo/vector-icons';
import Stack from './Stack';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const isDark = useColorScheme() === 'dark';

  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: isDark ? BLACK_COLOR : 'white'
      }}
      
      screenOptions={{
        unmountOnBlur: true,
      tabBarStyle: {
        backgroundColor: isDark ? BLACK_COLOR : 'white'
      },
      tabBarActiveTintColor: isDark ? YELLOW_COLOR : BLACK_COLOR,
      tabBarInactiveTintColor: isDark ? LIGHTGRAY_COLOR : DARKGRAY_COLOR,
      headerStyle: {
        backgroundColor: isDark ? BLACK_COLOR : 'white',
      },
      headerTitleStyle: {
        color: isDark ? 'white' : BLACK_COLOR,
      },
      tabBarLabelStyle: {
        marginTop: -5,
        marginBottom: 5,
        fontSize: 12,
        fontWeight: "600"
      }
    }}
    >
      <Tab.Screen
        name="Movies"
        component={Movies}
        options={{
          tabBarIcon: ({ color, size }) => {
            return (
              <Ionicons name="film-outline" size={size} color={color} />
            )
          }
        }}
      ></Tab.Screen>
      <Tab.Screen name="TV" component={Tv}
        options={{
          tabBarIcon: ({ color, size }) => {
            return (
              <Ionicons name="tv-outline" size={size} color={color} />
            )
          }
        }}
      ></Tab.Screen>
      <Tab.Screen name="Search" component={Search}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Ionicons name={focused ? 'search' : 'search-outline'} size={size} color={color} />
            )
          }
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  )
}

export default Tabs