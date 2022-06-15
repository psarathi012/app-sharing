import React from 'react';
import { Text, StyleSheet } from 'react-native'
import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { fontfamily, fontsize, colors } from '../globalstyles/Style'
import Personal from '../profile/Personal';
import Astro from '../profile/Astro';
import Career from '../profile/Career';
import Family from '../profile/Family';
import { createStackNavigator } from 'react-navigation-stack';
import SignupTab from '../signuptab/SignupTab';

const AppNavigator = createMaterialTopTabNavigator(
    {
        Personal: {
            screen: Personal,
            navigationOptions: {
                tabBarLabel: ({ tintColor }) => (
                    <Text numberOfLines={1} adjustsFontSizeToFit style={{
                        fontSize: fontsize.subtitle,
                        fontFamily: fontfamily.roboto, color: tintColor,
                        textTransform: 'capitalize',
                    }}>Personal</Text>),

            },
        },
        Astro: {
            screen: Astro,
            navigationOptions: {
                // tabBarLabel: 'Astro',
                tabBarLabel: ({ tintColor }) => (
                    <Text numberOfLines={1} adjustsFontSizeToFit style={{
                        fontSize: fontsize.subtitle,
                        fontFamily: fontfamily.roboto, color: tintColor,
                        textTransform: 'capitalize',
                    }}>Astro</Text>),
            },
        },
        Career: {
            screen: Career,
            navigationOptions: {
                // tabBarLabel: 'Career',
                tabBarLabel: ({ tintColor }) => (
                    <Text numberOfLines={1} adjustsFontSizeToFit style={{
                        fontSize: fontsize.subtitle,
                        fontFamily: fontfamily.roboto, color: tintColor,
                        textTransform: 'capitalize',
                    }}>Career</Text>),
            },
        },
        Family: {
            screen: Family,
            navigationOptions: {
                // tabBarLabel: 'Family',
                tabBarLabel: ({ tintColor }) => (
                    <Text numberOfLines={1} adjustsFontSizeToFit style={{
                        fontSize: fontsize.subtitle,
                        fontFamily: fontfamily.roboto, color: tintColor,
                        textTransform: 'capitalize',
                    }}>Family</Text>),
            },
        },

    },

    {
        initialRouteName: 'Personal',
        tabBarPosition: 'top',
        swipeEnabled: true,

        tabBarOptions: {
            activeTintColor: '#E75935',
            pressColor: '#E75935',
            inactiveTintColor: '#777',
            shifting: true,
            //   showIcon: true,
            showLabel: true,
            //  scrollEnabled:true,
            style: {
                backgroundColor: '#fff',
            },

            labelStyle: {
                fontSize: fontsize.subtitle,
                fontFamily: fontfamily.roboto,
                textTransform: 'capitalize',

                // marginTop:-5,
                //height:32
            },
            indicatorStyle: {
                borderBottomWidth: 3,
                borderBottomColor: '#E75935',
                marginHorizontal: 10,
                width: '20%'
            }
        },
    }
)


const BottomTabHelper = createStackNavigator({
    AppNavigator: {
        screen: AppNavigator,
        navigationOptions: {
            headerShown: false
        },
    },
    // SignupTab:{
    //     screen:SignupTab,
    //     navigationOptions:{
    //         headerShown:false
    //     },
    // },
})

export default createAppContainer(BottomTabHelper);
//export default createStackNavigator({ AppNavigator });