import React, { Component } from 'react';
import { View, Text, ActivityIndicator, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { Container } from 'native-base';
import styles from '../setting/Style';
import { colors, images } from "../globalstyles/Style";

export default class Delete_profile extends Component {

    state = {
        options: [
            { label: "I found my match on Rajput-lagn", value: 0 },
            { label: "I found my match elsewhere", value: 1 },
            { label: "I am unhappy with Rajput-lagn services", value: 2 },
            { label: "Marry later / Create profile later", value: 3 },
            { label: "I have to do some changes in my profile", value: 4 },
            { label: "Privacy issue", value: 5 },
            { label: "Other Reasons", value: 6 },
        ],
        val: '',
        button:false
    }

    twoOptionAlertHandler = () => {
        Alert.alert(
          'Rajput Lagn',
          'Are you sure, you want to delete profile ?',
          [
            {
              text: 'Confirm',
              onPress: () => console.log('Yes Pressed')
            },
            {
              text: 'Cancle',
              onPress: () => console.log('No Pressed'), style: 'cancel'
            },
          ],
          {cancelable: true},
        );
      };

    render() {

        return (
            <Container style={styles.container}>
                <ScrollView>
                    <View style={[styles.content, { paddingBottom: 0 }]}>
                        <TouchableOpacity activeOpacity={0.5} onPress={() => this.props.navigation.goBack()}>
                            <Image source={images.back} style={styles.backimg} tintColor='#000' />
                        </TouchableOpacity>
                        <View>
                            <Text style={[styles.heading]}>Delete Profile</Text>
                        </View>

                        <Text style={styles.subtitle}>This will delete your profile permanently.
                           Let us know why you wish to delete your profile.</Text>

                        <View>
                            {this.state.options.map((item) => {
                                return (

                                    <View key={item.value} style={styles.buttonContainer}>

                                        <TouchableOpacity
                                            style={styles.circle}
                                            onPress={() => {
                                                if (this.state.val === item.value) {
                                                    this.setState({
                                                        val: null, button:false
                                                    });
                                                    console.log('value if', this.state.val, 'value', item.value)
                                                } else {
                                                    this.setState({
                                                        val: item.value, button:true
                                                    });
                                                    console.log('value else', this.state.val, 'value', item.value)
                                                  
                                                }
                                            }}>
                                            {this.state.val === item.value && <View style={styles.checkedCircle} />}
                                        </TouchableOpacity>
                                        <View style={{ marginLeft: 15 }}>
                                            <Text style={styles.subtitle}>{item.label}</Text>
                                        </View>
                                    </View>
                                );
                            })}
                        </View>

                    </View>
                </ScrollView>
                {this.state.button == true ? (
                <TouchableOpacity style={styles.btnsty} onPress={()=>this.twoOptionAlertHandler()}>
                    <Text style={[styles.title,{color:'#fff'}]}>Proceed</Text>
                </TouchableOpacity>
                ):null}
            </Container>
        )
    }
}