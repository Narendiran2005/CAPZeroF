
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { UserRole, Student, Organization } from "@/utils/types";
import { UserPlus, Check, Users, Trophy, Calendar, MapPin, Building, Link as LinkIcon, User } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import UserSearch from "@/components/UserSearch";

// Mock users data from UserSearch.tsx
const mockUsers = [
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
];

// Mock follow relations data
const mockFollowRelations = [
  { followerId: "s1", followingId: "s2" },
  { followerId: "s1", followingId: "s3" },
  { followerId: "s2", followingId: "s1" },
  { followerId: "s3", followingId: "s1" },
  { followerId: "s1", followingId: "org1" },
];

const UserProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<Student | Organization | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [loading, setLoading] = useState(true);
  
  // For demo, we'll use "s1" as the current user
  const currentUserId = "s1";
  const isCurrentUser = id === currentUserId;
  
  useEffect(() => {
    // Simulate API fetch
    setLoading(true);
    
    setTimeout(() => {
      const foundUser = mockUsers.find(user => user.id === id);
      
      if (foundUser) {
        setUser(foundUser);
        
        // Check if current user is following this user
        const isUserFollowing = mockFollowRelations.some(
          relation => relation.followerId === currentUserId && relation.followingId === foundUser.id
        );
        setIsFollowing(isUserFollowing);
        
        // Count followers and following
        const followers = mockFollowRelations.filter(
          relation => relation.followingId === foundUser.id
        ).length;
        
        const followingUsers = mockFollowRelations.filter(
          relation => relation.followerId === foundUser.id
        ).length;
        
        setFollowerCount(followers);
        setFollowingCount(followingUsers);
      }
      
      setLoading(false);
    }, 500);
  }, [id]);
  
  const handleToggleFollow = () => {
    setIsFollowing(prev => !prev);
    
    // In a real app, this would be an API call
    if (!isFollowing) {
      toast({
        title: "Success",
        description: `You are now following ${user?.role === UserRole.ORGANIZATION ? (user as Organization).name : (user as Student).username}`,
      });
    } else {
      toast({
        title: "Success",
        description: `You have unfollowed ${user?.role === UserRole.ORGANIZATION ? (user as Organization).name : (user as Student).username}`,
      });
    }
  };
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };
  
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow bg-gray-50 dark:bg-gray-900 py-12">
          <div className="container flex justify-center items-center">
            <p className="text-gray-600 dark:text-gray-400">Loading profile...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (!user) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow bg-gray-50 dark:bg-gray-900 py-12">
          <div className="container flex justify-center items-center">
            <p className="text-gray-600 dark:text-gray-400">User not found</p>
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
        <div className="container">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user.avatarUrl || "/placeholder.svg"} alt={user.username} />
                  <AvatarFallback>
                    {user.role === UserRole.ORGANIZATION 
                      ? (user as Organization).name.substring(0, 2).toUpperCase()
                      : user.username.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {user.role === UserRole.ORGANIZATION 
                        ? (user as Organization).name
                        : user.username}
                    </h1>
                    <Badge variant="outline" className="text-xs">
                      {user.role === UserRole.ORGANIZATION ? "Organization" : "Student"}
                    </Badge>
                    {user.role === UserRole.ORGANIZATION && (user as Organization).verified && (
                      <Badge variant="secondary" className="text-xs">Verified</Badge>
                    )}
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {user.role === UserRole.ORGANIZATION 
                      ? (user as Organization).description
                      : `Level ${(user as Student).level} designer with ${(user as Student).points} points`}
                  </p>
                  
                  <div className="flex gap-4">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-gray-500" />
                      <Link to={`/profile/${user.id}/followers`} className="text-sm text-gray-600 dark:text-gray-400 hover:underline">
                        {followerCount} {followerCount === 1 ? "Follower" : "Followers"}
                      </Link>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4 text-gray-500" />
                      <Link to={`/profile/${user.id}/following`} className="text-sm text-gray-600 dark:text-gray-400 hover:underline">
                        {followingCount} Following
                      </Link>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Joined {formatDate(user.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
                
                {!isCurrentUser && (
                  <Button 
                    variant={isFollowing ? "outline" : "default"}
                    onClick={handleToggleFollow}
                    className="flex-shrink-0"
                  >
                    {isFollowing ? (
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
            </div>
            
            {user.role === UserRole.ORGANIZATION && (
              <div className="border-t border-gray-200 dark:border-gray-700 p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-center gap-2">
                    <Building className="h-5 w-5 text-gray-500" />
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Industry</div>
                      <div className="text-gray-900 dark:text-white">{(user as Organization).industry}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-gray-500" />
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Location</div>
                      <div className="text-gray-900 dark:text-white">{(user as Organization).location}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <LinkIcon className="h-5 w-5 text-gray-500" />
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Website</div>
                      <a href={(user as Organization).website} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                        Visit website
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {user.role === UserRole.STUDENT && (
              <div className="border-t border-gray-200 dark:border-gray-700 p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-gray-500" />
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Achievements</div>
                      <div className="text-gray-900 dark:text-white">{(user as Student).achievements.length} earned</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-gray-500" />
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Streak</div>
                      <div className="text-gray-900 dark:text-white">{(user as Student).streak} days</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-gray-500" />
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Challenges Completed</div>
                      <div className="text-gray-900 dark:text-white">{(user as Student).completedChallenges}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <Tabs defaultValue="portfolio" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="followers">Followers</TabsTrigger>
              <TabsTrigger value="following">Following</TabsTrigger>
            </TabsList>
            
            <TabsContent value="portfolio">
              <Card>
                <CardHeader>
                  <CardTitle>Portfolio</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center text-gray-600 dark:text-gray-400 py-12">
                    {user.role === UserRole.ORGANIZATION ? (
                      <>
                        <p>View challenges created by this organization</p>
                        <Button className="mt-4">Browse Challenges</Button>
                      </>
                    ) : (
                      <>
                        <p>This user hasn't shared any portfolio items yet</p>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="achievements">
              <Card>
                <CardHeader>
                  <CardTitle>Achievements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center text-gray-600 dark:text-gray-400 py-12">
                    {user.role === UserRole.ORGANIZATION ? (
                      <p>Organizations don't have achievements</p>
                    ) : (
                      <p>No achievements earned yet</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="followers">
              <UserSearch mode="followers" userId={user.id} />
            </TabsContent>
            
            <TabsContent value="following">
              <UserSearch mode="following" userId={user.id} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserProfilePage;
