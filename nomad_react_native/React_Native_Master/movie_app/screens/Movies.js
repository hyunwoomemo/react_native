import React from 'react';

import { View, Text, TouchableOpacity } from 'react-native'

const Movies = ({navigation: {navigate}}) => {

  return (
    <TouchableOpacity
      onPress={() => navigate('Stack', {screen: 'Three'})}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <Text>Movies</Text>
    </TouchableOpacity>
  )
}

export default Movies