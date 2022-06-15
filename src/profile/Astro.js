import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, AsyncStorage, ActivityIndicator, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './Style';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { fontfamily, fontsize, colors } from '../globalstyles/Style';
// import AsyncStorage from '@react-native-community/async-storage';
import { URL } from '../constant/Constant';
import { myToken } from '../token/Token';
import Toast from 'react-native-simple-toast';
import { MaterialDialog } from 'react-native-material-dialog';

export default class Astro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favColor: undefined, loading: true,
      date: new Date(),
      show: false,
      time: 'Choose',
      items: [],
      POB: '',
      selectedManglik: '',
      manglik: [],
      astro: [],
      error_date: false,
      error_birthPlace: false,
      error_manglik: false,
      birthCity: '',
      selectedbirthState: '',
      birthState: [],
      error_birthState: false,
      visible_state: false,
    }
  }

  setDate = (event, date) => {
    date = date || this.state.date;
    this.setState({
      show: Platform.OS === 'ios' ? true : false,
      date,
    });
    console.log('time', this.state.date)
  }

  show = () => {
    this.setState({
      show: true,
    });
  }

  timepicker = () => {
    this.show();
  }

  formet = (date) => {
    // console.log('date', date);

    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    const time = hours + ':' + minutes
    //  console.log('formet time', `${hours}:${minutes}:${seconds}`)
    return time;
  }

  async astro() {
    let idToken = await AsyncStorage.getItem('idToken', idToken);
    const { date, POB, selectedManglik, selectedbirthState } = this.state

    let params = {
      profile: {
        astro: { birthTime: date, birthCity: POB, manglikDetails: selectedManglik, birthState: selectedbirthState },
      }
    }

    fetch(URL + 'profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': await myToken(),
      },
      body: JSON.stringify(params)
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.personal != undefined) {
          console.log('send astro:', responseJson.astro)
          this.setState({ astro: responseJson.astro })
          Toast.show('Saved', Toast.SHORT);
        } else {
          alert('Please fill all required fields');
        }
      })
      .catch(error => {
        console.error('astro: something went wrong...', error);
      });
  }

  async profileData() {
    // let idToken = await AsyncStorage.getItem('idToken', idToken);
    // console.log('profileData', idToken);
    fetch(URL + 'profile/config', {
      method: 'GET',
      headers: {
        'Authorization': await myToken(),
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.code == "not-found") {
          console.log('astro drop-down data=>', responseJson.msg);

        } else {
          let manglikData = responseJson.astro.manglikDetails.options
          let birthState = responseJson.astro.birthState.IN.options
          this.setState({ manglik: manglikData, birthState: birthState });
          //  console.log('manglikData:', this.state.manglik)
        }
      })
      .catch(error => {
        console.error('astroData something went wrong...', error);
      });
  }

  async getProfile() {
    let idToken = await AsyncStorage.getItem('idToken', idToken);
    fetch(URL + 'profile', {
      method: 'GET',
      headers: {
        'Authorization': await myToken(),
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        // console.log('responseJson personal', responseJson.personal);
        if (responseJson.code == "not-found") {
          console.log(responseJson.msg);
          this.setState({ loading: false })
        } else {
          if (responseJson.astro.birthCity == undefined) {
            console.log('astro data not found')
            this.setState({ loading: false })
          } else {
            let astroData = responseJson.astro;
            let birthTime = astroData.birthTime
            this.setState({
              astro: astroData, POB: astroData.birthCity, selectedManglik: astroData.manglikDetails,
              selectedbirthState: astroData.birthState, loading: false
            })
            if (birthTime != undefined) {
              this.setState({ date: new Date(birthTime) })
            }
          }
        }

      })
      .catch(error => {
        console.error('something went wrong...', error);
        this.setState({ loading: false })
      });
  }

  fun_validation() {
    const { date, POB, selectedManglik, selectedbirthState } = this.state
    if (POB == '' || POB == null) {
      this.setState({ error_birthPlace: true })
    } else {
      this.setState({ error_birthPlace: false })
    }

    if (date == '' || date == null) {
      this.setState({ error_date: true })
    } else {
      this.setState({ error_date: false })
    }
    if (selectedManglik == '' || selectedManglik == null) {
      this.setState({ error_manglik: true })
    } else {
      this.setState({ error_manglik: false })
    }

    if (selectedbirthState == '' || selectedbirthState == null) {
      this.setState({ error_birthState: true })
    } else {
      this.setState({ error_birthState: false })
    }

  }

  onPress = () => {
    const { date, POB, selectedManglik, selectedbirthState } = this.state
    if (POB != '' && date != '' && selectedManglik != '' && selectedbirthState != '') {
      this.props.navigation.navigate('Career');
      this.astro();
      this.fun_validation();
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
      this.fun_validation();
    }

  }

  componentDidMount() {
    this.profileData();
    this.getProfile();
  }

  render() {
    const { show, date, POB, selectedManglik, selectedbirthState } = this.state;
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
          <View style={styles.content}>
            {/* <Text style={styles.title}>Astro Details</Text> */}

            <TouchableOpacity onPress={this.timepicker}
            >

              <View>
                <Text style={styles.title}>Time of Birth{<Text style={styles.red}>*</Text>}</Text>
                <View style={styles.pickersty}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.input}>{this.formet(this.state.date)}</Text>
                    {/* <Text style={styles.input}>{this.state.date}</Text> */}
                    <TouchableOpacity onPress={this.timepicker}
                      style={{ position: 'absolute', right: 15 }}>
                      <Icon name='clock' size={20} color='#797979' />
                    </TouchableOpacity>
                  </View>
                  {show &&
                    <DateTimePicker
                      placeholder='select time'
                      value={date}
                      mode='time'
                      display="spinner"
                      is12Hour={true}
                      display="default"
                      onChange={this.setDate} />
                  }
                </View>
                {this.state.error_date ?
                  <Text style={styles.inputtxt}>This filed is mandatory</Text>
                  : null}
              </View>
            </TouchableOpacity>
            <View>
              <Text style={styles.title}>Place of Birth{<Text style={styles.red}>*</Text>}</Text>
              <View style={styles.pickersty}>
                <RNPickerSelect
                  placeholder={{
                    label: 'Choose Birth State',
                    value: null,
                  }}
                  items={this.state.birthState}
                  onValueChange={(value) => {
                    this.setState({ selectedbirthState: value });
                  }}
                  useNativeAndroidPickerStyle={false}
                  style={pickerStyle}
                  value={selectedbirthState}
                />
              </View>
              {this.state.error_birthState ?
                <Text style={styles.inputtxt}>This filed is mandatory</Text>
                : null}
              <View style={styles.inputcontainer}>
                <TextInput
                  style={styles.input}
                  placeholderTextColor='rgba(32, 32, 32, 0.6)'
                  placeholder='Enter Birth City'
                  value={POB}
                  onChangeText={(POB) => this.setState({ POB })}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType='default'
                  returnKeyType="next"
                />
              </View>
              {this.state.error_birthPlace ?
                <Text style={styles.inputtxt}>This filed is mandatory</Text>
                : null}
            </View>

            <View>
              <Text style={styles.title}>Manglik Details{<Text style={styles.red}>*</Text>}</Text>
              <View style={styles.pickersty}>
                <RNPickerSelect
                  placeholder={{
                    label: 'Choose',
                    value: null,
                  }}
                  items={this.state.manglik}
                  onValueChange={(value) => {
                    this.setState({ selectedManglik: value });
                  }}
                  useNativeAndroidPickerStyle={false}
                  style={pickerStyle}
                  value={selectedManglik}
                />
              </View>
              {this.state.error_manglik ?
                <Text style={styles.inputtxt}>This filed is mandatory</Text>
                : null}
            </View>

            <TouchableOpacity style={[styles.btnsty, { marginTop: '5%' }]}
              onPress={() => this.onPress()}>
              <Text style={[styles.title, { color: '#fff' }]}>Save</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

      </View>
    )
  }
}

const pickerStyle = {
  inputIOS: {
    color: '#000',
    fontSize: fontsize.subtitle,
    fontFamily: fontfamily.roboto
  },
  inputAndroid: {
    color: '#000',
    fontSize: fontsize.subtitle,
    fontFamily: fontfamily.roboto
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