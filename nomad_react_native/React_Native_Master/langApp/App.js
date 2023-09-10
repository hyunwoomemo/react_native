import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components/native'
import { Animated, Dimensions, Easing, Pressable, TouchableOpacity } from 'react-native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`
const Box = styled.View`
  background-color: tomato;
  width: 200px;
  height: 200px;
`

const AnimatedBox = Animated.createAnimatedComponent(Box)

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

export default function App() {
  const position = useRef(new Animated.ValueXY({ x: -SCREEN_WIDTH / 2 + 100, y: -SCREEN_HEIGHT / 2 + 100 })).current;

  const topLeft = Animated.timing(position, {
    toValue: {
      x: -SCREEN_WIDTH / 2 + 100,
      y: -SCREEN_HEIGHT / 2 + 100,
    },
    useNativeDriver: true
  })

  const bottomLeft = Animated.timing(position, {
    toValue: {
      x: -SCREEN_WIDTH / 2 + 100,
      y: SCREEN_HEIGHT / 2 - 100,
    },
    useNativeDriver: true
  })

  const topRight = Animated.timing(position, {
    toValue: {
      x: SCREEN_WIDTH / 2 - 100,
      y: -SCREEN_HEIGHT / 2 + 100,
    },
    useNativeDriver: true
  })

  const bottomRight = Animated.timing(position, {
    toValue: {
      x: SCREEN_WIDTH / 2 - 100,
      y: SCREEN_HEIGHT / 2 - 100,
    },
    useNativeDriver: true
  })

  const moveUp = () => {
    Animated.loop(
    Animated.sequence([bottomLeft, bottomRight, topRight, topLeft])
    ).start()
  };

  [-300, 300]

  const rotation = position.y.interpolate({
    inputRange: [-200, 200],
    outputRange: ["-90deg", "90deg"]
  })

  const borderRadius = position.y.interpolate({
    inputRange: [-200, 200],
    outputRange: [100, 0]
  })

  const backgroundColor = position.y.interpolate({
    inputRange: [-200, 200],
    outputRange: ["rgb(255,99,71)", "rgb(71,166,255)"]
  })

  position.addListener(() => console.log(position.getTranslateTransform()))

  return (
    <Container>
      <Pressable onPress={moveUp}>
        <AnimatedBox style={{
          transform: [...position.getTranslateTransform()],
          borderRadius,
          backgroundColor
        }} />
      </Pressable>
    </Container>
  )
}

