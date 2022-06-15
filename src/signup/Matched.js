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

export default class Matched extends Component {
  constructor(props) {
    super(props);
    this.state = {
      receivedInterests: [],
      loading: true,
      iscolor1: false,
      recievedInterestsViews: [], button1: false, button2: true,
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
        let receivedInterests = responseJson.sentProfileViews;
        let receivedInterestsViews = responseJson.receivedProfileViews;
        console.log(responseJson.sentProfileViews, "hhhhhhhhhhhhhhhhhhhhhhhhhh");
        //receivedInterests = receivedInterests.filter(a => a.status == "accepted");

        // let photos = responseJson.photos;
        // var array = photos
        // var result = array.map(({ url: uri, ...rest }) => ({ uri, ...rest }));
        // result.map(i => { i["dimensions"] = { width: 100, height: 300 } });
        // console.log('result', result)

        this.setState({ receivedInterests: receivedInterests, loading: false, receivedInterestsViews: receivedInterestsViews })
        console.log('receivedInterests', receivedInterests)
      })
      .catch(error => {
        console.error('something went wrong...', error);
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

        let receivedInterests = this.state.receivedInterests.filter(a => a.id !== interest_id);

        this.setState({ receivedInterests: receivedInterests });
      })
      .catch(error => {
        console.error(' undo_interest : something went wrong...', error);
      });
  }

  componentDidMount() {
    this.getProfile();
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

  _renderItem = ({ item, index }) => {
    return (
      <View style={{ marginBottom: 20 }}>
        <View style={styles.myProfilecard}>
          {/* <View style={styles.myProfileimgcover}> */}
          <Image source={{ uri: item.profileSummary.displayPicUrl }} style={styles.myProfileimg} />
          {/* <View style={styles.profileribben} /> */}
          {/* <View style={styles.ribbentxt}>
            <Text style={[styles.subtitle, { color: '#fff', fontSize: 16 }]}>Premium</Text>
          </View> */}

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
                  <Text style={[styles.title, { color: '#fff', marginBottom: '-5%' }]} adjustsFontSizeToFit>{this.get_age(item.profileSummary.dob)} yrs, {(item.profileSummary.height)}</Text>
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

        </View>

        {/* <View>
          <TouchableOpacity style={styles.undobtn} onPress={() => { this.undo_interest(item.id) }}>
            <Text style={styles.btntxtborder}>Undo</Text>
          </TouchableOpacity>
        </View> */}

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
              <Text style={[styles.heading, { paddingLeft: 15 }]}>Matched</Text>
            </View>

          </View>
          {/* //////////////////////////////////////////////////////////////////////////////////////////////// */}
          <View style={{ flex: 1, flexDirection: 'row', position: 'relative', marginLeft: '10%' }}>
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
                  Seen by Me
                      </Text>
              </TouchableOpacity>
            </View>

            <View style={{ flex: 0.5, marginRight: '0.5%', marginTop: '5%' }}>
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
                  Seen Me
                      </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={[styles.content, { marginTop: -20 }]}>
            {this.state.iscolor ? <FlatList
              data={this.state.receivedInterests}
              renderItem={this._renderItem}
              keyExtractor={(item, index) => index.toString()}
              ListEmptyComponent={this.ListEmpty} /> : <FlatList
              data={this.state.receivedInterestsViews}
              renderItem={this._renderItem}
              keyExtractor={(item, index) => index.toString()}
              ListEmptyComponent={this.ListEmpty} />

            }


          </View>
        </ScrollView>
      </Container>
    )
  }
}


const minheight = [{ "label": "4'0\"", "value": 48 }, { "label": "4'1\"", "value": 49 }, { "label": "4'2\"", "value": 50 }, { "label": "4'3\"", "value": 51 }, { "label": "4'4\"", "value": 52 }, { "label": "4'5\"", "value": 53 }, { "label": "4'6\"", "value": 54 }, { "label": "4'7\"", "value": 55 }, { "label": "4'8\"", "value": 56 }, { "label": "4'9\"", "value": 57 }, { "label": "4'10\"", "value": 58 }, { "label": "4'11\"", "value": 59 }, { "label": "5 feet", "value": 60 }, { "label": "5'1\"", "value": 61 }, { "label": "5'2\"", "value": 62 }, { "label": "5'3\"", "value": 63 }, { "label": "5'4\"", "value": 64 }, { "label": "5'5\"", "value": 65 }, { "label": "5'6\"", "value": 66 }, { "label": "5'7\"", "value": 67 }, { "label": "5'8\"", "value": 68 }, { "label": "5'9\"", "value": 69 }, { "label": "5'10\"", "value": 70 }, { "label": "5'11\"", "value": 71 }, { "label": "6 feet", "value": 72 }, { "label": "6'1\"", "value": 73 }, { "label": "6'2\"", "value": 74 }, { "label": "6'3\"", "value": 75 }, { "label": "6'4\"", "value": 76 }, { "label": "6'5\"", "value": 77 }, { "label": "6'6\"", "value": 78 }, { "label": "6'7\"", "value": 79 }, {
  "label":
    "6'8\"", "value": 80
}, { "label": "6'9\"", "value": 81 }, { "label": "6'10\"", "value": 82 }, { "label": "6'11\"", "value": 83 }, { "label": "7 Feet", "value": 84 }]