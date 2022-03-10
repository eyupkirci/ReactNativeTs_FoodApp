import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, Dimensions,FlatList } from 'react-native';
import { connect } from 'react-redux';

import { ButtonWithIcon, FoodCard, SearchBar } from '../components';
import { ApplicationState, FoodModel, ShoppingState, onUpdateCart, UserState } from '../redux'

import { checkExistence, useNavigation } from '../utils'


interface CartProps {
    userReducer: UserState;
    shoppingReducer: ShoppingState;
    onUpdateCart: Function;
    navigation: { getParam: Function, goBack: Function };
}


const _CartScreen: React.FC<CartProps> = (props) => {
    
    const {navigate}= useNavigation()

    const [isEditing, setIsEditing] = useState(false)
    const [keyword, setKeyword] = useState('')

    const { availableFoods } = props.shoppingReducer;
    // console.log(availableFoods)
    const { getParam, goBack } = props.navigation;

    const { cart } = props.userReducer;

    console.log(props.userReducer);

    const onTapFood = (item: FoodModel) => {
        navigate('FoodDetailPage', {food: item})

    }


    return (
        <View style={styles.container}>

            <View style={styles.navigation}>
                {/* <ButtonWithIcon icon={require('../images/back_arrow.png')} onTap={() => goBack()} width={50} height={50} />
                <SearchBar onTextChange={setKeyword} onEndEditing={() => setIsEditing(false)} didTouch={() => setIsEditing(true)} />
                console.log(keyword) */}


            </View>


            {/* Foods coming from redux under availableFoods props*/}

            <View style={styles.body}>
                
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    data={cart}
                    renderItem={({ item }) => <FoodCard onTap={onTapFood} item={checkExistence(item,cart)} onUpdateCart={props.onUpdateCart} />}
                    keyExtractor={(item) => `${item._id}`}
                />
            
            </View>
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
    footer: {
        fontSize: 1,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: "#F2F2F2"
    },


})


const mapStateToProps = (state: ApplicationState) => ({
    shoppingReducer: state.shoppingReducer,
    userReducer: state.userReducer
})

const CartScreen = connect(mapStateToProps, {onUpdateCart})(_CartScreen)

export { CartScreen }