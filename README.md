# 🛋️ OnlineShopApp - Premium Furniture Store

<p align="center">
  <img src="images/logo.png" width="200" alt="OnlineShopApp Logo" />
</p>

**OnlineShopApp** is a premium, feature-rich furniture e-commerce mobile application built with React Native. Inspired by modern Scandinavian design, it offers a seamless shopping experience for high-quality home furnishings, from ergonomic office chairs to stylish living room sofas.

---

## ✨ Features

### 🎨 Premium User Experience
- **Modern UI/UX**: Designed with a focus on furniture aesthetics, featuring smooth transitions and a premium feel.
- **Dynamic Dark Mode**: Fully integrated dark and light themes that adapt to the user's preference.
- **Animated Splash Screen**: A branded entrance that provides a professional first impression.

### 🛋️ Furniture-Focused Catalog
- **Curated Categories**: Browse furniture by room (Bedroom, Office, Living Room, Dining, Outdoor).
- **In-Depth Product Details**: View detailed specifications including materials (e.g., PU leather, solid wood) and precise dimensions.
- **Image Carousels**: Multiple high-quality images for every piece of furniture to see every detail.

### 🛒 Seamless Shopping Flow
- **Smart Search**: Real-time search functionality to find specific furniture pieces quickly.
- **Cart & Wishlist**: Robust management of your shopping cart and favorite items with backend synchronization.
- **Stock Tracking**: Real-time availability status for all products.

### 🔐 Advanced Authentication & Profile
- **Context-Aware Login**: Remembers your shopping context (e.g., if you were favoriting an item) and returns you there after login.
- **Comprehensive Profile**: Track order history, manage shipping addresses, and view shopping statistics.

---

## 🛠️ Technology Stack

- **Frontend**: 
  - [React Native](https://reactnative.dev/) (Cross-platform iOS/Android)
  - [React Navigation](https://reactnavigation.org/) (Stack & Bottom Tab navigation)
  - [Context API](https://reactjs.org/docs/context.html) (Global State Management)
  - [Vector Icons](https://github.com/oblador/react-native-vector-icons) (Material Icons)
- **Backend**:
  - [Node.js](https://nodejs.org/) & [Express](https://expressjs.com/)
  - [SQLite](https://www.sqlite.org/) (Relational Database for products, users, and orders)
  - [Socket.io](https://socket.io/) (Real-time connection monitoring)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Android Studio
- React Native CLI

### 1. Installation
```bash
# Clone the repository
git clone https://github.com/yourusername/OnlineShopApp.git

# Install dependencies
npm install

# iOS only: Install pods
cd ios && pod install && cd ..
```

### 2. Running the Backend
The backend serves the API and product images.
```bash
cd backend
node service.js
```
*Note: The backend runs on `http://localhost:5000`. Make sure to update the `BASE_URL` in your app context if testing on a physical device.*

### 3. Running the App
```bash
# Start Metro bundler
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios
```

---

## 📂 Project Structure

```text
OnlineShopApp/
├── Main/
│   ├── context/        # ShopContext.js (Cart, Auth, and Global State)
│   ├── screens/        # UI Screens (Home, ProductDetail, Cart, Profile, etc.)
│   ├── styles/         # colors.js (Design tokens and theme palettes)
│   └── App.js          # Navigation logic & Animated Splash Screen
├── backend/
│   ├── routes/         # API endpoints:
│   │   ├── auth.js     # User registration and login
│   │   ├── carts.js    # Cart persistence
│   │   ├── orders.js   # Order processing and history
│   │   ├── products.js # Furniture catalog data
│   │   ├── users.js    # Profile management
│   │   └── wishlist.js # Favorites management
│   ├── createDatabase.js # SQLite schema & Furniture seed data
│   └── service.js      # Express server & Socket.io setup
├── public/             # Static assets (Furniture images)
├── images/             # App-level assets (Logo, etc.)
└── index.js            # React Native entry point
```
<p align="center">
  Built with ❤️ for the ultimate furniture shopping experience.
</p>
