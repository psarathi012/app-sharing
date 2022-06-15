import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar, Image } from 'react-native';
import styles from './Style';
import {images,colors} from '../globalstyles/Style';

export default class Video extends Component {
    render() {
        return (
            <View style={{ flex: 1,backgroundColor:'#fff' }}>
                 <StatusBar backgroundColor='#fff' barStyle='dark-content' />
                <ScrollView>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Image source={images.back} style={styles.backimg} tintColor='#000' />
                    </TouchableOpacity>
                    <View style={styles.content}>
                        <Text style={styles.heading}>Videos</Text>
                    </View>
                </ScrollView>
            </View>
        )
    }
}