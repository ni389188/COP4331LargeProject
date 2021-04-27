import React, {useState} from 'react';
import { View, StyleSheet, TextInput, Image, TouchableOpacity, Alert } from 'react-native';

import PageTitle from '../components/PageTitle';
import NavigationBar from '../components/NavigationBar';
import NavigationButton from '../components/NavigationButton';
import LoggedInName from '../components/LoggedInName';
import ProfileImage from '../components/ProfileImage';
import jwt_decode from 'jwt-decode';
import { launchImageLibrary } from 'react-native-image-picker';
import { Button, Card, Layout, Modal, Text } from '@ui-kitten/components';

const SettingsPage = ({ navigation }) => {
  const storage = require('../tokenStorage');
  const [state, setState] = useState(0);
  const [text, onChangeText] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [image, setImage] = useState('');
  const [visible, setVisible] = useState(false);

  const app_name = 'cop4331din';
  function buildPath(route) {
    if (process.env.NODE_ENV === 'production') {
      return 'https://' + app_name + '.herokuapp.com/' + route;
    }
    else {
      return 'http://10.0.2.2:5000/' + route;
    }
  };

  const doDelete = async event => {
    var ud = await jwt_decode(await storage.retrieveToken());
    await storage.removeToken('user_data');
    var obj = { _id: ud.userId };
    var js = JSON.stringify(obj);
    try        
    {                
      const response = await fetch(buildPath('api/delete'), {method:'post',body:js,headers:{'Content-Type': 'application/json'}});
      var res = JSON.parse(await response.text());   
      if(res.deleted)
      {
        Alert.alert(
          "Account deleted",
          "Thank you for using Dinner On Demand!",
          [
            {
              text: "Bye!"
            },
          ],
        );
        navigation.navigate('AccountPage');
      }
      else {
        alert(res.err)
      }
    }
    catch (e) {
      alert(e.toString());
    }
  };

  const doSave = async event => {
    event.preventDefault();
    var ud = await jwt_decode(await storage.retrieveToken());
    var obj = { FirstName: firstName, LastName: lastName, _id: ud.userId, Image: image };
    var js = JSON.stringify(obj);
    try {
      const response = await fetch(buildPath('api/update'), { method: 'post', body: js, headers: { 'Content-Type': 'application/json' } });
      var res = JSON.parse(await response.text());
      if (res.accessToken) {
        if (storage.retrieveToken('user_data') != null) {
          storage.removeToken('user_data');
        }
        storage.storeToken(res);
        navigation.push('NavigationBar');
      }
    }
    catch (e) {
      alert(e.toString());
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <PageTitle
          text='Profile Settings'
          back={1}
          navigate={navigation}
        />
      </View>
      {
        state == 0 || state == 3
          ?
          <View style={styles.imageSection}>
            {
              text == '' && image == ''
                ?
                <ProfileImage />
                :
                image == ''
                  ?
                  <Image
                    style={styles.image}
                    source={{ uri: text }}
                  />
                  :
                  <Image
                    style={styles.image}
                    source={{ uri: image }}
                  />
            }

            <View style={styles.button}>
              {
                state == 0
                  ?
                  <NavigationButton
                    name='Change image'
                    doFunction={() => setState(3)}
                  />
                  : null
              }
            </View>
          </View>
          : null
      }
      <Layout style={[state == 0 || state == 3 ? styles.body : styles.altBody]}>
        {
          state == 0
            ?
            <>
              <View style={styles.section}>
                <View style={styles.nameDivide}>
                  <View style={styles.namePart}>
                    <Text style={styles.inputTitle}>First name: </Text>
                    {
                      firstName == ''
                        ?
                          <LoggedInName
                            size='first'
                            font={25}
                          />
                        :
                          <Text style={styles.text}>{firstName}</Text>
                    }
                  </View>
                  <NavigationButton name='Edit First Name' doFunction={() => setState(1)} />
                </View>
              </View>
              <View style={styles.section}>
                <View style={styles.nameDivide}>
                  <View style={styles.namePart}>
                    <Text style={styles.inputTitle}>Last name: </Text>
                    {
                      lastName == '' ?
                        <LoggedInName size='last' font={25} />
                      :
                        <Text style={styles.text}>{lastName}</Text>
                    }
                  </View>
                  <NavigationButton name='Edit Last Name' doFunction={() => setState(2)} />
                </View>
              </View>
              <View style={[styles.section, { alignItems: 'center' }]}>
                <NavigationButton name='Save' doFunction={doSave} />
              </View>
              <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity onPress={() => setVisible(true)}>
                  <Text style={styles.deleteButton}>Delete Account</Text>
                </TouchableOpacity>

                <Modal
                  visible={visible}
                  backdropStyle={styles.backdrop}
                  onBackdropPress={() => setVisible(false)}
                  style={{width: "85%"}}>
                  <Card disabled={true}>
                    <Text status='danger'>Are you sure you want to delete your account? This action is IRREVERSIBLE.</Text>
                    <Button onPress={() => setVisible(false) & doDelete()} status='danger' style={{marginVertical: 10}}>YES</Button>

                    <Button onPress={() => setVisible(false)}>NO</Button>
                  </Card>
                </Modal>
              </View>
            </>
            :
            state == 1 || state == 2
              ?
              <>
                <View style={styles.section}>
                  <View style={styles.nameDivide}>
                    <View style={styles.namePart}>
                      <Text style={styles.inputTitle}> {[state == 1 ? "First" : "Last"]} name</Text>
                    </View>
                    <View style={styles.namePart}>
                      <TextInput
                        style={styles.input}
                        placeholder={"Please enter your " + [state == 1 ? "first" : "last"] + " name"}
                        onChangeText={onChangeText}
                      />
                    </View>
                  </View>
                </View>
                <View style={styles.section}>
                  <NavigationButton
                    name='Save'
                    doFunction={() => { setState(0);[state == 1 ? setFirstName(text) : setLastName(text)]; onChangeText('') }}
                  />
                </View>
                <View style={styles.section}>
                  <NavigationButton name='Cancel' doFunction={() => { setState(0); onChangeText('') }} />
                </View>
                <View style={{ flex: 4 }} />
              </>
              :
              state == 3
                ?
                <>
                  <View style={styles.section}>
                    <NavigationButton
                      name='Choose an image'
                      doFunction={() => launchImageLibrary({ includeBase64: true, mediaType: 'photo', maxHeight: 150, maxWidth: 150 },
                        (response) => { if (response.base64) onChangeText('data:image/png;base64,' + response.base64) })}
                    />
                  </View>
                  <View style={styles.section}>
                    <NavigationButton
                      name='Save'
                      doFunction={() => { setState(0), setImage(text), onChangeText('') }}
                    />
                  </View>
                  <View style={styles.section}>
                    <NavigationButton
                      name='Cancel'
                      doFunction={() => { setState(0), onChangeText('') }}
                    />
                  </View>
                  <View style={{ flex: 1 }} />
                </>
                :
                  null
        }
      </Layout>
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
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
  },
  altBody: {
    flex: 11,
    width: '85%',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 20,
    marginVertical: 20,
  },
  footer: {
    flex: 1.5,
    width: '100%',
  },
  section: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  nameDivide: {
    flex: 3,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: "column"
  },
  buttonDivide:{
    flex:1.5,
    height:'100%',
    width:'100%',
    justifyContent: 'center',
  },
  namePart: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    flexDirection: "row"
  },
  inputTitle: {
    fontSize: 25,
  },
  input: {
    color: 'black',
    borderColor: 'grey',
    borderWidth: 2,
    borderRadius: 10,
  },
  image: {
    height: 150,
    width: 150,
    borderRadius: 100,
  },
  button: {
    width: '50%',
    marginTop: 25,
  },
  text: {
    fontSize: 25,
  },
  textBox: {
    
  },
  deleteButton: {
    color: 'red',
  },
  deleteText: {
    fontSize: 30,
    textAlign: 'center',
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default SettingsPage;