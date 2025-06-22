
import { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Trophy, 
  Users, 
  Calendar, 
  Clock,
  Award,
  CheckCircle,
  AlertCircle,
  Palette
} from "lucide-react";
import { format } from "date-fns";

interface ContestDetails {
  id: string;
  title: string;
  contestName: string;
  description: string;
  type: "race-against-time" | "creative";
  difficulty: string;
  points: number;
  startDate: Date;
  endDate: Date;
  maxParticipants?: number;
  currentParticipants: number;
  organizationName: string;
  thumbnailUrl?: string;
  isRegistered: boolean;
  registrationOpen: boolean;
}

const ContestJoinPage = () => {
  const { challengeId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [contest, setContest] = useState<ContestDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const token = searchParams.get("token");

  useEffect(() => {
    const fetchContestDetails = async () => {
      try {
        setLoading(true);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (!token) {
          setError("Invalid invitation link - missing token");
          return;
        }

        // Mock contest data
        const mockContest: ContestDetails = {
          id: challengeId || "1",
          title: "Advanced CAD Challenge 2024",
          contestName: "Tech Corp Design Competition",
          description: "Test your advanced CAD skills in this comprehensive design challenge. Create innovative solutions and compete with top talent.",
          type: "race-against-time",
          difficulty: "advanced",
          points: 500,
          startDate: new Date("2024-02-01T10:00:00Z"),
          endDate: new Date("2024-02-15T23:59:59Z"),
          maxParticipants: 100,
          currentParticipants: 45,
          organizationName: "Tech Corp",
          isRegistered: false,
          registrationOpen: true
        };

        setContest(mockContest);
      } catch (err) {
        setError("Failed to load contest details");
        console.error("Error fetching contest:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchContestDetails();
  }, [challengeId, token]);

  const handleJoinContest = async () => {
    if (!contest || !token) return;

    try {
      setJoining(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setContest(prev => prev ? { ...prev, isRegistered: true, currentParticipants: prev.currentParticipants + 1 } : null);
      
      toast({
        title: "Successfully joined contest!",
        description: "The contest will appear in your upcoming challenges.",
      });

      // Redirect to dashboard after a short delay
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
      
    } catch (err) {
      toast({
        title: "Failed to join contest",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setJoining(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "advanced":
        return "bg-orange-100 text-orange-800";
      case "expert":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    return type === "race-against-time" ? (
      <Clock className="h-5 w-5 text-blue-600" />
    ) : (
      <Palette className="h-5 w-5 text-purple-600" />
    );
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow bg-gray-50 dark:bg-gray-900 py-12">
          <div className="container max-w-4xl">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-gray-600">Loading contest details...</p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !contest) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow bg-gray-50 dark:bg-gray-900 py-12">
          <div className="container max-w-4xl">
            <Card className="text-center py-12">
              <CardContent>
                <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-4">Contest Not Found</h2>
                <p className="text-gray-600 mb-6">
                  {error || "The contest invitation link is invalid or expired."}
                </p>
                <Button onClick={() => navigate("/dashboard")}>
                  Return to Dashboard
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gray-50 dark:bg-gray-900 py-12">
        <div className="container max-w-4xl">
          {contest.isRegistered ? (
            <Card className="text-center py-12 mb-8">
              <CardContent>
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-4">Successfully Joined!</h2>
                <p className="text-gray-600 mb-6">
                  You've been registered for this contest. It will appear in your upcoming challenges.
                </p>
                <Button onClick={() => navigate("/dashboard")}>
                  Go to Dashboard
                </Button>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  You're Invited to Join
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Review the contest details below and join if you're interested
                </p>
              </div>

              <Card className="mb-8">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-2xl mb-2">{contest.title}</CardTitle>
                      <p className="text-lg text-blue-600 font-semibold">{contest.contestName}</p>
                      <p className="text-gray-600 mt-2">Organized by {contest.organizationName}</p>
                    </div>
                    <Trophy className="h-8 w-8 text-yellow-500" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-gray-700">{contest.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        {getTypeIcon(contest.type)}
                        <div>
                          <p className="font-semibold">Contest Type</p>
                          <p className="text-gray-600">
                            {contest.type === "race-against-time" ? "Race Against Time" : "Creative Contest"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Award className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="font-semibold">Difficulty & Points</p>
                          <div className="flex items-center gap-2">
                            <Badge className={getDifficultyColor(contest.difficulty)}>
                              {contest.difficulty}
                            </Badge>
                            <span className="text-gray-600">{contest.points} points</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-semibold">Duration</p>
                          <p className="text-gray-600">
                            {format(contest.startDate, "MMM dd")} - {format(contest.endDate, "MMM dd, yyyy")}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Users className="h-5 w-5 text-purple-600" />
                        <div>
                          <p className="font-semibold">Participants</p>
                          <p className="text-gray-600">
                            {contest.currentParticipants}
                            {contest.maxParticipants && ` / ${contest.maxParticipants}`} registered
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-2">What to Expect:</h4>
                    {contest.type === "race-against-time" ? (
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Compete with others by submitting accurate models quickly</li>
                        <li>• Automatic scoring based on accuracy and completion time</li>
                        <li>• Real-time leaderboard during the contest</li>
                        <li>• Upload STL files for verification</li>
                      </ul>
                    ) : (
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Submit creative models for manual evaluation</li>
                        <li>• Models reviewed individually by judges</li>
                        <li>• Flexible scoring based on creativity and technical skill</li>
                        <li>• Detailed feedback from expert reviewers</li>
                      </ul>
                    )}
                  </div>

                  <div className="flex justify-center pt-4">
                    <Button
                      size="lg"
                      onClick={handleJoinContest}
                      disabled={joining || !contest.registrationOpen}
                      className="px-8"
                    >
                      {joining ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Joining Contest...
                        </>
                      ) : (
                        <>
                          <Trophy className="h-4 w-4 mr-2" />
                          Join Contest
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContestJoinPage;
