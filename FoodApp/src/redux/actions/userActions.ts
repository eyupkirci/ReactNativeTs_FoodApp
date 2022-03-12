import axios from "axios";
import {Dispatch} from 'redux'
import AsyncStorage from "@react-native-async-storage/async-storage"; 
import { BASE_URL } from "../../utils";
import { FoodModel, UserModel } from "..";


export interface UpdateLocationAction{
    readonly type:'ON_UPDATE_LOCATION';
    payload:string;
    postcode: string;
}

export interface UserErrorAction{
    readonly type: "ON_USER_ERROR",
    payload: any,
}

export interface UpdateCartAction{
    readonly type: "ON_UPDATE_CART",
    payload: FoodModel,

}

export interface UserLoginAction{
    readonly type: "ON_USER_LOGIN",
    payload: UserModel,

}



export type UserAction= UpdateLocationAction|UserErrorAction|UpdateCartAction|UserLoginAction

export const onUpdateLocation = (location: string, postcode: string) => {

    return async (dispatch: Dispatch<UserAction>) => {

        try {
            await AsyncStorage.setItem('user_location', location)
            await AsyncStorage.setItem('user_location_postcode', postcode)


            dispatch({
                type: "ON_UPDATE_LOCATION",
                payload: location,
                postcode: postcode,
            })

            console.log(location, postcode)
            
        } catch (error) {
            dispatch({
                type: "ON_USER_ERROR",
                payload: error
            })
        }
    }
}

export const onUpdateCart = (item: FoodModel) => {

    return async (dispatch: Dispatch<UserAction>) => {

        dispatch({
            type: "ON_UPDATE_CART",
            payload: item,
        })
        
    }
}

export const onUserLogin = (email: string, password: string) => {

    return async (dispatch: Dispatch<UserAction>) => {

        try {
            
            const response = await axios.post<UserModel>(`${BASE_URL}user/login`, { email, password });
            
            // console.log(response.data)

            if (!response) {
                dispatch({
                    type: "ON_USER_ERROR",
                    payload: "User Login Error"
                })
            } else {
                dispatch({
                    type: "ON_USER_LOGIN",
                    payload: response.data
                })
            }
            
        } catch (error) {
            dispatch({
                type: "ON_USER_ERROR",
                payload: error
            })
        
        }
    }
}


export const onUserSignup = (email: string, phone: string, password: string) => {
    
    return async (dispatch: Dispatch<UserAction>) => {
             
        try {

            const response = await axios.post<UserModel>(`${BASE_URL}user/signup`, {
                email,
                phone,
                password
            })
            
            console.log(response)

            if(!response) {
                dispatch({
                    type: 'ON_USER_ERROR',
                    payload: "User Login Error"
                })
            } else{
                dispatch({
                    type: 'ON_USER_LOGIN',
                    payload: response.data
                });
                // console.log('on user login successful',response.data)
            }
        
        } catch (error) {
            dispatch({
                type: "ON_USER_ERROR",
                payload: error
            })
        }
    }
}
