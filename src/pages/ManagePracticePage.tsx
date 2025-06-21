
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CreatePracticeForm from "@/components/CreatePracticeForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Wrench, Users, Eye, Edit, Trash2, Clock, Target, Calendar, User, Award } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const ManagePracticePage = () => {
  const [practices, setPractices] = useState([
    {
      id: 1,
      title: "Mechanical Gear Design",
      difficulty: "Intermediate",
      points: 250,
      participants: 45,
      status: "Active",
      createdAt: "2024-01-15",
      completions: 23,
      avgTime: "45 min",
      avgAccuracy: "78%"
    },
    {
      id: 2,
      title: "Bearing Housing Assembly",
      difficulty: "Advanced",
      points: 400,
      participants: 23,
      status: "Active",
      createdAt: "2024-01-10",
      completions: 15,
      avgTime: "67 min",
      avgAccuracy: "65%"
    },
    {
      id: 3,
      title: "Simple Bracket Design",
      difficulty: "Beginner",
      points: 150,
      participants: 67,
      status: "Draft",
      createdAt: "2024-01-08",
      completions: 45,
      avgTime: "28 min",
      avgAccuracy: "85%"
    }
  ]);

  const [participantData] = useState([
    {
      id: 1,
      practiceId: 1,
      userName: "John Smith",
      completedAt: "2024-01-20 14:30",
      timeSpent: "42 min",
      accuracy: "82%",
      points: 205,
      status: "Completed"
    },
    {
      id: 2,
      practiceId: 1,
      userName: "Sarah Johnson",
      completedAt: "2024-01-19 16:15",
      timeSpent: "38 min",
      accuracy: "89%",
      points: 223,
      status: "Completed"
    },
    {
      id: 3,
      practiceId: 1,
      userName: "Mike Chen",
      completedAt: "2024-01-18 10:45",
      timeSpent: "51 min",
      accuracy: "75%",
      points: 188,
      status: "Completed"
    }
  ]);

  const [selectedPractice, setSelectedPractice] = useState(null);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "beginner":
        return "bg-green-100 text-green-800";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "advanced":
        return "bg-orange-100 text-orange-800";
      case "expert":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-gray-100 text-gray-800";
      case "archived":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleViewParticipants = (practice) => {
    setSelectedPractice(practice);
  };

  const handleEditPractice = (practice) => {
    toast({
      title: "Edit Practice",
      description: `Editing ${practice.title} - Feature coming soon!`,
    });
  };

  const handleDeletePractice = (practiceId) => {
    setPractices(practices.filter(p => p.id !== practiceId));
    toast({
      title: "Practice Deleted",
      description: "The practice has been successfully deleted.",
      variant: "destructive",
    });
  };

  const getParticipantsForPractice = (practiceId) => {
    return participantData.filter(p => p.practiceId === practiceId);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gray-50 dark:bg-gray-900 py-12">
        <div className="container max-w-6xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Manage Practice Challenges</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Create and manage practice challenges for your organization
            </p>
          </div>

          <Tabs defaultValue="create" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="create" className="flex items-center gap-2">
                <Wrench className="h-4 w-4" />
                Create Practice
              </TabsTrigger>
              <TabsTrigger value="manage" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Manage Existing
              </TabsTrigger>
            </TabsList>

            <TabsContent value="create">
              <CreatePracticeForm />
            </TabsContent>

            <TabsContent value="manage">
              <Card>
                <CardHeader>
                  <CardTitle>Your Practice Challenges</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead>Difficulty</TableHead>
                          <TableHead>Points</TableHead>
                          <TableHead>Participants</TableHead>
                          <TableHead>Completions</TableHead>
                          <TableHead>Avg Time</TableHead>
                          <TableHead>Avg Accuracy</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Created</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {practices.map((practice) => (
                          <TableRow key={practice.id}>
                            <TableCell className="font-medium">
                              {practice.title}
                            </TableCell>
                            <TableCell>
                              <Badge className={getDifficultyColor(practice.difficulty)}>
                                {practice.difficulty}
                              </Badge>
                            </TableCell>
                            <TableCell>{practice.points}</TableCell>
                            <TableCell>{practice.participants}</TableCell>
                            <TableCell>{practice.completions}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {practice.avgTime}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Target className="h-3 w-3" />
                                {practice.avgAccuracy}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(practice.status)}>
                                {practice.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {practice.createdAt}
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex gap-2 justify-end">
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button 
                                      size="sm" 
                                      variant="outline"
                                      onClick={() => handleViewParticipants(practice)}
                                      title="View participants"
                                    >
                                      <Eye className="h-4 w-4" />
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-4xl">
                                    <DialogHeader>
                                      <DialogTitle>Practice Participants - {practice.title}</DialogTitle>
                                      <DialogDescription>
                                        View all participants and their performance for this practice
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="mt-4">
                                      <div className="grid grid-cols-3 gap-4 mb-6">
                                        <Card>
                                          <CardContent className="pt-6">
                                            <div className="flex items-center space-x-2">
                                              <Users className="h-4 w-4 text-blue-600" />
                                              <div>
                                                <p className="text-sm font-medium">Total Participants</p>
                                                <p className="text-2xl font-bold">{practice.participants}</p>
                                              </div>
                                            </div>
                                          </CardContent>
                                        </Card>
                                        <Card>
                                          <CardContent className="pt-6">
                                            <div className="flex items-center space-x-2">
                                              <Award className="h-4 w-4 text-green-600" />
                                              <div>
                                                <p className="text-sm font-medium">Completion Rate</p>
                                                <p className="text-2xl font-bold">
                                                  {Math.round((practice.completions / practice.participants) * 100)}%
                                                </p>
                                              </div>
                                            </div>
                                          </CardContent>
                                        </Card>
                                        <Card>
                                          <CardContent className="pt-6">
                                            <div className="flex items-center space-x-2">
                                              <Target className="h-4 w-4 text-orange-600" />
                                              <div>
                                                <p className="text-sm font-medium">Avg Accuracy</p>
                                                <p className="text-2xl font-bold">{practice.avgAccuracy}</p>
                                              </div>
                                            </div>
                                          </CardContent>
                                        </Card>
                                      </div>
                                      
                                      <Table>
                                        <TableHeader>
                                          <TableRow>
                                            <TableHead>Participant</TableHead>
                                            <TableHead>Completed At</TableHead>
                                            <TableHead>Time Spent</TableHead>
                                            <TableHead>Accuracy</TableHead>
                                            <TableHead>Points Earned</TableHead>
                                            <TableHead>Status</TableHead>
                                          </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                          {getParticipantsForPractice(practice.id).map((participant) => (
                                            <TableRow key={participant.id}>
                                              <TableCell>
                                                <div className="flex items-center gap-2">
                                                  <User className="h-4 w-4" />
                                                  {participant.userName}
                                                </div>
                                              </TableCell>
                                              <TableCell>
                                                <div className="flex items-center gap-1">
                                                  <Calendar className="h-3 w-3" />
                                                  {participant.completedAt}
                                                </div>
                                              </TableCell>
                                              <TableCell>
                                                <div className="flex items-center gap-1">
                                                  <Clock className="h-3 w-3" />
                                                  {participant.timeSpent}
                                                </div>
                                              </TableCell>
                                              <TableCell>
                                                <div className="flex items-center gap-1">
                                                  <Target className="h-3 w-3" />
                                                  {participant.accuracy}
                                                </div>
                                              </TableCell>
                                              <TableCell>
                                                <div className="flex items-center gap-1">
                                                  <Award className="h-3 w-3" />
                                                  {participant.points}
                                                </div>
                                              </TableCell>
                                              <TableCell>
                                                <Badge className="bg-green-100 text-green-800">
                                                  {participant.status}
                                                </Badge>
                                              </TableCell>
                                            </TableRow>
                                          ))}
                                        </TableBody>
                                      </Table>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => handleEditPractice(practice)}
                                  title="Edit practice"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="text-red-600 hover:text-red-700"
                                  onClick={() => handleDeletePractice(practice.id)}
                                  title="Delete practice"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ManagePracticePage;
