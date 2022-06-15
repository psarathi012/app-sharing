import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ProgressBarAndroidBase,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from './Style';
import { Avatar } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { images, colors } from '../globalstyles/Style';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { URL } from '../constant/Constant';
import { myToken } from '../token/Token';
import auth from '@react-native-firebase/auth';
import Login from '../login/Login';
import { NavigationEvents } from 'react-navigation';
// import ProgressCircle from 'react-native-progress-circle';

export default class Sidebarmenu extends Component {
  constructor() {
    super();
    this.state = {
      fname: '',
      phone: '',
      dp: '',
      id: '',
      lname: '',
      show_profileDetails: true,
      percent: '',
    };
    this.niv = [
      {
        navOptionThumb: 'user',
        navOptionName: 'Edit Profile',
        screenToNavigate: 'Edit_profile',
      },
      // {
      //   navOptionThumb: 'trash-alt',
      //   navOptionName: 'Delete Profile',
      //   screenToNavigate: 'Delete_profile',
      // },
      {
        navOptionThumb: 'crown',
        navOptionName: 'My Plan',
        screenToNavigate: 'Setting',
      },
      {
        navOptionThumb: 'question-circle',
        navOptionName: 'Help & Support',
        screenToNavigate: 'Help',
      },
      {
        navOptionThumb: 'cog',
        navOptionName: 'Contact Details',
        screenToNavigate: 'Account',
      },


    ];
  }

  async getProfile() {
    fetch(URL + 'profile', {
      method: 'GET',
      headers: {
        Authorization: await myToken(),
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson.photos, "vvvvvvvvvvvvvvvvvvvvvvcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccz")
        if (responseJson.code == 'not-found') {
          console.log(responseJson.msg);
          this.setState({ loading: false, show_profileDetails: false });
        } else {
          if (responseJson.personal.fname == undefined) {
            console.log('personal data not found');
            this.setState({ loading: false, show_profileDetails: false });
          } else {
            //console.log('get data personal', responseJson.personal, responseJson.id);
            let personal = responseJson.personal;
            this.setState({
              fname: personal.fname,
              lname: personal.lname,
              phone: responseJson.family.pocNumber,
              id: responseJson.id,
            });
          }

          let photos = responseJson.photos;
          if (photos.length == 0) {
            console.log('dp does not exitvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv');
          } else {
            let obj = photos.find((o) => o.isDisplayPic === true);
            console.log(obj, 'photosnnnnnnnnnnnnnnnnnnnn');
            this.setState({ dp: obj.url });
            console.log(this.state.dp, "dpdpdpdpdpdpdpdpdpdpdpdp")
          }
        }
      })
      .catch((error) => {
        console.error('something went wrong...', error);
      });
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
        this.setState({ percent: result });
        console.log(
          obj.completionPecent,
          'sssssssssssssssssssaaaaaaaaaaaaaaaaaaaaaaaaakkkkkkkkkkkkkkk',
        );
      })
      .catch((error) => console.log('error', error));
  }

  componentDidMount() {
    this.getProfile();

    this.getPercent();
  }

  render() {
    return (
      <View style={styless.container}>
        {/* <StatusBar hidden={true}/> */}
        <ScrollView>
          {this.state.show_profileDetails == true ? (
            <View>
              <View style={styless.content}>
                <View style={styless.row}>
                  <View style={{ marginTop: '5%', marginLeft: '5%' }}>
                    {this.state.dp ? (<Avatar
                      size={80}
                      rounded
                      source={{
                        uri: this.state.dp,
                      }}
                    />) : <Text>no photos</Text>}
                    <Text style={styles.name}>
                      {this.state.fname} {this.state.lname}
                    </Text>
                  </View>

                  <View style={{ marginHorizontal: 20 }}>
                    <Text style={styles.title}>
                      {this.state.phone ? '+91' + this.state.phone : ''}
                    </Text>


                  </View>
                  {/* /////////////////////////////////////////////////////////////////////// */}
                  <View style={{ flex: 1, flexDirection: 'row', position: 'relative', marginLeft: '8%' }}>
                    <View style={{ flex: 0.5, marginTop: '5.5%', marginRight: '-10%' }}>
                      <TouchableOpacity activeOpacity={0.5} onPress={() => {
                        console.log("this is clicked");
                        auth()
                          .signOut()
                          .then(() => this.props.navigation.navigate('Splash_screen'))
                      }}>
                        <Image source={images.logout} style={styles.logout} tintColor='#000' />
                      </TouchableOpacity>
                    </View>

                    <View style={{ flex: 0.5, marginLeft: '-80%' }}>
                      <TouchableOpacity activeOpacity={0.5} onPress={() => {
                        console.log("this is clicked");
                        auth()
                          .signOut()
                          .then(() => this.props.navigation.navigate('Splash_screen'))
                      }}>
                        <Text style={[styles.heading, { paddingLeft: 15 }]}>Log Out</Text>
                      </TouchableOpacity>

                    </View>
                  </View>

                </View>
              </View>

              <View style={styles.border} />
            </View>
          ) : null}

          <View style={{ width: '100%', marginTop: 20 }}>
            {this.niv.map((niv, key) => (
              <TouchableOpacity
                onPress={() => {
                  global.currentScreenIndex = key;
                  this.props.navigation.navigate(niv.screenToNavigate);
                }}>
                <View style={styles.icon}>
                  <View style={{ marginRight: 10, marginLeft: 10, width: '10%' }}>
                    <Icon
                      name={niv.navOptionThumb}
                      color={colors.danger}
                      style={{ fontSize: 20 }}
                    />
                  </View>
                  <View style={{ width: '90%' }}>
                    <Text style={styles.title}>{niv.navOptionName}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('ChoosePlan')}>
          <LinearGradient
            start={{ x: 0.25, y: 1.25 }}
            end={{ x: 0.5, y: 1.9 }}
            locations={[0, 0, 1]}
            colors={['#FC5C33', '#FC5C33', '#D61669']}
            style={styles.linearbtn}>
            <Text
              style={[styles.name, { color: '#fff' }]}
              adjustsFontSizeToFit
              numberOfLines={1}>
              Upgrade membership
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  }
}
const styless = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  example: {
    marginVertical: 24,
  },
});
