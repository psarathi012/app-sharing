import React, { Component } from 'react';
import { View, Text, Dimensions, Image, TouchableOpacity, StatusBar, ScrollView, SafeAreaView, TextInput, BackHandler, AsyncStorage, ActivityIndicator } from 'react-native';
import { images } from '../globalstyles/Style';
import LinearGradient from 'react-native-linear-gradient';
import styles from './Style';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Dialog, { DialogTitle, DialogContent, } from 'react-native-popup-dialog';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-simple-toast';
import { colors } from '../globalstyles/Style';


//import AsyncStorage from '@react-native-community/async-storage';

const { width, height } = Dimensions.get('window');
const windowWidth = Dimensions.get("window").width;
const window = {
    recaptchaVerifier: undefined
};

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0,
            defaultAnimationDialog: false,
            phone: '',
            confirmResult: null,
            verificationCode: '',
            userId: '',
            second: 10,
            hide: true,
            timer: null,
            number: '',
            loading: false,
        };
    }



    //---------------------------------hardwareBackPress button------------------------------------

    UNSAFE_componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }

    onBackPress = () => {
        Alert.alert(
            ' Rajput-lagn ',
            ' Do you want to exit ?',
            [
                { text: 'Yes', onPress: () => BackHandler.exitApp() },
                { text: 'No', onPress: () => console.log('NO Pressed') }
            ],
            { cancelable: true },
        );
        return true;
    }
    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ loading: false });
                console.log("helllo")
                // Obviously, you can add more statements here, 
                //       e.g. call an action creator if you use Redux. 

                // navigate the user away from the login screens: 
                this.props.navigation.navigate('Intro_vdo');
            }
            else {
                // reset state if you need to 
                console.log("objectmmmmmmmmmmmmmmmmmmmmmmmmmmmm");


            }
        });
    };

    //------------------------------------------------------------------


    //  recaptchaVerifierInvisible() {
    //      function onSignInSubmit() {
    //       // TODO(you): Implement
    //     }

    //     // [START auth_phone_recaptcha_verifier_invisible]
    //     window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
    //       'size': 'invisible',
    //       'callback': (response) => {
    //         // reCAPTCHA solved, allow signInWithPhoneNumber.
    //         onSignInSubmit();
    //       }
    //     });
    //     // [END auth_phone_recaptcha_verifier_invisible]
    //   }

    //    recaptchaRender() {
    //     /** @type {firebase.auth.RecaptchaVerifier} */
    //     const recaptchaVerifier = window.recaptchaVerifier;

    //     // [START auth_phone_recaptcha_render]
    //     recaptchaVerifier.render().then((widgetId) => {
    //       window.recaptchaWidgetId = widgetId;
    //     });
    //     // [END auth_phone_recaptcha_render]
    //   }


    validatePhoneNumber = () => {
        var regexp = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        // var regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/                // +91 with country code
        return regexp.test(this.state.phone)
    }


    handleSendCode = () => {
        //rconst appVerifier = window.recaptchaVerifier;
        this.setState({ loading: true });
        this.setState({ verificationCode: '' })
        console.log('click me', this.state.phone)
        if (this.validatePhoneNumber()) {
            console.log("inside");
            auth().signInWithPhoneNumber('+91' + this.state.phone)
                .then((confirmResult) => {
                    //this.setState({ loading: true });
                    console.log("object", confirmResult);
                    this.setState({ confirmResult });
                    console.log('confirm', this.state.confirmResult)
                    var user = firebase.auth().currentUser;
                    console.log(user, "ssssssssssssssssssssssssssssssssssssssssssssssssssssssssss");
                    if (user) {
                        this.setState({ loading: false });
                        console.log("the the user is logged in");
                        this.props.navigation.navigate('Intro_vdo');
                        // User is signed in.
                    } else {
                        // No user is signed in.
                        console.log("the the user is not logged ingdgdfg");
                        //this.renderConfirmationCodeView();
                    }
                    //this.renderConfirmationCodeView();

                })
                .catch(error => {
                    this.setState({ loading: false });
                    console.log("in catch");
                    alert(error.message)
                    console.log(error)
                })
        } else if (this.validatePhoneNumber() == "") {
            this.setState({ loading: false });
            alert("Please enter your mobile number")
        }
        else {
            this.setState({ loading: false });
            alert('Invalid Phone Number')
        }






    }


    changePhoneNumber = () => {
        this.setState({ confirmResult: null, verificationCode: '' })
    }

    handleVerifyCode = (verificationCode) => {
        // Request for OTP verification
        const { confirmResult } = this.state;
        console.log('verificationCode', verificationCode)
        if (verificationCode.length == 6) {
            confirmResult
                .confirm(verificationCode)
                .then(user => {
                    this.setState({ defaultAnimationDialog: false })
                    this.setState({ verificationCode })
                    this.setState({ userId: user.uid })
                    // alert(`Verified! ${user.uid}`);
                    this.props.navigation.navigate('Intro_vdo');
                    this.getToken();
                    this.setState({ defaultAnimationDialog: false });
                    Toast.show('Successfully login', Toast.SHORT);
                })
                .catch(error => {
                    alert(error.message);
                    console.log(error);
                })
        } else {
            alert('Please enter a 6 digit OTP code.')
        }
    }

    renderConfirmationCodeView = () => {
        this.setState({ defaultAnimationDialog: true })
    }

    Timer = () => {
        if (this.state.second > 0) {
            console.log('when second is grater then 0')
            this.myInterval = setInterval(() => {
                this.setState({ second: this.state.second - 1 });
                this.handleSendCode();
                if (this.state.second === 0) {
                    console.log('when second is equal to 0')
                    clearInterval(this.myInterval);
                    this.setState({ hide: true, second: 10 });
                }
            }, 1000);
        }
    }

    OnResendOtp = () => {
        console.log('second', this.state.second);
        if (this.state.hide == true) {
            this.setState({ hide: false, second: this.state.second });
            console.log('inside if second', this.state.second);
            this.Timer();
            this.handleSendCode();
        }
    }

    async getToken() {

        const idTokenResult = await firebase.auth().currentUser.getIdTokenResult();


        messaging.getToken({ vapidKey: "BFc69R1-249jfg3eRJ0fyWhyUfK9LReMdxt-Zyi6ZiIEEtPTvhJQaeSy9RtaExhbjRla0WrLFFmBTO_LhvE8LUc" });
        console.log('User JWT: ', idTokenResult.expirationTime);
        let idToken = idTokenResult.token
        AsyncStorage.setItem('idToken', idToken);
        console.log('idToken: ', idToken);

    }

    _renderItem = ({ item }) => {
        return (
            <View style={{ marginTop: 20, marginHorizontal: 16, overflow: 'hidden' }}>
                <Image style={styles.image} source={item.image} />
                <LinearGradient
                    colors={['rgba(255, 255, 255, 0)', 'rgba(0,0,0,0.9)']}
                    style={{
                        position: 'absolute', width: '100%', height: 150,
                        borderRadius: 5, bottom: -15, justifyContent: 'center', alignItems: 'center',
                    }}>
                    <Text style={styles.text} adjustsFontSizeToFit numberOfLines={2}>{item.text}</Text>
                </LinearGradient>

            </View>
        );
    };

    render() {
        const { navigate } = this.props.navigation;
        if (this.state.loading) {
            return (
                <View style={styles.forindicator}>
                    <ActivityIndicator size="large" color={colors.primary} />
                </View>
            );
        }
        return (
            <View style={{ flex: 1, marginBottom: 10 }}>
                <ScrollView>
                    <StatusBar backgroundColor='#E75935' barStyle='light-content' />
                    <SafeAreaView>

                        <View>
                            <View style={styles.cardCut} />

                            <View style={styles.carousel}>
                                <View>
                                    <Carousel loopClonesPerSide={slides.length}
                                        ref={ref => this.carousel = ref}
                                        data={slides}
                                        itemWidth={windowWidth - 40}
                                        sliderWidth={windowWidth - 40}
                                        renderItem={this._renderItem}
                                        onSnapToItem={index => this.setState({ activeIndex: index })}
                                        autoplay
                                        useScrollView
                                        loop
                                        autoplayInterval={2000}
                                        enableMomentum={false}
                                        lockScrollWhileSnapping={false}
                                        inactiveSlideScale={1}
                                        inactiveSlideOpacity={1}
                                        inactiveSlideShift={0.6}
                                    />
                                </View>
                            </View>
                        </View>
                        <Pagination
                            dotsLength={3}
                            activeDotIndex={this.state.activeIndex}
                            dotColor={'#E75935'}
                            inactiveDotColor={'#C4C4C4'}
                            dotStyle={{
                                width: 15,
                                height: 15,
                                borderRadius: 15 / 2,
                            }}
                            inactiveDotStyle={{
                                backgroundColor: "#C4C4C4"
                            }}
                            activeDotStyle={{ backgroundColor: '#E75935' }}
                            inactiveDotOpacity={0.9}
                            inactiveDotScale={0.5}
                            activeDotScale={0}
                        />
                        <View style={styles.content}>

                            <View style={{ flexDirection: 'row' }}>
                                <View style={styles.inputbox}>
                                    <Text style={[styles.input, { color: 'rgba(32, 32, 32, 0.6)' }]} adjustsFontSizeToFit numberOfLines={1}>IN +91</Text>
                                </View>
                                <View style={styles.border} />
                                <View style={[styles.inputcontainer, { width: '80%' }]}>
                                    <TextInput
                                        placeholder='Enter Your Mobile Number'
                                        numberOfLines={1}
                                        placeholderTextColor={'rgba(32, 32, 32, 0.6)'}
                                        keyboardType='phone-pad'
                                        value={this.state.phone}
                                        onChangeText={phone => { this.setState({ phone }) }}
                                        style={styles.input}
                                        returnKeyType="go"
                                        maxLength={10}
                                    />

                                </View>

                                {/* <TouchableOpacity style={styles.inputbtn}
                                 onPress={()=>this.handleSendCode()} >
                                    <Image source={images.next} style={{ width: 20, height: 20 }} tintColor='#fff' />
                                </TouchableOpacity> */}
                            </View>


                            <TouchableOpacity style={styles.btnsty}
                                onPress={() => this.handleSendCode()}>
                                <View >
                                    <Text style={styles.btn_txt} >Next</Text>
                                </View>
                            </TouchableOpacity>
                        </View>


                    </SafeAreaView>

                </ScrollView>

                <Dialog
                    dialogStyle={{ backgroundColor: 'transparent', borderRadius: 0 }}
                    onDismiss={() => {
                        this.setState({ defaultAnimationDialog: false });
                    }}
                    width={0.9}
                    visible={this.state.defaultAnimationDialog}
                    rounded
                    actionsBordered
                    dialogTitle={
                        <DialogTitle
                            style={styles.dialogtitle}
                            title="Enter OTP"
                            hasTitleBar={true}
                            align="center" />
                    }>
                    <DialogContent style={styles.dialogcontent}>
                        <Text style={styles.opt_subtitle}>
                            Please enter the 6 digit OTP send to {'\n'}+91 {this.state.phone}
                        </Text>
                        <OTPInputView
                            style={{ width: '80%', height: 100 }}
                            pinCount={6}
                            autoFocusOnLoad
                            codeInputFieldStyle={styles.underlineStyleBase}
                            codeInputHighlightStyle={styles.underlineStyleHighLighted}
                            onCodeFilled={(verificationCode => {
                                console.log(`verificationCode is ${verificationCode}, you are good to go!`)
                                // this.setState({ verificationCode })
                                this.handleVerifyCode(verificationCode);
                                // this.props.navigation.navigate('Profile')
                            })}
                        />
                        {this.state.hide ? (
                            <TouchableOpacity onPress={() => this.OnResendOtp()}>
                                <Text style={styles.resend_txt}>Resend OTP</Text>
                            </TouchableOpacity>
                        ) :
                            <Text style={styles.resendOTP}>Resend OTP in {this.state.second}</Text>}
                    </DialogContent>

                </Dialog>

            </View>
        );
    }
}


const slides = [
    {
        key: 's1',
        text: 'Your right match is just a signup away.  ',
        title: 'Mobile Recharge',
        image: images.splash1,

    },
    {
        key: 's2',
        title: 'Flight Booking',
        text: 'Find lots of genuine rajput profiles here. ',
        image: images.splash2,
    },
    {
        key: 's3',
        title: 'Great Offers',
        text: ' Start your Journey of finding life partner with "Rajput Lagn". ',
        image: images.splash3,
    },
];