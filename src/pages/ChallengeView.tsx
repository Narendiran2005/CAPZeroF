
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { Challenge, ChallengeLevel, ChallengeStatus } from "@/utils/types";
import { Clock } from "lucide-react";

// Mock data for a single challenge
const challengeData: Challenge = {
  id: "1",
  title: "Basic Gear Design",
  description: "Create a simple spur gear with specific tooth profile and dimensions.",
  instructions: "Design a spur gear with 24 teeth, module 2mm, and pressure angle of 20°. The gear should have a hub with diameter 30mm and length 15mm. Include keyway with dimensions 6×6mm. Export your design as both native CAD format and STL.",
  level: ChallengeLevel.BEGINNER,
  points: 100,
  thumbnailUrl: "/placeholder.svg",
  status: ChallengeStatus.PUBLISHED,
  creatorId: "org1",
  createdAt: new Date("2023-01-15"),
  updatedAt: new Date("2023-01-15"),
  submissionCount: 876,
  successRate: 87,
};

// Mock data for quiz questions
const quizQuestions = [
  {
    id: "q1",
    question: "What is the formula to calculate the pitch diameter of a spur gear?",
    options: [
      "Pitch Diameter = Number of teeth × Module",
      "Pitch Diameter = Module / Number of teeth",
      "Pitch Diameter = 2 × Module × Number of teeth",
      "Pitch Diameter = Number of teeth / Module"
    ],
    correctAnswer: 0
  },
  {
    id: "q2",
    question: "Which parameter directly affects the size of gear teeth?",
    options: [
      "Pressure angle",
      "Module",
      "Number of teeth",
      "Hub diameter"
    ],
    correctAnswer: 1
  },
  {
    id: "q3",
    question: "What is the purpose of the keyway in this design?",
    options: [
      "To reduce weight",
      "To transmit torque between shaft and gear",
      "To improve aesthetics",
      "To reduce material usage"
    ],
    correctAnswer: 1
  }
];

const ChallengeView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // State for timer
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [timerActive, setTimerActive] = useState(true);
  
  // State for file uploads
  const [cadFile, setCadFile] = useState<File | null>(null);
  const [stlFile, setStlFile] = useState<File | null>(null);
  
  // State for quiz answers
  const [answers, setAnswers] = useState<Record<string, number>>({});
  
  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Start timer when component mounts
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (timerActive) {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerActive]);
  
  const handleCadFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCadFile(e.target.files[0]);
    }
  };
  
  const handleStlFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setStlFile(e.target.files[0]);
    }
  };
  
  const handleQuizAnswer = (questionId: string, answerIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };
  
  const handleSubmit = () => {
    // Validate all required components are completed
    if (!cadFile || !stlFile) {
      toast({
        title: "Missing files",
        description: "Please upload both CAD and STL files",
        variant: "destructive"
      });
      return;
    }
    
    if (Object.keys(answers).length < quizQuestions.length) {
      toast({
        title: "Incomplete quiz",
        description: "Please answer all quiz questions",
        variant: "destructive"
      });
      return;
    }
    
    // Stop timer
    setTimerActive(false);
    
    // Create submission payload
    const submission = {
      challengeId: id,
      timeElapsed,
      answers,
      cadFile: cadFile.name,
      stlFile: stlFile.name
    };
    
    // In a real app, would upload files and submit data to server
    console.log("Submitting:", submission);
    
    toast({
      title: "Challenge submitted!",
      description: `You completed this challenge in ${formatTime(timeElapsed)}`,
    });
    
    // Redirect to results or back to challenges
    setTimeout(() => {
      navigate("/practice");
    }, 2000);
  };
  
  const handleGiveUp = () => {
    toast({
      title: "Challenge abandoned",
      description: "You can try this challenge again later.",
      variant: "destructive"
    });
    
    setTimerActive(false);
    navigate("/practice");
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gray-50 dark:bg-gray-900">
        <div className="container py-8">
          <div className="flex flex-col md:flex-row justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{challengeData.title}</h1>
              <div className="flex flex-wrap gap-2 items-center">
                <Badge variant="outline" className={
                  challengeData.level === ChallengeLevel.BEGINNER ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-900 dark:text-green-300 dark:border-green-800" :
                  challengeData.level === ChallengeLevel.INTERMEDIATE ? "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-800" :
                  challengeData.level === ChallengeLevel.ADVANCED ? "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900 dark:text-orange-300 dark:border-orange-800" :
                  "bg-red-50 text-red-700 border-red-200 dark:bg-red-900 dark:text-red-300 dark:border-red-800"
                }>
                  {challengeData.level}
                </Badge>
                <Badge variant="outline" className="bg-cadarena-50 text-cadarena-700 border-cadarena-200 dark:bg-cadarena-900 dark:text-cadarena-300 dark:border-cadarena-800">
                  {challengeData.points} points
                </Badge>
                <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm ml-2">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{formatTime(timeElapsed)}</span>
                </div>
              </div>
            </div>
            <div className="mt-4 md:mt-0 flex gap-2">
              <Button variant="outline" onClick={handleGiveUp}>
                Give Up
              </Button>
              <Button onClick={handleSubmit}>
                Submit Challenge
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Tabs defaultValue="instructions" className="w-full">
                <TabsList>
                  <TabsTrigger value="instructions">Instructions</TabsTrigger>
                  <TabsTrigger value="reference">Reference Materials</TabsTrigger>
                  <TabsTrigger value="quiz">Knowledge Check</TabsTrigger>
                </TabsList>
                
                <TabsContent value="instructions" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Challenge Instructions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-[450px] pr-4">
                        <div className="space-y-4">
                          <div className="aspect-video bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center mb-4">
                            <img 
                              src="/placeholder.svg" 
                              alt="Challenge reference image" 
                              className="max-h-full object-contain"
                            />
                          </div>
                          
                          <h3 className="font-semibold text-lg">Description</h3>
                          <p>{challengeData.description}</p>
                          
                          <h3 className="font-semibold text-lg">Requirements</h3>
                          <div className="pl-4">
                            <p className="whitespace-pre-line">{challengeData.instructions}</p>
                          </div>
                          
                          <h3 className="font-semibold text-lg">Deliverables</h3>
                          <ul className="list-disc pl-6 space-y-2">
                            <li>CAD file in your preferred format (STEP, STP, etc.)</li>
                            <li>STL file for 3D printing validation</li>
                            <li>Complete the knowledge check questionnaire</li>
                          </ul>
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="reference" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Reference Materials</CardTitle>
                      <CardDescription>
                        Use these resources to help complete the challenge
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-[450px] pr-4">
                        <div className="space-y-6">
                          <div>
                            <h3 className="font-semibold mb-2">Technical Drawing</h3>
                            <div className="aspect-video bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center mb-2">
                              <img 
                                src="/placeholder.svg" 
                                alt="Technical drawing" 
                                className="max-h-full object-contain"
                              />
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Reference drawing with critical dimensions
                            </p>
                          </div>
                          
                          <div>
                            <h3 className="font-semibold mb-2">Formula Reference</h3>
                            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                              <p className="font-mono">Pitch Diameter (d) = m × z</p>
                              <p className="font-mono">Outside Diameter (da) = d + 2m</p>
                              <p className="font-mono">Root Diameter (df) = d - 2.5m</p>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                              Where: m = module, z = number of teeth
                            </p>
                          </div>
                          
                          <div>
                            <h3 className="font-semibold mb-2">Resources</h3>
                            <ul className="space-y-2">
                              <li>
                                <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">
                                  Gear Design Principles PDF
                                </a>
                              </li>
                              <li>
                                <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">
                                  Video Tutorial: Creating Spur Gears
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="quiz" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Knowledge Check</CardTitle>
                      <CardDescription>
                        Answer the following questions about gear design
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-[450px] pr-4">
                        <div className="space-y-8">
                          {quizQuestions.map((question, index) => (
                            <div key={question.id} className="space-y-3">
                              <h3 className="font-medium">
                                {index + 1}. {question.question}
                              </h3>
                              <RadioGroup 
                                value={answers[question.id]?.toString()} 
                                onValueChange={(value) => handleQuizAnswer(question.id, parseInt(value))}
                              >
                                {question.options.map((option, optionIndex) => (
                                  <div key={optionIndex} className="flex items-center space-x-2">
                                    <RadioGroupItem value={optionIndex.toString()} id={`${question.id}-${optionIndex}`} />
                                    <Label htmlFor={`${question.id}-${optionIndex}`}>{option}</Label>
                                  </div>
                                ))}
                              </RadioGroup>
                              <Separator className="my-2" />
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Submit Your Solution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-2">Upload CAD File</h3>
                      <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center">
                        {cadFile ? (
                          <div>
                            <p className="text-sm font-medium">{cadFile.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {(cadFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="mt-2" 
                              onClick={() => setCadFile(null)}
                            >
                              Remove
                            </Button>
                          </div>
                        ) : (
                          <div className="py-4">
                            <p className="text-gray-500 dark:text-gray-400 mb-2">
                              Upload your native CAD file
                            </p>
                            <div className="flex justify-center">
                              <label htmlFor="cad-file" className="cursor-pointer">
                                <div className="bg-cadarena-600 text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-cadarena-700">
                                  Select File
                                </div>
                                <Input 
                                  id="cad-file" 
                                  type="file" 
                                  className="hidden" 
                                  accept=".stp,.step,.stl,.iges,.igs,.f3d,.dwg,.ipt,.sldprt"
                                  onChange={handleCadFileChange}
                                />
                              </label>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                              Accepted formats: STEP, STP, F3D, SLDPRT, etc.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Upload STL File</h3>
                      <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center">
                        {stlFile ? (
                          <div>
                            <p className="text-sm font-medium">{stlFile.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {(stlFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="mt-2" 
                              onClick={() => setStlFile(null)}
                            >
                              Remove
                            </Button>
                          </div>
                        ) : (
                          <div className="py-4">
                            <p className="text-gray-500 dark:text-gray-400 mb-2">
                              Upload STL file for validation
                            </p>
                            <div className="flex justify-center">
                              <label htmlFor="stl-file" className="cursor-pointer">
                                <div className="bg-cadarena-600 text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-cadarena-700">
                                  Select File
                                </div>
                                <Input 
                                  id="stl-file" 
                                  type="file" 
                                  className="hidden" 
                                  accept=".stl"
                                  onChange={handleStlFileChange}
                                />
                              </label>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                              Required for 3D printing validation
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Additional Notes</h3>
                      <Textarea 
                        placeholder="Add any comments or notes about your solution..."
                        className="min-h-[100px]"
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Time elapsed: {formatTime(timeElapsed)}
                    </p>
                  </div>
                  <Button 
                    onClick={handleSubmit} 
                    disabled={!cadFile || !stlFile || Object.keys(answers).length < quizQuestions.length}
                  >
                    Submit Solution
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="mt-6">
                <CardHeader className="pb-3">
                  <CardTitle>Challenge Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Success Rate</span>
                      <span className="text-sm font-medium">{challengeData.successRate}%</span>
                    </div>
                    <Progress value={challengeData.successRate} className="h-2" />
                  </div>
                  <div className="flex justify-between text-sm">
                    <div>
                      <p className="font-medium text-gray-700 dark:text-gray-300">Submissions</p>
                      <p className="text-xl font-semibold">{challengeData.submissionCount}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700 dark:text-gray-300">Average Time</p>
                      <p className="text-xl font-semibold">14:32</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ChallengeView;
