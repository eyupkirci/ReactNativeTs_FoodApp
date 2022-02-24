import {combineReducers} from 'redux'
import {ShoppingReducer} from './shoppingReducer'
import {UserReducer} from './userReducer'


const rootReducer = combineReducers( {
    userReducer:UserReducer,
    shoppingReducer:ShoppingReducer
})

//this is for determining the return type of user reducer. TS staff
export type ApplicationState=ReturnType<typeof rootReducer>

export {rootReducer}