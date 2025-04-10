
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import NetworkBackground from "./NetworkBackground";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    // In a real application, this would authenticate with the server
    toast({
      title: "Success",
      description: "Login successful! (simulation)",
    });

    // Simulate redirect to feed
    setTimeout(() => {
      window.location.href = "/";
    }, 1500);
  };

  return (
    <div className="auth-container">
      <div className="hidden sm:block sm:w-1/2">
        <NetworkBackground />
      </div>
      
      <div className="w-full sm:w-1/2 flex items-center justify-center p-4">
        <div className="auth-form fade-in">
          <div className="text-center mb-6">
            <h1 className="font-bold text-2xl flex items-center justify-center">
              <span className="text-connectHub-primary">CONNECT</span>
              <span className="ml-1">HUB</span>
            </h1>
          </div>
          
          <h2 className="text-xl font-semibold text-center mb-6">Login</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="email"
                className="auth-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </div>
            
            <div className="mb-6">
              <input
                type="password"
                className="auth-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
              <div className="text-right">
                <Link to="/forgot-password" className="auth-link text-xs">
                  Forgot password?
                </Link>
              </div>
            </div>
            
            <button type="submit" className="auth-button mb-4 bg-connectHub-primary">
              Login
            </button>
            
            <div className="text-center">
              <p className="text-gray-600 text-sm">
                Don't have an account?{" "}
                <Link to="/register" className="auth-link">
                  Register
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
