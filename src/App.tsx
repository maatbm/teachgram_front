import { AppRoutes } from "routes/AppRoutes";
import { AuthProvider } from "contexts/AuthContext";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
