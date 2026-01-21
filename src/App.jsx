import { AppRoutes } from "./routes/index.jsx";
import { ToastProvider } from "./components/toast/ToastProvider";
function App() {
  return <>
  <ToastProvider>
  <AppRoutes />
  </ToastProvider>
  
  </>;
}

export default App;
