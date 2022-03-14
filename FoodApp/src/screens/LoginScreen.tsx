import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image} from 'react-native';
import { connect } from 'react-redux';
import { ButtonWithTitle } from '../components';
import { TextField } from '../components';
import { ApplicationState, onUserLogin, onUserSignup, UserState, onOTPRequest, onVerifyOTP } from '../redux';
import { useNavigation } from '../utils';

interface LoginProps {
    onUserLogin: Function;
    onUserSignup: Function;
    userReducer: UserState;
    onOTPRequest: Function;
    onVerifyOTP: Function;
}

const _LoginScreen: React.FC<LoginProps> = ({ onUserLogin, onUserSignup, userReducer,onOTPRequest, onVerifyOTP }) => {
    
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [title, setTitle] = useState('Login');
    const [isSignup, setIsSignup] = useState(false);
    const [verified, setVerified] = useState(true)
    const [otp, setOtp] = useState("")
    const [requestOtpTitle, setRequestOtpTitle] = useState("Request a new OTP in")
    const [canRequestOtp, setCanRequestOtp] = useState(false)
    const { user } = userReducer;
    const { navigate } = useNavigation();

    // for otp: 494949 for newrequest:595959
    // qweasd@qweqaz.com
    let countDown: NodeJS.Timer;

    useEffect(() => {

        if (user.verified !== undefined) {
            if (user.verified === true) {
                navigate('CartPage')
            } else {
                setVerified(user.verified);
                onEnableOtpRequest();
            }
        }


        return () => {
            clearInterval(countDown);
        }

    },[user])

    const onTapOptions = () => {
        setIsSignup(!isSignup);
        setTitle(!isSignup ? 'Signup' : 'Login')
    };

    useEffect(() => {
        console.log(userReducer.user)
    }, [user])

    const onTapAuthenticate = () => {
        if (isSignup) {
            console.log('onTopAuthenticate called Signup')
            onUserSignup(email, phone, password);
        } else {
            console.log('onTopAuthenticate called Login')
            onUserLogin(email, password);
        }
    };

    const onEnableOtpRequest = () => {
        const otpDate = new Date()
        otpDate.setTime(new Date().getTime() + (2 * 60 * 1000))
        const otpTime = otpDate.getTime();

        countDown = setInterval(function(){
            const currentTime = new Date().getTime();
            const totalTime = otpTime - currentTime;

            let minutes = Math.floor((totalTime % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((totalTime % (1000 * 60)) / 1000);

            setRequestOtpTitle(`Request a new OTP in ${minutes}:${seconds}`)


            // if(seconds < 10) {
            //     setRequestOtpTitle(`Request a new OTP in ${minutes}:0${seconds}`)
            // } else {
            //     setRequestOtpTitle(`Request a new OTP in ${minutes}:${seconds}`)
            // }

            if (minutes < 1 && seconds < 1) {
                setRequestOtpTitle("Request a new OTP")
                setCanRequestOtp(true)
                clearInterval(countDown)
            }

        },1000)
    }

    const onTapVerify = () => {
        console.log('onTopVerify Clicked');
        onVerifyOTP(otp, user)
    };

    const onTapRequestNewOTP = () => {
        setCanRequestOtp(false)
        onOTPRequest(user)
    };
     


    if (!verified) {

        return (
            <View style={styles.container}>
                <View style={styles.body}>

                    <Image source={require('../images/verify_otp.png')}
                        style={{ height: 120, width: 120, margin: 120 }} />
                     <Text style={{fontSize:22, fontWeight:'500', margin:10 }} >Verification</Text>
                    <Text style={{ fontSize: 16, padding: 10, marginTop:10, color:'#716F6F'}} >Enter your OTP sent to your mobile number</Text>
                    <TextField isOTP={true} placeholder='OTP' onTextChange={setOtp} isSecure={true}/>
                    <ButtonWithTitle title='Verify OTP' onTap={onTapVerify} width={340} height={50} />
                    <ButtonWithTitle disable={!canRequestOtp} title={requestOtpTitle} 
                    isNoBg={true} onTap={onTapRequestNewOTP} width={340} height={50} />                    
                
                 </View>
    
                <View style={styles.footer}></View>
                
            </View>
        );
        
    } else {
        
        return (
            <View style={styles.container}>
                <View style={styles.navigation}>
                    <Text style={{ fontSize: 30 }}>Login</Text>
                </View>
                <View style={styles.body}>
                
                    {/* Inputs */}
                    <TextField placeholder='Email' onTextChange={setEmail} />
                    {isSignup && <TextField placeholder='Phone' onTextChange={setPhone} />}
                    <TextField placeholder='Password' onTextChange={setPassword} isSecure={true} />
                
                    {/* Buttons */}
                    <ButtonWithTitle title={title} onTap={onTapAuthenticate} width={350} height={50} />
                    <ButtonWithTitle title={!isSignup ? 'No Account? Signup Here' : 'Have an Account? Login Here'} onTap={onTapOptions} width={350} height={50} isNoBg={true} />
                </View>
    
                <View style={styles.footer}></View>
                
            </View>
        );
    }

};

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

const LoginScreen = connect(mapStateToProps, { onUserLogin, onUserSignup, onOTPRequest, onVerifyOTP })(_LoginScreen)

export { LoginScreen }