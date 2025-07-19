import { useState, useEffect } from "react";
import * as UserTypes from "services/userService/user.types";
import { UserService } from "services/userService/user.service";

export function useEditProfile() {
    const [user, setUser] = useState<UserTypes.UserResponse>();
    const [loading, setLoading] = useState(true);
    const [updatedUser, setUpdatedUser] = useState<UserTypes.UpdateUserProfileRequest>({});
    const [error, setError] = useState("");
    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setUpdatedUser((prev) => ({ ...prev, [name]: value }));
    }

    async function updateUser() {
        setLoading(true);
        setError("");
        const response = await UserService.updateUserprofile(updatedUser);
        if ("id" in response) {
            await getUser();
        } else {
            setError(response.message);
        }
        setLoading(false);
    }

    async function getUser() {
        const response = await UserService.getAuthenticatedUserProfile();
        if ("id" in response) {
            setUser(response);
        } else {
            alert(response.message);
        }
    }

    useEffect(() => {
        async function fetchData() {
            await getUser();
            setTimeout(() => setLoading(false), 1000);
        }
        fetchData();
    }, []);

    return { user, loading, handleInputChange, updateUser, error }
}