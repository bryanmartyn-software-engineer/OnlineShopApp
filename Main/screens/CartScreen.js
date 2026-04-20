import React, { useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ShopContext } from '../context/ShopContext';

export default function CartScreen({ navigation }) {
  const {
    cart,
    darkMode,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
  } = useContext(ShopContext);

  const handleCheckout = () => {
    Alert.alert(
      'Checkout',
      `Total: $${getCartTotal().toFixed(2)}\n\nThis is a demo app. Thank you for shopping!`,
      [
        { text: 'Continue Shopping', style: 'cancel' },
        {
          text: 'Clear Cart',
          onPress: () => {
            clearCart();
            Alert.alert('Success', 'Your order has been placed!');
          },
          style: 'destructive',
        },
      ]
    );
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
      <View style={styles.itemImagePlaceholder}>
        <MaterialIcons 
          name={getProductIcon(item.category)} 
          size={30} 
          color="#6C63FF" 
        />
      </View>
      
      <View style={styles.itemInfo}>
        <View style={styles.itemHeader}>
          <Text style={[styles.itemName, darkMode && styles.darkText]} numberOfLines={1}>
            {item.name}
          </Text>
          <TouchableOpacity onPress={() => removeFromCart(item.id)}>
            <MaterialIcons name="delete-outline" size={20} color="#FF6B6B" />
          </TouchableOpacity>
        </View>
        
        <Text style={[styles.itemPrice, darkMode && styles.darkText]}>
          ${item.price.toFixed(2)} each
        </Text>
        
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={[styles.quantityButton, darkMode && styles.darkQuantityButton]}
            onPress={() => updateQuantity(item.id, item.quantity - 1)}
          >
            <MaterialIcons name="remove" size={18} color="#6C63FF" />
          </TouchableOpacity>
          
          <Text style={[styles.quantity, darkMode && styles.darkText]}>
            {item.quantity}
          </Text>
          
          <TouchableOpacity
            style={[styles.quantityButton, darkMode && styles.darkQuantityButton]}
            onPress={() => updateQuantity(item.id, item.quantity + 1)}
          >
            <MaterialIcons name="add" size={18} color="#6C63FF" />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.itemTotal}>
        <Text style={[styles.totalPrice, darkMode && styles.darkText]}>
          ${(item.price * item.quantity).toFixed(2)}
        </Text>
      </View>
    </View>
  );

  const getProductIcon = (category) => {
    switch(category) {
      case 'Electronics': return 'devices';
      case 'Clothing': return 'checkroom';
      case 'Footwear': return 'sports';
      case 'Accessories': return 'watch';
      default: return 'inventory';
    }
  };

  if (cart.length === 0) {
    return (
      <SafeAreaView style={[styles.container, darkMode && styles.darkContainer]}>
        <View style={styles.emptyContainer}>
          <MaterialIcons name="shopping-cart" size={64} color={darkMode ? '#666' : '#ccc'} />
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

  return (
    <SafeAreaView style={[styles.container, darkMode && styles.darkContainer]}>
      <FlatList
        data={cart}
        renderItem={renderCartItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.cartList}
        ListFooterComponent={
          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, darkMode && styles.darkText]}>
                Subtotal:
              </Text>
              <Text style={[styles.summaryValue, darkMode && styles.darkText]}>
                ${getCartTotal().toFixed(2)}
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
                ${getCartTotal().toFixed(2)}
              </Text>
            </View>
          </View>
        }
      />

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.clearButton}
          onPress={handleClearCart}
        >
          <MaterialIcons name="delete-sweep" size={20} color="#FF6B6B" />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  cartList: {
    padding: 16,
    paddingBottom: 80,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  darkCard: {
    backgroundColor: '#1e1e1e',
    shadowColor: '#000',
    shadowOpacity: 0.3,
  },
  itemImagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: 'rgba(108, 99, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
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
    color: '#2c3e50',
    flex: 1,
    marginRight: 8,
  },
  darkText: {
    color: '#ecf0f1',
  },
  itemPrice: {
    fontSize: 14,
    color: '#6C63FF',
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
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  darkQuantityButton: {
    backgroundColor: '#1e1e1e',
    borderColor: '#333',
  },
  quantity: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
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
    color: '#2c3e50',
  },
  summaryContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  darkSummaryContainer: {
    backgroundColor: '#1e1e1e',
    shadowColor: '#000',
    shadowOpacity: 0.3,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2c3e50',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  darkTotalRow: {
    borderTopColor: '#333',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: '700',
    color: '#6C63FF',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    gap: 12,
  },
  clearButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff5f5',
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
    backgroundColor: '#6C63FF',
    borderRadius: 12,
    padding: 14,
    gap: 8,
  },
  checkoutButtonText: {
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
    color: '#2c3e50',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 24,
  },
  shopButton: {
    backgroundColor: '#6C63FF',
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  shopButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  darkSubText: {
    color: '#bdc3c7',
  },
});