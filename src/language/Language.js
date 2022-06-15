import React, { Component } from 'react';
import { View, Text,  Image, StatusBar, TouchableOpacity } from 'react-native';
import styles from './Style';
import { Container,} from 'native-base';
import { images } from '../globalstyles/Style';

export default class Language extends Component {
    render() {
        const {navigate} = this.props.navigation
        return (
            <Container>
                <StatusBar translucent barStyle='dark-content' backgroundColor='transparent' />
               
                <View style={styles.container}>
                
                   <View style={styles.content}>
                      <Text style={styles.heading}>Language Selection</Text>
                      <Text style={styles.subtitletxt}>Select the Language in which you want to view Rajput Lagn </Text>
                   </View>

                     <View style={styles.center}>
                   {/* <TouchableOpacity style={styles.btnsty1}
                    onPress={()=>navigate('Login')}
                   activeOpacity={0.5}>
                      <Text style={styles.title}>Hindi</Text> 
                   </TouchableOpacity>

                   <Text style={styles.subtitle}>Or</Text> */}
                  
                   <TouchableOpacity style={styles.btnsty2} 
                   onPress={()=>navigate('Login')}
                   activeOpacity={0.5}>
                     <Text style={styles.title}>English</Text>
                   </TouchableOpacity>
                   </View>
                </View>

                <View style={styles.bottom}>
                <Text style={styles.label} adjustsFontSizeToFit>(Language can be change anytime in setting later)</Text>
                </View>
            </Container>
        )
    }
}