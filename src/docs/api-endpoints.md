# CAD Arena API Documentation

## Overview

The CAD Arena API provides comprehensive endpoints for managing challenges, contests, submissions, and user interactions. All endpoints require proper authentication unless otherwise specified.

## Base URL
```
https://api.cadarena.com/v1
```

## Authentication

All authenticated endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Response Format

All API responses follow this standard format:
```json
{
  "success": boolean,
  "data": object | array | null,
  "message": string,
  "errors": array | null,
  "pagination": object | null
}
```

## Error Codes

- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `422` - Validation Error
- `429` - Rate Limit Exceeded
- `500` - Internal Server Error

---

## Authentication Endpoints

### POST /auth/register
Register a new user account.

**Request Body:**
```json
{
  "username": "string (3-50 chars)",
  "email": "string (valid email)",
  "password": "string (min 8 chars)",
  "role": "student" | "organization",
  "fullName": "string (for students)",
  "organizationName": "string (for organizations)"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "username": "string",
      "email": "string",
      "role": "student" | "organization",
      "isVerified": false
    },
    "token": "jwt_token"
  }
}
```

### POST /auth/login
Authenticate user and get access token.

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "username": "string",
      "email": "string",
      "role": "student" | "organization",
      "profile": object
    },
    "token": "jwt_token"
  }
}
```

### POST /auth/logout
Logout user and invalidate token.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

### POST /auth/refresh
Refresh authentication token.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "new_jwt_token"
  }
}
```

---

## User Management Endpoints

### GET /users/profile
Get current user's profile.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "username": "string",
    "email": "string",
    "role": "student" | "organization",
    "profile": {
      // Student profile or Organization profile
    },
    "stats": {
      "points": 0,
      "completedChallenges": 0,
      // other stats
    }
  }
}
```

### PUT /users/profile
Update current user's profile.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "fullName": "string",
  "bio": "string",
  "location": "string",
  "website": "string",
  "skills": ["skill1", "skill2"]
}
```

### GET /users/:userId
Get public profile of any user.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "username": "string",
    "role": "student" | "organization",
    "profile": {
      // Public profile information
    },
    "stats": {
      // Public statistics
    },
    "achievements": [
      // Public achievements
    ]
  }
}
```

### GET /users/search
Search for users.

**Query Parameters:**
- `q` - Search query
- `role` - Filter by role (student/organization)
- `limit` - Number of results (default: 20, max: 100)
- `offset` - Pagination offset

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "username": "string",
      "role": "student" | "organization",
      "profile": {
        // Basic profile info
      }
    }
  ],
  "pagination": {
    "total": 0,
    "limit": 20,
    "offset": 0,
    "hasMore": false
  }
}
```

---

## Challenge Management Endpoints

### GET /challenges
Get list of public challenges.

**Query Parameters:**
- `level` - Filter by difficulty level
- `type` - Filter by challenge type
- `category` - Filter by category
- `featured` - Show only featured challenges (boolean)
- `limit` - Number of results (default: 20)
- `offset` - Pagination offset
- `sort` - Sort by (newest, popular, points-high, points-low)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "title": "string",
      "description": "string",
      "level": "beginner" | "intermediate" | "advanced" | "expert",
      "type": "race-against-time" | "creative",
      "points": 100,
      "thumbnailUrl": "string",
      "stats": {
        "submissions": 0,
        "successRate": 0,
        "avgCompletionTime": 0
      },
      "creator": {
        "id": "uuid",
        "name": "string"
      }
    }
  ],
  "pagination": {
    "total": 0,
    "limit": 20,
    "offset": 0,
    "hasMore": false
  }
}
```

### GET /challenges/:challengeId
Get detailed challenge information.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "string",
    "description": "string",
    "instructions": "string",
    "level": "beginner" | "intermediate" | "advanced" | "expert",
    "type": "race-against-time" | "creative",
    "visibility": "public" | "private",
    "points": 100,
    "thumbnailUrl": "string",
    "startDate": "ISO_DATE",
    "endDate": "ISO_DATE",
    "referenceMaterials": [
      {
        "id": "uuid",
        "type": "image" | "document" | "video" | "link" | "stl_file",
        "title": "string",
        "url": "string"
      }
    ],
    "quizQuestions": [
      {
        "id": "uuid",
        "question": "string",
        "options": ["option1", "option2", "option3", "option4"],
        "points": 5
      }
    ],
    "stats": {
      "submissions": 0,
      "successRate": 0,
      "avgCompletionTime": 0,
      "participants": 0
    },
    "creator": {
      "id": "uuid",
      "name": "string",
      "logoUrl": "string"
    }
  }
}
```

### POST /challenges
Create a new challenge (Organizations only).

**Headers:** `Authorization: Bearer <token>`

**Request Body (multipart/form-data):**
```json
{
  "title": "string (required)",
  "description": "string (required)",
  "instructions": "string (required)",
  "level": "beginner" | "intermediate" | "advanced" | "expert",
  "type": "race-against-time" | "creative",
  "visibility": "public" | "private",
  "points": "number (50-1000)",
  "startDate": "ISO_DATE",
  "endDate": "ISO_DATE",
  "maxParticipants": "number (optional)",
  "contestName": "string (required for private)",
  "category": "string",
  "tags": "array of strings",
  "thumbnailImage": "File",
  "stlFile": "File",
  "referenceMaterials": "array of files"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "challengeId": "uuid",
    "inviteLink": "string (for private challenges)",
    "inviteToken": "string (for private challenges)"
  }
}
```

### PUT /challenges/:challengeId
Update challenge (Organization owner only).

**Headers:** `Authorization: Bearer <token>`

**Request Body:** Same as POST /challenges

### DELETE /challenges/:challengeId
Delete challenge (Organization owner only).

**Headers:** `Authorization: Bearer <token>`

### POST /challenges/:challengeId/join
Join a private challenge using invite token.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "inviteToken": "string"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Successfully registered for challenge"
}
```

---

## Contest Management Endpoints

### GET /contests
Get list of public contests.

**Query Parameters:**
- `status` - Filter by status (upcoming, active, completed)
- `organizationId` - Filter by organization
- `limit` - Number of results
- `offset` - Pagination offset

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "title": "string",
      "description": "string",
      "status": "upcoming" | "active" | "completed",
      "startDate": "ISO_DATE",
      "endDate": "ISO_DATE",
      "registrationCount": 0,
      "challengeCount": 0,
      "prizes": ["prize1", "prize2"],
      "organization": {
        "id": "uuid",
        "name": "string",
        "logoUrl": "string"
      }
    }
  ]
}
```

### GET /contests/:contestId
Get detailed contest information.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "string",
    "description": "string",
    "status": "upcoming" | "active" | "completed",
    "visibility": "public" | "private",
    "registrationType": "open" | "invitation" | "approval",
    "startDate": "ISO_DATE",
    "endDate": "ISO_DATE",
    "registrationDeadline": "ISO_DATE",
    "maxParticipants": 100,
    "rules": "string",
    "judgingCriteria": "string",
    "challenges": [
      {
        "id": "uuid",
        "title": "string",
        "type": "race-against-time" | "creative",
        "points": 100,
        "weight": 1.0
      }
    ],
    "prizes": [
      {
        "rank": 1,
        "title": "First Place",
        "description": "$1000 Cash Prize",
        "value": 1000
      }
    ],
    "organization": {
      "id": "uuid",
      "name": "string",
      "logoUrl": "string"
    },
    "stats": {
      "registrationCount": 0,
      "submissionCount": 0,
      "completionRate": 0
    }
  }
}
```

### POST /contests
Create a new contest (Organizations only).

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "title": "string",
  "description": "string",
  "startDate": "ISO_DATE",
  "endDate": "ISO_DATE",
  "registrationDeadline": "ISO_DATE",
  "visibility": "public" | "private",
  "registrationType": "open" | "invitation" | "approval",
  "maxParticipants": 100,
  "rules": "string",
  "judgingCriteria": "string",
  "challengeIds": ["uuid1", "uuid2"],
  "prizes": [
    {
      "rank": 1,
      "title": "First Place",
      "description": "$1000 Cash Prize",
      "value": 1000
    }
  ]
}
```

### POST /contests/:contestId/register
Register for a contest.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "inviteToken": "string (required for private contests)"
}
```

### GET /contests/:contestId/participants
Get contest participants (Organization owner only).

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "username": "string",
      "fullName": "string",
      "registeredAt": "ISO_DATE",
      "status": "registered" | "active" | "completed",
      "submissionCount": 0,
      "totalScore": 0
    }
  ]
}
```

### GET /contests/:contestId/leaderboard
Get contest leaderboard.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "rank": 1,
      "user": {
        "id": "uuid",
        "username": "string",
        "fullName": "string",
        "avatarUrl": "string"
      },
      "totalScore": 100,
      "submissionCount": 3,
      "completionTime": 1800,
      "challenges": [
        {
          "challengeId": "uuid",
          "score": 95,
          "completionTime": 600,
          "submittedAt": "ISO_DATE"
        }
      ]
    }
  ]
}
```

---

## Submission Endpoints

### POST /submissions
Submit a solution for a challenge.

**Headers:** `Authorization: Bearer <token>`

**Request Body (multipart/form-data):**
```json
{
  "challengeId": "uuid",
  "contestId": "uuid (optional)",
  "stlFile": "File",
  "cadFile": "File (optional)",
  "notes": "string (optional)",
  "completionTime": "number (seconds)",
  "quizAnswers": {
    "questionId1": 2,
    "questionId2": 1
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "submissionId": "uuid",
    "status": "pending",
    "estimatedProcessingTime": "30 seconds"
  }
}
```

### GET /submissions/:submissionId
Get submission details.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "challengeId": "uuid",
    "contestId": "uuid",
    "submittedAt": "ISO_DATE",
    "status": "pending" | "correct" | "incorrect" | "reviewing",
    "score": 95.5,
    "accuracyScore": 90.0,
    "creativityScore": 92.0,
    "completionTime": 1800,
    "feedback": "string",
    "cadFileUrl": "string",
    "stlFileUrl": "string",
    "quizAnswers": [
      {
        "questionId": "uuid",
        "answer": 2,
        "isCorrect": true,
        "points": 5
      }
    ]
  }
}
```

### GET /submissions
Get user's submissions.

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `challengeId` - Filter by challenge
- `contestId` - Filter by contest
- `status` - Filter by status
- `limit` - Number of results
- `offset` - Pagination offset

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "challenge": {
        "id": "uuid",
        "title": "string"
      },
      "contest": {
        "id": "uuid",
        "title": "string"
      },
      "submittedAt": "ISO_DATE",
      "status": "correct" | "incorrect" | "pending",
      "score": 95.5,
      "completionTime": 1800
    }
  ]
}
```

### PUT /submissions/:submissionId/review
Review a creative submission (Organization only).

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "score": 85.5,
  "creativityScore": 90.0,
  "feedback": "Great design! Could improve on...",
  "status": "correct" | "incorrect"
}
```

---

## File Management Endpoints

### POST /files/upload
Upload a file to the platform.

**Headers:** `Authorization: Bearer <token>`

**Request Body (multipart/form-data):**
```json
{
  "file": "File",
  "type": "thumbnail" | "stl" | "cad" | "reference" | "avatar",
  "context": "challenge" | "submission" | "profile"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "fileId": "uuid",
    "url": "string",
    "filename": "string",
    "size": 1024,
    "mimeType": "string"
  }
}
```

### GET /files/:fileId
Get file information or download file.

**Query Parameters:**
- `download` - Set to true to download file

---

## Analytics Endpoints

### GET /analytics/challenges
Get challenge analytics (Organization only).

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `challengeId` - Specific challenge ID
- `dateFrom` - Start date
- `dateTo` - End date

**Response:**
```json
{
  "success": true,
  "data": {
    "totalChallenges": 10,
    "totalSubmissions": 500,
    "avgSuccessRate": 75.5,
    "challenges": [
      {
        "id": "uuid",
        "title": "string",
        "submissions": 50,
        "successRate": 80.0,
        "avgCompletionTime": 1500,
        "participants": 45
      }
    ]
  }
}
```

### GET /analytics/contests
Get contest analytics (Organization only).

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "totalContests": 5,
    "totalParticipants": 200,
    "avgCompletionRate": 65.0,
    "contests": [
      {
        "id": "uuid",
        "title": "string",
        "participants": 50,
        "submissions": 120,
        "completionRate": 70.0,
        "avgScore": 85.5
      }
    ]
  }
}
```

### GET /analytics/users
Get user analytics (Admin only).

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "totalUsers": 1000,
    "activeUsers": 750,
    "newUsersThisMonth": 50,
    "userGrowth": [
      {
        "date": "2023-01-01",
        "totalUsers": 800,
        "newUsers": 25
      }
    ]
  }
}
```

---

## Notification Endpoints

### GET /notifications
Get user notifications.

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `unread` - Show only unread notifications (boolean)
- `type` - Filter by notification type
- `limit` - Number of results

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "type": "challenge_completed" | "contest_started" | "new_achievement",
      "title": "string",
      "message": "string",
      "data": {},
      "isRead": false,
      "createdAt": "ISO_DATE"
    }
  ]
}
```

### PUT /notifications/:notificationId/read
Mark notification as read.

**Headers:** `Authorization: Bearer <token>`

### PUT /notifications/read-all
Mark all notifications as read.

**Headers:** `Authorization: Bearer <token>`

---

## Rate Limiting

API endpoints are rate-limited to ensure fair usage:

- Authentication endpoints: 5 requests per minute
- File upload endpoints: 10 requests per minute
- General API endpoints: 100 requests per minute
- Search endpoints: 30 requests per minute

Rate limit headers are included in responses:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200
```

---

## Webhooks

Organizations can configure webhooks to receive real-time notifications:

### POST /webhooks
Configure webhook endpoint.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "url": "https://your-server.com/webhook",
  "events": ["submission_received", "contest_completed"],
  "secret": "your_webhook_secret"
}
```

### Webhook Events

Available webhook events:
- `submission_received` - New submission for your challenge
- `contest_completed` - Your contest has ended
- `participant_registered` - New participant in your contest
- `challenge_completed` - Someone completed your challenge

Webhook payload example:
```json
{
  "event": "submission_received",
  "timestamp": "ISO_DATE",
  "data": {
    "submissionId": "uuid",
    "challengeId": "uuid",
    "userId": "uuid",
    "score": 95.5
  }
}
```

---

## SDKs and Libraries

Official SDKs are available for:
- JavaScript/TypeScript
- Python
- PHP
- Go

Example JavaScript usage:
```javascript
import { CADArenaAPI } from '@cadarena/api-client';

const api = new CADArenaAPI({
  apiKey: 'your_api_key',
  baseURL: 'https://api.cadarena.com/v1'
});

const challenges = await api.challenges.list({ level: 'beginner' });
```
