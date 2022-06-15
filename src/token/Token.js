import firebase from '@react-native-firebase/app';

 export  const  myToken = async() => {
    const idTokenResult = await firebase.auth().currentUser.getIdTokenResult();
    let idToken  = idTokenResult.token
      console.log('token',idToken)
      return idToken
}

