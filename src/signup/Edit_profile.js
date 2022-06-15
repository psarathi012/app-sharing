import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar, Image, ActivityIndicator } from 'react-native';
import { Container, Card, Footer, FooterTab, Button, Fab } from 'native-base';
import { colors, images } from '../globalstyles/Style';
import styles from './Style';
import { Badge, } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon_save from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import { URL } from '../constant/Constant';
import { myToken } from '../token/Token';
import { NavigationEvents } from 'react-navigation';

export default class FullProfileView extends Component {
    state = {
        hide: true,
        show: false,
        profileSummary_id: '', displayId: "", save: true,
        personal: [],
        astro: [],
        career: [],
        family: [],
        photos: [],
        loading: true,
        dp: "",
        lock_icon: true, savedbtn: false, images: [],
        create_profile: false
    }


    get_age(dob) {
        let birth = new Date(dob);
        let now = new Date();
        let beforeBirth = ((() => {
            birth.setDate(now.getDate()); birth.setMonth(now.getMonth()); return birth.getTime()
        })() < birth.getTime()) ? 0 : 1;
        return now.getFullYear() - birth.getFullYear() - beforeBirth;
    }

    GetFormattedDate(dob) {
        let monthNames = ["Jan", "Feb", "Mar", "Apr",
            "May", "Jun", "Jul", "Aug",
            "Sep", "Oct", "Nov", "Dec"];
        var newDate = new Date(dob);
        var newMonth = monthNames[newDate.getMonth()];
        var newDay = newDate.getDate();
        var newYear = newDate.getFullYear();
        const date = newDay + ' ' + newMonth + ', ' + newYear;
        return date;
    }

    formatAMPM(dob) {
        var time = new Date(dob)
        var hours = time.getHours();
        var minutes = time.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        console.log('strTime', strTime)
        return strTime;
    }

    convertString(caste) {
        if (caste != null) {
            let str = caste.join(', ');
            return str;
        } else {
            return false;
        }
    }


    async getProfile() {
        const id = this.state.profileSummary_id
        fetch(URL + 'profile?labels=true', {
            // fetch( URL + "profile/"+ params,{
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

                    if (responseJson.personal.gender == undefined) {
                        console.log('personal data not found')
                        this.setState({ loading: false, create_profile: true })
                    } else {

                        let personal = responseJson.personal;
                        let astro = responseJson.astro;
                        let career = responseJson.career;
                        let family = responseJson.family;
                        let photos = responseJson.photos;
                        let displayId = responseJson.displayId;

                        if (photos.length == 0) {
                            console.log('dp does not exit')
                        } else {
                            let obj = photos.find(o => o.isDisplayPic === true);
                            console.log(photos, "photos");
                            //this.setState({ dp: obj.url })

                            var array = photos
                            var result = array.map(({ url: uri, ...rest }) => ({ uri, ...rest }));
                            result.map(i => { i["dimensions"] = { width: 100, height: 300 } });
                            console.log('result', result)
                            this.setState({ images: result })
                        }

                        this.setState({
                            personal: personal, astro: astro, career: career,
                            family: family, photos: photos, displayId: displayId, loading: false
                        })
                        // console.log('responseJson photos', photos[0].url)
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
        const { show, hide, astro, personal, family, career, savedbtn, displayId, dp, lock_icon, save } = this.state;
        const { navigate } = this.props.navigation;
        if (this.state.loading) {
            return (
                <View style={styles.forindicator}>
                    <ActivityIndicator size="large" color={colors.primary} />
                </View>
            );
        }
        return (
            <Container style={{ flex: 1 }}>
                <StatusBar backgroundColor='#fff' barStyle='dark-content' />
                {this.state.create_profile == true ? (
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity activeOpacity={0.5} onPress={() => this.props.navigation.goBack()}>
                            <Image source={images.back} style={styles.backimg} tintColor='#000' />
                        </TouchableOpacity>
                        <View style={styles.forindicator}>
                            <Icon name="user-plus" size={100} color='#ccc' />
                            <Text style={[styles.subtitle, { color: '#ccc' }]}>Please create  your profile</Text>
                        </View>
                    </View>
                ) :
                    <View>
                        <NavigationEvents onDidFocus={() => this.componentDidMount()} />
                        <ScrollView>
                            <TouchableOpacity activeOpacity={0.5} onPress={() => this.props.navigation.goBack()}>
                                <Image source={images.back} style={styles.backimg} tintColor='#000' />
                            </TouchableOpacity>

                            <View style={{ marginVertical: 15 }}>
                                <View></View>
                                <Image source={{ uri: dp }} style={styles.editprofile} />
                                <View style={styles.profileribben} />
                                <View style={styles.ribbentxt}>
                                    <Text style={[styles.subtitle, { color: '#fff', fontSize: 16 }]}>Premium</Text>
                                </View>

                                <View style={{ position: 'absolute', top: 25, left: 20 }}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Galary', { images: this.state.images })}>
                                        <View style={styles.avatar}>
                                            <Image source={images.library}
                                                style={{ width: 20, height: 20 }}
                                                tintColor={'rgba(255, 255, 255, 0.74)'} />
                                        </View>

                                        <Badge
                                            badgeStyle={{ backgroundColor: '#D2D2D2' }}
                                            textStyle={styles.textStyle}
                                            value={this.state.photos.length}
                                            containerStyle={styles.containerStyle}
                                        />
                                    </TouchableOpacity>
                                </View>


                                <View style={styles.content}>


                                    <View style={styles.cardgradient}>
                                        <View>
                                            <Text style={[styles.subheading, { marginTop: '-12%' }]} numberOfLines={1} adjustsFontSizeToFit>{displayId}</Text>
                                        </View>
                                        <View>
                                            <Text style={[styles.subtitle, { color: '#02BE64' }]} numberOfLines={1} adjustsFontSizeToFit> <Icon name="check-circle" size={16} /> Verified Id</Text>
                                        </View>
                                        {/* <View>
                                    <Text style={[styles.subtitle, { color: '#75B3FB' }]} numberOfLines={1} adjustsFontSizeToFit> <Icon name="ban" size={16} /> Against Dowry</Text>
                                </View> */}
                                    </View>

                                    <View style={styles.cardgradient}>
                                        <View>
                                            <Text style={[styles.title, { marginBottom: '-5%' }]} adjustsFontSizeToFit>{this.get_age(astro.birthTime)} yrs, {personal.height}</Text>
                                            <Text style={[styles.title, { marginBottom: '-5%' }]} adjustsFontSizeToFit>{career.qualification} | {career.income}</Text>
                                            <Text style={[styles.title, { marginBottom: '-5%' }]} adjustsFontSizeToFit numberOfLines={1}>{career.occupation} | {career.city}</Text>
                                        </View>
                                        <View>
                                            <Text style={[styles.title, { marginBottom: '-5%' }]} adjustsFontSizeToFit>{personal.lname}</Text>
                                            <Text style={[styles.title, { marginBottom: '-5%' }]} adjustsFontSizeToFit>{career.state}</Text>
                                        </View>
                                    </View>

                                    <Card style={{ marginTop: 20 }}>
                                        <View style={styles.cardcontent}>
                                            <View style={styles.cardgradient}>
                                                <Text style={[styles.title, { color: colors.danger }]}>About</Text>
                                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Personal')}>
                                                    <Icon name='edit' size={20} color={'#CD286F'} />
                                                </TouchableOpacity>
                                            </View>
                                            <Text style={styles.subtitle}>{personal.bio}</Text>
                                        </View>
                                    </Card>

                                    <Card>
                                        <View style={styles.cardcontent}>
                                            <View style={styles.cardgradient}>
                                                <Text style={[styles.title, { color: colors.danger }]}>Personal Information</Text>
                                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Personal')}>
                                                    <Icon name='edit' size={20} color={'#CD286F'} />
                                                </TouchableOpacity>
                                            </View>
                                            <View style={styles.rowcontent}>
                                                <View style={styles.btnwidth}>
                                                    <Text style={styles.subtitle}>Name</Text>
                                                </View>
                                                <View style={styles.btnwidth}>
                                                    <Text style={styles.cardtxt}>{personal.fname} {personal.lname}</Text>
                                                </View>
                                            </View>
                                            {/* <View style={styles.rowcontent}>
                                        <View style={styles.btnwidth}>
                                            <Text style={styles.subtitle}>DOB</Text>
                                        </View>
                                        <View style={styles.btnwidth}>
                                            <Text style={styles.cardtxt}>{this.GetFormattedDate(astro.birthTime)}</Text>
                                        </View>
                                    </View> */}
                                            <View style={styles.rowcontent}>
                                                <View style={styles.btnwidth}>
                                                    <Text style={styles.subtitle}>Height</Text>
                                                </View>
                                                <View style={styles.btnwidth}>
                                                    <Text style={styles.cardtxt}>{personal.height}</Text>
                                                </View>
                                            </View>
                                            <View style={styles.rowcontent}>
                                                <View style={styles.btnwidth}>
                                                    <Text style={styles.subtitle}>Weight</Text>
                                                </View>
                                                <View style={styles.btnwidth}>
                                                    <Text style={styles.cardtxt}>{personal.weight}</Text>
                                                </View>
                                            </View>
                                            <View style={styles.rowcontent}>
                                                <View style={styles.btnwidth}>
                                                    <Text style={styles.subtitle}>Physically Challenged</Text>
                                                </View>
                                                <View style={styles.btnwidth}>
                                                    <Text style={styles.cardtxt}>{personal.physicallyChallenged}</Text>
                                                </View>
                                            </View>
                                            <View style={styles.rowcontent}>
                                                <View style={styles.btnwidth}>
                                                    <Text style={styles.subtitle}>Marital Status</Text>
                                                </View>
                                                <View style={styles.btnwidth}>
                                                    <Text style={styles.cardtxt}>{personal.maritalStatus}</Text>
                                                </View>
                                            </View>
                                            <View style={styles.rowcontent}>
                                                <View style={styles.btnwidth}>
                                                    <Text style={styles.subtitle}>Profile Created By</Text>
                                                </View>
                                                <View style={styles.btnwidth}>
                                                    <Text style={styles.cardtxt}>{personal.profileCreator}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </Card>

                                    <Card>
                                        <View style={styles.cardcontent}>
                                            <View style={styles.cardgradient}>
                                                <Text style={[styles.title, { color: colors.danger }]}>Education Career</Text>
                                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Career')}>
                                                    <Icon name='edit' size={20} color={'#CD286F'} />
                                                </TouchableOpacity>
                                            </View>
                                            <View style={styles.rowcontent}>
                                                <View style={styles.btnwidth}>
                                                    <Text style={styles.subtitle}>Highest Qualification</Text>
                                                </View>
                                                <View style={styles.btnwidth}>
                                                    <Text style={styles.cardtxt}>{career.qualification}</Text>
                                                </View>
                                            </View>

                                            <View style={styles.rowcontent}>
                                                <View style={styles.btnwidth}>
                                                    <Text style={styles.subtitle}>College/University</Text>
                                                </View>
                                                <View style={styles.btnwidth}>
                                                    <Text style={styles.cardtxt}>{career.college}</Text>
                                                </View>
                                            </View>
                                            <View style={styles.rowcontent}>
                                                <View style={styles.btnwidth}>
                                                    <Text style={styles.subtitle}>UG College/University</Text>
                                                </View>
                                                <View style={styles.btnwidth}>
                                                    <Text style={styles.cardtxt}>{career.ugCollege}</Text>
                                                </View>
                                            </View>
                                            <View style={styles.rowcontent}>
                                                <View style={styles.btnwidth}>
                                                    <Text style={styles.subtitle}>UG Degree</Text>
                                                </View>
                                                <View style={styles.btnwidth}>
                                                    <Text style={styles.cardtxt}>{career.ugDegree}</Text>
                                                </View>
                                            </View>
                                            <View style={styles.rowcontent}>
                                                <View style={styles.btnwidth}>
                                                    <Text style={styles.subtitle}>Employed In</Text>
                                                </View>
                                                <View style={styles.btnwidth}>
                                                    <Text style={styles.cardtxt}>{career.sector}</Text>
                                                </View>
                                            </View>
                                            <View style={styles.rowcontent}>
                                                <View style={styles.btnwidth}>
                                                    <Text style={styles.subtitle}>Occupation</Text>
                                                </View>
                                                <View style={styles.btnwidth}>
                                                    <Text style={styles.cardtxt}>{career.occupation}</Text>
                                                </View>
                                            </View>
                                            <View style={styles.rowcontent}>
                                                <View style={styles.btnwidth}>
                                                    <Text style={styles.subtitle}>Company Name</Text>
                                                </View>
                                                <View style={styles.btnwidth}>
                                                    <Text style={styles.cardtxt}>{career.company}</Text>
                                                </View>
                                            </View>
                                            <View style={styles.rowcontent}>
                                                <View style={styles.btnwidth}>
                                                    <Text style={styles.subtitle}>Annual Income</Text>
                                                </View>
                                                <View style={styles.btnwidth}>
                                                    <Text style={styles.cardtxt}>{career.income}</Text>
                                                </View>
                                            </View>
                                            <View style={styles.rowcontent}>
                                                <View style={styles.btnwidth}>
                                                    <Text style={styles.subtitle}>Work Country</Text>
                                                </View>
                                                <View style={styles.btnwidth}>
                                                    <Text style={styles.cardtxt}>{career.country}</Text>
                                                </View>
                                            </View>
                                            <View style={styles.rowcontent}>
                                                <View style={styles.btnwidth}>
                                                    <Text style={styles.subtitle}>Work State</Text>
                                                </View>
                                                <View style={styles.btnwidth}>
                                                    <Text style={styles.cardtxt}>{career.state}</Text>
                                                </View>
                                            </View>
                                            <View style={styles.rowcontent}>
                                                <View style={styles.btnwidth}>
                                                    <Text style={styles.subtitle}>Work City</Text>
                                                </View>
                                                <View style={styles.btnwidth}>
                                                    <Text style={styles.cardtxt}>{career.city}</Text>
                                                </View>
                                            </View>

                                        </View>
                                    </Card>

                                    <Card>
                                        <View style={styles.cardcontent}>
                                            <View style={styles.cardgradient}>
                                                {/* <Text style={[styles.title, { color: colors.danger }]}>Astro Details</Text> */}
                                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Astro')}>
                                                    <Icon name='edit' size={20} color={'#CD286F'} />
                                                </TouchableOpacity>
                                            </View>
                                            <View style={styles.rowcontent}>
                                                <View style={styles.btnwidth}>
                                                    <Text style={styles.subtitle}>DOB</Text>
                                                </View>
                                                <View style={styles.btnwidth}>
                                                    <Text style={styles.cardtxt}>{this.GetFormattedDate(astro.birthTime)}</Text>
                                                </View>
                                            </View>
                                            <View style={styles.rowcontent}>
                                                <View style={styles.btnwidth}>
                                                    <Text style={styles.subtitle}>Time of Birth</Text>
                                                </View>
                                                <View style={styles.btnwidth}>
                                                    <Text style={styles.cardtxt}>{this.formatAMPM(astro.birthTime)}</Text>
                                                </View>
                                            </View>

                                            <View style={styles.rowcontent}>
                                                <View style={styles.btnwidth}>
                                                    <Text style={styles.subtitle}>Birth State</Text>
                                                </View>
                                                <View style={styles.btnwidth}>
                                                    <Text style={styles.cardtxt}>{astro.birthState}</Text>
                                                </View>
                                            </View>
                                            <View style={styles.rowcontent}>
                                                <View style={styles.btnwidth}>
                                                    <Text style={styles.subtitle}>Birth City</Text>
                                                </View>
                                                <View style={styles.btnwidth}>
                                                    <Text style={styles.cardtxt}>{astro.birthCity}</Text>
                                                </View>
                                            </View>
                                            <View style={styles.rowcontent}>
                                                <View style={styles.btnwidth}>
                                                    <Text style={styles.subtitle}>Manglik Status</Text>
                                                </View>
                                                <View style={styles.btnwidth}>
                                                    <Text style={styles.cardtxt}>{astro.manglikDetails}</Text>
                                                </View>
                                            </View>

                                        </View>
                                    </Card>

                                    <Card>
                                        <View style={styles.cardcontent}>
                                            <View style={styles.cardgradient}>
                                                <Text style={[styles.title, { color: colors.danger }]}>About Family</Text>
                                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Family')}>
                                                    <Icon name='edit' size={20} color={'#CD286F'} />
                                                </TouchableOpacity>
                                            </View>

                                            <Text style={styles.subtitle}>{family.about}</Text>
                                        </View>
                                    </Card>

                                    <Card>
                                        <View style={styles.cardcontent}>
                                            <View style={styles.cardgradient}>
                                                <Text style={[styles.title, { color: colors.danger }]}>Family Details</Text>
                                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Family')}>
                                                    <Icon name='edit' size={20} color={'#CD286F'} />
                                                </TouchableOpacity>
                                            </View>

                                            <View style={styles.rowcontent}>
                                                <View style={styles.btnwidth}>
                                                    <Text style={styles.subtitle}>Family Orignally From</Text>
                                                </View>
                                                <View style={styles.btnwidth}>
                                                    <Text style={styles.cardtxt}>{family.originallyFromState}</Text>
                                                </View>
                                            </View>
                                            <View style={styles.rowcontent}>
                                                <View style={styles.btnwidth}>
                                                    <Text style={styles.subtitle}>Currently Living In</Text>
                                                </View>
                                                <View style={styles.btnwidth}>
                                                    <Text style={styles.cardtxt}>{family.currentPlace}</Text>
                                                </View>
                                            </View>
                                            <View style={styles.rowcontent}>
                                                <View style={styles.btnwidth}>
                                                    <Text style={styles.subtitle}>Family Status</Text>
                                                </View>
                                                <View style={styles.btnwidth}>
                                                    <Text style={styles.cardtxt}>{family.familyStatus}</Text>
                                                </View>
                                            </View>
                                            <View style={styles.rowcontent}>
                                                <View style={styles.btnwidth}>
                                                    <Text style={styles.subtitle}>Family Value</Text>
                                                </View>
                                                <View style={styles.btnwidth}>
                                                    <Text style={styles.cardtxt}>{family.familyValues}</Text>
                                                </View>
                                            </View>

                                            <View style={styles.rowcontent}>
                                                <View style={styles.btnwidth}>
                                                    <Text style={styles.subtitle}>Brother's</Text>
                                                </View>
                                                <View style={styles.btnwidth}>
                                                    <Text style={styles.cardtxt}>{family.brothers}, {family.marriedBrothers} Brother Married</Text>
                                                </View>
                                            </View>
                                            <View style={styles.rowcontent}>
                                                <View style={styles.btnwidth}>
                                                    <Text style={styles.subtitle}>Sister's</Text>
                                                </View>
                                                <View style={styles.btnwidth}>
                                                    <Text style={styles.cardtxt}>{family.sisters}, {family.marriedSisters} Sister Married</Text>
                                                </View>
                                            </View>

                                            <View style={styles.rowcontent}>
                                                <View style={styles.btnwidth}>
                                                    <Text style={styles.subtitle}>Father's Occupation</Text>
                                                </View>
                                                <View style={styles.btnwidth}>
                                                    <Text style={styles.cardtxt}>{family.fatherOccupation}</Text>
                                                </View>
                                            </View>
                                            <View style={styles.rowcontent}>
                                                <View style={styles.btnwidth}>
                                                    <Text style={styles.subtitle}>Mother's Occupation</Text>
                                                </View>
                                                <View style={styles.btnwidth}>
                                                    <Text style={styles.cardtxt}>{family.motherOccupation}</Text>
                                                </View>
                                            </View>
                                            <View style={styles.rowcontent}>
                                                <View style={styles.btnwidth}>
                                                    <Text style={styles.subtitle}>Mother's Surname Name</Text>
                                                </View>
                                                <View style={styles.btnwidth}>
                                                    <Text style={styles.cardtxt}>{family.motherSurname}</Text>
                                                </View>
                                            </View>

                                            <View style={styles.border} />
                                            <View>
                                                <Text style={styles.subtitle}>Mother orignally from</Text>
                                                <Text style={styles.cardtxt}>{family.motherOriginallyFrom}</Text>
                                            </View>

                                            <View style={styles.border} />
                                            <View>
                                                <Text style={styles.subtitle}>Relation in caste</Text>
                                                <Text style={styles.cardtxt}>{this.convertString(family.casteRelations)}</Text>
                                            </View>

                                            <View style={styles.border} />
                                            <View>
                                                <Text style={styles.subtitle}>Relation in State/Thikana</Text>
                                                <Text style={styles.cardtxt}>{family.stateRelations}</Text>
                                            </View>

                                        </View>
                                    </Card>

                                    <Card>
                                        <View style={styles.cardcontent}>
                                            <Text style={[styles.title, { color: colors.danger }]}>Contact Details</Text>
                                            <View style={styles.rowcontent}>
                                                <View style={styles.btnwidth}>
                                                    <Text style={styles.subtitle}>Name of Contact Person</Text>
                                                </View>
                                                <View style={styles.btnwidth}>
                                                    <Text style={styles.cardtxt}>{family.pocName}</Text>
                                                </View>
                                            </View>
                                            <View style={styles.rowcontent}>
                                                <View style={styles.btnwidth}>
                                                    <Text style={styles.subtitle}>Contact Number</Text>
                                                </View>
                                                <View style={styles.btnwidth}>
                                                    <Text style={styles.cardtxt}>{family.pocNumber}, {family.altNumber}</Text>
                                                </View>
                                            </View>
                                            <View style={styles.rowcontent}>
                                                <View style={styles.btnwidth}>
                                                    <Text style={styles.subtitle}>Email'Id</Text>
                                                </View>
                                                <View style={styles.btnwidth}>
                                                    <Text style={styles.cardtxt}>{family.email}</Text>
                                                </View>
                                            </View>

                                        </View>
                                    </Card>

                                </View>

                            </View>

                        </ScrollView>
                    </View>
                }
            </Container>
        );
    }
}
