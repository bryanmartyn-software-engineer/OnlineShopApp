import React, { useContext, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  Image,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ShopContext } from '../context/ShopContext';
import { Colors } from '../styles/colors';

export default function CartScreen({ navigation }) {
  const {
    cart,
    darkMode,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    isLogin,
    BASE_URL,
  } = useContext(ShopContext);

  const handleCheckout = () => {
    navigation.navigate('Checkout');
  };

  const handleClearCart = () => {
    Alert.alert(
      'Clear Cart',
      'Are you sure you want to remove all items from your cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear', onPress: clearCart, style: 'destructive' },
      ]
    );
  };

  const renderCartItem = ({ item }) => (
    <View style={[styles.cartItem, darkMode && styles.darkCard]}>
      <TouchableOpacity
        style={[styles.deleteButton, darkMode && styles.darkDeleteButton]}
        onPress={() => removeFromCart(item.id)}
      >
        <MaterialIcons name="close" size={16} color={Colors.error} />
      </TouchableOpacity>

      <View style={styles.itemImageContainer}>
        <Image
          source={{ uri: `${BASE_URL}${item.image}` }}
          style={styles.itemImage}
          resizeMode="cover"
        />
      </View>

      <View style={styles.itemInfo}>
        <View style={styles.itemHeader}>
          <Text style={[styles.itemName, darkMode && styles.darkText]} numberOfLines={1}>
            {item.name}
          </Text>
        </View>

        <Text style={[styles.itemPrice, darkMode && styles.darkText]}>
          RM {item.price.toFixed(2)} each
        </Text>

        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={[styles.quantityButton, darkMode && styles.darkQuantityButton]}
            onPress={() => updateQuantity(item.id, item.quantity - 1)}
          >
            <MaterialIcons name="remove" size={18} color={Colors.primary} />
          </TouchableOpacity>

          <Text style={[styles.quantity, darkMode && styles.darkText]}>
            {item.quantity}
          </Text>

          <TouchableOpacity
            style={[styles.quantityButton, darkMode && styles.darkQuantityButton]}
            onPress={() => updateQuantity(item.id, item.quantity + 1)}
          >
            <MaterialIcons name="add" size={18} color={Colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.itemTotal}>
        <Text style={[styles.totalPrice, darkMode && styles.darkText]}>
          RM {(item.price * item.quantity).toFixed(2)}
        </Text>
      </View>
    </View>
  );

  const getProductIcon = (category) => {
    switch (category) {
      case 'Electronics': return 'devices';
      case 'Clothing': return 'checkroom';
      case 'Footwear': return 'sports';
      case 'Accessories': return 'watch';
      default: return 'inventory';
    }
  };

  if (!isLogin) {
    return (
      <SafeAreaView style={[styles.container, darkMode && styles.darkContainer]}>
        <View style={styles.centerContainer}>
          <Text style={[
            styles.loginText,
            darkMode && styles.darkLoginText
          ]}>
            You must log in to view your cart
          </Text>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate('Profile', {
              screen: 'AuthScreen',
              params: { type: 'login' }
            })}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
  else if (cart.length === 0) {
    return (
      <SafeAreaView style={[styles.container, darkMode && styles.darkContainer]}>
        <View style={styles.emptyContainer}>
          <MaterialIcons name="shopping-cart" size={64} color={darkMode ? Colors.darkSubText : Colors.lightSubText} />
          <Text style={[styles.emptyText, darkMode && styles.darkText]}>
            Your cart is empty
          </Text>
          <Text style={[styles.emptySubText, darkMode && styles.darkSubText]}>
            Add some products to get started!
          </Text>
          <TouchableOpacity
            style={styles.shopButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.shopButtonText}>Continue Shopping</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  else {
    return (
      <SafeAreaView style={[styles.container, darkMode && styles.darkContainer]}>
        <FlatList
          data={cart}
          renderItem={renderCartItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.cartList}
          ListFooterComponent={
            <View style={[styles.summaryContainer, darkMode && styles.darkSummaryContainer]}>
              <View style={styles.summaryRow}>
                <Text style={[styles.summaryLabel, darkMode && styles.darkText]}>
                  Subtotal:
                </Text>
                <Text style={[styles.summaryValue, darkMode && styles.darkText]}>
                  RM {getCartTotal().toFixed(2)}
                </Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={[styles.summaryLabel, darkMode && styles.darkText]}>
                  Shipping:
                </Text>
                <Text style={[styles.summaryValue, darkMode && styles.darkText]}>
                  Free
                </Text>
              </View>
              <View style={[styles.totalRow, darkMode && styles.darkTotalRow]}>
                <Text style={[styles.totalLabel, darkMode && styles.darkText]}>
                  Total:
                </Text>
                <Text style={[styles.totalAmount, darkMode && styles.darkText]}>
                  RM {getCartTotal().toFixed(2)}
                </Text>
              </View>
            </View>
          }
        />

        <View style={[styles.footer, darkMode && styles.darkFooter]}>
          <TouchableOpacity
            style={styles.clearButton}
            onPress={handleClearCart}
          >
            <MaterialIcons name="delete-sweep" size={20} color={Colors.error} />
            <Text style={styles.clearButtonText}>Clear</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={handleCheckout}
          >
            <Text style={styles.checkoutButtonText}>Checkout</Text>
            <MaterialIcons name="arrow-forward" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightBackground,
  },
  darkContainer: {
    backgroundColor: Colors.darkBackground,
  },
  cartList: {
    padding: 16,
    paddingBottom: 80,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: Colors.lightSurface,
    borderRadius: 16,
    marginBottom: 12,
    padding: 12,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  darkCard: {
    backgroundColor: Colors.darkSurface,
    shadowColor: Colors.black,
    shadowOpacity: 0.3,
  },
  itemImageContainer: {
    width: 75,
    height: 75,
    borderRadius: 14,
    backgroundColor: '#F5F5F5',
    overflow: 'hidden',
    marginRight: 12,
  },
  itemImage: {
    width: '100%',
    height: '100%',
  },
  deleteButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    zIndex: 20,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 107, 0.2)',
  },
  darkDeleteButton: {
    backgroundColor: Colors.darkSurface,
    borderColor: 'rgba(255, 107, 107, 0.4)',
  },
  itemInfo: {
    flex: 1,
    paddingRight: 10,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.lightText,
    flex: 1,
    marginRight: 8,
  },
  darkText: {
    color: Colors.darkText,
  },
  itemPrice: {
    fontSize: 14,
    color: Colors.primary,
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.lightSurface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.lightBorder,
  },
  darkQuantityButton: {
    backgroundColor: Colors.darkSurface,
    borderColor: Colors.darkBorder,
  },
  quantity: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.lightText,
    minWidth: 24,
    textAlign: 'center',
  },
  itemTotal: {
    justifyContent: 'center',
    marginLeft: 8,
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.lightText,
  },
  summaryContainer: {
    backgroundColor: Colors.lightSurface,
    borderRadius: 16,
    padding: 16,
    marginTop: 8,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  darkSummaryContainer: {
    backgroundColor: Colors.darkSurface,
    shadowColor: Colors.black,
    shadowOpacity: 0.3,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: Colors.lightSubText,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.lightText,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: Colors.lightBorder,
  },
  darkTotalRow: {
    borderTopColor: Colors.darkBorder,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.lightText,
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.primary,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: 16,
    backgroundColor: Colors.lightSurface,
    borderTopWidth: 1,
    borderTopColor: Colors.lightBorder,
    gap: 12,
  },
  darkFooter: {
    backgroundColor: Colors.darkSurface,
    borderTopColor: Colors.darkBorder,
  },
  clearButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    borderRadius: 12,
    padding: 14,
    gap: 6,
  },
  clearButtonText: {
    color: '#FF6B6B',
    fontSize: 14,
    fontWeight: '500',
  },
  checkoutButton: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: 14,
    gap: 8,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  loginText: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    color: '#2c3e50',
  },
  darkLoginText: {
    color: '#ecf0f1',
  },
  loginText: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    color: '#2c3e50',
    marginBottom: 20,
  },
  darkLoginText: {
    color: '#ecf0f1',
  },
  loginButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 12,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.lightText,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 14,
    color: Colors.lightSubText,
    textAlign: 'center',
    marginBottom: 24,
  },
  shopButton: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  shopButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  darkSubText: {
    color: Colors.darkSubText,
  },
});