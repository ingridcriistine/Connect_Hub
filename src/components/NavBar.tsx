
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, MessageSquare, Bell, User, Search, LogOut } from "lucide-react";

const NavBar: React.FC = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  if (isAuthPage) return null;

  return (
    <nav className="bg-connectHub-primary text-white sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <Link to="/" className="text-xl font-bold flex items-center">
            <span className="text-connectHub-accent">CONNECT</span>
            <span className="ml-1">HUB</span>
          </Link>
          
          <div className="flex-1 px-4 mx-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full bg-white/20 border-0 rounded-full py-1.5 px-4 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <Search className="absolute right-3 top-1.5 h-5 w-5 text-white/70" />
            </div>
          </div>
          
          <div className="flex space-x-1 md:space-x-4">
            <Link to="/" className="flex flex-col items-center p-1 hover:bg-white/10 rounded transition">
              <Home size={20} />
              <span className="text-xs hidden md:inline">Home</span>
            </Link>
            <Link to="/chat" className="flex flex-col items-center p-1 hover:bg-white/10 rounded transition">
              <MessageSquare size={20} />
              <span className="text-xs hidden md:inline">Chat</span>
            </Link>
            <Link to="/notifications" className="flex flex-col items-center p-1 hover:bg-white/10 rounded transition">
              <Bell size={20} />
              <span className="text-xs hidden md:inline">Notifications</span>
            </Link>
            <Link to="/profile" className="flex flex-col items-center p-1 hover:bg-white/10 rounded transition">
              <User size={20} />
              <span className="text-xs hidden md:inline">Profile</span>
            </Link>
            <Link to="/login" className="flex flex-col items-center p-1 hover:bg-white/10 rounded transition">
              <LogOut size={20} />
              <span className="text-xs hidden md:inline">Logout</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
