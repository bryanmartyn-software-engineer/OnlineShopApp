import React, { useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, ScrollView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ShopContext } from '../context/ShopContext';
import { Colors } from '../styles/colors';

export default function OrderHistoryDetailScreen({ route, navigation }) {
  const { darkMode, products } = useContext(ShopContext);
  const { order } = route.params;

  const renderOrderItem = ({ item }) => {
    const product = products.find(p => p.id === item.productId.toString());
    return (
        <View style={[styles.itemCard, darkMode && styles.darkCard]}>
        <View style={styles.itemHeader}>
            <Text style={[styles.productName, darkMode && styles.darkText]}>{product.name}</Text>
            <Text style={[styles.quantity, darkMode && styles.darkSubText]}>Qty: {item.quantity}</Text>
        </View>
        <View style={styles.itemDetails}>
            <View style={styles.priceRow}>
            <Text style={[styles.label, darkMode && styles.darkSubText]}>Price per Unit:</Text>
            <Text style={[styles.value, darkMode && styles.darkText]}>RM{product.price}</Text>
            </View>
            <View style={styles.priceRow}>
            <Text style={[styles.label, darkMode && styles.darkSubText]}>Total:</Text>
            <Text style={[styles.value, darkMode && styles.darkText]}>RM{(product.price * item.quantity).toFixed(2)}</Text>
            </View>
        </View>
        </View>
    )};

  if (order == null) {
    return (
      <SafeAreaView style={[styles.container, darkMode && styles.darkContainer]}>
        <View style={styles.errorContainer}>
          <MaterialIcons name="error-outline" size={48} color={Colors.error} />
          <Text style={[styles.errorText, darkMode && styles.darkText]}>Failed to load order details</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, darkMode && styles.darkContainer]}>
      <ScrollView style={styles.scrollView}>
        <View style={[styles.header, darkMode && styles.darkHeader]}>
          <Text style={[styles.orderId, darkMode && styles.darkText]}>Order #{order.orderId}</Text>
          <Text style={[styles.orderDate, darkMode && styles.darkSubText]}>
            {new Date(order.orderDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </Text>
        </View>
        

        <View style={[styles.section, darkMode && styles.darkCard]}>
          <Text style={[styles.sectionTitle, darkMode && styles.darkText]}>Shipping Address</Text>
          <Text style={[styles.address, darkMode && styles.darkSubText]}>{order.address}</Text>
        </View>

        <View style={[styles.section, darkMode && styles.darkCard]}>
          <Text style={[styles.sectionTitle, darkMode && styles.darkText]}>Order Items</Text>
          <FlatList
            data={order.items}
            renderItem={renderOrderItem}
            keyExtractor={(item) => item.productId.toString()}
            scrollEnabled={false}
          />
        </View>

        <View style={[styles.totalSection, darkMode && styles.darkCard]}>
          <View style={styles.totalRow}>
            <Text style={[styles.totalLabel, darkMode && styles.darkText]}>Total Amount:</Text>
            <Text style={[styles.totalValue, darkMode && styles.darkText]}>RM{order.totalAmount.toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    marginTop: 10,
    fontSize: 16,
    color: Colors.lightText,
  },
  header: {
    padding: 20,
    backgroundColor: Colors.lightSurface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightBorder,
  },
  darkHeader: {
    backgroundColor: Colors.darkSurface,
    borderBottomColor: Colors.darkBorder,
  },
  orderId: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.lightText,
    marginBottom: 5,
  },
  orderDate: {
    fontSize: 14,
    color: Colors.lightSubText,
  },
  section: {
    margin: 20,
    marginBottom: 10,
    padding: 15,
    backgroundColor: Colors.lightSurface,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.lightText,
    marginBottom: 10,
  },
  address: {
    fontSize: 16,
    color: Colors.lightSubText,
    lineHeight: 22,
  },
  itemCard: {
    backgroundColor: Colors.lightBackground,
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.lightBorder,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.lightText,
    flex: 1,
  },
  quantity: {
    fontSize: 14,
    color: Colors.lightSubText,
  },
  itemDetails: {
    gap: 5,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    color: Colors.lightSubText,
  },
  value: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.lightText,
  },
  totalSection: {
    margin: 20,
    marginTop: 10,
    padding: 15,
    backgroundColor: Colors.primary,
    borderRadius: 8,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  darkCard: {
    backgroundColor: Colors.darkSurface,
    borderColor: Colors.darkBorder,
  },
  darkText: {
    color: Colors.darkText,
  },
  darkSubText: {
    color: Colors.darkSubText,
  },
});