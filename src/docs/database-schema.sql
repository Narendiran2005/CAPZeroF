
<<<<<<< HEAD
-- Users table - Stores all users (both students and organizations)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('student', 'organization')),
    avatar_url VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Student profiles - Extended information for student/individual users
=======
-- =============================================================================
-- CAD ARENA DATABASE SCHEMA
-- Complete database structure for CAD Arena platform
-- =============================================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =============================================================================
-- ENUMS AND TYPES
-- =============================================================================

-- User roles
CREATE TYPE user_role AS ENUM ('student', 'organization', 'admin');

-- Challenge levels
CREATE TYPE challenge_level AS ENUM ('beginner', 'intermediate', 'advanced', 'expert');

-- Challenge types
CREATE TYPE challenge_type AS ENUM ('race-against-time', 'creative');

-- Challenge visibility
CREATE TYPE challenge_visibility AS ENUM ('public', 'private');

-- Challenge status
CREATE TYPE challenge_status AS ENUM ('draft', 'published', 'archived');

-- Contest status
CREATE TYPE contest_status AS ENUM ('upcoming', 'active', 'completed', 'cancelled');

-- Registration types
CREATE TYPE registration_type AS ENUM ('open', 'invitation', 'approval');

-- Submission status
CREATE TYPE submission_status AS ENUM ('pending', 'correct', 'incorrect', 'reviewing');

-- Participant status
CREATE TYPE participant_status AS ENUM ('registered', 'active', 'completed', 'disqualified');

-- Material types
CREATE TYPE material_type AS ENUM ('image', 'document', 'video', 'link', 'stl_file');

-- Achievement types
CREATE TYPE achievement_type AS ENUM ('winner', 'runner-up', 'participation', 'skill', 'milestone');

-- =============================================================================
-- CORE USER TABLES
-- =============================================================================

-- Users table - Stores all users (students, organizations, admins)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role user_role NOT NULL DEFAULT 'student',
    avatar_url VARCHAR(500),
    is_verified BOOLEAN NOT NULL DEFAULT FALSE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Student profiles - Extended information for student users
>>>>>>> friend/main
CREATE TABLE student_profiles (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    full_name VARCHAR(100),
    bio TEXT,
    points INTEGER NOT NULL DEFAULT 0,
    streak INTEGER NOT NULL DEFAULT 0,
    level INTEGER NOT NULL DEFAULT 1,
    completed_challenges INTEGER NOT NULL DEFAULT 0,
<<<<<<< HEAD
    last_active TIMESTAMP WITH TIME ZONE
=======
    total_submissions INTEGER NOT NULL DEFAULT 0,
    last_active TIMESTAMP WITH TIME ZONE,
    location VARCHAR(100),
    website VARCHAR(255),
    github_url VARCHAR(255),
    linkedin_url VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
>>>>>>> friend/main
);

-- Organization profiles - Extended information for organization users
CREATE TABLE organization_profiles (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    website VARCHAR(255),
<<<<<<< HEAD
    logo_url VARCHAR(255),
    industry VARCHAR(100),
    location VARCHAR(100),
    employees VARCHAR(50),
    contests_created INTEGER NOT NULL DEFAULT 0,
    is_verified BOOLEAN NOT NULL DEFAULT FALSE,
    verified_at TIMESTAMP WITH TIME ZONE
);

-- Challenges - All practice challenges in the system
CREATE TABLE challenges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    instructions TEXT NOT NULL,
    level VARCHAR(20) NOT NULL CHECK (level IN ('beginner', 'intermediate', 'advanced', 'expert')),
    points INTEGER NOT NULL,
    thumbnail_url VARCHAR(255),
    status VARCHAR(20) NOT NULL CHECK (status IN ('draft', 'published', 'archived')),
    creator_id UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    is_featured BOOLEAN NOT NULL DEFAULT FALSE,
    category VARCHAR(50),
    tags VARCHAR[],
    expected_completion_time INTEGER -- in seconds
=======
    logo_url VARCHAR(500),
    industry VARCHAR(100),
    location VARCHAR(100),
    employee_count VARCHAR(50),
    contests_created INTEGER NOT NULL DEFAULT 0,
    challenges_created INTEGER NOT NULL DEFAULT 0,
    is_verified BOOLEAN NOT NULL DEFAULT FALSE,
    verified_at TIMESTAMP WITH TIME ZONE,
    contact_email VARCHAR(100),
    contact_phone VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- =============================================================================
-- CHALLENGE SYSTEM
-- =============================================================================

-- Challenges - All practice challenges and contest challenges
CREATE TABLE challenges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    instructions TEXT NOT NULL,
    level challenge_level NOT NULL,
    type challenge_type NOT NULL DEFAULT 'race-against-time',
    visibility challenge_visibility NOT NULL DEFAULT 'public',
    points INTEGER NOT NULL CHECK (points >= 50 AND points <= 1000),
    thumbnail_url VARCHAR(500),
    status challenge_status NOT NULL DEFAULT 'draft',
    creator_id UUID REFERENCES users(id) ON DELETE SET NULL,
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE NOT NULL,
    max_participants INTEGER,
    contest_name VARCHAR(200), -- For private contests
    invite_token VARCHAR(255) UNIQUE, -- For private contests
    expected_completion_time INTEGER, -- in minutes
    category VARCHAR(50),
    tags TEXT[],
    is_featured BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
>>>>>>> friend/main
);

-- Reference materials - Supporting materials for challenges
CREATE TABLE reference_materials (
<<<<<<< HEAD
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    challenge_id UUID NOT NULL REFERENCES challenges(id) ON DELETE CASCADE,
    type VARCHAR(20) NOT NULL CHECK (type IN ('image', 'document', 'video', 'link')),
    title VARCHAR(100) NOT NULL,
    description TEXT,
    url VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    display_order INTEGER NOT NULL DEFAULT 0
=======
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    challenge_id UUID NOT NULL REFERENCES challenges(id) ON DELETE CASCADE,
    type material_type NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    url VARCHAR(500) NOT NULL,
    file_size BIGINT,
    mime_type VARCHAR(100),
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
>>>>>>> friend/main
);

-- Quiz questions - Knowledge check questions for challenges
CREATE TABLE quiz_questions (
<<<<<<< HEAD
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
=======
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
>>>>>>> friend/main
    challenge_id UUID NOT NULL REFERENCES challenges(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    options JSONB NOT NULL, -- Array of options as JSON
    correct_answer INTEGER NOT NULL,
<<<<<<< HEAD
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    display_order INTEGER NOT NULL DEFAULT 0
);

-- Contests - Competitions created by organizations
CREATE TABLE contests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(100) NOT NULL,
=======
    points INTEGER NOT NULL DEFAULT 5,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- =============================================================================
-- CONTEST SYSTEM
-- =============================================================================

-- Contests - Competitions created by organizations
CREATE TABLE contests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(200) NOT NULL,
>>>>>>> friend/main
    description TEXT NOT NULL,
    organization_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE NOT NULL,
    registration_deadline TIMESTAMP WITH TIME ZONE,
<<<<<<< HEAD
    status VARCHAR(20) NOT NULL CHECK (status IN ('upcoming', 'active', 'completed', 'canceled')),
    is_public BOOLEAN NOT NULL DEFAULT TRUE,
    registration_type VARCHAR(20) NOT NULL CHECK (registration_type IN ('open', 'invitation', 'approval')),
    max_participants INTEGER,
=======
    status contest_status NOT NULL DEFAULT 'upcoming',
    visibility challenge_visibility NOT NULL DEFAULT 'public',
    registration_type registration_type NOT NULL DEFAULT 'open',
    max_participants INTEGER,
    invite_token VARCHAR(255) UNIQUE, -- For private contests
    rules TEXT,
    judging_criteria TEXT,
>>>>>>> friend/main
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Contest challenges - Maps challenges to contests
CREATE TABLE contest_challenges (
<<<<<<< HEAD
=======
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
>>>>>>> friend/main
    contest_id UUID NOT NULL REFERENCES contests(id) ON DELETE CASCADE,
    challenge_id UUID NOT NULL REFERENCES challenges(id) ON DELETE CASCADE,
    display_order INTEGER NOT NULL DEFAULT 0,
    weight DECIMAL(5,2) NOT NULL DEFAULT 1.0, -- Weight for scoring
<<<<<<< HEAD
    PRIMARY KEY (contest_id, challenge_id)
=======
    is_mandatory BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    UNIQUE(contest_id, challenge_id)
>>>>>>> friend/main
);

-- Contest prizes - Prizes offered for contests
CREATE TABLE contest_prizes (
<<<<<<< HEAD
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contest_id UUID NOT NULL REFERENCES contests(id) ON DELETE CASCADE,
    rank INTEGER NOT NULL,
    description TEXT NOT NULL,
    value DECIMAL(10,2),
=======
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    contest_id UUID NOT NULL REFERENCES contests(id) ON DELETE CASCADE,
    rank INTEGER NOT NULL,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    value DECIMAL(10,2),
    currency VARCHAR(3) DEFAULT 'USD',
>>>>>>> friend/main
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Contest registrations - Users registered for contests
CREATE TABLE contest_registrations (
<<<<<<< HEAD
    contest_id UUID NOT NULL REFERENCES contests(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    registration_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    status VARCHAR(20) NOT NULL CHECK (status IN ('registered', 'approved', 'rejected', 'withdrawn')),
    PRIMARY KEY (contest_id, user_id)
);

-- Submissions - All user submissions for challenges
CREATE TABLE submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    challenge_id UUID NOT NULL REFERENCES challenges(id) ON DELETE CASCADE,
    contest_id UUID REFERENCES contests(id) ON DELETE CASCADE,
    cad_file_url VARCHAR(255) NOT NULL,
    stl_file_url VARCHAR(255) NOT NULL,
=======
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    contest_id UUID NOT NULL REFERENCES contests(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    registration_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    status participant_status NOT NULL DEFAULT 'registered',
    invite_token VARCHAR(255), -- Track which invite was used
    notes TEXT,
    UNIQUE(contest_id, user_id)
);

-- Contest participants - Links challenges to contest participants
CREATE TABLE contest_participants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    contest_id UUID NOT NULL REFERENCES contests(id) ON DELETE CASCADE,
    challenge_id UUID NOT NULL REFERENCES challenges(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    registered_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    invite_token VARCHAR(255),
    status participant_status NOT NULL DEFAULT 'registered',
    UNIQUE(contest_id, challenge_id, user_id)
);

-- =============================================================================
-- SUBMISSION SYSTEM
-- =============================================================================

-- Submissions - All user submissions for challenges
CREATE TABLE submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    challenge_id UUID NOT NULL REFERENCES challenges(id) ON DELETE CASCADE,
    contest_id UUID REFERENCES contests(id) ON DELETE CASCADE,
    cad_file_url VARCHAR(500) NOT NULL,
    stl_file_url VARCHAR(500) NOT NULL,
>>>>>>> friend/main
    additional_files JSONB, -- URLs to any additional files
    notes TEXT,
    submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    completion_time INTEGER NOT NULL, -- Time taken in seconds
<<<<<<< HEAD
    status VARCHAR(20) NOT NULL CHECK (status IN ('pending', 'correct', 'incorrect')),
    score DECIMAL(5,2),
    feedback TEXT,
    is_featured BOOLEAN NOT NULL DEFAULT FALSE
=======
    status submission_status NOT NULL DEFAULT 'pending',
    score DECIMAL(5,2),
    accuracy_score DECIMAL(5,2), -- For race-against-time challenges
    creativity_score DECIMAL(5,2), -- For creative challenges
    feedback TEXT,
    reviewed_by UUID REFERENCES users(id),
    reviewed_at TIMESTAMP WITH TIME ZONE,
    is_featured BOOLEAN NOT NULL DEFAULT FALSE,
    file_size BIGINT,
    version INTEGER NOT NULL DEFAULT 1
>>>>>>> friend/main
);

-- Quiz answers - User answers to quiz questions
CREATE TABLE quiz_answers (
<<<<<<< HEAD
=======
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
>>>>>>> friend/main
    submission_id UUID NOT NULL REFERENCES submissions(id) ON DELETE CASCADE,
    question_id UUID NOT NULL REFERENCES quiz_questions(id) ON DELETE CASCADE,
    answer INTEGER NOT NULL,
    is_correct BOOLEAN NOT NULL,
<<<<<<< HEAD
    PRIMARY KEY (submission_id, question_id)
);

-- Achievements - All available achievements in the system
CREATE TABLE achievements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    icon_url VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL,
    points INTEGER NOT NULL DEFAULT 0,
=======
    time_taken INTEGER, -- in seconds
    UNIQUE(submission_id, question_id)
);

-- =============================================================================
-- ACHIEVEMENT SYSTEM
-- =============================================================================

-- Achievements - All available achievements in the system
CREATE TABLE achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    icon_url VARCHAR(500) NOT NULL,
    category VARCHAR(50) NOT NULL,
    type achievement_type NOT NULL,
    points INTEGER NOT NULL DEFAULT 0,
    criteria JSONB, -- Conditions to earn this achievement
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
>>>>>>> friend/main
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- User achievements - Achievements earned by users
CREATE TABLE user_achievements (
<<<<<<< HEAD
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    achievement_id UUID NOT NULL REFERENCES achievements(id) ON DELETE CASCADE,
    earned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    PRIMARY KEY (user_id, achievement_id)
=======
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    achievement_id UUID NOT NULL REFERENCES achievements(id) ON DELETE CASCADE,
    earned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    contest_id UUID REFERENCES contests(id) ON DELETE SET NULL,
    submission_id UUID REFERENCES submissions(id) ON DELETE SET NULL,
    UNIQUE(user_id, achievement_id)
>>>>>>> friend/main
);

-- Certificates - Certificates issued to users
CREATE TABLE certificates (
<<<<<<< HEAD
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    contest_id UUID NOT NULL REFERENCES contests(id) ON DELETE CASCADE,
    issued_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    certificate_url VARCHAR(255) NOT NULL,
    achievement_type VARCHAR(20) NOT NULL CHECK (achievement_type IN ('winner', 'runner-up', 'participation')),
    issuer_name VARCHAR(100) NOT NULL,
    contest_title VARCHAR(100) NOT NULL,
    is_verified BOOLEAN NOT NULL DEFAULT TRUE
);

-- User skills - CAD software skills of users
CREATE TABLE user_skills (
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    skill_name VARCHAR(50) NOT NULL,
    proficiency VARCHAR(20) CHECK (proficiency IN ('beginner', 'intermediate', 'advanced', 'expert')),
    PRIMARY KEY (user_id, skill_name)
=======
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    contest_id UUID NOT NULL REFERENCES contests(id) ON DELETE CASCADE,
    certificate_url VARCHAR(500) NOT NULL,
    achievement_type achievement_type NOT NULL,
    rank INTEGER,
    score DECIMAL(8,2),
    issued_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    issuer_name VARCHAR(100) NOT NULL,
    contest_title VARCHAR(200) NOT NULL,
    is_verified BOOLEAN NOT NULL DEFAULT TRUE,
    verification_code VARCHAR(50) UNIQUE
);

-- =============================================================================
-- USER PROFILE EXTENSIONS
-- =============================================================================

-- User skills - CAD software skills of users
CREATE TABLE user_skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    skill_name VARCHAR(50) NOT NULL,
    proficiency challenge_level NOT NULL DEFAULT 'beginner',
    years_experience INTEGER,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, skill_name)
>>>>>>> friend/main
);

-- User experience - Work/education experience of users
CREATE TABLE user_experiences (
<<<<<<< HEAD
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
=======
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
>>>>>>> friend/main
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(100) NOT NULL,
    organization VARCHAR(100) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    is_current BOOLEAN NOT NULL DEFAULT FALSE,
    description TEXT,
    type VARCHAR(20) CHECK (type IN ('work', 'education', 'project')),
<<<<<<< HEAD
=======
    location VARCHAR(100),
>>>>>>> friend/main
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

<<<<<<< HEAD
=======
-- User follows - User following relationships
CREATE TABLE user_follows (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    follower_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    following_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    UNIQUE(follower_id, following_id),
    CHECK (follower_id != following_id)
);

-- =============================================================================
-- STATISTICS AND ANALYTICS
-- =============================================================================

>>>>>>> friend/main
-- Challenge stats - Aggregated statistics for challenges
CREATE TABLE challenge_stats (
    challenge_id UUID PRIMARY KEY REFERENCES challenges(id) ON DELETE CASCADE,
    submission_count INTEGER NOT NULL DEFAULT 0,
<<<<<<< HEAD
    success_count INTEGER NOT NULL DEFAULT 0, -- Successful submissions
    success_rate DECIMAL(5,2) NOT NULL DEFAULT 0.0,
    avg_completion_time INTEGER, -- Average completion time in seconds
    fastest_completion_time INTEGER, -- Fastest completion time in seconds
    last_updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Views

-- View for challenge statistics
CREATE OR REPLACE VIEW v_challenge_statistics AS
SELECT 
    c.id AS challenge_id,
    c.title,
    c.level,
    COUNT(s.id) AS total_submissions,
    SUM(CASE WHEN s.status = 'correct' THEN 1 ELSE 0 END) AS correct_submissions,
    CASE 
        WHEN COUNT(s.id) > 0 THEN 
            (SUM(CASE WHEN s.status = 'correct' THEN 1 ELSE 0 END)::DECIMAL / COUNT(s.id)) * 100 
        ELSE 0 
    END AS success_rate,
    AVG(CASE WHEN s.status = 'correct' THEN s.completion_time ELSE NULL END) AS avg_completion_time
FROM 
    challenges c
LEFT JOIN 
    submissions s ON c.id = s.challenge_id
GROUP BY 
    c.id, c.title, c.level;

-- View for organization analytics
CREATE OR REPLACE VIEW v_organization_analytics AS
SELECT 
    o.user_id AS organization_id,
    u.username,
    o.name,
    COUNT(DISTINCT co.id) AS total_contests,
    SUM(cr.registered_count) AS total_registrations,
    SUM(s.submission_count) AS total_submissions
FROM 
    organization_profiles o
JOIN 
    users u ON o.user_id = u.id
LEFT JOIN 
    contests co ON o.user_id = co.organization_id
LEFT JOIN (
    SELECT contest_id, COUNT(*) AS registered_count
    FROM contest_registrations
    GROUP BY contest_id
) cr ON co.id = cr.contest_id
LEFT JOIN (
    SELECT contest_id, COUNT(*) AS submission_count
    FROM submissions
    WHERE contest_id IS NOT NULL
    GROUP BY contest_id
) s ON co.id = s.contest_id
GROUP BY 
    o.user_id, u.username, o.name;

-- Triggers

-- Update challenge statistics after submission
=======
    success_count INTEGER NOT NULL DEFAULT 0,
    success_rate DECIMAL(5,2) NOT NULL DEFAULT 0.0,
    avg_completion_time INTEGER, -- Average completion time in seconds
    fastest_completion_time INTEGER, -- Fastest completion time
    slowest_completion_time INTEGER, -- Slowest completion time
    avg_score DECIMAL(5,2),
    participation_count INTEGER NOT NULL DEFAULT 0,
    last_updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Contest stats - Aggregated statistics for contests
CREATE TABLE contest_stats (
    contest_id UUID PRIMARY KEY REFERENCES contests(id) ON DELETE CASCADE,
    registration_count INTEGER NOT NULL DEFAULT 0,
    submission_count INTEGER NOT NULL DEFAULT 0,
    completion_rate DECIMAL(5,2) NOT NULL DEFAULT 0.0,
    avg_score DECIMAL(5,2),
    top_score DECIMAL(5,2),
    last_updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- User stats - Aggregated statistics for users
CREATE TABLE user_stats (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    total_submissions INTEGER NOT NULL DEFAULT 0,
    successful_submissions INTEGER NOT NULL DEFAULT 0,
    success_rate DECIMAL(5,2) NOT NULL DEFAULT 0.0,
    avg_completion_time INTEGER,
    fastest_completion_time INTEGER,
    contests_participated INTEGER NOT NULL DEFAULT 0,
    contests_won INTEGER NOT NULL DEFAULT 0,
    total_points INTEGER NOT NULL DEFAULT 0,
    current_streak INTEGER NOT NULL DEFAULT 0,
    longest_streak INTEGER NOT NULL DEFAULT 0,
    last_updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- =============================================================================
-- INVITATION SYSTEM
-- =============================================================================

-- Contest invite links - Invitation links for private contests
CREATE TABLE contest_invite_links (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    contest_id UUID NOT NULL REFERENCES contests(id) ON DELETE CASCADE,
    token VARCHAR(255) UNIQUE NOT NULL,
    created_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE,
    usage_count INTEGER NOT NULL DEFAULT 0,
    max_usage INTEGER,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    description TEXT
);

-- Challenge invite links - Invitation links for private challenges
CREATE TABLE challenge_invite_links (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    challenge_id UUID NOT NULL REFERENCES challenges(id) ON DELETE CASCADE,
    token VARCHAR(255) UNIQUE NOT NULL,
    created_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE,
    usage_count INTEGER NOT NULL DEFAULT 0,
    max_usage INTEGER,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    description TEXT
);

-- =============================================================================
-- NOTIFICATION SYSTEM
-- =============================================================================

-- Notifications - User notifications
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL,
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    data JSONB, -- Additional notification data
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    is_sent BOOLEAN NOT NULL DEFAULT FALSE,
    sent_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- =============================================================================
-- INDEXES FOR PERFORMANCE
-- =============================================================================

-- User indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_created_at ON users(created_at);

-- Challenge indexes
CREATE INDEX idx_challenges_creator_id ON challenges(creator_id);
CREATE INDEX idx_challenges_status ON challenges(status);
CREATE INDEX idx_challenges_level ON challenges(level);
CREATE INDEX idx_challenges_type ON challenges(type);
CREATE INDEX idx_challenges_visibility ON challenges(visibility);
CREATE INDEX idx_challenges_start_date ON challenges(start_date);
CREATE INDEX idx_challenges_end_date ON challenges(end_date);
CREATE INDEX idx_challenges_invite_token ON challenges(invite_token) WHERE invite_token IS NOT NULL;

-- Contest indexes
CREATE INDEX idx_contests_organization_id ON contests(organization_id);
CREATE INDEX idx_contests_status ON contests(status);
CREATE INDEX idx_contests_start_date ON contests(start_date);
CREATE INDEX idx_contests_end_date ON contests(end_date);
CREATE INDEX idx_contests_invite_token ON contests(invite_token) WHERE invite_token IS NOT NULL;

-- Submission indexes
CREATE INDEX idx_submissions_user_id ON submissions(user_id);
CREATE INDEX idx_submissions_challenge_id ON submissions(challenge_id);
CREATE INDEX idx_submissions_contest_id ON submissions(contest_id);
CREATE INDEX idx_submissions_submitted_at ON submissions(submitted_at);
CREATE INDEX idx_submissions_status ON submissions(status);

-- Contest registration indexes
CREATE INDEX idx_contest_registrations_contest_id ON contest_registrations(contest_id);
CREATE INDEX idx_contest_registrations_user_id ON contest_registrations(user_id);
CREATE INDEX idx_contest_registrations_status ON contest_registrations(status);

-- Performance indexes
CREATE INDEX idx_user_achievements_user_id ON user_achievements(user_id);
CREATE INDEX idx_user_follows_follower_id ON user_follows(follower_id);
CREATE INDEX idx_user_follows_following_id ON user_follows(following_id);
CREATE INDEX idx_notifications_user_id_unread ON notifications(user_id) WHERE is_read = FALSE;

-- =============================================================================
-- TRIGGERS AND FUNCTIONS
-- =============================================================================

-- Function to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_student_profiles_updated_at BEFORE UPDATE ON student_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_organization_profiles_updated_at BEFORE UPDATE ON organization_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_challenges_updated_at BEFORE UPDATE ON challenges
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contests_updated_at BEFORE UPDATE ON contests
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to update challenge statistics
>>>>>>> friend/main
CREATE OR REPLACE FUNCTION update_challenge_stats()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO challenge_stats (
        challenge_id, 
        submission_count, 
        success_count, 
        success_rate,
<<<<<<< HEAD
        avg_completion_time
    )
    SELECT 
        NEW.challenge_id, 
        COUNT(*), 
        SUM(CASE WHEN status = 'correct' THEN 1 ELSE 0 END),
        (SUM(CASE WHEN status = 'correct' THEN 1 ELSE 0 END)::DECIMAL / COUNT(*)) * 100,
        AVG(CASE WHEN status = 'correct' THEN completion_time ELSE NULL END)
    FROM 
        submissions
    WHERE 
        challenge_id = NEW.challenge_id
=======
        avg_completion_time,
        fastest_completion_time,
        slowest_completion_time,
        avg_score,
        participation_count
    )
    SELECT 
        NEW.challenge_id,
        COUNT(*),
        SUM(CASE WHEN status = 'correct' THEN 1 ELSE 0 END),
        CASE 
            WHEN COUNT(*) > 0 THEN 
                (SUM(CASE WHEN status = 'correct' THEN 1 ELSE 0 END)::DECIMAL / COUNT(*)) * 100 
            ELSE 0 
        END,
        AVG(completion_time),
        MIN(completion_time),
        MAX(completion_time),
        AVG(score),
        COUNT(DISTINCT user_id)
    FROM submissions
    WHERE challenge_id = NEW.challenge_id
>>>>>>> friend/main
    ON CONFLICT (challenge_id) 
    DO UPDATE SET
        submission_count = EXCLUDED.submission_count,
        success_count = EXCLUDED.success_count,
        success_rate = EXCLUDED.success_rate,
        avg_completion_time = EXCLUDED.avg_completion_time,
<<<<<<< HEAD
=======
        fastest_completion_time = EXCLUDED.fastest_completion_time,
        slowest_completion_time = EXCLUDED.slowest_completion_time,
        avg_score = EXCLUDED.avg_score,
        participation_count = EXCLUDED.participation_count,
>>>>>>> friend/main
        last_updated = NOW();
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

<<<<<<< HEAD
CREATE TRIGGER update_stats_after_submission
AFTER INSERT OR UPDATE ON submissions
FOR EACH ROW
EXECUTE FUNCTION update_challenge_stats();

-- Update user streak when they complete a challenge
CREATE OR REPLACE FUNCTION update_user_streak()
RETURNS TRIGGER AS $$
DECLARE
    last_submission TIMESTAMP WITH TIME ZONE;
    streak_count INTEGER;
BEGIN
    -- Get last submission time for this user
    SELECT MAX(submitted_at) INTO last_submission
    FROM submissions
    WHERE user_id = NEW.user_id AND id != NEW.id;
    
    -- Get current streak
    SELECT streak INTO streak_count
    FROM student_profiles
    WHERE user_id = NEW.user_id;
    
    -- If this is first submission or last submission was within last 24 hours, increment streak
    IF last_submission IS NULL OR (NEW.submitted_at - last_submission) <= INTERVAL '24 hours' THEN
        UPDATE student_profiles
        SET 
            streak = streak + 1,
            points = points + (
                SELECT points FROM challenges WHERE id = NEW.challenge_id
            ),
            completed_challenges = completed_challenges + 1,
            last_active = NOW()
        WHERE user_id = NEW.user_id;
    -- If more than 24 hours passed, reset streak to 1
    ELSE
        UPDATE student_profiles
        SET 
            streak = 1,
            points = points + (
                SELECT points FROM challenges WHERE id = NEW.challenge_id
            ),
            completed_challenges = completed_challenges + 1,
=======
-- Trigger to update challenge stats after submission
CREATE TRIGGER update_stats_after_submission
    AFTER INSERT OR UPDATE ON submissions
    FOR EACH ROW
    EXECUTE FUNCTION update_challenge_stats();

-- Function to update user stats and streak
CREATE OR REPLACE FUNCTION update_user_stats()
RETURNS TRIGGER AS $$
DECLARE
    last_submission TIMESTAMP WITH TIME ZONE;
    current_streak INTEGER;
    longest_streak INTEGER;
BEGIN
    -- Get current user stats
    SELECT current_streak, longest_streak INTO current_streak, longest_streak
    FROM user_stats
    WHERE user_id = NEW.user_id;
    
    -- If no stats record exists, create one
    IF NOT FOUND THEN
        current_streak := 0;
        longest_streak := 0;
    END IF;
    
    -- Get last successful submission time for this user
    SELECT MAX(submitted_at) INTO last_submission
    FROM submissions
    WHERE user_id = NEW.user_id 
    AND status = 'correct' 
    AND id != NEW.id;
    
    -- Update streak logic
    IF NEW.status = 'correct' THEN
        IF last_submission IS NULL OR (NEW.submitted_at - last_submission) <= INTERVAL '24 hours' THEN
            current_streak := current_streak + 1;
        ELSE
            current_streak := 1;
        END IF;
        
        -- Update longest streak if current is higher
        IF current_streak > longest_streak THEN
            longest_streak := current_streak;
        END IF;
        
        -- Update student profile
        UPDATE student_profiles
        SET 
            streak = current_streak,
            points = points + COALESCE((SELECT points FROM challenges WHERE id = NEW.challenge_id), 0),
            completed_challenges = completed_challenges + 1,
            total_submissions = total_submissions + 1,
>>>>>>> friend/main
            last_active = NOW()
        WHERE user_id = NEW.user_id;
    END IF;
    
<<<<<<< HEAD
=======
    -- Update user stats
    INSERT INTO user_stats (
        user_id,
        total_submissions,
        successful_submissions,
        success_rate,
        avg_completion_time,
        fastest_completion_time,
        current_streak,
        longest_streak,
        total_points
    )
    SELECT 
        NEW.user_id,
        COUNT(*),
        SUM(CASE WHEN status = 'correct' THEN 1 ELSE 0 END),
        CASE 
            WHEN COUNT(*) > 0 THEN 
                (SUM(CASE WHEN status = 'correct' THEN 1 ELSE 0 END)::DECIMAL / COUNT(*)) * 100 
            ELSE 0 
        END,
        AVG(completion_time),
        MIN(completion_time),
        current_streak,
        longest_streak,
        COALESCE((SELECT points FROM student_profiles WHERE user_id = NEW.user_id), 0)
    FROM submissions
    WHERE user_id = NEW.user_id
    ON CONFLICT (user_id)
    DO UPDATE SET
        total_submissions = EXCLUDED.total_submissions,
        successful_submissions = EXCLUDED.successful_submissions,
        success_rate = EXCLUDED.success_rate,
        avg_completion_time = EXCLUDED.avg_completion_time,
        fastest_completion_time = EXCLUDED.fastest_completion_time,
        current_streak = EXCLUDED.current_streak,
        longest_streak = EXCLUDED.longest_streak,
        total_points = EXCLUDED.total_points,
        last_updated = NOW();
    
>>>>>>> friend/main
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

<<<<<<< HEAD
CREATE TRIGGER update_streak_after_submission
AFTER INSERT ON submissions
FOR EACH ROW
WHEN (NEW.status = 'correct')
EXECUTE FUNCTION update_user_streak();

-- Increment contest counter for organization
=======
-- Trigger to update user stats after submission
CREATE TRIGGER update_user_stats_after_submission
    AFTER INSERT OR UPDATE ON submissions
    FOR EACH ROW
    EXECUTE FUNCTION update_user_stats();

-- Function to increment contest counter for organizations
>>>>>>> friend/main
CREATE OR REPLACE FUNCTION update_contests_created()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE organization_profiles
    SET contests_created = contests_created + 1
    WHERE user_id = NEW.organization_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

<<<<<<< HEAD
CREATE TRIGGER increment_contests_counter
AFTER INSERT ON contests
FOR EACH ROW
EXECUTE FUNCTION update_contests_created();

-- Create indexes for performance
CREATE INDEX idx_submissions_user_id ON submissions(user_id);
CREATE INDEX idx_submissions_challenge_id ON submissions(challenge_id);
CREATE INDEX idx_submissions_contest_id ON submissions(contest_id);
CREATE INDEX idx_challenges_status ON challenges(status);
CREATE INDEX idx_challenges_level ON challenges(level);
CREATE INDEX idx_contests_status ON contests(status);
CREATE INDEX idx_contest_registrations_user_id ON contest_registrations(user_id);
=======
-- Trigger to increment contest counter
CREATE TRIGGER increment_contests_counter
    AFTER INSERT ON contests
    FOR EACH ROW
    EXECUTE FUNCTION update_contests_created();

-- Function to increment challenge counter for organizations
CREATE OR REPLACE FUNCTION update_challenges_created()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE organization_profiles
    SET challenges_created = challenges_created + 1
    WHERE user_id = NEW.creator_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to increment challenge counter
CREATE TRIGGER increment_challenges_counter
    AFTER INSERT ON challenges
    FOR EACH ROW
    EXECUTE FUNCTION update_challenges_created();

-- =============================================================================
-- VIEWS FOR ANALYTICS
-- =============================================================================

-- View for challenge statistics with additional metrics
CREATE OR REPLACE VIEW v_challenge_analytics AS
SELECT 
    c.id AS challenge_id,
    c.title,
    c.level,
    c.type,
    c.visibility,
    c.points,
    c.creator_id,
    o.name AS creator_name,
    cs.submission_count,
    cs.success_count,
    cs.success_rate,
    cs.avg_completion_time,
    cs.fastest_completion_time,
    cs.avg_score,
    cs.participation_count,
    c.created_at,
    c.start_date,
    c.end_date
FROM challenges c
LEFT JOIN challenge_stats cs ON c.id = cs.challenge_id
LEFT JOIN organization_profiles o ON c.creator_id = o.user_id;

-- View for contest analytics
CREATE OR REPLACE VIEW v_contest_analytics AS
SELECT 
    co.id AS contest_id,
    co.title,
    co.status,
    co.visibility,
    co.organization_id,
    o.name AS organization_name,
    COUNT(DISTINCT cr.user_id) AS registration_count,
    COUNT(DISTINCT s.user_id) AS submission_count,
    COUNT(DISTINCT cc.challenge_id) AS challenge_count,
    AVG(s.score) AS avg_score,
    MAX(s.score) AS top_score,
    co.start_date,
    co.end_date,
    co.created_at
FROM contests co
LEFT JOIN organization_profiles o ON co.organization_id = o.user_id
LEFT JOIN contest_registrations cr ON co.id = cr.contest_id
LEFT JOIN contest_challenges cc ON co.id = cc.contest_id
LEFT JOIN submissions s ON cc.challenge_id = s.challenge_id AND s.contest_id = co.id
GROUP BY co.id, co.title, co.status, co.visibility, co.organization_id, o.name, 
         co.start_date, co.end_date, co.created_at;

-- View for user leaderboard
CREATE OR REPLACE VIEW v_user_leaderboard AS
SELECT 
    u.id AS user_id,
    u.username,
    u.avatar_url,
    sp.full_name,
    sp.points,
    sp.streak,
    sp.level,
    sp.completed_challenges,
    us.success_rate,
    us.avg_completion_time,
    us.contests_participated,
    us.contests_won,
    COUNT(ua.id) AS total_achievements,
    ROW_NUMBER() OVER (ORDER BY sp.points DESC) AS rank
FROM users u
JOIN student_profiles sp ON u.id = sp.user_id
LEFT JOIN user_stats us ON u.id = us.user_id
LEFT JOIN user_achievements ua ON u.id = ua.user_id
WHERE u.role = 'student' AND u.is_active = TRUE
GROUP BY u.id, u.username, u.avatar_url, sp.full_name, sp.points, 
         sp.streak, sp.level, sp.completed_challenges, us.success_rate,
         us.avg_completion_time, us.contests_participated, us.contests_won
ORDER BY sp.points DESC;

-- View for organization dashboard
CREATE OR REPLACE VIEW v_organization_dashboard AS
SELECT 
    u.id AS organization_id,
    u.username,
    op.name,
    op.contests_created,
    op.challenges_created,
    COUNT(DISTINCT co.id) AS active_contests,
    COUNT(DISTINCT ch.id) AS published_challenges,
    SUM(cs.submission_count) AS total_submissions,
    SUM(cs.participation_count) AS total_participants
FROM users u
JOIN organization_profiles op ON u.id = op.user_id
LEFT JOIN contests co ON u.id = co.organization_id AND co.status = 'active'
LEFT JOIN challenges ch ON u.id = ch.creator_id AND ch.status = 'published'
LEFT JOIN challenge_stats cs ON ch.id = cs.challenge_id
WHERE u.role = 'organization' AND u.is_active = TRUE
GROUP BY u.id, u.username, op.name, op.contests_created, op.challenges_created;

-- =============================================================================
-- SAMPLE DATA INSERTION
-- =============================================================================

-- Insert sample achievements
INSERT INTO achievements (title, description, icon_url, category, type, points) VALUES
('First Steps', 'Complete your first challenge', '/icons/first-steps.svg', 'milestone', 'milestone', 50),
('Speed Demon', 'Complete a challenge in under 5 minutes', '/icons/speed.svg', 'performance', 'skill', 100),
('Perfectionist', 'Achieve 100% accuracy on 5 challenges', '/icons/perfect.svg', 'accuracy', 'skill', 200),
('Contest Winner', 'Win first place in a contest', '/icons/trophy.svg', 'competition', 'winner', 500),
('Streak Master', 'Maintain a 30-day streak', '/icons/streak.svg', 'consistency', 'milestone', 300);

-- Insert sample admin user
INSERT INTO users (username, email, password_hash, role, is_verified) VALUES
('admin', 'admin@cadarena.com', '$2b$10$hashedpassword', 'admin', TRUE);

-- =============================================================================
-- SECURITY POLICIES (RLS)
-- =============================================================================

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE organization_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE contests ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE contest_registrations ENABLE ROW LEVEL SECURITY;

-- Users can view their own data
CREATE POLICY "Users can view own data" ON users
    FOR SELECT USING (auth.uid() = id);

-- Users can update their own data
CREATE POLICY "Users can update own data" ON users
    FOR UPDATE USING (auth.uid() = id);

-- Students can view their own profile
CREATE POLICY "Students can view own profile" ON student_profiles
    FOR ALL USING (auth.uid() = user_id);

-- Organizations can view their own profile
CREATE POLICY "Organizations can view own profile" ON organization_profiles
    FOR ALL USING (auth.uid() = user_id);

-- Public challenges are visible to everyone
CREATE POLICY "Public challenges visible to all" ON challenges
    FOR SELECT USING (visibility = 'public' AND status = 'published');

-- Private challenges visible to registered participants
CREATE POLICY "Private challenges visible to participants" ON challenges
    FOR SELECT USING (
        visibility = 'private' AND 
        EXISTS (
            SELECT 1 FROM contest_participants cp 
            WHERE cp.challenge_id = id AND cp.user_id = auth.uid()
        )
    );

-- Organizations can manage their own challenges
CREATE POLICY "Organizations can manage own challenges" ON challenges
    FOR ALL USING (auth.uid() = creator_id);

-- Users can view their own submissions
CREATE POLICY "Users can view own submissions" ON submissions
    FOR SELECT USING (auth.uid() = user_id);

-- Users can create submissions
CREATE POLICY "Users can create submissions" ON submissions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- =============================================================================
-- PERFORMANCE OPTIMIZATION
-- =============================================================================

-- Partitioning for large tables (submissions by date)
-- This would be implemented for very large datasets
-- CREATE TABLE submissions_y2023m01 PARTITION OF submissions
-- FOR VALUES FROM ('2023-01-01') TO ('2023-02-01');

-- Materialized views for heavy analytics (refresh periodically)
CREATE MATERIALIZED VIEW mv_daily_stats AS
SELECT 
    DATE(submitted_at) as submission_date,
    COUNT(*) as total_submissions,
    COUNT(DISTINCT user_id) as unique_users,
    AVG(completion_time) as avg_completion_time,
    COUNT(*) FILTER (WHERE status = 'correct') as successful_submissions
FROM submissions
GROUP BY DATE(submitted_at)
ORDER BY submission_date DESC;

-- Create index on materialized view
CREATE INDEX idx_mv_daily_stats_date ON mv_daily_stats(submission_date);

-- Refresh function for materialized views
CREATE OR REPLACE FUNCTION refresh_materialized_views()
RETURNS void AS $$
BEGIN
    REFRESH MATERIALIZED VIEW CONCURRENTLY mv_daily_stats;
END;
$$ LANGUAGE plpgsql;

-- =============================================================================
-- END OF SCHEMA
-- =============================================================================
>>>>>>> friend/main
