import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ShopContext } from '../context/ShopContext';
import { Colors } from '../styles/colors';
import PaymentMethodsScreen from './PaymentMethodsScreen';
import ShippingAddressScreen from './ShippingAddressScreen';

export default function CheckoutScreen({ navigation }) {
  const { darkMode, cart, getCartTotal, userData, checkout } = useContext(ShopContext);
  const [loading, setLoading] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(userData?.address || '');
  const [selectedPayment, setSelectedPayment] = useState('Visa ending in 4589');

  useEffect(() => {
    setSelectedAddress(userData?.address || '');
  }, [userData?.address]);

  const handleCheckout = async () => {
    setLoading(true);
    const result = await checkout(selectedAddress);
    setLoading(false);

    if (result.success) {
      Alert.alert(
        'Success!',
        'Your order has been placed successfully.',
        [{ text: 'View Orders', onPress: () => navigation.navigate('Profile', { screen: 'OrderHistory' }) }]
      );
    } else {
      Alert.alert('Error', result.error || 'Something went wrong');
    }
  };

  return (
    <SafeAreaView style={[styles.container, darkMode && styles.darkContainer]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.sectionTitle, darkMode && styles.darkText]}>Shipping Address</Text>
        <TouchableOpacity style={[styles.card, darkMode && styles.darkCard, 
            selectedAddress.trim() === '' && { borderWidth: 1, borderColor: 'red' }]}
            onPress={() => navigation.navigate('Profile', { screen: 'ShippingAddress', params: { returnTab: 'Cart', returnScreen: 'Checkout' } })}>
          <View style={styles.cardInfo}>
            <MaterialIcons name="location-on" size={24} color={Colors.primary} />
            <View style={styles.cardTextContainer}>
              <Text style={[styles.cardTitle, darkMode && styles.darkText]}>Current Address</Text>
              <Text style={[styles.cardSubTitle, darkMode && styles.darkSubText]}>{
                selectedAddress.trim() === '' ? 'No address provided' : selectedAddress
              }</Text>
            </View>
          </View>
          <MaterialIcons name="chevron-right" size={24} color={Colors.primary} />
        </TouchableOpacity>

        <Text style={[styles.sectionTitle, darkMode && styles.darkText]}>Payment Method</Text>
        <TouchableOpacity style={[styles.card, darkMode && styles.darkCard]}
          onPress={() => {navigation.navigate('PaymentMethods')}}>
          <View style={styles.cardInfo}>
            <MaterialIcons name="credit-card" size={24} color={Colors.primary} />
            <View style={styles.cardTextContainer}>
              <Text style={[styles.cardTitle, darkMode && styles.darkText]}>{selectedPayment}</Text>
              <Text style={[styles.cardSubTitle, darkMode && styles.darkSubText]}>Expires 12/26</Text>
            </View>
          </View>
          <MaterialIcons name="chevron-right" size={24} color={Colors.primary} />
        </TouchableOpacity>

        <Text style={[styles.sectionTitle, darkMode && styles.darkText]}>Order Summary</Text>
        <View style={[styles.summaryCard, darkMode && styles.darkCard]}>
          {cart.map((item) => (
            <View key={item.id} style={styles.summaryItem}>
              <Text style={[styles.summaryItemText, darkMode && styles.darkText]}>
                {item.quantity}x {item.name}
              </Text>
              <Text style={[styles.summaryItemPrice, darkMode && styles.darkText]}>
                RM{(item.price * item.quantity).toFixed(2)}
              </Text>
            </View>
          ))}
          <View style={styles.divider} />
          <View style={styles.summaryItem}>
            <Text style={[styles.totalLabel, darkMode && styles.darkText]}>Total Amount</Text>
            <Text style={styles.totalValue}>RM{getCartTotal().toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={[styles.footer, darkMode && styles.darkCard]}>
        <TouchableOpacity 
          style={[styles.checkoutButton, (loading || selectedAddress.trim() === '') && { opacity: 0.7 }]} 
          onPress={handleCheckout}
          disabled={loading || selectedAddress.trim() === ''}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <>
              <Text style={styles.checkoutButtonText}>Place Order</Text>
              <MaterialIcons name="arrow-forward" size={24} color="#FFF" />
            </>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightBackground,
  },
  darkContainer: {
    backgroundColor: Colors.darkBackground,
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    marginTop: 10,
    color: Colors.lightText,
  },
  card: {
    backgroundColor: Colors.lightSurface,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  darkCard: {
    backgroundColor: Colors.darkSurface,
    shadowOpacity: 0.3,
  },
  cardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  cardTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.lightText,
  },
  cardSubTitle: {
    fontSize: 14,
    color: Colors.lightSubText,
    marginTop: 2,
  },
  summaryCard: {
    backgroundColor: Colors.lightSurface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryItemText: {
    fontSize: 14,
    color: Colors.lightText,
    flex: 1,
  },
  summaryItemPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.lightText,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.lightBorder,
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.lightText,
  },
  totalValue: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.primary,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.lightSurface,
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  checkoutButton: {
    backgroundColor: Colors.primary,
    borderRadius: 15,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  checkoutButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },
  darkText: { color: Colors.darkText },
  darkSubText: { color: Colors.darkSubText },
});
