import axios from "axios";
import { toast } from "react-toastify";

export const API = axios.create({
  baseURL: import.meta.env.VITE_API_BACKEND_URL,
  withCredentials: true, // for cookies
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const loginApi = async (data) => {
  // console.log(process.env.BACKEND_URL);
  
  const res = await API.post("/users/login", data);
  // console.log(res);
  
  return res.data.user;
};

export const register = async (data) => {
  try {
    const res = await API.post("/users/register", data);
   
   
    if(res.status==201){
    return res.data.data;

    }
  } catch (error) {
    console.log(error);

    toast.error(error?.response?.data?.message||"something error")
    
    
  }
};


export const logoutApi = async () => {
  await API.post("/auth/users/logout");
};

export const meApi = async () => {
 try {
   const res = await API.get("/users/current-user");
 
  //  console.log(res);
   
   return res.data.data;
 } catch (error) {
  console.log(error);
  
 }
};
