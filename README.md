# 🛍️ Online Shop App – React Native

A modern, feature-rich e-commerce mobile application built with React Native.  
This app provides a complete shopping experience including product browsing, cart management, wishlist functionality, and dark mode support.

---

## ✨ Features

- 🛒 Product Listing – Browse products with search and category filtering  
- 📄 Product Details – View detailed product information with quantity selector  
- 🛍️ Shopping Cart – Add/remove items, update quantities, and view totals  
- ❤️ Wishlist – Save favorite products for later  
- 🌙 Dark Mode – Seamless dark/light theme switching  
- 👤 Profile Screen – View stats and manage preferences  
- 🔔 Real-time Updates – Cart badge updates instantly  

---

## 📱 Screenshots

Screenshots will be added here.

---

# 🚀 Getting Started

## ✅ Prerequisites

Make sure you have the following installed:

- Node.js (v14 or newer)
- npm or yarn
- React Native CLI  
  npm install -g react-native-cli
- Android Studio (for Android)
- Xcode (for iOS – macOS only)
- iOS Simulator or Android Emulator

> ⚠️ Ensure you have completed the official React Native Environment Setup before proceeding.

---

## 📦 Step 1: Install Dependencies

From the project root directory:

Using npm:
```
npm install
```

Using Yarn:
```
yarn install
```

### For iOS Only
```
cd ios
pod install
cd ..
```

---

## 🔥 Step 2: Start the Metro Server

Using npm:
```
npm start
```

Using Yarn:
```
yarn start
```

To clear cache:
```
npm start -- --reset-cache
```

---

## ▶️ Step 3: Run the Application

Keep Metro running in one terminal, then open a new terminal in the project root.

### 🤖 Run on Android
Using npm:
```
npm run android
```

Using Yarn:
```
yarn android
```

### 🍎 Run on iOS
Using npm:
```
npm run ios
```

Using Yarn:
```
yarn ios
```

If everything is set up correctly, the app should launch in your emulator/simulator.

---

# 📦 Dependencies

```json
{
  "react-native-vector-icons": "^10.0.0",
  "@react-navigation/native": "^6.1.7",
  "@react-navigation/bottom-tabs": "^6.5.8",
  "@react-navigation/native-stack": "^6.9.13",
  "react-native-screens": "^3.22.1",
  "react-native-safe-area-context": "^4.7.1",
  "react-native-gesture-handler": "^2.12.0"
}
```

---

# 🏗 Project Structure

```
OnlineShopApp/
├── context/
│   └── ShopContext.js
├── screens/
│   ├── HomeScreen.js
│   ├── ProductDetailScreen.js
│   ├── CartScreen.js
│   ├── WishlistScreen.js
│   └── ProfileScreen.js
└── App.js
```

---

# 🎯 How to Use the App

## 🏠 Home Screen
- Browse all products  
- Search using the search bar  
- Filter by category  
- Tap a product to view details  
- Tap ❤️ to add/remove from wishlist  

## 📄 Product Details
- View full description  
- Adjust quantity using + and -  
- Check stock availability  
- Tap Add to Cart  

## 🛍️ Cart Screen
- Review cart items  
- Modify quantity  
- Remove items  
- View subtotal and total  
- Demo checkout button  

## ❤️ Wishlist Screen
- View saved products  
- Add directly to cart  
- Remove from wishlist  

## 👤 Profile Screen
- View shopping statistics  
- Toggle dark mode  
- Access demo account settings  

---

# 🎨 Customization

Modify main app:
```
App.js
```

Modify screens:
```
../screens/
```

Modify global state:
```
../context/ShopContext.js
```

---

# 🔄 Reloading the App

### Android
- Press R twice  
- OR open Developer Menu:
  - Ctrl + M (Windows/Linux)
  - Cmd ⌘ + M (macOS)

### iOS
- Press Cmd ⌘ + R in the iOS Simulator