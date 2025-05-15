
import { useState } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Trophy, Users, Clock, Award, CalendarIcon } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Contest } from "@/utils/types";
import { Link } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import UserSearch from "@/components/UserSearch";

// Mock data for contests
const contests: Contest[] = [
  {
    id: "1",
    title: "Automotive Design Challenge",
    description: "Create innovative automotive parts that improve fuel efficiency.",
    organizationId: "org1",
    startDate: new Date("2023-06-15"),
    endDate: new Date("2023-06-30"),
    challenges: [],
    registeredUsers: 156,
    status: "active",
    prizes: ["$2000 Cash Prize", "Internship Opportunity", "Industry Recognition"],
    isPublic: true,
    registrationType: "open"
  },
  {
    id: "2",
    title: "Sustainable Product Design Competition",
    description: "Design eco-friendly products using sustainable materials.",
    organizationId: "org2",
    startDate: new Date("2023-07-01"),
    endDate: new Date("2023-07-15"),
    challenges: [],
    registeredUsers: 89,
    status: "upcoming",
    prizes: ["$1500 Cash Prize", "Feature in Design Magazine", "Mentorship Program"],
    isPublic: true,
    registrationType: "open"
  },
  {
    id: "3",
    title: "Medical Device Innovation Challenge",
    description: "Design medical devices that solve real-world healthcare problems.",
    organizationId: "org3",
    startDate: new Date("2023-05-10"),
    endDate: new Date("2023-05-30"),
    challenges: [],
    registeredUsers: 212,
    status: "completed",
    prizes: ["$3000 Cash Prize", "Product Development Support", "Industry Connections"],
    isPublic: true,
    registrationType: "approval"
  },
  {
    id: "4",
    title: "Furniture Design Contest",
    description: "Create innovative and functional furniture designs for modern living spaces.",
    organizationId: "org2",
    startDate: new Date("2023-08-01"),
    endDate: new Date("2023-08-20"),
    challenges: [],
    registeredUsers: 78,
    status: "upcoming",
    prizes: ["$1000 Cash Prize", "Production Opportunity", "Design Showcase"],
    isPublic: false,
    registrationType: "invitation"
  },
  {
    id: "5",
    title: "Aerospace Engineering Challenge",
    description: "Design components for next-generation aircraft with improved efficiency.",
    organizationId: "org1",
    startDate: new Date("2023-07-10"),
    endDate: new Date("2023-08-10"),
    challenges: [],
    registeredUsers: 132,
    status: "upcoming",
    prizes: ["$5000 Cash Prize", "Industry Internship", "Conference Presentation"],
    isPublic: true,
    registrationType: "open"
  },
  {
    id: "6",
    title: "Smart Home Device Competition",
    description: "Create innovative smart home products that improve daily life.",
    organizationId: "org3",
    startDate: new Date("2023-04-15"),
    endDate: new Date("2023-05-15"),
    challenges: [],
    registeredUsers: 175,
    status: "completed",
    prizes: ["$2500 Cash Prize", "Product Prototype Development", "Investor Pitch Opportunity"],
    isPublic: true,
    registrationType: "approval"
  }
];

const Competitions = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredContests = contests.filter(contest => {
    // Filter by search query
    const matchesQuery = contest.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        contest.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by status
    const matchesStatus = filterStatus === "all" || contest.status === filterStatus;
    
    // Filter by date
    const matchesDate = !date || 
                      (contest.startDate <= date && contest.endDate >= date);
    
    return matchesQuery && matchesStatus && matchesDate;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gray-50 dark:bg-gray-900">
        <div className="container py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Competitions</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Join design competitions hosted by leading companies and institutions
            </p>
          </div>

          <Tabs defaultValue="browse" className="w-full mb-8">
            <TabsList>
              <TabsTrigger value="browse">Browse Competitions</TabsTrigger>
              <TabsTrigger value="registered">My Registered Competitions</TabsTrigger>
              <TabsTrigger value="calendar">Competition Calendar</TabsTrigger>
            </TabsList>
            
            <TabsContent value="browse" className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                  <div className="w-full sm:w-48">
                    <Select 
                      defaultValue="all"
                      onValueChange={(value) => setFilterStatus(value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="all">All Competitions</SelectItem>
                          <SelectItem value="upcoming">Upcoming</SelectItem>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="w-full sm:w-48">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <CalendarComponent
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div className="relative w-full md:w-64">
                  <Input
                    type="search"
                    placeholder="Search competitions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pr-10"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                  </div>
                </div>
              </div>

              {date && (
                <div className="flex items-center mb-4">
                  <span className="text-sm mr-2">Filtering by date: {format(date, "PPP")}</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setDate(undefined)}
                    className="h-6 px-2"
                  >
                    Clear
                  </Button>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredContests.length > 0 ? (
                  filteredContests.map(contest => (
                    <CompetitionCard key={contest.id} contest={contest} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-16">
                    <p className="text-gray-500 dark:text-gray-400">
                      No competitions found matching your criteria.
                    </p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => {
                        setSearchQuery("");
                        setFilterStatus("all");
                        setDate(undefined);
                      }}
                    >
                      Clear filters
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="registered">
              <div className="text-center py-16">
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                  You need to log in to view your registered competitions
                </p>
                <div className="flex justify-center gap-4">
                  <Link to="/login">
                    <Button>Log In</Button>
                  </Link>
                  <Link to="/signup">
                    <Button variant="outline">Sign Up</Button>
                  </Link>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="calendar">
              <div className="text-center py-16">
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Competition calendar view will be available soon.
                </p>
                <Link to="/login">
                  <Button variant="outline">Log in to add competitions to your calendar</Button>
                </Link>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const CompetitionCard = ({ contest }: { contest: Contest }) => {
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'upcoming':
        return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-800';
      case 'active':
        return 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900 dark:text-green-300 dark:border-green-800';
      case 'completed':
        return 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700';
      default:
        return '';
    }
  };

  return (
    <Card className="flex flex-col h-full transition-all hover:shadow-md">
      <CardHeader>
        <div className="flex justify-between items-start">
          <Badge variant="outline" className={cn(getStatusColor(contest.status), "capitalize")}>
            {contest.status}
          </Badge>
          <div className="text-gray-500 dark:text-gray-400 text-sm flex items-center">
            <Users className="h-4 w-4 mr-1" />
            {contest.registeredUsers}
          </div>
        </div>
        <CardTitle className="text-xl mt-2">{contest.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
          {contest.description}
        </p>
        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Calendar className="h-4 w-4 mr-2" />
            <span>
              {format(new Date(contest.startDate), "MMM d, yyyy")} - {format(new Date(contest.endDate), "MMM d, yyyy")}
            </span>
          </div>
          {contest.prizes && contest.prizes.length > 0 && (
            <div className="flex items-start text-sm text-gray-500 dark:text-gray-400">
              <Trophy className="h-4 w-4 mr-2 mt-0.5" />
              <div>
                <p className="font-medium text-gray-700 dark:text-gray-300 mb-1">Prizes:</p>
                <ul className="list-disc pl-5 space-y-1">
                  {contest.prizes.slice(0, 2).map((prize, index) => (
                    <li key={index}>{prize}</li>
                  ))}
                  {contest.prizes.length > 2 && (
                    <li>+ {contest.prizes.length - 2} more</li>
                  )}
                </ul>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Link to={`/competitions/${contest.id}`} className="w-full">
          <Button className="w-full" variant={contest.status === "active" ? "default" : "outline"}>
            {contest.status === 'upcoming' ? "View Details" : 
             contest.status === 'active' ? "Join Competition" : 
             "View Results"}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default Competitions;
