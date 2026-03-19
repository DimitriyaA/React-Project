🎮 Used Games Marketplace

A web application for buying and selling second-hand video games. Users can browse available listings, search by title or platform, and post their own game listings.

🧠 Description

This application allows users to:

📦 Browse all available second-hand games

🔍 Search games by title

🏷️ Filter by genre, platform, or price

➕ Add new game listings (if logged in)

📊 View detailed information about each game

The project is built with React and uses Firebase for backend functionalities like authentication and data storage.

🛠️ Technologies

React.js – for building the user interface

React Router – for page navigation

Context API – for global state management

Tailwind CSS – for styling components

Firebase – backend services (authentication, database)

Vite – fast development and build tool

🚀 Installation & Running Locally

Clone the repository:

git clone https://github.com/DimitriyaA/React-Project.git
cd React-Project

Install dependencies:

npm install

Start the development server:

npm run dev

The application will be available at http://localhost:5173 (default with Vite).

📁 Project Structure
src/
├── assets/        # images and icons
├── components/    # UI components
├── contexts/      # Context API for global state
├── firebase/      # Firebase configuration
├── hooks/         # custom hooks
├── router/        # routing for pages
├── styles/        # CSS/Tailwind files
├── App.jsx        # main app component
├── index.jsx      # entry point
└── config.js      # configuration variables
📌 Key Features
Feature	Description
🛍️ Browse games	Display all available listings
🔎 Search	Search games by title
🏷️ Filters	Filter by genre, platform, or price
➕ Add Listing	Add new games for sale
📊 Game Details	View detailed information for a selected game
🪪 User Authentication	Register and log in (if implemented)
✨ Future Improvements

Rating and comment system

Chat between buyers and sellers

User profiles with listing history

Integration with external APIs to fetch game data automatically
