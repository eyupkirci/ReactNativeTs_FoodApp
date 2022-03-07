import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, Dimensions, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { ButtonWithIcon, FoodCard } from '../components';
import { ApplicationState, FoodModel, Restaurant } from '../redux';

import {useNavigation} from '../utils'



interface RestaurantProps {
    // navigation: {}
    navigation: { getParam: Function, goBack: Function }
}



const _RestaurantScreen: React.FC<RestaurantProps> = (props) => {

    const { getParam, goBack } = props.navigation;
    const restaurant = getParam('restaurant') as Restaurant;
    console.log(restaurant)

    const {navigate} = useNavigation()

    const onTapFood = (item: FoodModel) => {
        navigate('FoodDetailPage', {food: item})

    }

    return (
        <View style={styles.container}>

            <View style={styles.navigation}>
                <ButtonWithIcon icon={require('../images/back_arrow.png')} onTap={() => goBack()} width={42} height={42} />
                <Text style={styles.name}>{restaurant.name}</Text>
            </View>

            <View style={styles.body}>
                <ImageBackground source={{ uri: `${restaurant.images[0]}` }} style={styles.image_background} >
                    <View style={styles.text_container} >
                        <Text style={styles.name_text} >{restaurant.name}</Text>
                        <Text style={styles.address_text} >{restaurant.address}</Text>
                    </View>
                </ImageBackground>

                <FlatList 
                 showsVerticalScrollIndicator={false} 
                 data={restaurant.foods}
                 renderItem={({item}) => <FoodCard item={item} onTap={onTapFood} />} 
                 keyExtractor={(item) => `${item._id}`} />




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
        paddingLeft: 10,
        flexDirection: "row",
        alignItems: "center",
    },
    body: {
        flex: 11,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#FFF"
    },
    name: {
        fontSize: 22,
        fontWeight: "600",
        marginLeft: 80,
        color: "black"
    },
    image_background: {
        width: Dimensions.get('screen').width,
        height: 300,
        justifyContent: "flex-end"
    },
    name_text: {
        color: "#FFF",
        fontSize: 40,
        fontWeight: "700"
    },
    address_text: {
        color: "#FFF",
        fontSize: 25,
        fontWeight: "500"
    },
    text_container: {
        height: 120,
        backgroundColor: "rgba(0,0,0,0.6)",
        padding: 10,
        flex: 0.5
    }
})

const mapStateToProps = (state: ApplicationState) => ({
    shoppingReducer: state.shoppingReducer,
})

const RestaurantScreen = connect(mapStateToProps, {  })(_RestaurantScreen)


export { RestaurantScreen }