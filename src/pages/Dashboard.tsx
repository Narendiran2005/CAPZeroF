
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Code, Trophy, Building, User as UserIcon, Users } from "lucide-react";
import { toast } from "@/hooks/use-toast";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FeaturedChallenges from "@/components/FeaturedChallenges";
import UserProfileSidebar from "@/components/UserProfileSidebar";
import UserStats from "@/components/UserStats";
import ActivityCalendar from "@/components/ActivityCalendar";
import RecentActivity from "@/components/RecentActivity";
import axios from "axios";

const Dashboard = () => {
  const [accountType, setAccountType] = useState<"student" | "organization">(null);
  const [basicData, setBasicData]= useState(null)

  // const dashboardata =async() =>{

  //   const data = await axios.get("http://localhost:5000/api/dash/basic");

  // }

  useEffect(() => {
    const dashboardata =async() =>{
      console.log("hi")
      const token = sessionStorage.getItem("token");

    const res = await axios.get("http://localhost:5000/api/dash/student/basic", {
        headers: { Authorization: `Bearer ${token}` }});
        console.log("Student data", res.data)
      console.log("Student data", res.data.user)

        setBasicData(res.data);
        setAccountType(res.data.user.role)
      

    

    
  }
  
  dashboardata()


  }, []);


  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gray-50 dark:bg-gray-900 py-6 md:py-12">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
            <h1 className="text-3xl font-bold mb-4 sm:mb-0">Dashboard</h1>
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center w-full sm:w-auto">
              {/* <div className="flex items-center justify-between w-full sm:w-auto bg-white dark:bg-gray-800 rounded-lg px-4 py-2 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center mr-4">
                  
                </div>
              </div> */}
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
            <StudentDashboard basicData={basicData} />
          ) : (
            <OrganizationDashboard />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

const StudentDashboard = ({ basicData }: { basicData: any }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column - User Profile */}
      <div className="lg:col-span-1">
        {/* <UserProfileSidebar
      userData={{
        name: "Aravinth PM",
        gender: "Male",
        location: "Kallakurichi",
        birthday: undefined,
        summary: "Hi I am a Newbie CAD Engineer",
        website: "www.googole.com",
        github: "www.github.com",
        linkedin: "www.github.com",
        twitter: "www.github.com",
        workExperience: "5 yeats",
        education: "B Tech",
        skills: "CAD, ZOHO",
      }}
    /> */}
    <UserProfileSidebar  userData={basicData} />
        {/* <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Type</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <span className="text-sm">Switch to:</span>
                <Switch
                  checked={basicData?.user?.role === "organization"}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      toast({
                        title: "Switched to Organization Dashboard",
                        description: "You can now manage challenges and participants.",
                      });
                    } else {
                      toast({
                        title: "Switched to Student Dashboard",
                        description: "You can now view your profile and stats.",
                      });
                    }
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </div> */}
      </div>
      
      {/* Right Column - Stats and Activity */}
      <div className="lg:col-span-2">
        <div className="space-y-6">
          {/* Stats */}
          
          
          {/* Activity Calendar */}
          <ActivityCalendar />
          
          {/* Recent Activity - renamed to Recent Practice in the component */}
          <RecentActivity activities={[]} />
          
          {/* Featured Challenges */}
          <FeaturedChallenges maxItems={3} />
        </div>
      </div>
    </div>
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
