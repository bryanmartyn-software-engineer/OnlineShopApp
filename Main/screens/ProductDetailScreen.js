import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ShopContext } from '../context/ShopContext';

export default function ProductDetailScreen({ route, navigation }) {
  const { product } = route.params;
  const { darkMode, addToCart, toggleWishlist, isInWishlist } = useContext(ShopContext);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
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
    if (quantity < product.stock) {
      setQuantity(prev => prev + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <ScrollView style={[styles.container, darkMode && styles.darkContainer]}>
      <View style={styles.imageContainer}>
        <View style={styles.productImagePlaceholder}>
          <MaterialIcons 
            name={getProductIcon(product.category)} 
            size={80} 
            color="#6C63FF" 
          />
        </View>
      </View>

      <View style={[styles.contentContainer, darkMode && styles.darkContentContainer]}>
        <View style={styles.header}>
          <Text style={[styles.productName, darkMode && styles.darkText]}>
            {product.name}
          </Text>
          <TouchableOpacity onPress={() => toggleWishlist(product)}>
            <MaterialIcons 
              name={isInWishlist(product.id) ? 'favorite' : 'favorite-border'} 
              size={28} 
              color={isInWishlist(product.id) ? '#FF6B6B' : (darkMode ? '#888' : '#999')} 
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
            { color: product.stock > 0 ? '#4CAF50' : '#FF6B6B' }
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
                  color={quantity <= 1 ? (darkMode ? '#444' : '#ccc') : '#6C63FF'} 
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
                  color={quantity >= product.stock ? (darkMode ? '#444' : '#ccc') : '#6C63FF'} 
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
    backgroundColor: '#f8f9fa',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  imageContainer: {
    backgroundColor: '#ffffff',
    padding: 32,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  productImagePlaceholder: {
    width: 200,
    height: 200,
    borderRadius: 20,
    backgroundColor: 'rgba(108, 99, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  darkContentContainer: {
    backgroundColor: '#121212',
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
    color: '#2c3e50',
    flex: 1,
    marginRight: 12,
  },
  darkText: {
    color: '#ecf0f1',
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
    color: '#7f8c8d',
  },
  price: {
    fontSize: 32,
    fontWeight: '700',
    color: '#6C63FF',
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
    color: '#2c3e50',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#7f8c8d',
    lineHeight: 22,
  },
  darkSubText: {
    color: '#bdc3c7',
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(108, 99, 255, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  darkCategoryBadge: {
    backgroundColor: 'rgba(108, 99, 255, 0.2)',
  },
  categoryText: {
    color: '#6C63FF',
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
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  darkQuantityButton: {
    backgroundColor: '#1e1e1e',
    borderColor: '#333',
  },
  quantity: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    minWidth: 40,
    textAlign: 'center',
  },
  addToCartButton: {
    backgroundColor: '#6C63FF',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 8,
    marginBottom: 20,
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  disabledButton: {
    backgroundColor: '#bdc3c7',
    shadowOpacity: 0,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});