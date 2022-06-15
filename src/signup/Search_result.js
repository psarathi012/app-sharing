import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Image,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { images } from '../globalstyles/Style';
import { Container } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon_save from 'react-native-vector-icons/FontAwesome5';
import styles from './Style';
import { Badge } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { NavigationEvents } from 'react-navigation';
import Dialog, { DialogTitle, DialogContent } from 'react-native-popup-dialog';
import { myToken } from '../token/Token';
import { URL } from '../constant/Constant';
import Share from 'react-native-share';
import RNFS from 'react-native-fs';



//imageToBase64 = require('image-to-base64');

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultAnimationDialog: false,
      searchData: [],
      dataSource: [],
      height: [],
      minheight: [],
      send: true,
      featured_profile: [],
      save: true,
      params: {},
      loading: false,
      isListEnd: false,
      images: [],
    };
    this.offset = 1;
  }

  async featured_profile() {
    fetch(URL + 'profile/featured', {
      method: 'GET',
      headers: {
        Authorization: await myToken(),
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('response featured', responseJson);
        this.setState({ featured_profile: responseJson });
      })
      .catch((error) => {
        console.error('something went wrong...', error);
      });
  }

  getData = async () => {
    console.log(this.offset, 'offset');
    const { loading, isListEnd } = this.state;
    if (!loading && !isListEnd) {
      console.log('getData');
      this.setState({ loading: true });
      let params = this.state.params;
      fetch(URL + 'profile/search?page=' + this.offset, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: await myToken(),
        },
        body: JSON.stringify(params),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson.length);
          if (responseJson.length > 0) {
            this.offset = this.offset + 1;
            this.setState({
              searchData: [...this.state.searchData, ...responseJson],
              loading: false,
            });
          } else {
            this.setState({ isListEnd: true, loading: false });
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  renderFooter = () => {
    return (
      // Footer View with Loader
      <View style={styles.footer}>
        {this.state.loading ? (
          <ActivityIndicator color="black" style={{ margin: 15 }} />
        ) : null}
      </View>
    );
  };

  get_age(dob) {
    let birth = new Date(dob);
    let now = new Date();
    let beforeBirth =
      (() => {
        birth.setDate(now.getDate());
        birth.setMonth(now.getMonth());
        return birth.getTime();
      })() < birth.getTime()
        ? 0
        : 1;
    return now.getFullYear() - birth.getFullYear() - beforeBirth;
  }

  get_height(height) {
    let obj = minheight.find((o) => o.value === height);
    // console.log(obj.label)
    return obj.label;
  }

  async create_Interest(profileId) {
    let params = {
      profileId: profileId,
    };
    fetch(URL + 'interests/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: await myToken(),
      },
      body: JSON.stringify(params),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.code == 'not-found') {
          console.log('create_shortlists :', responseJson.msg);
        } else {
          console.log('create_Interest data :', responseJson);
          this.setState({ dataSource: responseJson });

          let searchData = [...this.state.searchData];
          let index = searchData.findIndex((el) => el.id === profileId);
          searchData[index] = { ...searchData[index], interestStatus: 'pending' };
          this.setState({ searchData: searchData });
        }
      })
      .catch((error) => {
        console.error('create_Interest : something went wrong...', error);
      });
  }

  async create_shortlists(profileId) {
    let params = {
      profileId: profileId,
    };
    fetch(URL + 'shortlists/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: await myToken(),
      },
      body: JSON.stringify(params),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.code == 'not-found') {
          console.log('create_shortlists :', responseJson.msg);
        } else {
          console.log('create_shortlists data :', responseJson);
          let searchData = [...this.state.searchData];
          let index = searchData.findIndex((el) => el.id === profileId);
          searchData[index] = { ...searchData[index], isShortlisted: true };
          this.setState({ searchData: searchData });
        }
      })
      .catch((error) => {
        console.error('create_shortlists : something went wrong...', error);
      });
  }

  onShare = async (profileId) => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch(
      `https://asia-south1-rajput-matrimony-8f30a.cloudfunctions.net/api/open/profile/${profileId}`,
      requestOptions,
    )
      .then((response) => response.text())
      .then((result) => {
        console.log(result, 'this is result');
        var obj = JSON.parse(result);
        console.log(obj.astro, 'this is astro');
        // this.onShareWhatsapp(obj.photos[0].url)
        //this.onShareWhatsapp(obj.photos[0].url);
        this.base(obj.photos[0].url, profileId);

        //         imageToBase64(obj.photos[0].url,profileId,"this is b64") // Image URL
        // .then(
        //     (response) => {
        //         console.log(response); // "iVBORw0KGgoAAAANSwCAIA..."
        //     }
        // )
        // .catch(
        //     (error) => {
        //         console.log(error); // Logs an error if there was one
        //     }
        // )
      })
      .catch((error) => console.log('error', error));
  };

  //base64 conversion but depreceated
  async base(url, id) {
    const path = `${RNFS.DocumentDirectoryPath}/${id}.jpg`;
    await RNFS.downloadFile({ fromUrl: url, toFile: `file://${path}` })
      .promise.then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
    RNFS.readFile(`file://${path}`, 'base64').then((res) => {
      let shareOptionsUrl = {
        title: 'My Application',
        message: 'Use my application',
        url: `data:image/jpeg;base64,${res}`, // use image/jpeg instead of image/jpg
        subject: 'Share information from your application',
      };
      Share.open(shareOptionsUrl);
    });
  }

  getBase64Image(img) {
    var canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL('image/png');
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, '');
  }

  onShareWhatsapp = async (photoUrl) => {
    try {
      const base64 = this.getBase64Image(photoUrl);
      let shareOptions = {
        title: 'Title',
        url: base64,
        message: 'https://somelink.com some message',
        subject: 'Subject',
      };

      Share.open(shareOptions)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          err && console.log(err);
        });

      // const result = await Share.share({
      //  title: 'Profile link',
      //  message: "image",
      //  url: ""
      // });
      // if (result.action === Share.sharedAction) {
      //   if (result.activityType) {
      //     console.log('result.activityType',result.activityType)
      //   } else {
      //     console.log('error result.activityType',result.activityType)
      //   }
      // } else if (result.action === Share.dismissedAction) {
      //   console.log('Share.dismissedAction',Share.dismissedAction)
      // }
    } catch (error) {
      alert(error.message);
    }
  };

  _renderItem = ({ item, index }) => {
    return (
      <View style={{ paddingHorizontal: 15 }}>
        <View style={styles.myProfilecard}>
          <View style={styles.myProfileimgcover}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('FullProfileView', {
                  profileSummary_id: item.id,
                });
              }}>
              <Image
                source={{ uri: item.displayPicUrl }}
                style={styles.myProfileimg}
              />

              <View style={styles.profileribben} />
              <View style={styles.ribbentxt}>
                <Text
                  style={[
                    styles.subtitle,
                    { color: '#fff', fontSize: 16, marginTop: '-2%' },
                  ]}>
                  Premium
                </Text>
              </View>

              <LinearGradient
                colors={['rgba(0, 0, 0, 0)', 'rgba(0,0,0,1)']}
                style={styles.profilegradient}>
                <View style={styles.linearGradientcover}>
                  <View style={styles.cardgradient}>
                    <View>
                      <Text
                        style={[
                          styles.subheading,
                          { color: '#fff', marginTop: '-12%' },
                        ]}
                        numberOfLines={1}
                        adjustsFontSizeToFit>
                        {item.displayId}
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={[
                          styles.subtitle,
                          { color: '#02BE64', marginTop: '-5%', marginLeft: '50%' },
                        ]}
                        numberOfLines={1}
                        adjustsFontSizeToFit>
                        {' '}
                        <Icon name="check-circle" size={16} />
                        Varified Id
                      </Text>
                    </View>
                    {/* <View>
                  <Text style={[styles.subtitle, { color: '#75B3FB' }]} numberOfLines={1} adjustsFontSizeToFit> <Icon name="ban" size={16} /> Against Dowry</Text>
                </View> */}
                  </View>

                  <View style={styles.cardgradient}>
                    <View>
                      <Text
                        style={[
                          styles.subtitle,
                          { color: '#fff', marginBottom: '-10%' },
                        ]}
                        adjustsFontSizeToFit>
                        {this.get_age(item.dob)} yrs
                      </Text>
                      <Text
                        style={[
                          styles.subtitle,
                          { color: '#fff', marginBottom: '-10%' },
                        ]}
                        adjustsFontSizeToFit>
                        {item.qualification}
                      </Text>
                      <Text
                        style={[
                          styles.subtitle,
                          { color: '#fff', marginBottom: '-10%' },
                        ]}
                        adjustsFontSizeToFit
                        numberOfLines={1}>
                        {item.occupation}
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={[
                          styles.subtitle,
                          {
                            color: '#fff',
                            marginBottom: '-8%',
                            marginLeft: '45%',
                          },
                        ]}
                        adjustsFontSizeToFit>
                        {item.lname}
                      </Text>
                      <Text
                        style={[
                          styles.subtitle,
                          { color: '#fff', marginTop: '7%', marginLeft: '45%' },
                        ]}
                        adjustsFontSizeToFit>
                        {item.city ? item.city : null}
                      </Text>
                    </View>
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>

            {/* {this.footer(item.id)} */}

            <View style={styles.cardfooter}>
              {item.interestStatus == 'not-sent' ? (
                <TouchableOpacity
                  style={styles.centeralign}
                  onPress={() => this.create_Interest(item.id)}>
                  <Icon_save name="user-plus" size={20} color={'#CD286F'} />
                  <Text style={styles.footertxt}>Send</Text>
                </TouchableOpacity>
              ) : (
                <View style={styles.centeralign}>
                  <Icon_save name="user-check" color={'#CD286F'} size={20} />
                  <Text style={styles.footertxt}>Sent</Text>
                </View>
              )}

              {item.isShortlisted == false ? (
                <TouchableOpacity
                  style={styles.centeralign}
                  onPress={() => {
                    this.create_shortlists(item.id);
                  }}>
                  <Icon_save name="bookmark" size={20} color={'#CD286F'} />
                  <Text style={styles.footertxt}>Save</Text>
                </TouchableOpacity>
              ) : (
                <View style={styles.centeralign}>
                  <Icon name="bookmark" size={20} color={'#CD286F'} />
                  <Text style={styles.footertxt}>Saved</Text>
                </View>
              )}
              {/* have been commented by PSR */}
              {/* <TouchableOpacity style={styles.centeralign}>
              <Image source={images.chat} style={styles.footerimg} tintColor={'#CD286F'} />
              <Text style={styles.footertxt}>Chat</Text>
            </TouchableOpacity> */}

              <TouchableOpacity
                style={styles.centeralign}
                onPress={() => this.onShare(item.id)}>
                <Image
                  source={images.whatsapp}
                  style={styles.footerimg}
                  tintColor={'#00E676'}
                />
                <Text style={styles.footertxt}>Share</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  _renderItemInterests = ({ item }) => {
    return (
      <View>
        <TouchableOpacity onPress={() => { this.props.navigation.navigate("FullProfileView", { profileSummary_id: item.id }) }}>
          <View style={styles.card}>

            <View style={{ width: '35%' }}>
              <Image
                source={{ uri: item.displayPicUrl }}
                resizeMode="cover"
                style={styles.personimg}
              />
            </View>
            <View style={styles.crdrow}>
              <View style={[styles.border, { flexDirection: 'row' }]}>
                <View style={styles.btnwidth}>
                  <Text style={styles.subheading} numberOfLines={1}>
                    {item.displayId}
                  </Text>
                </View>

                <View style={styles.btnwidth}>
                  <Text style={styles.righttxt} numberOfLines={1}>
                    {this.get_age(item.dob)} yrs
                </Text>
                </View>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <View style={styles.btnwidth}>
                  <Text style={styles.title} numberOfLines={1}>
                    {item.qualification}
                  </Text>
                  <Text style={styles.title} numberOfLines={1}>
                    {item.occupation}
                  </Text>
                </View>

                <View style={styles.btnwidth}>
                  <Text style={styles.titlergt} numberOfLines={1}>
                    {item.lname}
                  </Text>
                  <Text style={styles.titlergt} numberOfLines={1}>
                    {item.city}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.border} />

          </View>
        </TouchableOpacity>


        <TouchableOpacity
          onPress={() => this.create_Interest(item.id)}
          style={[styles.btnsty, { marginTop: 5 }]}>
          <Text style={styles.btntxt}>Send Interest</Text>
        </TouchableOpacity>
      </View>
    );
  };

  UNSAFE_componentWillMount() {
    const { navigation } = this.props;
    const searchData = navigation.getParam('searchData');
    const params = navigation.getParam('params');
    this.setState({ searchData: searchData, params: params });
  }

  componentDidMount() {
    this.featured_profile();
  }

  render() {
    return (
      <Container style={{ flex: 1 }}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <NavigationEvents onWillFocus={() => this.getData()} />
        <ScrollView
          style={{ flex: 1 }}
        // contentContainerStyle={{flex: 1}}
        >
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Image
              source={images.back}
              style={styles.backimg}
              tintColor="#000"
            />
          </TouchableOpacity>

          <View>
            <Text style={[styles.heading, { paddingLeft: 15 }]} numberOfLines={1}>
              Check these Profile
            </Text>
            {this.state.featured_profile.length != 0 ? (
              <View>
                <View style={styles.row}>
                  <View style={styles.btnwidth}>
                    <Text style={styles.heading} numberOfLines={1}>
                      Featured Profiles
                    </Text>
                  </View>
                  <View style={styles.btnwidth}>
                    <Text style={styles.righttxt} numberOfLines={1}>
                      View All{' '}
                      <Icon
                        name="chevron-right"
                        size={15}
                        color="rgba(0, 0, 0, 0.54)"
                      />
                    </Text>
                  </View>
                </View>

                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={this.state.featured_profile}
                  renderItem={this._renderItemInterests}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
            ) : null}
          </View>
          {this.state.searchData.length > 0 ? <FlatList
            contentContainerStyle={{ flex: 1 }}
            data={this.state.searchData}
            renderItem={this._renderItem}
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={this.renderFooter()}
            onEndReached={() => this.getData()}
            onEndReachedThreshold={0.5}
          /> : <Text style={{ marginTop: '20%', marginLeft: '20%' }}>Didn't find what you are looking for!!</Text>}

        </ScrollView>

        <Dialog
          dialogStyle={styles.dialogStyle}
          onDismiss={() => {
            this.setState({ defaultAnimationDialog: false });
          }}
          width={0.9}
          visible={this.state.defaultAnimationDialog}
          rounded
          actionsBordered
          dialogTitle={
            <DialogTitle
              style={{
                backgroundColor: '#F7F7F8',
              }}
              title="Notice"
              hasTitleBar={false}
              align="center"></DialogTitle>
          }
          footer={
            <View>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: '50%' }}>
                  <TouchableOpacity
                    style={styles.bgbtn}
                    onPress={() => {
                      this.setState({ defaultAnimationDialog: false });
                    }}>
                    <Text style={[styles.title, { color: '#fff' }]}>
                      Create Account
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{ width: '50%' }}>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({ defaultAnimationDialog: false });
                    }}
                    style={styles.okbtn}>
                    <Text style={[styles.title, { color: '#E75935' }]}>
                      Go Back
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          }>
          <DialogContent style={{ backgroundColor: '#fff' }}>
            <Text style={styles.dialogContent}>
              For Completing this action you have to create a account on Rajput
              Lagn.
            </Text>
          </DialogContent>
        </Dialog>
      </Container>
    );
  }
}

const data = [
  {
    title: 'XAJ110',
    varified: 'Varified Id',
    dowry: 'Against Dowry',
    year: '24yrs 6,11',
    cast: 'Chauhan',
    city: 'Rajasthan',
    education: 'B.tech | 24 LPA',
    proffesion: 'Software Dev | New Delhi',
    image: images.image6,
    subCaste: 'SubCaste',
    dev: 'Soft.Dev',
    study: 'B.tech',
    subtitle: '24yrs',
  },
  {
    title: 'XAJ110',
    varified: 'Varified Id',
    dowry: 'Against Dowry',
    year: '24yrs 6,11',
    cast: 'Chauhan',
    city: 'Rajasthan',
    education: 'B.tech | 24 LPA',
    proffesion: 'Software Dev | New Delhi',
    image: images.image7,
    subCaste: 'SubCaste',
    dev: 'Soft.Dev',
    study: 'B.tech',
    subtitle: '24yrs',
  },
  {
    title: 'XAJ110',
    varified: 'Varified Id',
    dowry: 'Against Dowry',
    year: '24yrs 6,11',
    cast: 'Chauhan',
    city: 'Rajasthan',
    education: 'B.tech | 24 LPA',
    proffesion: 'Software Dev | New Delhi',
    image: images.image8,
    subCaste: 'SubCaste',
    dev: 'Soft.Dev',
    study: 'B.tech',
    subtitle: '24yrs',
  },
  {
    title: 'XAJ110',
    varified: 'Varified Id',
    dowry: 'Against Dowry',
    year: '24yrs 6,11',
    cast: 'Chauhan',
    city: 'Rajasthan',
    education: 'B.tech | 24 LPA',
    proffesion: 'Software Dev | New Delhi',
    image: images.image6,
    subCaste: 'SubCaste',
    dev: 'Soft.Dev',
    study: 'B.tech',
    subtitle: '24yrs',
  },
];

const minheight = [
  { label: '4\'0"', value: 48 },
  { label: '4\'1"', value: 49 },
  { label: '4\'2"', value: 50 },
  { label: '4\'3"', value: 51 },
  { label: '4\'4"', value: 52 },
  { label: '4\'5"', value: 53 },
  { label: '4\'6"', value: 54 },
  { label: '4\'7"', value: 55 },
  { label: '4\'8"', value: 56 },
  { label: '4\'9"', value: 57 },
  { label: '4\'10"', value: 58 },
  { label: '4\'11"', value: 59 },
  { label: '5 feet', value: 60 },
  { label: '5\'1"', value: 61 },
  { label: '5\'2"', value: 62 },
  { label: '5\'3"', value: 63 },
  { label: '5\'4"', value: 64 },
  { label: '5\'5"', value: 65 },
  { label: '5\'6"', value: 66 },
  { label: '5\'7"', value: 67 },
  { label: '5\'8"', value: 68 },
  { label: '5\'9"', value: 69 },
  { label: '5\'10"', value: 70 },
  { label: '5\'11"', value: 71 },
  { label: '6 feet', value: 72 },
  { label: '6\'1"', value: 73 },
  { label: '6\'2"', value: 74 },
  { label: '6\'3"', value: 75 },
  { label: '6\'4"', value: 76 },
  { label: '6\'5"', value: 77 },
  { label: '6\'6"', value: 78 },
  { label: '6\'7"', value: 79 },
  { label: '6\'8"', value: 80 },
  { label: '6\'9"', value: 81 },
  { label: '6\'10"', value: 82 },
  { label: '6\'11"', value: 83 },
  { label: '7 Feet', value: 84 },
];
