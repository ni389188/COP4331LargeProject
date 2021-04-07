import { HeaderBackButton } from '@react-navigation/stack';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native'

function PageTitle({text, back, navigate})
{
   return(
     <View style = {styles.header}>
        {
           back ?
            <HeaderBackButton
                  onPress={() => navigate.goBack()}
                  tintColor={"white"}
            />
           :
            null 
        }
        <Text style={styles.text}>{text}</Text>
     </View>
   );
};

const styles = StyleSheet.create({
   header: {
      padding: 15,
      backgroundColor: 'blue',
      flexDirection: "row",
      alignSelf: "center",
      width: "100%",
      justifyContent: "center"
   },
   text: {
      color: 'white',
      fontSize: 20,
      textAlign: 'center',
      textAlignVertical: "center"
   },
});

export default PageTitle;