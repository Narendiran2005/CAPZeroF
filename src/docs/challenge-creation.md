
# Challenge Creation Process

## Overview

Organizations can create CAD challenges for students to practice their skills or as part of competitions. The challenge creation process involves a user-friendly form interface and secure database storage.

## User Interface Flow

1. Organizations access the challenge creation form from their dashboard
2. They fill in all required information:
   - Challenge title and description
   - Detailed instructions
   - Difficulty level
   - Points awarded for completion
   - Expected completion time
   - Reference materials (optional)
   - Quiz questions (optional)
3. Preview the challenge before publishing
4. Publish the challenge or save as draft

## Database Interaction

### Database Tables Involved

The challenge creation process interacts with the following tables:

- `challenges`: Stores core challenge information
- `reference_materials`: Stores supporting materials for challenges
- `quiz_questions`: Stores knowledge check questions
- `challenge_stats`: Tracks challenge statistics

### Data Flow

1. When a new challenge is created:

```sql
-- Insert into challenges table
INSERT INTO challenges (
    title, 
    description, 
    instructions, 
    level, 
    points, 
    thumbnail_url, 
    status, 
    creator_id, 
    created_at, 
    updated_at,
    expected_completion_time
) VALUES (
    'Challenge Title', 
    'Challenge Description', 
    'Challenge Instructions', 
    'intermediate', 
    200, 
    '/path/to/thumbnail.jpg', 
    'published', 
    'creator-uuid', 
    NOW(), 
    NOW(),
    900
) RETURNING id;
```

2. For each reference material:

```sql
-- Insert into reference_materials table
INSERT INTO reference_materials (
    challenge_id, 
    type, 
    title, 
    description, 
    url, 
    created_at,
    display_order
) VALUES (
    'challenge-uuid', 
    'image', 
    'Reference Image', 
    'Description of the image', 
    '/path/to/reference.jpg', 
    NOW(),
    1
);
```

3. For each quiz question:

```sql
-- Insert into quiz_questions table
INSERT INTO quiz_questions (
    challenge_id, 
    question, 
    options, 
    correct_answer, 
    created_at,
    display_order
) VALUES (
    'challenge-uuid', 
    'What is the correct approach to...?', 
    '["Option A", "Option B", "Option C", "Option D"]'::jsonb, 
    2, 
    NOW(),
    1
);
```

4. Initialize the challenge statistics:

```sql
-- Insert into challenge_stats table
INSERT INTO challenge_stats (
    challenge_id, 
    submission_count, 
    success_count, 
    success_rate, 
    avg_completion_time,
    last_updated
) VALUES (
    'challenge-uuid', 
    0, 
    0, 
    0.0, 
    NULL,
    NOW()
);
```

### Security Considerations

- The `creator_id` field links the challenge to the organization that created it
- Only authenticated organizations can create challenges
- Role-based access control ensures only organizations (not students) can create challenges
- The `status` field allows organizations to control the visibility of the challenge

### Retrieving Challenges

Challenges can be retrieved using SQL queries like:

```sql
-- Get all published challenges
SELECT 
    c.*,
    cs.submission_count,
    cs.success_rate,
    cs.avg_completion_time
FROM 
    challenges c
JOIN 
    challenge_stats cs ON c.id = cs.challenge_id
WHERE 
    c.status = 'published'
ORDER BY 
    c.created_at DESC;

-- Get challenges by creator
SELECT 
    c.*,
    cs.submission_count,
    cs.success_rate,
    cs.avg_completion_time
FROM 
    challenges c
JOIN 
    challenge_stats cs ON c.id = cs.challenge_id
WHERE 
    c.creator_id = 'organization-uuid'
ORDER BY 
    c.created_at DESC;
```

## API Endpoints

In a full implementation, the following API endpoints would be required:

### Create Challenge
- **Endpoint**: `POST /api/challenges`
- **Auth**: Required (Organization role only)
- **Request Body**: Challenge details
- **Response**: Created challenge with ID

### Update Challenge
- **Endpoint**: `PUT /api/challenges/:id`
- **Auth**: Required (Challenge creator only)
- **Request Body**: Updated challenge details
- **Response**: Updated challenge

### Get Challenge
- **Endpoint**: `GET /api/challenges/:id`
- **Auth**: Optional (Public if published)
- **Response**: Challenge details

### List Challenges
- **Endpoint**: `GET /api/challenges`
- **Auth**: Optional (Public if published)
- **Query Params**: Filters for level, creator, etc.
- **Response**: List of challenges

### Delete Challenge
- **Endpoint**: `DELETE /api/challenges/:id`
- **Auth**: Required (Challenge creator only)
- **Response**: Success confirmation

## Challenge Access Control

Organizations can control who can access their challenges:

1. **Public**: Available to all registered users
2. **Organization Only**: Available only to members of the organization
3. **Specific Groups**: Available to defined access groups
4. **Competition**: Available only to participants of a specific competition

The access control is implemented using the following SQL structure:

```sql
CREATE TABLE challenge_access (
    challenge_id UUID REFERENCES challenges(id) ON DELETE CASCADE,
    access_type VARCHAR(20) NOT NULL CHECK (access_type IN ('public', 'organization', 'group', 'competition')),
    target_id UUID,
    PRIMARY KEY (challenge_id, access_type, target_id)
);
```

## Performance and Scalability

- Challenge metadata is stored in the main database
- Large files (reference materials) are stored in object storage
- Thumbnails are optimized for quick loading
- Statistics are pre-calculated and updated via triggers
- Caching is used for popular challenges
