import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';


interface RestaurantProps { }



const FoodDetailScreen: React.FC<RestaurantProps> = () => {


    return (
        <View style={styles.container}>
            <View style={styles.navigation}><Text >Navigation</Text></View>
            <View style={styles.body} >            </View>

            <View style={styles.footer} > <Text >Footer</Text></View>


        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F2F2F2"
    },
    navigation: {
        flex: 2,
        backgroundColor: "red"
    },
    body: {
        flex: 10,

        backgroundColor: "yellow"
    },
    footer: {
        fontSize: 1,
        backgroundColor: "cyan"
    },


})


export { FoodDetailScreen }