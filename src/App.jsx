import AppRouter from "./router";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <div className="pt-20">
        <AppRouter />
      </div>
      <Footer />
    </AuthProvider>
  );
}

export default App;
