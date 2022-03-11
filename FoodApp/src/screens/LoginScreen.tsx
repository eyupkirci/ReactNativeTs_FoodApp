import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import { TextField } from '../components/TextField';


interface LoginProps {
placeholder: string
}



const LoginScreen: React.FC<LoginProps> = () => {


    return (
        <View style={styles.container}>

            <TextField placeholder='Login'/>

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


export { LoginScreen }