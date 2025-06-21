
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
  user: User_schema;
  student: Student_schema;
}

// export default function UserProfileSidebar() {
//   // In a real app, this would come from a user context or API call
//   const defaultUserData: UserProfileData = {
//     name: "Aravinth PM",
//     gender: "Male",
//     location: "Kallakurichi",
//     birthday: undefined,
//     summary: "Hi I am a Newbie CAD Engineer",
//     website: "www.googole.com",
//     github: "www.github.com",
//     linkedin: "www.github.com",
//     twitter: "www.github.com",
//     workExperience: "5 yeats",
//     education: "B Tech",
//     skills: "CAD, ZOHO",
//   };
  
//   // Try to get user data from localStorage, fallback to default
//   const storedUserData = localStorage.getItem("userProfile");
//   const userData: UserProfileData = storedUserData ? 
//     JSON.parse(storedUserData) : defaultUserData;

//   // Get initials for avatar fallback
//   const getInitials = (name: string) => {
//     return name
//       .split(" ")
//       .map((n) => n[0])
//       .join("")
//       .toUpperCase();
//   };

//   // Format various profile sections
//   const formatProfileSection = (title: string, icon: React.ReactNode, value?: string) => {
//     if (!value) return null;
//     return (
//       <div className="mb-4">
//         <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-1 mb-1">
//           {icon}
//           {title}
//         </h3>
//         <p className="text-sm">{value}</p>
//       </div>
//     );
//   };

//   return (
//     <Card className="bg-white dark:bg-gray-800 shadow">
//       <CardContent className="p-6">
//         <div className="flex flex-col items-center mb-6">
//           <Avatar className="h-24 w-24 mb-4">
//             <AvatarImage src={userData.profileImage} alt={userData.name} />
//             <AvatarFallback className="text-xl">{getInitials(userData.name)}</AvatarFallback>
//           </Avatar>
//           <h2 className="text-xl font-bold">{userData.name}</h2>
//           <Button variant="outline" size="sm" className="mt-2" asChild>
//             <Link to="/profile/edit">
//               <Pencil className="mr-2 h-4 w-4" />
//               Edit Profile
//             </Link>
//           </Button>
//         </div>

//         <div className="space-y-6">
//           {userData.summary && (
//             <div className="mb-4">
//               <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">About</h3>
//               <p className="text-sm">{userData.summary}</p>
//             </div>
//           )}

//           {formatProfileSection("Location", <MapPin className="h-4 w-4" />, userData.location)}
          
//           {userData.birthday && formatProfileSection(
//             "Birthday", 
//             <Calendar className="h-4 w-4" />, 
//             new Date(userData.birthday).toLocaleDateString()
//           )}

//           {formatProfileSection("Website", <Globe className="h-4 w-4" />, userData.website)}
//           {formatProfileSection("Github", <Github className="h-4 w-4" />, userData.github)}
//           {formatProfileSection("LinkedIn", <Linkedin className="h-4 w-4" />, userData.linkedin)}
//           {formatProfileSection("Twitter", <Twitter className="h-4 w-4" />, userData.twitter)}
          
//           {userData.workExperience && (
//             <div className="mb-4">
//               <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-1 mb-1">
//                 <Briefcase className="h-4 w-4" />
//                 Work Experience
//               </h3>
//               <p className="text-sm whitespace-pre-line">{userData.workExperience}</p>
//             </div>
//           )}

//           {userData.education && (
//             <div className="mb-4">
//               <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-1 mb-1">
//                 <GraduationCap className="h-4 w-4" />
//                 Education
//               </h3>
//               <p className="text-sm whitespace-pre-line">{userData.education}</p>
//             </div>
//           )}

//           {userData.skills && (
//             <div className="mb-4">
//               <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-1 mb-1">
//                 <Code className="h-4 w-4" />
//                 Technical Skills
//               </h3>
//               <p className="text-sm whitespace-pre-line">{userData.skills}</p>
//             </div>
//           )}
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

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
            <AvatarImage src={userData.user.avatar_url|| "www.naren.com"} alt={userData.user.username} />
            <AvatarFallback className="text-xl">{getInitials(userData.student.full_name)}</AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-bold">{userData.student.full_name}</h2>
          <Button variant="outline" size="sm" className="mt-2" asChild>
            <Link to="/profile/edit">
              <Pencil className="mr-2 h-4 w-4" />
              Edit Profile
            </Link>
          </Button>
        </div>

        <div className="space-y-6">
          {userData.student.bio && (
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">About</h3>
              <p className="text-sm">{userData.student.bio}</p>
            </div>
          )}

          {formatProfileSection("Location", <MapPin className="h-4 w-4" />, userData.student.location)}

          {/* {userData.student.last_active && formatProfileSection(
            "Birthday",
            <Calendar className="h-4 w-4" />,
            new Date(userData.birthday).toLocaleDateString()
          )} */}

          {formatProfileSection("Website", <Globe className="h-4 w-4" />, userData.student.website)}
          {formatProfileSection("Github", <Github className="h-4 w-4" />, userData.student.github_url)}
          {formatProfileSection("LinkedIn", <Linkedin className="h-4 w-4" />, userData.student.linkedin_url)}
          

          {userData.student.completed_challenges && (
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-1 mb-1">
                <Briefcase className="h-4 w-4" />
                Work Experience
              </h3>
              <p className="text-sm whitespace-pre-line">{userData.student.completed_challenges}</p>
            </div>
          )}

          {userData.student.bio && (
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-1 mb-1">
                <GraduationCap className="h-4 w-4" />
                Education
              </h3>
              <p className="text-sm whitespace-pre-line">{userData.student.bio}</p>
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

