# Task 3 — AI-Assisted System Design

**Student:** นายอธิชนม์ แก้วหล้า  
**Student ID:** 66315030406  
**Course:** 1305308 Platform Development  
**Project:** Recipe Sharing Platform with Ratings

---

## 1. The Exact Prompt(s)

**Prompt 1: Tech Stack Recommendation**

```
Act as an expert system architect. I have a Recipe Sharing Platform app (React.js frontend). 
Propose a recommended tech stack, a concise data structure design for localStorage (3 main entities) 
with field types and key constraints, and 3 key service methods (function signature, parameters, 
return values, validations, important error codes). Keep suggestions pragmatic for a small MVP 
deployment (security, PDPA/privacy considered). Return short, clear lists and structure definitions.

Requirements:
- Frontend-only implementation (no backend for MVP)
- Mock authentication system
- Support at least 2 user roles (user, admin)
- Handle personal data (PDPA compliance)
- MVP development within 1-3 hours
- Use localStorage for data storage
```

---

## 2. Recommended Tech Stack

**Frontend:**
- **React.js (v18+)** with Vite — Component-based architecture, fast development, large ecosystem
- **Tailwind CSS** — Utility-first CSS framework, rapid UI development, responsive by default
- **React Router (v6)** — Client-side routing for single-page application
- **Axios** — HTTP client for API calls (for future backend integration)

**Data Storage:**
- **localStorage (Browser API)** — No backend setup needed, fast development, suitable for MVP
- **Mock Data Services** — Simulate API calls for development, no backend required

**Authentication (Mock Mode):**
- **Mock Token System** — Simulate authentication for development, no backend setup needed
- **Note:** For production, real backend API + JWT must be used

**Validation:**
- **Client-side Validation** — Input validation and sanitization on client-side
- **React Form Validation** — Custom validation functions

**Additional Tools:**
- **Vite** — Fast build tool for React
- **React Icons** — Ready-made icons
- **Git** — Version control
- **ESLint + Prettier** — Code quality and formatting

---

## 3. Data Structure (localStorage)

### Users Data Structure
```javascript
// localStorage key: 'users'
[
  {
    id: 1,                    // Integer, auto-increment
    name: "John Doe",         // String, required
    email: "john@example.com", // String, unique, required
    role: "user",             // String, default 'user' or 'admin'
    created_at: "2024-01-01T00:00:00.000Z" // ISO string
  }
]
```

### Recipes Data Structure
```javascript
// localStorage key: 'recipes'
[
  {
    id: 1,                    // Integer, auto-increment
    user_id: 1,               // Integer, foreign key to users
    user_name: "John Doe",    // String, denormalized for display
    title: "Pad Thai",        // String, required
    ingredients: "...",       // String, required
    instructions: "...",      // String, required
    image_url: "https://...", // String, optional
    average_rating: 4.5,      // Number, calculated
    rating_count: 10,         // Number, calculated
    created_at: "2024-01-01T00:00:00.000Z", // ISO string
    updated_at: "2024-01-01T00:00:00.000Z" // ISO string
  }
]
```

### Ratings Data Structure
```javascript
// localStorage key: 'ratings'
[
  {
    id: 1,                    // Integer, auto-increment
    recipe_id: 1,             // Integer, foreign key to recipes
    user_id: 2,               // Integer, foreign key to users
    user_name: "Jane Doe",    // String, denormalized for display
    rating: 5,                // Integer, 1-5, required
    comment: "Great recipe!", // String, optional
    created_at: "2024-01-01T00:00:00.000Z" // ISO string
  }
]
```

**Relationships:**
- One-to-Many: One user can create many recipes
- One-to-Many: One user can create many ratings
- One-to-Many: One recipe can have many ratings
- Constraint: One user can rate one recipe only once (unique constraint)

**Key Constraints:**
- Unique: email in users, (user_id, recipe_id) in ratings
- Check: rating must be 1-5
- Foreign Keys: user_id references users(id), recipe_id references recipes(id)

---

## 4. 3 Key Service Methods

### 1) POST /api/auth/register (Mock: authService.register)

**Auth:** none

**Input:**
```javascript
{
  name: "John Doe",
  email: "john@example.com",
  password: "securePassword123" // Not stored in mock mode
}
```

**Response:** 200
```javascript
{
  user: {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "user",
    created_at: "2025-11-24T10:30:00Z"
  },
  token: "mock-token-1" // Mock token
}
```

**Validations:** email format, email uniqueness, name non-empty

**Errors:** 400 email already exists, 400 validation error

**Notes:** Password not stored (mock authentication), mock token created for development, saved to localStorage

---

### 2) GET /api/recipes (Mock: recipeService.getAllRecipes)

**Auth:** optional (public read)

**Query:** `?search=keyword` (optional)

**Response:** 200
```javascript
[
  {
    id: 1,
    user_id: 1,
    user_name: "John Doe",
    title: "Pad Thai",
    ingredients: "...",
    instructions: "...",
    image_url: "https://...",
    average_rating: 4.5,
    rating_count: 10,
    created_at: "2024-01-01T00:00:00.000Z"
  }
]
```

**Validations:** search query format

**Errors:** 400 invalid query, 500 server error

**Notes:** Returns all recipes with calculated average ratings, supports search by title or ingredients

---

### 3) POST /api/recipes/:recipeId/ratings (Mock: ratingService.addRating)

**Auth:** Bearer token required (mock token)

**Input:**
```javascript
{
  rating: 5, // Integer, 1-5
  comment: "Great recipe!" // String, optional
}
```

**Response:** 201
```javascript
{
  id: 42,
  recipe_id: 15,
  user_id: 2,
  user_name: "Jane Smith",
  rating: 5,
  comment: "Great recipe!",
  created_at: "2025-11-24T12:30:00Z"
}
```

**Validations:** rating must be 1-5, user cannot rate own recipe, user cannot rate same recipe twice

**Errors:** 401 unauthorized, 400 validation error, 409 duplicate rating, 404 recipe not found

**Notes:** Check for duplicate ratings before saving, verify recipe ownership, log action, enforce rating constraints

---

## 5. Explain Briefly

Use the recommended stack for rapid MVP development: React.js frontend with Vite + Tailwind CSS for fast UI development. Implement localStorage-based data storage with the three main entities (users, recipes, ratings) as defined. Build the three service methods first (auth register, get recipes, add rating) with client-side validation, duplicate rating prevention, and mock token authentication. Implement ownership verification and admin role checks for content moderation. Add input sanitization and XSS protection to support security and PDPA compliance. For production, migrate to backend API + database (PostgreSQL) with real JWT authentication and proper security measures.

**Note:** This is a mock implementation for development — for production, real backend API and database must be used for proper security.

