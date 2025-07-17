import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SigninPage, SignupPage, NotFoundPage } from "pages";

export function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/signin" element={<SigninPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
}