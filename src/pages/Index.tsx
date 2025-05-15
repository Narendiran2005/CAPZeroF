
import HeroSection from "@/components/HeroSection";
import FeaturedChallenges from "@/components/FeaturedChallenges";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <FeaturedChallenges />
        
        {/* How it works section */}
        <section className="py-12 md:py-16 lg:py-20 bg-white dark:bg-gray-900">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                How CAD Arena Works
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Improve your CAD skills through practice and competition
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="flex flex-col items-center text-center">
                <div className="h-14 w-14 rounded-full bg-cadarena-100 dark:bg-cadarena-900 flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-cadarena-600 dark:text-cadarena-400">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Practice</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Solve a variety of CAD modeling challenges, from beginner to expert levels.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="h-14 w-14 rounded-full bg-cadarena-100 dark:bg-cadarena-900 flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-cadarena-600 dark:text-cadarena-400">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Compete</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Enter competitions hosted by companies and educational institutions to showcase your skills.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="h-14 w-14 rounded-full bg-cadarena-100 dark:bg-cadarena-900 flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-cadarena-600 dark:text-cadarena-400">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Get Discovered</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Build your portfolio, earn achievements, and get noticed by potential employers.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Organization CTA section */}
        <section className="py-12 md:py-16 lg:py-20 bg-cadarena-50 dark:bg-gray-800">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Are you an organization?
                </h2>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                  Host competitions, discover talent, and connect with skilled CAD designers.
                  Perfect for companies looking to recruit or educational institutions.
                </p>
                <ul className="mt-6 space-y-4">
                  {[
                    "Host custom CAD design competitions",
                    "Review submitted designs with powerful tools",
                    "Connect directly with talented participants",
                    "Issue certificates and awards to winners",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-cadarena-100 dark:bg-cadarena-900 flex items-center justify-center mr-2">
                        <span className="text-xs font-bold text-cadarena-600 dark:text-cadarena-400">✓</span>
                      </div>
                      <span className="text-gray-600 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Link to="/for-organizations">
                    <Button size="lg">Learn More</Button>
                  </Link>
                </div>
              </div>
              
              <div className="relative h-[300px] md:h-[400px] flex items-center justify-center">
                <div className="absolute inset-0 grid grid-cols-2 gap-4 p-4">
                  <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-4 flex flex-col">
                    <div className="text-sm font-medium mb-2">Talent Search</div>
                    <div className="flex-grow flex items-center justify-center">
                      <div className="grid grid-cols-3 gap-2">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                          <div key={i} className="h-8 w-8 rounded bg-gray-100 dark:bg-gray-800"></div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-4">
                    <div className="text-sm font-medium mb-2">Contest Analytics</div>
                    <div className="h-32 bg-gray-100 dark:bg-gray-800 rounded-md"></div>
                  </div>
                  <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-4">
                    <div className="text-sm font-medium mb-2">Design Review</div>
                    <div className="h-24 bg-gray-100 dark:bg-gray-800 rounded-md"></div>
                  </div>
                  <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-4 flex flex-col">
                    <div className="text-sm font-medium mb-2">Certificate Management</div>
                    <div className="flex-grow flex items-center justify-center">
                      <div className="h-16 w-24 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded flex items-center justify-center">
                        <span className="text-sm text-gray-400 dark:text-gray-600">Certificate</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
