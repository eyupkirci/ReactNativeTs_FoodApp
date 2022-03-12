import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { ButtonWithTitle } from '../components';
import { TextField } from '../components';
import { ApplicationState, onUserLogin, onUserSignup, UserState } from '../redux';


interface LoginProps {
    onUserLogin: Function;
    onUserSignup: Function;
    userReducer: UserState;
}



const _LoginScreen: React.FC<LoginProps> = ({ onUserLogin, onUserSignup, userReducer }) => {
    
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [title, setTitle] = useState('Login');
    const [isSignup, setIsSignup] = useState(false);

    const onTapOptions = () => {
        setIsSignup(!isSignup);
        setTitle(!isSignup? 'Signup':'Login')
    }

    const onTapAuthenticate = () => {
        if (isSignup) {    
            onUserSignup(email, phone, password);
        } else {
            onUserLogin(email, password);
        }
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.navigation}>
                <Text style={{fontSize:30}}>Login</Text>
            </View>
            <View style={styles.body}>
            
                {/* Inputs */}
                <TextField placeholder='Email' onTextChange={setEmail} />
                {isSignup&& <TextField placeholder='Phone' onTextChange={setPhone}/>}
                <TextField placeholder='Password' onTextChange={setPassword} isSecure={true} />
            
                {/* Buttons */}
                <ButtonWithTitle title={title} onTap={onTapAuthenticate} width={350} height={50} />
                <ButtonWithTitle title={isSignup ? 'No Account? Signup Here' : 'Have an Account? Login Here'} onTap={() => onTapOptions()} width={350} height={50} isNoBg={true}/>
            </View>

            <View style={styles.footer}></View>
            
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F2F2F2"
    },
    navigation: {
        flex: 1,
        paddingLeft: 50,
        paddingTop:50
    },
    body: {
        flex: 10,
        justifyContent: 'center',
        alignItems: "center",
    },
    footer: {
        flex: 1,
    },


})


const mapStateToProps = (state: ApplicationState) => ({
    userReducer: state.userReducer
})

const LoginScreen = connect(mapStateToProps, { onUserLogin, onUserSignup })(_LoginScreen)

export { LoginScreen }