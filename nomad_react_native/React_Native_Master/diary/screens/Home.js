import React from 'react'
import styled from 'styled-components/native'
import colors from '../color';
import {Ionicons} from '@expo/vector-icons'

const View = styled.View`
    flex: 1;
    padding: 0 30px;
    padding-top: 100px;
    background-color: ${colors.bgColor};
  `

const Title = styled.Text`
    color: ${colors.textColor};
    font-size: 28px;
    margin-bottom: 100px;
  `

const Text = styled.Text``
const Btn = styled.TouchableOpacity`
  position: absolute;
  bottom: 30px;
  right: 30px;
  height: 70px;
  width: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 40px;
  background-color: ${colors.btnColor};
  elevation: 5;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
`;
const BtnText = styled.Text`
  color: white;
`

const Home = ({navigation: {navigate}}) => {
  return (
    <View>
      <Title>My journal</Title>
      <Btn onPress={() => navigate('Write')}>
        <Ionicons name="add" color="white" size={40}/>
      </Btn>
    </View>
  )
}

export default Home