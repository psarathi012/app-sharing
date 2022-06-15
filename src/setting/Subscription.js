import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList,ActivityIndicator } from 'react-native';
import { Card } from 'native-base';
import styles from './Style';
import { URL } from '../constant/Constant';
import { myToken } from '../token/Token';
import {colors} from '../globalstyles/Style';


export default class Subscription extends Component {
    constructor(props) {
        super(props);
        this.state = {
            featured: [],
            premium: [],
            loading: true
        }
    }

    async getProfile() {
        fetch(URL + 'subscriptions', {
            method: 'GET',
            headers: {
                'Authorization': await myToken(),
            },
        })
            .then(response => response.json())
            .then(responseJson => {
                console.log('subscription', responseJson.premium)
                let featured = responseJson.featured
                let premium = responseJson.premium
                console.log(this.state.featured.length,"hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh")
                this.setState({ featured: featured, premium: premium,loading:false })
            })
            .catch(error => {
                console.error('something went wrong...', error);
                this.setState({loading:false})
            });
    }

    componentDidMount() {
        this.getProfile();
    }


    getdays(exdate) {
        const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        const firstDate = new Date(exdate);
        const secondDate = new Date();
        const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
        console.log('diffDays', diffDays)
        return diffDays;
    }

    getexpiry(exdate) {
        let monthNames = ["Jan", "Feb", "Mar", "Apr",
            "May", "Jun", "Jul", "Aug",
            "Sep", "Oct", "Nov", "Dec"];
        let d = new Date(exdate)
        let getDate = d.getDate()
        let getmonth = monthNames[d.getMonth()];
        let getyear = d.getFullYear()
        let dd = getDate + ' ' + getmonth + ' ' + getyear
        console.log(' date', getDate + '-' + getmonth + '-' + getyear)
        return dd;
    }

    renderItem_premium = ({ item }) => {
        if (item.active) {
            return (
                <Card style={styles.crdsty}>
                    <View style={styles.content}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.heading}>Premium Plan</Text>
                            <Text style={[styles.my_label, { marginTop: -10 }]}>Plan is valid till {''}
                                <Text style={{ color: '#000' }}>{this.getexpiry(item.expiry)}</Text></Text>
                            <View style={styles.cir_days}>
                                <Text style={styles.heading}>{this.getdays(item.expiry)}</Text>
                                <Text style={[styles.subtitle, { marginTop: -25 }]}>days</Text>
                            </View>
                        </View>
                    </View>
                </Card>
            )
        }
    }

    renderItem_featured = ({ item }) => {
        if (item.active) {
            return (
                <Card style={styles.crdsty}>
                    <View style={styles.content}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.heading}>Featured Plan</Text>
                            <Text style={[styles.my_label, { marginTop: -10 }]}>Plan is valid till {''}
                                <Text style={{ color: '#000' }}>{this.getexpiry(item.expiry)}</Text></Text>
                            <View style={styles.cir_days}>
                                <Text style={styles.heading}>{this.getdays(item.expiry)}</Text>
                                <Text style={[styles.subtitle, { marginTop: -25 }]}>days</Text>
                            </View>
                        </View>
                    </View>
                </Card>
            )
        }
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
            <View style={styles.container}>
                
                <ScrollView>
                {this.state.premium==undefined && this.state.featured==undefined ?(
                             <View style={[styles.forindicator,{marginTop:'40%'}]}>
                             <Text style={styles.subtitle}>You have not any plans.</Text>
                             </View>
                        ):(
                    <View style={styles.content}>
                      
                    
                             <FlatList
                                data={this.state.premium}
                                renderItem={this.renderItem_premium}
                                ItemSeparatorComponent={this.ItemSeparatorView}
                                keyExtractor={(item, index) => index.toString()}
                            />
                       
                            <FlatList
                                data={this.state.featured}
                                renderItem={this.renderItem_featured}
                                ItemSeparatorComponent={this.ItemSeparatorView}
                                keyExtractor={(item, index) => index.toString()}
                            />
                    

                        

                     </View>)}
                </ScrollView>  
            </View>
        )
    }
}