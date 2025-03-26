import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import Home from "../pages/Home";
import CategoryPage from "../pages/Catalog";
import SearchCatalog from "../pages/SearchCatalog";
import AddItem from "../pages/AddItem";
import ItemDetails from "../pages/ItemDetails";
import MagicMap from "../pages/MagicMap";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ErrorBoundary from "../components/ErrorBoundary";
import Spellbook from "../components/Spellbook";

const PrivateRoute = ({ children }) => {
    const { user } = useAuthContext();
    if (user === null) {
        return <div>Loading...</div>;  // Показва "Loading..." докато не се определи потребителя
    }
    return user ? children : <Navigate to="/login" />;
};

const AppRouter = () => {
    return (
        <ErrorBoundary>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/catalog" element={<CategoryPage />} />
                <Route path="/catalog/:category" element={<CategoryPage />} />

                <Route path="/search" element={<SearchCatalog />} />
                <Route path="/add-item" element={<PrivateRoute><AddItem /></PrivateRoute>} />
                <Route path="/item/:id" element={<ItemDetails />} />
                <Route path="/spellbook" element={<Spellbook />} />
                <Route path="/map" element={<MagicMap />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<PrivateRoute>Profile Page</PrivateRoute>} />
            </Routes>
        </ErrorBoundary>
    );
};

export default AppRouter;
