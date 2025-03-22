import React from 'react';
import AppRouter from "./router/AppRouter";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <AuthProvider>
      <ErrorBoundary>
        <Navbar />
      </ErrorBoundary>
      <div className="pt-20">
        <AppRouter />
      </div>
      <Footer />
    </AuthProvider>
  );
}

export default App;
