
import AuthSignUp from "@/components/AuthSignUp";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useToast } from "@/components/ui/use-toast";

const Signup = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSigningUp, setIsSigningUp] = useState(false);

  const handleDemoSignup = (userType: "student" | "organization") => {
    setIsSigningUp(true);
    
    // Simulate API call with delay
    setTimeout(() => {
      // Store user type in session storage (this would be a JWT token in a real app)
      sessionStorage.setItem("userType", userType);
      sessionStorage.setItem("isLoggedIn", "true");
      
      setIsSigningUp(false);
      
      toast({
        title: "Account created successfully",
        description: `You've signed up with a demo ${userType} account.`,
      });
      
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <AuthSignUp />
      </main>
      <Footer />
    </div>
  );
};

export default Signup;
