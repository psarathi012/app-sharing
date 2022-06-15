import React, { Component } from 'react';
import { Text, View, TouchableOpacity,Button, Image } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon_phone from 'react-native-vector-icons/FontAwesome';
import styles from './Style';
import {images} from '../globalstyles/Style';

export default class RadioButtons extends Component {
 
  state = {

  };

  render() {
    const { navigation } = this.props;  
    const razorpayOrderId = navigation.getParam('razorpayOrderId'); 
    return (
      <View style={[styles.content,{flex:1,backgroundColor:'#fff'}]}>
      <TouchableOpacity onPress={()=>this.props.navigation.navigate('Signup')} >
      <Image source={images.back} style={styles.backimg} tintColor='#000' />
  </TouchableOpacity>
      <View style={styles.forindicator}>
       
         <Icon name="checkcircle" size={150} color="green"/>
          <View style={{marginTop:"10%"}}>
         <Text style={[styles.heading,{color:'#777',fontSize:28}]}>Payment Successful</Text>
         <Text style={[styles.subtitle,{marginTop:-25,color:'#000'}]}>Order ID : {razorpayOrderId}</Text>
         </View>

         <View style={{marginTop:"10%"}}>
         {/* <Button title="Back to home" onPress={()=>this.props.navigation.navigate('Signup')} /> */}
          <TouchableOpacity style={styles.back_btn} onPress={()=>this.props.navigation.navigate('Signup')} > 
            <Text style={[styles.subtitle,{color:'#228be6',marginTop:-7}]}>Back to home</Text>
          </TouchableOpacity>
         </View>
         <View style={{marginTop:"10%"}}>
         <Text style={[styles.subtitle,{color:'#000'}]}>Please let us know if you're facing any issues</Text>
         <Text style={[styles.subtitle,{color:'#228be6'}]}><Icon_phone name="phone" size={18}/> 020-71968000</Text>
         </View>
      </View>
      </View>
    );
  }
}

