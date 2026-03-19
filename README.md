✨ Used Games Marketplace

🚀 A web application for buying and selling second-hand video games. Users can browse available listings, search by title or platform, and post their own game listings.

📌 Project Overview

This is a Single Page Application (SPA) built with React and Firebase.
The platform allows users to browse, manage, and interact with used games in a clean, user-friendly interface.

✨ Key Features

🔓 User authentication (Register / Login) (if implemented)

🛍️ Browse available games

🔎 Search games by title

🏷️ Filter by genre, platform, or price

📜 View detailed information about each game

➕ Add new game listings (authenticated users)

✏️ Edit and delete your own listings (if implemented)

👤 User profile with personal listings and activity (if implemented)

🔧 Technologies Used

React.js

React Router

Context API

Tailwind CSS

Firebase (Authentication & Firestore)

Vite

⚙️ Installation and Setup

Prerequisites

Make sure you have installed:

Node.js (v16 or later)

npm

Clone the Repository

git clone https://github.com/DimitriyaA/React-Project.git
cd React-Project

Install Dependencies

npm install

Firebase Configuration (if using authentication or Firestore)

Create a Firebase project and enable:

Authentication (Email/Password)

Firestore Database

Add your Firebase config in:

// /src/firebase/config.js
export const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
};
🚀 Run the Application
npm run dev

Open in browser: http://localhost:5173

🧩 Application Structure
src/
  assets/       # images and icons
  components/   # UI components
  contexts/     # Context API for global state
  firebase/     # Firebase configuration
  hooks/        # custom hooks
  router/       # routing for pages
  styles/       # CSS/Tailwind files
  App.jsx       # main app component
  index.jsx     # entry point
  config.js     # configuration variables
🔓 Application Features

Public Part

Browse all games

View game details

Private Part (Authenticated Users)

Add new listings

Edit or delete owned listings

View personal profile and activity

🚀 Future Improvements

Rating and comment system

Chat between buyers and sellers

Image upload (Firebase Storage)

Like / favorite system

Search enhancements

Pagination / lazy loading

👩‍💼 Author

Created by DimitriyaA
