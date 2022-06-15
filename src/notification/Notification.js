import React, { Component } from 'react';
import { View, Text, StatusBar, TouchableOpacity, Image, FlatList, ScrollView } from 'react-native';
import { Container } from 'native-base';
import { images } from '../globalstyles/Style';
import styles from './Style';
import firestore from '@react-native-firebase/firestore';



export default class Notification extends Component {


    _renderItem = ({ item, index }) => {
        return (
            <View>
            <View style={styles.border}>
                <View style={styles.row}>
                  <View style={{width:'20%', justifyContent:'center'}}>
                       <View style={styles.circle}>
                           <Image source={images.king}  style={styles.circleimg}/>
                       </View>
                  </View>
                  <View style={{width:'80%'}}>
                      <View style={styles.notification}>
                      <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.label}>{item.time}</Text>
                      </View>
                   
                    <Text style={styles.subtitle}>{item.subtitle}</Text>
                  </View>
                </View>
            </View>
              </View>
        )
    }

    _ItemSeparatorView = () => {
        return (
            <View style={styles.border}/>
          );
    }

    render() {
        return (
            <Container style={styles.container}>
                <StatusBar barStyle='dark-content' backgroundColor='#fff' />
                <ScrollView>
                <View style={styles.content}>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => this.props.navigation.goBack()}>
                        <Image source={images.back} style={styles.backimg} tintColor='#000' />
                    </TouchableOpacity>

                    <View>
                        <Text style={styles.head}>Notifications</Text>
                    </View>
                    </View>
                    <View style={styles.container}>
                    <FlatList
                        data={dummyArray}
                        renderItem={this._renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        />
              <View style={styles.border}/>

                    </View>
                    </ScrollView>
            </Container>
        )
    }
}

const dummyArray = [
    {title: 'Subscription', subtitle: 'Your basic subscription plan is expiring in 3 days', time:'1 hr ago'},
    {title: 'New Request', subtitle: 'Rakesh rajput has sent you a connection request',  time:'2 hr ago'},
    {title: 'Subscription', subtitle: 'Your basic subscription plan is expiring in 3 days',  time:'1 hr ago'},
    {title: 'New Request', subtitle: 'Rakesh rajput has sent you a connection request', time:'1 hr ago'},
  ];