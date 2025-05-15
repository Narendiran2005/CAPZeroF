
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center max-w-md px-4">
          <h1 className="text-5xl font-bold text-cadarena-600 dark:text-cadarena-400 mb-6">404</h1>
          <div className="h-24 w-24 mx-auto mb-6 relative">
            <div className="absolute inset-0 border-4 border-dashed border-cadarena-500 dark:border-cadarena-400 rounded-lg rotate-45"></div>
            <div className="absolute inset-3 bg-gray-50 dark:bg-gray-900 rounded-md flex items-center justify-center">
              <span className="text-lg font-medium text-gray-400">?</span>
            </div>
          </div>
          <p className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Page not found</p>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex justify-center">
            <Link to="/">
              <Button>Return to home</Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
