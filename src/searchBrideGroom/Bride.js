import React, { Component } from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import MultiSelect from 'react-native-multiple-select';
import styles from './Style';
import ScrollPicker from 'react-native-wheel-scroll-picker';
import {fontfamily,fontsize,colors} from '../globalstyles/Style';

export default class Groom extends Component {

    state = {
        dataSource:[
          { label: '23 yr', value: '23' },  { label: '24 yr', value: '24' },  { label: '24 yr', value: '24' },
          { label: '25 yr', value: '25' },  { label: '26 yr', value: '26' },  { label: '27 yr', value: '27' },
      ],
        dataSource1: [ { label: '26 yr', value: '26' },  { label: '27 yr', value: '27' },  { label: '28 yr', value: '28' },
        { label: '29 yr', value: '29' },  { label: '30 yr', value: '30' },  { label: '31 yr', value: '31' }],
        selectedItem:'24',
        selectedItem1:'27',
        minheight:[{ label: '5.1', value: '5.1' },  { label: '5.2', value: '5.2' },  { label: '5.3', value: '5.3' },
        { label: '5.4', value: '5.4' },  { label: '5.5', value: '5.5' }],
        selected_minheight: '5.3',
        maxheight:[{ label: '5.6', value: '5.6' },  { label: '5.7', value: '5.7' },  { label: '5.8', value: '5.8' },
        { label: '5.9', value: '5.9' },  { label: '5.10', value: '5.10' }],
        selected_maxheight: '5.7',
        items: [],
      ageMin: false,
      ageMax: false,
      heightMin: false,
      heightMax: false,
      selectedItems:[]
    }

  ageMin() {
    if (this.state.ageMin == false) {
      this.setState({ ageMin: true });
    } else {
      this.setState({ ageMin: false });
    }
}

  ageMax() {

    if (this.state.ageMax == false) {
      this.setState({ ageMax: true });
    } else {
      this.setState({ ageMax: false });
    }
  }

  heightMin(){
    if (this.state.heightMin == false) {
      this.setState({ heightMin: true });
    } else {
      this.setState({ heightMin: false });
    }
  }

  heightMax(){
    if (this.state.heightMax == false) {
      this.setState({ heightMax: true });
    } else {
      this.setState({ heightMax: false });
    }
  }

  onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems });
  // console.log('selected',this.multiSelect.getSelectedItemsExt(selectedItems))
 
  };

    render() {
      const {selectedItems} = this.state ;
        return (
                <View 
                // style={styles.container}
                >
                  <View>
                    <Text style={[styles.title, { marginTop: 15 }]}>Age</Text>

                    <View style={[styles.row, styles.border]}>
                     
                      <View style={[styles.wdh,styles.centercontent]}>
                          <TouchableOpacity onPress={()=> this.ageMin()}>
                          <Text style={styles.headinglabel}>Min:  <Text style={styles.heading}>{this.state.selectedItem} yr </Text></Text>
                          </TouchableOpacity>
                      </View>
                      
                      <View style={[styles.wdh, styles.centercontent]}>
                      <TouchableOpacity onPress={()=> this.ageMax()}>
                          <Text style={styles.headinglabel}>Max:  <Text style={styles.heading}>{this.state.selectedItem1} yr</Text></Text>
                     </TouchableOpacity>
                      </View>
                    </View>
                    <View style={[styles.row, ]}>
                    <View style={[styles.wdh,styles.centercontent]}>
                      {this.state.ageMin?(
             <ScrollPicker 
                  dataSource={['23','24','25','26']}
                  selectedIndex={1}
                  renderItem={(data, index, isSelected) => {}}
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
                ):null}
                  </View>
                  
                  <View style={[styles.wdh,styles.centercontent]}>
                  {this.state.ageMax?(
             <ScrollPicker 
                  dataSource={['26','27','28','29']}
                  selectedIndex={1}
                  renderItem={(data, index, isSelected) => {}}
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
                  ):null}
                  </View>
                </View>
                  </View>

                  <View>
                    <Text style={[styles.title, { marginTop: 15 }]}>Height</Text>

                    <View style={[styles.row, styles.border, ]}>
                      <View style={[styles.wdh, styles.centercontent]}>
                      <TouchableOpacity onPress={()=> this.heightMin()}>
                        <Text style={styles.headinglabel}>Min:   <Text style={styles.heading}>{this.state.selected_minheight}</Text></Text>
                     </TouchableOpacity>
                      </View>

                      <View style={[styles.wdh,styles.centercontent]}>
                        <View style={styles.row}>
                        <TouchableOpacity onPress={()=> this.heightMax()}>
                          <Text style={styles.headinglabel}>Max:  <Text style={styles.heading}>{this.state.selected_maxheight}</Text></Text>
                          </TouchableOpacity>
                        </View>
                    
                      </View>
                    </View>
                  
                    <View style={[styles.row,]}>
                    <View style={[styles.wdh,styles.centercontent]}>
                    {this.state.heightMin?(
                    <ScrollPicker 
                          dataSource={['5.1','5.2','5.3','5.4','5.5']}
                          selectedIndex={2}
                          renderItem={(data, index, isSelected) => {}}
                          onValueChange={(data, selectedIndex) => {
                            this.setState({ selected_minheight: data })
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
                    ):null}
                  </View>
                  
                  <View style={[styles.wdh,styles.centercontent]}>
                  {this.state.heightMax?(
                  <ScrollPicker 
                        dataSource={['5.6','5.7','5.8','5.9','5.10']}
                        selectedIndex={1}
                        renderItem={(data, index, isSelected) => {}}
                        onValueChange={(data, selectedIndex) => {
                          this.setState({ selected_maxheight: data })
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
                      ):null}
                  </View>
                </View>
                  </View> 

               <View style={{marginTop:30}}>
             
               <View>
                   <Text style={styles.title}>Marital Status</Text>
                   <View style={styles.pickersty}>
                  <RNPickerSelect
                        placeholder={{
                          label: 'Choose',
                          value: null,
                        }}
                        items={this.state.items}
                        onValueChange={(value) => {
                          this.setState({ favColor: value});
                        }}
                        useNativeAndroidPickerStyle={false} 
                        style={pickerStyle}
                        value={this.state.favColor}
                       
                      />
                      </View>
           
               </View>
                           
               <View>
                   <Text style={styles.title}>Mangal Doosham</Text>
                   <View style={styles.pickersty}>
                  <RNPickerSelect
                        placeholder={{
                          label: 'Choose',
                          value: null,
                        }}
                        items={this.state.items}
                        onValueChange={(value) => {
                          this.setState({ favColor: value});
                        }}
                        useNativeAndroidPickerStyle={false} 
                        style={pickerStyle}
                        value={this.state.favColor}
                     
                      />
                      </View>
           
               </View>
                           
               <View>
                   <Text style={styles.title}>Subcaste</Text>
                   <View 
                   //style={styles.pickersty}
                   >
                  {/* <RNPickerSelect
                        placeholder={{
                          label: 'Choose',
                          value: null,
                        }}
                        items={this.state.items}
                        onValueChange={(value) => {
                          this.setState({ favColor: value});
                        }}
                        useNativeAndroidPickerStyle={false} 
                        style={pickerStyle}
                        value={this.state.favColor}
                        /> */}
                        <MultiSelect  
                          hideTags = {true}
                          items={items}
                          uniqueKey="id"
                          ref={(component) => { this.multiSelect = component }}
                          onSelectedItemsChange={this.onSelectedItemsChange}
                          selectedItems={selectedItems}
                          selectText="Choose"
                          searchInputPlaceholderText="Search here..."
                          onChangeInput={ (text)=> console.log(text)}
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
                          styleSelectorContainer={{ backgroundColor:'#F0F0F0' }}
                          styleDropdownMenuSubsection={[styles.pickersty,{paddingLeft:17}]}
                        />
                        <View>
                           {this.multiSelect && this.multiSelect.getSelectedItemsExt(selectedItems)}
                        </View>
                      </View>
           
               </View>
                            
               <View>
                   <Text style={styles.title}>Family based from</Text>
                   <View 
                  //  style={styles.pickersty}
                   >
                     {/* <RNPickerSelect
                        placeholder={{
                          label: 'Choose',
                          value: null,
                        }}
                        items={this.state.items}
                        onValueChange={(value) => {
                          this.setState({ favColor: value});
                        }}
                        useNativeAndroidPickerStyle={false} 
                        style={pickerStyle}
                        value={this.state.favColor}
                       /> */}
                       <MultiSelect  
                          hideTags = {true}
                          items={items}
                          uniqueKey="id"
                          ref={(component) => { this.multiSelect = component }}
                          onSelectedItemsChange={this.onSelectedItemsChange}
                          selectedItems={selectedItems}
                          selectText="Choose"
                          searchInputPlaceholderText="Search here..."
                          onChangeInput={ (text)=> console.log(text)}
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
                          styleSelectorContainer={{ backgroundColor:'#F0F0F0' }}
                          styleDropdownMenuSubsection={[styles.pickersty,{paddingLeft:17}]}
                        />
                        <View>
                           {this.multiSelect && this.multiSelect.getSelectedItemsExt(selectedItems)}
                        </View>
                      </View>
           
               </View>
                        
               <View>
                   <Text style={styles.title}>Annual Income</Text>
                   <View style={styles.pickersty}>
                  <RNPickerSelect
                        placeholder={{
                          label: 'Choose',
                          value: null,
                        }}
                        items={this.state.items}
                        onValueChange={(value) => {
                          this.setState({ favColor: value});
                        }}
                        useNativeAndroidPickerStyle={false} 
                        style={pickerStyle}
                        value={this.state.favColor}
                       
                      />
                      </View>
           
               </View>
              
               <View>
                   <Text style={styles.title}>Educational Qualifications</Text>
                   <View style={styles.pickersty}>
                  <RNPickerSelect
                        placeholder={{
                          label: 'Choose',
                          value: null,
                        }}
                        items={this.state.items}
                        onValueChange={(value) => {
                          this.setState({ favColor: value});
                        }}
                        useNativeAndroidPickerStyle={false} 
                        style={pickerStyle}
                        value={this.state.favColor}
                      
                      />
                      </View>
           
               </View>
              
               <View>
                   <Text style={styles.title}>Occupation</Text>
                   <View style={styles.pickersty}>
                  <RNPickerSelect
                        placeholder={{
                          label: 'Choose',
                          value: null,
                        }}
                        items={this.state.items}
                        onValueChange={(value) => {
                          this.setState({ favColor: value});
                        }}
                        useNativeAndroidPickerStyle={false} 
                        style={pickerStyle}
                        value={this.state.favColor}
                      />
                      </View>
               </View>
              
               <View>
                   <Text style={styles.title}>Work Location Of Bride</Text>
                   <View 
                   //style={styles.pickersty}
                   >
                     {/* <RNPickerSelect
                        placeholder={{
                          label: 'Choose',
                          value: null,
                        }}
                        items={this.state.items}
                        onValueChange={(value) => {
                          this.setState({ favColor: value});
                        }}
                        useNativeAndroidPickerStyle={false} 
                        style={pickerStyle}
                        value={this.state.favColor}
                        /> */}
                         <MultiSelect  
                          hideTags = {true}
                          items={items}
                          uniqueKey="id"
                          ref={(component) => { this.multiSelect = component }}
                          onSelectedItemsChange={this.onSelectedItemsChange}
                          selectedItems={selectedItems}
                          selectText="Choose"
                          searchInputPlaceholderText="Search here..."
                          onChangeInput={ (text)=> console.log(text)}
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
                          styleSelectorContainer={{ backgroundColor:'#F0F0F0' }}
                          styleDropdownMenuSubsection={[styles.pickersty,{paddingLeft:17}]}
                        />
                        <View>
                           {this.multiSelect && this.multiSelect.getSelectedItemsExt(selectedItems)}
                        </View>

                      </View>
           
               </View>
              
                </View>  

            </View>
        )
    }
}

const pickerStyle = {
    inputIOS: {
      color: '#000',
      fontFamily: fontfamily.roboto,
      fontSize:fontsize.subtitle,
    },
    inputAndroid: {
      color: '#000',
      fontFamily: fontfamily.roboto,
      fontSize:fontsize.subtitle,
    },
    placeholder:{
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

  const items = [
  //   {
  //   id: 'Ondo',
  //   name: 'Ondo'
  // }, {
  //   id: 'Ogun',
  //   name: 'Ogun'
  // }, {
  //   id: 'Calabar',
  //   name: 'Calabar'
  // }, {
  //   id: 'Lagos',
  //   name: 'Lagos'
  // }, {
  //   id: 'Maiduguri',
  //   name: 'Maiduguri'
  // }, {
  //   id: 'Anambra',
  //   name: 'Anambra'
  // }, {
  //   id: 'Benue',
  //   name: 'Benue'
  // }, {
  //   id: 'Kaduna',
  //   name: 'Kaduna'
  // }, {
  //   id: 'Abuja',
  //   name: 'Abuja'
  //   }
  ];