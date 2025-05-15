
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FeaturedChallenges from "@/components/FeaturedChallenges";
import { Link } from "react-router-dom";
import { Book, Code, Trophy, Users, Building, User as UserIcon } from "lucide-react";
import RecommendedUsers from "@/components/RecommendedUsers";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import  NavbarUserSearch  from "@/components/NavbarUserSearch";

const Dashboard = () => {
  const [accountType, setAccountType] = useState<"student" | "organization">("student");

  const handleAccountToggle = () => {
    const newType = accountType === "student" ? "organization" : "student";
    setAccountType(newType);
    toast({
      title: "Account type switched",
      description: `You are now viewing the dashboard as ${newType === "student" ? "a student" : "an organization"}.`,
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gray-50 dark:bg-gray-900 py-6 md:py-12">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
            <h1 className="text-3xl font-bold mb-4 sm:mb-0">Dashboard</h1>
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center w-full sm:w-auto">
              <div className="flex items-center justify-between w-full sm:w-auto bg-white dark:bg-gray-800 rounded-lg px-4 py-2 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center mr-4">
                  <span className="text-sm font-medium mr-2">
                    {accountType === "student" ? (
                      <UserIcon className="h-4 w-4 inline mr-1" />
                    ) : (
                      <Building className="h-4 w-4 inline mr-1" />
                    )}
                    {accountType === "student" ? "Student" : "Organization"} 
                  </span>
                  <Switch
                    checked={accountType === "organization"}
                    onCheckedChange={handleAccountToggle}
                    aria-label="Toggle account type"
                  />
                </div>
              </div>
              <div className="flex gap-2 w-full sm:w-auto justify-between">
                <Button variant="outline" asChild className="flex-1 sm:flex-none">
                  <Link to="/practice"><Code className="mr-2 h-4 w-4" /> Practice</Link>
                </Button>
                <Button asChild className="flex-1 sm:flex-none">
                  <Link to="/competitions"><Trophy className="mr-2 h-4 w-4" /> Competitions</Link>
                </Button>
              </div>
            </div>
          </div>
          
          {accountType === "student" ? (
            <StudentDashboard />
          ) : (
            <OrganizationDashboard />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

const StudentDashboard = () => {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Completed</dt>
                  <dd className="text-3xl font-bold">12</dd>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Level</dt>
                  <dd className="text-3xl font-bold">4</dd>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Streak</dt>
                  <dd className="text-3xl font-bold">7</dd>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Points</dt>
                  <dd className="text-3xl font-bold">1,250</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-1">
          <RecommendedUsers />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <FeaturedChallenges maxItems={3} />
        </div>
        
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                User Network
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                Connect with other designers and organizations to grow your network.
              </p>
              <div className="flex flex-col space-y-2">
                <Button asChild>
                  <Link to="/search">Find Users</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/leaderboard">View Leaderboard</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Book className="h-5 w-5" />
                Learning Resources
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">CAD Basics</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Learn the fundamentals of 3D modeling.</p>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/documentation#basics">Learn More</Link>
                  </Button>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Advanced Techniques</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Master complex modeling workflows.</p>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/documentation#advanced">Learn More</Link>
                  </Button>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Design Principles</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Apply visual design theory to 3D models.</p>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/documentation#principles">Learn More</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

const OrganizationDashboard = () => {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Organization Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Challenges Created</dt>
                  <dd className="text-3xl font-bold">8</dd>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Total Participants</dt>
                  <dd className="text-3xl font-bold">347</dd>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Followers</dt>
                  <dd className="text-3xl font-bold">124</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-2">
                <Button asChild>
                  <Link to="/create-challenge">Create New Challenge</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/competitions/manage">Manage Competitions</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Your Active Challenges</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Industrial Equipment Design</h3>
                      <p className="text-sm text-gray-500">45 participants • 3 days left</p>
                    </div>
                    <Button size="sm" variant="outline">Manage</Button>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Sustainable Packaging Challenge</h3>
                      <p className="text-sm text-gray-500">32 participants • 5 days left</p>
                    </div>
                    <Button size="sm" variant="outline">Manage</Button>
                  </div>
                </div>
                <div className="flex justify-center mt-4">
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/challenges/manage">View All Challenges</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Top Participants
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold">JS</div>
                    <span>John Smith</span>
                  </div>
                  <span className="text-sm font-medium">1,250 pts</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold">SC</div>
                    <span>Sara Carter</span>
                  </div>
                  <span className="text-sm font-medium">980 pts</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold">MT</div>
                    <span>Mike Tyson</span>
                  </div>
                  <span className="text-sm font-medium">875 pts</span>
                </div>
                <div className="pt-2 flex justify-center">
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/leaderboard">View Full Leaderboard</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Analytics Overview</CardTitle>
              <Button variant="outline" size="sm">View Detailed Reports</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Challenge Engagement</h3>
                    <div className="h-40 flex items-center justify-center">
                      <p className="text-gray-400">Engagement chart placeholder</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Participant Demographics</h3>
                    <div className="h-40 flex items-center justify-center">
                      <p className="text-gray-400">Demographics chart placeholder</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Submission Quality</h3>
                    <div className="h-40 flex items-center justify-center">
                      <p className="text-gray-400">Quality metrics placeholder</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
