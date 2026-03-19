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
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import NotFound from "../components/NotFound";
import "../App.css";

const AppRouter = () => {
    return (
        <ErrorBoundary>
            <div className="app-container">
                <Navbar />
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/catalog" element={<CategoryPage />} />
                        <Route path="/catalog/:category" element={<CategoryPage />} />
                        <Route path="/search" element={<SearchCatalog />} />
                        <Route path="/item/:id" element={<ItemDetails />} />
                        <Route path="/spellbook" element={<Spellbook />} />
                        <Route path="/map" element={<MagicMap />} />

                        {/* 🔒 only for auth users */}
                        <Route element={<AuthGuard />}>
                            <Route path="/add-item" element={<AddItem />} />
                            <Route path="/edit-item/:id" element={<EditItem />} />
                            <Route path="/map/add" element={<AddLocation />} />
                            <Route path="/profile" element={<ProfilePage />} />
                        </Route>

                        {/* 🔓 only for guests */}
                        <Route element={<GuestGuard />}>
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                        </Route>

                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </ErrorBoundary>
    );
};

export default AppRouter;
