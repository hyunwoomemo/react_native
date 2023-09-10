import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components/native'
import { Animated, Easing, TouchableOpacity } from 'react-native';

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

export default function App() {
  const Y = useRef(new Animated.Value(0)).current;
  const [up, setUp] = useState(false)
  const toggleUp = () => setUp(prev => !prev);

  const moveUp = () => {
    Animated.timing(Y, {
      toValue: up ? 200: -200,
      useNativeDriver: true,
      easing: Easing.circle,
    }).start(toggleUp)
  }
  Y.addListener(() => console.log(Y))
  return (
    <Container>
      <TouchableOpacity onPress={moveUp}>
      <AnimatedBox  style={{transform: [{translateY: Y}]}} />
      </TouchableOpacity>
    </Container>
  )
}

