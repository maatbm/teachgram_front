import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { UserService } from "services/userService/user.service";
import { type SignUpRequest } from "services/userService/user.types";

export type FormStep = 'details' | 'profile';

const INITIAL_STATE: SignUpRequest = {
    name: "",
    mail: "",
    username: "",
    description: "",
    phone: "",
    password: "",
    profileLink: ""
};

export function useSignup() {
    const navigate = useNavigate();
    const [user, setUser] = useState<SignUpRequest>(INITIAL_STATE);
    const [step, setStep] = useState<FormStep>('details');
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }));
    }, []);

    const validateDetailsStep = useCallback(() => {
        const { name, mail, username, password } = user;
        if (!name || !mail || !username || !password) {
            setError("Campos não preenchidos");
            return false;
        }
        return true;
    }, [user]);

    const handleFormSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        if (step === 'details') {
            if (validateDetailsStep()) {
                setStep('profile');
            }
            return;
        }
        if (step === 'profile') {
            if (!user.profileLink) {
                setError("Link obrigatório");
                return;
            }
            setLoading(true);
            try {
                const response = await UserService.signup(user);
                if ("id" in response) {
                    navigate("/signin", { replace: true });
                } else {
                    setError(response.message);
                }
            } catch (err) {
                console.error("Signup error:", err);
                setError("Ocorreu um erro inesperado.");
            } finally {
                setTimeout(() => { setLoading(false) }, 1000);
            }
        }
    }, [user, step, navigate, validateDetailsStep]);

    const returnToDetails = useCallback(() => {
        setStep('details');
        setError('');
    }, []);

    return {
        user,
        step,
        error,
        loading,
        handleInputChange,
        handleFormSubmit,
        returnToDetails
    };
}