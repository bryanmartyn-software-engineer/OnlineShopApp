import React, { useContext } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ShopContext } from '../context/ShopContext';

const { width } = Dimensions.get('window');

export default function MainScreen({ navigation }) {
  const { darkMode } = useContext(ShopContext);

  const features = [
    {
      icon: 'local-shipping',
      title: 'Fast Shipping',
      description: 'Free shipping on orders over $50',
      color: '#6C63FF',
    },
    {
      icon: 'security',
      title: 'Secure Payment',
      description: 'Your transactions are protected',
      color: '#4CAF50',
    },
    {
      icon: 'undo',
      title: 'Easy Returns',
      description: '30-day return policy on all items',
      color: '#FF6B6B',
    },
    {
      icon: 'support-agent',
      title: '24/7 Support',
      description: 'Customer service always available',
      color: '#FFA500',
    },
  ];

  const categories = [
    { name: 'Electronics', icon: 'devices', color: '#E8593C' },
    { name: 'Clothing', icon: 'checkroom', color: '#3B8BD4' },
    { name: 'Footwear', icon: 'sports', color: '#639922' },
    { name: 'Accessories', icon: 'watch', color: '#D4537E' },
  ];

  return (
    <SafeAreaView style={[styles.container, darkMode && styles.darkContainer]}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header Section */}
        <View style={[styles.headerSection, darkMode && styles.darkHeaderSection]}>
          <View style={styles.logoContainer}>
            <MaterialIcons name="shopping-bag" size={60} color="#6C63FF" />
          </View>
          <Text style={[styles.brandName, darkMode && styles.darkText]}>
            ShopHub
          </Text>
          <Text style={[styles.tagline, darkMode && styles.darkSubText]}>
            Your favorite online marketplace
          </Text>
        </View>

        {/* Hero Section */}
        <View style={[styles.heroSection, darkMode && styles.darkCard]}>
          <MaterialIcons 
            name="shopping-cart" 
            size={80} 
            color="#6C63FF" 
            style={styles.heroIcon}
          />
          <Text style={[styles.heroTitle, darkMode && styles.darkText]}>
            Welcome to ShopHub
          </Text>
          <Text style={[styles.heroSubtitle, darkMode && styles.darkSubText]}>
            Discover thousands of products at unbeatable prices
          </Text>
          <TouchableOpacity
            style={styles.startShoppingButton}
            onPress={() => navigation.navigate('Home')}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Start Shopping</Text>
            <MaterialIcons name="arrow-forward" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Features Section */}
        <View style={styles.featuresSection}>
          <Text style={[styles.sectionTitle, darkMode && styles.darkText]}>
            Why Choose Us
          </Text>
          <View style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <View 
                key={index} 
                style={[styles.featureCard, darkMode && styles.darkCard]}
              >
                <View style={[styles.featureIconContainer, { backgroundColor: `${feature.color}15` }]}>
                  <MaterialIcons 
                    name={feature.icon} 
                    size={32} 
                    color={feature.color} 
                  />
                </View>
                <Text style={[styles.featureTitle, darkMode && styles.darkText]}>
                  {feature.title}
                </Text>
                <Text style={[styles.featureDescription, darkMode && styles.darkSubText]}>
                  {feature.description}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Categories Section */}
        <View style={styles.categoriesSection}>
          <Text style={[styles.sectionTitle, darkMode && styles.darkText]}>
            Shop by Category
          </Text>
          <View style={styles.categoriesGrid}>
            {categories.map((category, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.categoryCard, darkMode && styles.darkCard]}
                onPress={() => navigation.navigate('Home')}
                activeOpacity={0.7}
              >
                <View style={[styles.categoryIconContainer, { backgroundColor: category.color }]}>
                  <MaterialIcons name={category.icon} size={40} color="#fff" />
                </View>
                <Text style={[styles.categoryName, darkMode && styles.darkText]}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Stats Section */}
        <View style={[styles.statsSection, darkMode && styles.darkCard]}>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, darkMode && styles.darkText]}>
              10K+
            </Text>
            <Text style={[styles.statLabel, darkMode && styles.darkSubText]}>
              Products
            </Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, darkMode && styles.darkText]}>
              100K+
            </Text>
            <Text style={[styles.statLabel, darkMode && styles.darkSubText]}>
              Happy Customers
            </Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, darkMode && styles.darkText]}>
              50+
            </Text>
            <Text style={[styles.statLabel, darkMode && styles.darkSubText]}>
              Brands
            </Text>
          </View>
        </View>

        {/* CTA Section */}
        <View style={styles.ctaSection}>
          <Text style={[styles.ctaTitle, darkMode && styles.darkText]}>
            Ready to explore?
          </Text>
          <TouchableOpacity
            style={[styles.exploreButton, darkMode && { backgroundColor: '#6C63FF' }]}
            onPress={() => navigation.navigate('Home')}
            activeOpacity={0.8}
          >
            <Text style={styles.exploreButtonText}>Browse All Products</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.learnMoreButton, darkMode && styles.darkLearnMoreButton]}
            onPress={() => navigation.navigate('About')}
            activeOpacity={0.8}
          >
            <Text style={[styles.learnMoreButtonText, darkMode && styles.darkLearnMoreButtonText]}>
              Learn More About Us
            </Text>
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
  scrollContent: {
    paddingBottom: 20,
  },
  
  // Header Section
  headerSection: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: '#ffffff',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  darkHeaderSection: {
    backgroundColor: '#1e1e1e',
    shadowColor: '#000',
    shadowOpacity: 0.3,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(108, 99, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  brandName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 4,
  },
  tagline: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  darkText: {
    color: '#ecf0f1',
  },
  darkSubText: {
    color: '#bdc3c7',
  },

  // Hero Section
  heroSection: {
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 24,
    padding: 24,
    backgroundColor: '#ffffff',
    borderRadius: 20,
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
  heroIcon: {
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 8,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  startShoppingButton: {
    backgroundColor: '#6C63FF',
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  // Features Section
  featuresSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 16,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  featureCard: {
    width: (width - 48) / 2,
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
  featureIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 12,
    color: '#7f8c8d',
    textAlign: 'center',
    lineHeight: 16,
  },

  // Categories Section
  categoriesSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: (width - 48) / 2,
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
  categoryIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
    textAlign: 'center',
  },

  // Stats Section
  statsSection: {
    marginHorizontal: 16,
    marginBottom: 24,
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#6C63FF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#e0e0e0',
  },

  // CTA Section
  ctaSection: {
    marginHorizontal: 16,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  ctaTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 16,
    textAlign: 'center',
  },
  exploreButton: {
    backgroundColor: '#6C63FF',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  exploreButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  learnMoreButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  darkLearnMoreButton: {
    backgroundColor: '#1e1e1e',
    borderColor: '#333',
  },
  learnMoreButtonText: {
    color: '#6C63FF',
    fontSize: 16,
    fontWeight: '600',
  },
  darkLearnMoreButtonText: {
    color: '#6C63FF',
  },
});