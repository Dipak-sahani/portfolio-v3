import axios from "axios";
import { toast } from "react-toastify";
import { useAuthStore } from "../store/auth.store";

export const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_BACKEND_URL}/api`,
  withCredentials: true, // for cookies
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});


API.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


API.interceptors.response.use(
  (response) => response,
  (error) => {

    const status = error?.response?.status;
    const { setAuthFlase } = useAuthStore.getState()
    // console.log(error);


    if (status === 401 || status === 403) {
      // If it's a login request, don't trigger global logout/redirect logic
      if (error.config.url.includes("/login")) {
        return Promise.reject(error);
      }

      // logout user, redirect, clear state
      const message = error.response.data?.message
      clearAuth();
      setAuthFlase();
      toast.warn("Please Login / Register", { autoClose: 2000 })



      return Promise.reject({
        status,
        message,
      });
    }

    if (error?.response?.status === 429) {
      const message = error.response.data?.message || "Too many requests. Please slow down.";

      // show toast / alert
      toast.warn(message);

      // optional UI feedback
      // toast.error(message);

      return Promise.reject({
        status: 429,
        message,
      });
    }

    if (error?.response?.data?.message) {
      toast.error(error?.response?.data?.message)

    }
    return Promise.reject(error);
  }
);





const ONE_MINUTE = 1 * 1 * 60 * 1000;
const TWO_MINUTE = 1 * 2 * 60 * 1000;
const SEVEN_DAY = 7 * 24 * 60 * 60 * 1000
const ONE_DAY = 24 * 60 * 60 * 1000;


export const saveAuthToken = (token, isRemember) => {
  // console.log(isRemember);


  const data = {
    token,
    expiresAt: Date.now() + (isRemember ? SEVEN_DAY : ONE_DAY),
  };

  localStorage.setItem("auth", JSON.stringify(data));
};



export const getAuthToken = () => {
  const raw = localStorage.getItem("auth");
  if (!raw) return null;

  try {
    const { token, expiresAt } = JSON.parse(raw);

    // ⛔ expired
    if (Date.now() > expiresAt) {
      localStorage.removeItem("auth");
      return null;
    }

    return token;
  } catch {
    localStorage.removeItem("auth");
    return null;
  }
};

export const clearAuth = () => {


  useAuthStore.persist.clearStorage();
  localStorage.removeItem("auth");
  localStorage.removeItem("auth-storage");


};


export const loginApi = async (data) => {
  // console.log(process.env.BACKEND_URL);

  const res = await API.post("/users/login", data);




  return res.data;
};




export const mySession = async () => {
  // console.log(process.env.BACKEND_URL);

  const res = await API.get("/session/");




  return res.data;
};



export const updateProfile = async (formData) => {
  const res = await API.put("/users/profile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const register = async (data) => {
  try {
    const res = await API.post("/users/register", data);


    if (res.status == 201) {
      return res.data.data;

    }
  } catch (error) {
    console.log(error);

    toast.error(error?.response?.data?.message || "something error")


  }
};


export const logoutApi = async () => {
  await API.post("/users/logout");
};

export const meApi = async () => {
  try {
    const res = await API.get("/users/current-user");

    //

    return res.data.data;
  } catch (error) {
    console.log(error);

  }
};
export const changePasswordApi = async (data) => {
  const res = await API.post("/users/change-password", data);
  return res.data;
};

export const deleteAccountApi = async () => {
  const res = await API.delete("/users/delete-account");
  return res.data;
};
