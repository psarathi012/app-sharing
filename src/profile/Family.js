import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  ActivityIndicator, Alert
} from 'react-native';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import RNPickerSelect from 'react-native-picker-select';
import { colors, fontfamily, fontsize } from '../globalstyles/Style';
import styles from './Style';
import { Textarea } from 'native-base';
import Dialog, { DialogTitle, DialogContent } from 'react-native-popup-dialog';
import MultiSelect from 'react-native-multiple-select';
import Toast from 'react-native-simple-toast';
// import AsyncStorage from '@react-native-community/async-storage';
import { URL } from '../constant/Constant';
import { myToken } from '../token/Token';
import { MaterialDialog } from 'react-native-material-dialog';
import SelectMultiple from 'react-native-select-multiple';
export default class Career extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultAnimationDialog: false,
      loading: true,
      favColor: undefined,
      items: [],
      about: '',
      height: 0,
      fatherOccupation: '',
      selected_myfatherOcc: '',
      myfatherOcc: [],
      selected_originallyFrom: '',
      originallyFrom: [],
      myoriginallyFrom: [],
      selected_familyValue: '',
      familyValue: [],
      motherOccupation: '',
      motherName: '',
      motherPlace: '',
      stateRelations: '',
      pocNumber: '',
      pocName: '',
      nominee: '',
      email: '',
      familyStatus: [],
      selectedfamilyStatus: '',
      familyType: [],
      selectedfamilyType: '',
      family: [],
      brothers: [],
      living: '',
      selectedliving: '',
      selectedSibling: null,
      selectedCast: '',
      cast: [],
      selectedItems: [],
      error_familyValue: false,
      error_about: false,
      error_family: false,
      error_fatherocc: false,
      error_mothername: false,
      error_motherorignally: false,
      error_sibling: false,
      error_fstatus: false,
      error_ftype: false,
      error_thikana: false,
      error_caste: false,
      error_name: false,
      error_number: false,
      error_living: false,
      error_email: false,
      error_nominee: false,
      error_validNum: false,
      error_validEmail: false,
      error_sister: false,
      selectedmarriedBro: '',
      error_AlternatepocNumber: false,
      error_marriedBro: false,
      error_Altnumber: false,
      error_marriedSis: false,
      marriedBro: [],
      selectedmarriedSis: '',
      AlternatepocNumber: '',
      marriedSis: [],
      selectedSister: null,
      Sister: [],
      casteRelations: [],
      m_brother: [],
      m_sister: [],
      visible: false,
      caste: [],
      selectedItems1: [],
    };
  }

  onNextStep = () => {
    console.log('called next step');
  };

  onPaymentStepComplete = () => {
    console.log('Payment step completed!');
  };

  onPrevStep = () => {
    console.log('called previous step');
  };

  onSubmitSteps = () => {
    const {
      selectedItems,
      about,
      selected_myfatherOcc,
      selected_originallyFrom,
      living,
      motherOccupation,
      motherName,
      motherPlace,
      selectedfamilyStatus,
      selectedSibling,
      selectedSister,
      selectedmarriedBro,
      selected_familyValue,
      selectedmarriedSis,
      stateRelations,
      pocName,
      pocNumber,
      email,
      selectedfamilyType,
      AlternatepocNumber,
    } = this.state;
    // console.log('selectedItems',selectedItems)

    if (
      //about != '' &&
      selected_myfatherOcc != '' &&
      selected_originallyFrom != '' &&
      living != '' &&
      motherOccupation != '' &&
      motherName != '' &&
      motherPlace != '' &&
      selectedfamilyStatus != '' &&
      selected_familyValue != '' &&
      selectedSibling != undefined &&
      selectedItems != '' &&
      selectedSister != undefined &&
      stateRelations != '' &&
      pocNumber != '' &&
      email != '' &&
      pocName != '' &&
      AlternatepocNumber != '' &&
      this.validateEmailId() &&
      this.validatePhoneNumber() &&
      this.validateerror_AlternatepocNumber()
      // &&   selectedfamilyType!=''
    ) {
      this.setState({
        defaultAnimationDialog: true,
      });
      this.family();
      this.fun_validation();
    } else {

      this.fun_validation();
    }

    // if(selectedSister>0){
    //   if(selectedmarriedSis!=''){
    //     this.setState({ error_marriedSis: false  })
    //   }else{
    //     // alert('Please fill all required fields');
    //     this.setState({ error_marriedSis: true  })
    //   }
    // }

    // if(selectedSibling>0){
    //   if(selectedmarriedBro!=''){
    //     this.setState({ error_marriedBro: false  })
    //   }else{
    //     // alert('Please fill all required fields');
    //     this.setState({ error_marriedBro: true  })
    //   }
    // }
  };

  validatePhoneNumber = () => {
    var regexp = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return regexp.test(this.state.pocNumber);
  };

  validateerror_AlternatepocNumber = () => {
    var regexp = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return regexp.test(this.state.AlternatepocNumber);
  };

  validateEmailId = () => {
    var regexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regexp.test(this.state.email);
  };

  fun_validation() {
    const {
      selectedItems,
      about,
      selected_originallyFrom,
      living,
      motherOccupation,
      motherName,
      motherPlace,
      selectedfamilyStatus,
      selected_familyValue,
      selectedSibling,
      selectedSister,
      selectedmarriedBro,
      selectedmarriedSis,
      stateRelations,
      pocName,
      pocNumber,
      email,
      selected_myfatherOcc,
      AlternatepocNumber,
    } = this.state;

    if (about == '' || about == null) {
      this.setState({ error_about: true });
    } else {
      this.setState({ error_about: false });
    }
    if (selected_myfatherOcc == '' || selected_myfatherOcc == null) {
      this.setState({ error_fatherocc: true });
    } else {
      this.setState({ error_fatherocc: false });
    }
    if (selected_originallyFrom == '' || selected_originallyFrom == null) {
      this.setState({ error_family: true });
    } else {
      this.setState({ error_family: false });
    }
    if (living == '' || living == null) {
      this.setState({ error_living: true });
    } else {
      this.setState({ error_living: false });
    }
    if (motherOccupation == '' || motherOccupation == null) {
      this.setState({ error_motherocc: true });
    } else {
      this.setState({ error_motherocc: false });
    }
    if (motherName == '' || motherName == null) {
      this.setState({ error_mothername: true });
    } else {
      this.setState({ error_mothername: false });
    }
    if (motherPlace == '' || motherPlace == null) {
      this.setState({ error_motherorignally: true });
    } else {
      this.setState({ error_motherorignally: false });
    }
    if (selectedfamilyStatus == '' || selectedfamilyStatus == null) {
      this.setState({ error_fstatus: true });
    } else {
      this.setState({ error_fstatus: false });
    }
    if (selected_familyValue == '' || selected_familyValue == null) {
      this.setState({ error_familyValue: true });
    } else {
      this.setState({ error_familyValue: false });
    }
    if (selectedSibling == undefined) {
      this.setState({ error_sibling: true });
    } else {
      this.setState({ error_sibling: false });
    }

    if (selectedSibling > 0) {
      if (selectedmarriedBro == '' || selectedmarriedBro == null) {
        this.setState({ error_marriedBro: false });
      } else {
        this.setState({ error_marriedBro: true });
      }
    }

    if (selectedSister > 0) {
      if (selectedmarriedSis == '' || selectedmarriedSis == null) {
        this.setState({ error_marriedSis: false });
      } else {
        this.setState({ error_marriedSis: true });
      }
    }

    if (selectedSister == undefined) {
      this.setState({ error_sister: true });
    } else {
      this.setState({ error_sister: false });
    }
    if (selectedItems == '' || selectedItems == null) {
      this.setState({ error_caste: true });
    } else {
      this.setState({ error_caste: false });
    }
    if (stateRelations == '' || stateRelations == null) {
      this.setState({ error_thikana: true });
    } else {
      this.setState({ error_thikana: false });
    }
    if (pocName == '' || pocName == null) {
      this.setState({ error_name: true });
    } else {
      this.setState({ error_name: false });
    }
    if (pocNumber == '' || pocNumber == null) {
      this.setState({ error_number: true });
    } else {
      this.setState({ error_number: false });
      if (this.validatePhoneNumber()) {
        this.setState({ error_validNum: false });
      } else {
        this.setState({ error_validNum: true });
      }
    }

    if (AlternatepocNumber == '' || AlternatepocNumber == null) {
      this.setState({ error_Altnumber: true });
    } else {
      this.setState({ error_Altnumber: false });
      if (this.validateerror_AlternatepocNumber()) {
        this.setState({ error_AlternatepocNumber: false });
      } else {
        this.setState({ error_AlternatepocNumber: true });
      }
    }

    if (email != '') {
      this.setState({ error_email: false });
      if (this.validateEmailId()) {
        this.setState({ error_validEmail: false });
      } else {
        this.setState({ error_validEmail: true });
      }
    } else {
      this.setState({ error_email: true });
    }

    // if (nominee == '' || nominee == null ) {
    //   this.setState({ error_nominee: true })
    // } else {
    //   this.setState({ error_nominee: false })
    // }
  }

  onSelectedItemsChange = (selectedItems) => {
    this.setState({ selectedItems });
    // console.log('selected',this.multiSelect.getSelectedItemsExt(selectedItems))
  };

  defaultScrollViewProps = {
    keyboardShouldPersistTaps: 'handled',
    contentContainerStyle: {},
  };

  async family() {
    let idToken = await AsyncStorage.getItem('idToken', idToken);
    //  console.log('profile', idToken);
    const {
      about,
      selected_originallyFrom,
      selected_myfatherOcc,
      motherOccupation,
      motherName,
      motherPlace,
      selectedfamilyStatus,
      selectedfamilyType,
      pocName,
      pocNumber,
      email,
      nominee,
      living,
      selectedSibling,
      selectedmarriedBro,
      selectedSister,
      selectedmarriedSis,
      selectedItems,
      stateRelations,
      selected_familyValue,
      AlternatepocNumber,
    } = this.state;
    let params = {
      profile: {
        family: {
          about: about,
          originallyFromState: selected_originallyFrom,
          currentPlace: living,
          fatherOccupation: selected_myfatherOcc,
          motherOccupation: motherOccupation,
          motherSurname: motherName,
          motherOriginallyFrom: motherPlace,
          familyStatus: selectedfamilyStatus,
          familyValues: selected_familyValue,
          brothers: selectedSibling,
          marriedBrothers: selectedmarriedBro,
          sisters: selectedSister,
          marriedSisters: selectedmarriedSis,
          casteRelations: selectedItems,
          familyType: selectedfamilyType,
          stateRelations: stateRelations,
          pocName: pocName,
          pocNumber: pocNumber,
          email: email,
          altNumber: AlternatepocNumber,
        },
      },
    };

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
        if (responseJson.career != undefined) {
          console.log('send family:', responseJson.family);
          this.setState({ family: responseJson.family });
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
        console.error('family: something went wrong...', error);
      });
  }

  async profileData() {
    let idToken = await AsyncStorage.getItem('idToken', idToken);
    //  console.log('profileData', idToken);
    fetch(URL + 'profile/config', {
      method: 'GET',
      headers: {
        Authorization: await myToken(),
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.code == 'not-found') {
          console.log('family drop-down data=>', responseJson.msg);
        } else {
          let familyStatusData = responseJson.family.familyStatus.options;
          let myfatherOcc = responseJson.family.fatherOccupation.options;
          let originallyFrom =
            responseJson.family.originallyFromState.IN.options;
          let familyValue = responseJson.family.familyValues.options;
          let brothers = responseJson.family.brothers.options;
          let marriedBro = responseJson.family.marriedBrothers.options;
          let Sister = responseJson.family.sisters.options;
          let marriedSis = responseJson.family.marriedSisters.options;
          let casteRelationsData = responseJson.family.casteRelations.options;

          let temp = [];
          for (let i = 0; i < casteRelationsData.length; i++) {
            let obj = {
              label: casteRelationsData[i].label,
              value: casteRelationsData[i].value,
            };
            temp.push(obj);
          }

          //  console.log('temp',temp)

          this.setState({
            familyStatus: familyStatusData,
            myfatherOcc: myfatherOcc,
            myoriginallyFrom: originallyFrom,
            familyValue: familyValue,
            brothers: brothers,
            marriedBro: marriedBro,
            Sister: Sister,
            marriedSis: marriedSis,
            casteRelations: casteRelationsData,
            caste: temp,
          });
          // console.log('familyStatus:', this.state.familyType);
          console.log(
            this.state.caste,
            'THIS IS CASTISM. WE ARE TOTALLY AGAINST IT',
          );
        }
      })
      .catch((error) => {
        console.error('familyData something went wrong...', error);
        this.setState({ loading: false });
      });
  }

  async getProfile() {
    let idToken = await AsyncStorage.getItem('idToken', idToken);
    // console.log(idToken)
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
          if (responseJson.family.about == undefined) {
            console.log('family data not found');
            this.setState({ loading: false });
          } else {
            let familyData = responseJson.family;
            let m = familyData.marriedSisters;
            let mrgS = [];
            for (let i = 0; i <= m; i++) {
              let temp = this.state.marriedSis;
              let b = temp[i];
              mrgS.push(b);
            }
            this.setState({ m_sister: mrgS });

            this.setState({
              family: familyData,
              about: familyData.about,
              selected_myfatherOcc: familyData.fatherOccupation,
              selected_originallyFrom: familyData.originallyFromState,
              motherOccupation: familyData.motherOccupation,
              motherName: familyData.motherSurname,
              motherPlace: familyData.motherOriginallyFrom,
              selectedfamilyStatus: familyData.familyStatus,
              selectedfamilyType: familyData.familyType,
              stateRelations: familyData.stateRelations,
              selected_familyValue: familyData.familyValues,
              selectedSibling: familyData.brothers,
              selectedmarriedBro: familyData.marriedBrothers,
              selectedItems: familyData.casteRelations,
              pocName: familyData.pocName,
              selectedSister: familyData.sisters,
              selectedmarriedSis: familyData.marriedSisters,
              pocNumber: familyData.pocNumber,
              email: familyData.email,
              nominee: familyData.nominee,
              living: familyData.currentPlace,
              AlternatepocNumber: familyData.altNumber,
              loading: false,
            });
            console.log(
              'THIS IS CASTIESM THIS IS TOTAL CASTIESM',
              familyData.motherSurname,
            );
          }
        }
        // console.log('responseJson personal', responseJson.personal);
      })
      .catch((error) => {
        console.error('something went wrong...', error);
      });
  }

  componentDidMount() {
    this.profileData();
    this.getProfile();
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
      selectedItems


      ,
      about,
      fatherOccupation,
      originallyFrom,
      living,
      motherOccupation,
      motherName,
      motherPlace,
      selectedfamilyStatus,
      selectedfamilyType,
      selectedSibling,
      selectedSister,
      selectedmarriedBro,
      selectedmarriedSis,
      stateRelations,
      pocName,
      pocNumber,
      email,
      nominee,
      AlternatepocNumber,
      marriedBro,
      casteRelations,
      selected_myfatherOcc,
      myfatherOcc,
      selected_originallyFrom,
      myoriginallyFrom,
      selected_familyValue,
      familyValue,
      sibling,
      brothers,
      Sister,
      marriedSis,
    } = this.state;

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
              title="Note"
              hasTitleBar={false}
              align="center">
              {/* <Text style={[styles.title,{color:'red'}]}>Note</Text> */}
            </DialogTitle>
          }
          footer={
            <View>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: '50%' }}>
                  <TouchableOpacity
                    style={styles.bgbtn}
                    onPress={() => {
                      this.setState({ defaultAnimationDialog: false });
                      this.props.navigation.navigate('Signup');
                    }}>
                    <Text style={[styles.title, { color: '#fff' }]}>Proceed</Text>
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
            <Text style={[styles.subtitle, { textAlign: 'center' }]}>
              "Congratulations on registering your profile , your profile will
              be live in 24 hours post verification."
            </Text>
          </DialogContent>
        </Dialog>

        <ScrollView>
          <View style={{ marginTop: 20, flex: 1 }}>
            {/* <Text style={styles.title}>  Family Details</Text> */}
            <ProgressSteps {...progressStepsStyle}>
              <ProgressStep
                label="Details"
                onNext={this.onPaymentStepComplete}
                onPrevious={this.onPrevStep}
                scrollViewProps={this.defaultScrollViewProps}
                nextBtnTextStyle={buttonTextStyle}
                previousBtnTextStyle={buttonTextStyle}
                nextBtnStyle={buttonStyle}>
                <View style={styles.content}>
                  <View>
                    <Text style={styles.title}>Write About Family</Text>
                    <View style={styles.textAreaContainer}>
                      <Textarea
                        rowSpan={5}
                        style={styles.input}
                        placeholder="Write Here"
                        placeholderTextColor={'rgba(32, 32, 32, 0.6)'}
                        value={about}
                        onChangeText={(about) => this.setState({ about })}
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="default"
                        returnKeyType="next"
                        maxLength={150}
                      />
                    </View>

                    {/* {this.state.error_about ? (
                      <Text style={styles.inputtxt}>
                        This filed is mandatory
                      </Text>
                    ) : null} */}
                  </View>

                  <View>
                    <Text style={styles.title}>Father's Occupation{<Text style={styles.red}>*</Text>}</Text>
                    <View style={styles.pickersty}>
                      <RNPickerSelect
                        placeholder={{
                          label: 'Choose',
                          value: null,
                        }}
                        items={myfatherOcc}
                        onValueChange={(value) => {
                          this.setState({ selected_myfatherOcc: value });
                        }}
                        useNativeAndroidPickerStyle={false}
                        style={pickerStyle}
                        value={selected_myfatherOcc}
                      />
                    </View>
                    {this.state.error_fatherocc ? (
                      <Text style={styles.inputtxt}>
                        This filed is mandatory
                      </Text>
                    ) : null}
                  </View>

                  <View>
                    <Text style={styles.title}>Family Originally From{<Text style={styles.red}>*</Text>}</Text>
                    <View style={styles.pickersty}>
                      <RNPickerSelect
                        placeholder={{
                          label: 'Choose',
                          value: null,
                        }}
                        items={myoriginallyFrom}
                        onValueChange={(value) => {
                          this.setState({ selected_originallyFrom: value });
                        }}
                        useNativeAndroidPickerStyle={false}
                        style={pickerStyle}
                        value={selected_originallyFrom}
                      />
                    </View>
                    {this.state.error_family ? (
                      <Text style={styles.inputtxt}>
                        This filed is mandatory
                      </Text>
                    ) : null}
                  </View>

                  <View>
                    <Text style={styles.title}>Currently Living In{<Text style={styles.red}>*</Text>}</Text>
                    <View style={styles.inputcontainer}>
                      <TextInput
                        style={styles.input}
                        placeholderTextColor="rgba(32, 32, 32, 0.6)"
                        placeholder="Enter State, City, Thikana"
                        value={living}
                        onChangeText={(living) => this.setState({ living })}
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="default"
                        returnKeyType="next"
                      />
                    </View>
                    {this.state.error_living ? (
                      <Text style={styles.inputtxt}>
                        This filed is mandatory
                      </Text>
                    ) : null}
                  </View>

                  <View>
                    <Text style={styles.title}>Mother's Occupation</Text>
                    <View style={styles.inputcontainer}>
                      <TextInput
                        style={styles.input}
                        placeholder="Enter Here"
                        placeholderTextColor="rgba(32, 32, 32, 0.6)"
                        value={motherOccupation}
                        onChangeText={(motherOccupation) =>
                          this.setState({ motherOccupation })
                        }
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="default"
                        returnKeyType="next"
                      />
                    </View>
                    {/* {this.state.error_motherocc ? (
                      <Text style={styles.inputtxt}>
                        This filed is mandatory
                      </Text>
                    ) : null} */}
                  </View>

                  <View>
                    <Text style={styles.title}>Mother's Surname{<Text style={styles.red}>*</Text>}</Text>

                    <View style={styles.pickersty}>
                      <RNPickerSelect
                        placeholder={{
                          label: 'Choose',
                          value: null,
                        }}
                        items={casteRelations}
                        onValueChange={(value) => {
                          this.setState({ motherName: value });
                        }}
                        useNativeAndroidPickerStyle={false}
                        style={pickerStyle}
                        value={motherName}
                      />
                    </View>
                  </View>
                  {this.state.error_mothername ? (
                    <Text style={styles.inputtxt}>This filed is mandatory</Text>
                  ) : null}

                  <View>
                    <Text style={styles.title}>Mother's Originally From{<Text style={styles.red}>*</Text>}</Text>
                    <View style={styles.inputcontainer}>
                      <TextInput
                        style={styles.input}
                        placeholderTextColor="rgba(32, 32, 32, 0.6)"
                        placeholder="Enter State, City, Thikana"
                        value={motherPlace}
                        onChangeText={(motherPlace) =>
                          this.setState({ motherPlace })
                        }
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="default"
                        returnKeyType="next"
                      />
                    </View>
                    {this.state.error_motherorignally ? (
                      <Text style={styles.inputtxt}>
                        This filed is mandatory
                      </Text>
                    ) : null}
                  </View>
                </View>
              </ProgressStep>

              <ProgressStep
                label="Status"
                onNext={this.onNextStep}
                onPrevious={this.onPrevStep}
                scrollViewProps={this.defaultScrollViewProps}
                nextBtnTextStyle={buttonTextStyle}
                previousBtnTextStyle={buttonTextStyle}
                nextBtnStyle={buttonStyle}
                previousBtnStyle={buttonStyle}>
                <View style={styles.content}>
                  <View>
                    <Text style={styles.title}>Family Status{<Text style={styles.red}>*</Text>}</Text>
                    <View style={styles.pickersty}>
                      <RNPickerSelect
                        placeholder={{
                          label: 'Choose',
                          value: null,
                        }}
                        items={this.state.familyStatus}
                        onValueChange={(value) => {
                          this.setState({ selectedfamilyStatus: value });
                        }}
                        useNativeAndroidPickerStyle={false}
                        style={pickerStyle}
                        value={selectedfamilyStatus}
                      />
                    </View>
                    {this.state.error_fstatus ? (
                      <Text style={styles.inputtxt}>
                        This filed is mandatory
                      </Text>
                    ) : null}
                  </View>

                  <View>
                    <Text style={styles.title}>Family Value{<Text style={styles.red}>*</Text>}</Text>
                    <View style={styles.pickersty}>
                      <RNPickerSelect
                        placeholder={{
                          label: 'Choose',
                          value: null,
                        }}
                        items={familyValue}
                        onValueChange={(value) => {
                          this.setState({ selected_familyValue: value });
                        }}
                        useNativeAndroidPickerStyle={false}
                        style={pickerStyle}
                        value={selected_familyValue}
                      />
                    </View>
                    {this.state.error_familyValue ? (
                      <Text style={styles.inputtxt}>
                        This filed is mandatory
                      </Text>
                    ) : null}
                  </View>

                  <View>
                    <Text style={styles.title}>Brother(s){<Text style={styles.red}>*</Text>}</Text>
                    <View style={styles.pickersty}>
                      <RNPickerSelect
                        placeholder={{
                          label: 'Choose',
                          value: null,
                        }}
                        items={brothers}
                        onValueChange={(value) => {
                          let mrgbro = marriedBro;
                          let tempmrgbro = [];
                          for (let i = 0; i <= value; i++) {
                            let b = mrgbro[i];
                            tempmrgbro.push(b);
                          }
                          this.setState({
                            selectedSibling: value,
                            m_brother: tempmrgbro,
                          });
                        }}
                        useNativeAndroidPickerStyle={false}
                        style={pickerStyle}
                        value={selectedSibling}
                      />
                    </View>
                    {this.state.error_sibling ? (
                      <Text style={styles.inputtxt}>
                        This filed is mandatory
                      </Text>
                    ) : null}
                  </View>

                  <View>
                    {selectedSibling > 0 && (
                      <View>
                        <Text style={styles.title}>
                          {this.state.selectedSibling} Brother(s) of which
                          married{<Text style={styles.red}>*</Text>}
                        </Text>
                        <View style={styles.pickersty}>
                          <RNPickerSelect
                            placeholder={{
                              label: 'Choose',
                              value: null,
                            }}
                            onValueChange={(value) => {
                              this.setState({ selectedmarriedBro: value });
                            }}
                            items={this.state.m_brother}
                            useNativeAndroidPickerStyle={false}
                            value={selectedmarriedBro}
                            style={pickerStyle}
                          />
                        </View>
                        {this.state.error_marriedBro ? (
                          <Text style={styles.inputtxt}>
                            This filed is mandatory
                          </Text>
                        ) : null}
                      </View>
                    )}
                  </View>

                  <View>
                    <Text style={styles.title}>Sister(s){<Text style={styles.red}>*</Text>}</Text>
                    <View style={styles.pickersty}>
                      <RNPickerSelect
                        placeholder={{
                          label: 'Choose',
                          value: null,
                        }}
                        items={Sister}
                        onValueChange={(value) => {
                          let mrgsis = marriedSis;
                          let tempmrgsis = [];
                          for (let i = 0; i <= value; i++) {
                            let b = mrgsis[i];
                            tempmrgsis.push(b);
                            console.log(
                              'value',
                              value,
                              'b',
                              b,
                              'tempmrgsis',
                              tempmrgsis,
                            );
                          }
                          this.setState({
                            selectedSister: value,
                            m_sister: tempmrgsis,
                          });
                        }}
                        useNativeAndroidPickerStyle={false}
                        style={pickerStyle}
                        value={selectedSister}
                      />
                    </View>

                    {this.state.error_sister ? (
                      <Text style={styles.inputtxt}>
                        This filed is mandatory
                      </Text>
                    ) : null}
                  </View>

                  <View>
                    {selectedSister > 0 && (
                      <View>
                        <Text style={styles.title}>
                          {this.state.selectedSister} Sister(s) of which married{<Text style={styles.red}>*</Text>}
                        </Text>
                        <View style={styles.pickersty}>
                          <RNPickerSelect
                            placeholder={{
                              label: 'Choose',
                              value: null,
                            }}
                            onValueChange={(value) => {
                              this.setState({ selectedmarriedSis: value });
                            }}
                            items={this.state.m_sister}
                            useNativeAndroidPickerStyle={false}
                            value={selectedmarriedSis}
                            style={pickerStyle}
                          />
                        </View>
                        {this.state.error_marriedSis ? (
                          <Text style={styles.inputtxt}>
                            This filed is mandatory
                          </Text>
                        ) : null}
                      </View>
                    )}
                  </View>

                  <View>
                    <Text style={styles.title}>Relations In Caste</Text>
                    <View>
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({ visible: true });
                        }}>
                        <View style={[styles.pickerstyle]}>
                          {selectedItems.length === 3 ? <Text>{selectedItems[2].label} and {selectedItems.length - 1} more</Text> : <Text>Choose </Text>}

                        </View>

                        <MaterialDialog
                          title="Select the Relations in Caste"
                          visible={this.state.visible}
                          // onOk={() => this.setState({ visible: false })}
                          onCancel={() => this.setState({ visible: false })}>
                          <SelectMultiple
                            items={this.state.caste}
                            selectedItems={selectedItems}
                            onSelectionsChange={this.onSelectedItemsChange} />
                          {/* <MultiSelect
                            hideTags={true}
                            fixedHeight={true}
                            items={this.state.caste}
                            uniqueKey="id"
                            ref={(component) => {
                              this.multiSelect = component;
                            }}
                            onSelectedItemsChange={this.onSelectedItemsChange}
                            selectedItems={selectedItems}
                            searchInputPlaceholderText="Search here..."
                            onChangeInput={(text) => console.log(text)}
                            altFontFamily={fontfamily.roboto}
                            tagRemoveIconColor={colors.primary}
                            tagBorderColor={colors.primary}
                            tagTextColor="#000"
                            selectedItemTextColor={colors.primary}
                            selectedItemIconColor={colors.primary}
                            itemTextColor="#000000"
                            displayKey="name"
                            searchInputStyle={{ color: '#CCC' }}
                            submitButtonColor={colors.primary}
                            submitButtonText="Submit"
                            styleSelectorContainer={{
                              backgroundColor: '	#808080',
                            }}
                            styleDropdownMenuSubsection={{
                              backgroundColor: '#F0F0F0',
                              paddingLeft: 17,
                            }}
                          /> */}
                        </MaterialDialog>
                      </TouchableOpacity>
                      {/* <View>
                        {this.multiSelect &&
                          this.multiSelect.getSelectedItemsExt(selectedItems)}
                      </View> */}
                      {/* <MultiSelect
                        hideTags
                        items={this.state.caste}
                        uniqueKey="id"
                        ref={(component) => {
                          this.multiSelect = component;
                        }}
                        onSelectedItemsChange={this.onSelectedItemsChange}
                        selectedItems={selectedItems}
                        selectText="Pick Items"
                        searchInputPlaceholderText="Search Items..."
                        onChangeInput={(text) => console.log(text)}
                        altFontFamily="ProximaNova-Light"
                        tagRemoveIconColor="#CCC"
                        tagBorderColor="#CCC"
                        tagTextColor="#CCC"
                        selectedItemTextColor="#CCC"
                        selectedItemIconColor="#CCC"
                        itemTextColor="#000"
                        displayKey="name"
                        searchInputStyle={{color: '#CCC'}}
                        submitButtonColor="#CCC"
                        submitButtonText="Submit"
                      /> */}

                      {/* <MultiSelect
                        hideTags={true}
                        items={casteRelations}
                        uniqueKey="id"
                        ref={(component) => {
                          this.multiSelect = component;
                        }}
                        onSelectedItemsChange={this.onSelectedItemsChange}
                        selectedItems={selectedItems}
                        selectText="Choose"
                        searchInputPlaceholderText="Search here..."
                        onChangeInput={(text) => console.log(text)}
                        altFontFamily={fontfamily.roboto}
                        tagRemoveIconColor={colors.primary}
                        tagBorderColor={colors.primary}
                        tagTextColor="#000"
                        selectedItemTextColor={colors.primary}
                        selectedItemIconColor={colors.primary}
                        itemTextColor="#000"
                        displayKey="name"
                        searchInputStyle={{color: '#CCC'}}
                        submitButtonColor={colors.primary}
                        submitButtonText="Submit"
                        styleSelectorContainer={{backgroundColor: '#F0F0F0'}}
                        styleDropdownMenuSubsection={{
                          backgroundColor: '#F0F0F0',
                          paddingLeft: 17,
                        }}
                      /> */}
                    </View>
                    {/* {this.state.error_caste ? (
                      <Text style={styles.inputtxt}>
                        This filed is mandatory
                      </Text>
                    ) : null} */}
                  </View>

                  <View>
                    <Text style={styles.title}>Relation In State/Thikana </Text>
                    <View style={styles.inputcontainer}>
                      <TextInput
                        style={styles.input}
                        placeholderTextColor="rgba(32, 32, 32, 0.6)"
                        placeholder="Enter Here"
                        value={stateRelations}
                        onChangeText={(stateRelations) =>
                          this.setState({ stateRelations })
                        }
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="default"
                        returnKeyType="next"
                      />
                    </View>
                    {/* {this.state.error_thikana ? (
                      <Text style={styles.inputtxt}>
                        This filed is mandatory
                      </Text>
                    ) : null} */}
                  </View>
                </View>
              </ProgressStep>

              <ProgressStep
                label="Contact Info"
                onNext={this.onNextStep}
                onPrevious={this.onPrevStep}
                onSubmit={this.onSubmitSteps}
                scrollViewProps={this.defaultScrollViewProps}
                nextBtnStyle={buttonStyle}
                nextBtnTextStyle={buttonTextStyle}
                previousBtnTextStyle={buttonTextStyle}
                previousBtnStyle={buttonStyle}>
                <View style={styles.content}>
                  <View>
                    <Text style={styles.title}>Name of Contact Person{<Text style={styles.red}>*</Text>}</Text>
                    <View style={styles.inputcontainer}>
                      <TextInput
                        style={styles.input}
                        placeholderTextColor="rgba(32, 32, 32, 0.6)"
                        placeholder="Enter Here"
                        value={pocName}
                        onChangeText={(pocName) => this.setState({ pocName })}
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="default"
                        returnKeyType="next"
                        onSubmitEditing={() => {
                          this.secondTextInput.focus();
                        }}
                      />
                    </View>
                    {this.state.error_name ? (
                      <Text style={styles.inputtxt}>
                        This filed is mandatory
                      </Text>
                    ) : null}
                  </View>

                  <View>
                    <Text style={styles.title}>Contact Number{<Text style={styles.red}>*</Text>}</Text>
                    <View style={{ flexDirection: 'row' }}>
                      <View style={styles.inputbox}>
                        <Text
                          style={[
                            styles.input,
                            { color: 'rgba(32, 32, 32, 0.6)' },
                          ]}
                          adjustsFontSizeToFit
                          numberOfLines={1}>
                          IN +91
                        </Text>
                      </View>
                      <View style={styles.border} />
                      <View style={[styles.inputcontainer, { width: '80%' }]}>
                        <TextInput
                          style={styles.input}
                          placeholderTextColor="rgba(32, 32, 32, 0.6)"
                          placeholder="Enter Here"
                          value={pocNumber}
                          onChangeText={(pocNumber) =>
                            this.setState({ pocNumber })
                          }
                          autoCapitalize="none"
                          autoCorrect={false}
                          keyboardType="phone-pad"
                          returnKeyType="next"
                          maxLength={10}
                          ref={(input) => {
                            this.secondTextInput = input;
                          }}
                          onSubmitEditing={() => {
                            this.thirdTextInput.focus();
                          }}
                        />
                      </View>
                    </View>
                    {this.state.error_number ? (
                      <Text style={styles.inputtxt}>
                        This filed is mandatory
                      </Text>
                    ) : null}
                    {this.state.error_validNum ? (
                      <Text style={styles.inputtxt}>
                        Please fill valid mobile number
                      </Text>
                    ) : null}
                  </View>

                  <View>
                    <Text style={styles.title}>Alternate Mobile Number{<Text style={styles.red}>*</Text>}</Text>
                    <View style={{ flexDirection: 'row' }}>
                      <View style={styles.inputbox}>
                        <Text
                          style={[
                            styles.input,
                            { color: 'rgba(32, 32, 32, 0.6)' },
                          ]}
                          adjustsFontSizeToFit
                          numberOfLines={1}>
                          IN +91
                        </Text>
                      </View>
                      <View style={styles.border} />
                      <View style={[styles.inputcontainer, { width: '80%' }]}>
                        <TextInput
                          style={styles.input}
                          placeholderTextColor="rgba(32, 32, 32, 0.6)"
                          placeholder="Enter Here"
                          value={AlternatepocNumber}
                          onChangeText={(AlternatepocNumber) =>
                            this.setState({ AlternatepocNumber })
                          }
                          autoCapitalize="none"
                          autoCorrect={false}
                          keyboardType="phone-pad"
                          returnKeyType="next"
                          maxLength={10}
                          ref={(input) => {
                            this.thirdTextInput = input;
                          }}
                          onSubmitEditing={() => {
                            this.fourthTextInput.focus();
                          }}
                        />
                      </View>
                    </View>
                    {this.state.error_Altnumber ? (
                      <Text style={styles.inputtxt}>
                        This filed is mandatory
                      </Text>
                    ) : null}
                    {this.state.error_AlternatepocNumber ? (
                      <Text style={styles.inputtxt}>
                        Please fill valid mobile number
                      </Text>
                    ) : null}
                  </View>

                  <View>
                    <Text style={styles.title}>E-Mail Id{<Text style={styles.red}>*</Text>}</Text>
                    <View style={styles.inputcontainer}>
                      <TextInput
                        style={styles.input}
                        placeholderTextColor="rgba(32, 32, 32, 0.6)"
                        placeholder="Enter Here"
                        value={email}
                        onChangeText={(email) => this.setState({ email })}
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="default"
                        returnKeyType="next"
                        ref={(input) => {
                          this.fourthTextInput = input;
                        }}
                      // onSubmitEditing={() => { this.fiveTextInput.focus(); }}
                      />
                    </View>
                    {this.state.error_email ? (
                      <Text style={styles.inputtxt}>
                        This filed is mandatory
                      </Text>
                    ) : null}
                    {this.state.error_validEmail ? (
                      <Text style={styles.inputtxt}>
                        Please fill valid email address
                      </Text>
                    ) : null}
                  </View>

                  {/* <View>
                    <View style={{flexDirection:'row'}}>
                    <Text style={styles.title}>Add Profile Viewer </Text>
                    <Text style={{fontsize:10,fontFamily:fontfamily.light,marginTop:3
                    }}>(Please provide 10 digit contact detail)</Text>
                    </View>
                    <View style={styles.inputcontainer}>
                      <TextInput
                        style={styles.input}
                        placeholderTextColor='rgba(32, 32, 32, 0.6)'
                        placeholder='Enter Here'
                        value={nominee}
                        onChangeText={(nominee) => this.setState({ nominee })}
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType='phone-pad'
                        returnKeyType="go" 
                        ref={(input) => { this.fiveTextInput = input; }}  />
                    </View>
                    { this.state.error_nominee ?
                <Text style={styles.inputtxt}>This filed is mandatory</Text>
                  : null } 
                  </View>
                */}
                </View>
              </ProgressStep>
            </ProgressSteps>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const pickerStyle = {
  inputIOS: {
    color: '#000',
    fontSize: fontsize.subtitle,
    fontFamily: fontfamily.roboto,
  },
  inputAndroid: {
    color: '#000',
    fontSize: fontsize.subtitle,
    fontFamily: fontfamily.roboto,
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

const items = [
  {
    id: 'Ondo',
    name: 'Ondo',
  },
  {
    id: 'Ogun',
    name: 'Ogun',
  },
  {
    id: 'Calabar',
    name: 'Calabar',
  },
  {
    id: 'Lagos',
    name: 'Lagos',
  },
  {
    id: 'Maiduguri',
    name: 'Maiduguri',
  },
  {
    id: 'Anambra',
    name: 'Anambra',
  },
  {
    id: 'Benue',
    name: 'Benue',
  },
  {
    id: 'Kaduna',
    name: 'Kaduna',
  },
  {
    id: 'Abuja',
    name: 'Abuja',
  },
];
