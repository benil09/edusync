import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  FileText,
  MessageCircle,
  Zap,
  BarChart2,
  Bell,
  BookOpen,
  User,
  Settings,
  ArrowRight,
  ArrowLeft,
  LogOut,
  Menu,
} from "lucide-react";
import { useUserStore } from "../store/useUserStore";

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const {loading,logout} = useUserStore();

  const menus = [
    { name: "Home", icon: Home, path: "/main" },
    { name: "Notes", icon: FileText, path: "/notes" },
    { name: "Chat", icon: MessageCircle, path: "/chat" },
    { name: "Confession", icon: Zap, path: "/confession" },
    { name: "Poll", icon: BarChart2, path: "/poll" },
    { name: "Notification", icon: Bell, path: "/notification" },
    { name: "Assignment", icon: BookOpen, path: "/assignment" },
    { name: "Profile", icon: User, path: "/profile" },
    { name: "Setting", icon: Settings, path: "/setting" },
  ];

  const primaryMenus = menus.slice(0, 4);
  const moreMenus = menus.slice(4);

  const [showMore, setShowMore] = useState(false);

  // Responsive: shrink sidebar on small screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Set active menu based on location path
  useEffect(() => {
    const found = menus.find((menu) => menu.path === location.pathname);
    if (found) {
      setActiveMenu(found.name);
    } else {
      setActiveMenu("");
    }
    // eslint-disable-next-line
  }, [location.pathname]);

  return (
    <>
    <div
      className={`hidden sm:flex h-screen bg-gray-100 p-4 flex-col justify-between transition-all duration-300 ${
        isOpen ? "w-56" : "w-20"
      }`}
    >
      {/* Top Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          {isOpen && <h1 className="text-lg font-bold">Student</h1>}
          {isOpen? <button onClick={() => setIsOpen(!isOpen)}>
            <ArrowLeft className="w-5 h-5" />
          </button> :<button onClick={() => setIsOpen(!isOpen)}>
            <ArrowRight className="w-5 h-5 ms-4"  />
          </button> }
          
        </div>

        <nav className="flex flex-col gap-2">
          {menus.map((menu, index) => {
            const Icon = menu.icon;
            const isActive = activeMenu === menu.name;
            return (
              <button
                key={index}
                className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-amber-100 transition ${
                  isActive
                    ? "bg-orange-500 text-white hover:bg-orange-600"
                    : "text-black"
                }`}
                onClick={() => {
                  setActiveMenu(menu.name);
                  navigate(menu.path);
                }}
              >
                <Icon className="w-5 h-5" />
                {isOpen && <span>{menu.name}</span>}
              </button>
            );
          })}
        </nav>
      </div>
      {/* Logout Button at the bottom */}
      <div className="mt-auto">
        <button onClick={logout} className="flex w-full items-center gap-3 px-3 py-2 rounded-md hover:bg-red-100 text-red-600 transition">
          <LogOut className="w-5 h-5" />
          {isOpen && <span>Logout</span>}
        </button>
      </div>
    </div>
    {/* Mobile Bottom Navigation */}
    <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-gray-100 border-t flex justify-around items-center p-2">
      {primaryMenus.map((menu, index) => {
        const Icon = menu.icon;
        const isActive = activeMenu === menu.name;
        return (
          <button
            key={index}
            className={`flex flex-col items-center text-xs ${
              isActive ? "text-orange-500" : "text-black"
            }`}
            onClick={() => {
              setActiveMenu(menu.name);
              navigate(menu.path);
            }}
          >
            <Icon className="w-6 h-6" />
            <span>{menu.name}</span>
          </button>
        );
      })}
      {/* More Button */}
      <div className="relative">
        <button
          onClick={() => setShowMore(!showMore)}
          className="flex flex-col items-center text-xs text-black"
        >
            
          <Menu className="w-6 h-6" />
          <span>More</span>
        </button>
        {showMore && (
          <div className="absolute bottom-12 left-[2px] transform -translate-x-1/2 bg-white shadow-md rounded-md p-2 flex flex-col gap-2">
            {moreMenus.map((menu, index) => {
              const Icon = menu.icon;
              const isActive = activeMenu === menu.name;
              return (
                <button
                  key={index}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md ${
                    isActive ? "bg-orange-500 text-white" : "text-black"
                  }`}
                  onClick={() => {
                    setActiveMenu(menu.name);
                    navigate(menu.path);
                    setShowMore(false);
                  }}
                >
                  <Icon className="w-5 h-5" />
                  <span>{menu.name}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default SideNav;
