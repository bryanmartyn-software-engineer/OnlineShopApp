import React, { useContext } from 'react';
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ShopContext } from '../context/ShopContext';

export default function ProfileScreen() {
  const { darkMode, setDarkMode, cart, wishlist, getCartTotal } = useContext(ShopContext);

  const stats = [
    {
      icon: 'shopping-cart',
      label: 'Cart Items',
      value: cart.length,
      color: '#6C63FF',
    },
    {
      icon: 'favorite',
      label: 'Wishlist',
      value: wishlist.length,
      color: '#FF6B6B',
    },
    {
      icon: 'attach-money',
      label: 'Cart Total',
      value: `$${getCartTotal().toFixed(2)}`,
      color: '#4CAF50',
    },
  ];

  return (
    <SafeAreaView style={[styles.container, darkMode && styles.darkContainer]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={[styles.avatarContainer, darkMode && styles.darkAvatarContainer]}>
            <MaterialIcons name="person" size={50} color="#6C63FF" />
          </View>
          <Text style={[styles.userName, darkMode && styles.darkText]}>
            Guest User
          </Text>
          <Text style={[styles.userEmail, darkMode && styles.darkSubText]}>
            guest@example.com
          </Text>
        </View>

        <View style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <View key={index} style={[styles.statCard, darkMode && styles.darkCard]}>
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
          ))}
        </View>

        <View style={[styles.section, darkMode && styles.darkSection]}>
          <Text style={[styles.sectionTitle, darkMode && styles.darkSubText]}>
            Preferences
          </Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <View style={[styles.iconContainer, { backgroundColor: 'rgba(108, 99, 255, 0.1)' }]}>
                <MaterialIcons 
                  name={darkMode ? 'dark-mode' : 'light-mode'} 
                  size={20} 
                  color="#6C63FF" 
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
              trackColor={{ false: '#e0e0e0', true: 'rgba(108, 99, 255, 0.3)' }}
              thumbColor={darkMode ? '#6C63FF' : '#f5f5f5'}
            />
          </View>
        </View>

        <View style={[styles.section, darkMode && styles.darkSection]}>
          <Text style={[styles.sectionTitle, darkMode && styles.darkSubText]}>
            Account
          </Text>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <MaterialIcons name="person-outline" size={22} color="#6C63FF" />
              <Text style={[styles.menuText, darkMode && styles.darkText]}>
                Edit Profile
              </Text>
            </View>
            <MaterialIcons name="chevron-right" size={22} color={darkMode ? '#888' : '#999'} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <MaterialIcons name="location-on" size={22} color="#6C63FF" />
              <Text style={[styles.menuText, darkMode && styles.darkText]}>
                Shipping Address
              </Text>
            </View>
            <MaterialIcons name="chevron-right" size={22} color={darkMode ? '#888' : '#999'} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <MaterialIcons name="payment" size={22} color="#6C63FF" />
              <Text style={[styles.menuText, darkMode && styles.darkText]}>
                Payment Methods
              </Text>
            </View>
            <MaterialIcons name="chevron-right" size={22} color={darkMode ? '#888' : '#999'} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <MaterialIcons name="history" size={22} color="#6C63FF" />
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

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <MaterialIcons name="help-outline" size={22} color="#6C63FF" />
              <Text style={[styles.menuText, darkMode && styles.darkText]}>
                Help Center
              </Text>
            </View>
            <MaterialIcons name="chevron-right" size={22} color={darkMode ? '#888' : '#999'} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <MaterialIcons name="info-outline" size={22} color="#6C63FF" />
              <Text style={[styles.menuText, darkMode && styles.darkText]}>
                About
              </Text>
            </View>
            <MaterialIcons name="chevron-right" size={22} color={darkMode ? '#888' : '#999'} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuItem, styles.logoutButton]}>
            <View style={styles.menuLeft}>
              <MaterialIcons name="logout" size={22} color="#FF6B6B" />
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
    backgroundColor: '#f8f9fa',
  },
  darkContainer: {
    backgroundColor: '#121212',
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
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  darkAvatarContainer: {
    backgroundColor: '#1e1e1e',
    shadowColor: '#000',
    shadowOpacity: 0.3,
  },
  userName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  statsGrid: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
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
    color: '#2c3e50',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: '#7f8c8d',
    textAlign: 'center',
  },
  darkText: {
    color: '#ecf0f1',
  },
  darkSubText: {
    color: '#bdc3c7',
  },
  section: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  darkSection: {
    backgroundColor: '#1e1e1e',
    shadowColor: '#000',
    shadowOpacity: 0.3,
  },
  lastSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7f8c8d',
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
    color: '#2c3e50',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 12,
    color: '#7f8c8d',
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
    color: '#2c3e50',
  },
  logoutButton: {
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    marginTop: 4,
    paddingTop: 16,
  },
  logoutText: {
    fontSize: 16,
    color: '#FF6B6B',
    fontWeight: '500',
  },
});