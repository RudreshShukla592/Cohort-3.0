import { createRoot } from "react-dom/client";
import "./index.css";

import AppRoutes from "./routes/AppRoutes.jsx";
import { CreateProvider } from "./context/MyContext.jsx";

createRoot(document.getElementById("root")).render(
    <CreateProvider>
        <AppRoutes/>
    </CreateProvider>
);
