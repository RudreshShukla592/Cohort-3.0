import { createRoot } from "react-dom/client";
import "./index.css";
import Router from "./routes/Router.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
    <AuthProvider>
        <Router />  
    </AuthProvider>
);
