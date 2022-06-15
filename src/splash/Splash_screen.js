import React from 'react';
import { View, StyleSheet, StatusBar, Image, Dimensions, AsyncStorage } from 'react-native';
import { images } from '../globalstyles/Style';
// import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import { myToken } from '../token/Token';

var { width } = Dimensions.get('window');


export default class Splash_screen extends React.Component {

  UNSAFE_componentWillMount() {
    this.SplashTask();
  }

  performTimeConsumingTask = async () => {
    return new Promise((resolve) =>
      setTimeout(() => { resolve('result') },
        4000)
    )
  }

  async SplashTask() {
    const data = await this.performTimeConsumingTask();
    if (data !== null) {
      this.getToken();
    }
  }

  getToken = async () => {
    try {
      let idToken = await myToken();
      console.log('splash', idToken)
      if (idToken != "" && idToken != null && idToken != 'undefined') {
        this.props.navigation.navigate('SignupTab');
      } else {
        this.props.navigation.navigate('Language');
      }
    } catch (error) {
      this.props.navigation.navigate('Login');
      console.log("Something went wrong", error);
    }
  }

  render() {
    return (
      <LinearGradient
        start={{ x: 0.0, y: 0.25 }}
        end={{ x: 0.5, y: 1.0 }}
        locations={[0, 0, 1]}
        colors={['#FC5C33', '#FC5C33', '#D61669']}
        style={styles.linearGradient}>
        {/* <ImageBackground source={images.bg} style={{height:'100%'}}> */}
        <StatusBar animated translucent backgroundColor='transparent' />

        <View style={styles.contain}>
          <Image style={{ resizeMode: 'center', width: width * 0.7, height: width * 0.5 }}
            source={images.splashlogo} />
        </View>
        {/* </ImageBackground> */}
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  viewStyles: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  linearGradient: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0
  },
  contain: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
});