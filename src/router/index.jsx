import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Home from "../pages/Home";
import Catalog from "../pages/Catalog";
import AddItem from "../pages/AddItem";
import MagicMap from "../pages/MagicMap";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

const PrivateRoute = ({ children }) => {
    const { user } = useAuth();
    return user ? children : <Navigate to="/login" />;
};

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/add-item" element={<PrivateRoute><AddItem /></PrivateRoute>} />
                <Route path="/map" element={<MagicMap />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<PrivateRoute>Profile Page</PrivateRoute>} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
