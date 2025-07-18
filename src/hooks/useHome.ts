import * as UserTypes from "services/userService/user.types";
import { useState, useEffect } from "react";
import { UserService } from "services/userService/user.service";

export function useHome() {
    const [user, setUser] = useState<UserTypes.UserResponse>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function getUser() {
            try {
                const response = await UserService.getAuthenticatedUserProfile();
                if ("id" in response) {
                    setUser(response);
                } else {
                    setError(response.message);
                    console.log(response.message)
                }
            } catch (error) {
                console.error(error);
            }
            setTimeout(() => setLoading(false), 1000);
        }
        getUser();
    }, []);

    return {user, loading, error}
}