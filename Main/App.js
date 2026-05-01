import 'react-native-gesture-handler';
import React, { useContext, useState, useEffect, useRef } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { StatusBar, View, Text, Animated, Image, StyleSheet } from 'react-native';

import { ShopProvider, ShopContext } from './context/ShopContext';
import { Colors } from './styles/colors';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import CartScreen from './screens/CartScreen';
import WishlistScreen from './screens/WishlistScreen';
import ProfileScreen from './screens/ProfileScreen';
import AuthScreen from './screens/AuthScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Custom themes
const CustomLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.primary,
    background: Colors.lightBackground,
    card: Colors.lightSurface,
    text: Colors.lightText,
    border: Colors.lightBorder,
    notification: Colors.error,
  },
};

const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: Colors.primary,
    background: Colors.darkBackground,
    card: Colors.darkSurface,
    text: Colors.darkText,
    border: Colors.darkBorder,
    notification: Colors.error,
  },
};

function SearchStack() {
  const { darkMode } = useContext(ShopContext);
  
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: darkMode ? Colors.darkBackground : Colors.lightBackground,
        },
      }}
    >
      <Stack.Screen 
        name="SearchScreen" 
        component={SearchScreen} 
        options={{ title: 'Search' }}
      />
      <Stack.Screen 
        name="ProductDetail" 
        component={ProductDetailScreen}
        options={({ route }) => ({
          title: route.params?.product?.name || 'Product Details',
          headerBackTitle: 'Back',
        })}
      />
    </Stack.Navigator>
  );
}

function HomeStack() {
  const { darkMode } = useContext(ShopContext);
  
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: darkMode ? Colors.darkBackground : Colors.lightBackground,
        },
      }}
    >
      <Stack.Screen 
        name="HomeScreen" 
        component={HomeScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="ProductDetail" 
        component={ProductDetailScreen}
        options={({ route }) => ({
          title: route.params?.product?.name || 'Product Details',
          headerBackTitle: 'Back',
        })}
      />
    </Stack.Navigator>
  );
}

function CartStack() {
  const { darkMode } = useContext(ShopContext);
  
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: darkMode ? Colors.darkBackground : Colors.lightBackground,
        },
      }}
    >
      <Stack.Screen 
        name="CartScreen" 
        component={CartScreen} 
        options={{ title: 'Shopping Cart' }}
      />
    </Stack.Navigator>
  );
}

function WishlistStack() {
  const { darkMode } = useContext(ShopContext);
  
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: darkMode ? Colors.darkBackground : Colors.lightBackground,
        },
      }}
    >
      <Stack.Screen 
        name="WishlistScreen" 
        component={WishlistScreen} 
        options={{ title: 'My Wishlist' }}
      />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  const { darkMode, isLogin } = useContext(ShopContext);
  
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: darkMode ? Colors.darkBackground : Colors.lightBackground,
        },
      }}
    >
      {isLogin ? (
        <Stack.Screen 
          name="ProfileScreen" 
          component={ProfileScreen} 
          options={{ title: 'Profile' }}
        />
      ) : (
        <Stack.Screen
          name="AuthScreen"
          component={AuthScreen}
          initialParams={{ type: 'login' }}
          options={{ headerShown: false}}
        />
      )}
    </Stack.Navigator>
  );
}

function TabNavigator() {
  const { darkMode, getCartItemCount } = useContext(ShopContext);
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          
          if (route.name === 'Search') {
            iconName = 'search';
          } else if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Cart') {
            iconName = 'shopping-cart';
          } else if (route.name === 'Wishlist') {
            iconName = focused ? 'favorite' : 'favorite-border';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }
          
          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: darkMode ? Colors.darkSubText : Colors.lightSubText,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: darkMode ? Colors.darkSurface : Colors.lightSurface,
          borderTopColor: darkMode ? Colors.darkBorder : Colors.lightBorder,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerShown: false,
        tabBarBadge: route.name === 'Cart' && getCartItemCount() > 0 ? getCartItemCount() : null,
        tabBarBadgeStyle: {
          backgroundColor: Colors.primary,
          color: '#fff',
          fontSize: 10,
        },
      })}>
      <Tab.Screen 
        name="Search" 
        component={SearchStack} 
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            navigation.navigate('Search', { screen: 'SearchScreen' });
          },
        })}
      />
      <Tab.Screen 
        name="Wishlist" 
        component={WishlistStack} 
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            navigation.navigate('Wishlist', { screen: 'WishlistScreen' });
          },
        })}
      />
      <Tab.Screen 
        name="Home" 
        component={HomeStack} 
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            navigation.navigate('Home', { screen: 'HomeScreen' });
          },
        })}
      />
      <Tab.Screen 
        name="Cart" 
        component={CartStack} 
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            navigation.navigate('Cart', { screen: 'CartScreen' });
          },
        })}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileStack} 
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            // ProfileStack handles AuthScreen/ProfileScreen based on isLogin
            // So we just navigate to the stack root
            navigation.navigate('Profile');
          },
        })}
      />
    </Tab.Navigator>
  );
}

function SplashScreen({ onFinish }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const { darkMode } = useContext(ShopContext);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }).start(() => onFinish());
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={[styles.splashContainer, { backgroundColor: darkMode ? Colors.darkBackground : Colors.lightBackground }]}>
      <Animated.View style={[styles.splashContent, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
        <View style={styles.splashLogoContainer}>
          <Image 
            source={require('../images/logo.png')} 
            style={styles.splashLogo} 
            resizeMode="contain" 
          />
        </View>
        <Text style={[styles.splashTitle, { color: darkMode ? Colors.darkText : Colors.lightText }]}>
          OnlineShopApp
        </Text>
        <Text style={[styles.splashTagline, { color: darkMode ? Colors.darkSubText : Colors.lightSubText }]}>
          Your shop, your favorites.
        </Text>
      </Animated.View>
    </View>
  );
}

function AppContent() {
  const { darkMode } = useContext(ShopContext);
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return (
      <>
        <StatusBar 
          barStyle={darkMode ? 'light-content' : 'dark-content'} 
          backgroundColor={darkMode ? Colors.darkBackground : Colors.lightBackground}
        />
        <SplashScreen onFinish={() => setShowSplash(false)} />
      </>
    );
  }

  return (
    <>
      <StatusBar 
        barStyle={darkMode ? 'light-content' : 'dark-content'} 
        backgroundColor={darkMode ? Colors.darkSurface : Colors.lightSurface}
      />
      <NavigationContainer theme={darkMode ? CustomDarkTheme : CustomLightTheme}>
        <TabNavigator />
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashContent: {
    alignItems: 'center',
  },
  splashLogoContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
    marginBottom: 24,
  },
  splashLogo: {
    width: 120,
    height: 120,
  },
  splashTitle: {
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: 1,
  },
  splashTagline: {
    fontSize: 16,
    marginTop: 8,
    fontWeight: '500',
  },
});

export default function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}