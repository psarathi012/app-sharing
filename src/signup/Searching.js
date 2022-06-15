import React, { Component } from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  ScrollView,
  TouchableOpacity,
  Picker,
  AsyncStorage,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
import { Container } from 'native-base';
import styles from '../searchBrideGroom/Style';
import { SearchBar } from 'react-native-elements';
import ScrollPicker from 'react-native-wheel-scroll-picker';
import RNPickerSelect from 'react-native-picker-select';
import { fontfamily, fontsize, colors, images } from '../globalstyles/Style';
// import AsyncStorage from '@react-native-community/async-storage';
import { URL } from '../constant/Constant';
import MultiSelect from 'react-native-multiple-select';
import { myToken } from '../token/Token';
import SelectMultiple from 'react-native-select-multiple';
import { MaterialDialog } from 'react-native-material-dialog';
import { TextInput } from 'react-native-gesture-handler';
import { Button } from 'react-native-share';

const renderLabel = (label, style) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {/* <Image style={{width: 42, height: 42}} source={{uri: 'https://dummyimage.com/100x100/52c25a/fff&text=S'}} /> */}
      <View style={{ marginLeft: 10 }}>
        <Text style={style}>{label}</Text>
      </View>
    </View>
  );
};

export default class Searching extends Component {
  state = {
    search: '',
    loading: true,
    groomBtn: true,
    brideBtn: false,
    avaliablegender: false,
    iscolor: true,
    iscolor1: false,
    dataSource: [],
    surname: [],
    selected_surname: [],
    familyfrom: [],
    selected_familyfrom: [],
    dataSource1: [],
    selected_occupation: [],
    occupation: [],
    selected_minIncome: '',
    minIncome: [],
    selectedItem: '18',
    selected_maxIncome: '',
    maxIncome: [],
    selected_country: '',
    country: [],
    selectedItem1: '40',
    selected_state: [],
    state: [],
    selected_city: [],
    city: [],
    selected_states: [],
    minheight: [],
    selected_minheight: "4'1",
    maxheight: [],
    selected_maxheight: "5'0",
    items: [],
    surname: [],
    citydatajson: [],
    ageMin: false,
    ageMax: false,
    heightMin: false,
    female: false,
    male: false,
    heightMax: false,
    selectedItems: [],
    marital: [],
    selectedMarital: '',
    manglikDetails: [],
    selectedmanglikDetails: '',
    qualification: [],
    selectedqualification: [],
    selectedGender: 'male',
    selectedFruits: [],
    visible: false,
    visible_surname: false,
    visible_family: false,
    visible_occupation: false,
    visible_state: false,
    visible_city: false,
    visible_states: false,
    selected_age_h: 0,
  };

  updateSearch = (search) => {
    this.setState({ search });
  };

  Groombtn = () => {
    this.setState({
      iscolor: true,
      iscolor1: false,
      brideBtn: false,
      groomBtn: true,
      selectedGender: 'male',
    });
  };

  onSelectionsChange = (selectedFruits) => {
    // selectedFruits is array of { label, value }
    this.setState({ selectedFruits });
  };

  ageMin() {
    if (this.state.ageMin == false) {
      this.setState({
        ageMin: true,
        ageMax: false,
        heightMin: false,
        heightMax: false,
      });
    } else {
      this.setState({ ageMin: false });
    }
  }

  ageMax() {
    if (this.state.ageMax == false) {
      this.setState({
        ageMax: true,
        heightMin: false,
        heightMax: false,
        ageMin: false,
      });
    } else {
      this.setState({ ageMax: false });
    }
  }

  heightMin() {
    if (this.state.heightMin == false) {
      this.setState({
        heightMin: true,
        heightMax: false,
        ageMin: false,
        ageMax: false,
      });
    } else {
      this.setState({ heightMin: false });
    }
  }

  heightMax() {
    if (this.state.heightMax == false) {
      this.setState({
        heightMax: true,
        ageMin: false,
        ageMax: false,
        heightMin: false,
      });
    } else {
      this.setState({ heightMax: false });
    }
  }

  onSelectedItemsChange = (selected_surname) => {
    this.setState({ selected_surname });
  };

  onSelectedItemsChange1 = (selected_familyfrom) => {
    this.setState({ selected_familyfrom });
  };

  onSelectedItemsChange2 = (selectedqualification) => {
    this.setState({ selectedqualification });
  };

  onSelectedItemsChange3 = (selected_country) => {
    this.setState({ selected_country });
  };

  onSelectedItemsChange4 = (selected_states) => {
    let citydata = this.state.citydatajson;
    console.log(citydata, "hhhhhhhhhhhhhhhhhhhhhhhh");

    let tempcity = [];
    for (let i = 0; i < selected_states.length; i++) {
      let selected_s = selected_states[i].label;
      console.log(typeof (selected_s), "ffffffffffffffffffffffffff");
      let op = citydata[selected_states[i].value];
      console.log(op, "this is p");
      let d = op.options;

      for (let i = 0; i < d.length; i++) {
        let obj = {
          label: d[i].label,
          value: d[i].value,
        };

        tempcity.push(obj);
      }
    }

    this.setState({ selected_states, city: tempcity });
  };

  onSelectedItemsChange5 = (selected_city) => {
    this.setState({ selected_city });
  };

  onSelectedItemsChange6 = (selected_occupation) => {
    this.setState({ selected_occupation });
  };

  async getProfile() {
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
        } else {
          let personal = responseJson.personal;
          let gender = personal.gender;
          console.log('gender', personal.gender);
          if (gender != undefined) {
            this.setState({ avaliablegender: true });
          }

          if (this.state.avaliablegender == true) {
            if (gender == 'female') {
              this.setState({
                female: true,
                iscolor: true,
                iscolor1: false,
                brideBtn: false,
                groomBtn: true,
                selectedGender: 'male',
              });
            }
            if (gender == 'male') {
              this.setState({
                male: true,
                iscolor: false,
                iscolor1: true,
                brideBtn: true,
                groomBtn: false,
                selectedGender: 'female',
              });
            }
          }
        }
      })
      .catch((error) => {
        console.error('something went wrong...', error);
      });
  }

  async SearchData() {
    const {
      selectedMarital,
      selectedmanglikDetails,
      selected_minheight,
      selected_maxheight,
      selectedItem,
      selectedItem1,
      selected_familyfrom,
      selected_occupation,
      selectedqualification,
      selected_country,
      selected_states,
      selected_city,
      selected_surname,
      selectedGender,
      search,
    } = this.state;

    let params = {
      criteria: {
        gender: [selectedGender],
        maritalStatus: [selectedMarital],
        manglikDetails: [selectedmanglikDetails],
        minHeight: selected_minheight,
        maxHeight: selected_maxheight,
        minAge: selectedItem,
        maxAge: selectedItem1,
        occupation: selected_occupation,
        qualification: selectedqualification,
        familyState: selected_familyfrom,
        occupationCountry: [selected_country],
        occupationState: selected_states,
        occupationCity: selected_city,
        subCaste: selected_surname,
        displayId: [search],
      },
    };

    console.log('search params', params);

    fetch(URL + 'profile/search?page=0', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: await myToken(),
      },
      body: JSON.stringify(params),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('send data:', responseJson);
        this.setState({ searchData: responseJson });
        this.props.navigation.navigate('Search_result', {
          searchData: responseJson,
          params: params,
        });
      })
      .catch((error) => {
        console.error('Personal: something went wrong...', error);
      });
  }

  async profileData() {
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
        let manglikDetails = responseJson.manglikDetails.options;
        let maritalStatusData = responseJson.maritalStatus.options;
        let qualification = responseJson.qualification.options;
        let minagedata = responseJson.minAge.options;
        let maxagedata = responseJson.maxAge.options;
        let minheightdata = responseJson.minHeight.options;
        let maxheightdata = responseJson.maxHeight.options;
        let subcaste = responseJson.subCaste.options;
        let familyfrom = responseJson.familyOriginallyFromState.IN.options;
        let minincome = responseJson.minIncome.options;
        let maxincome = responseJson.maxIncome.options;
        let country = responseJson.country.options;
        let states = responseJson.state.IN.options;
        let citydatajson = responseJson.city.IN;
        let occupation = responseJson.occupation.options;
        console.log(states, "this is the country list");

        var tempminage = [],
          tempmaxage = [],
          tempoccupation = [],
          tempminheight = [],
          tempmaxheight = [],
          tempsubcaste = [],
          tempfamilyfrom = [],
          tempqualification = [],
          tempcountry = [],
          tempstates = [];

        for (let i = 0; i < minagedata.length; i++) {
          let minage = {};
          var num = minagedata[i].value;
          minage.label = num.toString();

          minage.value = (i + 1);
          tempminage.push(minage);
        }

        for (let i = 0; i < maxagedata.length; i++) {
          let maxage = [];
          (maxage = maxagedata[i].value), tempmaxage.push(maxage);
        }

        for (let i = 0; i < minheightdata.length; i++) {
          let minheight = [];
          (minheight = minheightdata[i].label), tempminheight.push(minheight);
        }

        for (let i = 0; i < maxheightdata.length; i++) {
          let maxheight = [];
          (maxheight = maxheightdata[i].label), tempmaxheight.push(maxheight);
        }

        for (let i = 0; i < subcaste.length; i++) {
          let obj = {
            label: subcaste[i].label,
            value: subcaste[i].value,
          };
          tempsubcaste.push(obj);
        }

        for (let i = 0; i < familyfrom.length; i++) {
          let obj = {
            label: familyfrom[i].label,
            value: familyfrom[i].value,
          };
          tempfamilyfrom.push(obj);
        }

        for (let i = 0; i < qualification.length; i++) {
          let obj = {
            label: qualification[i].label,
            value: qualification[i].value,
          };
          tempqualification.push(obj);
        }

        for (let i = 0; i < 3; i++) {

          let obj = {

            label: country[i].label,
            value: country[i].value,
          };
          console.log(country[i].label, "ffffffffffffffffffffffffffffffff");
          tempcountry.push(obj);
        }
        console.log(tempcountry, "this is the list of tempcountry");

        for (let i = 0; i < states.length; i++) {
          let obj = {
            label: states[i].label,
            value: states[i].value,
          };
          tempstates.push(obj);
        }

        for (let i = 0; i < occupation.length; i++) {
          let obj = {
            label: occupation[i].label,
            value: occupation[i].value,
          };
          tempoccupation.push(obj);
        }

        this.setState({
          manglikDetails: manglikDetails,
          marital: maritalStatusData,
          qualification: tempqualification,
          dataSource: tempminage,
          dataSource1: tempmaxage,
          minheight: minheightdata,
          maxheight: maxheightdata,
          surname: tempsubcaste,
          familyfrom: tempfamilyfrom,
          minIncome: minincome,
          maxIncome: maxincome,
          selected_maxIncome: maxincome[maxincome.length - 1].value,
          country: tempcountry,
          selected_country: 'IN',
          states: tempstates,
          citydatajson: citydatajson,
          occupation: tempoccupation,
          selected_minheight: minheightdata[0].value,
          selected_maxheight: maxheightdata[maxheightdata.length - 1].value,
          loading: false,
        });
        console.log(
          this.state.country,
          'gaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        );
      })
      .catch((error) => {
        console.error('profileData: something went wrong...', error);
      });
  }

  componentDidMount() {
    this.profileData();
    this.getProfile();
  }

  UNSAFE_componentWillMount() {
    this.profileData();
  }

  Bridebtn = () => {
    this.setState({
      iscolor: false,
      iscolor1: true,
      brideBtn: true,
      groomBtn: false,
      selectedGender: 'female',
    });
  };

  searchbtn() {
    this.SearchData();
  }
  dummyfunction() {
    return (
      <MaterialDialog
        title="Use Google's Location Service?"
        visible={this.state.visible}
        onOk={() => this.setState({ visible: false })}
        onCancel={() => this.setState({ visible: false })}>
        <MultiSelect
          hideTags={true}
          fixedHeight={true}
          items={qualification}
          uniqueKey="id"
          ref={(component) => {
            this.multiSelect2 = component;
          }}
          onSelectedItemsChange={this.onSelectedItemsChange2}
          selectedItems={selectedqualification}
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
          searchInputStyle={{ color: '#CCC' }}
          submitButtonColor={colors.primary}
          submitButtonText="Submit"
          styleSelectorContainer={{ backgroundColor: '#F0F0F0' }}
          styleDropdownMenuSubsection={[styles.pickersty, { paddingLeft: 17 }]}
        />
        <View>
          {this.multiSelect2 &&
            this.multiSelect2.getSelectedItemsExt(selectedqualification)}
        </View>
      </MaterialDialog>
    );
  }

  render() {
    const { search } = this.state;
    const {
      selectedItems,
      selectedMarital,
      marital,
      selectedmanglikDetails,
      manglikDetails,
      qualification,
      selectedqualification,
      selected_surname,
      surname,
      selected_familyfrom,
      familyfrom,
      selected_occupation,
      occupation,
      selected_minIncome,
      minIncome,
      maxIncome,
      selected_maxIncome,
      selected_country,
      country,
      selected_states,
      states,
      selected_city,
      city,
      minheight,
      selected_minheight,
      maxheight,
      selected_maxheight,
      dataSource
    } = this.state;

    if (this.state.loading) {
      return (
        <View style={styles.forindicator}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      );
    }

    return (
      <Container style={styles.container}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />

        <ScrollView>
          <View style={[styles.content]}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={{ flex: 0.5 }}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => this.props.navigation.navigate('Signup')}>
                  <Image
                    source={images.back} style={{ width: 15, height: 15 }} />
                </TouchableOpacity>
              </View>
              <View style={{ flex: 0.5, marginLeft: '-50%', marginTop: '-9%' }}>
                <Text style={styles.heading}>Search</Text>
              </View>
            </View>

            {/* <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Signup')}>
              <Image source={images.back} style={{width: 15, height: 15}} />
            </TouchableOpacity>

            <View style={styles.row}>
              <Text style={styles.head}>Search</Text>
              <Text style={styles.createriatxt}>Save this Search</Text>
            </View> */}

            <View>
              <SearchBar
                searchIcon={{ size: 30 }}
                placeholder="Search by Id"
                onChangeText={this.updateSearch}
                value={search}
                containerStyle={styles.containerStyle}
                inputContainerStyle={styles.inputContainerStyle}
                inputStyle={styles.inputStyle}
              />
            </View>
            {/* <BrideGroom_Tab /> */}

            {this.state.avaliablegender ? (
              <View
                style={{ flexDirection: 'row', padding: 15, paddingBottom: 0 }}>
                {this.state.female == true ? (
                  <View
                    style={[
                      styles.center,
                      { justifyContent: 'space-between', width: '100%' },
                    ]}>
                    <TouchableOpacity
                      onPress={() => this.Groombtn()}
                      disabled={this.state.male}
                      style={
                        this.state.iscolor
                          ? styles.activebtnStyle
                          : styles.btnStyle
                      }>
                      <Text
                        style={[
                          styles.head,
                          this.state.iscolor ? styles.active : null,
                        ]}>
                        Groom
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : null}
                {this.state.male == true ? (
                  <View
                    style={[
                      styles.center,
                      { justifyContent: 'space-between', width: '100%' },
                    ]}>
                    <TouchableOpacity
                      onPress={() => this.Bridebtn()}
                      disabled={this.state.female}
                      style={
                        this.state.iscolor1
                          ? styles.activebtnStyle
                          : styles.btnStyle
                      }>
                      <Text
                        style={[
                          styles.head,
                          this.state.iscolor1 ? styles.active : null,
                        ]}>
                        Bride
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>
            ) : (
              <View
                style={{ flexDirection: 'row', padding: 15, paddingBottom: 0 }}>
                <View style={[styles.wdh, styles.center]}>
                  <TouchableOpacity
                    onPress={() => this.Groombtn()}
                    style={
                      this.state.iscolor
                        ? styles.activebtnStyle
                        : styles.btnStyle
                    }>
                    <Text
                      style={[
                        styles.head,
                        this.state.iscolor ? styles.active : null,
                      ]}>
                      Groom
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={[styles.wdh, styles.center]}>
                  <TouchableOpacity
                    onPress={() => this.Bridebtn()}
                    style={
                      this.state.iscolor1
                        ? styles.activebtnStyle
                        : styles.btnStyle
                    }>
                    <Text
                      style={[
                        styles.head,
                        this.state.iscolor1 ? styles.active : null,
                      ]}>
                      Bride
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {this.state.groomBtn ? (
              <View>
                <View>
                  {/* <Text style={[styles.title, { marginTop: 15 }]}>Age</Text> */}
                  <View style={[styles.row, { marginTop: 15 }]}>
                    <View style={{ width: '48%' }}>
                      <Text style={[styles.title, { marginLeft: '2%' }]}>Min Age</Text>
                      <View style={styles.pickersty}>
                        <RNPickerSelect
                          placeholder={{
                            label: 'Choose',
                            value: null,
                          }}
                          items={dataSource}
                          onValueChange={(value) => {
                            this.setState({ selectedItem: value });
                          }}
                          useNativeAndroidPickerStyle={false}
                          style={pickerStyle}
                          value={this.state.selectedItem}
                        />
                      </View>
                    </View>
                    <View style={{ width: '48%' }}>
                      <Text style={[styles.title, { marginLeft: '2%' }]}>Max Age</Text>
                      <View style={styles.pickersty}>
                        <RNPickerSelect
                          placeholder={{
                            label: 'Choose',
                            value: null,
                          }}
                          items={dataSource}
                          onValueChange={(value) => {
                            this.setState({ selectedItem2: value });
                          }}
                          useNativeAndroidPickerStyle={false}
                          style={pickerStyle}
                          value={this.state.selectedItem2}
                        />
                      </View>
                    </View>
                  </View>
                  <View style={[styles.row]}>
                    <View style={[styles.wdh, styles.centercontent]}>
                      {this.state.ageMin ? (
                        <View style={styles.pickersty}>
                          <RNPickerSelect
                            placeholder={{
                              label: 'Choose',
                              value: null,
                            }}
                            items={this.state.dataSource}
                            onValueChange={(value) => {
                              this.setState({ selectedItem: value });
                            }}
                            useNativeAndroidPickerStyle={false}
                            style={pickerStyle}
                            value={selectedItem}
                          />
                        </View>
                        // <ScrollPicker
                        //   dataSource={this.state.dataSource}
                        //   selectedIndex={1}
                        //   renderItem={(data, index, isSelected) => {}}
                        //   onValueChange={(data, selectedIndex) => {
                        //     this.setState({selectedItem: data});
                        //   }}
                        //   wrapperHeight={160}
                        //   wrapperWidth={150}
                        //   wrapperBackground={'#FFFFFF'}
                        //   itemHeight={45}
                        //   highlightColor={'#d8d8d8'}
                        //   highlightBorderWidth={0}
                        //   activeItemColor={'#222121'}
                        //   itemColor={'#B4B4B4'}
                        // />
                      ) : null}
                    </View>

                    <View style={[styles.wdh, styles.centercontent]}>
                      {this.state.ageMax ? (
                        <ScrollPicker
                          dataSource={this.state.dataSource1}
                          selectedIndex={1}
                          renderItem={(data, index, isSelected) => { }}
                          onValueChange={(data, selectedIndex) => {
                            this.setState({ selectedItem1: data });
                          }}
                          wrapperHeight={160}
                          wrapperWidth={150}
                          wrapperBackground={'#FFFFFF'}
                          itemHeight={45}
                          highlightColor={'#d8d8d8'}
                          highlightBorderWidth={0}
                          activeItemColor={'#222121'}
                          itemColor={'#B4B4B4'}
                        />
                      ) : null}
                    </View>
                  </View>
                </View>

                <View>
                  {/* <Text style={[styles.title, { marginTop: 0 }]}>Height</Text> */}
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: '48%' }}>
                      <Text style={styles.title}>Min Height</Text>
                      <View style={styles.pickersty}>
                        <RNPickerSelect
                          placeholder={{
                            label: 'Choose',
                            value: null,
                          }}
                          items={minheight}
                          onValueChange={(value) => {
                            this.setState({ selected_minheight: value });
                          }}
                          useNativeAndroidPickerStyle={false}
                          style={pickerStyle}
                          value={selected_minheight}
                        />
                      </View>
                    </View>
                    <View style={{ width: '48%', marginLeft: '2%' }}>
                      <Text style={styles.title}>Max Height</Text>
                      <View style={styles.pickersty}>
                        <RNPickerSelect
                          placeholder={{
                            label: 'Choose',
                            value: null,
                          }}
                          items={maxheight}
                          onValueChange={(value) => {
                            this.setState({ selected_maxheight: value });
                          }}
                          useNativeAndroidPickerStyle={false}
                          style={pickerStyle}
                          value={selected_maxheight}
                        />
                      </View>
                    </View>
                  </View>
                </View>

                <View>
                  <View>
                    <Text style={styles.title}>Marital Status</Text>
                    <View style={styles.pickersty}>
                      <RNPickerSelect
                        placeholder={{
                          label: 'Choose',
                          value: null,
                        }}
                        items={marital}
                        onValueChange={(value) => {
                          this.setState({ selectedMarital: value });
                        }}
                        useNativeAndroidPickerStyle={false}
                        style={pickerStyle}
                        value={selectedMarital}
                      />
                    </View>
                  </View>

                  <View>
                    <Text style={styles.title}>Manglik Details</Text>
                    <View style={styles.pickersty}>
                      <RNPickerSelect
                        placeholder={{
                          label: 'Choose',
                          value: null,
                        }}
                        items={manglikDetails}
                        onValueChange={(value) => {
                          this.setState({ selectedmanglikDetails: value });
                        }}
                        useNativeAndroidPickerStyle={false}
                        style={pickerStyle}
                        value={selectedmanglikDetails}
                      />
                    </View>
                  </View>
                  <View>
                    <Text style={styles.title}>Surname</Text>
                    <View>

                      <TouchableOpacity
                        onPress={() => {
                          this.setState({ visible_surname: true });
                        }}>
                        <View style={[styles.pickerstyle]}>
                          {selected_surname.length == 0 ? <Text>Choose </Text> : <Text>{selected_surname[0].label} and {selected_surname.length - 1} more</Text>}
                        </View>
                        <MaterialDialog
                          title="Select Surname"
                          visible={this.state.visible_surname}
                          // onOk={() => this.setState({ visible: false })}
                          onCancel={() =>
                            this.setState({ visible_surname: false })
                          }>

                          <View>
                            <TouchableOpacity
                              onPress={() => { this.setState({ selected_surname: [] }) }}
                              //onPress={() => this.workbutton1()}
                              // disabled={this.state.female}
                              style={
                                styles.activebtnStyle

                              }>
                              <Text
                                style={[
                                  styles.head,
                                  this.state.button1 ? styles.active : styles.active,
                                ]}>
                                RESET
                                    </Text>
                            </TouchableOpacity>
                          </View>

                          <SelectMultiple
                            items={surname}
                            selectedItems={selected_surname}
                            onSelectionsChange={this.onSelectedItemsChange} />
                          {/* <MultiSelect
                            hideTags={true}
                            items={surname}
                            uniqueKey="id"
                            ref={(component) => {
                              this.multiSelect = component;
                            }}
                            onSelectedItemsChange={this.onSelectedItemsChange}
                            selectedItems={selected_surname}
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
                            searchInputStyle={{ color: '#CCC' }}
                            submitButtonColor={colors.primary}
                            submitButtonText="Submit"
                            styleSelectorContainer={{
                              backgroundColor: '#F0F0F0',
                            }}
                            styleDropdownMenuSubsection={[
                              styles.pickersty,
                              { paddingLeft: 17 },
                            ]}
                          /> */}
                        </MaterialDialog>
                      </TouchableOpacity>
                      <View>
                        {this.multiSelect &&
                          this.multiSelect.getSelectedItemsExt(
                            selected_surname,
                          )}
                      </View>
                    </View>
                  </View>

                  <View>
                    <Text style={styles.title}>Family based out of</Text>
                    <View>
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({ visible_family: true });
                        }}>
                        <View style={[styles.pickerstyle]}>
                          {selected_familyfrom.length == 0 ? <Text>Choose </Text> : <Text>{selected_familyfrom[0].label} and {selected_familyfrom.length - 1} more</Text>}
                        </View>
                        <MaterialDialog
                          title="Select Family Based Out of"
                          visible={this.state.visible_family}
                          // onOk={() => this.setState({ visible: false })}
                          onCancel={() =>
                            this.setState({ visible_family: false })
                          }>
                          <View>
                            <TouchableOpacity
                              onPress={() => { this.setState({ selected_familyfrom: [] }) }}
                              //onPress={() => this.workbutton1()}
                              // disabled={this.state.female}
                              style={
                                styles.activebtnStyle

                              }>
                              <Text
                                style={[
                                  styles.head,
                                  this.state.button1 ? styles.active : styles.active,
                                ]}>
                                RESET
                                    </Text>
                            </TouchableOpacity>
                          </View>


                          <SelectMultiple
                            items={familyfrom}
                            selectedItems={selected_familyfrom}
                            onSelectionsChange={this.onSelectedItemsChange1} />
                          {/* <MultiSelect
                              hideTags={true}
                              items={familyfrom}
                              uniqueKey="id"
                              ref={(component) => {
                                this.multiSelect1 = component;
                              }}
                              onSelectedItemsChange={this.onSelectedItemsChange1}
                              selectedItems={selected_familyfrom}
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
                              searchInputStyle={{ color: '#CCC' }}
                              submitButtonColor={colors.primary}
                              submitButtonText="Submit"
                              styleSelectorContainer={{
                                backgroundColor: '#F0F0F0',
                              }}
                              styleDropdownMenuSubsection={[
                                styles.pickersty,
                                { paddingLeft: 17 },
                              ]}
                            /> */}
                        </MaterialDialog>
                      </TouchableOpacity>
                      <View>
                        {this.multiSelect1 &&
                          this.multiSelect1.getSelectedItemsExt(
                            selected_familyfrom,
                          )}
                      </View>
                    </View>
                  </View>

                  <View>
                    <Text style={styles.title}>Annual Income</Text>
                    <View style={{ flexDirection: 'row' }}>
                      <View style={{ width: '48%' }}>
                        <Text style={styles.subtitle}>Min Income</Text>
                        <View style={styles.pickersty}>
                          <RNPickerSelect
                            placeholder={{
                              label: 'Choose',
                              value: null,
                            }}
                            items={minIncome}
                            onValueChange={(value) => {
                              this.setState({ selected_minIncome: value });
                            }}
                            useNativeAndroidPickerStyle={false}
                            style={pickerStyle}
                            value={selected_minIncome}
                          />
                        </View>
                      </View>
                      <View style={{ width: '48%', marginLeft: '2%' }}>
                        <Text style={styles.subtitle}>Max Income</Text>
                        <View style={styles.pickersty}>
                          <RNPickerSelect
                            placeholder={{
                              label: 'Choose',
                              value: null,
                            }}
                            items={maxIncome}
                            onValueChange={(value) => {
                              this.setState({ selected_maxIncome: value });
                            }}
                            useNativeAndroidPickerStyle={false}
                            style={pickerStyle}
                            value={selected_maxIncome}
                          />
                        </View>
                      </View>
                    </View>
                  </View>

                  <View>
                    <Text style={styles.title}>Educational Qualifications</Text>
                    <View>
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({ visible: true });
                        }}>
                        <View style={[styles.pickerstyle]}>
                          {selectedqualification.length == 0 ? <Text>Choose </Text> : <Text>{selectedqualification[0].label} and {selectedqualification.length - 1} more</Text>}

                        </View>
                        <MaterialDialog
                          title="Select Education Qualifications"
                          visible={this.state.visible}
                          //onOk={() => this.setState({ visible: false })}
                          onCancel={() => this.setState({ visible: false })}>
                          <View>
                            <TouchableOpacity
                              onPress={() => { this.setState({ selectedqualification: [] }) }}
                              //onPress={() => this.workbutton1()}
                              // disabled={this.state.female}
                              style={
                                styles.activebtnStyle

                              }>
                              <Text
                                style={[
                                  styles.head,
                                  this.state.button1 ? styles.active : styles.active,
                                ]}>
                                RESET
                                    </Text>
                            </TouchableOpacity>
                          </View>

                          {/* <MultiSelect
                              hideTags={true}
                              fixedHeight={true}
                              items={qualification}
                              uniqueKey="id"
                              ref={(component) => {
                                this.multiSelect2 = component;
                              }}
                              onSelectedItemsChange={this.onSelectedItemsChange2}
                              selectedItems={selectedqualification}
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
                              searchInputStyle={{ color: '#CCC' }}
                              submitButtonColor={colors.primary}
                              submitButtonText="Submit"
                              styleSelectorContainer={{
                                backgroundColor: '#F0F0F0',
                              }}
                              styleDropdownMenuSubsection={[
                                styles.pickersty,
                                { paddingLeft: 17 },
                              ]}
                            /> */}
                          <SelectMultiple
                            items={qualification}
                            selectedItems={selectedqualification}
                            onSelectionsChange={this.onSelectedItemsChange2} />

                        </MaterialDialog>
                      </TouchableOpacity>
                      {/* <View>
                          {this.multiSelect2 &&
                            this.multiSelect2.getSelectedItemsExt(
                              selectedqualification,
                            )}
                        </View> */}
                    </View>
                  </View>

                  <View>
                    <Text style={styles.title}>Occupation</Text>
                    <View>
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({ visible_occupation: true });
                        }}>
                        <View style={[styles.pickerstyle]}>
                          {selected_occupation.length == 0 ? <Text>Choose </Text> : <Text>{selected_occupation[0].label} and {selected_occupation.length - 1} more</Text>}

                        </View>
                        <MaterialDialog
                          title="Select Occupation"
                          visible={this.state.visible_occupation}
                          // onOk={() => this.setState({ visible: false })}
                          onCancel={() =>
                            this.setState({ visible_occupation: false })
                          }>
                          {/* <MultiSelect
                              hideTags={true}
                              items={occupation}
                              uniqueKey="id"
                              ref={(component) => {
                                this.multiSelect6 = component;
                              }}
                              onSelectedItemsChange={this.onSelectedItemsChange6}
                              selectedItems={selected_occupation}
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
                              searchInputStyle={{ color: '#CCC' }}
                              submitButtonColor={colors.primary}
                              submitButtonText="Submit"
                              styleSelectorContainer={{
                                backgroundColor: '#F0F0F0',
                              }}
                              styleDropdownMenuSubsection={[
                                styles.pickersty,
                                { paddingLeft: 17 },
                              ]}
                            /> */}

                          <View>
                            <TouchableOpacity
                              onPress={() => { this.setState({ selected_occupation: [] }) }}
                              //onPress={() => this.workbutton1()}
                              // disabled={this.state.female}
                              style={
                                styles.activebtnStyle

                              }>
                              <Text
                                style={[
                                  styles.head,
                                  this.state.button1 ? styles.active : styles.active,
                                ]}>
                                RESET

                                    </Text>
                            </TouchableOpacity>
                          </View>

                          <SelectMultiple
                            items={occupation}
                            selectedItems={selected_occupation}
                            onSelectionsChange={this.onSelectedItemsChange6} />
                        </MaterialDialog>
                      </TouchableOpacity>
                      {/* <View>
                          {this.multiSelect6 &&
                            this.multiSelect6.getSelectedItemsExt(
                              selected_occupation,
                            )}
                        </View> */}
                    </View>
                  </View>

                  <View>
                    <Text style={styles.title}>Work Country</Text>
                    <View >
                      <RNPickerSelect
                        placeholder={{
                          label: '',
                          value: null,

                        }}
                        items={country}
                        onValueChange={(value) => {
                          this.setState({ selected_country: value });
                        }}
                        useNativeAndroidPickerStyle={false}
                        //style={pickerStyle}
                        style={pickerSelectStyles}
                        value={selected_country}
                      />
                      {/* <MultiSelect
                    hideTags={true}
                    items={country}
                    uniqueKey="id"
                    ref={(component) => { this.multiSelect3 = component }}
                    onSelectedItemsChange={this.onSelectedItemsChange3}
                    selectedItems={selected_country}
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
                    searchInputStyle={{ color: '#CCC' }}
                    submitButtonColor={colors.primary}
                    submitButtonText="Submit"
                    styleSelectorContainer={{ backgroundColor: '#F0F0F0' }}
                    styleDropdownMenuSubsection={[styles.pickersty, { paddingLeft: 17 }]}
                  />
                  <View>
                    {this.multiSelect3 && this.multiSelect3.getSelectedItemsExt(selected_country)}
                  </View> */}
                    </View>
                  </View>

                  {selected_country == 'IN' ? (
                    <View>
                      {/* <View>
                          <Text style={styles.title}>Work State</Text>
                          <View>
                            <TouchableOpacity
                              onPress={() => {
                                this.setState({ visible_state: true });
                              }}>
                              <View style={[styles.pickerstyle]}>
                                <Text>Choose </Text>
                              </View>
                              <MaterialDialog
                                title="Select Work State"
                                visible={this.state.visible_state}
                                // onOk={() => this.setState({ visible: false })}
                                onCancel={() =>
                                  this.setState({ visible_state: false })
                                }>
                                <MultiSelect
                                  hideTags={true}
                                  fixedHeight={true}
                                  items={states}
                                  uniqueKey="id"
                                  ref={(component) => {
                                    this.multiSelect4 = component;
                                  }}
                                  onSelectedItemsChange={
                                    this.onSelectedItemsChange4
                                  }
                                  selectedItems={selected_states}
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
                                  searchInputStyle={{ color: '#CCC' }}
                                  submitButtonColor={colors.primary}
                                  submitButtonText="Submit"
                                  styleSelectorContainer={{
                                    backgroundColor: '#F0F0F0',
                                  }}
                                  styleDropdownMenuSubsection={[
                                    styles.pickersty,
                                    { paddingLeft: 17 },
                                  ]}
                                />
                              </MaterialDialog>
                            </TouchableOpacity>
                            <View>
                              {this.multiSelect4 &&
                                this.multiSelect4.getSelectedItemsExt(
                                  selected_states,
                                )}
                            </View>
                          </View>
                        </View> */}


                      <View>
                        <Text style={styles.title}>Work State</Text>
                        <View>
                          <TouchableOpacity
                            onPress={() => {
                              this.setState({ visible_states: true });
                            }}>
                            <View style={[styles.pickerstyle]}>
                              {selected_states.length == 0 ? <Text>Choose </Text> : <Text>{selected_states[0].label} and {selected_states.length - 1} more</Text>}

                            </View>
                            <MaterialDialog
                              title="Select Work Statesssss"
                              visible={this.state.visible_states}
                              onOk={() => this.setState({ visible: false })}
                              onCancel={() => this.setState({ visible_states: false })}>
                              <View>
                                <TouchableOpacity
                                  onPress={() => { this.setState({ selected_states: [] }) }}
                                  //onPress={() => this.workbutton1()}
                                  // disabled={this.state.female}
                                  style={
                                    styles.activebtnStyle

                                  }>
                                  <Text
                                    style={[
                                      styles.head,
                                      this.state.button1 ? styles.active : styles.active,
                                    ]}>

                                    RESET
                                    </Text>
                                </TouchableOpacity>
                              </View>


                              <SelectMultiple
                                items={states}
                                selectedItems={selected_states}
                                onSelectionsChange={this.onSelectedItemsChange4} />

                            </MaterialDialog>
                          </TouchableOpacity>
                        </View>
                      </View>


                      {/* //////////////////////////////////////////// */}
                      <View>
                        <Text style={styles.title}>Work City</Text>
                        <View>
                          <TouchableOpacity
                            onPress={() => {
                              this.setState({ visible_city: true });
                            }}>
                            <View style={[styles.pickerstyle]}>
                              {selected_city.length == 0 ? <Text>Choose </Text> : <Text>{selected_city[0].label} and {selected_city.length - 1} more</Text>}

                            </View>
                            <MaterialDialog
                              title="Select Work City"
                              visible={this.state.visible_city}
                              // onOk={() => this.setState({ visible: false })}
                              onCancel={() => this.setState({ visible_city: false })}>
                              <View>
                                <TouchableOpacity
                                  onPress={() => { this.setState({ selected_city: [] }) }}
                                  //onPress={() => this.workbutton1()}
                                  // disabled={this.state.female}
                                  style={
                                    styles.activebtnStyle

                                  }>
                                  <Text
                                    style={[
                                      styles.head,
                                      this.state.button1 ? styles.active : styles.active,
                                    ]}>
                                    RESET
                                    </Text>
                                </TouchableOpacity>
                              </View>


                              <SelectMultiple
                                items={city}
                                selectedItems={selected_city}
                                onSelectionsChange={this.onSelectedItemsChange5} />

                            </MaterialDialog>
                          </TouchableOpacity>
                        </View>
                      </View>

                      {/* <View>
                          <Text style={styles.title}>Work City </Text>

                          <View>
                            <TouchableOpacity
                              onPress={() => {
                                this.setState({ visible_city: true });
                              }}>
                              <View style={[styles.pickerstyle]}>
                                <Text>Choose </Text>
                              </View>
                              <MaterialDialog
                                title="Select Work city"
                                visible={this.state.visible_city}
                                // onOk={() => this.setState({ visible: false })}
                                onCancel={() =>
                                  this.setState({ visible_city: false })
                                }>
                                <MultiSelect
                                  hideTags={true}
                                  items={city}
                                  uniqueKey="id"
                                  ref={(component) => {
                                    this.multiSelect5 = component;
                                  }}
                                  onSelectedItemsChange={
                                    this.onSelectedItemsChange5
                                  }
                                  selectedItems={selected_city}
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
                                  searchInputStyle={{ color: '#CCC' }}
                                  submitButtonColor={colors.primary}
                                  submitButtonText="Submit"
                                  styleSelectorContainer={{
                                    backgroundColor: '#F0F0F0',
                                  }}
                                  styleDropdownMenuSubsection={[
                                    styles.pickersty,
                                    { paddingLeft: 17 },
                                  ]}
                                />
                              </MaterialDialog>

                            </TouchableOpacity>

                            <View>
                              {this.multiSelect5 &&
                                this.multiSelect5.getSelectedItemsExt(
                                  selected_city,
                                )}
                            </View>
                          </View>
                        </View> */}


                    </View>

                  ) : null}
                </View>

              </View>
            ) : null}

            {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
            <ScrollView>
              {this.state.brideBtn ? (

                <View>
                  <View>
                    {/* <Text style={[styles.title, { marginTop: 15 }]}>Age</Text> */}
                    <View style={[styles.row, { marginTop: 15 }]}>
                      <View style={{ width: '48%' }}>
                        <Text style={[styles.title, { marginLeft: '2%' }]}>Min Age</Text>
                        <View style={styles.pickersty}>
                          <RNPickerSelect
                            placeholder={{
                              label: 'Choose',
                              value: null,
                            }}
                            items={dataSource}
                            onValueChange={(value) => {
                              this.setState({ selectedItem: value });
                            }}
                            useNativeAndroidPickerStyle={false}
                            style={pickerStyle}
                            value={this.state.selectedItem}
                          />
                        </View>
                      </View>
                      <View style={{ width: '48%' }}>
                        <Text style={[styles.title, { marginLeft: '2%' }]}>Max Age</Text>
                        <View style={styles.pickersty}>
                          <RNPickerSelect
                            placeholder={{
                              label: 'Choose',
                              value: null,
                            }}
                            items={dataSource}
                            onValueChange={(value) => {
                              this.setState({ selectedItem2: value });
                            }}
                            useNativeAndroidPickerStyle={false}
                            style={pickerStyle}
                            value={this.state.selectedItem2}
                          />
                        </View>
                      </View>
                    </View>
                    <View style={[styles.row]}>
                      <View style={[styles.wdh, styles.centercontent]}>
                        {this.state.ageMin ? (
                          <View style={styles.pickersty}>
                            <RNPickerSelect
                              placeholder={{
                                label: 'Choose',
                                value: null,
                              }}
                              items={this.state.dataSource}
                              onValueChange={(value) => {
                                this.setState({ selectedItem: value });
                              }}
                              useNativeAndroidPickerStyle={false}
                              style={pickerStyle}
                              value={selectedItem}
                            />
                          </View>
                          // <ScrollPicker
                          //   dataSource={this.state.dataSource}
                          //   selectedIndex={1}
                          //   renderItem={(data, index, isSelected) => {}}
                          //   onValueChange={(data, selectedIndex) => {
                          //     this.setState({selectedItem: data});
                          //   }}
                          //   wrapperHeight={160}
                          //   wrapperWidth={150}
                          //   wrapperBackground={'#FFFFFF'}
                          //   itemHeight={45}
                          //   highlightColor={'#d8d8d8'}
                          //   highlightBorderWidth={0}
                          //   activeItemColor={'#222121'}
                          //   itemColor={'#B4B4B4'}
                          // />
                        ) : null}
                      </View>

                      <View style={[styles.wdh, styles.centercontent]}>
                        {this.state.ageMax ? (
                          <ScrollPicker
                            dataSource={this.state.dataSource1}
                            selectedIndex={1}
                            renderItem={(data, index, isSelected) => { }}
                            onValueChange={(data, selectedIndex) => {
                              this.setState({ selectedItem1: data });
                            }}
                            wrapperHeight={160}
                            wrapperWidth={150}
                            wrapperBackground={'#FFFFFF'}
                            itemHeight={45}
                            highlightColor={'#d8d8d8'}
                            highlightBorderWidth={0}
                            activeItemColor={'#222121'}
                            itemColor={'#B4B4B4'}
                          />
                        ) : null}
                      </View>
                    </View>
                  </View>

                  <View>
                    {/* <Text style={[styles.title, { marginTop: 0 }]}>Height</Text> */}
                    <View style={{ flexDirection: 'row' }}>
                      <View style={{ width: '48%' }}>
                        <Text style={styles.title}>Min Height</Text>
                        <View style={styles.pickersty}>
                          <RNPickerSelect
                            placeholder={{
                              label: 'Choose',
                              value: null,
                            }}
                            items={minheight}
                            onValueChange={(value) => {
                              this.setState({ selected_minheight: value });
                            }}
                            useNativeAndroidPickerStyle={false}
                            style={pickerStyle}
                            value={selected_minheight}
                          />
                        </View>
                      </View>
                      <View style={{ width: '48%', marginLeft: '2%' }}>
                        <Text style={styles.title}>Max Height</Text>
                        <View style={styles.pickersty}>
                          <RNPickerSelect
                            placeholder={{
                              label: 'Choose',
                              value: null,
                            }}
                            items={maxheight}
                            onValueChange={(value) => {
                              this.setState({ selected_maxheight: value });
                            }}
                            useNativeAndroidPickerStyle={false}
                            style={pickerStyle}
                            value={selected_maxheight}
                          />
                        </View>
                      </View>
                    </View>
                  </View>

                  <View>
                    <View>
                      <Text style={styles.title}>Marital Status</Text>
                      <View style={styles.pickersty}>
                        <RNPickerSelect
                          placeholder={{
                            label: 'Choose',
                            value: null,
                          }}
                          items={marital}
                          onValueChange={(value) => {
                            this.setState({ selectedMarital: value });
                          }}
                          useNativeAndroidPickerStyle={false}
                          style={pickerStyle}
                          value={selectedMarital}
                        />
                      </View>
                    </View>

                    <View>
                      <Text style={styles.title}>Manglik Details</Text>
                      <View style={styles.pickersty}>
                        <RNPickerSelect
                          placeholder={{
                            label: 'Choose',
                            value: null,
                          }}
                          items={manglikDetails}
                          onValueChange={(value) => {
                            this.setState({ selectedmanglikDetails: value });
                          }}
                          useNativeAndroidPickerStyle={false}
                          style={pickerStyle}
                          value={selectedmanglikDetails}
                        />
                      </View>
                    </View>
                    <View>
                      <Text style={styles.title}>Surname</Text>
                      <View>

                        <TouchableOpacity
                          onPress={() => {
                            this.setState({ visible_surname: true });
                          }}>
                          <View style={[styles.pickerstyle]}>
                            {selected_surname.length == 0 ? <Text>Choose </Text> : <Text>{selected_surname[0].label} and {selected_surname.length - 1} more</Text>}
                          </View>
                          <MaterialDialog
                            title="Select Surname"
                            visible={this.state.visible_surname}
                            // onOk={() => this.setState({ visible: false })}
                            onCancel={() =>
                              this.setState({ visible_surname: false })
                            }>

                            <View>
                              <TouchableOpacity
                                onPress={() => { this.setState({ selected_surname: [] }) }}
                                //onPress={() => this.workbutton1()}
                                // disabled={this.state.female}
                                style={
                                  styles.activebtnStyle

                                }>
                                <Text
                                  style={[
                                    styles.head,
                                    this.state.button1 ? styles.active : styles.active,
                                  ]}>
                                  RESET
                                    </Text>
                              </TouchableOpacity>
                            </View>

                            <SelectMultiple
                              items={surname}
                              selectedItems={selected_surname}
                              onSelectionsChange={this.onSelectedItemsChange} />
                            {/* <MultiSelect
                            hideTags={true}
                            items={surname}
                            uniqueKey="id"
                            ref={(component) => {
                              this.multiSelect = component;
                            }}
                            onSelectedItemsChange={this.onSelectedItemsChange}
                            selectedItems={selected_surname}
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
                            searchInputStyle={{ color: '#CCC' }}
                            submitButtonColor={colors.primary}
                            submitButtonText="Submit"
                            styleSelectorContainer={{
                              backgroundColor: '#F0F0F0',
                            }}
                            styleDropdownMenuSubsection={[
                              styles.pickersty,
                              { paddingLeft: 17 },
                            ]}
                          /> */}
                          </MaterialDialog>
                        </TouchableOpacity>
                        <View>
                          {this.multiSelect &&
                            this.multiSelect.getSelectedItemsExt(
                              selected_surname,
                            )}
                        </View>
                      </View>
                    </View>

                    <View>
                      <Text style={styles.title}>Family based out of</Text>
                      <View>
                        <TouchableOpacity
                          onPress={() => {
                            this.setState({ visible_family: true });
                          }}>
                          <View style={[styles.pickerstyle]}>
                            {selected_familyfrom.length == 0 ? <Text>Choose </Text> : <Text>{selected_familyfrom[0].label} and {selected_familyfrom.length - 1} more</Text>}
                          </View>
                          <MaterialDialog
                            title="Select Family Based Out of"
                            visible={this.state.visible_family}
                            // onOk={() => this.setState({ visible: false })}
                            onCancel={() =>
                              this.setState({ visible_family: false })
                            }>
                            <View>
                              <TouchableOpacity
                                onPress={() => { this.setState({ selected_familyfrom: [] }) }}
                                //onPress={() => this.workbutton1()}
                                // disabled={this.state.female}
                                style={
                                  styles.activebtnStyle

                                }>
                                <Text
                                  style={[
                                    styles.head,
                                    this.state.button1 ? styles.active : styles.active,
                                  ]}>
                                  RESET
                                    </Text>
                              </TouchableOpacity>
                            </View>


                            <SelectMultiple
                              items={familyfrom}
                              selectedItems={selected_familyfrom}
                              onSelectionsChange={this.onSelectedItemsChange1} />
                            {/* <MultiSelect
                              hideTags={true}
                              items={familyfrom}
                              uniqueKey="id"
                              ref={(component) => {
                                this.multiSelect1 = component;
                              }}
                              onSelectedItemsChange={this.onSelectedItemsChange1}
                              selectedItems={selected_familyfrom}
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
                              searchInputStyle={{ color: '#CCC' }}
                              submitButtonColor={colors.primary}
                              submitButtonText="Submit"
                              styleSelectorContainer={{
                                backgroundColor: '#F0F0F0',
                              }}
                              styleDropdownMenuSubsection={[
                                styles.pickersty,
                                { paddingLeft: 17 },
                              ]}
                            /> */}
                          </MaterialDialog>
                        </TouchableOpacity>
                        <View>
                          {this.multiSelect1 &&
                            this.multiSelect1.getSelectedItemsExt(
                              selected_familyfrom,
                            )}
                        </View>
                      </View>
                    </View>

                    <View>
                      <Text style={styles.title}>Annual Income</Text>
                      <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: '48%' }}>
                          <Text style={styles.subtitle}>Min Income</Text>
                          <View style={styles.pickersty}>
                            <RNPickerSelect
                              placeholder={{
                                label: 'Choose',
                                value: null,
                              }}
                              items={minIncome}
                              onValueChange={(value) => {
                                this.setState({ selected_minIncome: value });
                              }}
                              useNativeAndroidPickerStyle={false}
                              style={pickerStyle}
                              value={selected_minIncome}
                            />
                          </View>
                        </View>
                        <View style={{ width: '48%', marginLeft: '2%' }}>
                          <Text style={styles.subtitle}>Max Income</Text>
                          <View style={styles.pickersty}>
                            <RNPickerSelect
                              placeholder={{
                                label: 'Choose',
                                value: null,
                              }}
                              items={maxIncome}
                              onValueChange={(value) => {
                                this.setState({ selected_maxIncome: value });
                              }}
                              useNativeAndroidPickerStyle={false}
                              style={pickerStyle}
                              value={selected_maxIncome}
                            />
                          </View>
                        </View>
                      </View>
                    </View>

                    <View>
                      <Text style={styles.title}>Educational Qualifications</Text>
                      <View>
                        <TouchableOpacity
                          onPress={() => {
                            this.setState({ visible: true });
                          }}>
                          <View style={[styles.pickerstyle]}>
                            {selectedqualification.length == 0 ? <Text>Choose </Text> : <Text>{selectedqualification[0].label} and {selectedqualification.length - 1} more</Text>}

                          </View>
                          <MaterialDialog
                            title=" "
                            visible={this.state.visible}
                            scrolled={true}
                            onOk={() => this.onSelectedItemsChange2 && this.setState({ visible: false })}
                            onCancel={() => this.setState({ selectedqualification: [], visible: false })}>



                            <View style={{ marginTop: '-20%' }}>
                              <View ><Text style={[
                                styles.head_clear_all,

                              ]}>Education qualification</Text></View>

                              <View style={{ marginTop: '-15%', marginLeft: '80%' }}>

                                <TouchableOpacity
                                  onPress={() => { this.setState({ selectedqualification: [] }) }}
                                //onPress={() => this.workbutton1()}
                                // disabled={this.state.female}
                                >
                                  <Text
                                    style={[
                                      styles.head,
                                      this.state.button1 ? styles.inactive : styles.inactive,
                                    ]}>
                                    Clear All
                                    </Text>
                                </TouchableOpacity>

                              </View>

                            </View>

                            {/* <MultiSelect
                              hideTags={true}
                              fixedHeight={true}
                              items={qualification}
                              uniqueKey="id"
                              ref={(component) => {
                                this.multiSelect2 = component;
                              }}
                              onSelectedItemsChange={this.onSelectedItemsChange2}
                              selectedItems={selectedqualification}
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
                              searchInputStyle={{ color: '#CCC' }}
                              submitButtonColor={colors.primary}
                              submitButtonText="Submit"
                              styleSelectorContainer={{
                                backgroundColor: '#F0F0F0',
                              }}
                              styleDropdownMenuSubsection={[
                                styles.pickersty,
                                { paddingLeft: 17 },
                              ]}
                            /> */}

                            <SelectMultiple
                              items={qualification}
                              selectedItems={selectedqualification}
                              onSelectionsChange={this.onSelectedItemsChange2}

                            />

                          </MaterialDialog>
                        </TouchableOpacity>
                        {/* <View>
                          {this.multiSelect2 &&
                            this.multiSelect2.getSelectedItemsExt(
                              selectedqualification,
                            )}
                        </View> */}
                      </View>
                    </View>

                    <View>
                      <Text style={styles.title}>Occupation</Text>
                      <View>
                        <TouchableOpacity
                          onPress={() => {
                            this.setState({ visible_occupation: true });
                          }}>
                          <View style={[styles.pickerstyle]}>
                            {selected_occupation.length == 0 ? <Text>Choose </Text> : <Text>{selected_occupation[0].label} and {selected_occupation.length - 1} more</Text>}

                          </View>
                          <MaterialDialog
                            title="Select Occupation"
                            visible={this.state.visible_occupation}
                            // onOk={() => this.setState({ visible: false })}
                            onCancel={() =>
                              this.setState({ visible_occupation: false })
                            }>
                            {/* <MultiSelect
                              hideTags={true}
                              items={occupation}
                              uniqueKey="id"
                              ref={(component) => {
                                this.multiSelect6 = component;
                              }}
                              onSelectedItemsChange={this.onSelectedItemsChange6}
                              selectedItems={selected_occupation}
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
                              searchInputStyle={{ color: '#CCC' }}
                              submitButtonColor={colors.primary}
                              submitButtonText="Submit"
                              styleSelectorContainer={{
                                backgroundColor: '#F0F0F0',
                              }}
                              styleDropdownMenuSubsection={[
                                styles.pickersty,
                                { paddingLeft: 17 },
                              ]}
                            /> */}

                            <View>
                              <TouchableOpacity
                                onPress={() => { this.setState({ selected_occupation: [] }) }}
                                //onPress={() => this.workbutton1()}
                                // disabled={this.state.female}
                                style={
                                  styles.activebtnStyle

                                }>
                                <Text
                                  style={[
                                    styles.head,
                                    this.state.button1 ? styles.active : styles.active,
                                  ]}>
                                  RESET

                                    </Text>
                              </TouchableOpacity>
                            </View>

                            <SelectMultiple
                              items={occupation}
                              selectedItems={selected_occupation}
                              onSelectionsChange={this.onSelectedItemsChange6} />
                          </MaterialDialog>
                        </TouchableOpacity>
                        {/* <View>
                          {this.multiSelect6 &&
                            this.multiSelect6.getSelectedItemsExt(
                              selected_occupation,
                            )}
                        </View> */}
                      </View>
                    </View>

                    <View>
                      <Text style={styles.title}>Work Country</Text>
                      <View >
                        <RNPickerSelect
                          placeholder={{
                            label: '',
                            value: null,

                          }}
                          items={country}
                          onValueChange={(value) => {
                            this.setState({ selected_country: value });
                          }}
                          useNativeAndroidPickerStyle={false}
                          //style={pickerStyle}
                          style={pickerSelectStyles}
                          value={selected_country}
                        />
                        {/* <MultiSelect
                    hideTags={true}
                    items={country}
                    uniqueKey="id"
                    ref={(component) => { this.multiSelect3 = component }}
                    onSelectedItemsChange={this.onSelectedItemsChange3}
                    selectedItems={selected_country}
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
                    searchInputStyle={{ color: '#CCC' }}
                    submitButtonColor={colors.primary}
                    submitButtonText="Submit"
                    styleSelectorContainer={{ backgroundColor: '#F0F0F0' }}
                    styleDropdownMenuSubsection={[styles.pickersty, { paddingLeft: 17 }]}
                  />
                  <View>
                    {this.multiSelect3 && this.multiSelect3.getSelectedItemsExt(selected_country)}
                  </View> */}
                      </View>
                    </View>

                    {selected_country == 'IN' ? (
                      <View>
                        {/* <View>
                          <Text style={styles.title}>Work State</Text>
                          <View>
                            <TouchableOpacity
                              onPress={() => {
                                this.setState({ visible_state: true });
                              }}>
                              <View style={[styles.pickerstyle]}>
                                <Text>Choose </Text>
                              </View>
                              <MaterialDialog
                                title="Select Work State"
                                visible={this.state.visible_state}
                                // onOk={() => this.setState({ visible: false })}
                                onCancel={() =>
                                  this.setState({ visible_state: false })
                                }>
                                <MultiSelect
                                  hideTags={true}
                                  fixedHeight={true}
                                  items={states}
                                  uniqueKey="id"
                                  ref={(component) => {
                                    this.multiSelect4 = component;
                                  }}
                                  onSelectedItemsChange={
                                    this.onSelectedItemsChange4
                                  }
                                  selectedItems={selected_states}
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
                                  searchInputStyle={{ color: '#CCC' }}
                                  submitButtonColor={colors.primary}
                                  submitButtonText="Submit"
                                  styleSelectorContainer={{
                                    backgroundColor: '#F0F0F0',
                                  }}
                                  styleDropdownMenuSubsection={[
                                    styles.pickersty,
                                    { paddingLeft: 17 },
                                  ]}
                                />
                              </MaterialDialog>
                            </TouchableOpacity>
                            <View>
                              {this.multiSelect4 &&
                                this.multiSelect4.getSelectedItemsExt(
                                  selected_states,
                                )}
                            </View>
                          </View>
                        </View> */}


                        <View>
                          <Text style={styles.title}>Work State</Text>
                          <View>
                            <TouchableOpacity
                              onPress={() => {
                                this.setState({ visible_states: true });
                              }}>
                              <View style={[styles.pickerstyle]}>
                                {selected_states.length == 0 ? <Text>Choose </Text> : <Text>{selected_states[0].label} and {selected_states.length - 1} more</Text>}

                              </View>
                              <MaterialDialog
                                title="Select Work States"
                                visible={this.state.visible_states}
                                onOk={() => this.setState({ visible: false })}
                                onCancel={() => this.setState({ visible_states: false })}>
                                <View>
                                  <TouchableOpacity
                                    onPress={() => { this.setState({ selected_states: [] }) }}
                                    //onPress={() => this.workbutton1()}
                                    // disabled={this.state.female}
                                    style={
                                      styles.activebtnStyle

                                    }>
                                    <Text
                                      style={[
                                        styles.head,
                                        this.state.button1 ? styles.active : styles.active,
                                      ]}>

                                      RESET
                                    </Text>
                                  </TouchableOpacity>
                                </View>


                                <SelectMultiple
                                  items={states}
                                  selectedItems={selected_states}
                                  onSelectionsChange={this.onSelectedItemsChange4} />



                              </MaterialDialog>
                            </TouchableOpacity>
                          </View>
                        </View>


                        {/* //////////////////////////////////////////// */}
                        <View>
                          <Text style={styles.title}>Work City</Text>
                          <View>
                            <TouchableOpacity
                              onPress={() => {
                                this.setState({ visible_city: true });
                              }}>
                              <View style={[styles.pickerstyle]}>
                                {selected_city.length == 0 ? <Text>Choose </Text> : <Text>{selected_city[0].label} and {selected_city.length - 1} more</Text>}

                              </View>
                              <MaterialDialog
                                title="Select Work City"
                                visible={this.state.visible_city}
                                // onOk={() => this.setState({ visible: false })}
                                onCancel={() => this.setState({ visible_city: false })}>
                                <View>
                                  <TouchableOpacity
                                    onPress={() => { this.setState({ selected_city: [] }) }}
                                    //onPress={() => this.workbutton1()}
                                    // disabled={this.state.female}
                                    style={
                                      styles.activebtnStyle

                                    }>
                                    <Text
                                      style={[
                                        styles.head,
                                        this.state.button1 ? styles.active : styles.active,
                                      ]}>
                                      RESET
                                    </Text>
                                  </TouchableOpacity>
                                </View>


                                <SelectMultiple
                                  items={city}
                                  selectedItems={selected_city}
                                  onSelectionsChange={this.onSelectedItemsChange5} />

                              </MaterialDialog>
                            </TouchableOpacity>
                          </View>
                        </View>

                        {/* <View>
                          <Text style={styles.title}>Work City </Text>

                          <View>
                            <TouchableOpacity
                              onPress={() => {
                                this.setState({ visible_city: true });
                              }}>
                              <View style={[styles.pickerstyle]}>
                                <Text>Choose </Text>
                              </View>
                              <MaterialDialog
                                title="Select Work city"
                                visible={this.state.visible_city}
                                // onOk={() => this.setState({ visible: false })}
                                onCancel={() =>
                                  this.setState({ visible_city: false })
                                }>
                                <MultiSelect
                                  hideTags={true}
                                  items={city}
                                  uniqueKey="id"
                                  ref={(component) => {
                                    this.multiSelect5 = component;
                                  }}
                                  onSelectedItemsChange={
                                    this.onSelectedItemsChange5
                                  }
                                  selectedItems={selected_city}
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
                                  searchInputStyle={{ color: '#CCC' }}
                                  submitButtonColor={colors.primary}
                                  submitButtonText="Submit"
                                  styleSelectorContainer={{
                                    backgroundColor: '#F0F0F0',
                                  }}
                                  styleDropdownMenuSubsection={[
                                    styles.pickersty,
                                    { paddingLeft: 17 },
                                  ]}
                                />
                              </MaterialDialog>

                            </TouchableOpacity>

                            <View>
                              {this.multiSelect5 &&
                                this.multiSelect5.getSelectedItemsExt(
                                  selected_city,
                                )}
                            </View>
                          </View>
                        </View> */}


                      </View>

                    ) : null}
                  </View>

                </View>
              ) : null}
              <Button></Button>
              <Text></Text>
              <View>
                <TouchableOpacity
                  onPress={() => this.searchbtn()}
                  style={styles.TouchableOpacityStyle}>
                  <Text style={[styles.title, { color: '#fff' }]}>Search</Text>
                </TouchableOpacity>
              </View>

            </ScrollView>

          </View>


        </ScrollView>

      </Container >
    );
  }
}
const pickerStyle = {
  inputIOS: {
    color: '#000',
    fontFamily: fontfamily.roboto,
    fontSize: fontsize.subtitle,
  },
  inputAndroid: {
    color: '#000',

    fontFamily: fontfamily.roboto,
    fontSize: fontsize.subtitle,
    borderColor: 'purple',
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
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

