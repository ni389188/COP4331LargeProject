import React from 'react';
import { View, Image } from 'react-native';

const Logo = () => {
  return (
    <View>
      <Image source={require('./logo.png')} style = {{height: 200, width: 200}}/>
    </View>
  )
}

export default Logo;