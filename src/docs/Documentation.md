
# CAD Arena Documentation

## Overview

CAD Arena is a platform for practicing, competing, and showcasing CAD design skills. The platform serves two main user types:
- **Students/Individuals**: Users who practice CAD challenges and participate in competitions.
- **Organizations**: Educational institutions or companies who create competitions and recruit talent.

## System Architecture

### Frontend
- **Framework**: React with TypeScript
- **UI Components**: Shadcn UI with Tailwind CSS
- **State Management**: React Query for data fetching and caching
- **Routing**: React Router for navigation

### Backend (Planned)
- **Database**: SQL database for storing user data, challenges, submissions, etc.
- **Authentication**: JWT-based authentication
- **File Storage**: Secure storage for CAD model files
- **API**: RESTful API endpoints for all platform features

## User Journeys

### Student User Journey

1. **Registration & Onboarding**
   - Student signs up with email or social auth
   - Creates profile with CAD experience level
   - Completes introductory CAD challenge

2. **Practice**
   - Browses available challenges by difficulty level
   - Selects challenge and views requirements
   - Downloads reference materials if provided
   - Uploads solution as STL file
   - Receives feedback and points upon successful completion

3. **Competition Participation**
   - Discovers competitions via dashboard/browse page
   - Registers for competition before deadline
   - Receives competition brief and requirements
   - Submits design within specified timeframe
   - Receives results and feedback
   - Views certificate if awarded

### Organization User Journey

1. **Registration & Onboarding**
   - Organization signs up and verifies identity
   - Creates organization profile
   - Sets up payment method (if applicable)

2. **Contest Creation**
   - Creates new contest/competition
   - Sets parameters (title, description, timeline, rules)
   - Uploads reference materials and requirements
   - Configures evaluation criteria
   - Publishes contest or saves as draft

3. **Participant Management**
   - Views list of registered participants
   - Reviews submitted designs
   - Provides feedback and scores
   - Selects winners
   - Issues certificates in bulk

## Security Measures

### Protecting CAD Logic
- The core validation logic for CAD models should be implemented server-side
- Client-side code should only handle display and user interaction
- Server-side validation using secure algorithms inaccessible to clients

### Data Protection
- Encrypted storage for all user data
- JWT with limited session duration
- HTTPS for all communications
- Role-based access control
- Regular security audits

## Testing Strategy

1. **Unit Testing**
   - Component-level tests for UI elements
   - Function-level tests for utility functions

2. **Integration Testing**
   - Testing interactions between components
   - API integration tests

3. **End-to-End Testing**
   - Complete user flow testing
   - Cross-browser compatibility

4. **Security Testing**
   - Penetration testing
   - Vulnerability scanning

## Database Schema (Planned)

```sql
-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    profile_image VARCHAR(255),
    bio TEXT
);

-- Student profiles
CREATE TABLE student_profiles (
    user_id UUID PRIMARY KEY REFERENCES users(id),
    points INTEGER NOT NULL DEFAULT 0,
    streak INTEGER NOT NULL DEFAULT 0,
    level VARCHAR(20) NOT NULL DEFAULT 'beginner',
    completed_challenges INTEGER NOT NULL DEFAULT 0
);

-- Organization profiles
CREATE TABLE organization_profiles (
    user_id UUID PRIMARY KEY REFERENCES users(id),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    website VARCHAR(255),
    logo VARCHAR(255)
);

-- Challenges
CREATE TABLE challenges (
    id UUID PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    instructions TEXT NOT NULL,
    level VARCHAR(20) NOT NULL,
    points INTEGER NOT NULL,
    thumbnail VARCHAR(255),
    status VARCHAR(20) NOT NULL,
    creator_id UUID REFERENCES users(id),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Contests
CREATE TABLE contests (
    id UUID PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    organization_id UUID REFERENCES users(id),
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    status VARCHAR(20) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Contest Challenges
CREATE TABLE contest_challenges (
    contest_id UUID REFERENCES contests(id),
    challenge_id UUID REFERENCES challenges(id),
    PRIMARY KEY (contest_id, challenge_id)
);

-- Contest Registrations
CREATE TABLE contest_registrations (
    contest_id UUID REFERENCES contests(id),
    user_id UUID REFERENCES users(id),
    registration_date TIMESTAMP NOT NULL DEFAULT NOW(),
    PRIMARY KEY (contest_id, user_id)
);

-- Submissions
CREATE TABLE submissions (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    challenge_id UUID REFERENCES challenges(id),
    contest_id UUID REFERENCES contests(id) NULL,
    file_path VARCHAR(255) NOT NULL,
    submitted_at TIMESTAMP NOT NULL DEFAULT NOW(),
    status VARCHAR(20) NOT NULL,
    score NUMERIC NULL
);

-- Achievements
CREATE TABLE achievements (
    id UUID PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    icon VARCHAR(255) NOT NULL
);

-- User Achievements
CREATE TABLE user_achievements (
    user_id UUID REFERENCES users(id),
    achievement_id UUID REFERENCES achievements(id),
    earned_at TIMESTAMP NOT NULL DEFAULT NOW(),
    PRIMARY KEY (user_id, achievement_id)
);

-- Certificates
CREATE TABLE certificates (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    contest_id UUID REFERENCES contests(id),
    issued_at TIMESTAMP NOT NULL DEFAULT NOW(),
    certificate_url VARCHAR(255) NOT NULL
);
```

## Implementation Guidelines

### 1. Frontend Development
- Create responsive UI components
- Implement client-side validation
- Set up routes and navigation
- Design user dashboards for both roles

### 2. Authentication System
- Implement secure user registration and login
- Set up JWT token handling
- Create role-based permissions

### 3. Challenge System
- Build challenge creation interface
- Implement challenge browse/filter functionality
- Create challenge submission and evaluation workflow

### 4. Competition System
- Develop competition creation and management features
- Implement participant registration
- Design submission review interface

### 5. File Handling
- Set up secure STL file upload and validation
- Implement file storage and retrieval
- Create file comparison logic for evaluation

### 6. Certificate System
- Design certificate templates
- Implement bulk certificate generation
- Set up certificate verification system

## Deployment Strategy

1. Set up CI/CD pipeline
2. Configure database migrations
3. Implement monitoring and logging
4. Create backup strategy
5. Plan for scalability

## Maintenance Plan

1. Regular security updates
2. Performance monitoring
3. User feedback collection
4. Feature roadmap planning
5. Regular code reviews
