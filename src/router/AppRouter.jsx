import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../components/Home";
import CategoryPage from "../components/Catalog";
import SearchCatalog from "../components/SearchCatalog";
import AddItem from "../components/AddItem";
import EditItem from "../components/EditItem";
import ItemDetails from "../components/ItemDetails";
import MagicMap from "../components/MagicMap";
import AddLocation from "../components/AddLocation";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import ProfilePage from "../components/auth/Profile";
import ErrorBoundary from "../components/ErrorBoundary";
import Spellbook from "../components/Spellbook";
import AuthGuard from "../components/guards/AuthGuard";
import GuestGuard from "../components/guards/GuestGuard";

const AppRouter = () => {
    return (
        <ErrorBoundary>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/catalog" element={<CategoryPage />} />
                <Route path="/catalog/:category" element={<CategoryPage />} />
                <Route path="/search" element={<SearchCatalog />} />
                <Route path="/item/:id" element={<ItemDetails />} />
                <Route path="/spellbook" element={<Spellbook />} />
                <Route path="/map" element={<MagicMap />} />

                {/* 🔒 Само за регистрирани потребители */}
                <Route element={<AuthGuard />}>
                    <Route path="/add-item" element={<AddItem />} />
                    <Route path="/edit-item/:id" element={<EditItem />} />
                    <Route path="/map/add" element={<AddLocation />} />
                    <Route path="/profile" element={<ProfilePage />} />
                </Route>

                {/* 🔓 Само за гости */}
                <Route element={<GuestGuard />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>

                {/* Пренасочване при невалиден URL */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </ErrorBoundary>
    );
};

export default AppRouter;
