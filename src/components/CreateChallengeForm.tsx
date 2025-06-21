import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Upload, FileText, Image, Trophy, Clock, Palette, Link, Copy, Users, Globe } from "lucide-react";
import { ChallengeLevel } from "@/utils/types";

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().optional(),
  challengeType: z.enum(["race-against-time", "creative"]),
  visibility: z.enum(["public", "private"]),
  thumbnailImage: z.any().optional(),
  points: z.coerce.number().min(50, "Minimum 50 points").max(1000, "Maximum 1000 points"),
  difficulty: z.enum([
    ChallengeLevel.BEGINNER,
    ChallengeLevel.INTERMEDIATE,
    ChallengeLevel.ADVANCED,
    ChallengeLevel.EXPERT,
  ]),
  technicalDiagram: z.any().optional(),
  stlFile: z.any().optional(),
  otherDetails: z.string().optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  maxParticipants: z.coerce.number().min(1, "Minimum 1 participant").optional(),
  contestName: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const CreateChallengeForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);
  const [showLinkDialog, setShowLinkDialog] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      challengeType: "race-against-time",
      visibility: "public",
      points: 100,
      difficulty: ChallengeLevel.BEGINNER,
      otherDetails: "",
      startDate: "",
      endDate: "",
      contestName: "",
    },
  });

  const watchedChallengeType = form.watch("challengeType");
  const watchedVisibility = form.watch("visibility");

  const generatePrivateLink = (challengeId: string) => {
    const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    return `${window.location.origin}/contest/join/${challengeId}?token=${token}`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Link copied",
      description: "The contest link has been copied to your clipboard.",
    });
  };

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      console.log("Challenge data to submit:", data);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const challengeId = `challenge-${Date.now()}`;
      
      if (data.visibility === "private") {
        const link = generatePrivateLink(challengeId);
        setGeneratedLink(link);
        setShowLinkDialog(true);
      }
      
      toast({
        title: "Challenge created",
        description: `Your ${data.visibility} challenge has been successfully created.`,
      });
      
      form.reset();
    } catch (error) {
      console.error("Error creating challenge:", error);
      toast({
        title: "Error",
        description: "Failed to create challenge. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case ChallengeLevel.BEGINNER:
        return "bg-green-100 text-green-800 border-green-200";
      case ChallengeLevel.INTERMEDIATE:
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case ChallengeLevel.ADVANCED:
        return "bg-orange-100 text-orange-800 border-orange-200";
      case ChallengeLevel.EXPERT:
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Create New Challenge
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Challenge Title *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter challenge title" {...field} />
                    </FormControl>
                    <FormDescription>
                      A clear, descriptive title for the challenge
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="challengeType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Challenge Type *</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="grid grid-cols-1 gap-4"
                        >
                          <div className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-gray-50">
                            <RadioGroupItem value="race-against-time" id="race-against-time" />
                            <Label htmlFor="race-against-time" className="flex-1 cursor-pointer">
                              <div className="flex items-center gap-2 mb-1">
                                <Clock className="h-4 w-4 text-blue-600" />
                                <span className="font-medium">Race Against Time</span>
                              </div>
                              <p className="text-sm text-gray-600">
                                Participants compete by submitting models quickly with accuracy scoring
                              </p>
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-gray-50">
                            <RadioGroupItem value="creative" id="creative" />
                            <Label htmlFor="creative" className="flex-1 cursor-pointer">
                              <div className="flex items-center gap-2 mb-1">
                                <Palette className="h-4 w-4 text-purple-600" />
                                <span className="font-medium">Creative Contest</span>
                              </div>
                              <p className="text-sm text-gray-600">
                                Participants submit creative models for manual evaluation and scoring
                              </p>
                            </Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="visibility"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Challenge Visibility *</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="grid grid-cols-1 gap-4"
                        >
                          <div className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-gray-50">
                            <RadioGroupItem value="public" id="public" />
                            <Label htmlFor="public" className="flex-1 cursor-pointer">
                              <div className="flex items-center gap-2 mb-1">
                                <Globe className="h-4 w-4 text-green-600" />
                                <span className="font-medium">Public</span>
                              </div>
                              <p className="text-sm text-gray-600">
                                Visible to all users in the practice section
                              </p>
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-gray-50">
                            <RadioGroupItem value="private" id="private" />
                            <Label htmlFor="private" className="flex-1 cursor-pointer">
                              <div className="flex items-center gap-2 mb-1">
                                <Users className="h-4 w-4 text-blue-600" />
                                <span className="font-medium">Private Contest</span>
                              </div>
                              <p className="text-sm text-gray-600">
                                Only accessible via invitation link
                              </p>
                            </Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {watchedVisibility === "private" && (
                <FormField
                  control={form.control}
                  name="contestName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contest Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter contest name (e.g., Company Design Challenge 2024)" {...field} />
                      </FormControl>
                      <FormDescription>
                        This will be displayed to participants when they join via the link
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (Optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Brief description of the challenge" 
                        className="min-h-[80px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Optional description to provide more context
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="thumbnailImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Challenge Thumbnail *</FormLabel>
                      <FormControl>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                          <Image className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                          <div className="text-sm text-gray-600">
                            <label htmlFor="thumbnail-upload" className="cursor-pointer">
                              <span className="text-primary hover:text-primary/80">Upload an image</span>
                              <input
                                id="thumbnail-upload"
                                type="file"
                                accept="image/*"
                                className="sr-only"
                                onChange={(e) => field.onChange(e.target.files?.[0])}
                              />
                            </label>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB</p>
                        </div>
                      </FormControl>
                      <FormDescription>
                        Upload an image for the challenge thumbnail
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="points"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Maximum Points *</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormDescription>
                          Points awarded for completion (50-1000)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="difficulty"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Difficulty Level *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select difficulty" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value={ChallengeLevel.BEGINNER}>
                              <span className={`px-2 py-1 rounded-md text-xs ${getDifficultyColor(ChallengeLevel.BEGINNER)}`}>
                                Beginner
                              </span>
                            </SelectItem>
                            <SelectItem value={ChallengeLevel.INTERMEDIATE}>
                              <span className={`px-2 py-1 rounded-md text-xs ${getDifficultyColor(ChallengeLevel.INTERMEDIATE)}`}>
                                Intermediate
                              </span>
                            </SelectItem>
                            <SelectItem value={ChallengeLevel.ADVANCED}>
                              <span className={`px-2 py-1 rounded-md text-xs ${getDifficultyColor(ChallengeLevel.ADVANCED)}`}>
                                Advanced
                              </span>
                            </SelectItem>
                            <SelectItem value={ChallengeLevel.EXPERT}>
                              <span className={`px-2 py-1 rounded-md text-xs ${getDifficultyColor(ChallengeLevel.EXPERT)}`}>
                                Expert
                              </span>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date *</FormLabel>
                      <FormControl>
                        <Input type="datetime-local" {...field} />
                      </FormControl>
                      <FormDescription>
                        When the challenge starts
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Date *</FormLabel>
                      <FormControl>
                        <Input type="datetime-local" {...field} />
                      </FormControl>
                      <FormDescription>
                        When the challenge ends
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {watchedChallengeType === "race-against-time" && (
                <FormField
                  control={form.control}
                  name="maxParticipants"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Maximum Participants (Optional)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Leave empty for unlimited" {...field} />
                      </FormControl>
                      <FormDescription>
                        Limit the number of participants (optional)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Reference Materials</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="technicalDiagram"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Technical Diagram</FormLabel>
                        <FormControl>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                            <FileText className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                            <div className="text-sm text-gray-600">
                              <label htmlFor="diagram-upload" className="cursor-pointer">
                                <span className="text-primary hover:text-primary/80">Upload diagram</span>
                                <input
                                  id="diagram-upload"
                                  type="file"
                                  accept="image/*,.pdf"
                                  className="sr-only"
                                  onChange={(e) => field.onChange(e.target.files?.[0])}
                                />
                              </label>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Image or PDF</p>
                          </div>
                        </FormControl>
                        <FormDescription>
                          Technical diagram for reference
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {watchedChallengeType === "race-against-time" && (
                    <FormField
                      control={form.control}
                      name="stlFile"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>STL File for Verification</FormLabel>
                          <FormControl>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                              <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                              <div className="text-sm text-gray-600">
                                <label htmlFor="stl-upload" className="cursor-pointer">
                                  <span className="text-primary hover:text-primary/80">Upload STL file</span>
                                  <input
                                    id="stl-upload"
                                    type="file"
                                    accept=".stl"
                                    className="sr-only"
                                    onChange={(e) => field.onChange(e.target.files?.[0])}
                                  />
                                </label>
                              </div>
                              <p className="text-xs text-gray-500 mt-1">STL format only</p>
                            </div>
                          </FormControl>
                          <FormDescription>
                            STL file for solution verification
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>

                <FormField
                  control={form.control}
                  name="otherDetails"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Other Details (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder={
                            watchedChallengeType === "creative" 
                              ? "Judging criteria, creative requirements, submission guidelines..." 
                              : "Additional information, tips, or constraints..."
                          }
                          className="min-h-[80px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        {watchedChallengeType === "creative" 
                          ? "Specify judging criteria and creative requirements"
                          : "Any additional information for participants"
                        }
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Dialog open={showInstructions} onOpenChange={setShowInstructions}>
                  <DialogTrigger asChild>
                    <Button type="button" variant="outline">
                      Preview Instructions
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Challenge Instructions</DialogTitle>
                      <DialogDescription>
                        This is what participants will see before starting
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      {watchedChallengeType === "race-against-time" ? (
                        <>
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <h4 className="font-semibold text-blue-800 mb-2">Race Against Time:</h4>
                            <p className="text-sm text-blue-700">Compete with others by submitting accurate models quickly.</p>
                          </div>
                          
                          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <h4 className="font-semibold text-yellow-800 mb-2">Requirements:</h4>
                            <p className="text-sm text-yellow-700">You need to upload an STL file to complete this challenge.</p>
                          </div>
                          
                          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <h4 className="font-semibold text-red-800 mb-2">Scoring:</h4>
                            <p className="text-sm text-red-700">Points based on accuracy and completion time.</p>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                            <h4 className="font-semibold text-purple-800 mb-2">Creative Contest:</h4>
                            <p className="text-sm text-purple-700">Submit your creative model for manual evaluation.</p>
                          </div>
                          
                          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <h4 className="font-semibold text-green-800 mb-2">Evaluation:</h4>
                            <p className="text-sm text-green-700">Models will be reviewed individually by judges.</p>
                          </div>
                          
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <h4 className="font-semibold text-blue-800 mb-2">Submission:</h4>
                            <p className="text-sm text-blue-700">Upload your STL file before the deadline.</p>
                          </div>
                        </>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>

                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Creating..." : "Create Challenge"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Private Link Dialog */}
      <Dialog open={showLinkDialog} onOpenChange={setShowLinkDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Link className="h-5 w-5" />
              Private Contest Link
            </DialogTitle>
            <DialogDescription>
              Share this link with participants to give them access to your private contest
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-gray-50 border rounded-lg p-4">
              <div className="flex items-center justify-between gap-2">
                <code className="text-sm flex-1 break-all">{generatedLink}</code>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => generatedLink && copyToClipboard(generatedLink)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-2">Important:</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Save this link - it cannot be regenerated</li>
                <li>• Only users with this link can access the contest</li>
                <li>• The contest will appear in participants' upcoming challenges</li>
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateChallengeForm;
