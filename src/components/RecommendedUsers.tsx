
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Student, Organization, UserRole } from "@/utils/types";

// Mock recommended users (in a real app this would come from the API)
const mockRecommendedUsers: (Student | Organization)[] = [
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
    id: "org1",
    username: "acme_engineering",
    email: "contact@acme.com",
    role: UserRole.ORGANIZATION,
    avatarUrl: "/placeholder.svg",
    createdAt: new Date("2022-12-01"),
    name: "ACME Engineering",
    description: "Leading engineering solutions provider",
    website: "https://acme.example.com",
    logoUrl: "/placeholder.svg",
    contestsCreated: 12,
    verified: true,
    memberSince: new Date("2022-12-01"),
    industry: "Manufacturing",
    location: "Boston, MA",
    employees: "100-500"
  }
];

const RecommendedUsers = () => {
  const [followStatus, setFollowStatus] = useState<Record<string, boolean>>({});
  
  const handleFollow = (userId: string) => {
    setFollowStatus(prev => ({
      ...prev,
      [userId]: !prev[userId]
    }));
    
    // In a real app, this would make an API call
    toast({
      title: "Success",
      description: followStatus[userId] 
        ? "You have unfollowed this user" 
        : "You are now following this user",
    });
  };
  
  // Get name or username depending on user type
  const getDisplayName = (user: Student | Organization) => {
    if (user.role === UserRole.ORGANIZATION) {
      return (user as Organization).name;
    }
    return user.username;
  };
  
  // Get user initials for avatar fallback
  const getInitials = (user: Student | Organization) => {
    if (user.role === UserRole.ORGANIZATION) {
      return (user as Organization).name.substring(0, 2).toUpperCase();
    }
    return user.username.substring(0, 2).toUpperCase();
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <User className="h-5 w-5" />
          Recommended Users to Follow
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {mockRecommendedUsers.map(user => (
          <div key={user.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link to={`/profile/${user.id}`}>
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.avatarUrl} alt={getDisplayName(user)} />
                  <AvatarFallback>{getInitials(user)}</AvatarFallback>
                </Avatar>
              </Link>
              <div>
                <Link to={`/profile/${user.id}`} className="font-medium hover:underline">
                  {getDisplayName(user)}
                </Link>
                <div className="flex items-center gap-1 mt-0.5">
                  <Badge variant="outline" className="text-xs py-0 h-4">
                    {user.role === UserRole.ORGANIZATION ? "Organization" : "Student"}
                  </Badge>
                  {user.role === UserRole.STUDENT && (
                    <span className="text-xs text-muted-foreground">
                      Level {(user as Student).level}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 gap-1" 
              onClick={() => handleFollow(user.id)}
            >
              <UserPlus className="h-3.5 w-3.5" />
              <span className="text-xs">Follow</span>
            </Button>
          </div>
        ))}
        <div className="text-center pt-2">
          <Link to="/search" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
            Find more users
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendedUsers;
