// Address

 
 //category

 export interface Category{
     title: string;
     icon: string;

 }
 
 // FoodModel

 export interface FoodModel{
     _id: string;
     name: string;
     description: string;
     price: number;
     readyTime: number;
     image: [string];
 }

 // Restaurant Model

 export interface Restaurant{
    _id: string;
    name: string;
    foodType: string;
    address: string;
    phone: string; 
    image: string;
    foods:[FoodModel]
}

 export interface FoodAvailability{
     categories: [Category];
     restaurants:[Restaurant];
     foods:[FoodModel];
 }

 export interface UserModel {
    firstName: string,
    lastName: string,
    contactNumber: string,
    token: string,

}

export interface UserState {
    user: UserModel,
    location: string,
    postcode: string,
    error: string | undefined,

}

export interface ShoppingState{
    availability: FoodAvailability,
    
}