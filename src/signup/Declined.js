import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StatusBar, Image, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import { images, colors } from '../globalstyles/Style';
import { Container } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './Style';
import { Badge, } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { URL } from '../constant/Constant';
import { myToken } from '../token/Token';

export default class Declined extends Component {
  constructor(props) {
    super(props);
    this.state = {
      receivedInterests: [],
      sentInterests: [],
      loading: true,
      button1: false, button2: true, iscolor: false,
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
        let receivedInterests = responseJson.receivedInterests;
        receivedInterests = receivedInterests.filter(a => a.status === "declined");

        let photos = responseJson.photos;
        var array = photos
        var result = array.map(({ url: uri, ...rest }) => ({ uri, ...rest }));
        result.map(i => { i["dimensions"] = { width: 100, height: 300 } });
        console.log('result', result)

        this.setState({ receivedInterests: receivedInterests, loading: false, images: result })
        console.log('receivedInterests', receivedInterests)
      })
      .catch(error => {
        console.error('something went wrong...', error);
      });
  }
  async declinedme() {
    fetch(URL + 'profile', {
      method: 'GET',
      headers: {
        'Authorization': await myToken(),
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        let sentInterests = responseJson.sentInterests;
        sentInterests = sentInterests.filter(a => a.status === "declined");
        console.log(sentInterests, "this are the sent interests");
        this.setState({ sentInterests: sentInterests })

        console.log('sentInterest', sentInterests)
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
        let receivedInterests = this.state.receivedInterests.filter(a => a.status !== "declined");
        this.setState({ receivedInterests: receivedInterests })
      })
      .catch(error => {
        console.error('accept reject interest: something went wrong...', error);
      });
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
      })
      .catch(error => {
        console.error(' reject interest: something went wrong...', error);
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

  componentDidMount() {
    this.getProfile();
    this.declinedme();
  }

  get_age(dob) {
    let birth = new Date(dob);
    let now = new Date();
    let beforeBirth = ((() => {
      birth.setDate(now.getDate()); birth.setMonth(now.getMonth()); return birth.getTime()
    })() < birth.getTime()) ? 0 : 1;
    return now.getFullYear() - birth.getFullYear() - beforeBirth;
  }

  get_height(height) {
    let obj = minheight.find(o => o.value === height);
    console.log(obj.label)
    return obj.label;
  }

  interest_receivedStatus(status, id, lastUpdateTime) {
    let d = new Date(lastUpdateTime)
    let getDate = d.getDate()
    let getmonth = d.getMonth() + 1
    let getyear = d.getFullYear()
    let dd = getDate + '/' + getmonth + '/' + getyear

    if (status == "pending") {
      return <View style={[styles.btncontiner, { width: '100%' }]}>
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

    if (status == "accepted") {
      return <View style={[styles.btncontiner, { width: '100%' }]}>
        <View style={styles.btnwidth}>
          <TouchableOpacity
            style={styles.btnsty}>
            <Text style={styles.btntxt}>Contact</Text>
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

    if (status == "declined") {
      return <TouchableOpacity onPress={() => { this.accept_interest(id, this.accInt_data(id)) }}
        style={[styles.btnsty, { width: '100%' }]}>
        <Text style={styles.btntxt} numberOfLines={1} >Accept Again {''}<Text style={styles.text} adjustsFontSizeToFit>(You declined interest on {dd})</Text></Text>
      </TouchableOpacity>

    }
  }

  _renderItem = ({ item, index }) => {
    return (
      <View style={{ marginBottom: 20 }}>
        <View style={styles.myProfilecard}>
          {/* <View style={styles.myProfileimgcover}> */}
          <Image source={{ uri: item.profileSummary.displayPicUrl }} style={styles.myProfileimg} />
          <View style={styles.profileribben} />
          <View style={styles.ribbentxt}>
            <Text style={[styles.subtitle, { color: '#fff', fontSize: 16 }]}>Premium</Text>
          </View>

          {/* <View style={{ position: 'absolute', top: 25, left: 20 }}>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('Galary',{images: this.state.images})}>
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
              </TouchableOpacity>
            </View> */}

          <LinearGradient
            colors={['rgba(0, 0, 0, 0)', 'rgba(0,0,0,1)']}
            style={styles.profilegradient}>

            <View style={styles.linearGradientcover}>
              <View style={styles.cardgradient}>
                <View>
                  <Text style={[styles.subheading, { color: '#fff', marginTop: '-12%' }]} numberOfLines={1} adjustsFontSizeToFit>{item.profileSummary.displayId}</Text>
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
                  <Text style={[styles.title, { color: '#fff', marginBottom: '-5%' }]} adjustsFontSizeToFit>{this.get_age(item.profileSummary.dob)} yrs, {this.get_height(item.profileSummary.height)}</Text>
                  <Text style={[styles.title, { color: '#fff', marginBottom: '-5%' }]} adjustsFontSizeToFit>{item.profileSummary.qualification} | {item.profileSummary.income}</Text>
                  <Text style={[styles.title, { color: '#fff', marginBottom: '-5%' }]} adjustsFontSizeToFit numberOfLines={1}>{item.profileSummary.occupation} | {item.profileSummary.city}</Text>
                </View>
                <View>
                  <Text style={[styles.title, { color: '#fff', marginBottom: '-5%' }]} adjustsFontSizeToFit>{item.profileSummary.lname}</Text>
                  <Text style={[styles.title, { color: '#fff', marginBottom: '-5%' }]} adjustsFontSizeToFit>{item.profileSummary.city}</Text>
                </View>
              </View>

            </View>

          </LinearGradient>
          {/*  <View style={styles.cardfooter}>
              <TouchableOpacity style={styles.centeralign} onPress={() => alert('hii')}>
                <Image source={images.contact} style={styles.footerimg} tintColor={'#CD286F'} />
                <Text style={styles.footertxt}>Send</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.centeralign}>
                <Image source={images.save} style={styles.footerimg} tintColor={'#CD286F'} />
                <Text style={styles.footertxt}>Save</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.centeralign}>
                <Image source={images.chat} style={styles.footerimg} tintColor={'#CD286F'} />
                <Text style={styles.footertxt}>Chat</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.centeralign}>
                <Image source={images.whatsapp} style={styles.footerimg} tintColor={'#00E676'} />
                <Text style={styles.footertxt}>Share</Text>
              </TouchableOpacity>
            </View> */}

          {/* </View> */}
        </View>

        {this.interest_receivedStatus(item.status, item.id, item.lastUpdateTime)}
        {/* 
        <View style={[styles.btncontiner, { width: '100%' }]}>
          <View style={styles.btnwidth}>
            <TouchableOpacity activeOpacity={0.7}
              style={styles.btnsty}>
              <Text style={styles.btntxt}>Accept</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.btnwidth}>
            <TouchableOpacity
              activeOpacity={0.7} style={styles.btnstyborder}>
              <Text style={styles.btntxtborder}>Decline</Text>
            </TouchableOpacity>
          </View>
        </View>
      */}
      </View>
    )
  }

  ListEmpty = () => {
    return (
      <View style={[styles.forindicator, { marginTop: '60%' }]}>
        <Icon name='folder-o' size={50} color="#ccc" />
        <Text style={styles.msgs}>Empty</Text>
      </View>
    );
  };
  workbutton1 = () => {
    this.setState({ iscolor: true });
    this.setState({ button1: true });
    this.setState({ button2: false });
  }
  workbutton2 = () => {
    this.setState({ iscolor: false });
    this.setState({ button1: false });
    this.setState({ button2: true });
  }

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
      <Container style={{ flex: 1 }}>
        <StatusBar backgroundColor='#fff' barStyle='dark-content' />
        <ScrollView>
          <View style={{ flex: 1, flexDirection: 'row', position: 'relative' }}>
            <View style={{ flex: 0.5, marginTop: '5.5%' }}>
              <TouchableOpacity activeOpacity={0.5} onPress={() => navigate('Signup')}>
                <Image source={images.back} style={styles.backimg} tintColor='#000' />
              </TouchableOpacity>
            </View>

            <View style={{ flex: 0.5, marginLeft: '-50%' }}>
              <Text style={[styles.heading, { paddingLeft: 15 }]}>Declined</Text>
            </View>
          </View>

          {/* ///////////////////////////////////////////////////////////////////// */}
          <View style={{ flex: 1, flexDirection: 'row', position: 'relative' }}>
            <View style={{ flex: 0.5, marginTop: '5.5%' }}>
              <TouchableOpacity
                onPress={() => this.workbutton1()}
                // disabled={this.state.female}
                style={
                  this.state.button1
                    ? styles.activebtnStyle
                    : styles.btnStyle
                }>
                <Text
                  style={[
                    styles.head,
                    this.state.button1 ? styles.active : styles.active,
                  ]}>
                  Declined Me
                      </Text>
              </TouchableOpacity>
            </View>

            <View style={{ flex: 0.5, marginLeft: '10%', marginTop: '5%' }}>
              <TouchableOpacity
                onPress={() => this.workbutton2()}
                // disabled={this.state.female}
                style={
                  this.state.button2
                    ? styles.activebtnStyle
                    : styles.btnStyle

                }>
                <Text
                  style={[
                    styles.head,
                    this.state.button2 ? styles.active : styles.active,
                  ]}>
                  Declined by Me
                      </Text>
              </TouchableOpacity>
            </View>
          </View>

          {this.state.iscolor ? <View style={[styles.content, { marginTop: -20 }]}>

            <FlatList
              data={this.state.sentInterests}
              renderItem={this._renderItem}
              keyExtractor={(item, index) => index.toString()}
              ListEmptyComponent={this.ListEmpty} />

          </View> : <View style={[styles.content, { marginTop: -20 }]}>

            <FlatList
              data={this.state.receivedInterests}
              renderItem={this._renderItem}
              keyExtractor={(item, index) => index.toString()}
              ListEmptyComponent={this.ListEmpty} />

          </View>}
        </ScrollView>
      </Container >
    )
  }
}


const minheight = [{ "label": "4'0\"", "value": 48 }, { "label": "4'1\"", "value": 49 }, { "label": "4'2\"", "value": 50 }, { "label": "4'3\"", "value": 51 }, { "label": "4'4\"", "value": 52 }, { "label": "4'5\"", "value": 53 }, { "label": "4'6\"", "value": 54 }, { "label": "4'7\"", "value": 55 }, { "label": "4'8\"", "value": 56 }, { "label": "4'9\"", "value": 57 }, { "label": "4'10\"", "value": 58 }, { "label": "4'11\"", "value": 59 }, { "label": "5 feet", "value": 60 }, { "label": "5'1\"", "value": 61 }, { "label": "5'2\"", "value": 62 }, { "label": "5'3\"", "value": 63 }, { "label": "5'4\"", "value": 64 }, { "label": "5'5\"", "value": 65 }, { "label": "5'6\"", "value": 66 }, { "label": "5'7\"", "value": 67 }, { "label": "5'8\"", "value": 68 }, { "label": "5'9\"", "value": 69 }, { "label": "5'10\"", "value": 70 }, { "label": "5'11\"", "value": 71 }, { "label": "6 feet", "value": 72 }, { "label": "6'1\"", "value": 73 }, { "label": "6'2\"", "value": 74 }, { "label": "6'3\"", "value": 75 }, { "label": "6'4\"", "value": 76 }, { "label": "6'5\"", "value": 77 }, { "label": "6'6\"", "value": 78 }, { "label": "6'7\"", "value": 79 }, {
  "label":
    "6'8\"", "value": 80
}, { "label": "6'9\"", "value": 81 }, { "label": "6'10\"", "value": 82 }, { "label": "6'11\"", "value": 83 }, { "label": "7 Feet", "value": 84 }]