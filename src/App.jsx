import React from 'react';
import AppRouter from "./router/AppRouter";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MagicStars from "./components/MagicStars";
import 'animate.css';

import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-b from-[#0d0c2b] to-[#1a1839] text-white font-magic">
        <ErrorBoundary>
          <Navbar />
          <MagicStars />
          <main className="pt-20 px-4 md:px-12 lg:px-24 animate__animated animate__fadeIn">
            <AppRouter />
          </main>
          <Footer />
        </ErrorBoundary>
      </div>
    </AuthProvider>
  );
}

export default App;
