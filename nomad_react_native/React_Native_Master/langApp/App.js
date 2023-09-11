import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components/native'
import { Animated, Dimensions, Easing, PanResponder, Pressable, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import icons from './icons'

const BLACK_COLOR = '#1e272e';
const GREY = '#485460';
const GREEN = '#2ecc71';
const RED = '#e74c3c';

const Container = styled.View`
  flex: 1;
  background-color: ${BLACK_COLOR};
`

const Edge = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

const WordContainer = styled(Animated.createAnimatedComponent(View))`
  width: 100px;
  height: 100px;
  justify-content: center;
  align-items: center;
  background-color: ${GREY};
  border-radius: 50px;
`

const Word = styled.Text`
  font-size: 38px;
  color: ${(props) => props.color};
  font-weight: 500;
`;

const Center = styled.View`
  flex: 3;
  justify-content: center;
  align-items: center;
`

const IconCard = styled(Animated.createAnimatedComponent(View))`
background-color: white;
padding: 10px 10px;
border-radius: 10px;
`

export default function App() {
  // Values
  const scale = useRef(new Animated.Value(1)).current;
  const position = useRef(new Animated.ValueXY({x:0, y:0})).current
  // Animations

  // Pan Responders
  const panResponder = useRef(PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      Animated.spring(scale, {
        toValue: 0.9,
        useNativeDriver: true
      }).start()
    },
    onPanResponderMove: () => {

    },
    onPanResponderRelease: () => {
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true
      }).start()
    }
  })).current
  // State

  return (
    <Container>
      <Edge>
        <WordContainer>
          <Word color={GREEN}>알아</Word>
        </WordContainer>
      </Edge>
      <Center>
        <IconCard
          {...panResponder.panHandlers}
          style={{
          transform: [
            { scale },
            ...position.getTranslateTransform()
          ]
        }}>
          <Ionicons name="beer" color={GREY} size={76} />
        </IconCard>
      </Center>
      <Edge>
        <WordContainer>
          <Word color={RED}>몰라</Word>
        </WordContainer>
      </Edge>
    </Container>
  )
}

