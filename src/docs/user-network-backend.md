# User Network System - Backend Documentation

This document covers the technical details of implementing the backend services for the user search and follow/unfollow functionality in CAD Arena.

## Database Schema

The user network system primarily relies on the following tables in our database:

### Users Table
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('student', 'organization')),
    avatar_url VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);
```

### Followers Table
```sql
CREATE TABLE followers (
    follower_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    following_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    PRIMARY KEY (follower_id, following_id)
);
```

### Indexes for Performance
```sql
CREATE INDEX idx_followers_follower_id ON followers(follower_id);
CREATE INDEX idx_followers_following_id ON followers(following_id);
```

## API Endpoints

### User Search

#### GET `/api/users/search`
Search for users by username, name, or other profile attributes.

**Query Parameters:**
- `query` (string): The search term
- `role` (optional, string): Filter by role (student/organization)
- `limit` (optional, number): Limit results (default: 20)
- `offset` (optional, number): Pagination offset

**Response:**
```json
{
  "users": [
    {
      "id": "uuid",
      "username": "username",
      "role": "student|organization",
      "avatarUrl": "url",
      "isFollowed": true|false,
      // Role-specific fields
      "name": "Organization Name", // For organizations
      "level": 5, // For students
      // other user fields...
    }
  ],
  "total": 100
}
```

### Follow/Unfollow

#### POST `/api/users/:id/follow`
Follow a user.

**Authentication: Required**

**Response:**
```json
{
  "success": true,
  "message": "Now following user"
}
```

#### DELETE `/api/users/:id/follow`
Unfollow a user.

**Authentication: Required**

**Response:**
```json
{
  "success": true,
  "message": "Unfollowed user"
}
```

### Followers/Following Lists

#### GET `/api/users/:id/followers`
Get the list of users who follow the specified user.

**Query Parameters:**
- `limit` (optional, number): Limit results
- `offset` (optional, number): Pagination offset

**Response:**
```json
{
  "followers": [
    {
      "id": "uuid",
      "username": "username",
      "role": "student|organization",
      "avatarUrl": "url",
      "isFollowed": true|false,
      // other user fields...
    }
  ],
  "total": 100
}
```

#### GET `/api/users/:id/following`
Get the list of users whom the specified user follows.

**Query Parameters:**
- `limit` (optional, number): Limit results
- `offset` (optional, number): Pagination offset

**Response:**
```json
{
  "following": [
    {
      "id": "uuid",
      "username": "username",
      "role": "student|organization",
      "avatarUrl": "url",
      "isFollowed": true|false,
      // other user fields...
    }
  ],
  "total": 100
}
```

## Implementation Details

### Authentication Middleware

All endpoints that require authentication should use middleware that verifies the user's JWT token and attaches the user's ID to the request object.

```typescript
// Example authentication middleware
const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
```

### Error Handling

Implement consistent error handling for common scenarios:

```typescript
// Common error responses
const handleError = (res, error) => {
  console.error(error);
  
  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  }
  
  if (error.name === 'UnauthorizedError') {
    return res.status(401).json({ error: 'Unauthorized access' });
  }
  
  return res.status(500).json({ error: 'Server error' });
};
```

### Rate Limiting

Implement rate limiting to prevent abuse of the search and follow/unfollow APIs:

```typescript
import rateLimit from 'express-rate-limit';

const searchLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 20, // 20 requests per minute
  message: { error: 'Too many search requests, please try again later' }
});

app.use('/api/users/search', searchLimiter);
```

### Optimizing Search Performance

For large user databases, implement:

1. Full-text search indexes on relevant fields
2. Caching of common searches
3. Asynchronous loading of follow status for search results

## Example Implementation - Search API

```typescript
// Example search implementation (Express.js with PostgreSQL)
app.get('/api/users/search', authenticateUser, async (req, res) => {
  try {
    const { query, role, limit = 20, offset = 0 } = req.query;
    const currentUserId = req.userId;
    
    // Base query
    let sqlQuery = `
      SELECT u.id, u.username, u.role, u.avatar_url,
        CASE u.role
          WHEN 'student' THEN sp.level
          WHEN 'organization' THEN op.name
        END AS role_specific_data,
        EXISTS(
          SELECT 1 FROM followers WHERE follower_id = $1 AND following_id = u.id
        ) AS is_followed
      FROM users u
      LEFT JOIN student_profiles sp ON u.id = sp.user_id AND u.role = 'student'
      LEFT JOIN organization_profiles op ON u.id = op.user_id AND u.role = 'organization'
      WHERE (u.username ILIKE $2 OR 
            (u.role = 'organization' AND op.name ILIKE $2) OR
            (u.role = 'student' AND sp.full_name ILIKE $2))
    `;
    
    const params = [currentUserId, `%${query}%`];
    
    // Apply role filter if provided
    if (role) {
      sqlQuery += ` AND u.role = $${params.length + 1}`;
      params.push(role);
    }
    
    // Add pagination
    sqlQuery += ` ORDER BY u.username LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(limit, offset);
    
    // Execute query
    const { rows } = await db.query(sqlQuery, params);
    
    // Get total count
    const countQuery = `
      SELECT COUNT(*) 
      FROM users u
      LEFT JOIN student_profiles sp ON u.id = sp.user_id AND u.role = 'student'
      LEFT JOIN organization_profiles op ON u.id = op.user_id AND u.role = 'organization'
      WHERE (u.username ILIKE $1 OR 
            (u.role = 'organization' AND op.name ILIKE $1) OR
            (u.role = 'student' AND sp.full_name ILIKE $1))
      ${role ? ' AND u.role = $2' : ''}
    `;
    
    const countParams = [`%${query}%`];
    if (role) countParams.push(role);
    
    const totalResult = await db.query(countQuery, countParams);
    const total = parseInt(totalResult.rows[0].count);
    
    return res.json({
      users: rows,
      total
    });
    
  } catch (error) {
    return handleError(res, error);
  }
});
```

## Websocket Integration (Optional)

For real-time notifications when someone follows a user:

```typescript
// Example using Socket.IO
io.on('connection', (socket) => {
  // Authenticate socket connection
  const token = socket.handshake.auth.token;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;
    
    // Join user's room for notifications
    socket.join(`user:${userId}`);
    
    // Other socket event handlers...
  } catch (error) {
    socket.disconnect(true);
  }
});

// Emit notification when a user follows another
const notifyNewFollower = (followerId, followingId) => {
  // Get follower details
  const follower = await getUserById(followerId);
  
  // Emit to the followed user's room
  io.to(`user:${followingId}`).emit('new_follower', {
    id: follower.id,
    username: follower.username,
    avatarUrl: follower.avatarUrl
  });
};
```

## Security Considerations

1. **SQL Injection Prevention**: Always use parameterized queries
2. **XSS Protection**: Sanitize all user inputs
3. **CSRF Protection**: Implement CSRF tokens for POST/DELETE requests
4. **Rate Limiting**: Prevent brute force and DoS attacks
5. **Data Validation**: Validate all input data before processing

## Deployment Recommendations

1. Use connection pooling for database connections
2. Implement caching for frequent searches and profile data
3. Consider using a CDN for avatar images
4. Set up proper logging and monitoring for API endpoints
5. Implement database read replicas for scaling read operations

This backend implementation provides a solid foundation for the user search and follow system in CAD Arena, with considerations for performance, security, and scalability.
