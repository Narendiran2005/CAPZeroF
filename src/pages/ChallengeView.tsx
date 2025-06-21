import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Users, Trophy, Download } from "lucide-react";
import { Challenge, ChallengeLevel, ChallengeStatus, ChallengeType, ChallengeVisibility } from "@/utils/types";

// Mock challenge data
const mockChallenge: Challenge = {
  id: "1",
  title: "Basic Gear Design",
  description: "Create a simple spur gear with specific tooth profile and dimensions.",
  instructions: "Design a spur gear with 24 teeth, module 2mm, and pressure angle of 20°. The gear should be suitable for a small mechanical transmission system.",
  level: ChallengeLevel.BEGINNER,
  type: ChallengeType.RACE_AGAINST_TIME,
  visibility: ChallengeVisibility.PUBLIC,
  points: 100,
  thumbnailUrl: "/placeholder.svg",
  status: ChallengeStatus.PUBLISHED,
  creatorId: "org1",
  createdAt: new Date("2023-01-15"),
  updatedAt: new Date("2023-01-15"),
  startDate: new Date("2023-01-15"),
  endDate: new Date("2023-12-31"),
  submissionCount: 876,
  successRate: 87,
};

const ChallengeView = () => {
  const { challengeId } = useParams<{ challengeId: string }>();

  // Fetch challenge data based on challengeId here (replace mockChallenge)
  // const [challenge, setChallenge] = useState<Challenge | null>(null);

  // useEffect(() => {
  //   // Fetch challenge data from API
  //   // setChallenge(data);
  // }, [challengeId]);

  // if (!challenge) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gray-50 dark:bg-gray-900">
        <div className="container py-8">
          <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-bold">{mockChallenge.title}</CardTitle>
                <Badge className="uppercase">{mockChallenge.level}</Badge>
              </div>
              <p className="text-gray-500 dark:text-gray-400 mt-2">{mockChallenge.description}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center text-gray-500 dark:text-gray-400">
                  <Clock className="h-4 w-4 mr-1" />
                  Avg. 15 min
                </div>
                <div className="flex items-center text-gray-500 dark:text-gray-400">
                  <Users className="h-4 w-4 mr-1" />
                  {mockChallenge.submissionCount} Submissions
                </div>
                <div className="flex items-center text-gray-500 dark:text-gray-400">
                  <Trophy className="h-4 w-4 mr-1" />
                  {mockChallenge.points} Points
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Instructions</h3>
                <p className="text-gray-700 dark:text-gray-300">{mockChallenge.instructions}</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Submission</h3>
                <p className="text-gray-700 dark:text-gray-300">Submit your CAD model in STL format.</p>
                <Button>
                  <Download className="h-4 w-4 mr-2" />
                  Download Example File
                </Button>
              </div>

              <div className="flex justify-end">
                <Button>Start Challenge</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ChallengeView;
