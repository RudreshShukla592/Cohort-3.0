import { createRoot } from "react-dom/client";
import "./index.css";
import Router from "./routes/Router.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { MainProvider } from "./context/MainContext.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <MainProvider>
      <Router />
    </MainProvider>
  </AuthProvider>,
);
