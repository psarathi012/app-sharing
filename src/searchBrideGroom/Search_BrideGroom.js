import React, { Component } from 'react';
import { View, Text, StatusBar, Image, ScrollView, TouchableOpacity, Picker, AsyncStorage, ActivityIndicator } from 'react-native';
import { Container } from 'native-base';
import styles from './Style';
import { images } from '../globalstyles/Style';
import { SearchBar } from 'react-native-elements';
import BrideGroom_Tab from './BrideGroom_Tab';
import ScrollPicker from 'react-native-wheel-scroll-picker';
import RNPickerSelect from 'react-native-picker-select';
import { fontfamily, fontsize, colors } from '../globalstyles/Style';
// import AsyncStorage from '@react-native-community/async-storage';
import { URL } from '../constant/Constant';
import MultiSelect from 'react-native-multiple-select';
import { myToken } from '../token/Token';


export default class Search_BrideGroom extends Component {
  state = {
    search: '', loading: true,
    groomBtn: true,
    brideBtn: false,
    iscolor: true,
    iscolor1: false,
    dataSource: [], surname: [], selected_surname: [], familyfrom: [], selected_familyfrom: [],
    dataSource1: [], selected_occupation: [], occupation: [], selected_minIncome: '', minIncome: [],
    selectedItem: '18', selected_maxIncome: '', maxIncome: [], selected_country: '', country: [],
    selectedItem1: '40', selected_state: [], state: [], selected_city: [], city: [], selected_states: [],
    minheight: [],
    selected_minheight: "4'1",
    maxheight: [],
    selected_maxheight: "5'0",
    items: [], surname: [], citydatajson: [],
    ageMin: false,
    ageMax: false,
    heightMin: false,
    heightMax: false,
    selectedItems: [],
    marital: [],
    selectedMarital: '',
    manglikDetails: [],
    selectedmanglikDetails: '',
    qualification: [],
    selectedqualification: [],
    selectedGender: 'male'
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
      selectedGender: 'male'
    })
  }

  ageMin() {
    if (this.state.ageMin == false) {
      this.setState({ ageMin: true, ageMax: false, heightMin: false, heightMax: false });
    } else {
      this.setState({ ageMin: false });
    }
  }

  ageMax() {

    if (this.state.ageMax == false) {
      this.setState({ ageMax: true, heightMin: false, heightMax: false, ageMin: false });
    } else {
      this.setState({ ageMax: false });
    }
  }

  heightMin() {
    if (this.state.heightMin == false) {
      this.setState({ heightMin: true, heightMax: false, ageMin: false, ageMax: false });
    } else {
      this.setState({ heightMin: false });
    }
  }

  heightMax() {
    if (this.state.heightMax == false) {
      this.setState({ heightMax: true, ageMin: false, ageMax: false, heightMin: false });
    } else {
      this.setState({ heightMax: false });
    }
  }

  onSelectedItemsChange = selected_surname => {
    this.setState({ selected_surname });
  };

  onSelectedItemsChange1 = selected_familyfrom => {
    this.setState({ selected_familyfrom });
  };

  onSelectedItemsChange2 = selectedqualification => {
    this.setState({ selectedqualification });
  };

  onSelectedItemsChange3 = selected_country => {
    this.setState({ selected_country });
  };

  onSelectedItemsChange4 = selected_states => {
    let citydata = this.state.citydatajson

    let tempcity = [];
    for (let i = 0; i < selected_states.length; i++) {
      let selected_s = selected_states[i]
      let op = citydata[selected_s]
      let d = op.options

      for (let i = 0; i < d.length; i++) {
        let obj = {
          id: d[i].value,
          name: d[i].label,
        }
        tempcity.push(obj)
      }
    }

    this.setState({ selected_states, city: tempcity });
  };

  onSelectedItemsChange5 = selected_city => {
    this.setState({ selected_city });
  };

  onSelectedItemsChange6 = selected_occupation => {
    this.setState({ selected_occupation });
  };


  async SearchData() {
    const { selectedMarital, selectedmanglikDetails, selected_minheight, selected_maxheight, selectedItem, selectedItem1,
      selected_familyfrom, selected_occupation, selectedqualification, selected_country, selected_states,
      selected_city, selected_surname, selectedGender, search
    } = this.state;

    let params = {
      criteria: {
        gender: [selectedGender], maritalStatus: [selectedMarital],
        manglikDetails: [selectedmanglikDetails], minHeight: selected_minheight, maxHeight: selected_maxheight, minAge: selectedItem, maxAge: selectedItem1,
        occupation: selected_occupation, qualification: selectedqualification, familyState: selected_familyfrom,
        occupationCountry: [selected_country], occupationState: selected_states,
        occupationCity: selected_city, subCaste: selected_surname, displayId: [search]
      }
    }

    console.log('search params', params)

    fetch(URL + 'profile/search?page=0', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': await myToken(),
      },
      body: JSON.stringify(params)
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log('send data:', responseJson)
        this.setState({ searchData: responseJson })
        this.props.navigation.navigate('Search_result', { searchData: responseJson, params: params });
      })
      .catch(error => {
        console.error('Personal: something went wrong...', error);
      });
  }

  async profileData() {
    let idToken = await AsyncStorage.getItem('idToken', idToken);
    // console.log('groom', idToken);
    fetch(URL + 'profile/search/config', {
      method: 'GET',
      headers: {
        'Authorization': await myToken(),
      },
    })
      .then(response => response.json())
      .then(responseJson => {

        let manglikDetails = responseJson.manglikDetails.options
        let maritalStatusData = responseJson.maritalStatus.options
        let qualification = responseJson.qualification.options
        let minagedata = responseJson.minAge.options
        let maxagedata = responseJson.maxAge.options
        let minheightdata = responseJson.minHeight.options
        let maxheightdata = responseJson.maxHeight.options
        let subcaste = responseJson.subCaste.options
        let familyfrom = responseJson.familyOriginallyFromState.IN.options
        let minincome = responseJson.minIncome.options
        let maxincome = responseJson.maxIncome.options
        let country = responseJson.country.options
        let states = responseJson.state.IN.options
        let citydatajson = responseJson.city.IN
        let occupation = responseJson.occupation.options

        var tempminage = [], tempmaxage = [], tempoccupation = [], tempminheight = [], tempmaxheight = [], tempsubcaste = [], tempfamilyfrom = [], tempqualification = [], tempcountry = [], tempstates = []

        for (let i = 0; i < minagedata.length; i++) {
          let minage = []
          minage = minagedata[i].value,
            tempminage.push(minage);
        }

        for (let i = 0; i < maxagedata.length; i++) {
          let maxage = []
          maxage = maxagedata[i].value,
            tempmaxage.push(maxage);
        }

        for (let i = 0; i < minheightdata.length; i++) {
          let minheight = []
          minheight = minheightdata[i].label,
            tempminheight.push(minheight);
        }

        for (let i = 0; i < maxheightdata.length; i++) {
          let maxheight = []
          maxheight = maxheightdata[i].label,
            tempmaxheight.push(maxheight);
        }

        for (let i = 0; i < subcaste.length; i++) {
          let obj = {
            id: subcaste[i].value,
            name: subcaste[i].label,
          }
          tempsubcaste.push(obj)
        }

        for (let i = 0; i < familyfrom.length; i++) {
          let obj = {
            id: familyfrom[i].value,
            name: familyfrom[i].label,
          }
          tempfamilyfrom.push(obj)
        }

        for (let i = 0; i < qualification.length; i++) {
          let obj = {
            id: qualification[i].value,
            name: qualification[i].label,
          }
          tempqualification.push(obj)
        }

        for (let i = 0; i < country.length; i++) {
          let obj = {
            id: country[i].value,
            name: country[i].label,
          }
          tempcountry.push(obj)
        }

        for (let i = 0; i < states.length; i++) {
          let obj = {
            id: states[i].value,
            name: states[i].label,
          }
          tempstates.push(obj)
        }

        for (let i = 0; i < occupation.length; i++) {
          let obj = {
            id: occupation[i].value,
            name: occupation[i].label,
          }
          tempoccupation.push(obj)
        }

        this.setState({
          manglikDetails: manglikDetails, marital: maritalStatusData, qualification: tempqualification,
          dataSource: tempminage, dataSource1: tempmaxage, minheight: minheightdata, maxheight: maxheightdata,
          surname: tempsubcaste, familyfrom: tempfamilyfrom, minIncome: minincome, maxIncome: maxincome,
          selected_maxIncome: maxincome[maxincome.length - 1].value, country: country, selected_country: "IN",
          states: tempstates, citydatajson: citydatajson, occupation: tempoccupation, selected_minheight: minheightdata[0].value,
          selected_maxheight: maxheightdata[maxheightdata.length - 1].value, loading: false
        });
      })
      .catch(error => {
        console.error('profileData: something went wrong...', error);
      });
  }

  componentDidMount() {
    this.profileData();
    //this.SearchData();
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
      selectedGender: 'female'
    })
  }

  searchbtn() {
    this.SearchData();
  }

  render() {
    const { search } = this.state;
    const { selectedItems, selectedMarital, marital, selectedmanglikDetails, manglikDetails, qualification,
      selectedqualification, selected_surname, surname, selected_familyfrom, familyfrom, selected_occupation,
      occupation, selected_minIncome, minIncome, maxIncome, selected_maxIncome, selected_country, country,
      selected_states, states, selected_city, city, minheight, selected_minheight, maxheight, selected_maxheight } = this.state;

    if (this.state.loading) {
      return (
        <View style={styles.forindicator}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      );
    }

    return (
      <Container style={styles.container}>
        <StatusBar backgroundColor='#fff' barStyle='dark-content' />
        <ScrollView>
          <View style={[styles.content, { marginBottom: '15%' }]}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack(console.log('pressed'))}>
              <Image source={images.back} style={{ width: 15, height: 15, marginTop: '5%' }} />
            </TouchableOpacity>

            <View style={styles.row}>
              <Text style={styles.head}>Search</Text>
              <Text style={styles.createriatxt}>Save this Search</Text>
            </View>

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

            <View style={{ flexDirection: 'row', padding: 15, paddingBottom: 0 }}>
              <View style={[styles.wdh, styles.center]}>
                <TouchableOpacity onPress={() => this.Groombtn()}
                  style={this.state.iscolor ? styles.activebtnStyle : styles.btnStyle}>
                  <Text style={[styles.head, this.state.iscolor ? styles.active : null]}>Groom</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.wdh, styles.center]}>
                <TouchableOpacity onPress={() => this.Bridebtn()}
                  style={this.state.iscolor1 ? styles.activebtnStyle : styles.btnStyle}>
                  <Text style={[styles.head, this.state.iscolor1 ? styles.active : null]}>Bride</Text>
                </TouchableOpacity>
              </View>
            </View>

            {this.state.groomBtn ? (
              <View>
                <View>
                  {/* <Text style={[styles.title, { marginTop: 15 }]}>Age</Text> */}
                  <View style={[styles.row, { marginTop: 15 }]}>

                    <View style={[styles.wdh, { marginTop: '10%' }]}>
                      <TouchableOpacity onPress={() => this.ageMin()}>
                        <Text style={styles.title}>Min Age: {this.state.selectedItem} yr </Text>
                      </TouchableOpacity>
                    </View>

                    <View style={[styles.wdh]}>
                      <TouchableOpacity onPress={() => this.ageMax()}>
                        <Text style={styles.title}>Max Age: {this.state.selectedItem1} yr</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={[styles.row]}>
                    <View style={[styles.wdh, styles.centercontent]}>
                      {this.state.ageMin ? (
                        <ScrollPicker
                          dataSource={this.state.dataSource}
                          selectedIndex={1}
                          renderItem={(data, index, isSelected) => { }}
                          onValueChange={(data, selectedIndex) => {
                            this.setState({ selectedItem: data })
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

                    <View style={[styles.wdh, styles.centercontent]}>
                      {this.state.ageMax ? (
                        <ScrollPicker
                          dataSource={this.state.dataSource1}
                          selectedIndex={1}
                          renderItem={(data, index, isSelected) => { }}
                          onValueChange={(data, selectedIndex) => {
                            this.setState({ selectedItem1: data })
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
                      <MultiSelect
                        hideTags={true}
                        items={surname}
                        uniqueKey="id"
                        ref={(component) => { this.multiSelect = component }}
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
                        styleSelectorContainer={{ backgroundColor: '#F0F0F0' }}
                        styleDropdownMenuSubsection={[styles.pickersty, { paddingLeft: 17 }]}
                      />
                      <View>
                        {this.multiSelect && this.multiSelect.getSelectedItemsExt(selected_surname)}
                      </View>
                    </View>

                  </View>

                  <View>
                    <Text style={styles.title}>Family based out of</Text>
                    <View>
                      <MultiSelect
                        hideTags={true}
                        items={familyfrom}
                        uniqueKey="id"
                        ref={(component) => { this.multiSelect1 = component }}
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
                        styleSelectorContainer={{ backgroundColor: '#F0F0F0' }}
                        styleDropdownMenuSubsection={[styles.pickersty, { paddingLeft: 17 }]}
                      />
                      <View>
                        {this.multiSelect1 && this.multiSelect1.getSelectedItemsExt(selected_familyfrom)}
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
                      <MultiSelect
                        hideTags={true}
                        items={qualification}
                        uniqueKey="id"
                        ref={(component) => { this.multiSelect2 = component }}
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
                        {this.multiSelect2 && this.multiSelect2.getSelectedItemsExt(selectedqualification)}
                      </View>
                    </View>

                  </View>

                  <View>
                    <Text style={styles.title}>Occupation</Text>
                    <View>
                      <MultiSelect
                        hideTags={true}
                        items={occupation}
                        uniqueKey="id"
                        ref={(component) => { this.multiSelect6 = component }}
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
                        styleSelectorContainer={{ backgroundColor: '#F0F0F0' }}
                        styleDropdownMenuSubsection={[styles.pickersty, { paddingLeft: 17 }]}
                      />
                      <View>
                        {this.multiSelect6 && this.multiSelect6.getSelectedItemsExt(selected_occupation)}
                      </View>
                    </View>

                  </View>

                  <View>
                    <Text style={styles.title}>Work Country</Text>
                    <View style={styles.pickersty}>
                      <RNPickerSelect
                        placeholder={{
                          label: 'Choose',
                          value: null,
                        }}
                        items={country}
                        onValueChange={(value) => {
                          this.setState({ selected_country: value });
                        }}
                        useNativeAndroidPickerStyle={false}
                        style={pickerStyle}
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
                      <View>
                        <Text style={styles.title}>Work State</Text>
                        <View>
                          <MultiSelect
                            hideTags={true}
                            items={states}
                            uniqueKey="id"
                            ref={(component) => { this.multiSelect4 = component }}
                            onSelectedItemsChange={this.onSelectedItemsChange4}
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
                            styleSelectorContainer={{ backgroundColor: '#F0F0F0' }}
                            styleDropdownMenuSubsection={[styles.pickersty, { paddingLeft: 17 }]}
                          />
                          <View>
                            {this.multiSelect4 && this.multiSelect4.getSelectedItemsExt(selected_states)}
                          </View>
                        </View>
                      </View>

                      <View>
                        <Text style={styles.title}>Work City</Text>
                        <View>
                          <MultiSelect
                            hideTags={true}
                            items={city}
                            uniqueKey="id"
                            ref={(component) => { this.multiSelect5 = component }}
                            onSelectedItemsChange={this.onSelectedItemsChange5}
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
                            styleSelectorContainer={{ backgroundColor: '#F0F0F0' }}
                            styleDropdownMenuSubsection={[styles.pickersty, { paddingLeft: 17 }]}
                          />
                          <View>
                            {this.multiSelect5 && this.multiSelect5.getSelectedItemsExt(selected_city)}
                          </View>
                        </View>
                      </View>
                    </View>
                  ) : null}
                </View>
              </View>
            ) : null}

            {this.state.brideBtn ? (
              <View>
                <View>
                  {/* <Text style={[styles.title, { marginTop: 15 }]}>Age</Text> */}
                  <View style={[styles.row, { marginTop: 15 }]}>

                    <View style={[styles.wdh]}>
                      <TouchableOpacity onPress={() => this.ageMin()}>
                        <Text style={styles.title}>Min Age: {this.state.selectedItem} yr </Text>
                      </TouchableOpacity>
                    </View>

                    <View style={[styles.wdh]}>
                      <TouchableOpacity onPress={() => this.ageMax()}>
                        <Text style={styles.title}>Max Age: {this.state.selectedItem1} yr</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={[styles.row]}>
                    <View style={[styles.wdh, styles.centercontent]}>
                      {this.state.ageMin ? (
                        <ScrollPicker
                          dataSource={this.state.dataSource}
                          selectedIndex={1}
                          renderItem={(data, index, isSelected) => { }}
                          onValueChange={(data, selectedIndex) => {
                            this.setState({ selectedItem: data })
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

                    <View style={[styles.wdh, styles.centercontent]}>
                      {this.state.ageMax ? (
                        <ScrollPicker
                          dataSource={this.state.dataSource1}
                          selectedIndex={1}
                          renderItem={(data, index, isSelected) => { }}
                          onValueChange={(data, selectedIndex) => {
                            this.setState({ selectedItem1: data })
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
                      <MultiSelect
                        hideTags={true}
                        items={surname}
                        uniqueKey="id"
                        ref={(component) => { this.multiSelect = component }}
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
                        styleSelectorContainer={{ backgroundColor: '#F0F0F0' }}
                        styleDropdownMenuSubsection={[styles.pickersty, { paddingLeft: 17 }]}
                      />
                      <View>
                        {this.multiSelect && this.multiSelect.getSelectedItemsExt(selected_surname)}
                      </View>
                    </View>

                  </View>

                  <View>
                    <Text style={styles.title}>Family based out of</Text>
                    <View>
                      <MultiSelect
                        hideTags={true}
                        items={familyfrom}
                        uniqueKey="id"
                        ref={(component) => { this.multiSelect1 = component }}
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
                        styleSelectorContainer={{ backgroundColor: '#F0F0F0' }}
                        styleDropdownMenuSubsection={[styles.pickersty, { paddingLeft: 17 }]}
                      />
                      <View>
                        {this.multiSelect1 && this.multiSelect1.getSelectedItemsExt(selected_familyfrom)}
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
                      <MultiSelect
                        hideTags={true}
                        items={qualification}
                        uniqueKey="id"
                        ref={(component) => { this.multiSelect2 = component }}
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
                        {this.multiSelect2 && this.multiSelect2.getSelectedItemsExt(selectedqualification)}
                      </View>
                    </View>

                  </View>

                  <View>
                    <Text style={styles.title}>Occupation</Text>
                    <View>
                      <MultiSelect
                        hideTags={true}
                        items={occupation}
                        uniqueKey="id"
                        ref={(component) => { this.multiSelect6 = component }}
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
                        styleSelectorContainer={{ backgroundColor: '#F0F0F0' }}
                        styleDropdownMenuSubsection={[styles.pickersty, { paddingLeft: 17 }]}
                      />
                      <View>
                        {this.multiSelect6 && this.multiSelect6.getSelectedItemsExt(selected_occupation)}
                      </View>
                    </View>

                  </View>

                  <View>
                    <Text style={styles.title}>Work Country</Text>
                    <View style={styles.pickersty}>
                      <RNPickerSelect
                        placeholder={{
                          label: 'Choose',
                          value: null,
                        }}
                        items={country}
                        onValueChange={(value) => {
                          this.setState({ selected_country: value });
                        }}
                        useNativeAndroidPickerStyle={false}
                        style={pickerStyle}
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
                      <View>
                        <Text style={styles.title}>Work State</Text>
                        <View>
                          <MultiSelect
                            hideTags={true}
                            items={states}
                            uniqueKey="id"
                            ref={(component) => { this.multiSelect4 = component }}
                            onSelectedItemsChange={this.onSelectedItemsChange4}
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
                            styleSelectorContainer={{ backgroundColor: '#F0F0F0' }}
                            styleDropdownMenuSubsection={[styles.pickersty, { paddingLeft: 17 }]}
                          />
                          <View>
                            {this.multiSelect4 && this.multiSelect4.getSelectedItemsExt(selected_states)}
                          </View>
                        </View>
                      </View>

                      <View>
                        <Text style={styles.title}>Work City</Text>
                        <View>
                          <MultiSelect
                            hideTags={true}
                            items={city}
                            uniqueKey="id"
                            ref={(component) => { this.multiSelect5 = component }}
                            onSelectedItemsChange={this.onSelectedItemsChange5}
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
                            styleSelectorContainer={{ backgroundColor: '#F0F0F0' }}
                            styleDropdownMenuSubsection={[styles.pickersty, { paddingLeft: 17 }]}
                          />
                          <View>
                            {this.multiSelect5 && this.multiSelect5.getSelectedItemsExt(selected_city)}
                          </View>
                        </View>
                      </View>
                    </View>
                  ) : null}
                </View>
              </View>
            ) : null}

          </View>

        </ScrollView>

        <TouchableOpacity
          onPress={() => this.searchbtn()}
          style={styles.TouchableOpacityStyle}>

          <Text style={[styles.title, { color: '#fff' }]}>Search</Text>
        </TouchableOpacity>
      </Container>
    )
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
  },
  placeholder: {
    color: 'rgba(32, 32, 32, 0.6)'
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