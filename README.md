# 🛍️ OnlineShopApp

<p align="center">
  <img src="images/logo.png" width="200" alt="OnlineShopApp Logo" />
</p>

**OnlineShopApp** is a premium, feature-rich e-commerce mobile application built with React Native. It offers a seamless, modern shopping experience with a focus on high-end aesthetics, smooth animations, and robust backend synchronization.

---

## ✨ Features

### 🎨 Premium User Experience
- **Modern UI/UX**: Designed with glassmorphism, smooth gradients, and micro-animations for a high-end feel.
- **Dynamic Dark Mode**: Fully integrated dark and light themes that switch seamlessly across the entire app.
- **Animated Splash Screen**: A branded, interactive entrance that sets the tone for the experience.

### 🛒 Complete Shopping Flow
- **Smart Product Discovery**: Browse by curated categories, search in real-time, and view featured products.
- **Interactive Product Details**: Deep-dive into product info, manage quantities, and see stock status.
- **Robust Cart Management**: Real-time cart updates with backend synchronization and badge indicators.
- **Wishlist Support**: Save favorites for later with easy one-tap access.

### 🔐 Advanced Authentication
- **Smart Redirect Logic**: If you're prompted to log in while browsing (e.g., trying to favorite an item), the app remembers your context and returns you exactly where you were after a successful login.
- **Secure Sessions**: Persistent user state managed via React Context and a dedicated backend.

### 👤 Comprehensive Profile
- **Account Management**: View shopping statistics, manage shipping addresses, and save payment methods.
- **Order History**: Track your past purchases with detailed order summaries.
- **Help & Support**: Integrated help center and "About" sections.

---

## 🛠️ Technology Stack

- **Frontend**: 
  - [React Native](https://reactnative.dev/) (Cross-platform iOS/Android)
  - [React Navigation](https://reactnavigation.org/) (Stack & Bottom Tab navigation)
  - [Context API](https://reactjs.org/docs/context.html) (Global State Management)
  - [Vector Icons](https://github.com/oblador/react-native-vector-icons) (Material Icons & more)
- **Backend**:
  - [Node.js](https://nodejs.org/) & [Express](https://expressjs.com/)
  - [SQLite](https://www.sqlite.org/) (Data Persistence)
  - [Socket.io](https://socket.io/) (Real-time events)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Android Studio / Xcode
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
```bash
cd backend
node service.js
```

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
│   ├── context/        # ShopContext.js (Global State)
│   ├── screens/        # UI Screens (Home, Profile, Cart, etc.)
│   ├── styles/         # Global colors and theme tokens
│   └── App.js          # Main entry point & Navigation
├── backend/
│   ├── routes/         # API Endpoints (Auth, Cart, Orders)
│   ├── createDatabase.js # DB Schema & Initialization
│   └── service.js      # Express Server
├── images/             # Local assets & App Logo
└── index.js            # React Native entry
```

---

## 📝 Roadmap
- [ ] Integration with real Payment Gateways (Stripe/PayPal)
- [ ] Push Notifications for order updates
- [ ] Product reviews and rating system
- [ ] Multi-language support (i18n)

---

<p align="center">
  Built with ❤️ by the OnlineShopApp Team
</p>