import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Shared/Header';
import Footer from './components/shared/Footer';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
