import * as React from 'react';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDKTr-GLsLXL_1hUxsfyQ5fG9x4V63hiMg",
    authDomain: "rajput-matrimony-8f30a.firebaseapp.com",
    databaseURL: "https://rajput-matrimony-8f30a.firebaseio.com",
    projectId: "rajput-matrimony-8f30a",
    storageBucket: "rajput-matrimony-8f30a.appspot.com",
    messagingSenderId: "885705379881",
    appId: "1:885705379881:web:b8b2b57f852fcfa7964c38",
    measurementId: "G-NHV2K2S8W0"
  
  };

  

  if(!firebase.apps.length){
   firebase.initializeApp(firebaseConfig);
}

  export default () => {
    return {firebase, auth};
  }