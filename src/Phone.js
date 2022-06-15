import React, { Component } from 'react'
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  TextInput, AsyncStorage
} from 'react-native'

import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import RNOtpVerify from 'react-native-otp-verify';

export default class PhoneAuth extends Component {
  state = {
    phone: '',
    confirmResult: null,
    verificationCode: '',
    userId: ''
  }
  validatePhoneNumber = () => {
    var regexp = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return regexp.test(this.state.phone)
  }
  handleSendCode = () => {
    // Request to send OTP
    if (this.validatePhoneNumber()) {
      //   firebase
      //     .auth()
      auth().signInWithPhoneNumber('+91' + this.state.phone)
        .then(confirmResult => {
          this.setState({ confirmResult })
           this.myotp();
        })
        .catch(error => {
          alert(error.message)
          console.log(error)
        })
    } else {
      alert('Invalid Phone Number')
    }
  }

  changePhoneNumber = () => {
    this.setState({ confirmResult: null, verificationCode: '' })
  }

  async getToken() {
    const idTokenResult = await firebase.auth().currentUser.getIdTokenResult();
    console.log('User JWT: ', idTokenResult.expirationTime);
    let idToken = idTokenResult.token
    AsyncStorage.setItem('idToken', idToken);
    console.log('idToken: ', idToken);
  }

  handleVerifyCode = () => {
    // Request for OTP verification
    const { confirmResult, verificationCode } = this.state
    if (verificationCode.length == 6) {
      confirmResult
        .confirm(verificationCode)
        .then(user => {
          this.setState({ userId: user.uid })
           alert(`Verified! ${user.uid}`)
          // this.props.navigation.navigate('Intro_vdo');
          this.getToken();
        })
        .catch(error => {
          alert(error.message)
          console.log(error)
        })
    } else {
      alert('Please enter a 6 digit OTP code.')
    }
  }

  otpHandler = (message: string) => {
    console.log('SMS :: ', message)
    // alert(message);

    const otp = /(\d{6})/g.exec(message)[1];
    console.log('otp', otp)
    this.setState({ verificationCode : otp });
    RNOtpVerify.removeListener();
  }

  onChangeText = (value) => {
    this.setState({
      text: value
    })
  }

  getHash = () =>
  RNOtpVerify.getHash()
 .then(console.log)
 .catch(console.log);
  

  componentWillUnmount() {
    RNOtpVerify.removeListener();
  }

  UNSAFE_componentWillMount(){
    this.getHash();
  }

  myotp(){
      RNOtpVerify.getOtp()
      .then(p => RNOtpVerify.addListener(this.otpHandler))
      .catch(p => console.log('p',p));
  }

  renderConfirmationCodeView = () => {
    return (
      <View style={styles.verificationView}>
        <TextInput
          style={styles.textInput}
          placeholder='Verification code'
          placeholderTextColor='#eee'
          value={this.state.verificationCode}
          keyboardType='numeric'
          onChangeText={verificationCode => {
            this.setState({ verificationCode })
          }}
          maxLength={6}
        />
        <TouchableOpacity
          style={[styles.themeButton, { marginTop: 20 }]}
          onPress={this.handleVerifyCode}>
          <Text style={styles.themeButtonTitle}>Verify Code</Text>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: '#333' }]}>
        <View style={styles.page}>
          <TextInput
            style={styles.textInput}
            placeholder='Enter your mobile number'
            placeholderTextColor='#eee'
            keyboardType='phone-pad'
            value={this.state.phone}
            onChangeText={phone => {
              this.setState({ phone })
            }}
            maxLength={10}
            editable={this.state.confirmResult ? false : true}
          />
          <TouchableOpacity
            style={[styles.themeButton, { marginTop: 20 }]}
            onPress={
              this.state.confirmResult
                ? this.changePhoneNumber
                : this.handleSendCode
            }>
            <Text style={styles.themeButtonTitle}>
              {this.state.confirmResult ? 'Change Phone Number' : 'Send Code'}
            </Text>
          </TouchableOpacity>
          {this.state.confirmResult ? this.renderConfirmationCodeView() : null}
        </View>
      </SafeAreaView>



    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#aaa'
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textInput: {
    marginTop: 20,
    width: '90%',
    height: 40,
    borderColor: '#555',
    borderWidth: 2,
    borderRadius: 5,
    paddingLeft: 10,
    color: '#fff',
    fontSize: 16
  },
  themeButton: {
    width: '90%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#888',
    borderColor: '#555',
    borderWidth: 2,
    borderRadius: 5
  },
  themeButtonTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff'
  },
  verificationView: {
    width: '100%',
    alignItems: 'center',
    marginTop: 50
  }
})