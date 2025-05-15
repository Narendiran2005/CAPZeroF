
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Student, Organization, UserRole } from "@/utils/types";
import { Link } from "react-router-dom";
import { Search, Users, UserPlus, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

// Mock data for users
const mockUsers: (Student | Organization)[] = [
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
  },
  {
    id: "org2",
    username: "tech_innovators",
    email: "info@techinnovators.com",
    role: UserRole.ORGANIZATION,
    avatarUrl: "/placeholder.svg",
    createdAt: new Date("2022-10-15"),
    name: "Tech Innovators",
    description: "Breaking boundaries with technology",
    website: "https://techinnovators.example.com",
    logoUrl: "/placeholder.svg",
    contestsCreated: 8,
    verified: true,
    memberSince: new Date("2022-10-15"),
    industry: "Technology",
    location: "San Francisco, CA",
    employees: "50-100"
  }
];

// Mock data for followers/following
const mockFollowRelations = [
  { followerId: "s1", followingId: "s2" },
  { followerId: "s1", followingId: "s3" },
  { followerId: "s2", followingId: "s1" },
  { followerId: "s3", followingId: "s1" },
  { followerId: "s4", followingId: "s1" },
  { followerId: "s2", followingId: "s4" },
  { followerId: "s1", followingId: "org1" },
  { followerId: "s2", followingId: "org1" },
  { followerId: "s3", followingId: "org2" }
];

interface UserSearchProps {
  className?: string;
  mode?: "search" | "followers" | "following";
  userId?: string;
}

const UserSearch = ({ className, mode = "search", userId }: UserSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<(Student | Organization)[]>([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [followingStatus, setFollowingStatus] = useState<Record<string, boolean>>({});

  // Initialize the component based on mode
  useEffect(() => {
    if (mode === "followers" && userId) {
      showFollowers(userId);
    } else if (mode === "following" && userId) {
      showFollowing(userId);
    }
  }, [mode, userId]);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    setSearchPerformed(true);
    
    const results = mockUsers.filter(user => 
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setSearchResults(results);
    initializeFollowingStatus(results);
  };

  const showFollowers = (userId: string) => {
    const followerIds = mockFollowRelations
      .filter(relation => relation.followingId === userId)
      .map(relation => relation.followerId);
    
    const followers = mockUsers.filter(user => followerIds.includes(user.id));
    
    setSearchResults(followers);
    setSearchPerformed(true);
    initializeFollowingStatus(followers);
  };

  const showFollowing = (userId: string) => {
    const followingIds = mockFollowRelations
      .filter(relation => relation.followerId === userId)
      .map(relation => relation.followingId);
    
    const following = mockUsers.filter(user => followingIds.includes(user.id));
    
    setSearchResults(following);
    setSearchPerformed(true);
    initializeFollowingStatus(following);
  };

  const initializeFollowingStatus = (users: (Student | Organization)[]) => {
    // Assuming current user is s1
    const currentUserId = "s1";
    
    const statusMap: Record<string, boolean> = {};
    users.forEach(user => {
      // Check if current user follows this user
      const isFollowing = mockFollowRelations.some(
        relation => relation.followerId === currentUserId && relation.followingId === user.id
      );
      statusMap[user.id] = isFollowing;
    });
    
    setFollowingStatus(statusMap);
  };

  const toggleFollow = (userId: string) => {
    setFollowingStatus(prev => {
      const newStatus = !prev[userId];
      
      // In a real app, this would make an API call to follow/unfollow
      if (newStatus) {
        toast({
          title: "Success",
          description: "You are now following this user",
        });
      } else {
        toast({
          title: "Success",
          description: "You have unfollowed this user",
        });
      }
      
      return { ...prev, [userId]: newStatus };
    });
  };

  const getInitials = (user: Student | Organization) => {
    if (user.role === UserRole.ORGANIZATION) {
      return (user as Organization).name.substring(0, 2).toUpperCase();
    } else {
      return user.username.substring(0, 2).toUpperCase();
    }
  };

  const getTitle = () => {
    switch (mode) {
      case "followers":
        return "Followers";
      case "following":
        return "Following";
      default:
        return "Find Users";
    }
  };

  const getDescription = () => {
    switch (mode) {
      case "followers":
        return "People who follow you";
      case "following":
        return "People you follow";
      default:
        return "Search for students or organizations by username or ID";
    }
  };

  return (
    <div className={className}>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-semibold mb-4">{getTitle()}</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {getDescription()}
        </p>

        {mode === "search" && (
          <div className="flex gap-2 mb-8">
            <div className="flex-1">
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter username or ID..."
                className="w-full"
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <Button onClick={handleSearch}>
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        )}

        <div>
          {searchPerformed && (
            <>
              <div className="flex items-center mb-4">
                <Users className="mr-2 h-5 w-5" />
                <h3 className="text-lg font-medium">
                  {searchResults.length} user{searchResults.length !== 1 ? 's' : ''}
                  {mode === "followers" ? " follow you" : mode === "following" ? " you follow" : " found"}
                </h3>
              </div>

              {searchResults.length > 0 ? (
                <div className="space-y-4">
                  {searchResults.map(user => (
                    <Card key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <Link to={`/profile/${user.id}`} className="flex-shrink-0">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={user.avatarUrl || "/placeholder.svg"} alt={user.username} />
                              <AvatarFallback>{getInitials(user)}</AvatarFallback>
                            </Avatar>
                          </Link>
                          <div className="flex-1">
                            <Link to={`/profile/${user.id}`}>
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium">
                                  {user.role === UserRole.ORGANIZATION 
                                    ? (user as Organization).name 
                                    : user.username}
                                </h4>
                                <Badge variant="outline" className="text-xs">
                                  {user.role === UserRole.ORGANIZATION ? "Organization" : "Student"}
                                </Badge>
                                {user.role === UserRole.ORGANIZATION && (user as Organization).verified && (
                                  <Badge variant="secondary" className="text-xs">Verified</Badge>
                                )}
                              </div>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {user.role === UserRole.STUDENT 
                                  ? `Level ${(user as Student).level} • ${(user as Student).points} points` 
                                  : `${(user as Organization).industry} • ${(user as Organization).location}`}
                              </p>
                            </Link>
                          </div>
                          {user.id !== "s1" && ( // Don't show follow button for self (assuming s1 is current user)
                            <Button 
                              variant={followingStatus[user.id] ? "outline" : "default"}
                              size="sm"
                              onClick={() => toggleFollow(user.id)}
                              className="flex-shrink-0"
                            >
                              {followingStatus[user.id] ? (
                                <>
                                  <Check className="h-4 w-4 mr-2" />
                                  Following
                                </>
                              ) : (
                                <>
                                  <UserPlus className="h-4 w-4 mr-2" />
                                  Follow
                                </>
                              )}
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 border-dashed border-2 border-gray-200 dark:border-gray-700 rounded-lg">
                  <p className="text-gray-500 dark:text-gray-400 mb-2">No users found</p>
                  <p className="text-sm text-gray-400 dark:text-gray-500">
                    {mode === "search" ? "Try a different username or ID" : 
                     mode === "followers" ? "You don't have any followers yet" : 
                     "You aren't following anyone yet"}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserSearch;
