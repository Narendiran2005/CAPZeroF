import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, Trophy, Building, User as UserIcon, Users, Plus } from "lucide-react";
import { toast } from "@/hooks/use-toast";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FeaturedChallenges from "@/components/FeaturedChallenges";
import UserProfileSidebar from "@/components/UserProfileSidebar";
import UserStats from "@/components/UserStats";
import ActivityCalendar from "@/components/ActivityCalendar";
import RecentActivity from "@/components/RecentActivity";
import axios from "axios";

const StudentDash = ({ basicData }: { basicData: any }) => {




    return(
        <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow bg-gray-50 dark:bg-gray-900 py-6 md:py-12">
                <div className="container max-w-7xl mx-auto px-4 sm:px-6">
                  <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold mb-4 sm:mb-0">Dashboard</h1>
                    <div className="flex flex-col sm:flex-row gap-4 sm:items-center w-full sm:w-auto">
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
                  
                  {/*here comes the main content*/}

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column - User Profile */}
      <div className="lg:col-span-1">
        
    <UserProfileSidebar  userData={basicData} />
        
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
  


                </div>
              </main>
              <Footer />
            </div>
    );
}
export default StudentDash;