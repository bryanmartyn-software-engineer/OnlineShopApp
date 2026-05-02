import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ShopContext } from '../context/ShopContext';
import { Colors } from '../styles/colors';

export default function ShippingAddressScreen({ navigation, route }) {
  const { darkMode, userData, updateUser } = useContext(ShopContext);
  const [newAddress, setNewAddress] = useState(userData?.address || '');
  const returnTab = route.params?.returnTab;
  const returnScreen = route.params?.returnScreen;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChangeAddress = async () => {
    setLoading(true);
    setError('');
    const result = await updateUser(userData.userId, userData.name, userData.password, newAddress);
    setLoading(false);
    if (result.success) {
      if (returnTab && returnScreen) {
        navigation.navigate(returnTab, { screen: returnScreen });
      } else {
        navigation.goBack();
      }
    } else {
      setError(result.error || 'Failed to update address');
    }
  };

  const isDisabled = !newAddress.trim() || newAddress.trim() === (userData?.address || '').trim();

  return (
    <SafeAreaView style={[styles.container, darkMode && styles.darkContainer]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Text style={[styles.label, darkMode && styles.darkLabel]}>Change Shipping Address</Text>
          <TextInput
            style={[styles.input, darkMode && styles.darkInput]}
            value={newAddress}
            onChangeText={setNewAddress}
            placeholder="Enter new address..."
            placeholderTextColor={darkMode ? Colors.darkSubText : Colors.lightSubText}
          />
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          <TouchableOpacity
            style={[styles.button, isDisabled && { opacity: 0.5 }]}
            disabled={isDisabled || loading}
            onPress={handleChangeAddress}>
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.buttonText}>Change Address</Text>
            )}
          </TouchableOpacity>
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
  content: {
    padding: 20,
  },
  section: {
    marginTop: 20,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.lightText,
    marginBottom: 10,
  },
  darkLabel: {
    color: Colors.darkText,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.lightBorder,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: Colors.lightSurface,
    fontSize: 20,
    minHeight: 60,
    textAlignVertical: 'center',
  },
  darkInput: {
    backgroundColor: Colors.darkSurface,
    borderColor: Colors.darkBorder,
    color: Colors.darkText,
  },
  errorText: {
    color: Colors.error,
    marginTop: 10,
    fontSize: 14,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: Colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  darkText: { color: Colors.darkText },
  darkSubText: { color: Colors.darkSubText },
});
