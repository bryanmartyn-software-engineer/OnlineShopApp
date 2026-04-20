import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ShopContext } from '../context/ShopContext';

export default function HomeScreen({ navigation }) {
  const { products, darkMode, loading, toggleWishlist, isInWishlist } = useContext(ShopContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Electronics', 'Clothing', 'Footwear', 'Accessories'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const renderProductCard = ({ item }) => (
    <TouchableOpacity
      style={[styles.productCard, darkMode && styles.darkCard]}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
      activeOpacity={0.7}
    >
      <View style={styles.productImagePlaceholder}>
        <MaterialIcons 
          name={getProductIcon(item.category)} 
          size={40} 
          color="#6C63FF" 
        />
      </View>
      
      <View style={styles.productInfo}>
        <View style={styles.productHeader}>
          <Text style={[styles.productName, darkMode && styles.darkText]} numberOfLines={1}>
            {item.name}
          </Text>
          <TouchableOpacity onPress={() => toggleWishlist(item)}>
            <MaterialIcons 
              name={isInWishlist(item.id) ? 'favorite' : 'favorite-border'} 
              size={22} 
              color={isInWishlist(item.id) ? '#FF6B6B' : (darkMode ? '#888' : '#999')} 
            />
          </TouchableOpacity>
        </View>
        
        <View style={styles.ratingContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <MaterialIcons
              key={star}
              name="star"
              size={14}
              color={star <= Math.floor(item.rating) ? '#FFD700' : '#e0e0e0'}
            />
          ))}
          <Text style={[styles.ratingText, darkMode && styles.darkSubText]}>
            ({item.rating})
          </Text>
        </View>
        
        <Text style={[styles.productDescription, darkMode && styles.darkSubText]} numberOfLines={2}>
          {item.description}
        </Text>
        
        <View style={styles.productFooter}>
          <Text style={[styles.productPrice, darkMode && styles.darkText]}>
            ${item.price.toFixed(2)}
          </Text>
          <View style={[
            styles.stockBadge,
            { backgroundColor: item.stock > 0 ? 'rgba(76, 175, 80, 0.1)' : 'rgba(255, 107, 107, 0.1)' }
          ]}>
            <Text style={[
              styles.stockText,
              { color: item.stock > 0 ? '#4CAF50' : '#FF6B6B' }
            ]}>
              {item.stock > 0 ? `${item.stock} in stock` : 'Out of stock'}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
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

  if (loading) {
    return (
      <View style={[styles.loadingContainer, darkMode && styles.darkContainer]}>
        <ActivityIndicator size="large" color="#6C63FF" />
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.container, darkMode && styles.darkContainer]}>
      <View style={styles.header}>
        <Text style={[styles.welcomeText, darkMode && styles.darkText]}>
          Welcome to Shop
        </Text>
        <Text style={[styles.subText, darkMode && styles.darkSubText]}>
          Find your favorite products
        </Text>
      </View>

      <View style={[styles.searchContainer, darkMode && styles.darkSearchContainer]}>
        <MaterialIcons name="search" size={20} color={darkMode ? '#888' : '#999'} />
        <TextInput
          style={[styles.searchInput, darkMode && styles.darkInput]}
          placeholder="Search products..."
          placeholderTextColor={darkMode ? '#666' : '#999'}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.categoriesContainer}>
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.categoryChip,
                selectedCategory === item && styles.categoryChipActive,
                darkMode && styles.darkCategoryChip,
              ]}
              onPress={() => setSelectedCategory(item)}
            >
              <Text style={[
                styles.categoryText,
                selectedCategory === item && styles.categoryTextActive,
                darkMode && styles.darkCategoryText,
              ]}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item}
          contentContainerStyle={styles.categoriesList}
        />
      </View>

      <FlatList
        data={filteredProducts}
        renderItem={renderProductCard}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.productList}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialIcons name="search-off" size={48} color={darkMode ? '#666' : '#999'} />
            <Text style={[styles.emptyText, darkMode && styles.darkText]}>
              No products found
            </Text>
            <Text style={[styles.emptySubText, darkMode && styles.darkSubText]}>
              Try adjusting your search or filter
            </Text>
          </View>
        }
      />
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 16,
    paddingTop: 8,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 4,
  },
  subText: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    marginBottom: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  darkSearchContainer: {
    backgroundColor: '#1e1e1e',
    borderColor: '#333',
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    fontSize: 16,
    color: '#2c3e50',
  },
  darkInput: {
    color: '#ecf0f1',
  },
  categoriesContainer: {
    marginBottom: 16,
  },
  categoriesList: {
    paddingHorizontal: 16,
  },
  categoryChip: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  darkCategoryChip: {
    backgroundColor: '#1e1e1e',
    borderColor: '#333',
  },
  categoryChipActive: {
    backgroundColor: '#6C63FF',
    borderColor: '#6C63FF',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#7f8c8d',
  },
  categoryTextActive: {
    color: '#ffffff',
  },
  darkCategoryText: {
    color: '#bdc3c7',
  },
  productList: {
    padding: 16,
    paddingTop: 0,
  },
  productCard: {
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
  productImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: 'rgba(108, 99, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  productInfo: {
    flex: 1,
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    flex: 1,
    marginRight: 8,
  },
  darkText: {
    color: '#ecf0f1',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingText: {
    fontSize: 12,
    color: '#7f8c8d',
    marginLeft: 4,
  },
  productDescription: {
    fontSize: 13,
    color: '#7f8c8d',
    marginBottom: 8,
    lineHeight: 18,
  },
  darkSubText: {
    color: '#bdc3c7',
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#6C63FF',
  },
  stockBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  stockText: {
    fontSize: 11,
    fontWeight: '500',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
  },
});