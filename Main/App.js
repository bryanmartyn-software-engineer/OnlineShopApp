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
        headerShown: true,
        headerStyle: {
          backgroundColor: darkMode ? Colors.darkSurface : Colors.lightSurface,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: darkMode ? Colors.darkBorder : Colors.lightBorder,
        },
        headerTintColor: darkMode ? Colors.darkText : Colors.lightText,
        headerTitleStyle: {
          fontWeight: '700',
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
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function HomeStack() {
  const { darkMode } = useContext(ShopContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: darkMode ? Colors.darkSurface : Colors.lightSurface,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: darkMode ? Colors.darkBorder : Colors.lightBorder,
        },
        headerTintColor: darkMode ? Colors.darkText : Colors.lightText,
        headerTitleStyle: {
          fontWeight: '700',
        },
      }}
    >
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ title: 'Home' }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function CartStack() {
  const { darkMode } = useContext(ShopContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: darkMode ? Colors.darkSurface : Colors.lightSurface,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: darkMode ? Colors.darkBorder : Colors.lightBorder,
        },
        headerTintColor: darkMode ? Colors.darkText : Colors.lightText,
        headerTitleStyle: {
          fontWeight: '700',
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
        headerShown: true,
        headerStyle: {
          backgroundColor: darkMode ? Colors.darkSurface : Colors.lightSurface,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: darkMode ? Colors.darkBorder : Colors.lightBorder,
        },
        headerTintColor: darkMode ? Colors.darkText : Colors.lightText,
        headerTitleStyle: {
          fontWeight: '700',
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

function HelpCenterScreen() {
  const { darkMode } = useContext(ShopContext);
  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: darkMode ? Colors.darkBackground : Colors.lightBackground }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', color: darkMode ? Colors.darkText : Colors.lightText, marginBottom: 20 }}>Help Center</Text>
      <View style={{ gap: 15 }}>
        <Text style={{ fontSize: 16, color: darkMode ? Colors.darkText : Colors.lightText, fontWeight: '600' }}>1. How to track my order?</Text>
        <Text style={{ fontSize: 14, color: darkMode ? Colors.darkSubText : Colors.lightSubText }}>You can track your order in the "Order History" section of your profile.</Text>

        <Text style={{ fontSize: 16, color: darkMode ? Colors.darkText : Colors.lightText, fontWeight: '600' }}>2. What is your return policy?</Text>
        <Text style={{ fontSize: 14, color: darkMode ? Colors.darkSubText : Colors.lightSubText }}>We offer a 30-day return policy for all unused items in their original packaging.</Text>

        <Text style={{ fontSize: 16, color: darkMode ? Colors.darkText : Colors.lightText, fontWeight: '600' }}>3. How can I contact support?</Text>
        <Text style={{ fontSize: 14, color: darkMode ? Colors.darkSubText : Colors.lightSubText }}>You can reach us at support@onlineshopapp.com or call us at 1-800-SHOP-APP.</Text>
      </View>
    </View>
  );
}

function AboutAppScreen() {
  const { darkMode } = useContext(ShopContext);
  return (
    <View style={{ flex: 1, padding: 20, alignItems: 'center', backgroundColor: darkMode ? Colors.darkBackground : Colors.lightBackground }}>
      <View style={{ backgroundColor: '#FFFFFF', padding: 20, borderRadius: 30, marginBottom: 20, elevation: 5 }}>
        <Image source={require('../images/logo.png')} style={{ width: 100, height: 100 }} resizeMode="contain" />
      </View>
      <Text style={{ fontSize: 28, fontWeight: 'bold', color: darkMode ? Colors.darkText : Colors.lightText }}>OnlineShopApp</Text>
      <Text style={{ fontSize: 16, color: Colors.primary, marginBottom: 20 }}>Version 1.0.0</Text>
      <Text style={{ fontSize: 16, color: darkMode ? Colors.darkSubText : Colors.lightSubText, textAlign: 'center', lineHeight: 24 }}>
        OnlineShopApp is a premium e-commerce platform designed to give you the best shopping experience. We focus on quality, speed, and user-centric design to help you find your favorites effortlessly.
      </Text>
      <Text style={{ fontSize: 14, color: darkMode ? Colors.darkSubText : Colors.lightSubText, marginTop: 40 }}>© 2026 OnlineShopApp Team</Text>
    </View>
  );
}

function ProfileStack() {
  const { darkMode, isLogin } = useContext(ShopContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: darkMode ? Colors.darkSurface : Colors.lightSurface,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: darkMode ? Colors.darkBorder : Colors.lightBorder,
        },
        headerTintColor: darkMode ? Colors.darkText : Colors.lightText,
        headerTitleStyle: {
          fontWeight: '700',
        },
      }}
    >
      {isLogin ? (
        <>
          <Stack.Screen
            name="ProfileScreen"
            component={ProfileScreen}
            options={{ title: 'Profile' }}
          />
          <Stack.Screen
            name="HelpCenter"
            component={HelpCenterScreen}
            options={{ title: 'Help Center' }}
          />
          <Stack.Screen
            name="AboutApp"
            component={AboutAppScreen}
            options={{ title: 'About' }}
          />
        </>
      ) : (
        <Stack.Screen
          name="AuthScreen"
          component={AuthScreen}
          initialParams={{ type: 'login' }}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
}

function TabNavigator() {
  const { darkMode, getCartItemCount } = useContext(ShopContext);

  return (
    <Tab.Navigator
      initialRouteName="Home"
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