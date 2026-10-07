import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from "./hooks/useThem.jsx";
import { MotionConfig } from "motion/react";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ThemeProvider>
      <MotionConfig transition={{duration:0.4 , ease:"easeInOut"}} >
      <App />
      </MotionConfig>
    </ThemeProvider>
  </BrowserRouter>
);
