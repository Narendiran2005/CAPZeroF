
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Student, UserRole } from "@/utils/types";
import { Link } from "react-router-dom";
import { Medal, Trophy, UserPlus, Check } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Mock top users data
const mockTopUsers: Student[] = [
  {
    id: "s2",
    username: "sara_cad",
    email: "sara@example.com",
    role: UserRole.STUDENT,
    avatarUrl: "/placeholder.svg",
    createdAt: new Date("2023-02-15"),
    streak: 30,
    points: 4200,
    completedChallenges: 78,
    level: 6,
    achievements: []
  },
  {
    id: "s3",
    username: "mike_3d",
    email: "mike@example.com",
    role: UserRole.STUDENT,
    avatarUrl: "/placeholder.svg",
    createdAt: new Date("2023-03-20"),
    streak: 45,
    points: 3700,
    completedChallenges: 55,
    level: 5,
    achievements: []
  },
  {
    id: "s1",
    username: "john_designer",
    email: "john@example.com",
    role: UserRole.STUDENT,
    avatarUrl: "/placeholder.svg",
    createdAt: new Date("2023-01-10"),
    streak: 15,
    points: 2500,
    completedChallenges: 42,
    level: 4,
    achievements: []
  },
  {
    id: "s4",
    username: "alex_designer",
    email: "alex@example.com",
    role: UserRole.STUDENT,
    avatarUrl: "/placeholder.svg",
    createdAt: new Date("2023-04-05"),
    streak: 12,
    points: 1800,
    completedChallenges: 28,
    level: 3,
    achievements: []
  },
  {
    id: "s5",
    username: "pat_cad",
    email: "pat@example.com",
    role: UserRole.STUDENT,
    avatarUrl: "/placeholder.svg",
    createdAt: new Date("2023-05-05"),
    streak: 8,
    points: 1200,
    completedChallenges: 18,
    level: 2,
    achievements: []
  },
];

const LeaderboardPage = () => {
  const [followingStatus, setFollowingStatus] = useState<Record<string, boolean>>({});
  
  const handleToggleFollow = (userId: string) => {
    setFollowingStatus(prev => {
      const newStatus = !prev[userId];
      
      // In a real app, this would make an API call
      toast({
        title: "Success",
        description: newStatus ? "You are now following this user" : "You have unfollowed this user",
      });
      
      return { ...prev, [userId]: newStatus };
    });
  };
  
  // Get medal color based on rank
  const getMedalColor = (rank: number) => {
    switch (rank) {
      case 0: return "text-yellow-500";
      case 1: return "text-gray-400";
      case 2: return "text-amber-700";
      default: return "text-gray-600 dark:text-gray-400";
    }
  };
  
  // Current user ID (for demo purposes)
  const currentUserId = "s1";

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gray-50 dark:bg-gray-900 py-12">
        <div className="container">
          <h1 className="text-3xl font-bold mb-2">Leaderboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Top performing users ranked by points and achievements</p>
          
          <Tabs defaultValue="points" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="points">Points</TabsTrigger>
              <TabsTrigger value="streak">Longest Streak</TabsTrigger>
              <TabsTrigger value="challenges">Challenges Completed</TabsTrigger>
            </TabsList>
            
            <TabsContent value="points">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5" />
                    Top Points Leaders
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockTopUsers
                      .sort((a, b) => b.points - a.points)
                      .map((user, index) => (
                        <div key={user.id} className="flex items-center">
                          <div className="w-8 text-center">
                            {index < 3 ? (
                              <Medal className={`h-6 w-6 ${getMedalColor(index)}`} />
                            ) : (
                              <span className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                                {index + 1}
                              </span>
                            )}
                          </div>
                          <div className="flex-1 flex items-center gap-3 ml-2">
                            <Link to={`/profile/${user.id}`}>
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={user.avatarUrl || "/placeholder.svg"} alt={user.username} />
                                <AvatarFallback>{user.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                              </Avatar>
                            </Link>
                            <div>
                              <Link to={`/profile/${user.id}`} className="font-medium hover:underline">
                                {user.username}
                                {user.id === currentUserId && (
                                  <Badge variant="outline" className="ml-2 text-xs">You</Badge>
                                )}
                              </Link>
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                Level {user.level} • {user.completedChallenges} challenges
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end mr-2">
                            <span className="font-bold text-lg">{user.points.toLocaleString()}</span>
                            <span className="text-xs text-gray-600 dark:text-gray-400">points</span>
                          </div>
                          {user.id !== currentUserId && (
                            <Button 
                              variant={followingStatus[user.id] ? "outline" : "ghost"}
                              size="sm"
                              onClick={() => handleToggleFollow(user.id)}
                              className="flex-shrink-0"
                            >
                              {followingStatus[user.id] ? (
                                <>
                                  <Check className="h-4 w-4 mr-1" />
                                  <span className="text-xs">Following</span>
                                </>
                              ) : (
                                <>
                                  <UserPlus className="h-4 w-4 mr-1" />
                                  <span className="text-xs">Follow</span>
                                </>
                              )}
                            </Button>
                          )}
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="streak">
              <Card>
                <CardHeader>
                  <CardTitle>Longest Active Streaks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockTopUsers
                      .sort((a, b) => b.streak - a.streak)
                      .map((user, index) => (
                        <div key={user.id} className="flex items-center">
                          <div className="w-8 text-center">
                            {index < 3 ? (
                              <Medal className={`h-6 w-6 ${getMedalColor(index)}`} />
                            ) : (
                              <span className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                                {index + 1}
                              </span>
                            )}
                          </div>
                          <div className="flex-1 flex items-center gap-3 ml-2">
                            <Link to={`/profile/${user.id}`}>
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={user.avatarUrl || "/placeholder.svg"} alt={user.username} />
                                <AvatarFallback>{user.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                              </Avatar>
                            </Link>
                            <div>
                              <Link to={`/profile/${user.id}`} className="font-medium hover:underline">
                                {user.username}
                                {user.id === currentUserId && (
                                  <Badge variant="outline" className="ml-2 text-xs">You</Badge>
                                )}
                              </Link>
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                Level {user.level} • {user.points.toLocaleString()} points
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end mr-2">
                            <span className="font-bold text-lg">{user.streak}</span>
                            <span className="text-xs text-gray-600 dark:text-gray-400">day streak</span>
                          </div>
                          {user.id !== currentUserId && (
                            <Button 
                              variant={followingStatus[user.id] ? "outline" : "ghost"}
                              size="sm"
                              onClick={() => handleToggleFollow(user.id)}
                              className="flex-shrink-0"
                            >
                              {followingStatus[user.id] ? (
                                <>
                                  <Check className="h-4 w-4 mr-1" />
                                  <span className="text-xs">Following</span>
                                </>
                              ) : (
                                <>
                                  <UserPlus className="h-4 w-4 mr-1" />
                                  <span className="text-xs">Follow</span>
                                </>
                              )}
                            </Button>
                          )}
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="challenges">
              <Card>
                <CardHeader>
                  <CardTitle>Most Challenges Completed</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockTopUsers
                      .sort((a, b) => b.completedChallenges - a.completedChallenges)
                      .map((user, index) => (
                        <div key={user.id} className="flex items-center">
                          <div className="w-8 text-center">
                            {index < 3 ? (
                              <Medal className={`h-6 w-6 ${getMedalColor(index)}`} />
                            ) : (
                              <span className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                                {index + 1}
                              </span>
                            )}
                          </div>
                          <div className="flex-1 flex items-center gap-3 ml-2">
                            <Link to={`/profile/${user.id}`}>
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={user.avatarUrl || "/placeholder.svg"} alt={user.username} />
                                <AvatarFallback>{user.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                              </Avatar>
                            </Link>
                            <div>
                              <Link to={`/profile/${user.id}`} className="font-medium hover:underline">
                                {user.username}
                                {user.id === currentUserId && (
                                  <Badge variant="outline" className="ml-2 text-xs">You</Badge>
                                )}
                              </Link>
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                Level {user.level} • {user.points.toLocaleString()} points
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end mr-2">
                            <span className="font-bold text-lg">{user.completedChallenges}</span>
                            <span className="text-xs text-gray-600 dark:text-gray-400">challenges</span>
                          </div>
                          {user.id !== currentUserId && (
                            <Button 
                              variant={followingStatus[user.id] ? "outline" : "ghost"}
                              size="sm"
                              onClick={() => handleToggleFollow(user.id)}
                              className="flex-shrink-0"
                            >
                              {followingStatus[user.id] ? (
                                <>
                                  <Check className="h-4 w-4 mr-1" />
                                  <span className="text-xs">Following</span>
                                </>
                              ) : (
                                <>
                                  <UserPlus className="h-4 w-4 mr-1" />
                                  <span className="text-xs">Follow</span>
                                </>
                              )}
                            </Button>
                          )}
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Want to improve your ranking? Complete more challenges!
            </p>
            <Button asChild>
              <Link to="/practice">Practice Now</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LeaderboardPage;
