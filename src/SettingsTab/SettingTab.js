import React from 'react';
import {Text} from 'react-native';
// import Account from '../setting/Account';
import Privacy from '../setting/Privacy';
import Subscription from '../setting/Subscription';
import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import {fontsize,colors,fontfamily} from '../globalstyles/Style';

const AppNavigator = createMaterialTopTabNavigator({
    // Account: {
    //     screen: Account,
    //     navigationOptions: {
    //        // tabBarLabel: 'Account',
    //         tabBarLabel:  ({ tintColor }) => (
    //             <Text numberOfLines={1} style={{  fontSize: fontsize.subtitle,
    //                fontFamily: fontfamily.roboto, color: tintColor,
    //                textTransform: 'capitalize',}}>Account</Text>),
    //     },
    // },
   
    Subscription: {
        screen: Subscription,
        navigationOptions: {
           // tabBarLabel: 'Subscription',
            tabBarLabel:  ({ tintColor }) => (
                <Text numberOfLines={1} style={{  fontSize: fontsize.subtitle,
                   fontFamily: fontfamily.roboto, color: tintColor,
                   textTransform: 'capitalize',}}>Subscription</Text>),
        },
    },
    Privacy: {
        screen: Privacy,
        navigationOptions: {
            // tabBarLabel: 'Privacy',
            tabBarLabel:  ({ tintColor }) => (
                <Text numberOfLines={1} style={{  fontSize: fontsize.subtitle,
                   fontFamily: fontfamily.roboto, color: tintColor,
                   textTransform: 'capitalize',}}>Contact Viewed</Text>),
        },
    },
},{
    initialRouteName: 'Subscription',
    tabBarPosition: 'top',
    swipeEnabled: true,

    tabBarOptions: {
        activeTintColor: '#E75935',
        pressColor: '#E75935',
        inactiveTintColor: '#000',
        shifting: true,
        showIcon: false,
        showLabel: true,
        style: {
            backgroundColor: '#fff',
            // elevation:5
            // borderBottomColor:'#ccc',
            // borderBottomWidth: 0.3
        },

        labelStyle: {
            fontSize: fontsize.subtitle,
            fontFamily: fontfamily.roboto,
            textTransform: 'capitalize',
             //marginTop:-15,
           //  height:32,

        },
        indicatorStyle: {
            borderBottomWidth: 3,
            borderBottomColor: '#E75935',
        //    marginHorizontal:10,
        //    width:'30%',
        //    left:10,
        //    right:10
        }
    },
})

export default createAppContainer(AppNavigator);  