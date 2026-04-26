import React, { createContext, useState, useEffect } from 'react';

export const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);

  // Sample products data
  useEffect(() => {
    const sampleProducts = [
      {
        id: '1',
        name: 'Wireless Headphones',
        price: 99.99,
        category: 'Electronics',
        description: 'High-quality wireless headphones with noise cancellation and 20-hour battery life.',
        image: 'headphones',
        rating: 4.5,
        stock: 15,
      },
      {
        id: '2',
        name: 'Smart Watch',
        price: 199.99,
        category: 'Electronics',
        description: 'Track your fitness, receive notifications, and more with this stylish smart watch.',
        image: 'watch',
        rating: 4.3,
        stock: 8,
      },
      {
        id: '3',
        name: 'Cotton T-Shirt',
        price: 24.99,
        category: 'Clothing',
        description: 'Comfortable 100% cotton t-shirt, available in multiple colors.',
        image: 'tshirt',
        rating: 4.7,
        stock: 50,
      },
      {
        id: '4',
        name: 'Running Shoes',
        price: 79.99,
        category: 'Footwear',
        description: 'Lightweight running shoes with excellent cushioning and support.',
        image: 'shoes',
        rating: 4.6,
        stock: 12,
      },
      {
        id: '5',
        name: 'Backpack',
        price: 49.99,
        category: 'Accessories',
        description: 'Durable waterproof backpack with laptop compartment.',
        image: 'backpack',
        rating: 4.4,
        stock: 20,
      },
      {
        id: '6',
        name: 'Sunglasses',
        price: 89.99,
        category: 'Accessories',
        description: 'Polarized sunglasses with UV protection.',
        image: 'sunglasses',
        rating: 4.2,
        stock: 7,
      },
    ];
    
    setProducts(sampleProducts);
    setLoading(false);
  }, []);

  // Cart functions
  const addToCart = (product, quantity = 1) => {
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

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist functions
  const toggleWishlist = (product) => {
    setWishlist(prevWishlist => {
      const exists = prevWishlist.some(item => item.id === product.id);
      
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

  return (
    <ShopContext.Provider value={{
      products,
      cart,
      wishlist,
      darkMode,
      loading,
      setDarkMode,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      toggleWishlist,
      isInWishlist,
      getCartTotal,
      getCartItemCount,
    }}>
      {children}
    </ShopContext.Provider>
  );
};