import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Button,
  AsyncStorage,
  ActivityIndicator,
  Image, Alert
} from 'react-native';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import RNPickerSelect from 'react-native-picker-select';
import DatePicker from 'react-native-datepicker';
import styles from './Style';
import { Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Dialog, { DialogTitle, DialogContent } from 'react-native-popup-dialog';
import { fontfamily, fontsize, colors, images } from '../globalstyles/Style';
import { NavigationEvents } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
// import AsyncStorage from '@react-native-community/async-storage';
import { URL } from '../constant/Constant';
import { Textarea } from 'native-base';
import { myToken } from '../token/Token';
import * as ImagePicker from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import Toast from 'react-native-simple-toast';
import { color } from 'react-native-reanimated';

var tempsubcaste = [];

export default class Personal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      pp: '',
      defaultAnimationDialog: false,
      selectedGender: '',
      gender: [],
      marital: [],
      height: [],
      weight: [
        { label: '75', value: '75' },
        { label: '80', value: '80' },
      ],
      physically: [],
      profilecreation: [],
      selectedProfilecreation: '',
      selectedPhysically: '',
      selectedWeight: '',
      selectedHeight: '',
      imagePath: require('../RL_images/vector.jpeg'),
      status: '',
      // selectedMarital:'',
      date: '',
      fname: '',
      lname: '',
      liname: '',
      bio: '',
      disabled: false,
      disabledDOB: false,
      personal: [],
      dp: '',
      uid: '',
      biolength: '0',
      error_gender: false,
      error_dob: false,
      error_fname: false,
      error_lname: false,
      error_merital: false,
      error_height: false,
      error_weight: false,
      error_phy: false,
      error_bio: false,
      error_profile: false,
      error_length: false,
      error_fnameAlpha: false,
      error_lnameAlpha: false,
      photo_count: 0,
      token: '',
      surname: [
        { label: 'Baghel', value: '1' },
        { label: 'Bais', value: '2' },
        { label: 'Bankawat', value: '3' },
        { label: 'Bhadoria', value: '4' },
        { label: 'Bhati', value: '5' },
        { label: 'Bundela', value: '6' },
        { label: 'Bisen', value: '7' },
        { label: 'Bargujar', value: '8' },
        { label: 'Bisht', value: '9' },
        { label: 'Chandel', value: '10' },
        { label: 'Chandrawat', value: '11' },
        { label: 'Champawat', value: '12' },
        { label: 'chundawat', value: '13' },
        { label: 'Chandrawanshi', value: '14' },
        { label: 'Chauhan', value: '15' },
        { label: 'Chib', value: '16' },
        { label: 'Doad', value: '17' },
        { label: 'Dongra', value: '18' },
        { label: 'Durgavanshi', value: '19' },
        { label: 'Dodiya', value: '20' },
        { label: 'Gahlot', value: '21' },
        { label: 'Gautam', value: '22' },
        { label: 'Gogawat', value: '23' },
        { label: 'Hada', value: '24' },
        { label: 'Girnara', value: '25' },
        { label: 'Gehlot', value: '26' },
        { label: 'Gaud/Gaur', value: '27' },
        { label: 'Jadon', value: '28' },
        { label: 'Jhala', value: '29' },
        { label: 'jadeja', value: '30' },
        { label: 'jadon', value: '31' },
        { label: 'Kachhawa', value: '32' },
        { label: 'Khangarot', value: '33' },
        { label: 'Kushwaha', value: '34' },
        { label: 'Khichi', value: '35' },
        { label: 'Manhas', value: '36' },
        { label: 'Naruka', value: '37' },
        { label: 'Nathawat', value: '38' },
        { label: 'Parihar', value: '39' },
        { label: 'Panwar', value: '40' },
        { label: 'Parmar', value: '41' },
        { label: 'Rawe/Rawa', value: '42' },
        { label: 'Raghav', value: '43' },
        { label: 'Raghuwanshi', value: '44' },
        { label: 'Rajawat', value: '45' },
        { label: 'Rathore', value: '46' },
        { label: 'Ranawat', value: '47' },
        { label: 'Rao', value: '48' },
        { label: 'Rana', value: '49' },
        { label: 'sarangdevot', value: '50' },
        { label: 'Shekhawat', value: '51' },
        { label: 'Shaktawat', value: '52' },
        { label: 'Sikarwar', value: '53' },
        { label: 'Singh Deo', value: '54' },
        { label: 'Singh', value: '55' },
        { label: 'Songara', value: '56' },
        { label: 'Sisodia', value: '57' },
        { label: 'Solanki', value: '58' },
        { label: 'Sengar', value: '59' },
        { label: 'Tanwar', value: '60' },
        { label: 'Thakur', value: '61' },
        { label: 'Tomar', value: '62' },
        { label: 'Himachali Rajput', value: '63' },
      ],
    };
  }

  static navigationOptions = {
    header: null,
  };

  defaultScrollViewProps = {
    keyboardShouldPersistTaps: 'handled',
    contentContainerStyle: {},
  };

  firstStepValidation() {
    const {
      fname,
      lname,
      date,
      selectedGender,
      selectedHeight,
      selectedWeight,
      selectedMarital,
      selectedPhysically,
      bio,
      selectedProfilecreation,
    } = this.state;

    if (fname == '' || fname == null) {
      this.setState({ error_fname: true });
    } else {
      this.setState({ error_fname: false });
      if (!fname.match(/^[a-zA-Z]+$/)) {
        this.setState({ error_fnameAlpha: true });
      } else {
        this.setState({ error_fnameAlpha: false });
      }
    }

    if (date == '' || date == null) {
      this.setState({ error_dob: true });
    } else {
      this.setState({ error_dob: false });
    }
    if (lname == '' || lname == null) {
      this.setState({ error_lname: true });
    } else {
      this.setState({ error_lname: false });
      if (!lname.match(/^[a-zA-Z]+$/)) {
        this.setState({ error_lnameAlpha: true });
      } else {
        this.setState({ error_lnameAlpha: false });
      }
    }

    // if( bio!='' ){
    //   alert("bio length",bio.length)
    //   this.setState({ error_bio: false})
    //   if(bio.length > 35){
    //     this.setState({error_length: false})
    //   }else{
    //     this.setState({error_length: true})
    //   }
    // }else{
    //   this.setState({ error_bio: true })
    // }

    if (bio.length >= 1) {
      this.setState({ error_length: true });
      if (bio.length > 35) {
        this.setState({ error_length: false });
      } else {
        this.setState({ error_length: true });
      }
    } else {
      this.setState({ error_length: false });
    }

    if (selectedGender == '' || selectedMarital == null) {
      this.setState({ error_gender: true });
    } else {
      this.setState({ error_gender: false });
    }
    if (selectedMarital == '' || selectedMarital == null) {
      this.setState({ error_merital: true });
    } else {
      this.setState({ error_merital: false });
    }
    if (selectedHeight == '' || selectedHeight == null) {
      this.setState({ error_height: true });
    } else {
      this.setState({ error_height: false });
    }

    if (selectedWeight == '' || selectedWeight == null) {
      this.setState({ error_weight: true });
    } else {
      this.setState({ error_weight: false });
    }
    if (selectedPhysically === '' || selectedPhysically === null) {
      this.setState({ error_phy: true });
    } else {
      this.setState({ error_phy: false });
    }
    if (selectedProfilecreation == '' || selectedProfilecreation == null) {
      this.setState({ error_profile: true });
    } else {
      this.setState({ error_profile: false });
    }
  }

  async profileDataoptions() {
    let idToken = await AsyncStorage.getItem('idToken', idToken);
    // console.log('groom', idToken);
    fetch(URL + 'profile/search/config', {
      method: 'GET',
      headers: {
        Authorization: await myToken(),
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        let subcaste = responseJson.subCaste.options;

        // var tempsubcaste = [];

        for (let i = 0; i < subcaste.length; i++) {
          let obj = {
            label: subcaste[i].label,
            value: subcaste[i].value,
          };
          tempsubcaste.push(obj);
        }

        this.setState({});

        console.log(
          this.state.surname,
          'sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii',
          typeof responseJson,
        );
      })
      .catch((error) => {
        console.error('profileData: something went wrong...', error);
      });
  }

  onNextStep = () => {
    console.log('called next step');
    // this.firstStepValidation();
  };

  onPaymentStepComplete = () => {
    console.log('Payment step completed!');
  };

  onPrevStep = () => {
    console.log('called previous step');
  };

  onSubmitSteps = () => {
    const {
      fname,
      lname,
      date,
      selectedGender,
      selectedHeight,
      selectedWeight,
      selectedMarital,
      selectedPhysically,
      bio,
      selectedProfilecreation,
    } = this.state;
    console.log('this', this.state.disabled, 'b', this.state.disabledDOB);

    if (
      fname != '' &&
      date != '' &&
      lname != '' &&
      //bio != '' &&
      selectedGender != '' &&
      selectedMarital != '' &&
      selectedHeight != '' &&
      selectedWeight != '' &&
      selectedPhysically !== ''
      // selectedProfilecreation != ''
    ) {
      if (this.state.disabled != true && this.state.disabledDOB != true) {
        this.setState({ defaultAnimationDialog: true });
      }
      this.profile();
      this.firstStepValidation();

      this.props.navigation.navigate('Astro')
      this.setState({ currentTab: 1 });
    } else {
      Alert.alert(
        'Fill in the Mandatory Fields',
        '',
        [
          { text: 'Ask me later', onPress: () => console.log('Ask me later pressed') },
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false },
      );
      this.firstStepValidation();
    }
  };

  saveprofiledata = () => {
    this.setState({
      defaultAnimationDialog: false,
      disabled: true,
      disabledDOB: true,
    });
    this.profile();
  };

  async profile() {
    let idToken = await AsyncStorage.getItem('idToken', idToken);

    const {
      fname,
      lname,
      date,
      selectedGender,
      selectedHeight,
      selectedWeight,
      selectedMarital,
      selectedPhysically,
      bio,
      selectedProfilecreation,
    } = this.state;

    var str = date;
    let darr = str.split('-');
    console.log('darr', darr);
    var dobj = new Date(
      parseInt(darr[2]),
      parseInt(darr[1]) - 1,
      parseInt(darr[0]),
    );
    console.log(dobj.toISOString());
    var dt = dobj.toISOString();

    let params = {
      profile: {
        personal: {
          fname: fname,
          lname: lname,
          dob: dt,
          gender: selectedGender,
          height: selectedHeight,
          weight: selectedWeight,
          maritalStatus: selectedMarital,
          physicallyChallenged: selectedPhysically,
          bio: bio,
          profileCreator: selectedProfilecreation,
        },
      },
    };

    console.log('send data params:', params);

    fetch(URL + 'profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: await myToken(),
      },
      body: JSON.stringify(params),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.personal != undefined) {
          console.log('send data:', responseJson.personal);
          // console.log('old fname: ', this.state.date, 'new fname: ', this.state.date, );
          this.setState({ personal: responseJson.personal });
          Toast.show('Saved', Toast.SHORT);
        } else {
          Alert.alert(
            'Fill in the Mandatory Fields',
            '',
            [
              { text: 'Ask me later', onPress: () => console.log('Ask me later pressed') },
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: false },
          );
        }
      })
      .catch((error) => {
        console.error('Personal: something went wrong...', error);
      });
  }

  async profileData() {
    let idToken = await AsyncStorage.getItem('idToken', idToken);

    fetch(URL + 'profile/config', {
      method: 'GET',
      headers: {
        Authorization: await myToken(),
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.code == 'not-found') {
          console.log('personal dropdown data=>', responseJson.msg);
        } else {
          let genderData = responseJson.personal.gender.options;
          let profileCreator = responseJson.personal.profileCreator.options;
          let maritalStatusData = responseJson.personal.maritalStatus.options;
          let physically = responseJson.personal.physicallyChallenged.options;
          let height = responseJson.personal.height.options;
          this.setState({
            gender: genderData,
            marital: maritalStatusData,
            profilecreation: profileCreator,
            physically: physically,
            height: height,
          });
          //  console.log('maritalStatusData:',responseJson)
        }
      })
      .catch((error) => {
        console.error('profileData: something went wrong...', error);
      });
  }

  async getProfile() {
    let idToken = await AsyncStorage.getItem('idToken', idToken);
    console.log("getprofile is workinggggggggggggggggggggggggggggggggggggggggggggggg");
    fetch(URL + 'profile', {
      method: 'GET',
      headers: {
        Authorization: await myToken(),
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.code == 'not-found') {
          console.log(responseJson.msg);
          this.setState({ loading: false });
        } else {
          if (responseJson.personal.fname == undefined) {
            console.log('personal data not found');
            this.setState({ loading: false });
          } else {
            //console.log('get data personal', responseJson.personal );
            let personalData = responseJson.personal;
            let d = new Date(personalData.dob);
            let getDate = d.getDate();
            let getmonth = d.getMonth() + 1;
            let getyear = d.getFullYear();
            let dd = getDate + '-' + getmonth + '-' + getyear;
            console.log(' date', getDate + '-' + getmonth + '-' + getyear);
            console.log(
              ' personalData.dob',
              personalData.dob,
              personalData.gender,
            );

            let photos = responseJson.photos;
            if (photos.length == 0) {
              console.log(photos, 'dp does not exit');
            } else {
              let obj = photos.find((o) => o.isDisplayPic === true);
              console.log(photos.length, 'photosccccccccccccccccccc');
              this.setState({ photo_count: photos.length })
              this.setState({ dp: obj.url });
            }

            let obj = responseJson.uid;
            this.setState({ uid: obj });

            this.setState({
              loading: false,
              personal: personalData,
              fname: personalData.fname,
              lname: personalData.lname,
              bio: personalData.bio,
              selectedGender: personalData.gender,
              date: dd,
              selectedMarital: personalData.maritalStatus,
              selectedHeight: personalData.height,
              selectedWeight: personalData.weight,
              selectedPhysically: personalData.physicallyChallenged,
              selectedProfilecreation: personalData.profileCreator,
            });

            if (personalData.gender == '') {
              this.setState({ disabled: false });
            } else {
              this.setState({ disabled: true });
            }

            if (personalData.dob == '') {
              this.setState({ disabledDOB: false });
            } else {
              this.setState({ disabledDOB: true });
            }

            if (personalData.gender == '' && personalData.dob == '') {
              this.setState({ defaultAnimationDialog: true });
            } else {
              this.setState({ defaultAnimationDialog: false });
            }
          }
        }
      })
      .catch((error) => {
        console.error('something went wrong...', error);
        this.setState({ loading: false });
      });
  }

  chooseFile = (uid, token) => {
    this.setState({ status: '' });
    console.log(token, "tooooooooooooooooooooookeeeeeeeeeeeeeeeeeeeeeeeeeeeennnnnnn");
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
    ImagePicker.launchImageLibrary(options, (response) => {
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
        this.uploadImageToStorage(path, fileName, uid);
      }
    });
  };

  getFileName(name, path) {
    if (name != null) {
      return name;
    }

    if (Platform.OS === 'ios') {
      path = '~' + path.substring(path.indexOf('/Documents'));
    }
    return path.split('/').pop();
  }

  uploadImageToStorage(path, name, uid) {
    this.setState({ isLoading: true });
    //console.log(myToken(), "sssssffffff");
    console.log('userPhotos/' + uid + '/' + name, "fffffffffufhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
    let reference = storage().ref('userPhotos/' + uid + '/' + name);


    let task = reference.putFile(path);
    task
      .then(() => {

        console.log('Image uploaded to the bucket!');
        this.setState({
          isLoading: false,
          status: 'Image uploaded successfully',
        });
        Toast.show('Image uploaded successfully', Toast.SHORT);
        reference
          .getDownloadURL()
          .then((url) => {
            //from url you can fetched the uploaded image easily
            //this.setState({ profileImageUrl: url });
            this.profilephotos(name, url);
            console.log(url, "this is the url Paarths")
            /////////////////////////////////////////////
            var myHeaders = new Headers();
            myHeaders.append("Authorization", myToken());
            myHeaders.append("Content-Type", "application/json");
            console.log(name, "name is this");
            var raw = JSON.stringify({ "name": name, "isDisplayPic": true, url: url });

            var requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: raw,
              redirect: 'follow'
            };

            fetch("http://192.168.0.204:5001/rajput-matrimony-8f30a/asia-south1/api/profile/photos", requestOptions)
              .then(response => response.text())
              .then(result => console.log(result))
              .catch(error => console.log('error', error));
          })
          .catch((e) => console.log('getting downloadURL of image errorsssssssss => ', e));
      })
      .catch((e) => {
        status = 'Something went wrong';
        console.log('uploading image error => ', e);
        this.setState({ isLoading: false, status: 'Something went wrong' });
      });


  }

  async upload_Image(name) {
    console.log('name', name);
    let params = { name: name, isDisplayPic: false };
    fetch(URL + 'profile/photo', {
      method: 'POST',
      headers: {
        Authorization: await myToken(),
      },
      body: JSON.stringify(params),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('responseJson', responseJson);
      })
      .catch((error) => {
        console.error('something went wrong...', error);
      });
  }

  async profilephotos(name, url) {
    console.log("objecddddddddddddt");
    console.log('name', name);
    let params = { name: name, isDisplayPic: true, picurl: url };

    console.log('send data params:', params);

    fetch(URL + 'profile/photos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: await myToken(),
      },
      body: JSON.stringify(params),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.code == 'out-of-range') {
          console.log('responseJson:', responseJson);
          alert(responseJson.msg);
        }
      })
      .catch((error) => {
        console.error('image upload: something went wrong...', error);
      });
  }

  /**
   * Get platform specific value from response
   */
  getPlatformPath({ path, uri }) {
    return Platform.select({
      android: { value: uri },
      ios: { value: uri },
    });
  }

  getPlatformURI(imagePath) {
    let imgSource = imagePath;
    if (isNaN(imagePath)) {
      imgSource = { uri: this.state.imagePath };
      if (Platform.OS == 'android') {
        imgSource.uri = 'file:///' + imgSource.uri;
      }
    }
    return imgSource;
  }

  componentDidMount() {
    this.profileData();
    this.getProfile();
    this.profileDataoptions();
  }

  renderField(settings) {
    const { selectedItem, defaultText, getLabel, clear } = settings;
    return (
      <View style={[styles.container, { backgroundColor: '#ccc' }]}>
        <View>
          {!selectedItem && (
            <Text style={[styles.text, { color: 'grey' }]}>{defaultText}</Text>
          )}
          {selectedItem && (
            <View style={styles.content}>
              {/* <TouchableOpacity style={styles.clearButton} onPress={clear}>
              <Text style={{ color: '#fff' }}>Clear</Text>
            </TouchableOpacity> */}
              <Text style={[styles.text, { color: selectedItem.color }]}>
                {getLabel(selectedItem)}
              </Text>
            </View>
          )}
        </View>
      </View>
    );
  }

  renderOption(settings) {
    const { item, getLabel } = settings;
    return (
      <View style={styles.optionContainer}>
        <View style={styles.content}>
          {/* <View style={[styles.box, { backgroundColor: item.color }]} /> */}
          <Text style={{ color: item.color, alignSelf: 'flex-start' }}>
            {getLabel(item)}
          </Text>
        </View>
      </View>
    );
  }

  renderHeader() {
    return (
      <View style={[styles.content, { backgroundColor: colors.primary }]}>
        <Text>Marital status</Text>
      </View>
    );
  }

  render() {
    const progressStepsStyle = {

      activeStepIconBorderColor: '#EA4335',
      activeLabelColor: '#EA4335',
      activeStepNumColor: '#000',
      activeStepIconColor: 'transparent',
      completedStepIconColor: '#EA4335',
      completedProgressBarColor: '#EA4335',
      completedCheckColor: '#EA4335',
      completedLabelColor: '#EA4335',
      completedStepNumColor: '#fff',
      activeStepNumColor: '#000',
      borderWidth: 3,
      progressBarColor: 'rgba(165, 165, 165, 0.6)',
      disabledStepIconColor: '#A5A5A5',
      labelColor: '#A5A5A5',
      marginBottom: 10,
      topOffset: 10,
      labelFontFamily: fontfamily.regular,
      labelFontSize: fontsize.label,
    };

    const buttonTextStyle = {
      color: '#fff',
      fontFamily: fontfamily.roboto,
      fontSize: fontsize.subtitle,
      textAlign: 'center',
    };

    const buttonStyle = {
      backgroundColor: '#E75935',
      borderRadius: 4,
      paddingHorizontal: 30,
    };
    const {
      imagePath,
      selectedGender,
      fname,
      date,
      lname,
      selectedMarital,
      selectedHeight,
      selectedWeight,
      selectedPhysically,
      bio,
      selectedProfilecreation,
    } = this.state;
    const { surname } = this.state;

    let imgSource = this.getPlatformURI(imagePath);
    if (this.state.loading) {
      return (
        <View style={styles.forindicator}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      );
    }

    return (
      <View style={styles.container}>
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
              title="Confirm Basic Details"
              hasTitleBar={false}
              align="center"
            />
          }
          footer={
            <View>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: '50%' }}>
                  <TouchableOpacity
                    style={styles.bgbtn}
                    onPress={() => {
                      this.saveprofiledata();
                    }}
                    activeOpacity={0.5}>
                    <Text style={[styles.title, { color: '#fff' }]}>Proceed</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ width: '50%' }}>
                  <TouchableOpacity
                    activeOpacity={0.7}
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
            <Text style={[styles.subtitle, { textAlign: 'center' }]}>
              You will not be allowed to edit the fields shown below after
              registration{' '}
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ width: '50%' }}>
                <Text style={[styles.subtitle, { textAlign: 'right' }]}>
                  Gender :
                </Text>
              </View>
              <View style={{ width: '50%' }}>
                <Text style={[styles.subtitle, { textAlign: 'left' }]}>
                  {' '}
                  {selectedGender}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', marginTop: -15 }}>
              <View style={{ width: '50%' }}>
                <Text style={[styles.subtitle, { textAlign: 'right' }]}>
                  Date Of Birth :
                </Text>
              </View>
              <View style={{ width: '50%' }}>
                <Text style={[styles.subtitle, { textAlign: 'left' }]}>
                  {' '}
                  {date}
                </Text>
              </View>
            </View>
            <Text style={[styles.subtitle, { textAlign: 'center' }]}>
              Please make correction NOW if you think you have wrongly filled
              these fields
            </Text>
          </DialogContent>
        </Dialog>

        <View style={{ flex: 1, overflow: 'visible', marginTop: 20 }}>
          <ScrollView>
            <Text style={styles.title}> </Text>
            <View >
              <LinearGradient
                start={{ x: 0.25, y: 1.25 }}
                end={{ x: 0.5, y: 100 }}
                locations={[0, 20, 50]}
                colors={['#FC5C33', '#FC5C33', '#D61669']}
                style={styles.linearGradient} >
              </LinearGradient>


              <ProgressSteps {...progressStepsStyle}>




                <ProgressStep

                  label="Basic Detail"
                  onNext={this.onPaymentStepComplete}
                  onPrevious={this.onPrevStep}
                  scrollViewProps={this.defaultScrollViewProps}
                  nextBtnTextStyle={buttonTextStyle}
                  previousBtnTextStyle={buttonTextStyle}

                  nextBtnStyle={buttonStyle}>



                  <View style={styles.content}>
                    <View>
                      <Text style={styles.title}>Gender{<Text style={styles.red}>*</Text>}</Text>
                      <View style={styles.pickersty}>
                        <RNPickerSelect
                          placeholder={{
                            label: 'Choose',
                            value: null,
                          }}
                          items={this.state.gender}
                          onValueChange={(value) => {
                            this.setState({ selectedGender: value });
                          }}
                          useNativeAndroidPickerStyle={false}
                          style={pickerStyle}
                          value={selectedGender}
                          disabled={this.state.disabled}
                        />
                      </View>
                      {this.state.error_gender ? (
                        <Text style={styles.inputtxt}>
                          This filed is mandatory
                        </Text>
                      ) : null}
                    </View>

                    <View>
                      <Text style={styles.title}>Date Of Birth{<Text style={styles.red}>*</Text>}</Text>
                      <DatePicker
                        style={styles.datePicker}
                        date={date}
                        mode="date"
                        placeholder="Enter DOB"
                        format="DD-MM-YYYY"
                        confirmBtnText="Confirm"
                        androidMode="spinner"
                        cancelBtnText="Cancel"
                        iconComponent={
                          <Icon name="calendar-alt" size={20} color="#797979" />
                        }
                        customStyles={datePickerStyle}
                        disabled={this.state.disabledDOB}
                        onDateChange={(dt) => {
                          this.setState({ date: dt });
                        }}
                      />
                      {this.state.error_dob ? (
                        <Text style={styles.inputtxt}>
                          This filed is mandatory
                        </Text>
                      ) : null}
                    </View>

                    <View>
                      <Text style={styles.title}>First Name{<Text style={styles.red}>*</Text>}</Text>
                      <View style={styles.inputcontainer}>
                        <TextInput
                          style={styles.input}
                          placeholderTextColor={'rgba(32, 32, 32, 0.6)'}
                          placeholder="Enter First Name"
                          value={fname}
                          onChangeText={(fname) => this.setState({ fname })}
                          autoCapitalize="none"
                          autoCorrect={false}
                          keyboardType="default"
                          returnKeyType="next"
                          onSubmitEditing={() => {
                            this.secondTextInput.focus();
                          }}
                        />
                      </View>
                      {this.state.error_fname ? (
                        <Text style={styles.inputtxt}>
                          This filed is mandatory
                        </Text>
                      ) : null}
                      {this.state.error_fnameAlpha ? (
                        <Text style={styles.inputtxt}>
                          Only alphabets are allowed
                        </Text>
                      ) : null}
                    </View>

                    <View>
                      <Text style={styles.title}>Last Name{<Text style={styles.red}>*</Text>}</Text>

                      <View style={styles.pickersty}>
                        {/* <RNPickerSelect
                          placeholder={{
                            label: 'Choose',
                            value: null,
                          }}
                          items={surname}
                          onValueChange={(value) => {
                            // this.setState({liname: value});
                            console.log(
                              value,
                              'dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd',
                            );
                          }}
                          useNativeAndroidPickerStyle={false}
                          style={pickerStyle}
                          value={'ssdd'}
                          disabled={this.state.disabled}
                        /> */}
                        <RNPickerSelect
                          placeholder={{
                            label: 'Choose',
                            value: null,
                          }}
                          onValueChange={(value) =>
                            this.setState({ lname: value })
                          }
                          items={surname}
                          useNativeAndroidPickerStyle={false}
                          style={pickerStyle}
                          value={lname}
                        />
                      </View>
                      {this.state.error_lname ? (
                        <Text style={styles.inputtxt}>
                          This filed is mandatory
                        </Text>
                      ) : null}
                      {this.state.error_lnameAlpha ? (
                        <Text style={styles.inputtxt}>
                          Only alphabets are allowed
                        </Text>
                      ) : null}
                    </View>

                    <View>
                      <Text style={styles.title}>Marital Status{<Text style={styles.red}>*</Text>}</Text>
                      <View style={styles.pickersty}>
                        <RNPickerSelect
                          placeholder={{
                            label: 'Choose',
                            value: null,
                          }}
                          items={this.state.marital}
                          onValueChange={(value) => {
                            this.setState({ selectedMarital: value });
                          }}
                          useNativeAndroidPickerStyle={false}
                          style={pickerStyle}
                          value={selectedMarital}
                        />
                      </View>

                      {/* <CustomPicker
                      style={styles.pickersty}
                      placeholder={'Please select your favorite item...'}
                      options={this.state.marital}
                      getLabel={item => item.label}
                      fieldTemplate={this.renderField}
                      optionTemplate={this.renderOption}
                      headerTemplate={this.renderHeader}
                      //  footerTemplate={this.renderFooter}
                      onValueChange={value => {
                        //  Alert.alert('Selected Item', value ? JSON.stringify(value) : 'No item were selected!')
                        console.log('value', value)
                        this.setState({ selectedMarital: value })
                      }}
                      value={this.state.selectedMarital}
                    /> */}
                      {/* <Text>{this.state.selectedMarital}</Text> */}
                      {this.state.error_merital ? (
                        <Text style={styles.inputtxt}>
                          This filed is mandatory
                        </Text>
                      ) : null}
                    </View>
                  </View>
                </ProgressStep>

                <ProgressStep
                  label="Profile Picture"
                  onNext={this.onNextStep}
                  onPrevious={this.onPrevStep}
                  scrollViewProps={this.defaultScrollViewProps}
                  nextBtnTextStyle={buttonTextStyle}
                  previousBtnTextStyle={buttonTextStyle}
                  nextBtnStyle={buttonStyle}
                  previousBtnStyle={buttonStyle}>
                  <View style={styles.content}>
                    <View style={styles.forindicator}>
                      <Text style={[styles.title]}>Set your profile picture ({this.state.photo_count ? this.state.photo_count : 0} uploaded)</Text>
                      {this.state.dp == '' ? (
                        <View>
                          <View style={{ marginTop: 15 }}>
                            <Avatar
                              rounded
                              source={imgSource}
                              size="xlarge"
                              overlayContainerStyle={{ backgroundColor: '#ccc' }}
                            />
                          </View>

                          <TouchableOpacity
                            style={[styles.btnsty, { marginTop: 15 }]}
                            //onPress={this.chooseFile}

                            onPress={() => this.props.navigation.navigate('Photo')}
                          >
                            <Text style={[styles.title, { color: '#fff' }]}>
                              Upload photo
                            </Text>
                          </TouchableOpacity>
                        </View>
                      ) : (
                        <View>
                          <View style={{ marginTop: 15 }}>
                            <Avatar
                              rounded
                              source={{ uri: this.state.dp }}
                              overlayContainerStyle={{ backgroundColor: '#ccc' }}
                              size="xlarge"
                            />
                          </View>
                          <TouchableOpacity
                            style={[styles.btnsty, { marginTop: 15 }]}
                            //  onPress={this.chooseFile}
                            onPress={() => this.props.navigation.navigate('Photo')}
                          >
                            <Text style={[styles.title, { color: '#fff' }]}>
                              Upload photoss
                            </Text>
                          </TouchableOpacity>
                        </View>
                      )}
                    </View>
                  </View>
                </ProgressStep>

                <ProgressStep
                  label="Physique"
                  onNext={this.onNextStep}
                  onPrevious={this.onPrevStep}
                  scrollViewProps={this.defaultScrollViewProps}
                  nextBtnTextStyle={buttonTextStyle}
                  previousBtnTextStyle={buttonTextStyle}
                  nextBtnStyle={buttonStyle}
                  previousBtnStyle={buttonStyle}>
                  <View style={styles.content}>
                    <View>
                      <Text style={styles.title}>Height{<Text style={styles.red}>*</Text>}</Text>
                      <View style={styles.pickersty}>
                        <RNPickerSelect
                          placeholder={{
                            label: 'Choose',
                            value: null,
                          }}
                          items={this.state.height}
                          onValueChange={(value) => {
                            this.setState({ selectedHeight: value });
                          }}
                          useNativeAndroidPickerStyle={false}
                          style={pickerStyle}
                          value={selectedHeight}
                        />
                      </View>
                      {this.state.error_height ? (
                        <Text style={styles.inputtxt}>
                          This filed is mandatory
                        </Text>
                      ) : null}
                    </View>

                    <View>
                      <Text style={styles.title}>Weight{<Text style={styles.red}>*</Text>}</Text>
                      <View style={styles.inputcontainer}>
                        <TextInput
                          style={styles.input}
                          placeholderTextColor={'rgba(32, 32, 32, 0.6)'}
                          placeholder="kgs"
                          value={selectedWeight}
                          onChangeText={(selectedWeight) =>
                            this.setState({ selectedWeight })
                          }
                          autoCapitalize="none"
                          autoCorrect={false}
                          keyboardType="default"
                          returnKeyType="next"
                        />
                      </View>
                      {this.state.error_weight ? (
                        <Text style={styles.inputtxt}>
                          This filed is mandatory
                        </Text>
                      ) : null}
                    </View>

                    <View>
                      <Text style={styles.title}>Physically Challenged{<Text style={styles.red}>*</Text>}</Text>
                      <View style={styles.pickersty}>
                        <RNPickerSelect
                          placeholder={{
                            label: 'Choose',
                            value: null,
                          }}
                          items={this.state.physically}
                          onValueChange={(value) => {
                            this.setState({ selectedPhysically: value });
                            console.log('value', value);
                          }}
                          useNativeAndroidPickerStyle={false}
                          style={pickerStyle}
                          value={selectedPhysically}
                        />
                      </View>
                      {this.state.error_phy ? (
                        <Text style={styles.inputtxt}>
                          This filed is mandatory
                        </Text>
                      ) : null}
                    </View>
                  </View>
                </ProgressStep>

                <ProgressStep
                  label="Bio"
                  //onNext={this.onNextStep}
                  onPrevious={this.onPrevStep}
                  onSubmit={this.onSubmitSteps}
                  scrollViewProps={this.defaultScrollViewProps}
                  nextBtnStyle={buttonStyle}
                  nextBtnTextStyle={buttonTextStyle}
                  previousBtnTextStyle={buttonTextStyle}
                  previousBtnStyle={buttonStyle}>
                  <View style={styles.content}>
                    <View>
                      <Text style={styles.title}>Write about yourself </Text>
                      <View style={styles.textAreaContainer}>
                        <Textarea
                          rowSpan={6}
                          style={styles.input}
                          placeholder="Write about yourself"
                          placeholderTextColor={'rgba(32, 32, 32, 0.6)'}
                          value={bio}
                          onChangeText={(bio) => this.setState({ bio })}
                          autoCapitalize="none"
                          autoCorrect={false}
                          keyboardType="default"
                          returnKeyType="go"
                          maxLength={200}
                        />
                      </View>
                      {/* {this.state.error_bio ? (
                        <Text style={styles.inputtxt}>
                          This filed is mandatory
                        </Text>
                      ) : null} */}
                      {/* {this.state.error_length ? (
                        <Text style={styles.inputtxt}>
                          Please enter minimum 35 characters{' '}
                        </Text>
                      ) : null} */}
                    </View>

                    <View>
                      <Text style={styles.title}>Profile Created by</Text>
                      <View style={styles.pickersty}>
                        <RNPickerSelect
                          placeholder={{
                            label: 'Choose',
                            value: null,
                          }}
                          items={this.state.profilecreation}
                          onValueChange={(value) => {
                            this.setState({ selectedProfilecreation: value });
                          }}
                          useNativeAndroidPickerStyle={false}
                          style={pickerStyle}
                          value={selectedProfilecreation}
                        />
                      </View>
                      {/* {this.state.error_profile ? (
                        <Text style={styles.inputtxt}>
                          This filed is mandatory
                        </Text>
                      ) : null} */}
                    </View>
                  </View>
                </ProgressStep>

              </ProgressSteps>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const pickerStyle = {
  inputIOS: {
    color: '#000',
    fontFamily: fontfamily.roboto,
    fontSize: fontsize.subtitle,
  },
  itemStyle: {
    textAlign: 'center',
  },
  inputAndroid: {
    color: '#000',
    fontFamily: fontfamily.roboto,
    fontSize: fontsize.subtitle,
    // fontSize:30
  },
  placeholder: {
    color: 'rgba(32, 32, 32, 0.6)',
  },
  underline: { borderTopWidth: 0 },
  icon: {
    position: 'absolute',
    backgroundColor: 'transparent',
    borderTopWidth: 5,
    borderTopColor: '#00000099',
    borderRightWidth: 5,
    borderRightColor: 'transparent',
    borderLeftWidth: 5,
    borderLeftColor: 'transparent',
    width: 0,
    height: 0,
    top: 20,
    right: 15,
  },
};

const datePickerStyle = {
  placeholderText: {
    color: 'rgba(32, 32, 32, 0.6)',
    fontFamily: fontfamily.regular,
    fontSize: fontsize.subtitle,
  },
  dateInput: {
    borderWidth: 0,
    alignItems: 'flex-start',
  },
  dateText: {
    fontFamily: fontfamily.regular,
    fontSize: fontsize.subtitle,
  },
};
