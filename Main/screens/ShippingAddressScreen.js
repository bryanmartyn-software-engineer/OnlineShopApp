import React, { useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ShopContext } from '../context/ShopContext';
import { Colors } from '../styles/colors';

export default function ShippingAddressScreen({ navigation }) {
  const { darkMode, userData } = useContext(ShopContext);

  const addresses = [
    {
      id: 1,
      type: 'Home',
      address: userData?.address || '123 App Street, Tech City',
      isDefault: true,
    },
    {
      id: 2,
      type: 'Office',
      address: '456 Business Park, Suite 200, Innovation District',
      isDefault: false,
    },
  ];

  return (
    <SafeAreaView style={[styles.container, darkMode && styles.darkContainer]}>
      <ScrollView contentContainerStyle={styles.content}>
        {addresses.map((item) => (
          <View key={item.id} style={[styles.addressCard, darkMode && styles.darkCard]}>
            <View style={styles.cardHeader}>
              <View style={styles.typeContainer}>
                <MaterialIcons 
                    name={item.type === 'Home' ? 'home' : 'work'} 
                    size={20} 
                    color={Colors.primary} 
                />
                <Text style={[styles.typeText, darkMode && styles.darkText]}>{item.type}</Text>
              </View>
              {item.isDefault && (
                <View style={styles.defaultBadge}>
                  <Text style={styles.defaultBadgeText}>Default</Text>
                </View>
              )}
            </View>
            <Text style={[styles.addressText, darkMode && styles.darkSubText]}>{item.address}</Text>
            <View style={styles.actions}>
              <TouchableOpacity style={styles.actionButton}>
                <MaterialIcons name="edit" size={18} color={Colors.primary} />
                <Text style={styles.actionText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <MaterialIcons name="delete-outline" size={18} color={Colors.error} />
                <Text style={[styles.actionText, { color: Colors.error }]}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
        
        <TouchableOpacity style={styles.addButton}>
          <MaterialIcons name="add" size={24} color="#FFF" />
          <Text style={styles.addButtonText}>Add New Address</Text>
        </TouchableOpacity>
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
  content: {
    padding: 20,
  },
  addressCard: {
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  typeText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.lightText,
  },
  defaultBadge: {
    backgroundColor: 'rgba(201, 155, 105, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  defaultBadgeText: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: '600',
  },
  addressText: {
    fontSize: 14,
    color: Colors.lightSubText,
    lineHeight: 20,
    marginBottom: 16,
  },
  actions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: Colors.lightBorder,
    paddingTop: 12,
    gap: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
  addButton: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginTop: 10,
    gap: 8,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  darkText: { color: Colors.darkText },
  darkSubText: { color: Colors.darkSubText },
});
