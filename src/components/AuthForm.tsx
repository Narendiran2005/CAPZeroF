
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import { UserRole } from "@/utils/types";

interface AuthFormProps {
  mode: "login" | "signup";
}

const AuthForm: React.FC<AuthFormProps> = ({ mode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [userRole, setUserRole] = useState<UserRole>(UserRole.STUDENT);
  const [organizationName, setOrganizationName] = useState("");
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      if (mode === "login") {
        toast({
          title: "Logged in successfully",
          description: "Welcome back to CAD Arena!",
        });
      } else {
        toast({
          title: "Account created successfully",
          description: "Welcome to CAD Arena!",
        });
      }
    }, 1500);
  };

  return (
    <div className="w-full max-w-md p-6 md:p-8 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {mode === "login" ? "Welcome back" : "Create your account"}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          {mode === "login"
            ? "Log in to your CAD Arena account"
            : "Join the CAD Arena community"}
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {mode === "signup" && (
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
        )}

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

        {mode === "signup" && (
          <>
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
          </>
        )}

        <Button type="submit" className="w-full mb-4" disabled={loading}>
          {loading
            ? "Processing..."
            : mode === "login"
            ? "Log in"
            : "Create account"}
        </Button>

        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          {mode === "login" ? (
            <>
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-cadarena-600 hover:text-cadarena-500 dark:text-cadarena-400 dark:hover:text-cadarena-300"
              >
                Sign up
              </Link>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-cadarena-600 hover:text-cadarena-500 dark:text-cadarena-400 dark:hover:text-cadarena-300"
              >
                Log in
              </Link>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
