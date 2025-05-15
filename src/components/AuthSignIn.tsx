import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AuthSignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("student"); // default to student
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const login = async (email: string, password: string, userType: string) => {
  const endpoint =
    userType === "student"
      ? "http://localhost:5000/auth/login"
      : "https://api.example.com/organization/login";

  const response = await axios.post(endpoint, { email, password });
  return response.data;
};

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    const data = await login(email, password, userType);
    localStorage.setItem("authToken", data.token);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userType", userType);
    localStorage.setItem("userData", JSON.stringify(data.message));

    toast({
      title: "Logged in successfully",
      description: `Welcome back to CAD Arena, ${userType}!`,
    });

    navigate("/dashboard");
  } catch (error) {
    const message =
      axios.isAxiosError(error)
        ? error.response?.data?.message || "Failed to login. Please check your credentials."
        : "An unexpected error occurred. Please try again later.";

    toast({
      title: "Login failed",
      description: message,
      variant: "destructive",
    });
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="w-full max-w-md p-6 md:p-8 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Welcome back
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          Log in to your CAD Arena account
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label htmlFor="userType">Login as</Label>
          <Select value={userType} onValueChange={(val) => setUserType(val)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select user type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="student">Student</SelectItem>
              <SelectItem value="organization">Organization</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mb-4">
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@example.com"
            required
          />
        </div>

        <div className="mb-6">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>

        <Button type="submit" className="w-full mb-4" disabled={loading}>
          {loading ? "Processing..." : "Log in"}
        </Button>

        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-cadarena-600 hover:text-cadarena-500 dark:text-cadarena-400 dark:hover:text-cadarena-300"
          >
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AuthSignIn;
