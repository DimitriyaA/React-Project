import { Navigate, Outlet } from "react-router";
import useAuth from "../../hooks/useAuth";

export default function GuestGuard() {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (isAuthenticated) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
}
