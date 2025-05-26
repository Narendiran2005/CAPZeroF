
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Timer, Award, Trophy, CheckCircle, Clock, FileText } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

interface ActivityItem {
  id: string;
  title: string;
  type: "challenge" | "competition" | "achievement";
  date: Date;
  points?: number;
  difficulty?: "easy" | "medium" | "hard";
  language?: string;
  timeToComplete?: string;
  accuracy?: number;
  imageUrl?: string;
  description?: string;
  model?: string;
}

interface RecentActivityProps {
  activities: ActivityItem[];
}

export default function RecentActivity({ activities = [] }: RecentActivityProps) {
  // Generate mock data if none is provided
  const activityData = activities.length > 0 ? activities : [
    {
      id: "1",
      title: "Industrial Equipment Design Challenge",
      type: "challenge",
      date: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      points: 50,
      difficulty: "medium",
      language: "JavaScript",
      timeToComplete: "48m 32s",
      accuracy: 92,
      imageUrl: "/placeholder.svg",
      description: "Create a responsive design for industrial equipment interface",
      model: "Design System Model"
    },
    {
      id: "2",
      title: "Earned Problem Solver Badge",
      type: "achievement",
      date: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      imageUrl: "/placeholder.svg"
    },
    {
      id: "3",
      title: "Sustainable Packaging Competition",
      type: "competition",
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
      points: 120,
      imageUrl: "/placeholder.svg",
      model: "Packaging Analysis Model"
    },
    {
      id: "4",
      title: "Mechanical Parts Modeling Challenge",
      type: "challenge",
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
      points: 35,
      difficulty: "easy",
      language: "Python",
      timeToComplete: "27m 12s",
      accuracy: 85,
      imageUrl: "/placeholder.svg",
      description: "Build a model that can detect mechanical parts",
      model: "Parts Recognition Model"
    },
  ];

  // Format relative time
  const getRelativeTime = (date: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);
    
    if (diffDay > 0) {
      return `${diffDay} day${diffDay > 1 ? 's' : ''} ago`;
    } else if (diffHour > 0) {
      return `${diffHour} hour${diffHour > 1 ? 's' : ''} ago`;
    } else if (diffMin > 0) {
      return `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`;
    } else {
      return 'just now';
    }
  };

  // Get badge color based on difficulty
  const getDifficultyBadge = (difficulty?: "easy" | "medium" | "hard") => {
    if (!difficulty) return null;
    
    const colors = {
      easy: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
      medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
      hard: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
    };
    
    return (
      <span className={`text-xs px-2 py-1 rounded font-medium mr-2 ${colors[difficulty]}`}>
        {difficulty}
      </span>
    );
  };

  // Get the right icon based on activity type
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "challenge":
        return <FileText className="h-5 w-5 text-primary" />;
      case "achievement":
        return <Award className="h-5 w-5 text-yellow-500" />;
      case "competition":
        return <Trophy className="h-5 w-5 text-blue-500" />;
      default:
        return <CheckCircle className="h-5 w-5 text-primary" />;
    }
  };

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-lg font-bold">
          <Clock className="mr-2 h-5 w-5 text-primary" />
          Recent Practice
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activityData.map((activity) => (
            <div 
              key={activity.id} 
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative">
                {/* Image banner */}
                <div className="h-24 bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                  {activity.imageUrl ? (
                    <img 
                      src={activity.imageUrl} 
                      alt={activity.title} 
                      className="w-full h-full object-cover opacity-50"
                    />
                  ) : null}
                  
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center p-4">
                    <h3 className="font-semibold text-white text-center text-sm md:text-base line-clamp-2">
                      {activity.title}
                    </h3>
                  </div>
                  
                  {/* Activity type indicator */}
                  <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow">
                    {getActivityIcon(activity.type)}
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                {/* Info row */}
                <div className="flex flex-wrap items-center gap-1 mb-2">
                  {activity.type === "challenge" && activity.difficulty && 
                    getDifficultyBadge(activity.difficulty)}
                  
                  {activity.language && (
                    <span className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 px-2 py-1 rounded font-medium">
                      {activity.language}
                    </span>
                  )}
                  
                  {activity.model && (
                    <span className="text-xs bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100 px-2 py-1 rounded font-medium">
                      {activity.model}
                    </span>
                  )}
                </div>
                
                {/* Date and points */}
                <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 mb-2">
                  <span>{getRelativeTime(activity.date)}</span>
                  {activity.points && (
                    <div className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 px-2 py-1 rounded font-medium">
                      +{activity.points} pts
                    </div>
                  )}
                </div>
                
                {/* Additional stats for challenges */}
                {activity.type === "challenge" && (
                  <div className="mt-2 border-t border-gray-100 dark:border-gray-700 pt-2">
                    <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-300">
                      {activity.timeToComplete && (
                        <div className="flex items-center">
                          <Timer className="h-3 w-3 mr-1" />
                          <span>{activity.timeToComplete}</span>
                        </div>
                      )}
                      
                      {activity.accuracy && (
                        <HoverCard>
                          <HoverCardTrigger asChild>
                            <div className="flex items-center cursor-help">
                              <div className="relative w-16 h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden mr-1">
                                <div 
                                  className="absolute top-0 left-0 h-full bg-green-500 dark:bg-green-400"
                                  style={{ width: `${activity.accuracy}%` }}
                                ></div>
                              </div>
                              <span>{activity.accuracy}%</span>
                            </div>
                          </HoverCardTrigger>
                          <HoverCardContent className="w-60">
                            <div className="space-y-1">
                              <p className="font-medium">Accuracy Score</p>
                              <p className="text-sm text-gray-500">
                                {activity.accuracy}% of your solution matched the expected output.
                              </p>
                            </div>
                          </HoverCardContent>
                        </HoverCard>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
