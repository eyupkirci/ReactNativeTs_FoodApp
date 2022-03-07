import axios from "axios";
import { Dispatch } from "react";
import { BASE_URL } from "../../utils";
import { FoodAvailability, FoodModel } from "../models";


export interface AvailabilityAction {
    readonly type: "ON_AVAILABILITY",
    payload: FoodAvailability
}

export interface FoodSearchAction {
    readonly type: "ON_FOODS_SEARCH",
    payload: [FoodModel]
}

export interface ShoppingErrorAction {
    readonly type: "ON_SHOPPING_ERROR",
    payload: any
}


export type ShoppingAction = AvailabilityAction | ShoppingErrorAction | FoodSearchAction


export const onAvailability = (postcode: string) => {
    return async (dispatch: Dispatch<ShoppingAction>) => {

        try {

            const response = await axios.get<FoodAvailability>(`${BASE_URL}food/availability/${postcode}`)
            // const response = await axios.get<FoodAvailability>(`https://online-foods.herokuapp.com/food/availability/94104`)
            // console.log('onavailability', response)



            if(!response) {
                dispatch({
                    type: "ON_SHOPPING_ERROR",
                    payload: "Availability Error"
                })

            } else {
                dispatch({
                    type: "ON_AVAILABILITY",
                    payload: response.data
                })
                // console.log('onavailability', response.data)

            }

            
        } catch (error) {

            // save our location in local storage
            dispatch({
                type: "ON_SHOPPING_ERROR",
                payload: error
            })

        }
    }


}

export const onSearchFoods = (postcode: string) => {

    return async (dispatch: Dispatch<ShoppingAction>) => {

        try {

            const response = await axios.get<[FoodModel]>(`${BASE_URL}food/search/${postcode}`)

            if(!response) {
                dispatch({
                    type: "ON_SHOPPING_ERROR",
                    payload: "Availability Error"
                })
            } else {
                dispatch({
                    type: "ON_FOODS_SEARCH",
                    payload: response.data
                })
            }
            
        } catch (error) {
            dispatch({
                type: "ON_SHOPPING_ERROR",
                payload: error
            })
        }
    }
}
