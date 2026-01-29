

import AppRoutes from "./routes/route";
import { ToastContainer, toast } from 'react-toastify';
function App() {
  return <>
 
  <AppRoutes />
  <ToastContainer 
  position="top-center"
autoClose={5000}
  />
 
  
  </>;
}

export default App;
