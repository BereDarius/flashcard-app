import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"
import "./components/footer/Footer.css"
import {UserProvider} from "./components/user_authentication/UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
    <React.StrictMode>
        <UserProvider>
            <App />
        </UserProvider>
    </React.StrictMode>
)