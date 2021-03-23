import React from 'react';
import { View, Text, StyleSheet } from 'react-native'

function PageTitle({text})
{
   return(
     <View style = {styles.header}>
        <Text style={styles.text}>{text}</Text>
     </View>
   );
};

const styles = StyleSheet.create({
   header: {
      height: 60,
      padding: 15,
      backgroundColor: 'blue',
   },
   text: {
      color: 'white',
      fontSize: 23,
      textAlign: 'center',
   },
});

export default PageTitle;