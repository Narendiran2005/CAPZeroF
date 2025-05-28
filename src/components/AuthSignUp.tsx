
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import { UserRole } from "@/utils/types";

const AuthSignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [userRole, setUserRole] = useState<UserRole>(UserRole.STUDENT);
  const [organizationName, setOrganizationName] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure both passwords match.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    // Prepare request data based on user role
    const userData = {
      email,
      password,
      username,
      role: userRole,
      ...(userRole === UserRole.ORGANIZATION && { organizationName }),
    };

    try {
      // Replace this URL with your actual API endpoint
      const response = await axios.post("http://localhost:5000/auth/register", userData);
      
      // Store auth token or user data
      localStorage.setItem("isLoggedIn", "false");
      
      
      toast({
        title: "Account created successfully Now Login to your account",
        description: "Welcome to CAD Arena!",
      });
      
      navigate("/");
    } catch (error) {
      if (error.response.status === 400) {
        const errorMessage = error.response?.data?.error || "Failed to create account. Please try again.";
        toast({
          title: "Signup failed",
          description: errorMessage,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Signup failed",
          description: "An unexpected error occurred. Please try again later.",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-6 md:p-8 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Create your account
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          Join the CAD Arena community
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="johnsmith"
            required
          />
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

        <div className="mb-4">
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

        <div className="mb-6">
          <Label htmlFor="confirmPassword">Confirm password</Label>
          <Input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>

        <div className="mb-6">
          <Label>Account type</Label>
          <RadioGroup
            value={userRole}
            onValueChange={(value) => setUserRole(value as UserRole)}
            className="flex flex-col space-y-2 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value={UserRole.STUDENT}
                id="student"
                checked={userRole === UserRole.STUDENT}
              />
              <Label htmlFor="student" className="cursor-pointer">
                Student / Individual
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value={UserRole.ORGANIZATION}
                id="organization"
                checked={userRole === UserRole.ORGANIZATION}
              />
              <Label htmlFor="organization" className="cursor-pointer">
                Organization
              </Label>
            </div>
          </RadioGroup>
        </div>

        {userRole === UserRole.ORGANIZATION && (
          <div className="mb-6">
            <Label htmlFor="organizationName">Organization name</Label>
            <Input
              id="organizationName"
              type="text"
              value={organizationName}
              onChange={(e) => setOrganizationName(e.target.value)}
              placeholder="Acme Inc"
              required={userRole === UserRole.ORGANIZATION}
            />
          </div>
        )}

        <Button type="submit" className="w-full mb-4" disabled={loading}>
          {loading ? "Processing..." : "Create account"}
        </Button>

        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-cadarena-600 hover:text-cadarena-500 dark:text-cadarena-400 dark:hover:text-cadarena-300"
          >
            Log in
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AuthSignUp;
