
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, Trophy } from "lucide-react";

interface FeaturedChallengesProps {
  maxItems?: number;
}

const FeaturedChallenges = ({ maxItems = 3 }: FeaturedChallengesProps) => {
  // Mock challenges data
  const challenges = [
    {
      id: "c1",
      title: "Parametric Furniture Design",
      difficulty: "Advanced",
      participants: 145,
      deadline: "2 days",
      prize: "$1,500",
      isCompetition: false,
    },
    {
      id: "c2",
      title: "Mechanical Assembly Challenge",
      difficulty: "Intermediate",
      participants: 89,
      deadline: "4 days",
      prize: "$500",
      isCompetition: true,
    },
    {
      id: "c3",
      title: "3D Architectural Visualization",
      difficulty: "Beginner",
      participants: 210,
      deadline: "5 days",
      prize: "$750",
      isCompetition: false,
    },
    {
      id: "c4",
      title: "Medical Device Prototyping",
      difficulty: "Expert",
      participants: 62,
      deadline: "7 days",
      prize: "$2,000",
      isCompetition: true,
    },
  ];

  // Limit the number of challenges to display
  const displayedChallenges = challenges.slice(0, maxItems);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Featured Challenges</CardTitle>
        <Link to="/practice">
          <Button variant="outline" size="sm">View All</Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {displayedChallenges.map((challenge) => (
            <div 
              key={challenge.id}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-750 transition-colors"
            >
              <div className="mb-3 sm:mb-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium">{challenge.title}</h3>
                  {challenge.isCompetition && (
                    <Badge variant="secondary" className="ml-2">
                      <Trophy className="h-3 w-3 mr-1" />
                      Competition
                    </Badge>
                  )}
                </div>
                <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center">
                    <Users className="h-3.5 w-3.5 mr-1" />
                    {challenge.participants} participants
                  </span>
                  <span className="flex items-center">
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    {challenge.deadline} remaining
                  </span>
                </div>
              </div>
              <Link to={`/challenge/${challenge.id}`}>
                <Button size="sm">View Challenge</Button>
              </Link>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-center border-t pt-4">
        <Link to="/practice">
          <Button variant="outline">Explore All Challenges</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default FeaturedChallenges;
