import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import Splash_screen from './src/splash/Splash_screen';
import ProfileTab from './src/profiletab/ProfileTab';
import Login from './src/login/Login';
import Language from './src/language/Language';
import Intro_vdo from './src/introvdo/Intro_vdo';
import Profile from './src/profile/Profile';
import Personal from './src/profile/Personal';
import Astro from './src/profile/Astro';
import Career from './src/profile/Career';
import Family from './src/profile/Family';
import Createprofilevdo from './src/createprofileguidevdo/Createprofilevdo';
import SignupTab from './src/signuptab/SignupTab';
import Search_BrideGroom from './src/searchBrideGroom/Search_BrideGroom';


const Main = createStackNavigator({
  SignupTab: {
    screen: SignupTab,
    navigationOptions: {
      headerShown: false,
    },
  },
  LoginScreen: {
    screen: Login,
    navigationOptions: {
      headerShown: false,
    },
  },

  LanguageScreen: {
    screen: Language,
    navigationOptions: {
      headerShown: false,
    },
  },


  Intro_vdo: {
    screen: Intro_vdo,
    navigationOptions: {
      headerShown: false,
    },
  },
  Createprofilevdo: {
    screen: Createprofilevdo,
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

  Family: {
    screen: Family,
    navigationOptions: {
      headerShown: false,
    }
  },
  Astro: {
    screen: Astro,
    navigationOptions: {
      headerShown: false,
    }
  },
  Personal: {
    screen: Personal,
    navigationOptions: {
      headerShown: false,
    }
  },
  Career: {
    screen: Career,
    navigationOptions: {
      headerShown: false,
    }
  },

  ProfileTab: {
    screen: ProfileTab,
    navigationOptions: {
      headerShown: false,
    },
  },

  Search_BrideGroom: {
    screen: Search_BrideGroom,
    navigationOptions: {
      headerShown: false,
    },
  },


});

const Auth = createSwitchNavigator({
  Splash_screen: { screen: Splash_screen },
  Login: { screen: Login },
  Language: { screen: Language },
  Dashboard: { screen: Main },

  // SignupTab: {
  //   screen: SignupTab,
  //   navigationOptions: {
  //     headerShown: false,
  //   },
  // },
}, {
  initialRouteName: 'Splash_screen',
});

export default createAppContainer(Auth);

