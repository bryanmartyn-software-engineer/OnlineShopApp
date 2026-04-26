import 'react-native-gesture-handler';
import React, { useContext } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { StatusBar, View, Text } from 'react-native';

import { ShopProvider, ShopContext } from './context/ShopContext';
import HomeScreen from './screens/HomeScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import CartScreen from './screens/CartScreen';
import WishlistScreen from './screens/WishlistScreen';
import ProfileScreen from './screens/ProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Custom themes
const CustomLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6C63FF',
    background: '#f8f9fa',
    card: '#ffffff',
    text: '#2c3e50',
    border: '#e0e0e0',
    notification: '#FF6B6B',
  },
};

const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#6C63FF',
    background: '#121212',
    card: '#1e1e1e',
    text: '#ecf0f1',
    border: '#333333',
    notification: '#FF6B6B',
  },
};

function HomeStack() {
  const { darkMode } = useContext(ShopContext);
  
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: darkMode ? '#1e1e1e' : '#ffffff',
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: darkMode ? '#333' : '#e0e0e0',
        },
        headerTintColor: darkMode ? '#ecf0f1' : '#2c3e50',
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 18,
        },
        contentStyle: {
          backgroundColor: darkMode ? '#121212' : '#f8f9fa',
        },
      }}>
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
        headerStyle: {
          backgroundColor: darkMode ? '#1e1e1e' : '#ffffff',
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: darkMode ? '#333' : '#e0e0e0',
        },
        headerTintColor: darkMode ? '#ecf0f1' : '#2c3e50',
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 18,
        },
        contentStyle: {
          backgroundColor: darkMode ? '#121212' : '#f8f9fa',
        },
      }}>
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
        headerStyle: {
          backgroundColor: darkMode ? '#1e1e1e' : '#ffffff',
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: darkMode ? '#333' : '#e0e0e0',
        },
        headerTintColor: darkMode ? '#ecf0f1' : '#2c3e50',
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 18,
        },
        contentStyle: {
          backgroundColor: darkMode ? '#121212' : '#f8f9fa',
        },
      }}>
      <Stack.Screen 
        name="WishlistScreen" 
        component={WishlistScreen} 
        options={{ title: 'My Wishlist' }}
      />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  const { darkMode } = useContext(ShopContext);
  
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: darkMode ? '#1e1e1e' : '#ffffff',
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: darkMode ? '#333' : '#e0e0e0',
        },
        headerTintColor: darkMode ? '#ecf0f1' : '#2c3e50',
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 18,
        },
        contentStyle: {
          backgroundColor: darkMode ? '#121212' : '#f8f9fa',
        },
      }}>
      <Stack.Screen 
        name="ProfileScreen" 
        component={ProfileScreen} 
        options={{ title: 'Profile' }}
      />
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
          
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home';
          } else if (route.name === 'Cart') {
            iconName = focused ? 'shopping-cart' : 'shopping-cart';
          } else if (route.name === 'Wishlist') {
            iconName = focused ? 'favorite' : 'favorite-border';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }
          
          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6C63FF',
        tabBarInactiveTintColor: darkMode ? '#888' : '#95a5a6',
        tabBarStyle: {
          backgroundColor: darkMode ? '#1e1e1e' : '#ffffff',
          borderTopColor: darkMode ? '#333' : '#e0e0e0',
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
          backgroundColor: '#FF6B6B',
          color: '#fff',
          fontSize: 10,
        },
      })}>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Cart" component={CartStack} />
      <Tab.Screen name="Wishlist" component={WishlistStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
}

function AppContent() {
  const { darkMode } = useContext(ShopContext);

  return (
    <>
      <StatusBar 
        barStyle={darkMode ? 'light-content' : 'dark-content'} 
        backgroundColor={darkMode ? '#1e1e1e' : '#ffffff'}
      />
      <NavigationContainer theme={darkMode ? CustomDarkTheme : CustomLightTheme}>
        <TabNavigator />
      </NavigationContainer>
    </>
  );
}

export default function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}