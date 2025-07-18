import { useAuth } from "contexts/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loading } from "components";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            navigate("/signin", { replace: true });
        }
    }, [isAuthenticated, navigate, loading]);

    return (
        <>
            {loading && <Loading fixed={true} />}
            {!loading && children}
        </>
    );
}