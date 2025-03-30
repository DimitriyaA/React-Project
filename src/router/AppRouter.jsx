import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import Home from "../components/Home";
import CategoryPage from "../components/Catalog";
import SearchCatalog from "../components/SearchCatalog";
import AddItem from "../components/AddItem";
import EditItem from "../components/EditItem";
import ItemDetails from "../components/ItemDetails";
import MagicMap from "../components/MagicMap";
import AddLocation from "../components/AddLocation";
import Login from "../components/auth/Login"
import Register from "../components/auth/Register";
import ProfilePage from "../components/auth/Profile";

import ErrorBoundary from "../components/ErrorBoundary";
import Spellbook from "../components/Spellbook";

const PrivateRoute = ({ children }) => {
    const { user } = useAuthContext();
    if (user === null) {
        return <div>Loading...</div>;
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
                <Route path="/edit-item/:id" element={<EditItem />} />

                <Route path="/spellbook" element={<Spellbook />} />
                <Route path="/map" element={<MagicMap />} />
                <Route path="/map/add" element={<AddLocation />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<ProfilePage />} />

            </Routes>
        </ErrorBoundary>
    );
};

export default AppRouter;
