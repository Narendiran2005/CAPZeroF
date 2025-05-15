
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2">
              <div className="relative h-8 w-8 overflow-hidden">
                <div className="absolute inset-0 rounded-md bg-gradient-to-br from-cadarena-400 to-cadarena-600">
                  <div className="absolute inset-1 rounded-md bg-white dark:bg-gray-900 flex items-center justify-center text-xl font-bold text-cadarena-600 dark:text-cadarena-400">
                    C
                  </div>
                </div>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                CAD Arena
              </span>
            </Link>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Practice, compete, and showcase your CAD design skills in one platform.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Platform</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/practice" className="text-sm text-gray-600 hover:text-cadarena-600 dark:text-gray-400 dark:hover:text-cadarena-400">
                  Practice Challenges
                </Link>
              </li>
              <li>
                <Link to="/competitions" className="text-sm text-gray-600 hover:text-cadarena-600 dark:text-gray-400 dark:hover:text-cadarena-400">
                  Competitions
                </Link>
              </li>
              <li>
                <Link to="/leaderboard" className="text-sm text-gray-600 hover:text-cadarena-600 dark:text-gray-400 dark:hover:text-cadarena-400">
                  Leaderboard
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-gray-600 hover:text-cadarena-600 dark:text-gray-400 dark:hover:text-cadarena-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-600 hover:text-cadarena-600 dark:text-gray-400 dark:hover:text-cadarena-400">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/for-organizations" className="text-sm text-gray-600 hover:text-cadarena-600 dark:text-gray-400 dark:hover:text-cadarena-400">
                  For Organizations
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/documentation" className="text-sm text-gray-600 hover:text-cadarena-600 dark:text-gray-400 dark:hover:text-cadarena-400">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm text-gray-600 hover:text-cadarena-600 dark:text-gray-400 dark:hover:text-cadarena-400">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/tutorials" className="text-sm text-gray-600 hover:text-cadarena-600 dark:text-gray-400 dark:hover:text-cadarena-400">
                  Tutorials
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © {currentYear} CAD Arena. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-sm text-gray-500 hover:text-cadarena-600 dark:text-gray-400 dark:hover:text-cadarena-400">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-gray-500 hover:text-cadarena-600 dark:text-gray-400 dark:hover:text-cadarena-400">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
