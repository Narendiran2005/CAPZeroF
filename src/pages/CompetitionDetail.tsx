import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Trophy, Users, Clock, FileSymlink, Building, Award } from "lucide-react";
import { Contest, Challenge, ChallengeLevel, ChallengeStatus, ChallengeVisibility } from "@/utils/types";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

// Mock data for the contest
const mockContests: Contest[] = [
  {
    id: "1",
    title: "Automotive Design Challenge",
    description: "Create innovative automotive parts that improve fuel efficiency. This competition focuses on sustainable design practices and cutting-edge technology in the automotive industry. Participants will work on real-world problems faced by automotive engineers today.",
    organizationId: "org1",
    startDate: new Date("2023-06-15"),
    endDate: new Date("2023-06-30"),
    challengeIds: ["101", "102"],
    registeredUsers: 156,
    status: "active",
    prizes: ["$2000 Cash Prize", "Internship Opportunity at Tesla Motors", "Feature in Automotive Design Magazine", "Industry Recognition"],
    visibility: ChallengeVisibility.PUBLIC,
    registrationType: "open" as const,
  },
  // ... more mock contests would be here
];

// Mock challenges data for display
const mockChallenges = [
  {
    id: "101",
    title: "Aerodynamic Spoiler Design",
    description: "Design a spoiler that reduces drag while maintaining downforce.",
    instructions: "Create a CAD model of a spoiler for a standard sedan that improves aerodynamics by at least 5%.",
    level: ChallengeLevel.INTERMEDIATE,
    points: 200,
    thumbnailUrl: "/placeholder.svg",
    status: ChallengeStatus.PUBLISHED,
    creatorId: "org1",
    createdAt: new Date("2023-05-20"),
    updatedAt: new Date("2023-05-20"),
    submissionCount: 45,
    successRate: 62
  },
  {
    id: "102",
    title: "Lightweight Wheel Design",
    description: "Design a wheel that reduces weight while maintaining structural integrity.",
    instructions: "Create a CAD model of a wheel that is 20% lighter than standard wheels but maintains safety standards.",
    level: ChallengeLevel.ADVANCED,
    points: 300,
    thumbnailUrl: "/placeholder.svg",
    status: ChallengeStatus.PUBLISHED,
    creatorId: "org1",
    createdAt: new Date("2023-05-20"),
    updatedAt: new Date("2023-05-20"),
    submissionCount: 28,
    successRate: 45
  }
];

const CompetitionDetail = () => {
  const { id } = useParams();
  const [contest, setContest] = useState<Contest | null>(null);
  const [loading, setLoading] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate API call to get contest details
    setLoading(true);
    
    // Check login status
    const loggedInStatus = sessionStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedInStatus);

    // Find the contest with the matching ID
    const foundContest = mockContests.find(c => c.id === id);
    
    setTimeout(() => {
      if (foundContest) {
        setContest(foundContest);
      }
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleRegister = () => {
    if (!isLoggedIn) {
      toast({
        title: "Authentication Required",
        description: "Please log in or sign up to register for this competition.",
        variant: "destructive"
      });
      return;
    }

    setIsRegistered(true);
    toast({
      title: "Registration Successful",
      description: `You have successfully registered for "${contest?.title}"`,
    });
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'upcoming':
        return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-800';
      case 'active':
        return 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900 dark:text-green-300 dark:border-green-800';
      case 'completed':
        return 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700';
      default:
        return '';
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-t-cadarena-600 border-gray-200 border-solid rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading competition details...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!contest) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow bg-gray-50 dark:bg-gray-900">
          <div className="container py-16 text-center">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
              Competition Not Found
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              The competition you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/competitions">
              <Button>Browse Competitions</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gray-50 dark:bg-gray-900">
        <div className="container py-8">
          {/* Back button */}
          <div className="mb-6">
            <Link to="/competitions" className="flex items-center text-cadarena-600 hover:text-cadarena-700 dark:text-cadarena-400 dark:hover:text-cadarena-300">
              <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Back to competitions
            </Link>
          </div>

          {/* Competition header */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <Badge variant="outline" className={cn(getStatusColor(contest.status), "capitalize")}>
                {contest.status}
              </Badge>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Clock className="h-4 w-4 mr-1" />
                {contest.status === "upcoming" 
                  ? `Starts in ${Math.ceil((new Date(contest.startDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days` 
                  : contest.status === "active" 
                  ? `Ends in ${Math.ceil((new Date(contest.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days` 
                  : "Completed"}
              </div>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {contest.title}
            </h1>
            
            <div className="flex flex-wrap gap-6 mb-6">
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Calendar className="h-4 w-4 mr-2" />
                <span>
                  {format(new Date(contest.startDate), "MMM d, yyyy")} - {format(new Date(contest.endDate), "MMM d, yyyy")}
                </span>
              </div>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Users className="h-4 w-4 mr-2" />
                <span>
                  {contest.registeredUsers} participants
                </span>
              </div>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Building className="h-4 w-4 mr-2" />
                <span>
                  Organized by <Link to="/organizations/tesla" className="text-cadarena-600 hover:underline">Tesla Motors</Link>
                </span>
              </div>
            </div>
            
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
              {contest.description}
            </p>
            
            {contest.status === "active" && (
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg"
                  onClick={handleRegister}
                  disabled={isRegistered}
                >
                  {isRegistered ? "Registered" : "Register for this Competition"}
                </Button>
                <Button variant="outline" size="lg">
                  <FileSymlink className="mr-2 h-4 w-4" />
                  Download Brief
                </Button>
              </div>
            )}
          </div>
          
          {/* Competition content */}
          <Tabs defaultValue="challenges" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="challenges">Challenges</TabsTrigger>
              <TabsTrigger value="prizes">Prizes & Awards</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="rules">Rules & Requirements</TabsTrigger>
            </TabsList>
            
            <TabsContent value="challenges" className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Competition Challenges
              </h2>
              
              {mockChallenges.map((challenge) => (
                <Card key={challenge.id} className="overflow-hidden transition-all hover:shadow-md">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {challenge.title}
                      </h3>
                      <Badge variant="outline" className={
                        challenge.level === ChallengeLevel.BEGINNER 
                          ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-900 dark:text-green-300 dark:border-green-800" 
                          : challenge.level === ChallengeLevel.INTERMEDIATE 
                          ? "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-800" 
                          : "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900 dark:text-orange-300 dark:border-orange-800"
                      }>
                        {challenge.level.charAt(0) + challenge.level.slice(1).toLowerCase()}
                      </Badge>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {challenge.description}
                    </p>
                    
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <Award className="h-4 w-4 mr-1" />
                          {challenge.points} points
                        </span>
                        <span className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <Users className="h-4 w-4 mr-1" />
                          {challenge.submissionCount} submissions
                        </span>
                      </div>
                      
                      <Button variant={isRegistered ? "default" : "outline"} disabled={!isRegistered && contest.status === "active"}>
                        {isRegistered ? "Start Challenge" : "Register to Participate"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="prizes">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Prizes & Awards
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                    <Trophy className="h-5 w-5 mr-2 text-yellow-500" />
                    Main Prizes
                  </h3>
                  
                  <ul className="space-y-4">
                    {contest.prizes?.map((prize, index) => (
                      <li key={index} className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-cadarena-100 dark:bg-cadarena-900 text-cadarena-600 dark:text-cadarena-300 flex items-center justify-center mr-3 mt-0.5">
                          {index + 1}
                        </div>
                        <span className="text-gray-700 dark:text-gray-300">{prize}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                    <Award className="h-5 w-5 mr-2 text-cadarena-500" />
                    Additional Benefits
                  </h3>
                  
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-cadarena-600 dark:text-cadarena-400 mr-3 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">Certificate of participation for all contestants</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-cadarena-600 dark:text-cadarena-400 mr-3 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">Digital badges for your CAD Arena profile</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-cadarena-600 dark:text-cadarena-400 mr-3 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">Portfolio showcase for top submissions</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-cadarena-600 dark:text-cadarena-400 mr-3 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">Networking opportunities with industry professionals</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="timeline">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Competition Timeline
              </h2>
              
              <div className="relative border-l-2 border-gray-300 dark:border-gray-700 pl-8 ml-4 space-y-10">
                <div className="relative">
                  <div className="absolute -left-10 mt-1 h-5 w-5 rounded-full bg-cadarena-500"></div>
                  <div className="text-sm text-cadarena-600 dark:text-cadarena-400 mb-1">
                    {format(new Date(contest.startDate), "MMMM d, yyyy")}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    Competition Start
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Registration opens, challenge details are published
                  </p>
                </div>
                
                <div className="relative">
                  <div className="absolute -left-10 mt-1 h-5 w-5 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                  <div className="text-sm text-cadarena-600 dark:text-cadarena-400 mb-1">
                    {format(new Date(new Date(contest.startDate).getTime() + (new Date(contest.endDate).getTime() - new Date(contest.startDate).getTime()) / 2), "MMMM d, yyyy")}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    Midway Progress Check
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Optional progress submission for feedback
                  </p>
                </div>
                
                <div className="relative">
                  <div className="absolute -left-10 mt-1 h-5 w-5 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                  <div className="text-sm text-cadarena-600 dark:text-cadarena-400 mb-1">
                    {format(new Date(contest.endDate), "MMMM d, yyyy")}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    Final Submission Deadline
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    All entries must be submitted by 11:59 PM
                  </p>
                </div>
                
                <div className="relative">
                  <div className="absolute -left-10 mt-1 h-5 w-5 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                  <div className="text-sm text-cadarena-600 dark:text-cadarena-400 mb-1">
                    {format(new Date(new Date(contest.endDate).getTime() + 7 * 24 * 60 * 60 * 1000), "MMMM d, yyyy")}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    Results Announcement
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Winners and top participants will be announced
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="rules">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Rules & Requirements
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                    Submission Guidelines
                  </h3>
                  
                  <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-cadarena-600 dark:text-cadarena-400 mr-3 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      All submissions must be in STL format
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-cadarena-600 dark:text-cadarena-400 mr-3 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      Maximum file size: 50MB per submission
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-cadarena-600 dark:text-cadarena-400 mr-3 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      Include a brief description (max 500 words)
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-cadarena-600 dark:text-cadarena-400 mr-3 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      Optional: Add screenshots and renders
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-cadarena-600 dark:text-cadarena-400 mr-3 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      Submissions must include parametric data
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                    Eligibility & Terms
                  </h3>
                  
                  <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-cadarena-600 dark:text-cadarena-400 mr-3 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      Open to students and professionals worldwide
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-cadarena-600 dark:text-cadarena-400 mr-3 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      No entry fee required
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-cadarena-600 dark:text-cadarena-400 mr-3 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      Submissions must be original work
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-cadarena-600 dark:text-cadarena-400 mr-3 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      Rights to designs remain with creators
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-cadarena-600 dark:text-cadarena-400 mr-3 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      Tesla Motors may contact finalists for recruitment
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CompetitionDetail;
