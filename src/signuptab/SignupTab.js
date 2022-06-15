import React from 'react';
import { Dimensions, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { fontfamily, fontsize, images, colors } from '../globalstyles/Style'
import Signup from '../signup/Signup';
import Chat from '../signup/Chat';
import Edit_profile from '../signup/Edit_profile';
import Account from '../signup/Account';
import Help from '../signup/Help';
import Delete_profile from '../signup/Delete_profile';
import Search_result from '../signup/Search_result';
import Searching from '../signup/Searching';
import { Image } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import Recived from '../signup/Recived';
import Declined from '../signup/Declined';
import PhotoUpload from '../signup/PhotoUpload';
import Saved from '../signup/Saved';
import Policy from '../signup/Policy';
import Video from '../signup/Video';
import Contact from '../signup/Contact';
import Sent from '../signup/Sent';
import Accepted from '../signup/Accepted';
import Matched from '../signup/Matched';
import Galary from '../signup/Galary';
import InterestProfileView from '../signup/InterestProfileView';
import FullProfileView from '../signup/FullProfileView';
import ChoosePlan from '../chooseplan/ChoosePlan';
import Profile from '../profile/Profile'
//import Login from '../login/Login';
import Payment_success from '../chooseplan/Payment_success';
import PaymentMethod from '../chooseplan/PaymentMethod';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createDrawerNavigator } from "react-navigation-drawer";
import Notification from '../notification/Notification';
import Sidebarmenu from '../drawer/Sidebarmenu';
import ChattingScreen from '../signup/ChattingScreen';
import Search_BrideGroom from '../searchBrideGroom/Search_BrideGroom';
import Setting from '../setting/Setting';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import Personal from '../profile/Personal';

// import {NavigationContainer} from '@react-navigation/native';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import {createStackNavigator} from '@react-navigation/stack';


// const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();


// function HomeStack() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="ChoosePlan" component={ChoosePlan} 
//       options={{
//         headerShown:false
//       }}/>
//       <Stack.Screen name="PaymentMethod" component={PaymentMethod}
//        options={{
//         headerShown:false
//       }} />


//     </Stack.Navigator>
//   );
// }

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator  initialRouteName="Signup"
//         tabBarOptions={{
//           activeTintColor: '#E75935',
//           inactiveTintColor:'#000' ,
//           labelStyle: {
//               fontSize: fontsize.label,
//               fontFamily: fontfamily.regular,
//               textTransform: 'capitalize',
//                marginTop:-15,
//               height:35
//           },
//           indicatorStyle: {
//             borderBottomColor: 'red',
//             borderBottomWidth: 2,
//             }
//         }}>
//         <Tab.Screen name="Signup" component={Signup}
//         options={{
//           tabBarLabel: 'Home',
//           tabBarIcon: ({ color }) => (
//             <Image source={images.home} tintColor={color} style={{width:20,height:20}}/>
//           ),
//         }}  />
//         <Tab.Screen name="Chat" component={Chat}
//          options={{
//           tabBarLabel: 'Chats',
//           tabBarIcon: ({ color }) => (
//               <Image source={images.chat} tintColor={color} style={{width:20,height:20}}/>
//             )
//         }}  />
//         <Tab.Screen name="Subscription" component={HomeStack} options={{tabBarVisible: false,
//          tabBarLabel: 'Subscription',
//          tabBarIcon: ({ color }) => (
//              <Image source={images.king} tintColor={color} style={{width:20,height:20}}/>
//            )}} />
//         <Tab.Screen name="Search" component={Search} 
//          options={{
//           tabBarLabel: 'Search',
//           tabBarIcon: ({ color }) => (
//               <Image source={images.loupe} tintColor={color} style={{width:20,height:20}}/>
//             )
//         }} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }



const ChoosePlanStack = createStackNavigator({
  ChoosePlan: {
    screen: ChoosePlan,
    navigationOptions: {
      headerShown: false,
    },
  },
  PaymentMethod: {
    screen: PaymentMethod,
    navigationOptions: {
      headerShown: false,
    },
  },
  Payment_success: {
    screen: Payment_success,
    navigationOptions: {
      headerShown: false,
    },
  },
})

const SearchStack = createStackNavigator({

  Searching: {
    screen: Searching,
    navigationOptions: {
      headerShown: false,
    },
  },
  Search_result: {
    screen: Search_result,
    navigationOptions: {
      headerShown: false,
    },
  },
})


const AppNavigator = createMaterialTopTabNavigator(
  {
    Signup: {
      screen: Signup,
      navigationOptions: {
        //  tabBarLabel: 'Home',
        tabBarLabel: ({ tintColor }) => (
          <Text numberOfLines={1} style={{
            fontSize: fontsize.label,
            fontFamily: fontfamily.roboto, color: tintColor,
            textTransform: 'capitalize',
          }}>Home</Text>),
        tabBarIcon: ({ tintColor }) => (
          <Image source={images.home} tintColor={tintColor} style={{ width: 20, height: 20 }} />
        )
      },
    },
    // Chat: {
    //   screen: Chat,
    //   navigationOptions: {
    //     // tabBarLabel: 'Chat',
    //     tabBarLabel: ({ tintColor }) => (
    //       <Text numberOfLines={1} style={{
    //         fontSize: fontsize.label,
    //         fontFamily: fontfamily.roboto, color: tintColor,
    //         textTransform: 'capitalize',
    //       }}>Chat</Text>),
    //     tabBarIcon: ({ tintColor }) => (
    //       <Image source={images.chat} tintColor={tintColor} style={{ width: 20, height: 20 }} />
    //     )
    //   },
    // },
    Subscription: {
      screen: ChoosePlanStack,
      navigationOptions: ({ navigation }) => ({
        //tabBarLabel: 'Subscription',
        tabBarLabel: ({ tintColor }) => (
          <Text numberOfLines={1} style={{
            fontSize: fontsize.label,
            fontFamily: fontfamily.roboto, color: tintColor,
            textTransform: 'capitalize',
          }}>Subscription</Text>),
        tabBarIcon: ({ tintColor }) => (
          <Image source={images.king} tintColor={tintColor} style={{ width: 20, height: 20 }} />
        ),
        tabBarVisible: false
      })
    },
    Search: {
      screen: SearchStack,
      navigationOptions: {
        // tabBarLabel: 'Search',
        tabBarLabel: ({ tintColor }) => (
          <Text numberOfLines={1} style={{
            fontSize: fontsize.label,
            fontFamily: fontfamily.roboto, color: tintColor,
            textTransform: 'capitalize',
          }}>Search</Text>),
        tabBarIcon: ({ tintColor }) => (
          <Image source={images.loupe} tintColor={tintColor} style={{ width: 20, height: 20 }} />
        )
      },
    },

  },

  {
    //initialRouteName: 'Signup',
    tabBarPosition: 'bottom',
    swipeEnabled: false,

    tabBarOptions: {
      activeTintColor: '#E75935',
      pressColor: '#E75935',
      inactiveTintColor: '#000',
      shifting: true,
      showIcon: true,
      showLabel: true,
      style: {
        backgroundColor: '#fff',
        //elevation:5,
        borderTopColor: '#ccc', borderTopWidth: 0.3
      },

      labelStyle: {
        fontSize: RFPercentage(2.0),
        fontFamily: fontfamily.roboto,
        textTransform: 'capitalize',
        marginTop: -3,
        //height:15
      },
      indicatorStyle: {
        borderBottomWidth: 3,
        borderBottomColor: '#E75935',
        //   marginHorizontal:10,
        width: '19%',
        top: 0,
        left: '3%',
        right: '3%'
      }
    },
  }
)

const BottomTabHelper = createStackNavigator({


  AppNavigator: {
    screen: AppNavigator,
    navigationOptions: {
      headerShown: false,
    },
  },
  ChoosePlan: {
    screen: ChoosePlan,
    navigationOptions: {
      headerShown: false,
    },
  },
  Policy: {
    screen: Policy,
    navigationOptions: {
      headerShown: false,
    },
  },
  Photo: {
    screen: PhotoUpload,
    navigationOptions: {
      headerShown: false,
    },
  },
  Contact: {
    screen: Contact,
    navigationOptions: {
      headerShown: false,
    },
  },
  Personald: {
    screen: Personal,
    navigationOptions: {
      headerShown: false,
    },
  },
  Video: {
    screen: Video,
    navigationOptions: {
      headerShown: false,
    },
  },
  Recived: {
    screen: Recived,
    navigationOptions: {
      headerShown: false,
    },
  },
  Sent: {
    screen: Sent,
    navigationOptions: {
      headerShown: false,
    },
  },
  Accepted: {
    screen: Accepted,
    navigationOptions: {
      headerShown: false,
    },
  },
  Galary: {
    screen: Galary,
    navigationOptions: {
      headerShown: false,
    },
  },
  Declined: {
    screen: Declined,
    navigationOptions: {
      headerShown: false,
    },
  },
  Saved: {
    screen: Saved,
    navigationOptions: {
      headerShown: false,
    },
  },
  Matched: {
    screen: Matched,
    navigationOptions: {
      headerShown: false,
    },
  },
  FullProfileView: {
    screen: FullProfileView,
    navigationOptions: {
      headerShown: false,
    },
  },
  Edit_profile: {
    screen: Edit_profile,
    navigationOptions: {
      headerShown: false,
    },
  },

  Account: {
    screen: Account,
    navigationOptions: {
      headerShown: false,
    },
  },
  Help: {
    screen: Help,
    navigationOptions: {
      headerShown: false,
    },
  },

  Delete_profile: {
    screen: Delete_profile,
    navigationOptions: {
      headerShown: false,
    },
  },
  InterestProfileView: {
    screen: InterestProfileView,
    navigationOptions: {
      headerShown: false,
    },
  },
  // this has been closed temporarily
  // Notification: {
  //   screen: Notification,
  //   navigationOptions: {
  //     headerShown: false,
  //   },
  // },
  ChattingScreen: {
    screen: ChattingScreen
  },

  Setting: {
    screen: Setting,
    navigationOptions: {
      headerShown: false,
    },
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      headerShown: false,
    },
  },
})


const dashboardStack = createDrawerNavigator({
  Dashboard: { screen: BottomTabHelper },

}, {
  contentComponent: Sidebarmenu,
  drawerWidth: Dimensions.get('window').width - 100,
  drawerPosition: 'left'
},
)

export default createAppContainer(dashboardStack);
