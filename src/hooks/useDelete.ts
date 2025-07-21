import { useState, useCallback } from "react";
import { UserService } from "services/userService/user.service";
import { useNavigate } from "react-router-dom";
import { useAuth } from "contexts/AuthContext";

export function useDelete() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { signout } = useAuth();

    const deleteUser = useCallback(async () => {
        setLoading(true);
        try {
            await UserService.deleteUserProfile();
            signout();
            navigate("/signin", { replace: true });
        } catch (error) {
            console.error("Falha ao deletar usuário:", error);
            alert("Ocorreu um erro ao deletar sua conta.");
        } finally {
            setLoading(false);
        }
    }, [navigate, signout]);

    return { loading, deleteUser }
}