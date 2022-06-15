import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar, Image, Linking, Alert } from 'react-native';
import styles from './Style';
import { images, colors } from '../globalstyles/Style';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default class Contact extends Component {
    state = {
        phone: '7415581551'
    }

    sendMsg = () => {

        if (this.state.phone.length != 10) {
            Alert.alert('Please Enter Correct WhatsApp Number');
            return;
        }
        // Here we are using 91 which is India Country Code.
        // You can change country code.
        let URL = 'whatsapp://send?text=' + '' + '&phone=91' + this.state.phone;

        Linking.openURL(URL)
            .then((data) => {
                console.log('WhatsApp Opened');
            })
            .catch(() => {
                Alert.alert('Make sure Whatsapp installed on your device');
            });
    };

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <StatusBar backgroundColor='#fff' barStyle='dark-content' />
                <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                    <Image source={images.back} style={styles.backimg} tintColor='#000' />
                </TouchableOpacity>

                <View style={styles.center}>
                    <Text style={[styles.subtitle, { textAlign: 'center', color: '#777' }]}>
                    Feel free to email us or drop querries on whatsapp.
                    </Text>
                    <Text style={styles.heading}><Icon name="envelope" size={25} color="#000" /> : care@ rajputlagn.com</Text>
                    <TouchableOpacity style={styles.row} onPress={() => this.sendMsg()}>
                        <Icon name="whatsapp-square" size={30} color="#4FCE5D" />
                        <Text style={[styles.title, { marginTop: -4 }]} > : 7415581551 </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}