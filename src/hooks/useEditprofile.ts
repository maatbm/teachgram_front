import { useState,} from "react";
import * as UserTypes from "services/userService/user.types";
import { UserService } from "services/userService/user.service";

export function useEditProfile() {
    const [loading, setLoading] = useState(false);
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
        if (!("id" in response)) {
            setError(response.message);
        }
        setLoading(false);
    }

    return { loading, handleInputChange, updateUser, error }
}