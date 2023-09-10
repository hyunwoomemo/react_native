import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components/native'
import { Animated, Easing, Pressable, TouchableOpacity } from 'react-native';

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
  const Y_POSITION = useRef(new Animated.Value(200)).current;
  const [up, setUp] = useState(false)
  const toggleUp = () => setUp(prev => !prev);

  const moveUp = () => {
    Animated.timing(Y_POSITION, {
      toValue: up ? 200 : -200,
      useNativeDriver: true,
      // duration: 5000,
    }).start(toggleUp)
  };
  
  [-300, 300]

  const opacityValue = Y_POSITION.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: [1, 0.5, 1]
  })

  const borderRadius = Y_POSITION.interpolate({
    inputRange: [-200, 200],
    outputRange: [100, 0]
  })

  console.log(opacityValue)

  Y_POSITION.addListener(() => console.log(opacityValue))
  return (
    <Container>
      <Pressable onPress={moveUp}>
        <AnimatedBox style={{
          transform: [{ translateY: Y_POSITION }],
          opacity: opacityValue,
          borderRadius
        }} />
      </Pressable>
    </Container>
  )
}

