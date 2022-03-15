import React, {createRef, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  FlatList,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';

import {
  ButtonWithIcon,
  ButtonWithTitle,
  FoodCard,
  SearchBar,
} from '../components';
import {
  ApplicationState,
  FoodModel,
  ShoppingState,
  onUpdateCart,
  UserState,
  onCreateOrder,
} from '../redux';

import {checkExistence, useNavigation} from '../utils';

import PaymentTypePopUp from 'react-native-raw-bottom-sheet';

interface CartProps {
  userReducer: UserState;
  shoppingReducer: ShoppingState;
  onUpdateCart: Function;
  onCreateOrder: Function;
  navigation: {getParam: Function; goBack: Function};
}

const _CartScreen: React.FC<CartProps> = props => {
  const {navigate} = useNavigation();

  const [isEditing, setIsEditing] = useState(false);
  const [keyword, setKeyword] = useState('');

  const {availableFoods} = props.shoppingReducer;
  const {getParam, goBack} = props.navigation;

  const {cart, user, location, orders} = props.userReducer;

//   console.log(orders);

  // const onPressCart = () => {navigate('HomePage') }

  const popupRef = createRef<PaymentTypePopUp>();

  const onTapFood = (item: FoodModel) => {
    navigate('FoodDetailPage', {food: item});
  };

  const [totalAmount, setTotalAmount] = useState(0);

  const onAmountChange = () => {
    let total = 0;

    if (Array.isArray(cart)) {
      cart.map(item => {
        total += item.price * item.unit;
      });
      // console.log('onAmountChange', total);

      setTotalAmount(total);
    }
  };

  useEffect(() => {
    onAmountChange();
  }, [cart]);

  const onValidateOrder = () => {
    if (user !== undefined) {
      if (!user.verified) {
        navigate('LoginPage');
      } else {
        //place the order
        //console.log('Now we can order');
        popupRef.current?.open();
      }
      navigate('LoginPage');
    }
  };

  const onTapPlaceOrder = () => {
    console.log('Place Order here...');
    props.onCreateOrder(cart, user);
    popupRef.current?.close();
  };

  // popupView

  const popupView = () => {
    return (
      <PaymentTypePopUp
        height={400}
        ref={popupRef}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {backgroundColor: 'transparent'},
          draggableIcon: {backgroundColor: '#000'},
          container: {justifyContent: 'flex-start', alignItems: 'center'},
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            width: '100%',
          }}>
          <View style={styles.paymentView}>
            <Text style={{fontSize: 20}}>Payable Amount</Text>
            <Text style={{fontSize: 20, fontWeight: '600'}}>
              {totalAmount.toFixed(2)} ₺
            </Text>
          </View>
          <View style={styles.payment_view_address_container}>
            <Image
              source={require('../images/delivery_icon.png')}
              style={{height: 50, width: 50}}
            />
            <View>
              <Text style={styles.delivery_address_title}>
                Address Used to Delivery
              </Text>
              <Text style={styles.delivery_address_text}>{location}</Text>
            </View>
          </View>
          <ScrollView horizontal={true}>
            <View style={styles.payment_options}>
              <TouchableOpacity
                onPress={() => onTapPlaceOrder()}
                style={styles.options}>
                <Image
                  source={require('../images/cod_icon.png')}
                  style={styles.icon}
                />
                <Text style={styles.icon_text}>Cash On Delivery</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => {}} style={styles.options}>
                <Image
                  source={require('../images/card_icon.png')}
                  style={styles.icon}
                />
                <Text style={styles.icon_text}>Card Payment</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </PaymentTypePopUp>
    );
  };

  //CartScreen View

  if (cart.length > 0) {
    return (
        <View style={styles.container}>
                    <View style={styles.navigation}>
          <View style={styles.inside_container}>
            <Text style={styles.my_cart_text}>My Cart</Text>
            {user !== undefined && (
              <TouchableOpacity
                style={{alignItems: 'center'}}
                onPress={() => {
                  console.log('go to Order page');
                }}>
                <Image
                  source={require('../images/orders.png')}
                  style={styles.order_icon}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={styles.body}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={cart}
            renderItem={({item}) => (
              <FoodCard
                onTap={onTapFood}
                item={checkExistence(item, cart)}
                onUpdateCart={props.onUpdateCart}
              />
            )}
            keyExtractor={item => `${item._id}`}
          />
        </View>

        <View style={styles.footer}>
          <View style={styles.amount_container}>
            <Text style={{fontSize: 18, fontWeight: '700'}}>Total</Text>
            <Text style={{fontSize: 18, fontWeight: '700'}}>
              {totalAmount} ₺
            </Text>
          </View>
          <ButtonWithTitle
            title="Order Now"
            onTap={onValidateOrder}
            width={300}
            height={50}></ButtonWithTitle>
        </View>
        {popupView()}
      </View>
    );
  } else {
    return (
        <View style={styles.container}>
            
        <View style={styles.navigation}>
          <View style={styles.inside_container}>
            <Text style={styles.my_cart_text}>My Cart</Text>
            {user !== undefined && (
              <TouchableOpacity
                style={{alignItems: 'center'}}
                onPress={() => {
                  console.log('go to Order page');
                }}>
                <Image
                  source={require('../images/orders.png')}
                  style={styles.order_icon}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
            
        <View style={styles.body}>
          <Text style={styles.empty_text}>Your Cart is Empty</Text>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  navigation: {
    flex: 1,
  },
  inside_container: {
    display: 'flex',
    height: 60,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 4,
    paddingLeft: 20,
    paddingRight: 20,
  },
  body: {
    flex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  empty_cart_container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  empty_text: {
    fontSize: 25,
    fontWeight: '700',
    color: 'black',
  },

  footer: {
    flex: 2,
    padding: 10,
  },
  footer_total_amount: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'space-around',
    paddingLeft: 10,
    paddingRight: 10,
  },
  amount_container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 20,
    paddingLeft: 20,
  },

  paymentView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 5,
    margin: 5,
    backgroundColor: '#E3BE74',
  },

  payment_view_address_container: {
    display: 'flex',
    height: 100,
    padding: 20,
    flexDirection: 'row',
  },
  delivery_address_title: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 5,
    color: 'black',
  },
  delivery_address_text: {
    fontSize: 16,
    marginBottom: 5,
    color: '#666666',
    width: Dimensions.get('screen').width - 60,
  },

  payment_options: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('screen').width,
  },
  options: {
    display: 'flex',
    height: 120,
    width: 160,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
    padding: 10,
    borderColor: '#A0A0A0',
    backgroundColor: '#F2F2F2',
    borderWidth: 0.2,
    borderRadius: 10,
    margin: 10,
  },
  icon: {
    width: 115,
    height: 80,
  },
  icon_text: {
    fontSize: 16,
    fontWeight: '800',
    color: '#545252',
  },
  my_cart_text: {
    fontSize: 22,
    fontWeight: '700',
    color: 'black',
  },
  order_icon: {
    width: 50,
    height: 50,
  },
});

const mapStateToProps = (state: ApplicationState) => ({
  shoppingReducer: state.shoppingReducer,
  userReducer: state.userReducer,
});

const CartScreen = connect(mapStateToProps, {onUpdateCart, onCreateOrder})(
  _CartScreen,
);

export {CartScreen};
