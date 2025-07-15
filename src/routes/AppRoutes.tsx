import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SigninPage } from "pages";

export function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<div>Home Page</div>} />
                <Route path="/signin" element={<SigninPage />} />
            </Routes>
        </BrowserRouter>
    );
}