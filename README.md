# ✨ My Magic App

## 🌐 Live Demo

https://mymagicapp-1acde.web.app
---

## 📌 Project Overview

This is a **Single Page Application (SPA)** built with Angular and Firebase.
The platform allows users to **browse, manage, and interact with magical items and features** in a clean, user-friendly interface.

---

## ✨ Key Features

* 🔓 User authentication (Register / Login)
* 🧤 Browse magical items or content
* 📜 View detailed information about each item
* ➕ Add new items (authenticated users)
* ✏️ Edit and delete your own items
* 💬 Comment and participate in discussions
* 👤 User profile with personal content and activity

---

## 🔧 Technologies Used

* **Angular (v19)**
* **Firebase Authentication**
* **Firebase Firestore**
* **RxJS**
* **TypeScript**
* **CSS**

---

## ⚙️ Installation and Setup

### 1. Prerequisites

Make sure you have installed:

* Node.js (v16 or later)
* Angular CLI

```bash
npm install -g @angular/cli
```

### 2. Clone the Repository

```bash
git clone https://github.com/DimitriyaA/SoftUni-Angular-Exam.git
cd SoftUni-Angular-Exam
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Firebase Configuration

1. Create a project in Firebase Console
2. Enable:

   * Authentication (Email/Password)
   * Firestore Database
3. Add your Firebase config in:

* `/src/environments/environment.ts`
* `/src/environments/environment.prod.ts`

Example:

```ts
export const environment = {
  production: false,
  firebase: {
    apiKey: 'YOUR_API_KEY',
    authDomain: 'YOUR_AUTH_DOMAIN',
    projectId: 'YOUR_PROJECT_ID',
    storageBucket: 'YOUR_STORAGE_BUCKET',
    messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
    appId: 'YOUR_APP_ID',
  },
};
```

---

## 🚀 Run the Application

```bash
ng serve --open
```

* Open in browser: [http://localhost:4200](http://localhost:4200)

---

## 🧩 Application Structure

```text
/src
  /app
    /core            # Header & Footer
    /user            # Login, Register, Profile
    /items           # Browse, add, edit, detail pages for magical items
    /services        # Firebase services
    /types           # Interfaces
    /home            # Home page
    /error           # 404 page
  /environments      # Firebase configs
```

---

## 🔓 Application Features

### Public Part

* Home page with featured magical items
* Browse items by categories
* View item details and comments
* Register and login

### Private Part (Authenticated Users)

* Add new items
* Edit and delete owned items
* Comment on items
* View personal profile and activity

---

## 🚀 Future Improvements

* 📷 Image upload (Firebase Storage)
* ❤️ Like / favorite system
* 🔍 Search functionality
* 📜 Pagination / lazy loading

---

## 📜 Notes

* Firebase must be properly configured for full functionality
* Authentication and Firestore must be enabled

---

## 👩‍💼 Author

Created for SoftUni Angular Exam Project
