import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useToast } from "../components/toast/ToastProvider";
import { loginApi, logoutApi, meApi } from "../services/auth.service";
import { register } from "../services/auth.service";


export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      loading: false,

      register: async (credentials) => {
        try {
          set({ loading: true });

          const user = await register(credentials);

          set({
            user,
            isAuthenticated: true,
            loading: false,
          });

          alert("register successful");
        } catch (error) {
          set({ loading: false });
          console.log(err);

          alert(
            err?.response?.data?.message || err.message || "register failed"
          );
        }
      },

      login: async (credentials) => {
        try {
          set({ loading: true });
          console.log("hi");

          const user = await loginApi(credentials);
          if (user) {
            set({
              user,
              isAuthenticated: true,
              loading: false,
            });
          }

          alert("Login successful");

          if (user) {
            return true;
          }
          else{
            return false;
          }
        } catch (err) {
          set({ loading: false });
          console.log(err);

          alert(err?.response?.data?.message || err.message || "Login failed");
        }
      },

      logout: async () => {
        try {
          await logoutApi();
          set({ user: null, isAuthenticated: false });
          alert("Logged out");
        } catch {
          alert("Logout failed");
        }
      },

      loadUser: async () => {
        try {
          const user = await meApi();
          // console.log(user);

          if (user) {
            set({ user, isAuthenticated: true });
          } else {
            set({ user: null, isAuthenticated: false });
          }
        } catch {
          // console.log(user);

          set({ user: null, isAuthenticated: false });
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
