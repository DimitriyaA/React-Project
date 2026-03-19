import { Navigate, Outlet } from "react-router";
import useAuth from "../../hooks/useAuth";

export default function AuthGuard() {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>; // Изчакваме Firebase
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
}
