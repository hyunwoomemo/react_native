import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'
import colors from '../color';
import { Ionicons } from '@expo/vector-icons'
import { useDB } from '../context';
import { FlatList, TouchableOpacity, LayoutAnimation } from 'react-native';

const View = styled.View`
    flex: 1;
    padding: 0 30px;
    padding-top: 50px;
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

const Record = styled.View`
  background-color: ${colors.cardColor};
  flex-direction: row;
  padding: 10px 20px;
  align-items: center;
  border-radius: 10px;
`

const Emotion = styled.Text`
font-size: 24px;
margin-right: 10px;
`

const Message = styled.Text`
font-size: 18px;
`

const Separator = styled.View`
  height: 10px;
`

const Home = ({ navigation: { navigate } }) => {
  const realm = useDB()
  const [feelings, setFeelings] = useState()
  useEffect(() => {
    const feelings = realm.objects('Feeling')
    feelings.addListener((feelings, changes) => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
      setFeelings(feelings.sorted("_id", true))
    });

    return () => {
      feelings.removeAllListeners();
    }
    // filter
    // const happy = feelings.filtered('emotion = "😀"')
  }, [])


  const onPress = (id) => {
    realm.write(() => {
      const feeling = realm.objectForPrimaryKey('Feeling', id);
      realm.delete(feeling)
    })
  }


  return (
    <View>
      <Title>My journal</Title>
      <FlatList
        data={feelings} keyExtractor={feeling => feeling._id + ""}
        contentContainerStyle={{ paddingVertical: 10 }}
        ItemSeparatorComponent={Separator}
        renderItem={({ item }) =>
          <TouchableOpacity onPress={() => onPress(item._id)}>
            <Record>
              <Emotion>{item.emotion}</Emotion>
              <Message>{item.message}</Message>
            </Record>
          </TouchableOpacity>
        } />
      <Btn onPress={() => navigate('Write')}>
        <Ionicons name="add" color="white" size={40} />
      </Btn>
    </View>
  )
}

export default Home