import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  AsyncStorage,
  ActivityIndicator, Alert
} from 'react-native';

import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import RNPickerSelect from 'react-native-picker-select';
import { fontfamily, fontsize, colors } from '../globalstyles/Style';
import styles from './Style';
import Toast from 'react-native-simple-toast';
// import AsyncStorage from '@react-native-community/async-storage';
import { URL } from '../constant/Constant';
import { myToken } from '../token/Token';

export default class Career extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favColor: undefined,
      loading: true,
      qualification: [],
      items: [],
      employee: [],
      country: [],
      visa: [],
      states: [],
      city: [],
      selectedCity: '',
      selectedStates: '',
      selectedStatesoutside: '',
      selectedCityoutside: '',
      selectedCountry: '',
      occupation: [],
      selectedOccupation: '',
      selectedEmployee: '',
      university: '',
      selectedQualification: '',
      company: '',
      selectedmyincome: '',
      myincome: [],
      income: '',
      selectedVisa: '',
      stateDatajson: [],
      cityDatajson: [],
      occupationdata: [],
      career: [],
      ugdegree: [],
      selectedugdegree: '',
      error_ugcollege: false,
      error_ugdegree: false,
      pg: false,
      ugcollege: '',
      error_qualification: false,
      error_employee: false,
      error_college: false,
      error_occupation: false,
      error_company: false,
      error_annual: false,
      error_country: false,
      error_state: false,
      error_visa: false,
      error_city: false,
    };
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
          console.log('career drop-down data=>', responseJson.msg);
        } else {
          let qualificationData = responseJson.career.qualification.options;
          let occupationdata = responseJson.career.occupation;
          let sectorData = responseJson.career.sector.options;
          let ugDegree = responseJson.career.ugDegree.options;
          let countryData = responseJson.career.country.options;
          let income = responseJson.career.income.options;
          let visa = responseJson.career.visaType.options;
          let cityDatajson = responseJson.career.city.IN;
          let stateDatajson = responseJson.career.state.IN.options;
          this.setState({
            qualification: qualificationData,
            employee: sectorData,
            country: countryData,
            visa: visa,
            occupationdata: occupationdata,
            ugdegree: ugDegree,
            myincome: income,
            cityDatajson: cityDatajson,
            stateDatajson: stateDatajson,
            selectedCountry: countryData[0].value,
          });
          //  console.log('cityDatajson:', this.state.cityDatajson);
          console.log('country:', countryData[0].value);
        }
      })
      .catch((error) => {
        console.error('careerData something went wrong...', error);
      });
  }

  async career() {
    const {
      selectedQualification,
      university,
      selectedEmployee,
      selectedOccupation,
      company,
      income,
      selectedCountry,
      selectedStates,
      selectedCity,
      ugcollege,
      selectedugdegree,
      selectedmyincome,
      selectedVisa,
      selectedStatesoutside,
      selectedCityoutside,
    } = this.state;
    let params = {
      profile: {
        career: {
          qualification: selectedQualification,
          college: university,
          sector: selectedEmployee,
          ugDegree: selectedugdegree,
          ugCollege: ugcollege,
          occupation: selectedOccupation,
          company: company,
          income: selectedmyincome,
          country: selectedCountry,
          state: selectedStates || selectedStatesoutside,
          city: selectedCity || selectedCityoutside,
          visaType: selectedVisa,
        },
      },
    };

    console.log('params', params);

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
          console.log('send career:', responseJson.career);
          this.setState({ career: responseJson.career });
          Toast.show('Saved', Toast.SHORT);
        } else {
          console.log('responseJson.career', responseJson.career);
          alert('Please fill all required fields');
        }
      })
      .catch((error) => {
        console.error('career: something went wrong...', error);
      });
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
        // console.log('responseJson personal', responseJson.personal);
        if (responseJson.code == 'not-found') {
          console.log(responseJson.msg);
          this.setState({ loading: false });
        } else {
          if (responseJson.career.qualification == undefined) {
            console.log('career data not found');
            this.setState({ loading: false });
          } else {
            let careerData = responseJson.career;
            let city, occ;
            //  let qua = this.state.qualification
            //  let obj = qua.find(o=>o.value === careerData.qualification)
            //    console.log('obj',obj.isPostGraduate)

            if (careerData.country != 'IN') {
              this.setState({
                selectedCityoutside: careerData.city,
                selectedStatesoutside: careerData.state,
              });
            }

            if (careerData.country == 'IN') {
              // city = this.state.cityDatajson[careerData.state].options
              this.setState({
                selectedCity: careerData.city,
                selectedStates: careerData.state,
                // city:city
              });
            }

            // if(obj.isPostGraduate != undefined){
            //   this.setState({ pg : obj.isPostGraduate,loading:false,})
            // }

            this.setState({
              career: careerData,
              selectedQualification: careerData.qualification,
              university: careerData.college,
              selectedEmployee: careerData.sector,
              selectedOccupation: careerData.occupation,
              company: careerData.company,
              selectedmyincome: careerData.income,
              selectedCountry: careerData.country,
              selectedugdegree: careerData.ugDegree,
              ugcollege: careerData.ugCollege,
              selectedVisa: careerData.visaType,
              loading: false,
              // city:city,selectedStates: careerData.state,  selectedCity: careerData.city,occupation:occ,
            });
            console.log('get career', careerData, careerData.city);
          }
        }
      })
      .catch((error) => {
        console.error('something went wrong...', error);
        this.setState({ loading: false });
      });
  }

  onSubmitSteps = () => {
    const {
      selectedQualification,
      university,
      selectedEmployee,
      selectedOccupation,
      company,
      selectedmyincome,
      selectedCountry,
      selectedVisa,
      selectedStates,
      selectedCity,
      pg,
      selectedugdegree,
      ugcollege,
    } = this.state;

    if (
      //university != '' &&
      //company != '' &&
      selectedmyincome != '' &&
      selectedugdegree != '' &&
      selectedQualification != '' &&
      selectedEmployee != '' &&
      selectedOccupation != '' &&
      selectedCountry != '' &&
      selectedmyincome != ''

      && selectedStates != '' && selectedCity != ''
    ) {
      this.props.navigation.navigate('Family')
      this.career();
      this.fun_validate();
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
      this.fun_validate();
    }

    if (pg == true) {
      if (selectedugdegree != '' && ugcollege != '') {
        // this.career();
        this.fun_validate();
      } else {

        this.fun_validate();
      }
    }

    if (selectedCountry != 'IN') {
      if (
        selectedVisa != '' &&
        this.state.selectedStatesoutside != '' &&
        this.state.selectedCityoutside != ''
      ) {
        this.setState({
          error_visa: false,
          error_state1: false,
          error_city1: false,
        });
      } else {
        alert('Please fill all required fields');
        this.setState({
          error_visa: true,
          error_state1: true,
          error_city1: true,
        });
      }
    }
  };

  fun_validate() {
    const {
      selectedQualification,
      university,
      selectedEmployee,
      selectedOccupation,
      company,
      income,
      selectedCountry,
      selectedVisa,
      selectedStates,
      selectedCity,
      selectedugdegree,
      ugcollege,
      selectedmyincome,
    } = this.state;

    if (selectedQualification == '' || selectedQualification == null) {
      this.setState({ error_qualification: true });
    } else {
      this.setState({ error_qualification: false });
    }
    if (university == '' || university == null) {
      this.setState({ error_college: true });
    } else {
      this.setState({ error_college: false });
    }
    if (company == '' || company == null) {
      this.setState({ error_company: true });
    } else {
      this.setState({ error_company: false });
    }
    if (selectedmyincome == '' || selectedmyincome == null) {
      this.setState({ error_annual: true });
    } else {
      this.setState({ error_annual: false });
    }
    if (selectedEmployee == '' || selectedEmployee == null) {
      this.setState({ error_employee: true });
    } else {
      this.setState({ error_employee: false });
    }
    if (selectedOccupation == '' || selectedOccupation == null) {
      this.setState({ error_occupation: true });
    } else {
      this.setState({ error_occupation: false });
    }
    if (selectedCountry == '' || selectedCountry == null) {
      this.setState({ error_country: true });
    } else {
      this.setState({ error_country: false });
    }
    if (selectedCountry == 'IN') {
      if (selectedStates == '' || selectedStates == null) {
        this.setState({ error_state: true });
      } else {
        this.setState({ error_state: false });
      }
    }

    if (selectedCountry == 'IN') {
      if (selectedCity == '' || selectedCity == null) {
        this.setState({ error_city: true });
      } else {
        this.setState({ error_city: false });
      }
    }

    if (this.state.pg == true) {
      if (selectedugdegree == '' || selectedugdegree == null) {
        this.setState({ error_ugdegree: true });
      } else {
        this.setState({ error_ugdegree: false });
      }
      if (ugcollege == '' || ugcollege == null) {
        this.setState({ error_ugcollege: true });
      } else {
        this.setState({ error_ugcollege: false });
      }
    } else {
      return false;
    }

    if (selectedCountry != 'IN') {
      if (
        this.state.selectedCityoutside == '' &&
        this.state.selectedStatesoutside == '' &&
        selectedVisa == ''
      ) {
        this.setState({
          error_city1: true,
          error_state1: true,
          error_visa: true,
        });
      } else {
        this.setState({
          error_city1: false,
          error_state1: false,
          error_visa: false,
        });
      }
    }
  }

  componentDidMount() {
    this.profileData();
    this.getProfile();
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
      selectedQualification,
      university,
      selectedEmployee,
      selectedOccupation,
      company,
      income,
      selectedCountry,
      selectedVisa,
      selectedStates,
      selectedCity,
      selectedugdegree,
      ugcollege,
      selectedmyincome,
      selectedStatesoutside,
      selectedCityoutside,
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
        <ScrollView>
          <View style={{ marginTop: 20, flex: 1 }}>
            {/* <Text style={styles.title}> Career Details</Text> */}
            <ProgressSteps {...progressStepsStyle}>
              <ProgressStep
                label="Education"
                onNext={this.onNextStep}
                onPrevious={this.onPrevStep}
                nextBtnTextStyle={buttonTextStyle}
                previousBtnTextStyle={buttonTextStyle}
                nextBtnStyle={buttonStyle}>
                <View style={styles.content}>
                  <View>
                    <Text style={styles.title}>Highest Qualification{<Text style={styles.red}>*</Text>}</Text>
                    <View style={styles.pickersty}>
                      <RNPickerSelect
                        placeholder={{
                          label: 'Choose',
                          value: null,
                        }}
                        items={this.state.qualification}
                        onValueChange={(value) => {
                          if (value != null) {
                            let data = this.state.qualification[value];
                            this.setState({
                              selectedQualification: value,
                              pg: data.isPostGraduate,
                              selectedugdegree: '',
                            });
                            console.log('pg', data.isPostGraduate);
                          }
                        }}
                        useNativeAndroidPickerStyle={false}
                        style={pickerStyle}
                        value={selectedQualification}
                      />
                    </View>
                    {this.state.error_qualification ? (
                      <Text style={styles.inputtxt}>
                        This filed is mandatory
                      </Text>
                    ) : null}
                  </View>

                  <View>
                    <Text style={styles.title}>College/University Name</Text>
                    <View style={styles.inputcontainer}>
                      <TextInput
                        style={styles.input}
                        placeholderTextColor="rgba(32, 32, 32, 0.6)"
                        placeholder="Enter"
                        value={university}
                        onChangeText={(university) =>
                          this.setState({ university })
                        }
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="default"
                      />
                    </View>
                    {/* {this.state.error_college ? (
                      <Text style={styles.inputtxt}>
                        This filed is mandatory
                      </Text>
                    ) : null} */}
                  </View>

                  {this.state.pg ? (
                    <View>
                      <View>
                        <Text style={styles.title}>UG Degree{<Text style={styles.red}>*</Text>}</Text>
                        <View style={styles.pickersty}>
                          <RNPickerSelect
                            placeholder={{
                              label: 'Choose',
                              value: null,
                            }}
                            items={this.state.ugdegree}
                            onValueChange={(value) => {
                              if (value != null) {
                                this.setState({ selectedugdegree: value });
                              }
                            }}
                            useNativeAndroidPickerStyle={false}
                            style={pickerStyle}
                            value={selectedugdegree}
                          />
                        </View>
                        {this.state.error_ugdegree ? (
                          <Text style={styles.inputtxt}>
                            This filed is mandatory
                          </Text>
                        ) : null}
                      </View>

                      <View>
                        <Text style={styles.title}>
                          UG College/University Name
                        </Text>
                        <View style={styles.inputcontainer}>
                          <TextInput
                            style={styles.input}
                            placeholderTextColor="rgba(32, 32, 32, 0.6)"
                            placeholder="Enter"
                            value={ugcollege}
                            onChangeText={(ugcollege) =>
                              this.setState({ ugcollege })
                            }
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="default"
                          />
                        </View>
                        {/* {this.state.error_ugcollege ? (
                          <Text style={styles.inputtxt}>
                            This filed is mandatory
                          </Text>
                        ) : null} */}
                      </View>
                    </View>
                  ) : null}
                </View>
              </ProgressStep>
              <ProgressStep
                label="Career"
                onNext={this.onNextStep}
                onPrevious={this.onPrevStep}
                nextBtnTextStyle={buttonTextStyle}
                previousBtnTextStyle={buttonTextStyle}
                nextBtnStyle={buttonStyle}
                previousBtnStyle={buttonStyle}>
                <View style={styles.content}>
                  <View>
                    <Text style={styles.title}>Employed In{<Text style={styles.red}>*</Text>}</Text>
                    <View style={styles.pickersty}>
                      <RNPickerSelect
                        placeholder={{
                          label: 'Choose',
                          value: null,
                        }}
                        items={this.state.employee}
                        onValueChange={(value) => {
                          if (value != null) {
                            console.log(
                              'this.state.employee',
                              this.state.employee,
                            );
                            let occjson = this.state.occupationdata;
                            let data = occjson[value].options;
                            this.setState({
                              selectedEmployee: value,
                              occupation: data,
                            });
                            console.log('selectedEmployee', selectedEmployee);
                          }
                        }}
                        useNativeAndroidPickerStyle={false}
                        style={pickerStyle}
                        value={selectedEmployee}
                      />
                    </View>
                    {this.state.error_employee ? (
                      <Text style={styles.inputtxt}>
                        This filed is mandatory
                      </Text>
                    ) : null}
                  </View>

                  <View>
                    <Text style={styles.title}>Occupation{<Text style={styles.red}>*</Text>}</Text>
                    <View style={styles.pickersty}>
                      <RNPickerSelect
                        placeholder={{
                          label: 'Choose',
                          value: null,
                        }}
                        items={this.state.occupation}
                        onValueChange={(value) => {
                          if (value != null) {
                            this.setState({ selectedOccupation: value });
                          }
                        }}
                        useNativeAndroidPickerStyle={false}
                        style={pickerStyle}
                        value={selectedOccupation}
                      />
                    </View>
                    {this.state.error_occupation ? (
                      <Text style={styles.inputtxt}>
                        This filed is mandatory
                      </Text>
                    ) : null}
                  </View>

                  <View>
                    <Text style={styles.title}>Company Name</Text>
                    <View style={styles.inputcontainer}>
                      <TextInput
                        style={styles.input}
                        placeholder="Enter Name"
                        placeholderTextColor="rgba(32, 32, 32, 0.6)"
                        value={company}
                        onChangeText={(company) => this.setState({ company })}
                        autoCapitalize="none"
                        autoCorrect={false}
                        onSubmitEditing={() => {
                          this.secondTextInput.focus();
                        }}
                        keyboardType="default"
                      />
                    </View>
                    {/* {this.state.error_company ? (
                      <Text style={styles.inputtxt}>
                        This filed is mandatory
                      </Text>
                    ) : null} */}
                  </View>
                  {/* 
                  <View>
                    <Text style={styles.title}>Annual Income</Text>
                    <View style={styles.inputcontainer}>
                      <TextInput
                        style={styles.input}
                        placeholderTextColor='rgba(32, 32, 32, 0.6)'
                        placeholder='Enter Income'
                        value={income}
                        onChangeText={(income) => this.setState({ income })}
                        autoCapitalize="none"
                        autoCorrect={false}
                        ref={(input) => { this.secondTextInput = input; }}
                        keyboardType='number-pad' />
                    </View>
                    {this.state.error_annual ?
                      <Text style={styles.inputtxt}>This filed is mandatory</Text>
                      : null}

                  </View> */}

                  <View>
                    <Text style={styles.title}>Annual Income{<Text style={styles.red}>*</Text>}</Text>
                    <View style={styles.pickersty}>
                      <RNPickerSelect
                        placeholder={{
                          label: 'Choose',
                          value: null,
                        }}
                        items={this.state.myincome}
                        onValueChange={(value) => {
                          if (value != null) {
                            this.setState({ selectedmyincome: value });
                          }
                        }}
                        useNativeAndroidPickerStyle={false}
                        style={pickerStyle}
                        value={selectedmyincome}
                      />
                    </View>
                    {this.state.error_annual ? (
                      <Text style={styles.inputtxt}>
                        This filed is mandatory
                      </Text>
                    ) : null}
                  </View>
                </View>
              </ProgressStep>
              <ProgressStep
                label="Location"
                onNext={this.onNextStep}
                onPrevious={this.onPrevStep}
                onSubmit={this.onSubmitSteps}
                nextBtnStyle={buttonStyle}
                nextBtnTextStyle={buttonTextStyle}
                previousBtnTextStyle={buttonTextStyle}
                previousBtnStyle={buttonStyle}>
                <View style={styles.content}>
                  <View>
                    <Text style={styles.title}>Work Country{<Text style={styles.red}>*</Text>}</Text>
                    <View style={styles.pickersty}>
                      <RNPickerSelect
                        placeholder={{
                          label: 'Choose',
                          value: null,
                        }}
                        items={this.state.country}
                        onValueChange={(value) => {
                          if (value != null) {
                            this.setState({ selectedCountry: value });
                            if (value == 'USA') {
                              this.setState({
                                selectedStates: '',
                                selectedCity: '',
                              });
                            }
                            console.log('value', value);
                          } else {
                            return false;
                          }
                        }}
                        useNativeAndroidPickerStyle={false}
                        style={pickerStyle}
                        value={selectedCountry}
                      />
                    </View>

                    {this.state.error_country ? (
                      <Text style={styles.inputtxt}>
                        This filed is mandatory
                      </Text>
                    ) : null}
                  </View>

                  {selectedCountry == 'IN' ? (
                    <View>
                      <View>
                        <Text style={styles.title}>Work State{<Text style={styles.red}>*</Text>}</Text>
                        <View style={styles.pickersty}>
                          <RNPickerSelect
                            placeholder={{
                              label: 'Choose',
                              value: null,
                            }}
                            items={this.state.stateDatajson}
                            onValueChange={(value) => {
                              if (value != null) {
                                let datajson = this.state.cityDatajson;
                                console.log(
                                  'valye city',
                                  value,
                                  'vv',
                                  datajson[value].options,
                                );
                                this.setState({
                                  selectedStates: value,
                                  city: datajson[value].options,
                                });
                              }
                            }}
                            useNativeAndroidPickerStyle={false}
                            style={pickerStyle}
                            value={selectedStates}
                          />
                        </View>
                        {this.state.error_state ? (
                          <Text style={styles.inputtxt}>
                            This filed is mandatory
                          </Text>
                        ) : null}
                      </View>

                      <View>
                        <Text style={styles.title}>Work City{<Text style={styles.red}>*</Text>}</Text>
                        <View style={styles.pickersty}>
                          <TextInput
                            // style={{
                            //   height: 40,

                            //   borderWidth: 1,
                            // }}
                            items={this.state.city}
                            onChangeText={(value) => {
                              if (value != undefined) {
                                this.setState({ selectedCity: value });
                                console.log('city value', selectedCity)
                              }
                            }}
                            value={selectedCity}
                          />
                          {/* <RNPickerSelect
                            placeholder={{
                              label: 'Choose',
                              value: null,
                            }}
                            items={this.state.city}
                            onValueChange={(value) => {
                              if(value!=undefined){
                              this.setState({ selectedCity: value });
                              console.log('city value', selectedCity)
                            }
                            }}
                            useNativeAndroidPickerStyle={false}
                            style={pickerStyle}
                            value={selectedCity} /> */}
                        </View>
                        {this.state.error_city ? (
                          <Text style={styles.inputtxt}>
                            This filed is mandatory
                          </Text>
                        ) : null}
                      </View>
                    </View>
                  ) : null}

                  {selectedCountry != 'IN' ? (
                    <View>
                      <View>
                        <Text style={styles.title}>Work State{<Text style={styles.red}>*</Text>}</Text>
                        <View style={styles.inputcontainer}>
                          <TextInput
                            style={styles.input}
                            placeholderTextColor="rgba(32, 32, 32, 0.6)"
                            placeholder="Enter"
                            value={selectedStatesoutside}
                            onChangeText={(selectedStatesoutside) =>
                              this.setState({ selectedStatesoutside })
                            }
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="default"
                          />
                        </View>
                        {this.state.error_state1 ? (
                          <Text style={styles.inputtxt}>
                            This filed is mandatory
                          </Text>
                        ) : null}
                      </View>

                      <View>
                        <Text style={styles.title}>Work City{<Text style={styles.red}>*</Text>}</Text>
                        <View style={styles.inputcontainer}>
                          <TextInput
                            style={styles.input}
                            placeholderTextColor="rgba(32, 32, 32, 0.6)"
                            placeholder="Enter"
                            value={selectedCityoutside}
                            onChangeText={(selectedCityoutside) =>
                              this.setState({ selectedCityoutside })
                            }
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="default"
                          />
                        </View>
                        {this.state.error_city1 ? (
                          <Text style={styles.inputtxt}>
                            This filed is mandatory
                          </Text>
                        ) : null}
                      </View>

                      <View>
                        <Text style={styles.title}>Visa Status{<Text style={styles.red}>*</Text>}</Text>
                        <View style={styles.pickersty}>
                          <RNPickerSelect
                            placeholder={{
                              label: 'Choose',
                              value: null,
                            }}
                            items={this.state.visa}
                            onValueChange={(value) => {
                              this.setState({ selectedVisa: value });
                            }}
                            useNativeAndroidPickerStyle={false}
                            style={pickerStyle}
                            value={selectedVisa}
                          />
                        </View>
                        {this.state.error_visa ? (
                          <Text style={styles.inputtxt}>
                            This filed is mandatory
                          </Text>
                        ) : null}
                      </View>
                    </View>
                  ) : null}
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
