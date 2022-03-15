// Address

 
 //category

 export interface Category{
     _id:string,
     title: string;
     icon: string;
    }
 
 // FoodModel

 export interface FoodModel {
    _id: string,
    name: string,
    description: string,
    category: string,
    price: number,
    readyTime: number,
    images: [string],
    unit: number,
     
}

 // Restaurant Model

 export interface Restaurant{
    images: any;
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
    // firstName: string,
    // lastName: string,
    // contactNumber: string,
     email: string,
     token: string,
     verified:boolean,

}

export interface UserState {
    user: UserModel,
    location: string,
    postcode: string,
    error: string | undefined,
    cart: [FoodModel],
    orders:[OrderModel]

}

export interface ShoppingState{
    availability: FoodAvailability,
    availableFoods: [FoodModel],
}

export interface CartModel {
    _id: string,
    food: FoodModel,
    unit: number
}

export interface OrderModel {
    _id: string,
    orderID: string,
    items: [CartModel],
    totalAmount: number,
    orderDate: number,
    paidThrough: string,
    paymentResponse: string,
    orderStatus: string
}