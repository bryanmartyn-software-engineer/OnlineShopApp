import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  SafeAreaView,
  Image,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ShopContext } from '../context/ShopContext';
import { Colors } from '../styles/colors';

export default function SearchScreen({ navigation }) {
  const { products, darkMode, toggleWishlist, isInWishlist, isLogin, BASE_URL } = useContext(ShopContext);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter(product => {
    if (searchQuery.trim() === '') return [];
    return product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const getProductIcon = (category) => {
    switch (category) {
      case 'Electronics': return 'devices';
      case 'Clothing': return 'checkroom';
      case 'Footwear': return 'sports';
      case 'Accessories': return 'watch';
      default: return 'inventory';
    }
  };

  const renderProductCard = ({ item }) => (
    <TouchableOpacity
      style={[styles.productCard, darkMode && styles.darkCard]}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
      activeOpacity={0.7}
    >
      <View style={styles.productImageContainer}>
        <Image
          source={{ uri: `${BASE_URL}${item.image}` }}
          style={styles.productImage}
          resizeMode="cover"
        />
        <TouchableOpacity
          style={styles.wishlistIcon}
          onPress={() => {
            if (!isLogin) {
              return navigation.navigate('Profile', { screen: 'AuthScreen' });
            }
            toggleWishlist(item);
          }}
        >
          <MaterialIcons
            name={isInWishlist(item.id) ? 'favorite' : 'favorite-border'}
            size={20}
            color={isInWishlist(item.id) ? Colors.error : Colors.white}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.productInfo}>
        <Text style={[styles.productName, darkMode && styles.darkText]} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={[styles.productCategory, darkMode && styles.darkSubText]}>
          {item.category}
        </Text>
        <View style={styles.priceContainer}>
          <Text style={[styles.productPrice, darkMode && styles.darkText]}>
            ${item.price.toFixed(2)}
          </Text>
          <View style={styles.ratingBox}>
            <MaterialIcons name="star" size={14} color="#FFD700" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, darkMode && styles.darkContainer]}>
      <View style={styles.searchHeader}>
        <View style={styles.searchHeaderRow}>
          <View style={[styles.searchContainer, darkMode && styles.darkSearchContainer]}>
            <MaterialIcons name="search" size={20} color={darkMode ? '#888' : '#999'} />
            <TextInput
              style={[styles.searchInput, darkMode && styles.darkInput]}
              placeholder="Search products, categories..."
              placeholderTextColor={darkMode ? Colors.darkSubText : Colors.lightSubText}
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus={true}
              returnKeyType="search"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <MaterialIcons name="close" size={20} color={darkMode ? '#888' : '#999'} />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity 
            style={[styles.searchButton, darkMode && styles.darkSearchButton]}
            onPress={() => {/* Search is already filtered by state, but this button provides the 'back then' feel */}}
          >
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={filteredProducts}
        renderItem={renderProductCard}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.productList}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialIcons
              name={searchQuery === '' ? "search" : "search-off"}
              size={80}
              color={darkMode ? Colors.darkSubText : Colors.lightSubText}
            />
            <Text style={[styles.emptyText, darkMode && styles.darkText]}>
              {searchQuery === '' ? "Search for products" : "No results found"}
            </Text>
            <Text style={[styles.emptySubText, darkMode && styles.darkSubText]}>
              {searchQuery === '' ? "Find your favorites items here" : "Try a different keyword"}
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
    backgroundColor: Colors.lightBackground,
  },
  darkContainer: {
    backgroundColor: Colors.darkBackground,
  },
  searchHeader: {
    paddingVertical: 15,
    paddingHorizontal: 16,
  },
  searchHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.lightSurface,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.lightBorder,
  },
  searchButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  darkSearchButton: {
    backgroundColor: Colors.primaryDark,
  },
  searchButtonText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: 14,
  },
  darkSearchContainer: {
    backgroundColor: Colors.darkSurface,
    borderColor: Colors.darkBorder,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    fontSize: 16,
    color: Colors.lightText,
  },
  darkInput: {
    color: Colors.darkText,
  },
  productList: {
    padding: 10,
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
  },
  productCard: {
    backgroundColor: Colors.lightSurface,
    borderRadius: 20,
    marginBottom: 15,
    width: '48%',
    height: 260, // Match home screen alignment
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    overflow: 'hidden',
  },
  darkCard: {
    backgroundColor: Colors.darkSurface,
    shadowColor: Colors.black,
    shadowOpacity: 0.3,
  },
  productImageContainer: {
    width: '100%',
    height: 150,
    backgroundColor: '#F5F5F5',
    position: 'relative',
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  wishlistIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: Colors.black,
    padding: 6,
    borderRadius: 20,
    elevation: 2,
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.lightText,
    marginBottom: 2,
  },
  productCategory: {
    fontSize: 10,
    color: Colors.lightSubText,
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.primary,
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  ratingText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#B8860B',
    marginLeft: 2,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.lightText,
    marginTop: 20,
  },
  emptySubText: {
    fontSize: 14,
    color: Colors.lightSubText,
    marginTop: 8,
  },
  darkText: {
    color: Colors.darkText,
  },
  darkSubText: {
    color: Colors.darkSubText,
  },
});
