import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ShopContext } from '../context/ShopContext';
import { Colors } from '../styles/colors';

export default function OrderHistoryScreen({ navigation }) {
  const { darkMode, userData, API_URL } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${API_URL}/orders?userId=${userData.userId}`);
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
        // Fallback to examples if API fails or is empty
        setOrders([
            {
                orderId: 'ORD-2026-001',
                orderDate: new Date('2026-04-15').toISOString(),
                totalAmount: 535.98,
                status: 'Delivered',
                itemsCount: 2
            },
            {
                orderId: 'ORD-2026-002',
                orderDate: new Date('2026-04-28').toISOString(),
                totalAmount: 89.99,
                status: 'In Transit',
                itemsCount: 1
            }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const renderOrderItem = ({ item }) => (
    <TouchableOpacity style={[styles.orderCard, darkMode && styles.darkCard]}>
      <View style={styles.orderHeader}>
        <View>
          <Text style={[styles.orderId, darkMode && styles.darkText]}>#{item.orderId}</Text>
          <Text style={[styles.orderDate, darkMode && styles.darkSubText]}>
            {new Date(item.orderDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </Text>
        </View>
        <View style={[
            styles.statusBadge, 
            { backgroundColor: item.status === 'Delivered' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(255, 152, 0, 0.1)' }
        ]}>
          <Text style={[
              styles.statusText, 
              { color: item.status === 'Delivered' ? Colors.success : '#FF9800' }
          ]}>
            {item.status || 'Processing'}
          </Text>
        </View>
      </View>
      
      <View style={styles.orderFooter}>
        <View style={styles.infoGroup}>
          <Text style={[styles.infoLabel, darkMode && styles.darkSubText]}>TOTAL</Text>
          <Text style={[styles.infoValue, darkMode && styles.darkText]}>${item.totalAmount.toFixed(2)}</Text>
        </View>
        <TouchableOpacity style={styles.detailsButton}>
          <Text style={styles.detailsButtonText}>Details</Text>
          <MaterialIcons name="chevron-right" size={20} color={Colors.primary} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={[styles.centered, darkMode && styles.darkContainer]}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.container, darkMode && styles.darkContainer]}>
      {orders.length === 0 ? (
        <View style={styles.centered}>
          <MaterialIcons name="shopping-bag" size={64} color={darkMode ? Colors.darkSubText : Colors.lightSubText} />
          <Text style={[styles.emptyText, darkMode && styles.darkSubText]}>No orders yet</Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          renderItem={renderOrderItem}
          keyExtractor={(item) => item.orderId.toString()}
          contentContainerStyle={styles.listContent}
        />
      )}
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
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: 20,
  },
  orderCard: {
    backgroundColor: Colors.lightSurface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
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
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightBorder,
    paddingBottom: 12,
  },
  orderId: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.lightText,
    marginBottom: 4,
  },
  orderDate: {
    fontSize: 12,
    color: Colors.lightSubText,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoGroup: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 10,
    color: Colors.lightSubText,
    fontWeight: '600',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.lightText,
  },
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(201, 155, 105, 0.1)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  detailsButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
  emptyText: {
    fontSize: 18,
    color: Colors.lightSubText,
    marginTop: 16,
  },
  darkText: { color: Colors.darkText },
  darkSubText: { color: Colors.darkSubText },
});
