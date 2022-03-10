import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, Dimensions, FlatList } from 'react-native';
import { connect } from 'react-redux';

import { ButtonWithIcon, ButtonWithTitle, FoodCard, SearchBar } from '../components';
import { ApplicationState, FoodModel, ShoppingState, onUpdateCart, UserState } from '../redux'

import { checkExistence, useNavigation } from '../utils'


interface CartProps {
    userReducer: UserState;
    shoppingReducer: ShoppingState;
    onUpdateCart: Function;
    navigation: { getParam: Function, goBack: Function };
}


const _CartScreen: React.FC<CartProps> = (props) => {

    const { navigate } = useNavigation()

    const [isEditing, setIsEditing] = useState(false)
    const [keyword, setKeyword] = useState('')

    const { availableFoods } = props.shoppingReducer;
    // console.log(availableFoods)
    const { getParam, goBack } = props.navigation;

    const { cart } = props.userReducer;

    const onPressCart = () => { navigate('HomePage') }


    const onTapFood = (item: FoodModel) => {
        navigate('FoodDetailPage', { food: item })

    }

    const [totalAmount, setTotalAmount] = useState(0)

    const onAmountChange = () => {
        let total = 0;

        if (Array.isArray(cart)) {

            cart.map(item => {
                total += item.price * item.unit;
            })
            // console.log('onAmountChange', total);
        
            setTotalAmount(total)
        }
    }

    useEffect(() => {
        onAmountChange();
    }, [cart])


    if (cart.length > 0) {
        return (<View style={styles.container}>

            {/* Foods coming from redux under availableFoods props*/}

            <View style={styles.body}>

                <FlatList
                    showsHorizontalScrollIndicator={false}
                    data={cart}
                    renderItem={({ item }) => <FoodCard onTap={onTapFood} item={checkExistence(item, cart)} onUpdateCart={props.onUpdateCart} />}
                    keyExtractor={(item) => `${item._id}`}
                />

            </View>

            <View style={styles.footer}>
                <View style={styles.amount_container}>
                <Text style={{ fontSize:28, fontWeight:'500' }}>Total</Text>
                <Text style={{ fontSize:28, fontWeight:'700' }}>{totalAmount} ₺</Text>

                </View >
                    <ButtonWithTitle title='Order Now' onTap={() => {}} width={300} height={50}></ButtonWithTitle>
            </View>
        </View>)


    } else {

        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems:'center', marginTop:300 }}>
                <View style={{ flex: 1}}>
                <Text style={{fontSize: 28, fontWeight: '500' }}>No Food in Cart</Text>

                </View>
                <View style={{ flex: 1}}>
                <TouchableOpacity style={{alignItems: "center", borderRadius:5 , backgroundColor: "#DDDDDD",padding: 10, height:40}} onPress={onPressCart}>
                    <Text style={{ flex: 1, color: "orange", fontSize: 14}}> Go to Homescreen </Text>
                </TouchableOpacity>

                </View>
            </View>)

    }

}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F2F2F2"
    },
    navigation: {
        flex: 1,
        marginTop: 43,
        flexDirection: "row",
        justifyContent: 'space-around',
        alignItems: "center",
        backgroundColor: "#F2F2F2"
    },
    body: {
        flex: 10,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: "#F2F2F2"
    },
    // footer: {
    //     fontSize: 1,
    //     alignItems: "center",
    //     justifyContent: 'center',
    //     backgroundColor: "#F2F2F2"
    // },
    footer: {
        flex: 2,
        padding: 10,
    },
    footer_total_amount: {
        flex: 1,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
        justifyContent: "space-around",
        paddingLeft: 10,
        paddingRight: 10,
    },
    amount_container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingRight: 20,
        paddingLeft: 20
    },


})




const mapStateToProps = (state: ApplicationState) => ({
    shoppingReducer: state.shoppingReducer,
    userReducer: state.userReducer
})

const CartScreen = connect(mapStateToProps, { onUpdateCart })(_CartScreen)

export { CartScreen }