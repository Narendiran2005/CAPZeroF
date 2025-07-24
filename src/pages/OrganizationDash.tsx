import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Code, Trophy, Building, User as UserIcon, Users, Plus } from "lucide-react";
import { toast } from "@/hooks/use-toast";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FeaturedChallenges from "@/components/FeaturedChallenges";
import UserProfileSidebar from "@/components/UserProfileSidebar";
import UserStats from "@/components/UserStats";
import ActivityCalendar from "@/components/ActivityCalendar";
import RecentActivity from "@/components/RecentActivity";
import axios from "axios";