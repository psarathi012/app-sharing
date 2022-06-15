import React, { Component } from 'react';
import { View, Text, ActivityIndicator, ScrollView, TouchableOpacity,Image,StatusBar } from 'react-native';
import { Container } from 'native-base';
import styles from './Style';
import { colors, images } from "../globalstyles/Style";
import Icon from 'react-native-vector-icons/FontAwesome5'

export default class Help extends Component {

    state = {
     
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <Container style={styles.container}>
                   <StatusBar backgroundColor='#fff' barStyle='dark-content' />
                  <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                    <Image source={images.back} style={styles.backimg} tintColor='#000' />
                </TouchableOpacity>
                 <View style={[styles.content,{paddingTop:0}]}>
                    <Text style={[styles.heading]}>Help & Support</Text>

                <View style={styles.mt30}>
               
                <TouchableOpacity 
                onPress={() => navigate('Video')}
                  style={styles.helpbox}>
              <View style={styles.iconbox}>
                <Icon name="video" size={30} color='#E75935' />
              </View>
              <Text  style={[styles.subheading,{marginLeft:20}]}>Videos</Text>
            </TouchableOpacity>
           
            </View>

            <View style={styles.mt30}>
            <TouchableOpacity onPress={() => navigate('Contact')}
              style={styles.helpbox} >
              <View style={styles.iconbox}>
                <Icon name="phone" size={30} color='#E75935' />
              </View>
              <Text  style={[styles.subheading,{marginLeft:20}]}>Contact Us</Text>
            </TouchableOpacity>
            </View>

            <View style={styles.mt30}>
            <TouchableOpacity onPress={() => navigate('Policy')}
              style={styles.helpbox} >
              <View style={styles.iconbox}>
                <Icon name="user-shield" size={30} color='#E75935' />
              </View>
              <Text style={[styles.subheading,{marginLeft:20}]}>Privacy policy</Text>
            </TouchableOpacity>
          </View>
               
                </View>
            </Container>
        )
    }
}