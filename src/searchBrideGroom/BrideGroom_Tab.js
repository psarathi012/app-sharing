import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import {fontfamily, fontsize} from '../globalstyles/Style'
import Bride from '../searchBrideGroom/Bride';
import Groom from '../searchBrideGroom/Groom';



const AppNavigator = createMaterialTopTabNavigator(
    {
        Groom: {
            screen: Groom,
            navigationOptions: {
                tabBarLabel: 'Groom',
            },
        },
        
        Bride: {
            screen: Bride,
            navigationOptions: {
                tabBarLabel: 'Bride',
            },
        },
       
   },

    {
        initialRouteName: 'Groom',
        tabBarPosition: 'top',
        swipeEnabled: false,

        tabBarOptions: {
            activeTintColor: '#fff',
           // pressColor: '#E75935',
            inactiveTintColor: '#000',
            shifting: true,
            showIcon: true,
            showLabel: true,
            //scrollEnabled: true,
            style: {
                backgroundColor: '#fff',
                elevation:0
            },

            labelStyle: {
                fontSize: fontsize.subtitle,
                fontFamily: fontfamily.roboto,
                textTransform: 'capitalize',
                marginTop:15,
              //  height:32
              
            },
            indicatorStyle: {
                height: '50%',
                backgroundColor: '#D61669',
                borderRadius:4,
                justifyContent:'center'
            }
        },
    }
)
export default createAppContainer(AppNavigator);  
