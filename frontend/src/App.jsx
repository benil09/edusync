import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes,Navigate } from "react-router-dom";
import Footer from "./Components/Footer.jsx";
import Navbar from "./Components/Navbar.jsx";
import Home from "./Pages/Home.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
import SignupPage from "./Pages/SignupPage.jsx";
import SignupPage2 from "./Pages/SignupPage2.jsx";
import { useUserStore } from "./store/useUserStore.js";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.classList.remove("theme-light", "theme-dark");
    document.documentElement.classList.add(`theme-${theme}`);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const { user, checkAuth,checkingAuth } = useUserStore();
  console.log("User in App.jsx: ", user);
  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (checkingAuth)
    return (
      <div className="flex justify-center items-center h-screen">
        loading ...{" "}
      </div>
    );
  return (
    <>
      {user && <Navbar />}
      <Routes>

        <Route path="/signup" element={!user ? <SignupPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/" element={ user ? <Home /> : <Navigate to="/login" /> } />

      </Routes>
      <Toaster position="top-right" />
      <Footer />
    </>
  );
}

export default App;
