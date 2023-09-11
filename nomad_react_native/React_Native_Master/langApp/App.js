import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components/native'
import { Animated, Dimensions, Easing, PanResponder, Pressable, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import icons from './icons'

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #00a8ff;
`

const Card = styled.View`
background-color: #fff;
width: 300px;
height: 300px;
justify-content: center;
align-items: center;
border-radius: 12px;
box-shadow: 1px 1px 5px rgba(0,0,0,0.5);
position: absolute;
`

const Button = styled.TouchableOpacity`
margin: 0px 10px;
`

const BtnContainer = styled.View`
  flex-direction: row;
  margin-top: 100px;
  flex: 1;
`

const CardContainer = styled.View`
  flex: 3;
  justify-content: center;
  align-items: center;
`

const AnimatedCard = Animated.createAnimatedComponent(Card)

export default function App() {
  // Values
  const scale = useRef(new Animated.Value(1)).current;
  const position = useRef(new Animated.Value(0)).current
  const rotation = position.interpolate({
    inputRange: [-230, 230],
    outputRange: ['-15deg', '15deg'],
    extrapolate: "extend"
  })

  const secondScale = position.interpolate({
    inputRange: [-300, 0, 300],
    outputRange: [1, 0.7, 1],
    extrapolate: "clamp"
  })

  // position.addListener(() => console.log(position, rotation))

  // Animations
  const onPressIn = () => Animated.spring(scale, {
    toValue: 0.95,
    useNativeDriver: true,
  }).start()

  const onPressOut = () =>
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true
    }).start()

  const goCenter = () => {
    Animated.spring(position, {
      toValue: 0,
      useNativeDriver: true,
    }).start()
  }

  const goLeft = Animated.spring(position, {
    toValue: -500, useNativeDriver: true, tension: 5, restSpeedThreshold: 100, restDisplacementThreshold: 100
  })
  console.log('dismiss to the left')

  const goRight = Animated.spring(position, {
    toValue: 500, useNativeDriver: true, tension: 5, restSpeedThreshold: 100, restDisplacementThreshold: 100
  })
  console.log('dismiss to the right')

  // Pan Responders
  const panResponder = useRef(PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      onPressIn()

    },
    onPanResponderMove: (_, { dx }) => {
      position.setValue(dx);
    },
    onPanResponderRelease: (_, { dx }) => {
      if (dx < -250) {
        goLeft.start(onDismiss)
      } else if (dx > 250) {
        goRight.start(onDismiss)
      } else {
        onPressOut() 
        goCenter()
      }
    }
  })).current

  // Stare
  const [index, setIndex] = useState(0)

  const onDismiss = () => {
    scale.setValue(1)
    position.setValue(0)
    setIndex(prev => prev + 1)
  }

  const closePress = () => {
    goLeft.start(onDismiss)
  }

  const checkPress = () => {
    goRight.start(onDismiss)
  }

  return (
    <Container>
      <CardContainer>
        <AnimatedCard
          style={{ transform: [{ scale: secondScale }] }}
        >
          <Ionicons name={icons[index+1]} color="#192a56" size={98} />
        </AnimatedCard>
        <AnimatedCard
          {...panResponder.panHandlers}
          style={{
            
            transform: [{ scale }, { translateX: position }, { rotateZ: rotation }]
          }}>
          <Ionicons name={icons[index]} color="#192a56" size={98} />
        </AnimatedCard>
      </CardContainer>
      <BtnContainer>

        <Button>
          <Ionicons name="close-circle" color="white" size={58} onPress={closePress} />
        </Button>
        <Button>
          <Ionicons name="checkmark-circle" color="white" size={58} onPress={checkPress} />
        </Button>
      </BtnContainer>
    </Container>
  )
}

