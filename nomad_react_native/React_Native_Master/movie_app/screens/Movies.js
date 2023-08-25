import React from 'react';
import styled from 'styled-components/native'

const Movies = ({navigation: {navigate}}) => {

  return (
    <Btn
      onPress={() => navigate('Stack', {screen: 'Three'})}
    >
      <Title selected={false}>Movies</Title>
      <Title selected={true}>Movies</Title>
    </Btn>
  )
}

const Btn = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
`

const Title = styled.Text`
  color: ${props => props.selected ? 'blue' : 'red'};
`

export default Movies