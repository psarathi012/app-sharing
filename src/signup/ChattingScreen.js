import React,{Component} from 'react';
import {View,Text,Image,TouchableOpacity,TextInput,FlatList, ScrollView} from 'react-native';
import { colors, images,fontsize } from '../globalstyles/Style';
import styles from './Style';
import { Avatar } from 'react-native-elements';
import {Container} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';

const User = {
    phone: '',
    name: ''
}

 export default class ChattingScreen extends Component{
    state = {
        hide:true,
        show:false
    }
    static navigationOptions = ({ navigation }) => {
        return {
          title: <View style={{flexDirection:'row'}}>
                <View style={{marginTop:5}}>
               <Avatar rounded source={images.image1} />
               </View>
               <Text style={styles.headertitle}>Ram Rajput</Text>
          </View>,
          headerLeft:<TouchableOpacity activeOpacity={0.5} onPress={()=>navigation.goBack()}>
               <Image source={images.back} style={styles.headerLeft} /> 
               </TouchableOpacity>,
          headerRight:  <Image source={images.vertical_dots} style={styles.headerRight} />, 
        }
      }

      hide = () => {
        if(this.state.hide == true) {
            this.setState({hide: false})
        }
   }

   show = () => {
       if(this.state.show == false) {
           this.setState({show: true})
       }
  }

  showhidecomponent = () => {
       this.hide();
       this.show();
  }

      renderRow = ({item}) =>{
        return(
            <View>
                <View>
          <View style={styles.leftbox}>
         <Text style={styles.message}>{item.message}</Text>
          </View>
        <Text style={[styles.msgtime,{textAlign:'left'}]}>{item.time}</Text>
        </View>

        <View>
          <View style={styles.rightbox}>
         <Text style={styles.message}>{item.message}</Text>
          </View>
        <Text style={styles.msgtime}>{item.time}</Text>
        </View>
        </View>
        )
       }

    render(){
        const {show,hide} = this.state ;
        return(
            <Container style={{flex:1}}>
           
            {hide ? (
            <View style ={styles.center}>
                     <View style={styles.circle}>
                          <Image source={images.king} style={styles.king} tintColor={colors.primary} />
                    </View>
                         <Text style={[styles.title,{marginTop:10}]} adjustsFontSizeToFit>Only Paid member can use chat feature</Text>
                         <TouchableOpacity activeOpacity={0.5} style={{marginTop:25}} onPress={() => this.showhidecomponent()}>
                    <LinearGradient
                        start={{ x: 0.25, y: 1.25 }}
                        end={{ x: 0.5, y: 1.9 }}
                        locations={[0, 0, 1]}
                        colors={['#FC5C33', '#FC5C33', '#D61669']}
                        style={styles.linearbtn}>
                        <Text style={[styles.subheading, { color: '#fff' }]} adjustsFontSizeToFit>Upgrade membership</Text>
                    </LinearGradient>
                </TouchableOpacity>
                </View>
          ) : null}
               
               {show ? (
                   <ScrollView>
                <View style={[styles.content,{marginBottom:"25%"}]}>
                <FlatList 
                    data={messageList}
                    renderItem={this.renderRow}
                    keyExtractor={(item,index)=>index.toString()}/>
                </View>
                </ScrollView>
                 ) : null}
               
                <View style={styles.textinputcontainer}>
                <TextInput placeholder='Enter Message' style={styles.input}/>
                <Image source={images.lock} style={styles.iconlock} tintColor={'#8E8E8E'}/>
                </View>
           
            </Container>
        )
    }
} 


const messageList = [
    {message:'Lorem Ipsum is simply dummy text of the printing and typesetting industry', time:'12:00 pm'},
    {message:'Lorem Ipsum is simply dummy text of the printing and typesetting industry', time:'12:00 pm'},
  
]