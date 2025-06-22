
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Trophy, 
  Users, 
  Calendar, 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Trash2, 
  Link,
  Copy,
  UserPlus
} from "lucide-react";
import { format } from "date-fns";

interface Contest {
  id: string;
  title: string;
  type: "race-against-time" | "creative";
  visibility: "public" | "private";
  status: "draft" | "active" | "completed" | "upcoming";
  participants: number;
  maxParticipants?: number;
  startDate: Date;
  endDate: Date;
  points: number;
  difficulty: string;
  inviteLink?: string;
}

// Mock data
const mockContests: Contest[] = [
  {
    id: "1",
    title: "Advanced CAD Challenge 2024",
    type: "race-against-time",
    visibility: "public",
    status: "active",
    participants: 45,
    maxParticipants: 100,
    startDate: new Date("2024-01-15"),
    endDate: new Date("2024-02-15"),
    points: 500,
    difficulty: "advanced",
    inviteLink: "https://app.com/contest/join/1?token=abc123"
  },
  {
    id: "2",
    title: "Creative Design Contest",
    type: "creative",
    visibility: "private",
    status: "upcoming",
    participants: 12,
    startDate: new Date("2024-02-01"),
    endDate: new Date("2024-02-28"),
    points: 300,
    difficulty: "intermediate",
    inviteLink: "https://app.com/contest/join/2?token=def456"
  },
  {
    id: "3",
    title: "Beginner Modeling Practice",
    type: "race-against-time",
    visibility: "public",
    status: "completed",
    participants: 78,
    maxParticipants: 80,
    startDate: new Date("2023-12-01"),
    endDate: new Date("2023-12-31"),
    points: 200,
    difficulty: "beginner"
  }
];

const ContestManagementPage = () => {
  const { toast } = useToast();
  const [contests, setContests] = useState(mockContests);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "upcoming":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "completed":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "draft":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "race-against-time":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "creative":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleView = (contestId: string) => {
    console.log("Viewing contest:", contestId);
    toast({
      title: "View Contest",
      description: "Opening contest details...",
    });
  };

  const handleEdit = (contestId: string) => {
    console.log("Editing contest:", contestId);
    toast({
      title: "Edit Contest",
      description: "Opening contest editor...",
    });
  };

  const handleDelete = (contestId: string) => {
    setContests(contests.filter(contest => contest.id !== contestId));
    toast({
      title: "Contest Deleted",
      description: "The contest has been successfully deleted.",
    });
  };

  const copyInviteLink = (link: string) => {
    navigator.clipboard.writeText(link);
    toast({
      title: "Link Copied",
      description: "The invite link has been copied to your clipboard.",
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gray-50 dark:bg-gray-900 py-12">
        <div className="container max-w-7xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Contest Management</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Manage your contests and track participant engagement
              </p>
            </div>
            <Button onClick={() => window.location.href = '/create-challenge'}>
              <Trophy className="h-4 w-4 mr-2" />
              Create New Contest
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Total Contests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{contests.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Active Contests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {contests.filter(c => c.status === "active").length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Total Participants</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {contests.reduce((sum, c) => sum + c.participants, 0)}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Private Contests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {contests.filter(c => c.visibility === "private").length}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contests Table */}
          <Card>
            <CardHeader>
              <CardTitle>Your Contests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Contest Title</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Visibility</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Participants</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Points</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contests.map((contest) => (
                      <TableRow key={contest.id}>
                        <TableCell className="font-medium">
                          <div>
                            <div className="font-semibold">{contest.title}</div>
                            <div className="text-sm text-gray-500 capitalize">{contest.difficulty}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getTypeColor(contest.type)}>
                            {contest.type === "race-against-time" ? "Race" : "Creative"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className={contest.visibility === "public" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}>
                              {contest.visibility}
                            </Badge>
                            {contest.visibility === "private" && contest.inviteLink && (
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => copyInviteLink(contest.inviteLink!)}
                                title="Copy invite link"
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getStatusColor(contest.status)}>
                            {contest.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-gray-400" />
                            <span>{contest.participants}</span>
                            {contest.maxParticipants && (
                              <span className="text-gray-400">/ {contest.maxParticipants}</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{format(contest.startDate, "MMM dd")}</div>
                            <div className="text-gray-500">{format(contest.endDate, "MMM dd, yyyy")}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-semibold">{contest.points}</span>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleView(contest.id)}>
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleEdit(contest.id)}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Contest
                              </DropdownMenuItem>
                              {contest.visibility === "private" && contest.inviteLink && (
                                <DropdownMenuItem onClick={() => copyInviteLink(contest.inviteLink!)}>
                                  <Link className="h-4 w-4 mr-2" />
                                  Copy Invite Link
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem 
                                onClick={() => handleDelete(contest.id)}
                                className="text-red-600"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContestManagementPage;
