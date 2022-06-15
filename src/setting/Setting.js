import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StatusBar } from 'react-native';
import styles from './Style';
import {images} from '../globalstyles/Style';
import {Container} from 'native-base';
import SettingTab from '../SettingsTab/SettingTab';
import Subscription from '../setting/Subscription';

export default class Setting extends Component {

    render() {
        return (
            <Container>
                
                
            <View style={styles.container}>
            
                    <StatusBar backgroundColor="#fff" barStyle="dark-content" />
                <View style={styles.content}>
                <TouchableOpacity activeOpacity={0.5} 
                onPress={() => this.props.navigation.goBack()}>
                        <Image source={images.back} style={[styles.backimg]} tintColor='#000' />
                    </TouchableOpacity>
                    <Text style={styles.heading}>My Plan</Text>
                    <Text> Plasona </Text>
                </View>
                <Subscription/>
                {/* <SettingTab /> */}
            </View>
            </Container>
        )
    }
} 
