import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes,Navigate } from "react-router-dom";
import Footer from "./Components/Footer.jsx";
import Layout from "./Components/Layout.jsx";
import Home from "./Pages/Home.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
import SignupPage from "./Pages/SignupPage.jsx";
import { useUserStore } from "./store/useUserStore.js";
import MainPage from "./Pages/MainPage.jsx";
import Notes from "./Pages/MainPages/Notes.jsx";
import Chat from "./Pages/MainPages/Chat.jsx";
import Confession from "./Pages/MainPages/Confession.jsx";
import Poll from "./Pages/MainPages/Poll.jsx";
import Notification from "./Pages/MainPages/Notification.jsx";
import Assignment from "./Pages/MainPages/Assignment.jsx";
import Profile from "./Pages/MainPages/Profile.jsx";
import Setting from "./Pages/MainPages/Setting.jsx";
import Navbar from "./Components/Navbar.jsx";


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
     
      <Routes>
        
        <Route path="/signup" element={!user ? <SignupPage /> : <Navigate to="/main" />} />
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/main" />} />
        <Route path="/" element={ <Home /> } />

        <Route element={<Layout />}>
          <Route path="/main" element={ user ? <MainPage /> : <Navigate to="/login" /> } />
          <Route path="/notes" element={ user ? <Notes /> : <Navigate to="/login" /> } />
          <Route path="/chat" element={ user ? <Chat /> : <Navigate to="/login" /> } />
          <Route path="/confession" element={ user ? <Confession /> : <Navigate to="/login" /> } />
          <Route path="/poll" element={ user ? <Poll /> : <Navigate to="/login" /> } />
          <Route path="/notification" element={ user ? <Notification /> : <Navigate to="/login" /> } />
          <Route path="/assignment" element={ user ? <Assignment /> : <Navigate to="/login" /> } />
          <Route path="/profile" element={ user ? <Profile /> : <Navigate to="/login" /> } />
          <Route path="/setting" element={ user ? <Setting /> : <Navigate to="/login" /> } />
        </Route>
      </Routes>
      <Toaster position="top-right" />
      <Footer />
    </>
  );
}

export default App;
