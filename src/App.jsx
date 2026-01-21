
import { ToastProvider } from "./components/toast/ToastProvider";
import AppRoutes from "./routes/route";

function App() {
  return <>
  <ToastProvider>
  <AppRoutes />
  </ToastProvider>
  
  </>;
}

export default App;
