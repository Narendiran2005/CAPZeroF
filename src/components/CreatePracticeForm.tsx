
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
import { Upload, FileText, Image, Wrench } from "lucide-react";
import { ChallengeLevel } from "@/utils/types";

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().optional(),
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
});

type FormValues = z.infer<typeof formSchema>;

const CreatePracticeForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      points: 100,
      difficulty: ChallengeLevel.BEGINNER,
      otherDetails: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      console.log("Practice challenge data to submit:", data);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Practice challenge created",
        description: "Your practice challenge has been successfully created.",
      });
      
      form.reset();
    } catch (error) {
      console.error("Error creating practice challenge:", error);
      toast({
        title: "Error",
        description: "Failed to create practice challenge. Please try again.",
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
            <Wrench className="h-5 w-5" />
            Create New Practice Challenge
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
                    <FormLabel>Practice Title *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter practice challenge title" {...field} />
                    </FormControl>
                    <FormDescription>
                      A clear, descriptive title for the practice challenge
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (Optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Brief description of the practice challenge" 
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
                      <FormLabel>3D Model Thumbnail *</FormLabel>
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
                        Upload an image of the 3D model as thumbnail
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
                </div>

                <FormField
                  control={form.control}
                  name="otherDetails"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Other Details (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Additional information, tips, or constraints" 
                          className="min-h-[80px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Any additional information for participants
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
                      <DialogTitle>Practice Instructions</DialogTitle>
                      <DialogDescription>
                        This is what participants will see before starting
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <h4 className="font-semibold text-yellow-800 mb-2">Requirements:</h4>
                        <p className="text-sm text-yellow-700">You need to upload an STL file to complete this challenge.</p>
                      </div>
                      
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-semibold text-blue-800 mb-2">Timer:</h4>
                        <p className="text-sm text-blue-700">Timer will start as soon as you begin this challenge.</p>
                      </div>
                      
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <h4 className="font-semibold text-red-800 mb-2">Important:</h4>
                        <p className="text-sm text-red-700">You can give up at any time but your progress won't be saved.</p>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Creating..." : "Create Practice Challenge"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreatePracticeForm;
