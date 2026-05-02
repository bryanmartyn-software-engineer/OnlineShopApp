import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);

  const BASE_URL = 'http://10.0.2.2:5000';
  const API_URL = `${BASE_URL}/api`;

  // Persistence: Load settings and auth on startup
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedDarkMode = await AsyncStorage.getItem('darkMode');
        if (savedDarkMode !== null) {
          setDarkMode(JSON.parse(savedDarkMode));
        }

        const savedUserData = await AsyncStorage.getItem('userData');
        if (savedUserData !== null) {
          const user = JSON.parse(savedUserData);
          setUserData(user);
          setIsLogin(true);
        }
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    };
    loadSettings();
  }, []);

  // Persistence: Save darkMode changes
  useEffect(() => {
    AsyncStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/products`);
        const data = await response.json();

        const mappedProducts = data.map(p => ({
          id: p.productId.toString(),
          name: p.productName,
          price: p.productPrice,
          category: p.category, // Keep full comma-separated string
          description: p.productDesc,
          image: p.activeThumbnail,
          material: p.productMaterial,
          dimension: p.productDimension,
          photoLocation: p.photoLocation,
          images: p.images || [],
          rating: (p.popularity / 2).toFixed(1),
          stock: p.stockQuantity,
        }));

        setProducts(mappedProducts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Fetch cart/wishlist when both products and user are loaded
  useEffect(() => {
    if (isLogin && userData && products.length > 0) {
      fetchUserData(userData.userId);
    }
  }, [isLogin, userData, products.length > 0]);

  // Fetch user data (Cart & Wishlist)
  const fetchUserData = async (userId) => {
    try {
      // Fetch Cart
      const cartResponse = await fetch(`${API_URL}/carts/${userId}`);
      const cartData = await cartResponse.json();

      // Map cart items and merge duplicates
      const mergedCart = [];
      cartData.forEach(item => {
        const product = products.find(p => p.id === item.productId.toString());
        if (product) {
          const existing = mergedCart.find(p => p.id === product.id);
          if (existing) {
            existing.quantity += item.quantity;
          } else {
            mergedCart.push({ ...product, quantity: item.quantity });
          }
        }
      });
      setCart(mergedCart);

      // Fetch Wishlist
      const wishlistResponse = await fetch(`${API_URL}/wishlist/${userId}`);
      const wishlistData = await wishlistResponse.json();

      // Map wishlist and remove duplicates
      const uniqueWishlist = [];
      wishlistData.forEach(item => {
        const product = products.find(p => p.id === item.productId.toString());
        if (product && !uniqueWishlist.find(p => p.id === product.id)) {
          uniqueWishlist.push(product);
        }
      });
      setWishlist(uniqueWishlist);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // Cart functions
  const addToCart = async (product, quantity = 1) => {
    if (isLogin && userData) {
      const existingItem = cart.find(item => item.id === product.id);
      try {
        if (existingItem) {
          await fetch(`${API_URL}/carts`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              userId: userData.userId,
              productId: parseInt(product.id),
              quantity: existingItem.quantity + quantity
            }),
          });
        } else {
          await fetch(`${API_URL}/carts`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              userId: userData.userId,
              productId: parseInt(product.id),
              quantity
            }),
          });
        }
      } catch (error) {
        console.error('Error syncing cart:', error);
      }
    }

    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  const removeFromCart = async (productId) => {
    if (isLogin && userData) {
      try {
        await fetch(`${API_URL}/carts`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: userData.userId, productId: parseInt(productId) }),
        });
      } catch (error) {
        console.error('Error removing from cart:', error);
      }
    }
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }

    if (isLogin && userData) {
      try {
        await fetch(`${API_URL}/carts`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: userData.userId,
            productId: parseInt(productId),
            quantity: newQuantity
          }),
        });
      } catch (error) {
        console.error('Error updating quantity:', error);
      }
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    // In a real app, you'd also delete items from DB here or on checkout
  };

  // Wishlist functions
  const toggleWishlist = async (product) => {
    const exists = wishlist.some(item => item.id === product.id);

    if (isLogin && userData) {
      try {
        if (exists) {
          await fetch(`${API_URL}/wishlist`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: userData.userId, productId: parseInt(product.id) }),
          });
        } else {
          await fetch(`${API_URL}/wishlist`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: userData.userId, productId: parseInt(product.id) }),
          });
        }
      } catch (error) {
        console.error('Error syncing wishlist:', error);
      }
    }

    setWishlist(prevWishlist => {
      if (exists) {
        return prevWishlist.filter(item => item.id !== product.id);
      } else {
        return [...prevWishlist, product];
      }
    });
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  // Cart calculations
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  // Auth functions
  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsLogin(true);
        const userResponse = await fetch(`${API_URL}/users/${data.userId}`);
        const userFullData = await userResponse.json();
        setUserData(userFullData);
        // Save to AsyncStorage
        await AsyncStorage.setItem('userData', JSON.stringify(userFullData));

        return { success: true };
      } else {
        return { success: false, error: data.error };
      }
    } catch (error) {
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  const register = async (name, email, password) => {
    try {
      const checkResponse = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const checkData = await checkResponse.json();
      if (!checkResponse.ok) return { success: false, error: checkData.error };

      const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsLogin(true);
        setUserData({ userId: data.userId, name, email });
        return { success: true };
      } else {
        return { success: false, error: data.error };
      }
    } catch (error) {
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  const logout = () => {
    setIsLogin(false);
    setUserData(null);
    setCart([]);
    setWishlist([]);
    AsyncStorage.removeItem('userData');
  };

  const updateUser = async (userId, name, password) => {
    try {
      const response = await fetch(`${API_URL}/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const updatedUser = { ...userData, name };
        setUserData(updatedUser);
        await AsyncStorage.setItem('userData', JSON.stringify(updatedUser));
        return { success: true };
      } else {
        return { success: false, error: data.error };
      }
    } catch (error) {
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  const checkout = async (address) => {
    if (!isLogin || !userData || cart.length === 0) return { success: false, error: 'Cannot checkout' };

    try {
      // 1. Create the order
      const orderData = {
        userId: userData.userId,
        totalAmount: getCartTotal(),
        address: address || userData.address || 'No Address Provided',
        items: cart.map(item => ({
          productId: parseInt(item.id),
          quantity: item.quantity
        }))
      };

      const orderResponse = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      if (!orderResponse.ok) {
        const errData = await orderResponse.json();
        return { success: false, error: errData.error || 'Failed to create order' };
      }

      // 2. Clear the cart in backend
      await fetch(`${API_URL}/carts/${userData.userId}`, {
        method: 'DELETE',
      });

      // 3. Clear local state
      setCart([]);
      return { success: true };

    } catch (error) {
      console.error('Checkout error:', error);
      return { success: false, error: 'Network error during checkout' };
    }
  };

  return (
    <ShopContext.Provider value={{
      products,
      cart,
      wishlist,
      darkMode,
      loading,
      isLogin,
      userData,
      setDarkMode,
      setIsLogin,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      toggleWishlist,
      isInWishlist,
      getCartTotal,
      getCartItemCount,
      login,
      register,
      logout,
      updateUser,
      checkout,
      API_URL,
      BASE_URL,
    }}>
      {children}
    </ShopContext.Provider>
  );
};