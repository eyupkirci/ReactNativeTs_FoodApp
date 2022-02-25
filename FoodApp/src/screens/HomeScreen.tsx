import React from 'react';
import { View, Text, StyleSheet,Dimensions, Image } from 'react-native';


import {onUpdateLocation, UserState, ApplicationState, ShoppingState} from '../redux'
import { connect } from 'react-redux';

interface HomeProps {
    userReducer: UserState,
    onAvailability: Function, 
    shoppingReducer:ShoppingState,
    onUpdateLocation: Function
  }

export const _HomeScreen : React.FC<HomeProps> = (props) => {
    const {location} = props.userReducer
    const {postcode} = props.userReducer

    return (

        <View style={styles.container}>
            <View style={styles.navigation}>
                <Text>{location}</Text>
            </View>

            <View style={styles.body}>
                <Text>HomeScreen</Text>
            </View>

            <View style={styles.footer}>
                <Text>footer</Text>
            </View>


        </View>

    )


}

const mapToStateProps = (state: ApplicationState) => ({
    userReducer: state.userReducer,
    shoppingReducer:state.shoppingReducer
  })
  
  const HomeScreen = connect(mapToStateProps, {onUpdateLocation})(_HomeScreen)
  
  export { HomeScreen }

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'green'
    },

    navigation: {
        flex:2,
        backgroundColor:'red'
    },
    body: {
        flex:9,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'yellow'

    },

    footer: {
        flex:1,
        backgroundColor:'cyan'
    }
})