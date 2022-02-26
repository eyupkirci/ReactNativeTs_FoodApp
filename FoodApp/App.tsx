import React from 'react';
import { Image, StyleSheet } from 'react-native';
import {LandingScreen} from './src/screens/LandingScreen';
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { HomeScreen } from './src/screens/HomeScreen';

import {Provider} from 'react-redux'
import {store} from './src/redux'

import {useNavigation} from './src/utils'

const switchNavigator = createSwitchNavigator({

  landingStack: {
    screen: createStackNavigator({
      Landing: LandingScreen
    }, {
      defaultNavigationOptions: {
        headerShown: false
      }
    }) 
  },
  homeStack: createBottomTabNavigator({

    Home: {
      screen: createStackNavigator({
        HomePage: HomeScreen}
        
        ,{
      defaultNavigationOptions: {
        headerShown: false
      }
    }),
      
      navigationOptions: {
        tabBarIcon: ({focused, tintColor}) => {
          let icon = focused == true ? require('./src/images/home_icon.png') : require('./src/images/home_n_icon.png')
          return <Image source={icon} style={styles.tabIcon} />
        }
      }
    },

    Offer:{
      screen: createStackNavigator({
        HomePage: HomeScreen,
    }),
      
      navigationOptions: {
        tabBarIcon: ({focused, tintColor}) => {
          let icon = focused == true ? require('./src/images/home_icon.png') : require('./src/images/home_n_icon.png')
          return <Image source={icon} style={styles.tabIcon} />
        }
      }
    },

    Cart: {
      screen: createStackNavigator({
        HomePage: HomeScreen,
    }),
      
      navigationOptions: {
        tabBarIcon: ({focused, tintColor}) => {
          let icon = focused == true ? require('./src/images/home_icon.png') : require('./src/images/home_n_icon.png')
          return <Image source={icon} style={styles.tabIcon} />
        }
      }
    },

    Account: {
      screen: createStackNavigator({
        HomePage: HomeScreen,
    }),
      
      navigationOptions: {
        tabBarIcon: ({focused, tintColor}) => {
          let icon = focused == true ? require('./src/images/home_icon.png') : require('./src/images/home_n_icon.png')
          return <Image source={icon} style={styles.tabIcon} />
        }
      }
    },
  })
})


const AppNavigation = createAppContainer(switchNavigator)

const App = () => {
  return(
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  )
}

export default App;


const styles = StyleSheet.create({
  tabIcon: {
    width: 30,
    height: 30
  }
})