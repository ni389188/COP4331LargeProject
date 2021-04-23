import React from 'react';
import {View, Image} from 'react-native';
import jwt_decode from 'jwt-decode';

function ProfileImage()
{
  const storage = require('../tokenStorage.js');  
  var tok = storage.retrieveToken();
  if(tok != null)
  {
    var ud = jwt_decode(tok);
  }
  return(
    <>
        {
            ud.image == null
            ?
            <Image
            style={{height:150, width:150, borderRadius: 100}}
            source={require('./defaultProfileImage.png')}
            />
            :
            <Image 
            style = {{height:150, width:150, borderRadius: 100}}
            source={{uri: ud.image}}
            />
        }
    </>
  );
};

export default ProfileImage;