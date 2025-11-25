# Task 3 — AI-Assisted System Design (20 points)

**Student:** Mr. Athichon Kaewla
**Student ID:** 66315030406
**Course:** 1305308 Platform Development
**Project:** Recipe Sharing Platform with Ratings

---

## 1. Exact Prompts Used

### Prompt 1: Tech Stack Recommendation

```
I'm building a Recipe Sharing Platform where users can:
- Browse and search recipes
- Create, edit, and delete their own recipes
- Rate and comment on recipes (1-5 stars)
- View recipes with average ratings

The project must be:
- Implementable as an MVP within 1-3 hours
- Include user authentication
- Support at least 2 user roles (user, admin)
- Handle personal data (PDPA compliant)
- Be a web-based platform

Please recommend:
1. A complete tech stack (frontend, backend, database)
2. Why each technology is suitable for this project
3. Any important libraries or tools I should use
4. Consider ease of development, performance, and learning curve
```

---

### Prompt 2: Database Schema Design

```
Design a database schema for a Recipe Sharing Platform with these requirements:

Entities:
1. Users - Store user accounts with authentication
2. Recipes - Store recipe information (title, ingredients, instructions, images)
3. Ratings - Store user ratings and comments for recipes

Requirements:
- Users can create multiple recipes
- Users can rate multiple recipes (but only once per recipe)
- Users cannot rate their own recipes
- Need to calculate average rating per recipe
- Track created_at timestamps
- Support soft deletes (optional)

Please provide:
1. Table schemas with all columns and data types
2. Primary keys and foreign keys
3. Indexes for performance
4. Any constraints (UNIQUE, CHECK, etc.)
5. Relationships between tables (1-to-many, many-to-many)

Use SQL-compatible syntax (SQLite preferred).
```

---

### Prompt 3: API Endpoint Design

```
Design RESTful API endpoints for a Recipe Sharing Platform with authentication.

Features needed:
1. User authentication (register, login)
2. Recipe CRUD operations (Create, Read, Update, Delete)
3. Rating system (add rating, view ratings)
4. Search recipes by title or ingredients
5. Get user's own recipes

Requirements:
- Follow REST conventions
- Specify HTTP methods (GET, POST, PUT, DELETE)
- Indicate which endpoints require authentication
- Include example request and response formats
- Consider pagination for list endpoints

Please provide:
1. Complete list of endpoints with HTTP methods
2. URL patterns
3. Authentication requirements
4. Request body examples (JSON)
5. Response examples (JSON)

Focus on the 3-5 most important endpoints for an MVP.
```

---

## 2. AI-Generated Output

### A. Recommended Tech Stack

#### **AI Response:**

**Frontend:**
- **React.js** (v18+) with Vite
  - **Why:** Component-based architecture, large ecosystem, fast development
  - **Benefits:** Reusable components, virtual DOM for performance, huge community support
  - **Learning Curve:** Moderate, but excellent documentation available

- **Tailwind CSS**
  - **Why:** Utility-first CSS framework, rapid UI development
  - **Benefits:** No need to write custom CSS, responsive by default, small bundle size
  - **Alternative:** Bootstrap or Material-UI for pre-built components

- **React Router** (v6)
  - **Why:** Client-side routing for single-page application
  - **Benefits:** Dynamic routing, nested routes, easy navigation

- **Axios**
  - **Why:** HTTP client for API calls
  - **Benefits:** Interceptors for auth tokens, better error handling than fetch

---

**Backend:**
- **Node.js** (v18+ LTS) with Express.js (v4)
  - **Why:** JavaScript on both frontend and backend, non-blocking I/O, massive npm ecosystem
  - **Benefits:** Fast development, lightweight, perfect for REST APIs
  - **Performance:** Handles thousands of concurrent requests efficiently

- **Express.js**
  - **Why:** Minimalist web framework, unopinionated, flexible
  - **Benefits:** Middleware system, easy routing, huge plugin ecosystem
  - **Learning Curve:** Easy, straightforward

---

**Database:**
- **SQLite3**
  - **Why:** File-based, zero-configuration, perfect for MVP and development
  - **Benefits:** No separate database server needed, portable, ACID compliant
  - **Suitable for:** Up to 100K+ records, small to medium traffic
  - **Migration Path:** Easy to migrate to PostgreSQL if needed

- **Alternative:** PostgreSQL for production scale (supports 1M+ records, concurrent writes)

---

**Authentication:**
- **jsonwebtoken (JWT)**
  - **Why:** Stateless authentication, works well with REST APIs
  - **Benefits:** No server-side session storage, scalable, includes expiration

- **bcryptjs**
  - **Why:** Industry-standard password hashing
  - **Benefits:** Slow hashing (prevents brute force), salted automatically

---

**Validation:**
- **express-validator**
  - **Why:** Server-side input validation and sanitization
  - **Benefits:** Prevents injection attacks, data integrity, clear error messages

---

**Additional Tools:**
- **dotenv**: Environment variable management
- **cors**: Enable Cross-Origin Resource Sharing
- **Postman**: API testing
- **Git**: Version control
- **ESLint + Prettier**: Code quality and formatting

---

**Why This Stack is Ideal for Your Project:**

1. **Single Language:** JavaScript/TypeScript everywhere (fullstack developer friendly)
2. **Fast MVP Development:** All tools have quick setup and boilerplate
3. **Low Resource Requirements:** SQLite doesn't need a separate server
4. **Free and Open Source:** No licensing costs
5. **Great Documentation:** All technologies have excellent tutorials and communities
6. **Scalability Path:** Easy to upgrade (SQLite → PostgreSQL, add Redis cache, etc.)
7. **Industry Standard:** Skills are transferable and valuable in job market

---

### B. Database Schema (3-5 Main Tables)

#### **AI Response:**

```sql
-- ============================================
-- USERS TABLE
-- ============================================
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT DEFAULT 'user' CHECK(role IN ('user', 'admin')),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- ============================================
-- RECIPES TABLE
-- ============================================
CREATE TABLE recipes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  ingredients TEXT NOT NULL,
  instructions TEXT NOT NULL,
  image_url TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Indexes for performance
CREATE INDEX idx_recipes_user_id ON recipes(user_id);
CREATE INDEX idx_recipes_title ON recipes(title);
CREATE INDEX idx_recipes_created_at ON recipes(created_at DESC);

-- ============================================
-- RATINGS TABLE
-- ============================================
CREATE TABLE ratings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  recipe_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,

  -- Prevent users from rating the same recipe multiple times
  UNIQUE(recipe_id, user_id)
);

-- Indexes for performance
CREATE INDEX idx_ratings_recipe_id ON ratings(recipe_id);
CREATE INDEX idx_ratings_user_id ON ratings(user_id);
CREATE INDEX idx_ratings_created_at ON ratings(created_at DESC);

-- ============================================
-- USEFUL QUERIES
-- ============================================

-- Get recipe with average rating
SELECT
  r.*,
  u.name as author_name,
  COALESCE(AVG(rt.rating), 0) as average_rating,
  COUNT(rt.id) as rating_count
FROM recipes r
LEFT JOIN users u ON r.user_id = u.id
LEFT JOIN ratings rt ON r.id = rt.recipe_id
GROUP BY r.id;

-- Get user's recipes with ratings
SELECT
  r.*,
  COALESCE(AVG(rt.rating), 0) as average_rating,
  COUNT(rt.id) as rating_count
FROM recipes r
LEFT JOIN ratings rt ON r.id = rt.recipe_id
WHERE r.user_id = ?
GROUP BY r.id;

-- Check if user already rated a recipe
SELECT id FROM ratings
WHERE recipe_id = ? AND user_id = ?;
```

---

**Schema Relationships:**

```
users (1) ────────< (many) recipes
  │                    │
  │                    │
  └───< (many) ratings >───┘
```

- **One-to-Many:** One user can create many recipes
- **One-to-Many:** One user can create many ratings
- **One-to-Many:** One recipe can have many ratings
- **Constraint:** One user can rate one recipe only once (UNIQUE constraint)

---

**Key Design Decisions:**

1. **Cascading Deletes:** When a user is deleted, their recipes and ratings are also deleted (data cleanup)
2. **UNIQUE Constraint:** Prevents duplicate ratings from the same user on the same recipe
3. **CHECK Constraint:** Enforces rating values between 1-5 at database level
4. **Indexes:** Speed up common queries (search by email, find user's recipes, get recipe ratings)
5. **TEXT Fields:** SQLite uses TEXT for strings (no VARCHAR)
6. **Timestamps:** DATETIME fields track when records were created/updated
7. **Foreign Keys:** Enforce referential integrity (can't have orphaned records)

---

### C. 3 Key API Endpoints

#### **AI Response:**

#### **Endpoint 1: User Authentication (Register)**

```http
POST /api/auth/register
```

**Authentication Required:** No (Public)

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (201 Created):**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "created_at": "2025-11-24T10:30:00Z"
  }
}
```

**Error Response (409 Conflict):**
```json
{
  "error": "Email already registered"
}
```

**Implementation Notes:**
- Hash password with bcrypt before storing
- Generate JWT token with 7-day expiration
- Validate email format
- Check for existing email before registration

---

#### **Endpoint 2: Create Recipe**

```http
POST /api/recipes
```

**Authentication Required:** Yes (JWT Token in Authorization header)

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Spaghetti Carbonara",
  "ingredients": "400g spaghetti\n200g pancetta\n4 eggs\n100g Parmesan cheese\nBlack pepper\nSalt",
  "instructions": "1. Boil pasta in salted water\n2. Fry pancetta until crispy\n3. Beat eggs with Parmesan\n4. Drain pasta, mix with pancetta\n5. Remove from heat, add egg mixture\n6. Stir quickly to create creamy sauce\n7. Season with black pepper",
  "image_url": "https://example.com/carbonara.jpg"
}
```

**Response (201 Created):**
```json
{
  "message": "Recipe created successfully",
  "recipe": {
    "id": 15,
    "user_id": 1,
    "title": "Spaghetti Carbonara",
    "ingredients": "400g spaghetti\n200g pancetta...",
    "instructions": "1. Boil pasta...",
    "image_url": "https://example.com/carbonara.jpg",
    "created_at": "2025-11-24T11:00:00Z",
    "updated_at": "2025-11-24T11:00:00Z"
  }
}
```

**Error Response (401 Unauthorized):**
```json
{
  "error": "Access token required"
}
```

**Error Response (400 Bad Request):**
```json
{
  "error": "Validation failed",
  "details": [
    {
      "field": "title",
      "message": "Title must be 3-200 characters"
    }
  ]
}
```

**Implementation Notes:**
- Verify JWT token and extract user_id
- Validate all fields (title, ingredients, instructions)
- image_url is optional
- Set user_id automatically from authenticated user

---

#### **Endpoint 3: Add Rating to Recipe**

```http
POST /api/recipes/:recipeId/ratings
```

**Authentication Required:** Yes (JWT Token)

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

**URL Parameters:**
- `recipeId` (integer): ID of the recipe to rate

**Request Body:**
```json
{
  "rating": 5,
  "comment": "Absolutely delicious! Easy to follow and turned out perfect."
}
```

**Response (201 Created):**
```json
{
  "message": "Rating added successfully",
  "rating": {
    "id": 42,
    "recipe_id": 15,
    "user_id": 2,
    "rating": 5,
    "comment": "Absolutely delicious! Easy to follow and turned out perfect.",
    "user_name": "Jane Smith",
    "created_at": "2025-11-24T12:30:00Z"
  }
}
```

**Error Response (404 Not Found):**
```json
{
  "error": "Recipe not found"
}
```

**Error Response (400 Bad Request):**
```json
{
  "error": "Cannot rate your own recipe"
}
```

**Error Response (409 Conflict):**
```json
{
  "error": "You have already rated this recipe"
}
```

**Implementation Notes:**
- Check if recipe exists
- Verify user is not rating their own recipe
- Check for existing rating (UNIQUE constraint)
- Validate rating is between 1-5
- comment is optional

---

**Summary of All Important Endpoints:**

| Method | Endpoint | Auth Required | Purpose |
|--------|----------|---------------|---------|
| POST | `/api/auth/register` | No | Register new user |
| POST | `/api/auth/login` | No | Login user |
| GET | `/api/auth/me` | Yes | Get current user |
| GET | `/api/recipes` | No | Get all recipes (with search) |
| GET | `/api/recipes/:id` | No | Get recipe details |
| POST | `/api/recipes` | Yes | Create new recipe |
| PUT | `/api/recipes/:id` | Yes | Update recipe (owner only) |
| DELETE | `/api/recipes/:id` | Yes | Delete recipe (owner only) |
| GET | `/api/recipes/:id/ratings` | No | Get recipe ratings |
| POST | `/api/recipes/:id/ratings` | Yes | Add rating to recipe |

---

## 3. Explanation: How to Use/Adapt These Results in Real Development

### Implementation Strategy (3-5 sentences)

The AI-generated tech stack provides a solid foundation that I will use exactly as recommended, particularly the Node.js + Express + SQLite backend and React + Tailwind frontend combination. The database schema will be implemented verbatim with all suggested indexes and constraints to ensure data integrity and performance from the start. For the API endpoints, I will follow the exact RESTful patterns suggested but will add additional error handling middleware and request logging for better debugging and security auditing. I plan to extend the basic authentication with password reset functionality and email verification in future iterations beyond the MVP scope. The suggested validation libraries (express-validator) and security practices (bcrypt, JWT) will be implemented as core requirements rather than optional features to ensure PDPA compliance and protection against OWASP vulnerabilities from day one.

### Specific Adaptations and Extensions

#### **1. Tech Stack Adaptations**

**What I'll Use Directly:**
- Node.js + Express.js for backend (exact versions)
- React.js + Vite for frontend (faster than Create React App)
- SQLite3 for database (perfect for MVP)
- JWT authentication (7-day expiration as suggested)
- Tailwind CSS for rapid UI development

**What I'll Add:**
- **TypeScript (optional):** Consider adding for type safety in larger projects
- **React Context API:** For global state management (auth state, user info)
- **React Hook Form:** For efficient form validation on frontend
- **Environment Variables:** Separate .env files for development and production
- **Error Boundary:** React error boundaries for graceful error handling
- **Prettier + ESLint:** Code formatting and linting setup

---

#### **2. Database Schema Adaptations**

**What I'll Use Directly:**
- All three tables (users, recipes, ratings) exactly as designed
- All constraints (UNIQUE, CHECK, FOREIGN KEY)
- All indexes for performance optimization
- CASCADE delete behavior

**What I'll Add:**
- **Soft Deletes (Future):** Add `deleted_at` column to preserve data for audit trail
- **Favorites Table (Extension):** Allow users to bookmark favorite recipes
- **Categories Table (Extension):** Add recipe categories (breakfast, dinner, dessert)
- **Recipe Images Table:** If multiple images per recipe are needed in future
- **Full-Text Search Index:** SQLite FTS5 extension for better search performance

**SQL Migration Script:**
```sql
-- Add soft delete support (future enhancement)
ALTER TABLE recipes ADD COLUMN deleted_at DATETIME NULL;
CREATE INDEX idx_recipes_deleted_at ON recipes(deleted_at);

-- Add category support (future enhancement)
ALTER TABLE recipes ADD COLUMN category TEXT DEFAULT 'uncategorized';
CREATE INDEX idx_recipes_category ON recipes(category);
```

---

#### **3. API Endpoint Adaptations**

**What I'll Use Directly:**
- All suggested endpoints with exact request/response formats
- RESTful URL patterns
- HTTP status codes (201, 400, 401, 404, 409)
- Authentication header format (Bearer token)

**What I'll Add:**
- **Pagination:** Add `?page=1&limit=20` query parameters to GET /api/recipes
- **Filtering:** Add `?category=dinner&minRating=4` for advanced filtering
- **Sorting:** Add `?sort=rating&order=desc` for custom sorting
- **Rate Limiting:** Implement express-rate-limit middleware
- **CORS Configuration:** Allow specific origins only
- **API Versioning:** Use `/api/v1/` prefix for future compatibility

**Enhanced Endpoint Example:**
```javascript
// Enhanced GET /api/recipes with pagination and filtering
GET /api/recipes?search=pasta&category=dinner&minRating=4&page=1&limit=20&sort=rating&order=desc

Response:
{
  "recipes": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8,
    "hasNext": true,
    "hasPrev": false
  }
}
```

---

#### **4. Security Enhancements**

**Based on AI Suggestions, I Will Add:**
- **Helmet.js:** Set security HTTP headers
- **express-mongo-sanitize:** Prevent NoSQL injection (even though using SQLite)
- **xss-clean:** Sanitize user input to prevent XSS
- **hpp:** Prevent HTTP parameter pollution
- **CORS whitelist:** Only allow specific frontend origins

```javascript
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';

app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
```

---

#### **5. Testing Strategy**

**What AI Didn't Cover (I Will Add):**
- **Unit Tests:** Jest for testing controllers and utilities
- **Integration Tests:** Supertest for API endpoint testing
- **Frontend Tests:** React Testing Library for component tests
- **E2E Tests:** Playwright or Cypress for full user flows
- **Coverage Goal:** Aim for 80%+ code coverage

```javascript
// Example test structure
describe('Recipe API', () => {
  test('POST /api/recipes should create recipe when authenticated', async () => {
    const response = await request(app)
      .post('/api/recipes')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test Recipe',
        ingredients: 'Test ingredients',
        instructions: 'Test instructions'
      });

    expect(response.status).toBe(201);
    expect(response.body.recipe).toHaveProperty('id');
  });
});
```

---

#### **6. Deployment Considerations**

**Production Adaptations:**
- **Database:** Migrate from SQLite to PostgreSQL for production
- **File Storage:** Use AWS S3 or Cloudinary for recipe images instead of URLs
- **Caching:** Add Redis for session storage and caching popular recipes
- **CDN:** Use Cloudflare or AWS CloudFront for static assets
- **Environment:** Use Docker containers for consistent deployment
- **CI/CD:** GitHub Actions for automated testing and deployment
- **Monitoring:** Add application monitoring (Sentry, New Relic)
- **Logging:** Winston or Pino for structured logging

---

### Summary

The AI-generated designs provide an excellent foundation that requires minimal adaptation for MVP development. The tech stack is production-ready, the database schema is well-normalized and performant, and the API endpoints follow REST best practices. My main adaptations focus on enhancing security (OWASP compliance), adding pagination/filtering for better UX, and implementing comprehensive testing. For the MVP (1-3 hours), I will use the AI suggestions exactly as provided. Post-MVP, I will incrementally add the enhancements mentioned above based on user feedback and performance metrics.

---

**Document Version:** 1.0
**Date:** November 24, 2025
**Status:** Final
**AI Tool Used:** Claude Code (Anthropic)
