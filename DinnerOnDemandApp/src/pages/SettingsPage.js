import React, {useState} from 'react';
import { View, StyleSheet, Text, TextInput, Image, TouchableOpacity } from 'react-native';

import PageTitle from '../components/PageTitle';
import NavigationBar from '../components/NavigationBar';
import NavigationButton from '../components/NavigationButton';
import LoggedInName from '../components/LoggedInName';

const SettingsPage = ({navigation}) =>
{
  const storage = require('../tokenStorage');
  const [state, setState] = useState(0);
  const [text, onChangeText] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const doDelete = async event =>     
  {
    if(storage.retrieveToken('user_data') != null)
    {
      storage.removeToken('user_data');
    }
    navigation.navigate('AccountPage');
  };

  const doSave = async event =>
  {
    navigation.push('NavigationBar');
  };

  return(
    <View style = {styles.container}>
      <View style = {styles.header}>
        <PageTitle 
        text = 'Profile Settings'
        back = {1}
        navigate = {navigation}
        />
      </View>
      {
        state == 0 || state == 3
        ?
        <View style = {styles.imageSection}>
          <Image
          style={styles.image}
          source={require('../components/defaultProfileImage.png')}
          />
          <View style = {styles.button}>
            {
              state == 0
              ?
              <NavigationButton
              name = 'Change image'
              doFunction = {() => setState(3)}
              />
              :null
            }
          </View>
        </View>
        : null
      }
      <View style = {[state == 0 || state == 3 ? styles.body : styles.altBody]}>
        {
          state == 0
          ?
          <>
            <View style = {styles.section}>
              <View style = {styles.nameDivide}>
                <View style = {styles.namePart}>
                  <Text style = {styles.inputTitle}> First name</Text>
                </View>
                <View style = {styles.namePart}>
                {
                  firstName == ''
                  ?
                  <LoggedInName 
                  size = 'first'
                  font={25}
                  />
                  :
                  <View style = {styles.textBox}>
                    <Text style = {styles.text}>{firstName}</Text>
                  </View>
                }
                </View>
              </View>
              <View style = {styles.buttonDivide}>
                <NavigationButton
                name = 'edit'
                doFunction = {() => setState(1)}
                />
              </View>
            </View>
            <View style = {styles.section}>
              <View style = {styles.nameDivide}>
                <View style = {styles.namePart}>
                  <Text style = {styles.inputTitle}> Last name</Text>
                </View>
                <View style = {styles.namePart}>
                {
                  lastName == ''
                  ?
                  <LoggedInName 
                  size = 'last'
                  font={25}
                  />
                  :
                  <View style = {styles.textBox}>
                    <Text style = {styles.text}>{lastName}</Text>
                  </View>
                }
                </View>
              </View>
              <View style = {styles.buttonDivide}>
                <NavigationButton
                name = 'edit'
                doFunction = {() => setState(2)}
                />
              </View>
            </View>
            <View style = {[styles.section, {alignItems:'center'}]}>
              <NavigationButton
              name = 'save'
              doFunction = {doSave}
              />
            </View>
            <View style = {{flex:0.5, alignItems:'center', justifyContent:'center'}}>
              <TouchableOpacity onPress = {() => setState(4)}>
                <Text style = {styles.deleteButton}>Delete Account</Text>
              </TouchableOpacity>
            </View>
          </>
          :
          state == 1 || state == 2
          ?
          <>
            <View style = {styles.section}>
              <View style = {styles.nameDivide}>
                <View style = {styles.namePart}>
                  <Text style = {styles.inputTitle}> {[state == 1?"First":"Last"]} name</Text>
                </View>
                <View style = {styles.namePart}>
                  <TextInput 
                  style = {styles.input} 
                  placeholder={"Please enter your "+[state == 1?"first":"last"]+" name"}
                  onChangeText = {onChangeText}
                  />
                </View>
              </View>
            </View>
            <View style = {styles.section}>
              <NavigationButton
              name = 'Save'
              doFunction = {() => {setState(0); [state == 1?setFirstName(text):setLastName(text)]; onChangeText('')}}
              />
            </View>
            <View style = {styles.section}>
              <NavigationButton
              name = 'Cancel'
              doFunction = {() => {setState(0); onChangeText('')}}
              />
            </View>
            <View style = {{flex:4}}/>
          </>
          :
          state == 3
          ?
          <>
            <View style = {styles.section}>
              <NavigationButton
              name = 'Choose an image'
              doFunction = {() => {setState(0)}}
              />
            </View>
            <View style = {styles.section}>
              <NavigationButton
              name = 'Save'
              doFunction = {() => setState(0)}
              />
            </View>
            <View style = {styles.section}>
              <NavigationButton
              name = 'Cancel'
              doFunction = {() => setState(0)}
              />
            </View>
            <View style = {{flex:1}}/>
          </>
          :
          state == 4
          ?
          <>
            <View style = {[styles.section, {flex: 2}]}>
              <Text style = {styles.deleteText}>Are you sure you want to delete your account? This Action is irreversible.</Text>
            </View>
            <View style = {styles.section}>
              <NavigationButton
              name = 'Delete Account'
              doFunction = {doDelete}
              color = 'red'
              />
            </View>
            <View style = {styles.section}>
              <NavigationButton
              name = 'Cancel'
              doFunction = {() => setState(0)}
              />
            </View>
            <View style = {{flex:3}}/>
          </>
          : null
        }
      </View>
      {/* <View style = {styles.footer}>
        <NavigationBar />
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ABDDDC",
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flex: 1,
    width: '100%',
    height: '100%',
    flexDirection: 'row',
  },
  imageSection: {
      flex: 5,
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      width: '100%',

  },
  body: {
    flex: 6,
    width: '85%',
    justifyContent: 'center',
  },
  altBody: {
    flex: 11,
    width: '85%',
    justifyContent: 'center',
  },
  footer: {
    flex: 1.5,
    width: '100%',
  },
  image: {
      height: 150,
      width: 150,
      marginBottom: 25,
  },
  section:{
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  nameDivide:{
    flex:4,
    height:'100%',
    width:'100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDivide:{
    flex:1,
    height:'100%',
    width:'100%',
    justifyContent: 'center',
  },
  namePart:{
    flex:1,
    width: '100%',
    justifyContent: 'center',
  },
  inputTitle:{
    color: 'black',
    fontSize: 15,
  },
  input: {
    color: 'black',
    borderColor: 'grey',
    borderWidth: 2,
    borderRadius: 10,
  },
  button:{
    width: '50%',
  },
  text: {
    fontSize: 25,
  },
  textBox: {
    flex:1, 
    width: '100%', 
    height:"100%"
  },
  deleteButton: {
    color: 'red',
  },
  deleteText: {
    fontSize: 30,
    textAlign: 'center',
  },
});

export default SettingsPage;