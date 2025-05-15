
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden">
      {/* 3D grid background */}
      <div className="absolute inset-0 grid-background z-0"></div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 hero-gradient z-0"></div>

      <div className="container relative z-10 py-16 md:py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
              Master <span className="text-cadarena-600 dark:text-cadarena-400">CAD</span> Design
              <br />
              Through Challenges
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
              Practice, compete, and improve your 3D modeling skills with real-world CAD challenges. 
              Join a community of designers and engineers.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/practice">
                <Button size="lg" className="text-base">
                  Start Practicing
                </Button>
              </Link>
              <Link to="/competitions">
                <Button size="lg" variant="outline" className="text-base">
                  Join Competitions
                </Button>
              </Link>
            </div>
            <div className="mt-10 flex items-center space-x-6">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-8 w-8 rounded-full bg-cadarena-100 border border-white dark:border-gray-800 flex items-center justify-center text-xs text-cadarena-600"
                  >
                    {i}
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Join <span className="font-medium text-gray-900 dark:text-white">10,000+</span> CAD designers
              </p>
            </div>
          </div>
          
          {/* 3D Model Visual */}
          <div className="relative">
            <div className="relative h-[400px] w-full">
              <div className="absolute right-0 md:right-10 top-0 w-full max-w-md aspect-square">
                <div className="cad-blueprint absolute inset-0 rounded-lg rotate-3 animate-float"></div>
                <div className="absolute inset-8 bg-cadarena-100 dark:bg-cadarena-950 rounded-lg -rotate-3 flex items-center justify-center overflow-hidden">
                  <div className="w-2/3 aspect-square border-4 border-cadarena-500 dark:border-cadarena-400 rounded-lg relative animate-rotate-slow">
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-cadarena-500/30 dark:bg-cadarena-400/30"></div>
                    <div className="absolute left-1/2 top-0 w-1 h-full bg-cadarena-500/30 dark:bg-cadarena-400/30"></div>
                    <div className="absolute w-3 h-3 bg-cadarena-600 dark:bg-cadarena-400 rounded-full top-1/4 left-1/4"></div>
                    <div className="absolute w-3 h-3 bg-cadarena-600 dark:bg-cadarena-400 rounded-full top-1/4 right-1/4"></div>
                    <div className="absolute w-3 h-3 bg-cadarena-600 dark:bg-cadarena-400 rounded-full bottom-1/4 left-1/4"></div>
                    <div className="absolute w-3 h-3 bg-cadarena-600 dark:bg-cadarena-400 rounded-full bottom-1/4 right-1/4"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
