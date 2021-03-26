import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

function Counter({number, direction})
{
  const [count, setCount] = useState(number);
  const onPlusPress = () => setCount(prevCount => prevCount + 1);
  const onMinusPress = () => 
  {
  if(count > 0)
    setCount(prevCount => prevCount - 1);
  }

  if(direction == 'column')
  {
    return(
      <View style = {{alignItems: 'center'}}>
        <View style = {styles.backgroundColumn}>
          <TouchableOpacity 
          style = {styles.textSection}
          onPress={onPlusPress}
          >
            <View style = {styles.clickArea}>
              <Text style = {styles.text}>+</Text>
            </View>
          </TouchableOpacity>
          <View style = {styles.counterSection}>
            <Text style = {styles.text}>{count}</Text>
          </View>
          <TouchableOpacity 
          style = {styles.textSection}
          onPress={onMinusPress}
          >
            <View style = {styles.clickArea}>
              <Text style = {styles.text}>-</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  else
  {
    return(
      <View style = {{alignItems: 'center'}}>
        <View style = {styles.backgroundRow}>
          <TouchableOpacity 
          style = {styles.textSection}
          onPress={onMinusPress}
          >
            <View style = {styles.clickArea}>
              <Text style = {styles.text}>-</Text>
            </View>
          </TouchableOpacity>
          <View style = {styles.counterSection}>
            <Text style = {styles.text}>{count}</Text>
          </View>
          <TouchableOpacity 
          style = {styles.textSection}
          onPress={onPlusPress}
          >
            <View style = {styles.clickArea}>
              <Text style = {styles.text}>+</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  backgroundColumn: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
    width: 50,
  },
  backgroundRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 150,
  },
  counterSection: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
  },
  textSection: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      width: '100%',
  },
  clickArea: {
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      width: '100%',
  },
  text: {
    fontSize: 23,
  },
})

export default Counter;