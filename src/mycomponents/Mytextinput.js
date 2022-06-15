// Custom TextInput

import React from 'react';
import { View, TextInput,StyleSheet } from 'react-native';
import { fontsize, fontfamily } from '../globalstyles/Style';

const Mytextinput = (props) => {
  return (
    <View
      style={{
        height:48,
        borderColor: '#F0F0F0',
        borderWidth: 1,
        borderRadius:4,
       // borderBottomRightRadius:4,
        backgroundColor:'#F0F0F0',
        paddingHorizontal:15
      }}>
      <TextInput  
        underlineColorAndroid="transparent"
        placeholder={props.placeholder}
        placeholderTextColor= 'rgba(32, 32, 32, 0.7)'
        keyboardType={props.keyboardType}
        onChangeText={props.onChangeText}
        returnKeyType={props.returnKeyType}
        numberOfLines={props.numberOfLines}
        multiline={props.multiline}
        onSubmitEditing={props.onSubmitEditing}
        style={props.style}
        blurOnSubmit={false}
        value={props.value}
        maxLength={props.maxLength}
      />
    </View>
  );
};

export default Mytextinput;