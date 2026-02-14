

import AppRoutes from "./routes/route";
import { ToastContainer, toast } from 'react-toastify';
function App() {
  return <>

    <AppRoutes />
    <ToastContainer
      position="top-center"
      autoClose={3000}
      limit={1}
      newestOnTop={true}
      preventDuplicates={true}
    />


  </>;
}

export default App;
