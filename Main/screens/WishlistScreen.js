import React, { useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ShopContext } from '../context/ShopContext';

export default function WishlistScreen({ navigation }) {
  const { wishlist, darkMode, toggleWishlist, addToCart } = useContext(ShopContext);

  const handleAddToCart = (item) => {
    addToCart(item);
    toggleWishlist(item);
  };

  const renderWishlistItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.wishlistItem, darkMode && styles.darkCard]}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
      activeOpacity={0.7}
    >
      <View style={styles.itemImagePlaceholder}>
        <MaterialIcons 
          name={getProductIcon(item.category)} 
          size={30} 
          color="#6C63FF" 
        />
      </View>
      
      <View style={styles.itemInfo}>
        <View style={styles.itemHeader}>
          <Text style={[styles.itemName, darkMode && styles.darkText]} numberOfLines={1}>
            {item.name}
          </Text>
          <TouchableOpacity onPress={() => toggleWishlist(item)}>
            <MaterialIcons name="favorite" size={22} color="#FF6B6B" />
          </TouchableOpacity>
        </View>
        
        <Text style={[styles.itemCategory, darkMode && styles.darkSubText]}>
          {item.category}
        </Text>
        
        <View style={styles.itemFooter}>
          <Text style={[styles.itemPrice, darkMode && styles.darkText]}>
            ${item.price.toFixed(2)}
          </Text>
          
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => handleAddToCart(item)}
          >
            <MaterialIcons name="shopping-cart" size={16} color="#fff" />
            <Text style={styles.addButtonText}>Add to Cart</Text>
          </TouchableOpacity>
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

  if (wishlist.length === 0) {
    return (
      <SafeAreaView style={[styles.container, darkMode && styles.darkContainer]}>
        <View style={styles.emptyContainer}>
          <MaterialIcons name="favorite-border" size={64} color={darkMode ? '#666' : '#ccc'} />
          <Text style={[styles.emptyText, darkMode && styles.darkText]}>
            Your wishlist is empty
          </Text>
          <Text style={[styles.emptySubText, darkMode && styles.darkSubText]}>
            Save your favorite items here!
          </Text>
          <TouchableOpacity
            style={styles.shopButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.shopButtonText}>Browse Products</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, darkMode && styles.darkContainer]}>
      <FlatList
        data={wishlist}
        renderItem={renderWishlistItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.wishlistList}
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
  wishlistList: {
    padding: 16,
  },
  wishlistItem: {
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
  itemImagePlaceholder: {
    width: 70,
    height: 70,
    borderRadius: 12,
    backgroundColor: 'rgba(108, 99, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    flex: 1,
    marginRight: 8,
  },
  darkText: {
    color: '#ecf0f1',
  },
  itemCategory: {
    fontSize: 12,
    color: '#7f8c8d',
    marginBottom: 8,
  },
  darkSubText: {
    color: '#bdc3c7',
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#6C63FF',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6C63FF',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 4,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2c3e50',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 24,
  },
  shopButton: {
    backgroundColor: '#6C63FF',
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  shopButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});