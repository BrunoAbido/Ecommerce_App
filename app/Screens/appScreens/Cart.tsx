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
      <TouchableOpacity style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Go to Checkout</Text>
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
    marginBottom: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#ECF8F3'
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 12,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 14,
    color: 'gray',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginRight: 24,
  },
  quantityText: {
    fontSize: 14,
    marginHorizontal: 8,
    padding: 16,
  },
  quantityIcon: {
    width: 20,
    height: 20,
  },
  subtotalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center", 
    marginTop: 16,
    backgroundColor: '#ECF8F3',
    height: 30,
    borderWidth: 1,
    borderColor: colors.green,
    borderRadius: 4,
  },
  subtotalText: {
    fontSize: 14,
    marginLeft: 8,
  },
  subtotalAmount: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 8,
  },
  buttonContainer: {
    height: 48,
    backgroundColor: colors.green,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: "center",
    marginTop: 16,

  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  }

});

export default CartPage;