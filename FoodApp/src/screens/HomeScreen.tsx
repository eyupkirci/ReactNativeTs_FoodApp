import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, Alert, } from 'react-native';
import { ButtonWithIcon, CategoryCard, SearchBar } from '../components'
import { FlatList, ScrollView } from 'react-native-gesture-handler';

import { useNavigation } from '../utils';


import { onUpdateLocation, UserState, ApplicationState, ShoppingState, onAvailability } from '../redux'
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface HomeProps {
    userReducer: UserState,
    onAvailability: Function,
    shoppingReducer: ShoppingState,
    onUpdateLocation: Function,
}

export const _HomeScreen: React.FC<HomeProps> = (props) => {
    // console.log('availibility',props.onAvailability)
    const { location, postcode } = props.userReducer
    console.log('homescreen', postcode)
    const { availability } = props.shoppingReducer
    const { categories, foods, restaurants } = availability;
    // console.log(foods)
    const locationFromStorage = AsyncStorage.getItem("user_location")
    const postcodeFromStorage = AsyncStorage.getItem("user_location_postcode")

    const { navigate } = useNavigation()


    useEffect(() => {

        props.onAvailability(postcode)


    }, [])

    return (

        <View style={styles.container}>
            <View style={styles.navigation}>
                <View style={{ marginTop: 50, flex: 6, paddingRight: 20, paddingLeft: 20, backgroundColor: 'white' }}>
                    <Text >{location}</Text>
                    <Text >Edit</Text>

                </View>
                <View style={{ display: 'flex', justifyContent: 'space-around', flexDirection: 'row', alignItems: 'center', marginRight: 4 }}>
                    <SearchBar
                        didTouch={() => {
                            navigate('SearchPage')
                        }}
                        onTextChange={() => { }}
                        onEndEditing={() => { }} />
                    <ButtonWithIcon onTap={() => { }} icon={require('../images/hambar.png')} width={50} height={40} />
                </View>
            </View>


          



            <View style={styles.body}>
            <ScrollView>
            <FlatList 
                    horizontal
                    showsHorizontalScrollIndicator={false} 
                    data={categories} 
                    renderItem={({item}) => <CategoryCard item={item} onTap={() => {Alert.alert('Category Tapped')}} />} 
                    keyExtractor={(item) => `${item.id}`} />
            </ScrollView>
            </View>




            <View style={styles.footer}>
                <Text>footer</Text>
            </View>


        </View>

    )


}

const mapToStateProps = (state: ApplicationState) => ({
    userReducer: state.userReducer,
    shoppingReducer: state.shoppingReducer,
})

const HomeScreen = connect(mapToStateProps, { onAvailability})(_HomeScreen)

export { HomeScreen }




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    },

    navigation: {
        flex: 2,
    },
    body: {
        flex: 9,
        justifyContent: 'center',
        alignItems: 'center',

    },

    footer: {
        flex: 1,
    }
})