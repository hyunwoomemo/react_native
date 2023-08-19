import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Text, ScrollView, ActivityIndicator } from 'react-native';
import { Dimensions } from 'react-native';
import * as Location from 'expo-location'
import { useEffect, useState } from 'react';
import { Fontisto } from '@expo/vector-icons'; 

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const API_KEY = '67d2af0194723966734128ec76b9a40d'

const icons = {
  Clouds: "cloudy",
  Rain: "rains",
  Clear: 'day-sunny',
  Atmosphere: 'cloudy-gusts',
  Snow: 'snow',
  Drizzle: 'rain',
  Thunderstorm: 'lightning'
}

export default function App() {
  const [city, setCity] = useState('Loading...')
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);

  const getWeather = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync()

    if (!granted) {
      setOk(false);
    }
    const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({ accuracy: 5 }); // accuracy : 정확도

    const location = await Location.reverseGeocodeAsync({ latitude, longitude }, { useGoogleMaps: false })
    const { city, district } = location[0]
    setCity(city)
    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}&units=metric`)
    const json = await response.json()
    console.log(json.daily)
    setDays(json.daily)
  }

  useEffect(() => {
    getWeather()
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar style='light'/>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView contentContainerStyle={styles.weather} horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
        {
          days.length === 0 ? (
            <View style={styles.day}>
              <ActivityIndicator color="white" size="large" />
            </View>
          ) : (
            days.map((day, index) =>
              <View key={index} style={styles.day}>
                <View style={{flexDirection: 'row', alignItems: 'center', width: "100%", justifyContent: 'space-between'}}>
                  <Text style={styles.temp}>{parseFloat(day.temp.day).toFixed(1)}</Text>
                  <Text style={styles.emoji}>
                  <Fontisto name={icons[day.weather[0].main]} size={68} color="white" />
                  </Text>
                </View>
                <Text style={styles.desc}>{day.weather[0].main}</Text>
                <Text style={styles.subDesc}>{day.weather[0].description}</Text>
              </View>
            )
          )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'tomato',

  },
  city: {
    flex: 1.2,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  cityName: {
    fontSize: 68,
    fontWeight: "500",
    color: "white"
  },
  weather: {
  },
  day: {
    width: SCREEN_WIDTH,
  },
  temp: {
    marginTop: 50,
    fontSize: 108,
    color: "white",
    marginLeft: 20
  },
  emoji: {
    marginTop: 50,
    marginRight: 20,
  },
  desc: {
    fontSize: 50,
    color: "white",
    marginLeft: 20
  },
  subDesc: {
    fontSize: 30,
    color: "white",
    marginLeft: 20
  }
})