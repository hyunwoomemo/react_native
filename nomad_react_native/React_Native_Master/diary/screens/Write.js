import React from 'react'
import styled from 'styled-components/native'
import colors from '../color'

const View = styled.View`
    background-color: ${colors.bgColor};
    flex: 1;
    padding: 0 30px;
  `

const Title = styled.Text`
color: ${colors.textColor};
margin-top: 50px;
text-align: center;
font-size: 28px;
font-weight: 500;
margin-bottom: 50px;
`

const TextInput = styled.TextInput`
  background-color: white;
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 18px;

`

const Btn = styled.TouchableOpacity`
  width: 100%;
  margin-top: 30px;
  background-color: ${colors.btnColor};
  padding: 10px 20px;
  align-items: center;
  border-radius: 20px;
`
const BtnText = styled.Text`
  color: white;
  font-weight: 500;
  font-size: 18px;
`

const Emotions = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
`
const Emotion = styled.TouchableOpacity`
  background-color: white;
  box-shadow: 1px 1px 5px rgba(0, 0,0,0.1);
  padding: 10px;
  border-radius: 10px;
`

const EmotionText = styled.Text`
  font-size: 24px;
`

const emotions = ["😀", "🥲", "🤬", "🤗", "🥰"]
const Write = () => {
  return (
    <View>
      <Title>How do you feel today?</Title>
      <Emotions>
        {emotions.map((emotion, index) => <Emotion key={index}>
          <EmotionText>
            {emotion}
          </EmotionText>
        </Emotion>)}
      </Emotions>
      <TextInput placeholder='Write your feelings...' placeholderTextColor="#BCBABA" />
      <Btn>
        <BtnText>Save</BtnText>
      </Btn>
    </View>
  )
}

export default Write