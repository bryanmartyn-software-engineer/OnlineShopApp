import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ShopContext } from '../context/ShopContext';
import { Colors } from '../styles/colors';

export default function ProductDetailScreen({ route, navigation }) {
  const { product } = route.params;
  const { darkMode, addToCart, toggleWishlist, isInWishlist, isLogin, BASE_URL } = useContext(ShopContext);
  const [quantity, setQuantity] = useState(1);

const handleAddToCart = () => {
    if (!isLogin) {
      return navigation.navigate('Profile', { screen: 'AuthScreen' });
    }
    addToCart(product, quantity);
    Alert.alert(
      'Added to Cart',
      `${product.name} has been added to your cart.`,
      [
        { text: 'Continue Shopping', style: 'cancel' },
        { text: 'Go to Cart', onPress: () => navigation.navigate('Cart') }
      ]
    );
  };

  const incrementQuantity = () => {
    if (!isLogin) {
      return navigation.navigate('Profile', { screen: 'AuthScreen' });
    }
    if (quantity < product.stock) {
      setQuantity(prev => prev + 1);
    }
  };

  const decrementQuantity = () => {
    if (!isLogin) {
      return navigation.navigate('Profile', { screen: 'AuthScreen' });
    }
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={[styles.container, darkMode && styles.darkContainer]}>
        <View style={styles.imageContainer}>
          <TouchableOpacity 
            style={[styles.backButton, darkMode && styles.darkBackButton]} 
            onPress={() => navigation.goBack()}
          >
            <MaterialIcons name="arrow-back" size={24} color={darkMode ? Colors.darkText : Colors.lightText} />
          </TouchableOpacity>
          <Image 
            source={{ uri: `${BASE_URL}${product.image}` }} 
            style={styles.mainImage}
            resizeMode="contain"
          />
        </View>

      <View style={[styles.contentContainer, darkMode && styles.darkContentContainer]}>
        <View style={styles.header}>
          <Text style={[styles.productName, darkMode && styles.darkText]}>
            {product.name}
          </Text>
          <TouchableOpacity onPress={() => 
            {if (!isLogin) {
              return navigation.navigate('Profile', { screen: 'AuthScreen' });
            }
            else
            toggleWishlist(product)}}>
            <MaterialIcons 
              name={isInWishlist(product.id) ? 'favorite' : 'favorite-border'} 
              size={28} 
              color={isInWishlist(product.id) ? Colors.error : (darkMode ? Colors.darkSubText : Colors.lightSubText)} 
            />
          </TouchableOpacity>
        </View>

        <View style={styles.ratingSection}>
          <View style={styles.ratingContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <MaterialIcons
                key={star}
                name="star"
                size={20}
                color={star <= Math.floor(product.rating) ? '#FFD700' : '#e0e0e0'}
              />
            ))}
          </View>
          <Text style={[styles.ratingText, darkMode && styles.darkSubText]}>
            {product.rating} out of 5
          </Text>
        </View>

        <Text style={[styles.price, darkMode && styles.darkText]}>
          ${product.price.toFixed(2)}
        </Text>

        <View style={styles.stockContainer}>
          <MaterialIcons 
            name={product.stock > 0 ? 'check-circle' : 'cancel'} 
            size={20} 
            color={product.stock > 0 ? '#4CAF50' : '#FF6B6B'} 
          />
          <Text style={[
            styles.stockText,
            { color: product.stock > 0 ? Colors.success : Colors.error }
          ]}>
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, darkMode && styles.darkText]}>
            Description
          </Text>
          <Text style={[styles.description, darkMode && styles.darkSubText]}>
            {product.description}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, darkMode && styles.darkText]}>
            Category
          </Text>
          <View style={[styles.categoryBadge, darkMode && styles.darkCategoryBadge]}>
            <Text style={styles.categoryText}>{product.category}</Text>
          </View>
        </View>

        {product.stock > 0 && (
          <View style={styles.quantitySection}>
            <Text style={[styles.sectionTitle, darkMode && styles.darkText]}>
              Quantity
            </Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                style={[styles.quantityButton, darkMode && styles.darkQuantityButton]}
                onPress={decrementQuantity}
                disabled={quantity <= 1}
              >
                <MaterialIcons 
                  name="remove" 
                  size={20} 
                  color={quantity <= 1 ? (darkMode ? Colors.darkBorder : Colors.lightBorder) : Colors.primary} 
                />
              </TouchableOpacity>
              
              <Text style={[styles.quantity, darkMode && styles.darkText]}>
                {quantity}
              </Text>
              
              <TouchableOpacity
                style={[styles.quantityButton, darkMode && styles.darkQuantityButton]}
                onPress={incrementQuantity}
                disabled={quantity >= product.stock}
              >
                <MaterialIcons 
                  name="add" 
                  size={20} 
                  color={quantity >= product.stock ? (darkMode ? Colors.darkBorder : Colors.lightBorder) : Colors.primary} 
                />
              </TouchableOpacity>
            </View>
          </View>
        )}

        <TouchableOpacity
          style={[
            styles.addToCartButton,
            (!product.stock || product.stock === 0) && styles.disabledButton
          ]}
          onPress={handleAddToCart}
          disabled={!product.stock || product.stock === 0}
          activeOpacity={0.8}
        >
          <MaterialIcons name="shopping-cart" size={24} color="#fff" />
          <Text style={styles.addToCartText}>
            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </View>
  );
}

const getProductIcon = (category) => {
  switch(category) {
    case 'Electronics': return 'devices';
    case 'Clothing': return 'checkroom';
    case 'Footwear': return 'sports';
    case 'Accessories': return 'watch';
    default: return 'inventory';
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightBackground,
  },
  darkContainer: {
    backgroundColor: Colors.darkBackground,
  },
  imageContainer: {
    backgroundColor: Colors.lightSurface,
    padding: 32,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  mainImage: {
    width: '100%',
    height: 300,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  darkContentContainer: {
    backgroundColor: Colors.darkBackground,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  productName: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.lightText,
    flex: 1,
    marginRight: 12,
  },
  darkText: {
    color: Colors.darkText,
  },
  ratingSection: {
    marginBottom: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  ratingText: {
    fontSize: 14,
    color: Colors.lightSubText,
  },
  price: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: 16,
  },
  stockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 8,
  },
  stockText: {
    fontSize: 14,
    fontWeight: '500',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.lightText,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: Colors.lightSubText,
    lineHeight: 22,
  },
  darkSubText: {
    color: Colors.darkSubText,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(201, 155, 105, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  darkCategoryBadge: {
    backgroundColor: 'rgba(201, 155, 105, 0.2)',
  },
  categoryText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  quantitySection: {
    marginBottom: 24,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  quantityButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.lightSurface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.lightBorder,
  },
  darkQuantityButton: {
    backgroundColor: Colors.darkSurface,
    borderColor: Colors.darkBorder,
  },
  quantity: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.lightText,
    minWidth: 40,
    textAlign: 'center',
  },
  addToCartButton: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 8,
    marginBottom: 20,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  disabledButton: {
    backgroundColor: Colors.lightSubText,
    shadowOpacity: 0,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  darkBackButton: {
    backgroundColor: 'rgba(30, 30, 30, 0.8)',
  },
});