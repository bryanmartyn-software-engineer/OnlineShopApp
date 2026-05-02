import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Image,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ShopContext } from '../context/ShopContext';
import { Colors } from '../styles/colors';

export default function HomeScreen({ route, navigation }) {
  const { products, darkMode, loading, toggleWishlist, isInWishlist, isLogin, BASE_URL } = useContext(ShopContext);
  const [selectedCategory, setSelectedCategory] = useState(route.params?.initialCategory || 'All');
  const categories = ['All', 'Bedroom', 'Office', 'Dining', 'Outdoor', 'Living-Room'];

  // Update category if route params change
  React.useEffect(() => {
    if (route.params?.initialCategory) {
      setSelectedCategory(route.params.initialCategory);
    }
  }, [route.params?.initialCategory]);

  const filteredProducts = products.filter(product => {
    if (selectedCategory === 'All') return true;
    const productCategories = product.category.toLowerCase().split(',');
    return productCategories.includes(selectedCategory.toLowerCase());
  });

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
              return navigation.navigate('Profile', {
                screen: 'Login',
                params: { returnTo: 'HomeScreen' }
              });
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
            RM{item.price.toFixed(2)}
          </Text>
          <View style={styles.ratingBox}>
            <MaterialIcons name="star" size={14} color="#FFD700" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const HeaderComponent = () => (
    <>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <View style={styles.headerTextContainer}>
          <Text style={[styles.brandText, darkMode && styles.darkText]}>OnlineShopApp</Text>
          <Text style={[styles.taglineText, darkMode && styles.darkSubText]}>Your shop, your favorites.</Text>
        </View>
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
                darkMode && styles.darkCategoryChip,
                selectedCategory === item && (darkMode ? styles.categoryChipActive : styles.categoryChipActiveLight),
              ]}
              onPress={() => setSelectedCategory(item)}
            >
              <Text style={[
                styles.categoryText,
                darkMode && styles.darkCategoryText,
                selectedCategory === item && styles.categoryTextActive,
              ]}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item}
          contentContainerStyle={styles.categoriesList}
        />
      </View>
    </>
  );

  if (loading) {
    return (
      <View style={[styles.loadingContainer, darkMode && styles.darkContainer]}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.container, darkMode && styles.darkContainer]}>
      <FlatList
        data={filteredProducts}
        renderItem={renderProductCard}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={HeaderComponent}
        contentContainerStyle={styles.productList}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialIcons name="search-off" size={48} color={darkMode ? Colors.darkSubText : Colors.lightSubText} />
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
    backgroundColor: Colors.lightBackground,
  },
  darkContainer: {
    backgroundColor: Colors.darkBackground,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.lightBackground,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 15,
  },
  logoContainer: {
    backgroundColor: '#FFFFFF',
    padding: 8,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logo: {
    width: 60,
    height: 60,
  },
  headerTextContainer: {
    flex: 0,
  },
  brandText: {
    fontSize: 26,
    fontWeight: '800',
    color: Colors.lightText,
    lineHeight: 28,
  },
  taglineText: {
    fontSize: 14,
    color: Colors.lightSubText,
    marginTop: 2,
    fontWeight: '500',
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
    backgroundColor: Colors.lightSurface,
    marginRight: 8,
    borderWidth: 1,
    borderColor: Colors.lightBorder,
  },
  darkCategoryChip: {
    backgroundColor: Colors.darkSurface,
    borderColor: Colors.darkBorder,
  },
  categoryChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  categoryChipActiveLight: {
    backgroundColor: '#B8860B', // Gold for light mode
    borderColor: '#B8860B',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.lightSubText,
  },
  categoryTextActive: {
    color: Colors.white,
  },
  darkCategoryText: {
    color: Colors.darkSubText,
  },
  productList: {
    padding: 10,
  },
  row: {
    justifyContent: 'space-between',
  },
  productCard: {
    backgroundColor: Colors.lightSurface,
    borderRadius: 20,
    marginBottom: 15,
    width: '48%',
    height: 260, // Enforce alignment
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
    fontSize: 16,
    fontWeight: '700',
    color: Colors.lightText,
    marginBottom: 2,
  },
  productCategory: {
    fontSize: 12,
    color: Colors.lightSubText,
    marginBottom: 8,
  },
  darkText: {
    color: Colors.darkText,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 18,
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
    fontSize: 12,
    fontWeight: '700',
    color: '#B8860B',
    marginLeft: 2,
  },
  darkSubText: {
    color: Colors.darkSubText,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 15,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.lightText,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.lightText,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 14,
    color: Colors.lightSubText,
    textAlign: 'center',
  },
});