import React, { Component } from 'react';
import { View, Text, ActivityIndicator,TouchableOpacity,Image } from 'react-native';
import {images} from '../globalstyles/Style';
import Icon from 'react-native-vector-icons/FontAwesome';
import SmartGallery from "react-native-smart-gallery";
import styles from './Style';
export default class DemoGallery extends Component {

    constructor (props) {
        super(props);
        this.state = {
            index: 0,
            images: []
        };
        this.onChangeImage = this.onChangeImage.bind(this);
    }


    UNSAFE_componentWillMount(){
      const { navigation } = this.props;  
      const images = navigation.getParam('images');
      console.log('images',images,'images')
     this.setState({images:images})
    }  

    onChangeImage (index) {
        this.setState({ index });
    }

    renderError () {
        return (
            <View style={{ flex: 1, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center' }}>
                 <Text style={{ color: 'white', fontSize: 15, fontStyle: 'italic' }}>This image cannot be displayed...</Text>
                 <Text style={{ color: 'white', fontSize: 15, fontStyle: 'italic' }}>... but this is fine :)</Text>
            </View>
        );
    }

    get caption () {
        const { images, index } = this.state;
        return (
            <View style={{ bottom: 0, height: 65, backgroundColor: 'rgba(0, 0, 0, 0.7)', width: '100%', position: 'absolute', justifyContent: 'center' }}>
                <Text style={{ textAlign: 'center', color: 'white', fontSize: 15, fontStyle: 'italic' }}>{ (images[index] && images[index].description) || '' } </Text>
            </View>
        );
    }

    get galleryCount () {
        const { index, images } = this.state;
        return (
            <View style={{ top: 0, height: 65, 
             width: '100%', position: 'absolute', justifyContent: 'space-between',flexDirection:'row',margin:20 }}>
               <TouchableOpacity activeOpacity={0.5} 
                onPress={() => this.props.navigation.goBack()}>
                   <Icon name="chevron-left" color="#fff"  size={20} style={{paddingTop:20}}/>
                </TouchableOpacity>
                <Text style={[styles.inputStyle,{color:'#fff',padding:20, paddingRight:40 }]}>
                 {images.length != 0 ? index + 1  +'/' + images.length  : ''}</Text>
            </View>
        );
    }

    render () {
        return (
            <View style={{ flex: 1 }} >
               
                 <SmartGallery
                    style={{ flex: 1, backgroundColor: "#000" }}
                    onPageSelected={this.onChangeImage}
                    images={this.state.images}
                    resizeMode="contain"
                />
                { this.galleryCount }
                {/* { this.caption } */}
            </View>
        );
    }
}