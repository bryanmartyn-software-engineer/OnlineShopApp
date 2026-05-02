import React, { useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ShopContext } from '../context/ShopContext';
import { Colors } from '../styles/colors';

export default function PaymentMethodsScreen({ navigation }) {
  const { darkMode } = useContext(ShopContext);

  const methods = [
    {
      id: 1,
      type: 'Visa',
      number: '**** **** **** 4589',
      expiry: '12/26',
      isDefault: true,
      color: '#1a1f71',
    }
  ];

  return (
    <SafeAreaView style={[styles.container, darkMode && styles.darkContainer]}>
      <ScrollView contentContainerStyle={styles.content}>
        {methods.map((item) => (
          <View key={item.id} style={[styles.card, { backgroundColor: item.color }]}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardType}>{item.type}</Text>
              <MaterialIcons name="contactless" size={24} color="#FFF" />
            </View>
            <Text style={styles.cardNumber}>{item.number}</Text>
            <View style={styles.cardFooter}>
              <View>
                <Text style={styles.cardLabel}>CARD HOLDER</Text>
                <Text style={styles.cardValue}>GUEST USER</Text>
              </View>
              <View>
                <Text style={styles.cardLabel}>EXPIRES</Text>
                <Text style={styles.cardValue}>{item.expiry}</Text>
              </View>
            </View>
          </View>
        ))}
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
  card: {
    height: 200,
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardType: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '800',
    fontStyle: 'italic',
  },
  cardNumber: {
    color: '#FFF',
    fontSize: 22,
    letterSpacing: 2,
    fontWeight: '600',
    marginVertical: 20,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 10,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardValue: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '700',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: Colors.primary,
    borderStyle: 'dashed',
    gap: 10,
    marginTop: 10,
  },
  darkAddButton: {
    backgroundColor: Colors.darkSurface,
  },
  addButtonText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: '700',
  },
});
