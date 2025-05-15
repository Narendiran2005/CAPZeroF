
export enum UserRole {
  STUDENT = "student",
  ORGANIZATION = "organization"
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  createdAt: Date;
}

export interface Student extends User {
  streak: number;
  points: number;
  completedChallenges: number;
  level: number;
  achievements: Achievement[];
}

export interface Organization extends User {
  name: string;
  description: string;
  website?: string;
  logoUrl?: string;
  contestsCreated: number;
  verified: boolean;
  memberSince: Date;
  industry: string;
  location: string;
  employees?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  iconUrl: string;
  earnedAt: Date;
}

export enum ChallengeLevel {
  BEGINNER = "beginner",
  INTERMEDIATE = "intermediate",
  ADVANCED = "advanced",
  EXPERT = "expert"
}

export enum ChallengeStatus {
  DRAFT = "draft",
  PUBLISHED = "published",
  ARCHIVED = "archived"
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  instructions: string;
  level: ChallengeLevel;
  points: number;
  thumbnailUrl: string;
  status: ChallengeStatus;
  creatorId: string;
  createdAt: Date;
  updatedAt: Date;
  submissionCount: number;
  successRate: number;
  averageCompletionTime?: number;
  referenceMaterials?: ReferenceMaterial[];
  quizQuestions?: QuizQuestion[];
}

export interface ReferenceMaterial {
  id: string;
  type: "image" | "document" | "video" | "link";
  title: string;
  description?: string;
  url: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Contest {
  id: string;
  title: string;
  description: string;
  organizationId: string;
  startDate: Date;
  endDate: Date;
  challenges: Challenge[];
  registeredUsers: number;
  status: "upcoming" | "active" | "completed";
  prizes?: string[];
  isPublic: boolean;
  registrationType: "open" | "invitation" | "approval";
}

export interface Submission {
  id: string;
  userId: string;
  challengeId: string;
  submittedAt: Date;
  status: "correct" | "incorrect" | "pending";
  fileUrl: string;
  score?: number;
  completionTime: number;
  quizAnswers?: Record<string, number>;
  feedback?: string;
}

export interface Certificate {
  id: string;
  userId: string;
  contestId: string;
  issuedAt: Date;
  certificateUrl: string;
  achievementType: "winner" | "runner-up" | "participation";
  issuerName: string;
  contestTitle: string;
}

// New types for follow system
export interface UserFollowRelation {
  followerId: string;
  followingId: string;
  createdAt: Date;
}
