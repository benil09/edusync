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
      console.log(user);
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
      const response = await axios.get("/auth/profile");
      console.log(response.data)
      console.log(response.data);
      set({ user: response.data.user, checkingAuth: false });
    } catch (error) {
      console.log("Error in checkAuth : ", error.message);
      set({ checkingAuth: false , user: null });
      toast.error(error?.response?.data?.message || "Failed to check authentication");
    }
  }
}));
