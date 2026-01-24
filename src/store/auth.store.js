import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useToast } from "../components/toast/ToastProvider";
import {
  clearAuth,
  getAuthToken,
  loginApi,
  logoutApi,
  meApi,
  saveAuthToken,
  updateProfileApi,
} from "../services/auth.service";
import { register } from "../services/auth.service";
import { toast } from "react-toastify";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      loading: false,
      token: getAuthToken() || null,

      register: async (credentials) => {
        try {
          set({ loading: true });

          const user = await register(credentials);

          set({
            user,
            isAuthenticated: true,
            loading: false,
          });

          toast.success("register successful");
        } catch (error) {
          set({ loading: false });
          console.log(err);

          toast.error(
            err?.response?.data?.message || err.message || "register failed",
          );
        }
      },

      login: async (credentials) => {
        try {
          set({ loading: true });
          console.log("hi");

          const res = await loginApi(credentials);

          console.log(res);

          if (res?.user) {
            // localStorage.setItem("token", res?.token);

            saveAuthToken(res?.token)

            set({
              user: res?.user,
              isAuthenticated: true,
              loading: false,
              token: res?.token,
            });
          }

          toast.success("Login successful");

          if (res?.user) {
            return true;
          } else {
            return false;
          }
        } catch (err) {
          set({ loading: false });
          console.log(err);
          toast.error(
            err?.response?.data?.message || err.message || "Login failed",
          );
        }
      },

      updateProfileApi: async (data) => {
        set({ loading: true });
        const res = await updateProfileApi(data);
        set({ user: res.user, loading: false });
      },

      setUser: (data) => {
        set({
          user: data,
        });
      },

      logout: async () => {
        try {
          await logoutApi();
          clearAuth()
          set({ user: null, isAuthenticated: false });
          toast.success("Logged out");
        } catch {
          toast.error("Logout failed");
        }
      },

      loadUser: async () => {
        const { user, loading } = get();

        // ⛔ Stop duplicate calls
        if (user || loading) return;

        try {
          set({ loading: true });

          const res = await meApi(); // expect user object
          console.log(res);
          

          if (res) {
            set({
              user: res,
              isAuthenticated: true,
              loading: false,
            });
          } else {
            set({
              user: null,
              isAuthenticated: false,
              loading: false,
            });
          }
        } catch (error) {
          set({
            user: null,
            isAuthenticated: false,
            loading: false,
          });
        }
      },
    }),

    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
