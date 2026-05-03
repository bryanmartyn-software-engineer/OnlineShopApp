import React, { useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ShopContext } from '../context/ShopContext';
import { Colors } from '../styles/colors';

export default function WishlistScreen({ navigation }) {
  const { wishlist, darkMode, toggleWishlist, addToCart, isLogin, BASE_URL } = useContext(ShopContext);

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
      <View style={styles.itemImageContainer}>
        <Image
          source={{ uri: `${BASE_URL}${item.image}` }}
          style={styles.itemImage}
          resizeMode="cover"
        />
      </View>
      
      <View style={styles.itemInfo}>
        <View style={styles.itemHeader}>
          <Text style={[styles.itemName, darkMode && styles.darkText]} numberOfLines={1}>
            {item.name}
          </Text>
          <TouchableOpacity onPress={() => toggleWishlist(item)}>
            <MaterialIcons name="favorite" size={22} color={Colors.error} />
          </TouchableOpacity>
        </View>
        
        <Text style={[styles.itemCategory, darkMode && styles.darkSubText]}>
          {item.category}
        </Text>
        
        <View style={styles.itemFooter}>
          <Text style={[styles.itemPrice, darkMode && styles.darkText]}>
            RM{item.price.toFixed(2)}
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

  if (!isLogin) {
    return (
      <SafeAreaView style={[styles.container, darkMode && styles.darkContainer]}>
        <View style={styles.centerContainer}>
          <Text style={[
            styles.loginText,
            darkMode && styles.darkLoginText
          ]}>
            You must log in to view your wishlist
          </Text>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate('Profile', {
              screen: 'Login',
              params: { type: 'login', returnTo: 'WishlistScreen' }
            })}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
  else if (wishlist.length === 0) {
    return (
      <SafeAreaView style={[styles.container, darkMode && styles.darkContainer]}>
        <View style={styles.emptyContainer}>
          <MaterialIcons name="favorite-border" size={64} color={darkMode ? Colors.darkSubText : Colors.lightSubText} />
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

  else {
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightBackground,
  },
  darkContainer: {
    backgroundColor: Colors.darkBackground,
  },
  wishlistList: {
    padding: 16,
  },
  wishlistItem: {
    flexDirection: 'row',
    backgroundColor: Colors.lightSurface,
    borderRadius: 16,
    marginBottom: 12,
    padding: 12,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  darkCard: {
    backgroundColor: Colors.darkSurface,
    shadowColor: Colors.black,
    shadowOpacity: 0.3,
  },
  itemImageContainer: {
    width: 70,
    height: 70,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    marginRight: 12,
    overflow: 'hidden',
  },
  itemImage: {
    width: '100%',
    height: '100%',
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
    color: Colors.lightText,
    flex: 1,
    marginRight: 8,
  },
  darkText: {
    color: Colors.darkText,
  },
  itemCategory: {
    fontSize: 12,
    color: Colors.lightSubText,
    marginBottom: 8,
  },
  darkSubText: {
    color: Colors.darkSubText,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.primary,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 4,
  },
  addButtonText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '500',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  loginText: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    color: '#2c3e50',
  },
  darkLoginText: {
    color: '#ecf0f1',
  },
  loginText: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    color: Colors.lightText,
    marginBottom: 20,
  },
  darkLoginText: {
    color: Colors.darkText,
  },
  loginButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 12,
  },
  loginButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
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
    color: Colors.lightText,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 14,
    color: Colors.lightSubText,
    textAlign: 'center',
    marginBottom: 24,
  },
  shopButton: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  shopButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});