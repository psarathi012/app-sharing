import React, { Component } from 'react';
import { View, Text, ScrollView, StatusBar, TouchableOpacity, Image, FlatList, ActivityIndicator } from 'react-native';
import { Container, Card } from 'native-base';
import styles from './PaymentStyle';
import { images, colors } from '../globalstyles/Style';
// import RadioForm, { RadioButton } from 'react-native-simple-radio-button';
import RazorpayCheckout from 'react-native-razorpay';
import { URL } from '../constant/Constant';
import { myToken } from '../token/Token';
import { NavigationEvents } from 'react-navigation';

let total = 0;
export default class PaymentMethod extends Component {

    state = {
        types2: [{ label: 'Net Banking', value: 0 },
        { label: 'Offline Payment', value: 1 },
        { label: 'Pay using UPI ID', value: 2 },
        { label: 'Pay using Paytm', value: 2 }],
        value2: -1,
        value2Index: -1,
        array: [], data: [], total_price: 0, poisa: 0, loading: true,
    }

    UNSAFE_componentWillMount() {
        const { navigation } = this.props;
        const featured = navigation.getParam('featured');
        const premium = navigation.getParam('premium');
        const data = navigation.getParam('data');
        console.log(data, "helllllllllllllllllllooooooo");
        let array = [...featured, ...premium];
        console.log(array, "dddddddddddddddddddddddddddddddddd");
        this.setState({ array: array, data: data });
        console.log('data', data, "array=>", array)
    }

    month(planId) {
        let array = this.state.array
        let obj = array.find(o => o.id === planId);
        //    console.log(obj.label)
        return obj.label;
    }

    plans(planId) {
        let array = this.state.array
        console.log(typeof (array[0]), "hello this is the obj");
        let obj = array.find(o => o.id === planId);
        let amount = obj.value;
        //this.setState({ poisa: amount });
        let category = obj.myplan;
        console.log(amount, "this the amount of the plan");


        return category;
    }
    planst(planId) {
        let array = this.state.array
        console.log(typeof (array[0]), "hello this is the obj");
        let obj = array.find(o => o.id === planId);
        let amount = obj.value;
        //this.setState({ poisa: amount });
        let category = obj.myplan;
        console.log(amount + category, "this the amount of the plan");


        return category;
    }

    amount(planId) {
        let array = this.state.array
        console.log(planId, "llllllllllllllllll");
        let obj = array.find(o => o.id === planId);

        //console.log(obj.label, "hhhhhhhhhhhhhhhhhhhhhhhh this is object");
        // let amount = obj.value
        //return amount;
    }

    async payment(razorpay_payment_id, razorpayOrderId, razorpay_signature) {
        let params = {
            "razorpay_order_id": razorpayOrderId,
            "razorpay_payment_id": razorpay_payment_id,
            "razorpay_signature": razorpay_signature
        }
        fetch(URL + 'orders/capturePayment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': await myToken(),
            },
            body: JSON.stringify(params)
        })
            .then(response => response.json())
            .then(responseJson => {
                console.log('payment', responseJson)
                console.log('payment params', params)
                this.props.navigation.navigate('Payment_success', { razorpayOrderId: razorpayOrderId })
            })
            .catch(error => {
                console.error('something went wrong...', error);
            });
    }

    _renderItem = ({ item }) => {
        return (

            <View style={styles.box}>
                <Text style={styles.title}>{this.planst(item)}</Text>

                <Text style={styles.title} >₹ {this.plans(item)}</Text>
                <Text style={styles.title}>{this.month(item)}</Text>
            </View>
        )
    }
    functions() {
        this.setState({ loading: false });
        var options = {
            description: 'Credits towards consultation',
            image: 'https://rajput-matrimony-8f30a.web.app/images/logo.jpeg',
            currency: "INR",
            key: 'rzp_test_JNhUrCKJmLoyMb',
            amount: '4000',
            name: 'Rajput Lagn',
            prefill: {
                email: 'pasarathi012@gmail.com',
                contact: '6265815749',
                name: 'Razorpay Software'
            },
            theme: { color: '#E75935' },
            width: null,
            order_id: this.state.data.razorpayOrderId
        }
        RazorpayCheckout.open(options).then((d) => {
            // handle success
            //   alert(`Success: ${d.razorpay_payment_id}`);
            console.log('razorpay data', d)
            this.payment(d.razorpay_payment_id, data.razorpayOrderId, d.razorpay_signature);
        }).catch((error) => {
            // handle failure
            alert(`Error: ${error.code} | ${error.description}`);
            console.log('error', error.code, error.description)
        });
    }
    componentDidMount() {
        this.functions();
    }

    render() {
        const { navigate } = this.props.navigation;
        const { navigation } = this.props;
        const data = navigation.getParam('data');
        if (this.state.loading) {
            return (
                <View style={styles.forindicator}>
                    <ActivityIndicator size="large" color={colors.primary} />
                </View>
            );
        }

        return (
            <Container style={styles.container}>
                {/* <NavigationEvents onWillFocus={() => this.UNSAFE_componentWillMount()} /> */}
                <ScrollView>
                    <View style={[styles.content, { marginBottom: '15%' }]}>

                        <TouchableOpacity onPress={() => navigate('ChoosePlan')}>
                            <Image source={images.back} style={styles.backimg} tintColor='#000' />
                        </TouchableOpacity>

                        <Text style={styles.heading}>Select Payment Method</Text>

                        <FlatList
                            data={data.planIds}
                            renderItem={this._renderItem}
                            keyExtractor={(item, index) => index.toString()}
                        />


                        <View style={styles.box}>
                            <Text style={styles.title}>Total</Text>

                            <Text style={styles.title} >₹ </Text>

                        </View>
                        {/* 
                        <RadioForm
                            formHorizontal={false}
                            animation={true}>
                            {this.state.types2.map((obj, i) => {
                                var that = this;
                                var is_selected = this.state.value2Index == i;
                                return (
                                    <View key={i} style={styles.radioButtonWrap}>
                                        <RadioButton
                                            isSelected={is_selected}
                                            obj={obj}
                                            index={i}
                                            buttonSize={12}
                                            buttonOuterSize={22}
                                            labelStyle={[styles.title,{fontSize:18}]}
                                            labelHorizontal={true}
                                            buttonColor={'#000'}
                                            buttonStyle={{ borderWidth: 1.5 }}
                                            labelColor={'#000'}
                                            style={[i !== this.state.types2.length - 1 && styles.radioStyle]}
                                            onPress={(value, index) => {
                                                this.setState({ value2: value })
                                                this.setState({ value2Index: index });
                                            }}
                                        />
                                    </View>
                                )
                            })}
                        </RadioForm> */}

                    </View>

                </ScrollView>

                <TouchableOpacity style={styles.footer}
                    onPress={() => {
                        this.functions();
                    }}>
                    <View>
                        <Text style={styles.head}>Continue</Text>
                    </View>
                </TouchableOpacity>

            </Container>
        )
    }
}