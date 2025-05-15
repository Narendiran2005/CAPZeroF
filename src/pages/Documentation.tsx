
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Documentation = () => {
  const [activeDoc, setActiveDoc] = useState("overview");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  // Fetch markdown content based on current selection
  useEffect(() => {
    const fetchDocContent = async () => {
      try {
        const response = await fetch(`/src/docs/${activeDoc}.md`);
        const text = await response.text();
        setContent(text);
      } catch (error) {
        console.error("Failed to load documentation:", error);
        setContent("# Error\nFailed to load documentation. Please try again later.");
      }
    };
    
    fetchDocContent();
  }, [activeDoc]);

  const documentationSections = [
    { id: "overview", name: "Overview" },
    { id: "getting-started", name: "Getting Started" },
    { id: "challenges", name: "Challenges" },
    { id: "competitions", name: "Competitions" },
    { id: "user-profiles", name: "User Profiles" },
    { id: "technical", name: "Technical Docs" },
    { id: "user-journey", name: "User Journey" },
    { id: "guides", name: "User Guides" },
    { id: "faq", name: "FAQ" }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container py-8 px-4 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Documentation</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Comprehensive guides and documentation for using CAD Arena
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar navigation */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Documentation</CardTitle>
                <CardDescription>Browse by section</CardDescription>
              </CardHeader>
              <CardContent>
                <nav className="space-y-1">
                  {documentationSections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveDoc(section.id)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                        activeDoc === section.id
                          ? "bg-cadarena-100 text-cadarena-700 dark:bg-cadarena-900 dark:text-cadarena-100"
                          : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                      }`}
                    >
                      {section.name}
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Content area */}
          <div className="lg:col-span-3">
            <Card className="h-full">
              <CardContent className="p-6">
                <ScrollArea className="h-[calc(100vh-240px)]">
                  <div className="prose dark:prose-invert max-w-none">
                    {/* We'll use a simple rendering for now. In a real app, you'd use a Markdown parser */}
                    <pre className="whitespace-pre-wrap font-sans">{content}</pre>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Documentation;
