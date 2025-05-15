
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
CREATE TABLE student_profiles (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    full_name VARCHAR(100),
    bio TEXT,
    points INTEGER NOT NULL DEFAULT 0,
    streak INTEGER NOT NULL DEFAULT 0,
    level INTEGER NOT NULL DEFAULT 1,
    completed_challenges INTEGER NOT NULL DEFAULT 0,
    last_active TIMESTAMP WITH TIME ZONE
);

-- Organization profiles - Extended information for organization users
CREATE TABLE organization_profiles (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    website VARCHAR(255),
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
);

-- Reference materials - Supporting materials for challenges
CREATE TABLE reference_materials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    challenge_id UUID NOT NULL REFERENCES challenges(id) ON DELETE CASCADE,
    type VARCHAR(20) NOT NULL CHECK (type IN ('image', 'document', 'video', 'link')),
    title VARCHAR(100) NOT NULL,
    description TEXT,
    url VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    display_order INTEGER NOT NULL DEFAULT 0
);

-- Quiz questions - Knowledge check questions for challenges
CREATE TABLE quiz_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    challenge_id UUID NOT NULL REFERENCES challenges(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    options JSONB NOT NULL, -- Array of options as JSON
    correct_answer INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    display_order INTEGER NOT NULL DEFAULT 0
);

-- Contests - Competitions created by organizations
CREATE TABLE contests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    organization_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE NOT NULL,
    registration_deadline TIMESTAMP WITH TIME ZONE,
    status VARCHAR(20) NOT NULL CHECK (status IN ('upcoming', 'active', 'completed', 'canceled')),
    is_public BOOLEAN NOT NULL DEFAULT TRUE,
    registration_type VARCHAR(20) NOT NULL CHECK (registration_type IN ('open', 'invitation', 'approval')),
    max_participants INTEGER,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Contest challenges - Maps challenges to contests
CREATE TABLE contest_challenges (
    contest_id UUID NOT NULL REFERENCES contests(id) ON DELETE CASCADE,
    challenge_id UUID NOT NULL REFERENCES challenges(id) ON DELETE CASCADE,
    display_order INTEGER NOT NULL DEFAULT 0,
    weight DECIMAL(5,2) NOT NULL DEFAULT 1.0, -- Weight for scoring
    PRIMARY KEY (contest_id, challenge_id)
);

-- Contest prizes - Prizes offered for contests
CREATE TABLE contest_prizes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contest_id UUID NOT NULL REFERENCES contests(id) ON DELETE CASCADE,
    rank INTEGER NOT NULL,
    description TEXT NOT NULL,
    value DECIMAL(10,2),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Contest registrations - Users registered for contests
CREATE TABLE contest_registrations (
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
    additional_files JSONB, -- URLs to any additional files
    notes TEXT,
    submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    completion_time INTEGER NOT NULL, -- Time taken in seconds
    status VARCHAR(20) NOT NULL CHECK (status IN ('pending', 'correct', 'incorrect')),
    score DECIMAL(5,2),
    feedback TEXT,
    is_featured BOOLEAN NOT NULL DEFAULT FALSE
);

-- Quiz answers - User answers to quiz questions
CREATE TABLE quiz_answers (
    submission_id UUID NOT NULL REFERENCES submissions(id) ON DELETE CASCADE,
    question_id UUID NOT NULL REFERENCES quiz_questions(id) ON DELETE CASCADE,
    answer INTEGER NOT NULL,
    is_correct BOOLEAN NOT NULL,
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
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- User achievements - Achievements earned by users
CREATE TABLE user_achievements (
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    achievement_id UUID NOT NULL REFERENCES achievements(id) ON DELETE CASCADE,
    earned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    PRIMARY KEY (user_id, achievement_id)
);

-- Certificates - Certificates issued to users
CREATE TABLE certificates (
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
);

-- User experience - Work/education experience of users
CREATE TABLE user_experiences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(100) NOT NULL,
    organization VARCHAR(100) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    is_current BOOLEAN NOT NULL DEFAULT FALSE,
    description TEXT,
    type VARCHAR(20) CHECK (type IN ('work', 'education', 'project')),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Challenge stats - Aggregated statistics for challenges
CREATE TABLE challenge_stats (
    challenge_id UUID PRIMARY KEY REFERENCES challenges(id) ON DELETE CASCADE,
    submission_count INTEGER NOT NULL DEFAULT 0,
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
CREATE OR REPLACE FUNCTION update_challenge_stats()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO challenge_stats (
        challenge_id, 
        submission_count, 
        success_count, 
        success_rate,
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
    ON CONFLICT (challenge_id) 
    DO UPDATE SET
        submission_count = EXCLUDED.submission_count,
        success_count = EXCLUDED.success_count,
        success_rate = EXCLUDED.success_rate,
        avg_completion_time = EXCLUDED.avg_completion_time,
        last_updated = NOW();
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

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
            last_active = NOW()
        WHERE user_id = NEW.user_id;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_streak_after_submission
AFTER INSERT ON submissions
FOR EACH ROW
WHEN (NEW.status = 'correct')
EXECUTE FUNCTION update_user_streak();

-- Increment contest counter for organization
CREATE OR REPLACE FUNCTION update_contests_created()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE organization_profiles
    SET contests_created = contests_created + 1
    WHERE user_id = NEW.organization_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

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
