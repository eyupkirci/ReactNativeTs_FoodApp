import {UserAction  } from '../actions'
import { UserState, UserModel } from '../models'

const initialState: UserState={
    user: {} as UserModel,
    location: '' as string,
    postcode: '' as string,
    error:  undefined, 

}

const UserReducer = (state: UserState = initialState, action: UserAction) => {


        switch (action.type) {
            case "ON_UPDATE_LOCATION":
                return {
                    ...state,
                    location: action.payload,
                    postcode: action.postcode
                }
            default:
                return state
            
            }
    
}

export {UserReducer}
