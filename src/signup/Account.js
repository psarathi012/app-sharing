import React, { Component } from 'react';
import { View, Text, ActivityIndicator, ScrollView, TouchableOpacity,Image } from 'react-native';
import { Container } from 'native-base';
import styles from '../setting/Style';
import { URL } from '../constant/Constant';
import { myToken } from '../token/Token';
import { colors, images } from "../globalstyles/Style";
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Privacy extends Component {

    state = {
        loading: true,
        fname: '',
        lname: '',
        phone: '',
        email: '',
        create_profile: false
    }


    async getProfile() {
        fetch(URL + 'profile', {
            method: 'GET',
            headers: {
                'Authorization': await myToken()
            },
        })
            .then(response => response.json())
            .then(responseJson => {
                if (responseJson.code == "not-found") {
                    console.log(responseJson.msg);
                    this.setState({ loading: false, create_profile: true })
                } else {
                    if (responseJson.personal.fname == undefined) {
                        console.log('personal data not found')
                        this.setState({ loading: false,create_profile: true })
                    } else {
                        // console.log('get data personal', responseJson.personal);
                        let personal = responseJson.personal
                        this.setState({
                            fname: personal.fname, lname: personal.lname, loading: false,
                            phone: responseJson.family.pocNumber, email: responseJson.family.email
                        })
                    }

                }
            })
            .catch(error => {
                console.error('something went wrong...', error);
                this.setState({ loading: false })
            });
    }


    componentDidMount() {
        this.getProfile();
    }

    render() {
        if (this.state.loading) {
            return (
                <View style={styles.forindicator}>
                    <ActivityIndicator size="large" color={colors.primary} />
                </View>
            );
        }

        return (
            <Container style={styles.container}>
                 <View style={[styles.content,{paddingBottom:0}]}>
                  <TouchableOpacity activeOpacity={0.5} onPress={() => this.props.navigation.goBack()}>
                    <Image source={images.back} style={styles.backimg} tintColor='#000' />
                </TouchableOpacity>
                <View>
                    <Text style={[styles.heading]}>Contact Details</Text>
                </View>
                </View>
              
                {this.state.create_profile == true ? (
                    <View style={styles.forindicator}>
                        <Icon name="user-plus" size={100} color='#ccc' />
                        <Text style={[styles.label, { color: '#ccc' }]}>Please create  your profile</Text>
                    </View>
                ) :
                    <ScrollView>
                        <View style={styles.content}>
                            <View style={styles.rowcentr}>
                                <Text style={styles.title}>Phone Number</Text>
                                {/* <Text style={styles.number}>Change Number</Text> */}
                            </View>
                            <View>

                                <Text style={styles.subtitle}>{this.state.phone ? '+91' + this.state.phone : ''}</Text>
                                <Text style={styles.label}>This is the number which you are using for login</Text>
                            </View>
                        </View>
                        <View style={styles.border} />

                        <View style={styles.content}>
                            <View>
                                <Text style={styles.title}>Name </Text>
                                <Text style={styles.label}>{this.state.fname} {this.state.lname}</Text>
                            </View>
                        </View>
                        <View style={styles.border} />

                        <View style={styles.content}>
                            <View>
                                <Text style={styles.title}>Email </Text>
                                <Text style={styles.label}>{this.state.email}</Text>
                            </View>
                        </View>
                        <View style={styles.border} />
                    </ScrollView>
                }
            </Container>
        )
    }
}