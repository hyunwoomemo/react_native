import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components/native'
import { Animated, Dimensions, Easing, PanResponder, Pressable, StatusBar, TouchableOpacity } from 'react-native';

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
  const position = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

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

  const panResponder = useRef(PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      console.log('start')
      position.setOffset({
        x: position.x._value,
        y: position.y._value
      })
    },
    onPanResponderMove: (_, { dx, dy }) => {
      console.log('moving')
      position.setValue({
        x: dx,
        y: dy
      })
      console.log(dx, dy)
    },
    onPanResponderRelease: () => {
      console.log('finished')
      // offset 초기화
      position.flattenOffset();
    }
  })).current

  return (
    <Container>
      <AnimatedBox
        {...panResponder.panHandlers}
        style={{
          transform: position.getTranslateTransform(),
          borderRadius,
          backgroundColor
        }} />
    </Container>
  )
}

