import { toast } from "react-hot-toast";
import { create } from "zustand";
import axios from "../lib/axios";

export const useUserStore = create((set) => ({
  user: null,
  loading: false,
  checkingAuth: true,

  signup: async (
    email,
    username,
    firstName,
    lastName,
    password,
    confirmPassword,
    year,
    branch,
    role
  ) => {
    set({ loading: true });
    if (password !== confirmPassword) {
      set({ loading: false });
      toast.error("Passwords do not match");
      return;
    }

    try {
      console.log("Sending signup request");
      const response = await axios.post("/auth/signup", {
        email,
        username,
        firstName,
        lastName,
        password,
        year,
        branch,
        role: role ? role.toLowerCase() : "student",
      });
      console.log("Signup response : ", response);

      set({ user: response.data.user, loading: false });
      toast.success("Signup successful");
      
    } catch (error) {
      set({ loading: false });
      console.log("Error in signup store : ", error.response?.data);
      toast.error(error?.response?.data?.message || "Signup failed");
    }
  },

  login: async (email, password) => {
    set({ loading: true });
    try {
      const response = await axios.post("/auth/login", { email, password });

     
      console.log(response);
      set({ user: response.data.user, loading: false });
      toast.success("Logged in successfully");
    } catch (error) {
      set({ loading: false });
      toast.error(error?.response?.data?.message || "Login failed");
    }
  },

  logout: async () => {
    set({ loading: true });
    try {
      await axios.post("/auth/logout");
      set({ user: null, loading: false });
      toast.success("Logged out successfully");
    } catch (error) {
      set({ loading: false });
      toast.error(error?.response?.data?.message || "Logout failed");
    }
  },

  checkAuth: async () => {
    set({ checkingAuth: true });
    try {
      const response = await axios.get("/auth/profile", {
        withCredentials: true,
      });
      set({ user: response.data.user, checkingAuth: false });
    } catch (error) {
            // silent fail for unauthenticated users
      if (error?.response?.status === 401) {
        set({ user: null, checkingAuth: false });
        return;
      }
      console.error("Auth check failed:", error);
      set({ checkingAuth: false, user: null });
    }
  },

  updateProfile: async (data) => {
    set({ loading: true });
    try {
      console.log(1);
      const res = await axios.put("/auth/update-profile", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(2);
      console.log(res.data);
      set({ user: res.data.user || res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      set({ loading: false });
      console.error("Error in updateProfile : ", error.message);
      toast.error(error?.response?.data?.message || "Failed to update profile");
    } finally {
      set({ loading: false });
    }
  },
}));
