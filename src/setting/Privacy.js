import React, { Component } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, ActivityIndicator } from 'react-native';
import styles from './Style';
import {Avatar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome'
import { URL } from '../constant/Constant';
import { myToken } from '../token/Token';
import {colors} from '../globalstyles/Style';

export default class Privacy extends Component {
    constructor(props) {
        super(props);
        this.state = {
           data: [],
            loading: true
        }
    }

    async getProfile() {
        fetch(URL + 'subscriptions/contacts', {
            method: 'GET',
            headers: {
                'Authorization': await myToken(),
            },
        })
            .then(response => response.json())
            .then(responseJson => {
                console.log('contact', responseJson)
                let data = responseJson
                this.setState({ data: data, loading:false })
            })
            .catch(error => {
                console.error('something went wrong...', error);
                this.setState({loading:false})
            });
    }

    get_age(dob){
        // console.log('dd',dob)
        let birth = new Date(dob);
        let now = new Date();
        let beforeBirth = ((() => {
          birth.setDate(now.getDate());birth.setMonth(now.getMonth()); return birth.getTime()
        })() < birth.getTime()) ? 0 : 1;
        return now.getFullYear() - birth.getFullYear() - beforeBirth;
      }

      get_height(height){
        let obj = minheight.find(o => o.value === height);
         console.log(obj.label)
        return obj.label;
      }

    componentDidMount() {
        this.getProfile();
    }
   
    renderItem = ({ item }) => (
       <View style={styles.content}>
            <View style={styles.row}>
                <View style={{width:'20%'}}>
            <Avatar size="medium"
                rounded
                source={{ uri: item.displayPicUrl}}
                />
                </View>
               <View style={{width:'80%',marginTop:-10}}>
                <Text style={[styles.title]}>{item.displayId}</Text>
                <Text style={[styles.my_label,{marginTop:-15}]}>{this.get_age(item.dob)} years, {this.get_height(item.height)}, {item.city}, {item.qualification}, {item.occupation}, Rs. {item.income}
                 </Text>
                </View>

            </View>
       </View>
    );

    ItemSeparatorView = () => {
        return (
          <View
              style={{
                  height: 0.5,
                  width: '100%',
                  backgroundColor: '#C8C8C8'
              }}
          />
        );
      };

      ListEmpty = () => {
        return (
            <View style={[styles.forindicator,{marginTop:'60%'}]}>
               <Icon name= 'folder-o'  size={50} color="#ccc"/>
                <Text style={styles.msgs}>Empty</Text>
            </View>
        );
      };

    render() {
        if (this.state.loading) {
            return (
                <View style={styles.forindicator}>
                    <ActivityIndicator size="large" color={colors.primary} />
                </View>
            );
        }
        return (
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={this.state.data}
                    renderItem={this.renderItem}
                    ItemSeparatorComponent={this.ItemSeparatorView}
                    keyExtractor={(item, index) => index.toString()}
                    ListEmptyComponent={this.ListEmpty} 
                />

            </SafeAreaView>
        );
    }
}


const minheight = [{"label": "4'0\"", "value": 48}, {"label": "4'1\"", "value": 49}, {"label": "4'2\"", "value": 50}, {"label": "4'3\"", "value": 51}, {"label": "4'4\"", "value": 52}, {"label": "4'5\"", "value": 53}, {"label": "4'6\"", "value": 54}, {"label": "4'7\"", "value": 55}, {"label": "4'8\"", "value": 56}, {"label": "4'9\"", "value": 57}, {"label": "4'10\"", "value": 58}, {"label": "4'11\"", "value": 59}, {"label": "5 feet", "value": 60}, {"label": "5'1\"", "value": 61}, {"label": "5'2\"", "value": 62}, {"label": "5'3\"", "value": 63}, {"label": "5'4\"", "value": 64}, {"label": "5'5\"", "value": 65}, {"label": "5'6\"", "value": 66}, {"label": "5'7\"", "value": 67}, {"label": "5'8\"", "value": 68}, {"label": "5'9\"", "value": 69}, {"label": "5'10\"", "value": 70}, {"label": "5'11\"", "value": 71}, {"label": "6 feet", "value": 72}, {"label": "6'1\"", "value": 73}, {"label": "6'2\"", "value": 74}, {"label": "6'3\"", "value": 75}, {"label": "6'4\"", "value": 76}, {"label": "6'5\"", "value": 77}, {"label": "6'6\"", "value": 78}, {"label": "6'7\"", "value": 79}, {"label": 
"6'8\"", "value": 80}, {"label": "6'9\"", "value": 81}, {"label": "6'10\"", "value": 82}, {"label": "6'11\"", "value": 83}, {"label": "7 Feet", "value": 84}]
