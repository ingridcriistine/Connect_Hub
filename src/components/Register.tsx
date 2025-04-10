
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import NetworkBackground from "./NetworkBackground";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    // In a real application, this would register with the server
    toast({
      title: "Success",
      description: "Registration successful! (simulation)",
    });

    // Simulate redirect to login
    setTimeout(() => {
      window.location.href = "/login";
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
          
          <h2 className="text-xl font-semibold text-center mb-6">Register</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                className="auth-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
              />
            </div>
            
            <div className="mb-4">
              <input
                type="email"
                className="auth-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </div>
            
            <div className="mb-4">
              <input
                type="password"
                className="auth-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </div>
            
            <div className="mb-6">
              <input
                type="password"
                className="auth-input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
              />
            </div>
            
            <button type="submit" className="auth-button mb-4 bg-connectHub-primary">
              Register
            </button>
            
            <div className="text-center">
              <p className="text-gray-600 text-sm">
                Already have an account?{" "}
                <Link to="/login" className="auth-link">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
