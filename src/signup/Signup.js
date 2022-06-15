import React from 'react';
import {
  View, Dimensions, StatusBar, Image, TouchableOpacity, Text, ScrollView, FlatList, AsyncStorage, ActivityIndicator,
  BackHandler, Alert
} from 'react-native';
import { images, fontsize, fontfamily, colors } from '../globalstyles/Style';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './Style';
import { Container, Item } from 'native-base';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-picker';
import { Badge, } from 'react-native-elements';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Avatar } from 'react-native-elements';
// import { AnimatedCircularProgress } from 'react-native-circular-progress';
// import AsyncStorage from '@react-native-community/async-storage';
import { URL } from '../constant/Constant';
import { myToken } from '../token/Token';
import Toast from 'react-native-simple-toast';
import { NavigationEvents } from 'react-navigation';
import Search from './Search_result';
import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import Profile from '../profile/Profile';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

var searchObj = new Search();
const windowWidth = Dimensions.get("window").width;
var { width } = Dimensions.get('window');
var slides = [];
export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0, dp: '', status: '',
      photo: null, imagePath: require('../RL_images/vector.jpeg'),
      show: true, receievedShortlists: [], creInt_sent: true,
      accept_youInt: [], accept_yourInt: [],
      sentInterests: [], receivedInterests: [], sentShortlists: [], loading: true, profile_id: '',
      sentProfileViews: [], receivedProfileViews: [], follow: false, percent: 0,
    };
  }



  async getProfile() {
    fetch(URL + 'profile', {
      method: 'GET',
      headers: {
        'Authorization': await myToken(),
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.code == "not-found") {
          this.setState({ loading: false, })
          console.log('msg', responseJson.msg)
        } else {
          let sentInterests = responseJson.sentInterests;
          let receivedInterests = responseJson.receivedInterests;
          let sentShortlists = responseJson.sentShortlists;
          let receievedShortlists = responseJson.receievedShortlists;
          let sentProfileViews = responseJson.sentProfileViews;
          let receivedProfileViews = responseJson.receivedProfileViews;
          let profile_id = responseJson.id
          console.log(receivedProfileViews, "this is the recieved profileviews");

          let photos = responseJson.photos;
          if (photos.length == 0) {
            console.log('dp does not exit')
          } else {
            let obj = photos.find(o => o.isDisplayPic === true);
            console.log(photos.length, "photos");
            this.setState({ dp: obj.url })
          }

          let receivedInterestslist = receivedInterests.filter(a => a.status !== "accepted");

          receievedShortlists.map(i => { i["status"] = true });
          sentShortlists.map(i => { i["status"] = true });

          let accept_youInt = receivedInterests.filter(a => a.status == "accepted");
          let accept_yourInt = sentInterests.filter(a => a.status == "accepted");

          this.setState({
            sentInterests: sentInterests, receivedInterests: receivedInterestslist, accept_youInt: accept_youInt,
            sentShortlists: sentShortlists, receievedShortlists: receievedShortlists, loading: false, accept_yourInt: accept_yourInt,
            profile_id: profile_id, sentProfileViews: sentProfileViews, receivedProfileViews: receivedProfileViews
          })
          //console.log('profile_id',profile_id)
        }
      })
      .catch(error => {
        console.error('something went wrong...', error);
      });
  }

  async accept_interest(interest_id) {
    let params = { acceptance: true }

    fetch(URL + 'interests/' + interest_id + '/acceptance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': await myToken(),
      },
      body: JSON.stringify(params)
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log('accept data:', responseJson);
        let accept_youInt = this.state.receivedInterests.filter(a => a.status == "accepted");
        let receivedInterests = this.state.receivedInterests.filter(a => a.status !== "accepted");

        let sentInterests = [...this.state.sentInterests]
        let index = sentInterests.findIndex(el => el.id === interest_id);
        sentInterests[index] = { ...sentInterests[index], status: "accepted" };
        this.setState({ sentInterests: sentInterests });
        let accept_yourInt = this.state.sentInterests.filter(a => a.status == "accepted");
        this.setState({ accept_youInt: accept_youInt, accept_yourInt: accept_yourInt, receivedInterests: receivedInterests })
      })
      .catch(error => {
        console.error('accept reject interest: something went wrong...', error);
      });
  }

  async getfeatured() {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", await myToken());

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("https://asia-south1-rajput-matrimony-8f30a.cloudfunctions.net/api/profile/featured", requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result, "kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkknnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn////////////////////////////");
        const obj = JSON.parse(result);
        //console.log(obj[0].displayPicUrl,"this is displaypic url") ;
        //  slides = [
        //   {
        //     key: 's1',
        //     text: 'Lorem Ipsum has been the industry standard dummy text ',
        //     title: 'Mobile Recharge',
        //     image: obj[0].displayPicUrl,



        //   },
        //   {
        //     key: 's2',
        //     title: 'Flight Booking',
        //     text: 'Lorem Ipsum has been the industry standard dummy text ',
        //     image: images.image6,
        //   },
        //   {
        //     key: 's3',
        //     title: 'Great Offers',
        //     text: 'Lorem Ipsum has been the industry standard dummy text ',
        //     image: images.image6,
        //   },
        // ];
        slides = obj;

        this.setState({ follow: true });
        // console.log(slide,"hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh this is slide")
      })
      .catch(error => console.log('error', error));
  }



  async reject_interest(interest_id) {
    let params = { acceptance: false }

    fetch(URL + 'interests/' + interest_id + '/acceptance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': await myToken(),
      },
      body: JSON.stringify(params)
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log('reject data:', responseJson);
        let rejct_acceptyourInt = this.state.accept_yourInt.filter(a => a.id !== interest_id);
        let rejct_acceptyouInt = this.state.accept_youInt.filter(a => a.id !== interest_id);
        this.setState({ accept_yourInt: rejct_acceptyourInt, accept_youInt: rejct_acceptyouInt })
      })
      .catch(error => {
        console.error(' reject interest: something went wrong...', error);
      });
  }

  async undo_interest(interest_id) {
    fetch(URL + 'interests/' + interest_id + '/undo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': await myToken(),
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log('undo_interest data :', responseJson)
        let Undo_acceptyouInt = this.state.accept_youInt.filter(a => a.id !== interest_id);
        let Undo_accept_yourInt = this.state.accept_yourInt.filter(a => a.id !== interest_id);

        this.setState({ accept_youInt: Undo_acceptyouInt, accept_yourInt: Undo_accept_yourInt })

        let receivedInterests = [...this.state.receivedInterests]
        let index = receivedInterests.findIndex(el => el.id === interest_id);
        receivedInterests[index] = { ...receivedInterests[index], status: "pending" };

        this.setState({ receivedInterests: receivedInterests });
      })
      .catch(error => {
        console.error(' undo_interest : something went wrong...', error);
      });
  }

  async dlt_interest(interest_id) {
    console.log('interest_id =>' + URL + 'interests/' + interest_id,)
    fetch(URL + "interests/" + interest_id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': await myToken(),
      },
    })
      .then(response => {
        if (response.ok == true) {
          let sentInterests_arr = this.state.sentInterests
          let s = sentInterests_arr.splice(sentInterests_arr.findIndex(a => a.id === interest_id))
          Toast.show('Deleted.', Toast.LONG);

          let receivedInterests_arr = this.state.receivedInterests
          let r = receivedInterests_arr.splice(receivedInterests_arr.findIndex(a => a.id === interest_id))

          let ex1 = sentInterests_arr.filter(a => a.id !== interest_id);
          let ex2 = receivedInterests_arr.filter(a => a.id !== interest_id);

          this.setState({ sentInterests: ex1, receivedInterests: ex2 })
        }
      })
      .catch(error => {
        console.error(' delete interest: something went wrong...', JSON.stringify(error));
      });
  }

  async create_shortlists(profileId) {
    // console.log('profileId',profileId)
    let params = {
      "profileId": profileId
    }
    fetch(URL + 'shortlists/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': await myToken(),
      },
      body: JSON.stringify(params)
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.code == "not-found") {
          console.log('create_shortlists :', responseJson.msg)
        } else {
          console.log('create_shortlists data :', responseJson)
        }
      })
      .catch(error => {
        console.error('create_shortlists : something went wrong...', error);
      });
  }

  async create_interest(profileId, id) {
    let params = {
      "profileId": profileId
    }
    fetch(URL + 'interests/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': await myToken(),
      },
      body: JSON.stringify(params)
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.code == "not-found") {
          console.log('create_interest :', responseJson.msg)
        } else {
          console.log('create_interest data :', responseJson)

          let receievedShortlists = [...this.state.receievedShortlists]
          let index = receievedShortlists.findIndex(el => el.id === id);
          receievedShortlists[index] = { ...receievedShortlists[index], status: false };

          let sentShortlists = [...this.state.sentShortlists]
          let index1 = sentShortlists.findIndex(el => el.id === id);
          sentShortlists[index1] = { ...sentShortlists[index1], status: false };

          this.setState({ receievedShortlists: receievedShortlists, sentShortlists: sentShortlists });
          //  console.log('sentShortlists',this.state.sentShortlists  );

          let receivedInterests = this.state.receivedInterests
          receivedInterests.push(responseJson);
          //  console.log('receivedInterests',receivedInterests)
        }
      })
      .catch(error => {
        console.error('create_interest : something went wrong...', error);
      });
  }

  async dlt_shortlist(shortlist_Id) {
    console.log('interest_id =>' + URL + 'interests/' + shortlist_Id,)
    fetch(URL + "shortlists/" + shortlist_Id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': await myToken(),
      },
    })
      .then(response => {
        if (response.ok == true) {
          console.log('response', response);
          let sentShortlists_arr = this.state.sentShortlists
          console.log('sentShortlists array', sentShortlists_arr)
          let s = sentShortlists_arr.splice(sentShortlists_arr.findIndex(a => a.id === shortlist_Id))
          let ex1 = sentShortlists_arr.filter(a => a.id !== shortlist_Id);
          this.setState({ sentShortlists: ex1 })
        }
      })
      .catch(error => {
        console.error(' delete dlt_shortlist: something went wrong...', error);
      });
  }

  accInt_data(id) {
    let receivedInterests = [...this.state.receivedInterests]
    let index = receivedInterests.findIndex(el => el.id === id);
    receivedInterests[index] = { ...receivedInterests[index], status: "accepted" };
    this.setState({ receivedInterests: receivedInterests });
    console.log('accInt_data', this.state.receivedInterests);
  }

  rjtInt_data(id) {
    let receivedInterests = [...this.state.receivedInterests]
    let index = receivedInterests.findIndex(el => el.id === id);
    receivedInterests[index] = { ...receivedInterests[index], status: "declined" };
    this.setState({ receivedInterests: receivedInterests });
    console.log('rjtInt_data', this.state.receivedInterests);
  }

  interest_receivedStatus(status, id, lastUpdateTime) {
    let d = new Date(lastUpdateTime)
    let getDate = d.getDate()
    let getmonth = d.getMonth() + 1
    let getyear = d.getFullYear()
    let dd = getDate + '/' + getmonth + '/' + getyear
    if (status == "pending") {
      return <View style={styles.btncontiner}>
        <View style={styles.btnwidth}>
          <TouchableOpacity onPress={() => { this.accept_interest(id, this.accInt_data(id)) }}
            style={styles.btnsty}>
            <Text style={styles.btntxt}>Accept</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.btnwidth}>
          <TouchableOpacity onPress={() => { this.reject_interest(id, this.rjtInt_data(id)) }}
            style={styles.btnstyborder}>
            <Text style={styles.btntxtborder}>Decline</Text>
          </TouchableOpacity>
        </View>
      </View>
    }

    // if(status=="accepted"){
    //   return <View style={styles.btncontiner}>
    //   <View style={styles.btnwidth}>
    //     <TouchableOpacity 
    //       style={styles.btnsty}>
    //       <Text style={styles.btntxt}>Contact</Text>
    //     </TouchableOpacity>
    //   </View>

    //   <View style={styles.btnwidth}>
    //     <TouchableOpacity onPress={() => { this.reject_interest(id,this.rjtInt_data(id)) }}
    //       style={styles.btnstyborder}>
    //       <Text style={styles.btntxtborder}>Decline</Text>
    //     </TouchableOpacity>
    //   </View>
    // </View>
    // }

    if (status == "declined") {
      return <View style={{ marginTop: 5 }}>
        <TouchableOpacity onPress={() => { this.accept_interest(id, this.accInt_data(id)) }}
          style={styles.btnsty}>
          <Text style={styles.btntxt} numberOfLines={1} >Accept Again {''}<Text style={styles.text} adjustsFontSizeToFit>(You declined interest on {dd})</Text></Text>
        </TouchableOpacity>
      </View>
    }
  }

  shortlist_Status(profileId, status, id) {
    if (status == "not-sent") {
      return <View style={styles.btncontiner}>
        <View style={styles.btnwidth}>
          <TouchableOpacity onPress={() => this.create_interest(profileId, id)}
            style={styles.btnsty}>
            <Text style={styles.btntxt}>Send Interest</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btnwidth}>
          <TouchableOpacity onPress={() => { this.dlt_shortlist(id) }}
            style={styles.btnstyborder}>
            <Text style={styles.btntxtborder}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    } else {
      return <View style={styles.btncontiner}>
        <View style={styles.btnwidth}>
          <View
            style={styles.btnsty}>
            <Text style={styles.btntxt}>Sent</Text>
          </View>
        </View>
        <View style={styles.btnwidth}>
          <TouchableOpacity onPress={() => { this.dlt_shortlist(id) }}
            style={styles.btnstyborder}>
            <Text style={styles.btntxtborder}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    }

  }

  shortlisted_meStatus(profileId, status, id) {
    if (status == "not-sent") {
      return <TouchableOpacity onPress={() => this.create_interest(profileId, id)}
        style={[styles.btnsty, { width: '100%' }]}>
        <Text style={styles.btntxt}>Send Interest</Text>
      </TouchableOpacity>
    } else {
      return <View style={[styles.btnsty, { width: '100%' }]}>
        <Text style={styles.btntxt}>Sent</Text>
      </View>
    }
  }

  async fcmTokensupply(token) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", await myToken());
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({ "fcmToken": { token } });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("https://asia-south1-rajput-matrimony-8f30a.cloudfunctions.net/api/devices", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

  }


  //fcm token
  async requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      // 
      console.log('Authorization status hhhhhhhhhhhhhhhhhhhh:', authStatus);
      const fcmToken = await firebase.messaging().getToken();
      console.log(fcmToken, "this is fcmToken");
      this.fcmTokensupply(fcmToken);
      // var promise = new Promise(function(resolve, reject) {
      //   // do some long running async thingâ€¦
      //   var fcmToken = null;
      //   fcmToken =  firebase.messaging().getToken();
      //   if (fcmToken!==null) {
      //     return fcmToken;
      //   }
      //   else {
      //     reject(Error("It broke"));
      //   }
      // });

      // //usage
      // promise.then(
      //   function(result) { console.log(result,"got the result") },
      //   function(error) { console.log(error,"didn't get the result") }
      // );


    }
  }

  async getPercent() {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', await myToken());

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(
      'https://asia-south1-rajput-matrimony-8f30a.cloudfunctions.net/api/profile/completionPercentage',
      requestOptions,
    )
      .then((response) => response.text())
      .then((result) => {
        let obj = JSON.parse(result);
        console.log(
          obj.completionPercentage,
          'sssssssssssssssssssaaaaaaaaaaaaaaaaaaaaaaaaakkkkkkkkkkkkkkkiiiiiiiiiiiiiiiiiiii',
        );
        this.setState({ percent: obj.completionPercentage });

      })
      .catch((error) => console.log('error', error));
  }


  componentDidMount() {
    this.getProfile();
    this.requestUserPermission();
    this.getPercent();



  }

  componentWillMount() {
    this.getfeatured();
    console.log("object")
  }

  get_age(dob) {
    // console.log('dd',dob)
    let birth = new Date(dob);
    let now = new Date();
    let beforeBirth = ((() => {
      birth.setDate(now.getDate()); birth.setMonth(now.getMonth()); return birth.getTime()
    })() < birth.getTime()) ? 0 : 1;
    return now.getFullYear() - birth.getFullYear() - beforeBirth;
  }

  _renderItem = ({ item }) => {
    //console.log(item,"this is item from renderitem");
    return (
      <View style={styles.featurecard}>
        <TouchableOpacity onPress={() => { this.props.navigation.navigate("FullProfileView", { profileSummary_id: item.id }) }}>
          <Image source={{ uri: item.displayPicUrl }} style={styles.featureimg} />
          <View style={styles.ribben} />
          <View style={styles.ribbentxt}>
            <Text style={[styles.subtitle, { color: '#fff', fontSize: 16, marginTop: '2%' }]}>Premium</Text>
          </View>

          <View style={{ position: 'absolute', top: 25, left: 20 }}>
            <View style={styles.avatar}>
              <Image source={images.library}
                style={{ width: 20, height: 20 }}
                tintColor={'rgba(255, 255, 255, 0.74)'} />
            </View>

            <Badge
              badgeStyle={{ backgroundColor: '#D2D2D2' }}
              textStyle={styles.textStyle}
              value={3}
              containerStyle={styles.containerStyle}
            />
          </View>

          <LinearGradient
            colors={['rgba(0, 0, 0, 0)', 'rgba(0,0,0,1)']}
            style={styles.linergradient}>
            <View style={styles.linearGradientcover}>

              <View style={[styles.cardgradient, { marginBottom: '-5%' }]}>
                {/* <View style={{width:'30%',justifyContent:'center'}}> */}
                <View>
                  <Text style={[styles.subheading, { color: '#fff', marginTop: '-12%' }]} numberOfLines={1} adjustsFontSizeToFit>{item.gender}</Text>
                </View>
                {/* <View style={{width:'33.3%', justifyContent:'center'}}> */}
                <View>
                  <Text style={[styles.subtitle, { color: '#02BE64', paddingEnd: '15%', marginTop: '3%' }]} numberOfLines={1} adjustsFontSizeToFit> <Icon name="check-circle" size={16} /> Verified Id</Text>
                </View>
                {/* <View style={{width:'36.6%',justifyContent:'center'}}> */}
                <View >
                  <Text style={[styles.subtitle, { color: '#75B3FB', marginRight: '30%' }]} numberOfLines={1} adjustsFontSizeToFit> <Icon name="ban" size={16} /> Against Dowry</Text>
                </View>
              </View>

              <View style={styles.cardgradient}>
                {/* <View style={{width:'70%'}}> */}
                <View>
                  <Text style={[styles.title, { color: '#fff', marginBottom: '-8%' }]} adjustsFontSizeToFit>{item.fname}</Text>
                  <Text style={[styles.title, { color: '#fff', marginBottom: '-8%' }]} adjustsFontSizeToFit>{item.occupation ? item.occupation : <Text>NA</Text>} </Text>
                  <Text style={[styles.title, { color: '#fff', marginBottom: '-8%' }]} adjustsFontSizeToFit numberOfLines={1}>{item.city ? item.city : <Text>NA</Text>} </Text>
                </View>
                {/* <View style={{width:'30%'}}> */}
                <View>
                  <Text style={[styles.title, { color: '#fff', marginBottom: '-8%', marginLeft: '50%' }]} adjustsFontSizeToFit>{item.lname}</Text>
                  <Text style={[styles.title, { color: '#fff', marginTop: '8%', marginLeft: '50%' }]} adjustsFontSizeToFit>{item.state ? item.state : <Text>NA</Text>}</Text>
                </View>
              </View>

            </View>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.cardfooter}>
          <TouchableOpacity style={styles.centeralign} onPress={() => { searchObj.create_Interest(item.id) }}>
            <Image source={images.contact} style={styles.footerimg} tintColor={'#CD286F'} />
            <Text style={styles.footertxt}>Send</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.centeralign} onPress={() => { searchObj.create_shortlists(item.id) }}>
            <Image source={images.save} style={styles.footerimg} tintColor={'#CD286F'} />
            <Text style={styles.footertxt}>Save</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity style={styles.centeralign}>
            <Image source={images.chat} style={styles.footerimg} tintColor={'#CD286F'} />
            <Text style={styles.footertxt}>Chat</Text>
          </TouchableOpacity> */}

          <TouchableOpacity style={styles.centeralign} onPress={() => { searchObj.onShare(item.id) }}>
            <Image source={images.whatsapp} style={styles.footerimg} tintColor={'#00E676'} />
            <Text style={styles.footertxt}>Share</Text>
          </TouchableOpacity>
        </View>

      </View>

    );
  };

  _renderItemReceived = ({ item }) => {
    if (item.status !== "accepted") {
      return (
        <View style={{ flex: 1 }}>
          <TouchableOpacity style={styles.card}
            onPress={() => { this.props.navigation.navigate('InterestProfileView', { profileSummary_id: item.profileSummary.id, profile_id: this.state.profile_id }) }}>
            <View style={{ width: '35%' }}>
              <Image source={{ uri: item.profileSummary.displayPicUrl }}
                resizeMode='cover' style={styles.personimg} />
            </View>
            <View style={styles.crdrow}>
              <View style={[styles.border, { flexDirection: 'row', alignItems: 'center' }]}>
                <View style={styles.btnwidth}>
                  <Text style={styles.subheading}>{item.profileSummary.displayId}</Text>
                </View>

                <View style={styles.btnwidth}>
                  <Text style={styles.righttxt}>{this.get_age(item.profileSummary.dob)} yrs</Text>
                </View>
              </View>


              <View style={{ flexDirection: 'row' }}>
                <View style={styles.btnwidth}>
                  <Text style={styles.title} numberOfLines={1}>{item.profileSummary.qualification}</Text>
                  <Text style={styles.title} numberOfLines={1}>{item.profileSummary.occupation}</Text>
                </View>

                <View style={styles.btnwidth}>
                  <Text style={styles.titlergt} numberOfLines={1} >{item.profileSummary.lname}</Text>
                  <Text style={styles.titlergt} numberOfLines={1}>{item.profileSummary.city}</Text>
                </View>
              </View>

            </View>
            <View style={styles.border} />
          </TouchableOpacity>

          <View>
            {this.interest_receivedStatus(item.status, item.id, item.lastUpdateTime)}
          </View>

        </View>
      )
    }
  }

  _renderItemSent = ({ item }) => {
    // console.log("item", item.profileSummary.fname)
    return (
      <View>
        <View style={styles.card}>

          <View style={{ width: '35%' }}>
            <Image source={{ uri: item.profileSummary.displayPicUrl }}
              resizeMode='cover' style={styles.personimg} />
          </View>
          <View style={styles.crdrow}>
            <View style={[styles.border, { flexDirection: 'row' }]}>
              <View style={styles.btnwidth}>
                <Text style={styles.subheading}>{item.profileSummary.displayId}</Text>
              </View>

              <View style={styles.btnwidth}>
                <Text style={styles.righttxt}>{this.get_age(item.profileSummary.dob)} yrs</Text>
              </View>

            </View>

            <View style={{ flexDirection: 'row' }}>
              <View style={[styles.btnwidth, { marginBottom: 10 }]}>
                <Text style={styles.title} numberOfLines={1}>{item.profileSummary.qualification}</Text>
                <Text style={[styles.title]} numberOfLines={1}>{item.profileSummary.occupation}</Text>
              </View>

              <View style={styles.btnwidth}>
                <Text style={styles.titlergt} numberOfLines={1}>{item.profileSummary.lname}</Text>
                <Text style={styles.titlergt} numberOfLines={1}>{item.profileSummary.city}</Text>
              </View>
            </View>

          </View>

        </View>

        <View style={[styles.undobtn]}>
          <TouchableOpacity onPress={() => { this.dlt_interest(item.id) }}>
            <Text style={styles.btntxtborder}>Cancel</Text>
          </TouchableOpacity>
        </View>

      </View>

    )
  }

  _renderItemAccepted = ({ item }) => {

    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity style={styles.card}
          onPress={() => { this.props.navigation.navigate('FullProfileView', { profileSummary_id: item.profileSummary.id }) }}>
          <View style={{ width: '35%' }}>
            <Image source={{ uri: item.profileSummary.displayPicUrl }}
              resizeMode='cover' style={styles.personimg} />
          </View>
          <View style={styles.crdrow}>
            <View style={[styles.border, { flexDirection: 'row', alignItems: 'center' }]}>
              <View style={styles.btnwidth}>
                <Text style={styles.subheading}>{item.profileSummary.displayId}</Text>
              </View>

              <View style={styles.btnwidth}>
                <Text style={styles.righttxt}>{this.get_age(item.profileSummary.dob)} yrs</Text>
              </View>
            </View>


            <View style={{ flexDirection: 'row' }}>
              <View style={styles.btnwidth}>
                <Text style={styles.title} numberOfLines={1}>{item.profileSummary.qualification}</Text>
                <Text style={styles.title} numberOfLines={1}>{item.profileSummary.occupation}</Text>
              </View>

              <View style={styles.btnwidth}>
                <Text style={styles.titlergt} numberOfLines={1} >{item.profileSummary.lname}</Text>
                <Text style={styles.titlergt} numberOfLines={1}>{item.profileSummary.city}</Text>
              </View>
            </View>

          </View>
          <View style={styles.border} />
        </TouchableOpacity>

        <View>
          {/* {this.interest_receivedStatus(item.status,item.id)} */}
          <View style={styles.btncontiner}>
            <View style={styles.btnwidth}>
              <TouchableOpacity
                style={styles.btnsty}>
                <Text style={styles.btntxt}>Contact</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.btnwidth}>
              <TouchableOpacity onPress={() => { this.reject_interest(item.id, this.rjtInt_data(item.id)) }}
                style={styles.btnstyborder}>
                <Text style={styles.btntxtborder}>Decline</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

      </View>

    )
  }

  _renderItemAcceptedYou = ({ item }) => {

    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity style={styles.card}
          onPress={() => { this.props.navigation.navigate('FullProfileView', { profileSummary_id: item.profileSummary.id }) }}>
          <View style={{ width: '35%' }}>
            <Image source={{ uri: item.profileSummary.displayPicUrl }}
              resizeMode='cover' style={styles.personimg} />
          </View>
          <View style={styles.crdrow}>
            <View style={[styles.border, { flexDirection: 'row', alignItems: 'center' }]}>
              <View style={styles.btnwidth}>
                <Text style={styles.subheading}>{item.profileSummary.displayId}</Text>
              </View>

              <View style={styles.btnwidth}>
                <Text style={styles.righttxt}>{this.get_age(item.profileSummary.dob)} yrs</Text>
              </View>
            </View>


            <View style={{ flexDirection: 'row' }}>
              <View style={styles.btnwidth}>
                <Text style={styles.title} numberOfLines={1}>{item.profileSummary.qualification}</Text>
                <Text style={styles.title} numberOfLines={1}>{item.profileSummary.occupation}</Text>
              </View>

              <View style={styles.btnwidth}>
                <Text style={styles.titlergt} numberOfLines={1} >{item.profileSummary.lname}</Text>
                <Text style={styles.titlergt} numberOfLines={1}>{item.profileSummary.city}</Text>
              </View>
            </View>

          </View>
          <View style={styles.border} />
        </TouchableOpacity>

        <View>
          {/* {this.interest_receivedStatus(item.status,item.id)} */}
          <TouchableOpacity style={styles.undobtn} onPress={() => { this.undo_interest(item.id) }}>
            <Text style={styles.btntxtborder}>Undo</Text>
          </TouchableOpacity>
        </View>

      </View>

    )
  }

  _renderItemsentShortlists = ({ item }) => {
    // console.log("item", item.profileSummary.fname)
    return (
      <View>
        <View style={styles.card}>
          <View style={{ width: '35%' }}>
            <Image source={{ uri: item.profileSummary.displayPicUrl }}
              resizeMode='cover' style={styles.personimg} />
          </View>
          <View style={styles.crdrow}>
            <View style={[styles.border, { flexDirection: 'row' }]}>
              <View style={styles.btnwidth}>
                <Text style={styles.subheading}>{item.profileSummary.displayId}</Text>
              </View>

              <View style={styles.btnwidth}>
                <Text style={styles.righttxt}>{this.get_age(item.profileSummary.dob)} yrs</Text>
              </View>

            </View>

            <View style={{ flexDirection: 'row' }}>
              <View style={styles.btnwidth}>
                <Text style={styles.title} numberOfLines={1}>{item.profileSummary.qualification}</Text>
                <Text style={styles.title} numberOfLines={1}>{item.profileSummary.occupation}</Text>
              </View>

              <View style={styles.btnwidth}>
                <Text style={styles.titlergt} numberOfLines={1}>{item.profileSummary.lname}</Text>
                <Text style={styles.titlergt} numberOfLines={1}>{item.profileSummary.city}</Text>
              </View>
            </View>
          </View>
          <View style={styles.border} />
        </View>

        {this.shortlist_Status(item.profileSummary.id, item.profileSummary.interestStatus, item.id)}
      </View>

    )
  }

  _renderItemRece_Shortlists = ({ item }) => {
    // console.log("item", item.profileSummary.fname)
    return (
      <View>
        <View style={styles.card}>
          <View style={{ width: '35%' }}>
            <Image source={{ uri: item.profileSummary.displayPicUrl }}
              resizeMode='cover' style={styles.personimg} />
          </View>
          <View style={styles.crdrow}>
            <View style={[styles.border, { flexDirection: 'row' }]}>
              <View style={styles.btnwidth}>
                <Text style={styles.subheading}>{item.profileSummary.displayId}</Text>
              </View>

              <View style={styles.btnwidth}>
                <Text style={styles.righttxt}>{this.get_age(item.profileSummary.dob)} yrs</Text>
              </View>

            </View>

            <View style={{ flexDirection: 'row' }}>
              <View style={styles.btnwidth}>
                <Text style={styles.title} numberOfLines={1}>{item.profileSummary.qualification}</Text>
                <Text style={styles.title} numberOfLines={1}>{item.profileSummary.occupation}</Text>
              </View>

              <View style={styles.btnwidth}>
                <Text style={styles.titlergt} numberOfLines={1}>{item.profileSummary.lname}</Text>
                <Text style={styles.titlergt} numberOfLines={1}>{item.profileSummary.city}</Text>
              </View>
            </View>
          </View>
          <View style={styles.border} />
        </View>

        <View style={styles.btncontiner}>
          {this.shortlisted_meStatus(item.profileSummary.id, item.profileSummary.interestStatus, item.id)}
        </View>
      </View>
    )
  }

  _renderItemProfileVisited = ({ item }) => {
    // console.log("item", item.profileSummary.fname)
    return (
      <View>
        <View style={styles.card}>
          <View style={{ width: '35%' }}>
            <Image source={{ uri: item.profileSummary.displayPicUrl }}
              resizeMode='cover' style={styles.personimg} />
          </View>
          <View style={styles.crdrow}>
            <View style={[styles.border, { flexDirection: 'row' }]}>
              <View style={styles.btnwidth}>
                <Text style={styles.subheading}>{item.profileSummary.displayId}</Text>
              </View>

              <View style={styles.btnwidth}>
                <Text style={styles.righttxt}>{this.get_age(item.profileSummary.dob)} yrs</Text>
              </View>

            </View>

            <View style={{ flexDirection: 'row' }}>
              <View style={styles.btnwidth}>
                <Text style={styles.title} numberOfLines={1}>{item.profileSummary.qualification}</Text>
                <Text style={styles.title} numberOfLines={1}>{item.profileSummary.occupation}</Text>
              </View>

              <View style={styles.btnwidth}>
                <Text style={styles.titlergt} numberOfLines={1}>{item.profileSummary.lname}</Text>
                <Text style={styles.titlergt} numberOfLines={1}>{item.profileSummary.city}</Text>
              </View>
            </View>
          </View>
          <View style={styles.border} />
        </View>

        <View style={styles.btncontiner}>
          {this.shortlist_Status(item.profileSummary.id, item.profileSummary.interestStatus, item.id)}
        </View>
      </View>
    )
  }

  _renderItemMyProfileVisitors = ({ item }) => {
    // console.log("item", item.profileSummary.fname)
    return (
      <View>
        <View style={styles.card}>
          <View style={{ width: '35%' }}>
            <Image source={{ uri: item.profileSummary.displayPicUrl }}
              resizeMode='cover' style={styles.personimg} />
          </View>
          <View style={styles.crdrow}>
            <View style={[styles.border, { flexDirection: 'row' }]}>
              <View style={styles.btnwidth}>
                <Text style={styles.subheading}>{item.profileSummary.displayId}</Text>
              </View>

              <View style={styles.btnwidth}>
                <Text style={styles.righttxt}>{this.get_age(item.profileSummary.dob)} yrs</Text>
              </View>

            </View>

            <View style={{ flexDirection: 'row' }}>
              <View style={styles.btnwidth}>
                <Text style={styles.title} numberOfLines={1}>{item.profileSummary.qualification}</Text>
                <Text style={styles.title} numberOfLines={1}>{item.profileSummary.occupation}</Text>
              </View>

              <View style={styles.btnwidth}>
                <Text style={styles.titlergt} numberOfLines={1}>{item.profileSummary.lname}</Text>
                <Text style={styles.titlergt} numberOfLines={1}>{item.profileSummary.city}</Text>
              </View>
            </View>
          </View>
          <View style={styles.border} />
        </View>

        <View style={styles.btncontiner}>
          {this.shortlisted_meStatus(item.profileSummary.id, item.profileSummary.interestStatus, item.id)}
        </View>
      </View>
    )
  }

  chooseFile = () => {

    this.setState({ status: '' });
    var options = {
      title: 'Select Image',
      customButtons: [
        { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
      ],
      storageOptions: {
        skipBackup: true, // do not backup to iCloud
        path: 'images', // store camera images under Pictures/images for android and Documents/images for iOS
      },
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker', storage());
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let path = this.getPlatformPath(response).value;
        let fileName = this.getFileName(response.fileName, path);
        this.setState({ imagePath: path });
        this.uploadImageToStorage(path, fileName);
      }
    });
  };

  getFileName(name, path) {
    if (name != null) { return name; }

    if (Platform.OS === "ios") {
      path = "~" + path.substring(path.indexOf("/Documents"));
    }
    return path.split("/").pop();
  }

  uploadImageToStorage(path, name) {
    this.setState({ isLoading: true });
    let reference = storage().ref('userPhotos/' + this.state.uid + '/' + name);
    let task = reference.putFile(path);
    task.then(() => {
      this.profile(name);
      console.log('Image uploaded to the bucket!');
      this.setState({ isLoading: false, status: 'Image uploaded successfully' });
      Toast.show('Image uploaded successfully', Toast.SHORT);

    }).catch((e) => {
      let status = 'Something went wrong';
      console.log('uploading image error => ', e);
      this.setState({ isLoading: false, status: 'Something went wrong' });
    });
  }

  async profile(name) {
    console.log('name', name)
    let params = { "name": name, "isDisplayPic": true }

    console.log('send data params:', params)

    fetch(URL + 'profile/photos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': await myToken(),
      },
      body: JSON.stringify(params)
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log('responseJson:', responseJson)
      })
      .catch(error => {
        console.error('image upload: something went wrong...', error);
      });
  }

  /**
   * Get platform specific value from response
   */
  getPlatformPath({ path, uri }) {
    return Platform.select({
      android: { "value": path },
      ios: { "value": uri }
    })
  }

  getPlatformURI(imagePath) {
    let imgSource = imagePath;
    if (isNaN(imagePath)) {
      imgSource = { uri: this.state.imagePath };
      if (Platform.OS == 'android') {
        imgSource.uri = "file:///" + imgSource.uri;
      }
    }
    return imgSource
  }

  async upload_Image(name) {
    console.log('name', name)
    let params = { "name": name, "isDisplayPic": false }
    fetch(URL + 'profile/photo', {
      method: 'POST',
      headers: {
        'Authorization': await myToken(),
      },
      body: JSON.stringify(params)
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log('responseJson', responseJson)
      })
      .catch(error => {
        console.error('something went wrong...', error);
      });
  }

  render() {
    const { navigate } = this.props.navigation;
    const { photo, show, imagePath } = this.state
    let imgSource = this.getPlatformURI(imagePath)
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
        <NavigationEvents onDidFocus={() => this.componentDidMount()} />
        <View style={styles.headersty}>
          <View style={{ width: '10%' }}>

            <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
              <Image source={images.menu} style={styles.menu} />
            </TouchableOpacity>
          </View>

          <View style={{ width: '70%', alignItems: 'center' }}>
            <Image source={images.Rajpootlagan} resizeMode="center" tintColor={'#000'} style={{ width: width * 0.4, height: 25 }} />
          </View>
          {/* //logo has been removed */}
          {/* <View style={{ width: '10%' }}>
            <Image source={images.translator} style={{ width: 25, height: 25 }} tintColor={colors.primary} />
          </View> */}

          {/* <TouchableOpacity onPress={() => {
            auth()
              .signOut()
              .then(() => this.props.navigation.navigate('Splash_screen'))
          }}>
            <Image source={images.logout} style={styles.logout} />

          </TouchableOpacity> */}



          {/* this is notification */}
          {/* <TouchableOpacity style={{ width: '10%' }} onPress={() => navigate('Notification')}>
            <Image source={images.notification} style={styles.bellicon} tintColor={colors.primary} />
          </TouchableOpacity> */}
        </View>

        <ScrollView scrollEventThrottle={16}>
          <TouchableOpacity onPress={() => navigate('ProfileTab')}>
            <LinearGradient
              start={{ x: 0.25, y: 1.25 }}
              end={{ x: 0.5, y: 1.9 }}
              locations={[0, 0, 1]}
              colors={['#FC5C33', '#FC5C33', '#D61669']}
              style={styles.linearGradient} >
              <View style={{ width: '22%' }}>
                {this.state.dp == '' ? (
                  <View>
                    <View style={styles.bgimg}>
                      <Avatar rounded source={imgSource} size='large' />
                    </View>
                    {/* <TouchableOpacity style={styles.plus} onPress={this.chooseFile} >
                        <Icon name="plus" color='#fff' size={12} style={{ textAlign: 'center', }} />
                      </TouchableOpacity> */}
                  </View>
                ) :
                  <View>
                    <View style={styles.bgimg}>
                      <Avatar rounded source={{ uri: this.state.dp }} size='large' />
                    </View>
                    {/* <TouchableOpacity style={styles.plus} onPress={this.chooseFile} >
                    <Icon name="plus" color='#fff' size={12} style={{ textAlign: 'center', }} />
                  </TouchableOpacity> */}
                  </View>
                }
              </View>

              <View style={{ width: '25%' }}>
                <Text style={styles.number}></Text>
              </View>

              <View style={{ width: '53%' }}>
                {this.state.percent !== 0 ? <Text style={[styles.title, { color: '#fff' }]}>Completed : {this.state.percent - 2}%</Text> : <Text>Complete Your Profile</Text>}


              </View>

            </LinearGradient>
          </TouchableOpacity>
          <View style={styles.crdcvr}>

            <TouchableOpacity style={styles.crdwdh} onPress={() => navigate('Sent')}>
              <View style={styles.crdsty}>
                <Image source={images.sent} style={styles.crdimg} tintColor='#E75935' />
              </View>
              <Text numberOfLines={1} style={styles.text}>Sent</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigate('Recived')}
              style={styles.crdwdh}>
              <View style={styles.crdsty}>
                <Image source={images.received} style={styles.crdimg} tintColor='#E75935' />
              </View>
              <Text numberOfLines={1} style={styles.text}>Received</Text>
            </TouchableOpacity>


            <TouchableOpacity style={styles.crdwdh} onPress={() => navigate('Saved')}>
              <View style={styles.crdsty}>
                <Image source={images.save} style={styles.crdimg} tintColor='#E75935' />
              </View>
              <Text numberOfLines={1} style={styles.text}>Saved</Text>
            </TouchableOpacity>



          </View>

          <View style={styles.crdcvr}>
            <TouchableOpacity style={styles.crdwdh} onPress={() => navigate('Accepted')}>
              <View style={styles.crdsty}>
                <Image source={images.check} style={styles.crdimg} tintColor='#E75935' />
              </View>
              <Text numberOfLines={1} style={styles.text}>Accepted</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.crdwdh} onPress={() => navigate('Matched')}>
              <View style={styles.crdsty}>
                <Image source={images.relationship} style={{ width: 30, height: 30 }} tintColor='#E75935' />
              </View>
              <Text numberOfLines={1} style={styles.text}>Contacts Seen</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.crdwdh} onPress={() => navigate('Declined')}>
              <View style={styles.crdsty}>
                <Icon name="minus-circle" size={30} color={'#E75935'} />
                {/* <Image source={images.save} style={styles.crdimg} tintColor='#E75935' /> */}
              </View>
              <Text numberOfLines={1} style={styles.text}>Declined</Text>
            </TouchableOpacity>

          </View>

          {this.state.receivedInterests != '' ? (
            <View>

              <View style={styles.row}>
                <View style={{ width: '70%' }}>
                  <Text style={styles.heading} >Interests Received({this.state.receivedInterests.length})</Text>
                </View>
                <View style={{ width: '30%' }}>
                  <Text style={styles.righttxt} >View All   <Icon name="chevron-right" size={15} color='rgba(0, 0, 0, 0.54)' /></Text>
                </View>
              </View>

              <FlatList horizontal showsHorizontalScrollIndicator={false}
                data={this.state.receivedInterests}
                renderItem={this._renderItemReceived}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          ) : null}

          {this.state.sentInterests != '' ? (
            <View style={styles.mt30}>
              <View style={styles.row}>
                <View style={{ width: '70%' }}>
                  <Text style={styles.heading}>Interests Sent({this.state.sentInterests.length})</Text>

                </View >
                <View style={{ width: '30%' }}>
                  <Text style={styles.righttxt}>View All   <Icon name="chevron-right" size={15} color='rgba(0, 0, 0, 0.54)' /></Text>
                </View>
              </View>

              <View>
                <FlatList horizontal showsHorizontalScrollIndicator={false}
                  data={this.state.sentInterests}
                  renderItem={this._renderItemSent}
                  keyExtractor={(item, index) => index.toString()}
                />

              </View>
            </View>
          ) : null}

          {this.state.accept_yourInt != '' ? (
            <View style={styles.mt30}>
              <View style={styles.row}>
                <View style={{ width: '70%' }}>
                  <Text style={styles.heading}>Accepted Your Interests</Text>

                </View >
                <View style={{ width: '30%' }}>
                  <Text style={styles.righttxt}>View All   <Icon name="chevron-right" size={15} color='rgba(0, 0, 0, 0.54)' /></Text>
                </View>
              </View>

              <View>
                <FlatList horizontal showsHorizontalScrollIndicator={false}
                  data={this.state.accept_yourInt}
                  renderItem={this._renderItemAccepted}
                  keyExtractor={(item, index) => index.toString()}
                />

              </View>
            </View>
          ) : null}

          {this.state.accept_youInt != '' ? (
            <View style={styles.mt30}>
              <View style={styles.row}>
                <View style={{ width: '70%' }}>
                  <Text style={styles.heading}>Accepted You Interests</Text>

                </View >
                <View style={{ width: '30%' }}>
                  <Text style={styles.righttxt}>View All   <Icon name="chevron-right" size={15} color='rgba(0, 0, 0, 0.54)' /></Text>
                </View>
              </View>

              <View>
                <FlatList horizontal showsHorizontalScrollIndicator={false}
                  data={this.state.accept_youInt}
                  renderItem={this._renderItemAcceptedYou}
                  keyExtractor={(item, index) => index.toString()}
                />

              </View>
            </View>
          ) : null}
          {/* This is featured Profile with bugs  */}
          {this.state.follow ? (<View style={[styles.mt30, { paddingHorizontal: 15 }]}>
            <Text style={styles.heading}>Featured Profiles</Text>
            <Carousel
              ref={ref => this.carousel = ref}
              data={slides}
              itemWidth={windowWidth - 30}
              sliderWidth={windowWidth - 30}
              renderItem={this._renderItem}
              onSnapToItem={index => this.setState({ activeIndex: index })}
              autoplay
              useScrollView
              loop
              autoplayInterval={3000}
              enableMomentum={false}
              lockScrollWhileSnapping
            />

            <Pagination
              dotsLength={slides.length}
              activeDotIndex={this.state.activeIndex}
              dotColor={'#E75935'}
              inactiveDotColor={'#C4C4C4'}
              dotStyle={{
                width: 15,
                height: 15,
                borderRadius: 15 / 2,
                // marginHorizontal: 8,
                marginTop: -12,
              }}
              inactiveDotStyle={{
                backgroundColor: "#BFBFBF"
              }}
              activeDotStyle={{ backgroundColor: '#E75935' }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.5}
              activeDotScale={0}
            />
          </View>) : <Text>Hello</Text>}


          {this.state.sentShortlists != '' ? (
            <View style={{ marginTop: -10 }}>
              <View style={styles.row}>
                <View style={styles.btnwidth}>
                  <Text style={styles.heading}>Shortlisted</Text>

                </View >
                <View style={styles.btnwidth}>
                  <Text style={styles.righttxt}>View All   <Icon name="chevron-right" size={15} color='rgba(0, 0, 0, 0.54)' /></Text>
                </View>
              </View>
              <View>
                <FlatList horizontal showsHorizontalScrollIndicator={false}
                  data={this.state.sentShortlists}
                  renderItem={this._renderItemsentShortlists}
                  keyExtractor={(item, index) => index.toString()}
                />

              </View>
            </View>
          ) : null}

          {this.state.receievedShortlists.length != 0 ? (
            <View style={styles.mt30}>
              <View style={styles.row}>
                <View style={{ width: '70%' }}>
                  <Text style={styles.heading}>People Shortlisted Me</Text>

                </View >
                <View style={{ width: '30%' }}>
                  <Text style={styles.righttxt}>View All   <Icon name="chevron-right" size={15} color='rgba(0, 0, 0, 0.54)' /></Text>
                </View>
              </View>
              <FlatList horizontal showsHorizontalScrollIndicator={false}
                data={this.state.receievedShortlists}
                renderItem={this._renderItemRece_Shortlists}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          ) : null}

          {this.state.sentProfileViews.length != 0 ? (
            <View style={styles.mt30}>
              <View style={styles.row}>
                <View style={{ width: '70%' }}>
                  <Text style={styles.heading}>Profile I Visited</Text>

                </View >
                <View style={{ width: '30%' }}>
                  <Text style={styles.righttxt}>View All   <Icon name="chevron-right" size={15} color='rgba(0, 0, 0, 0.54)' /></Text>
                </View>
              </View>

              <View>
                <FlatList horizontal showsHorizontalScrollIndicator={false}
                  data={this.state.sentProfileViews}
                  renderItem={this._renderItemProfileVisited}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
            </View>
          ) : null}

          {this.state.receivedProfileViews.length != 0 ? (
            <View style={styles.mt30}>
              <View style={styles.row}>
                <View style={{ width: '70%' }}>
                  <Text style={styles.heading}>My Profile Visitors</Text>

                </View >
                <View style={{ width: '30%' }}>
                  <Text style={styles.righttxt}>View All   <Icon name="chevron-right" size={15} color='rgba(0, 0, 0, 0.54)' /></Text>
                </View>
              </View>

              <View>
                <FlatList horizontal showsHorizontalScrollIndicator={false}
                  data={this.state.receivedProfileViews}
                  renderItem={this._renderItemMyProfileVisitors}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
            </View>
          ) : null}

          <View style={styles.mt30}>
            <View style={styles.row}>
              <View style={{ width: '70%' }}>
                <Text style={styles.heading}>Recently Joined</Text>

              </View >
              <View style={{ width: '30%' }}>
                <Text style={styles.righttxt} >View All   <Icon name="chevron-right" size={15} color='rgba(0, 0, 0, 0.54)' /></Text>
              </View>
            </View>

            <View>
              <FlatList horizontal showsHorizontalScrollIndicator={false}
                data={dummyArray}
                renderItem={this._renderItemShortlisted}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </View>




          {/* <View style={styles.mt30}>
            <View style={styles.row}>
              <View style={{ width: '70%' }}>
                <Text style={styles.heading}>Search Criteria 1</Text>

              </View >
              <View style={{ width: '30%' }}>
                <Text style={styles.righttxt}>View All   <Icon name="chevron-right" size={15} color='rgba(0, 0, 0, 0.54)' /></Text>
              </View>
            </View>

            <View>
              <FlatList horizontal showsHorizontalScrollIndicator={false}
                data={dummyArray}
                renderItem={this._renderItemShortlisted}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </View>

          <View style={styles.mt30}>
            <View style={styles.row}>
              <View style={{ width: '70%' }}>
                <Text style={styles.heading}>Search Criteria 2</Text>

              </View >
              <View style={{ width: '30%' }}>
                <Text style={styles.righttxt}>View All   <Icon name="chevron-right" size={15} color='rgba(0, 0, 0, 0.54)' /></Text>
              </View>
            </View>

            <View>
              <FlatList horizontal showsHorizontalScrollIndicator={false}
                data={dummyArray}
                renderItem={this._renderItemShortlisted}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </View>

          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <TouchableOpacity style={styles.criteriabtn} >
              <Text style={[styles.title, { color: '#fff' }]}>Edit Criterias</Text>
            </TouchableOpacity>
          </View> */}

        </ScrollView>

      </Container>
    );
  }
}




var slide = [];
const dummyArray = [
  { title: 'XAJ110', year: '24 yrs', education: 'B.Tech', profession: 'Soft.Dev', caste: 'SubCaste', city: 'Rajasthani', image: images.image1 },
  { title: 'XAJ110', year: '24 yrs', education: 'B.Tech', profession: 'Soft.Dev', caste: 'SubCaste', city: 'Rajasthani', image: images.image1 },
  { title: 'XAJ110', year: '24 yrs', education: 'B.Tech', profession: 'Soft.Dev', caste: 'SubCaste', city: 'Rajasthani', image: images.image1 },
]