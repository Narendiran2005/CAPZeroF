
import React from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  User, 
  Pencil, 
  MapPin, 
  Calendar,
  Globe, 
  Github, 
  Linkedin, 
  Twitter, 
  Briefcase,
  GraduationCap,
  Code
} from "lucide-react";

interface User_schema {
  id: string;
  username: string;
  email: string;
  
  role: 'student' | 'organization' | 'admin';
  avatar_url?: string | null;
  is_verified: boolean;
  is_active: boolean;
  last_login?: string | null; // ISO format datetime
  created_at: string;
  updated_at: string;
}

interface Student_schema {
  user_id: string;
  full_name?: string | null;
  bio?: string | null;
  points: number;
  streak: number;
  level: number;
  completed_challenges: number;
  total_submissions: number;
  last_active?: string | null; // ISO format datetime
  location?: string | null;
  website?: string | null;
  github_url?: string | null;
  linkedin_url?: string | null;
  created_at: string;
  updated_at: string;
}

interface UserProfileData {
  head: User_schema;
  details: Student_schema | null;
}

interface UserProfileSidebarProps {
  userData: UserProfileData;
}

export default function UserProfileSidebar({ userData }: UserProfileSidebarProps) {
  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const formatProfileSection = (title: string, icon: React.ReactNode, value?: string) => {
    if (!value) return null;
    return (
      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-1 mb-1">
          {icon}
          {title}
        </h3>
        <p className="text-sm">{value}</p>
      </div>
    );
  };

  return (
    <Card className="bg-white dark:bg-gray-800 shadow">
      <CardContent className="p-6">
        <div className="flex flex-col items-center mb-6">
          <Avatar className="h-24 w-24 mb-4">
            <AvatarImage src={userData.head.avatar_url|| "www.naren.com"} alt={userData.head.username} />
            <AvatarFallback className="text-xl">{getInitials(userData.details?.full_name)}</AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-bold">{userData.details?.full_name}</h2>
          <Button variant="outline" size="sm" className="mt-2" asChild>
            <Link to="/profile/edit">
              <Pencil className="mr-2 h-4 w-4" />
              Edit Profile
            </Link>
          </Button>
        </div>

        <div className="space-y-6">
          {userData.details?.bio && (
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">About</h3>
              <p className="text-sm">{userData.details?.bio}</p>
            </div>
          )}

          {formatProfileSection("Location", <MapPin className="h-4 w-4" />, userData.details?.location)}

          {/* {userData.details?.last_active && formatProfileSection(
            "Birthday",
            <Calendar className="h-4 w-4" />,
            new Date(userData.birthday).toLocaleDateString()
          )} */}

          {formatProfileSection("Website", <Globe className="h-4 w-4" />, userData.details?.website)}
          {formatProfileSection("Github", <Github className="h-4 w-4" />, userData.details?.github_url)}
          {formatProfileSection("LinkedIn", <Linkedin className="h-4 w-4" />, userData.details?.linkedin_url)}
          

          {userData.details?.completed_challenges && (
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-1 mb-1">
                <Briefcase className="h-4 w-4" />
                Work Experience
              </h3>
              <p className="text-sm whitespace-pre-line">{userData.details?.completed_challenges}</p>
            </div>
          )}

          {userData.details?.bio && (
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-1 mb-1">
                <GraduationCap className="h-4 w-4" />
                Education
              </h3>
              <p className="text-sm whitespace-pre-line">{userData.details?.bio}</p>
            </div>
          )}

          {/* {userData.skills && (
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-1 mb-1">
                <Code className="h-4 w-4" />
                Technical Skills
              </h3>
              <p className="text-sm whitespace-pre-line">{userData.skills}</p>
            </div>
          )} */}
        </div>
      </CardContent>
    </Card>
  );
}
