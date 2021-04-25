import { HeaderBackButton } from '@react-navigation/stack';
import React from 'react';
import { View, StyleSheet } from 'react-native'
import { Layout, Text } from '@ui-kitten/components';

function PageTitle({text, back, navigate})
{
   return(
     <View style = {styles.header}>
        {
           back ?
           <View style = {{flex: 1}}>
            <HeaderBackButton
               onPress={() => navigate.goBack()}
               tintColor={"white"}
            />
           </View>
            
           :
            null 
        }
        <Text style={styles.text}>{text}</Text>
        {
           back ?
           <View style = {{flex: 1}}/>
           :
           null
        }
     </View>
   );
};

const styles = StyleSheet.create({
   header: {
      flex: 1,
      backgroundColor: 'blue',
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
      height: "100%",
      justifyContent: "center"
   },
   text: {
      flex: 6,
      fontSize: 20,
      textAlign: 'center',
      textAlignVertical: "center"
   },
});

export default PageTitle;