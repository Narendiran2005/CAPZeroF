
import AuthSignIn from "@/components/AuthSignIn";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const Login = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <AuthSignIn />
      </main>
      <Footer />
    </div>
  );
};

export default Login;
