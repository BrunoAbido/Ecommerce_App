import React, { useMemo } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useCart } from '../../contextCart';
import { CartItemType } from '../../contextCart';
import colors from '../../constants/Colors';

function CartPage() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const subtotal = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cartItems]);

  const renderItem = ({ item }: { item: CartItemType }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
      </View>
      <View style={styles.quantityContainer}>
          <TouchableOpacity
            onPress={() => {
              if (item.quantity > 1) {
                updateQuantity(item.id, item.quantity - 1);
              } else {
                removeFromCart(item.id);
              }
            }}
          >
            <Image source={item.quantity === 1 ? require('../../assets/images/delete_outline.png') : require('../../assets/images/Less.png')} style={styles.quantityIcon} />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity
            onPress={() => updateQuantity(item.id, item.quantity + 1)}
          >
            <Image source={require('../../assets/images/Plus.png')} style={styles.quantityIcon} />
          </TouchableOpacity>
        </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart</Text>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.subtotalContainer}>
        <Text style={styles.subtotalText}>Subtotal:</Text>
        <Text style={styles.subtotalAmount}>${subtotal.toFixed(2)}</Text>
      </View>
      <TouchableOpacity style={styles.buttonCheckout}>
          <Text style={styles.buttonCheckoutText}>Go to Checkout</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    marginTop: 14,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECF8F3',
    borderRadius: 8,
    width: 327,
    height: 72,
    marginBottom: 17,
  },
  
  itemImage: {
    width: 91,
    height: 72,
    borderRadius: 8,
  },
  
  itemInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  
  itemTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  
  itemPrice: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  
  quantityContainer: {
    flexDirection: 'row',
    marginRight: 13, 
  },
  quantityText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginHorizontal: 16,
  },
  quantityIcon: {
    width: 20,
    height: 20,
  },
  subtotalContainer: {
    width: 324,
    height: 30,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ECF8F3',
  },
  subtotalText: {
    fontSize: 14,
    padding: 8,
  },
  subtotalAmount: {
    fontSize: 14,
    padding: 8,
    fontWeight: 'bold'
  },
  buttonCheckout: {
    width: 327,
    height: 48,
    borderRadius: 8,
    backgroundColor: colors.green,
    marginBottom: 29,
  },
  buttonCheckoutText: {
    textAlign: 'center',
    padding: 14,
    color: 'white',
    fontSize: 16,
  },
});

export default CartPage;
