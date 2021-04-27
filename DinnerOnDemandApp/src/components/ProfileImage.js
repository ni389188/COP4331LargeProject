import React from 'react';
import {View, Image} from 'react-native';
import jwt_decode from 'jwt-decode';

function ProfileImage()
{
  const storage = require('../tokenStorage.js');  
  var tok = storage.retrieveToken();
  var ud = null;
  if(tok != null)
  {
    ud = jwt_decode(tok);
  }
  return(
    <>
        {
            ud === null
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