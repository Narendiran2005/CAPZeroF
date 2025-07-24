import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Code, Trophy, Building, User as UserIcon, Users, Plus } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UserStats from "@/components/UserStats";
import axios from "axios";

const OrgDashUtil = ({ id }: { id: string } ) => {
  const [orgs, setOrgs] = useState([
  {
    id: "1",
    title: "Industrial Equipment Design",
    participants: 45,
    updated_at: 3,
  },
  {
    id: "2",
    title: "Sustainable Packaging Challenge",
    participants: 32,
    updated_at: 5,
  },
]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrgs = async () => {
      try {
        console.log("Fetching organizations for user ID:", id);
        const token = sessionStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/practice/getpractice:${token}", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("Fetched organizations:", response.data);
        setOrgs(response.data|| [{
    title: "Industrial Equipment Design",
    participants: 45,
    updated_at: 3,
  },
  {
    title: "Sustainable Packaging Challenge",
    participants: 32,
    updated_at: 5,
  },]);
        
      } catch (err) {
        setError("Failed to load organizations.");
        toast({ title: "Error", description: "Failed to load organizations.", variant: "destructive" });
      } finally {
        setLoading(false);
      }
    };

    fetchOrgs();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    
     <div className="lg:col-span-2">
          <Card>
  <CardHeader>
    <CardTitle>Your Active practices</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="space-y-4">
      {orgs.map((practice) => (
        <div key={practice.id} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">{practice.title}</h3>
              <p className="text-sm text-gray-500">
                {practice.participants} participants • {practice.updated_at} days left
              </p>
            </div>
            <Button size="sm" variant="outline">Manage</Button>
          </div>
        </div>
      ))}
      <div className="flex justify-center mt-4">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/practices/manage">View All practices</Link>
        </Button>
      </div>
    </div>
  </CardContent>
</Card>
        </div>
    
  );
}

export default OrgDashUtil;