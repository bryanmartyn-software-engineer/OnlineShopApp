import React, { useContext, useEffect } from 'react';
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableHighlight,
  TouchableNativeFeedback
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ShopContext } from '../context/ShopContext';
import { Colors } from '../styles/colors';

export default function ProfileScreen({ navigation }) {
  const { darkMode, setDarkMode, cart, wishlist, getCartTotal, isLogin, userData, logout } = useContext(ShopContext);



  const stats = [
    {
      icon: 'shopping-cart',
      label: 'Cart Items',
      value: cart.length,
      color: Colors.primary,
      navigate: 'Cart',
    },
    {
      icon: 'favorite',
      label: 'Wishlist',
      value: wishlist.length,
      color: Colors.error,
      navigate: 'Wishlist',
    },
    {
      icon: 'attach-money',
      label: 'Cart Total',
      value: `$${getCartTotal().toFixed(2)}`,
      color: Colors.success,
    },
  ];

  return (
    <SafeAreaView style={[styles.container, darkMode && styles.darkContainer]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={[styles.avatarContainer, darkMode && styles.darkAvatarContainer]}>
            <MaterialIcons name="person" size={50} color={Colors.primary} />
          </View>
          <Text style={[styles.userName, darkMode && styles.darkText]}>
            {userData?.name || 'Guest User'}
          </Text>
          <Text style={[styles.userEmail, darkMode && styles.darkSubText]}>
            {userData?.email || 'guest@example.com'}
          </Text>
        </View>

        <View style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <TouchableOpacity activeOpacity={0.8} key={index} style={[styles.statButton, darkMode && styles.darkButton]}
              onPress={() => navigation.navigate(stat.navigate)} disabled={!stat.navigate}>
              <View style={[styles.statCard]}>
                <View style={[styles.statIconContainer, { backgroundColor: `${stat.color}15` }]}>
                  <MaterialIcons name={stat.icon} size={24} color={stat.color} />
                </View>
                <Text style={[styles.statValue, darkMode && styles.darkText]}>
                  {stat.value}
                </Text>
                <Text style={[styles.statLabel, darkMode && styles.darkSubText]}>
                  {stat.label}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={[styles.section, darkMode && styles.darkSection]}>
          <Text style={[styles.sectionTitle, darkMode && styles.darkSubText]}>
            Preferences
          </Text>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <View style={[styles.iconContainer, { backgroundColor: 'rgba(201, 155, 105, 0.1)' }]}>
                <MaterialIcons
                  name={darkMode ? 'dark-mode' : 'light-mode'}
                  size={20}
                  color={Colors.primary}
                />
              </View>
              <View>
                <Text style={[styles.settingLabel, darkMode && styles.darkText]}>
                  Dark Mode
                </Text>
                <Text style={[styles.settingDescription, darkMode && styles.darkSubText]}>
                  Switch between light and dark theme
                </Text>
              </View>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: Colors.lightBorder, true: 'rgba(201, 155, 105, 0.3)' }}
              thumbColor={darkMode ? Colors.primary : '#f5f5f5'}
            />
          </View>
        </View>

        <View style={[styles.section, darkMode && styles.darkSection]}>
          <Text style={[styles.sectionTitle, darkMode && styles.darkSubText]}>
            Account
          </Text>

          <TouchableOpacity style={styles.menuItem}
            onPress={() => navigation.navigate('EditProfile', { type: 'edit' })}>
            <View style={styles.menuLeft}>
              <MaterialIcons name="person-outline" size={22} color={Colors.primary} />
              <Text style={[styles.menuText, darkMode && styles.darkText]}>
                Edit Profile
              </Text>
            </View>
            <MaterialIcons name="chevron-right" size={22} color={darkMode ? '#888' : '#999'} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}
            onPress={() => navigation.navigate('ShippingAddress')}>
            <View style={styles.menuLeft}>
              <MaterialIcons name="location-on" size={22} color={Colors.primary} />
              <Text style={[styles.menuText, darkMode && styles.darkText]}>
                Shipping Address
              </Text>
            </View>
            <MaterialIcons name="chevron-right" size={22} color={darkMode ? '#888' : '#999'} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}
            onPress={() => navigation.navigate('PaymentMethods')}>
            <View style={styles.menuLeft}>
              <MaterialIcons name="payment" size={22} color={Colors.primary} />
              <Text style={[styles.menuText, darkMode && styles.darkText]}>
                Payment Methods
              </Text>
            </View>
            <MaterialIcons name="chevron-right" size={22} color={darkMode ? '#888' : '#999'} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}
            onPress={() => navigation.navigate('OrderHistory')}>
            <View style={styles.menuLeft}>
              <MaterialIcons name="history" size={22} color={Colors.primary} />
              <Text style={[styles.menuText, darkMode && styles.darkText]}>
                Order History
              </Text>
            </View>
            <MaterialIcons name="chevron-right" size={22} color={darkMode ? '#888' : '#999'} />
          </TouchableOpacity>
        </View>

        <View style={[styles.section, darkMode && styles.darkSection, styles.lastSection]}>
          <Text style={[styles.sectionTitle, darkMode && styles.darkSubText]}>
            Support
          </Text>

          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('HelpCenter')}>
            <View style={styles.menuLeft}>
              <MaterialIcons name="help-outline" size={22} color={Colors.primary} />
              <Text style={[styles.menuText, darkMode && styles.darkText]}>
                Help Center
              </Text>
            </View>
            <MaterialIcons name="chevron-right" size={22} color={darkMode ? '#888' : '#999'} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('AboutApp')}>
            <View style={styles.menuLeft}>
              <MaterialIcons name="info-outline" size={22} color={Colors.primary} />
              <Text style={[styles.menuText, darkMode && styles.darkText]}>
                About
              </Text>
            </View>
            <MaterialIcons name="chevron-right" size={22} color={darkMode ? '#888' : '#999'} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuItem, styles.logoutButton]} onPress={logout}>
            <View style={styles.menuLeft}>
              <MaterialIcons name="logout" size={22} color={Colors.error} />
              <Text style={styles.logoutText}>Logout</Text>
            </View>
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
  header: {
    alignItems: 'center',
    padding: 20,
    paddingTop: 30,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.lightSurface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  darkAvatarContainer: {
    backgroundColor: Colors.darkSurface,
    shadowColor: Colors.black,
    shadowOpacity: 0.3,
  },
  userName: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.lightText,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: Colors.lightSubText,
  },
  statsGrid: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  statButton: {
    backgroundColor: Colors.lightSurface,
    flex: 1,
    borderRadius: 16,
    padding: 16,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  darkButton: {
    backgroundColor: Colors.darkSurface,
    shadowColor: Colors.black,
    shadowOpacity: 0.3,
  },
  statCard: {
    alignItems: 'center',
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.lightText,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: Colors.lightSubText,
    textAlign: 'center',
  },
  darkText: {
    color: Colors.darkText,
  },
  darkSubText: {
    color: Colors.darkSubText,
  },
  section: {
    backgroundColor: Colors.lightSurface,
    borderRadius: 20,
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  darkSection: {
    backgroundColor: Colors.darkSurface,
    shadowColor: Colors.black,
    shadowOpacity: 0.3,
  },
  lastSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.lightSubText,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.lightText,
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 12,
    color: Colors.lightSubText,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuText: {
    fontSize: 16,
    color: Colors.lightText,
  },
  logoutButton: {
    borderTopWidth: 1,
    borderTopColor: Colors.lightBorder,
    marginTop: 4,
    paddingTop: 16,
  },
  logoutText: {
    fontSize: 16,
    color: Colors.error,
    fontWeight: '500',
  },
});