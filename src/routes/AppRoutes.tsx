import { Routes, Route } from "react-router-dom";
import { SigninPage, SignupPage, NotFoundPage, HomePage } from "pages";
import { ProtectedRoute } from "./ProtectedRoute";

export function AppRoutes() {
    return (
        <Routes>
            <Route path="/signin" element={<SigninPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}