import React, { Component } from 'react'
import { View, Text, StatusBar, TouchableOpacity, Image, ScrollView, TabHeading, Dimensions } from 'react-native'
import styles from './Style';
import { images } from '../globalstyles/Style';
import { Avatar } from 'react-native-elements';
import { Container, Tab, Tabs } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
//import ImagePicker from 'react-native-image-picker';
//import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import * as ImagePicker from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import ProfileTab from '../profiletab/ProfileTab';
// import firebase from 'react-native-firebase'
import Personal from '../profile/Personal';
import Astro from '../profile/Astro';
import Career from '../profile/Career';
import Family from '../profile/Family';
import { myToken } from '../token/Token';
import { URL } from '../constant/Constant';
import Toast from 'react-native-simple-toast';

export default class Profile extends Component {
  state = {
    photo: null,
    show: true,
    dataSource: [],
    currentTab: 0,
    imagePath: require('../RL_images/vector.jpeg'),
    isLoading: false,
    status: '', uid: '', dp: ''
  }

  //-----------------------------------------Uploading an Image to firebase storge-------------------------------------

  chooseFile = () => {
    console.log("object");
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
    console.log("choosefile");
    //launchImageLibrary
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
        //, source() in clg
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        // let path = this.getPlatformPath(response).value;
        // let fileName = this.getFileName(response.fileName, path);
        // this.setState({ imagePath: path });
        // this.uploadImageToStorage(path, fileName);
        var source = response;
      }
      console.log(source, "hhhhhh");
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
      status = 'Something went wrong';
      console.log('uploading image error => ', e);
      this.setState({ isLoading: false, status: 'Something went wrong' });
    });
  }
  // commented for testing purposes
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
        } else {
          let photos = responseJson.photos;
          if (photos.length == 0) {
            console.log('dp does not exit')
          } else {
            let obj = photos.find(o => o.isDisplayPic === true);
            console.log(photos.length, "photos");
            //this.setState({ dp: obj.url })
          }
        }
      })
      .catch(error => {
        console.error('something went wrong...', error);
      });
  }

  /**
   * Get platform specific value from response
   */
  //commented for testing purposes
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
  //----------------------------------------------------------------------

  componentDidMount() {
    const { navigation } = this.props;
    const uid = navigation.getParam('uid');
    this.setState({ uid: uid });
    console.log("uid", uid)
    this.getProfile();
  }

  handleChoosePhoto = () => {
    console.log("object");
    // const options = {
    //   noData: true,
    // }
    // ImagePicker.launchImageLibrary(options, response => {
    //   if (response.uri) {
    //     this.setState({ photo: response });
    //     console.log('response', response)
    //     this.ShowHideComponent();
    //   }
    // })
  }

  ShowHideComponent = () => {
    if (this.state.show == true) {
      this.setState({ show: false });
    }
  };

  handleUploadPhoto = () => {
    fetch('http://localhost:8081/api/upload', {
      method: "POST",
      body: createFormData(this.state.photo, { userId: "123" })
    })
      .then(response => response.json())
      .then(response => {
        console.log("upload succes", response);
        alert("Upload success!");
        this.setState({ photo: null });
      })
      .catch(error => {
        console.log("upload error", error);
        alert("Upload failed!");
      });
  };
  // this is a check function to checking adding photos
  check = () => {
    console.log("the check function is working");
  }
  render() {
    const { photo, show, imagePath } = this.state
    let imgSource = this.getPlatformURI(imagePath)
    return (
      <Container>
        <View style={styles.container}>
          <StatusBar barStyle='dark-content' backgroundColor='#fff' />
          <View style={{ padding: 15 }}>
            <View>
              <TouchableOpacity activeOpacity={0.5} onPress={() => this.props.navigation.goBack()}>
                <Image source={images.back} style={styles.backimg} tintColor='#000' />
              </TouchableOpacity>
            </View>

            <TouchableOpacity disabled={true}>

              <View style={{ marginTop: 10 }}>

                <View style={{ flexDirection: 'row' }}>
                  <View style={{ width: '20%' }}>

                    {this.state.dp == '' ? (
                      <View>
                        <View style={styles.bgimg}>
                          {/* <Avatar rounded source={imgSource} size='large' /> */}
                        </View>
                        {/* <TouchableOpacity style={styles.plus} onPress={() => { this.chooseFile() }} >
                          <Icon name="plus" color='#fff' size={12} style={{ textAlign: 'center', }} />
                        </TouchableOpacity> */}
                      </View>
                    ) :
                      <View>
                        <View style={styles.bgimg}>
                          {/* <Avatar rounded source={{uri:this.state.dp}} size='large' /> */}
                        </View>
                        {/* this has been commented by PSR */}
                        {/* <TouchableOpacity style={styles.plus} onPress={()=>{this.chooseFile()}} disabled={true}>
                    <Icon name="plus" color='#fff' size={12} style={{ textAlign: 'center', }} />
                  </TouchableOpacity> */}
                      </View>
                    }

                  </View>

                  <View style={styles.uploadtxt}>

                    <Text style={styles.title}>Create Profile</Text>
                    {/* <Text style={styles.title}>{this.state.status}</Text> */}
                  </View>

                  {/* <TouchableOpacity activeOpacity={0.9} style={styles.settingimg}>
                <Image source={images.settings} style={{width:22,height:22}} />
                </TouchableOpacity> */}
                </View>

              </View>
            </TouchableOpacity>
          </View>

          <ProfileTab />




        </View>
        {/* <Tabs
          // tabBarUnderlineStyle={{
          //   borderBottomWidth: 3, borderBottomColor: '#E75935',
          // }}
          // tabContainerStyle={styles.tabContainerStyle}
          // initialPage={this.state.currentPage} onChangeTab={({ i }) => {
          //   console.log("tab", i)
          //   this.setState({ currentTab: i })
          // }}
          // page={this.state.currentPage}
          locked={true}
          initialPage={0}
        >

          <Tab heading={
            <TabHeading style={styles.tabheading}>
              <Text style={this.state.currentTab === 0 ? styles.activetabtxtsty : styles.tabtxtsty}>Personaisssl</Text>
            </TabHeading>}
            disabled={true}>
            <Personal {...this.props} />
          </Tab>
          <Tab heading={
            <TabHeading style={styles.tabheading}>
              <Text style={this.state.currentTab === 1 ? styles.activetabtxtsty : styles.tabtxtsty}>Astro</Text>
            </TabHeading>} disabled={true}>
            <Astro {...this.props} />
          </Tab>
          <Tab heading={
            <TabHeading style={styles.tabheading}>
              <Text style={this.state.currentTab === 2 ? styles.activetabtxtsty : styles.tabtxtsty}>Career</Text>
            </TabHeading>} disabled={true}>
            <Career {...this.props} />
          </Tab>
          <Tab heading={
            <TabHeading style={styles.tabheading}>
              <Text style={this.state.currentTab === 3 ? styles.activetabtxtsty : styles.tabtxtsty}>Family</Text>
            </TabHeading>} >
            <Family {...this.props} />
          </Tab>
        </Tabs> */}

      </Container>
    )
  }
}


{/* <Tabs initialPage={this.state.initialPage} page={this.state.activeTab}>
<Tab heading={<TabHeading><Text>Tab 1</Text></TabHeading>}>
  <Text>First tab</Text>
  <Button style={{ margin: 10 }} onPress={() => this.setState({ activeTab: 1 })}><Text>Go to second tab</Text></Button>
</Tab>
<Tab heading={<TabHeading><Text>Tab 2</Text></TabHeading>}>
  <Text >Second tab</Text>
  <Button style={{ margin: 10 }}><Text onPress={() => this.setState({ activeTab: 0 })}>Go to first tab</Text></Button>
</Tab>
</Tabs> */}