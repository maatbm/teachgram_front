import { useState } from "react";
import { UserService } from "services/userService/user.service";
import { useNavigate } from "react-router-dom";
import { useAuth } from "contexts/AuthContext";

export function useDelete() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { signout } = useAuth();

    async function deleteUser() {
        setLoading(true);
        try {
            await UserService.deleteUserProfile();
            signout();
            navigate("/signin", { replace: true })
        } catch (error) {
            alert(error)
        } finally {
            setLoading(false);
        }
    }

    return {loading, deleteUser}
}