import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ShopContext } from '../context/ShopContext';
import { Colors } from '../styles/colors';

const { width, height: screenHeight } = Dimensions.get('window');

export default function ProductDetailScreen({ route, navigation }) {
  const { product } = route.params;
  const { darkMode, addToCart, toggleWishlist, isInWishlist, isLogin, BASE_URL } = useContext(ShopContext);
  const [quantity, setQuantity] = useState(1);

  const flatListRef = React.useRef(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleAddToCart = () => {
    if (!isLogin) {
      return navigation.navigate('Profile', {
        screen: 'Login',
        params: { returnTo: 'ProductDetail', returnToParams: { product } }
      });
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
      return navigation.navigate('Profile', {
        screen: 'Login',
        params: { returnTo: 'ProductDetail', returnToParams: { product } }
      });
    }
    if (quantity < product.stock) {
      setQuantity(prev => prev + 1);
    }
  };

  const decrementQuantity = () => {
    if (!isLogin) {
      return navigation.navigate('Profile', {
        screen: 'Login',
        params: { returnTo: 'ProductDetail', returnToParams: { product } }
      });
    }
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const scrollNext = () => {
    if (currentImageIndex < product.images.length - 1) {
      flatListRef.current.scrollToIndex({ index: currentImageIndex + 1 });
      setCurrentImageIndex(prev => prev + 1);
    }
  };

  const scrollPrev = () => {
    if (currentImageIndex > 0) {
      flatListRef.current.scrollToIndex({ index: currentImageIndex - 1 });
      setCurrentImageIndex(prev => prev - 1);
    }
  };

  const onScroll = (event) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);
    setCurrentImageIndex(roundIndex);
  };

  const formatCategory = (cat) => {
    return cat.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <View style={[styles.mainContainer, darkMode && styles.darkContainer]}>
      <TouchableOpacity
        style={[styles.backButton, darkMode && styles.darkBackButton]}
        onPress={() => navigation.goBack()}
      >
        <MaterialIcons name="arrow-back" size={24} color={darkMode ? Colors.darkText : Colors.lightText} />
      </TouchableOpacity>
      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.imageContainer}>

        <FlatList
          ref={flatListRef}
          data={product.images && product.images.length > 0 ? product.images : [product.image]}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          scrollEventThrottle={16}
          renderItem={({ item }) => (
            <View style={styles.carouselImageContainer}>
              <Image
                source={{ uri: `${BASE_URL}${item.startsWith('/') ? item : '/' + item}` }}
                style={styles.mainImage}
                resizeMode="contain"
              />
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />

        {product.images && product.images.length > 1 && (
          <>
            <TouchableOpacity
              style={[styles.carouselButton, styles.leftButton]}
              onPress={scrollPrev}
              disabled={currentImageIndex === 0}
            >
              <MaterialIcons name="chevron-left" size={30} color={currentImageIndex === 0 ? '#ccc' : Colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.carouselButton, styles.rightButton]}
              onPress={scrollNext}
              disabled={currentImageIndex === product.images.length - 1}
            >
              <MaterialIcons name="chevron-right" size={30} color={currentImageIndex === product.images.length - 1 ? '#ccc' : Colors.primary} />
            </TouchableOpacity>

            <View style={styles.pagination}>
              {product.images.map((_, i) => (
                <View
                  key={i}
                  style={[
                    styles.paginationDot,
                    currentImageIndex === i && styles.paginationDotActive
                  ]}
                />
              ))}
            </View>
          </>
        )}
      </View>


        <View style={[styles.contentContainer, darkMode && styles.darkContentContainer]}>
          <View style={styles.header}>
            <Text style={[styles.productName, darkMode && styles.darkText]}>
              {product.name}
            </Text>
            <TouchableOpacity onPress={() => {
              if (!isLogin) {
                return navigation.navigate('Profile', {
                  screen: 'Login',
                  params: { returnTo: 'ProductDetail', returnToParams: { product } }
                });
              }
              else
                toggleWishlist(product)
            }}>
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
                  size={22}
                  color={star <= Math.floor(product.rating) ? '#B8860B' : '#e0e0e0'}
                />
              ))}
            </View>
            <Text style={[styles.ratingText, darkMode && styles.darkSubText]}>
              {product.rating} / 5.0
            </Text>
          </View>

          <Text style={[styles.price, darkMode && styles.darkText]}>
            RM {product.price.toFixed(2)}
          </Text>

          <View style={styles.stockContainer}>
            <MaterialIcons
              name={product.stock > 0 ? 'check-circle' : 'cancel'}
              size={20}
              color={product.stock > 0 ? Colors.success : Colors.error}
            />
            <Text style={[
              styles.stockText,
              { color: product.stock > 0 ? Colors.success : Colors.error }
            ]}>
              {product.stock > 0 ? `${product.stock} Units Available` : 'Out of stock'}
            </Text>
          </View>

          {(product.material || product.dimension) && (
            <View style={[styles.detailsContainer, darkMode && styles.darkDetailsContainer]}>
              {product.material && (
                <View style={styles.detailItem}>
                  <View style={styles.detailIconContainer}>
                    <MaterialIcons name="layers" size={20} color={Colors.primary} />
                  </View>
                  <View style={styles.detailTextContainer}>
                    <Text style={[styles.detailLabel, darkMode && styles.darkSubText]}>Material</Text>
                    <Text style={[styles.detailValue, darkMode && styles.darkText]} numberOfLines={2}>
                      {product.material}
                    </Text>
                  </View>
                </View>
              )}
              <View style={styles.detailDivider} />
              {product.dimension && (
                <View style={styles.detailItem}>
                  <View style={styles.detailIconContainer}>
                    <MaterialIcons name="straighten" size={20} color={Colors.primary} />
                  </View>
                  <View style={styles.detailTextContainer}>
                    <Text style={[styles.detailLabel, darkMode && styles.darkSubText]}>Dimensions</Text>
                    <Text style={[styles.detailValue, darkMode && styles.darkText]}>
                      {product.dimension}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          )}

          <View style={styles.section}>
            <View style={styles.sectionHeaderRow}>
              <MaterialIcons name="subject" size={20} color={Colors.primary} style={{ marginRight: 8 }} />
              <Text style={[styles.sectionTitle, darkMode && styles.darkText]}>
                Description
              </Text>
            </View>
            <Text style={[styles.description, darkMode && styles.darkSubText]}>
              {product.description}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, darkMode && styles.darkText]}>
              Category
            </Text>
            <View style={styles.categoryContainer}>
              {product.category.split(',').map((cat, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.categoryBadge, darkMode && styles.darkCategoryBadge]}
                  onPress={() => navigation.navigate('Home', {
                    screen: 'HomeScreen',
                    params: { initialCategory: formatCategory(cat.trim()) }
                  })}
                >
                  <Text style={styles.categoryText}>{formatCategory(cat.trim())}</Text>
                </TouchableOpacity>
              ))}
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
  switch (category) {
    case 'Electronics': return 'devices';
    case 'Clothing': return 'checkroom';
    case 'Footwear': return 'sports';
    case 'Accessories': return 'watch';
    default: return 'inventory';
  }
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.lightBackground,
  },
  darkContainer: {
    backgroundColor: Colors.darkBackground,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  imageContainer: {
    backgroundColor: Colors.lightSurface,
    paddingVertical: 0,
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    position: 'relative',
    height: width, // Perfect square based on screen width
  },
  carouselImageContainer: {
    width: width,
    height: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  carouselButton: {
    position: 'absolute',
    top: '50%',
    marginTop: -20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  leftButton: {
    left: 10,
  },
  rightButton: {
    right: 10,
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    gap: 8,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
  },
  paginationDotActive: {
    backgroundColor: Colors.primary,
    width: 20,
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
  detailsContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    backgroundColor: 'rgba(0,0,0,0.02)',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  darkDetailsContainer: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderColor: 'rgba(255,255,255,0.1)',
  },
  detailItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  detailIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(201, 155, 105, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  detailTextContainer: {
    flex: 1,
  },
  detailDivider: {
    width: 1,
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.05)',
    marginHorizontal: 4,
  },
  detailLabel: {
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: Colors.lightSubText,
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.lightText,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(201, 155, 105, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(201, 155, 105, 0.2)',
  },
  darkCategoryBadge: {
    backgroundColor: 'rgba(201, 155, 105, 0.2)',
    borderColor: 'rgba(201, 155, 105, 0.3)',
  },
  categoryText: {
    color: Colors.primary,
    fontSize: 13,
    fontWeight: '600',
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