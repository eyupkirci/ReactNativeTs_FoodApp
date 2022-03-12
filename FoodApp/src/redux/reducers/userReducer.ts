import {UserAction  } from '../actions'
import { UserState, UserModel, FoodModel } from '../models'

const initialState: UserState={
    user: {} as UserModel,
    location: '' as string,
    postcode: '' as string,
    error: undefined,
    cart:{} as [FoodModel]

}

const UserReducer = (state: UserState = initialState, action: UserAction) => {


    switch (action.type) {
        case "ON_UPDATE_LOCATION":
            return {
                ...state,
                location: action.payload,
                postcode: action.postcode
            };
            
        case "ON_UPDATE_CART":
            // console.log(state)
            
            if (!Array.isArray(state.cart)) {
                return {
                    ...state,
                    cart: [action.payload]
                }
            }
            
            const existingFoods = state.cart.filter(item => item._id === action.payload._id)

            if (existingFoods.length > 0) {

                let updatedCart = state.cart.map((food) => {
                    if (food._id === action.payload._id) {
                        food.unit = action.payload.unit
                    }

                    return food
                })

                return {
                    ...state,
                    cart: updatedCart.filter(item => item.unit > 0)
                }

            } else {
                return {
                    ...state,
                    cart: [...state.cart, action.payload]
                }
            };
                
        case 'ON_USER_LOGIN':
            return {
                ...state,
                user: action.payload
            };
            
        default:
            return state;
    }
};

export {UserReducer}
