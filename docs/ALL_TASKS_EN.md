# Final Take-Home Examination — All Tasks

**Student:** นายอธิชนม์ แก้วหล้า  
**Student ID:** 66315030406  
**Course:** 1305308 Platform Development  
**Project:** Recipe Sharing Platform with Ratings

---

# Task 1 — System Requirement Analysis

## 1. Problem Statement

Home cooks and cooking enthusiasts often face the problem of not having a reliable way to find trusted recipes and lack a central platform to share their culinary creations with the community. Existing recipe websites lack a community-driven quality verification system through user ratings, making it difficult to identify high-quality recipes. Users need a simple and trustworthy platform where they can discover new recipes, share their own recipes, and provide feedback through ratings and comments. This platform addresses the need for a community-driven recipe sharing system that enables users to participate and benefit from shared cooking knowledge, and quickly identify popular and tested recipes.

---

## 2. Core User Stories

### User

1. **I want to view a list of recipes** so I can discover new dishes to try.

2. **I want to rate and review recipes** (1-5 stars) with comments so I can help other users find quality recipes.

3. **I want to search for recipes** by title or ingredients so I can find recipes that match what I have in my kitchen.

4. **I want to authenticate** (register/login) so I can create recipes and rate others' recipes.

5. **I want to view recipe details** including ingredients, instructions, and community ratings so I have all the information needed to cook successfully.

6. **I want to manage my recipes** so I can view, edit, or delete recipes I created.

### Admin

7. **As an admin, I want to edit any recipe** so I can moderate inappropriate content.

8. **As an admin, I want to delete any recipe** so I can remove spam or inappropriate content.

---

## 3. Non-Functional Requirements

1. **Performance** — The platform must load recipe listings within 3 seconds on standard internet connection.

2. **Security** — User data and recipes must be stored securely in localStorage with client-side validation and XSS attack prevention.

3. **Usability** — The platform must be responsive and work on mobile devices, tablets, and desktops (320px to 1920px screen widths).

4. **Scalability** — localStorage should support sufficient recipes and ratings within browser storage limits (approximately 5-10MB per domain).

5. **Data Integrity** — Ratings must be limited to 1-5 range and users cannot rate the same recipe twice.

---

## 4. Key Risks & Threats

1. **Technical Risk — localStorage Limitations and Performance**

   When the platform grows, localStorage may become full (approximately 5-10MB per domain) and retrieving large amounts of data from localStorage may slow down the application, especially with many recipes and ratings.

2. **Security Risk — XSS and Unauthorized Data Access**

   Attackers may attempt to access or modify recipes or ratings of other users through direct localStorage manipulation, XSS attacks via user input, or accessing unprotected data in localStorage.

3. **Operational Risk — Spam and Inappropriate Content**

   Malicious users may spam the platform with fake recipes, inappropriate images, or offensive comments in ratings, reducing community quality.

---

**Total User Stories:** 8 (6 for Regular User + 2 for Admin)  
**Total Non-Functional Requirements:** 5  
**Total Risks Identified:** 3

---

# Task 2 — Security & PDPA Compliance (OWASP + Privacy-by-Design)

## 1. Three OWASP Top 10 Items Relevant to Your Project

### 1. Broken Access Control — Insufficient Permission Control

**Why it's a risk:**

1. Users can edit or delete recipes created by others by directly modifying localStorage through browser DevTools.
2. Users may attempt to rate the same recipe multiple times by manipulating data in localStorage.
3. Regular users may access other users' personal data (email, user data) by reading localStorage.
4. Users may modify localStorage to add mock tokens or change user IDs to bypass authentication checks.

**Mitigation method:**

- Verify ownership (user_id) before allowing any edit/delete operations by comparing the recipe's user_id with currentUser.id from localStorage, and check if currentUser.role === 'admin' for admin privileges. Throw an error if unauthorized.

---

### 2. Cryptographic Failures — Sensitive Data Exposure

**Why it's a risk:**

1. Personal data (PII) such as names and emails are stored in localStorage in plain text without encryption.
2. Users can directly access data in localStorage through browser DevTools.
3. All user data is stored without protection, risking unauthorized access.
4. Legal liability under PDPA for personal data breaches.

**Mitigation method:**

- Do not store passwords in localStorage (mock authentication mode). Store only necessary user data (name, email, role) and separate data by user_id. For production, use backend API with encrypted database storage and HTTPS for all data transmission.

---

### 3. Injection — Cross-Site Scripting (XSS)

**Why it's a risk:**

1. Attackers can steal data from localStorage (user data, tokens) through XSS attacks by injecting malicious scripts.
2. Attackers can steal session or authentication state by stealing mock tokens.
3. Attackers can display harmful content to users.
4. Complete system compromise through stolen authentication and user data.

**Mitigation method:**

- Use React's built-in XSS protection (auto-escapes content by default). Sanitize all user input before saving to localStorage by removing HTML tags and escaping special characters. Never use dangerouslySetInnerHTML. Validate and sanitize image URLs before displaying.

---

## 2. PDPA Data Flow (Bullet-point Summary)

### 1. Data Collection

- Name, email, and password during registration
- Recipe content (title, ingredients, instructions, image URL) when creating recipes
- Rating data (1-5 stars, optional comments) when rating recipes
- User consent through acceptance of terms of service

### 2. Processing

- Do not store passwords (mock authentication mode)
- Standardize email addresses to lowercase for consistency
- Validate all input fields
- Create mock tokens for authentication
- Perform access control checks through Protected Routes
- Sanitize data before saving to localStorage to prevent XSS

### 3. Storage

- Store all data in browser localStorage (client-side)
- Do not store passwords (mock authentication)
- Data stored in JSON format in localStorage
- localStorage limitations (approximately 5-10MB per domain)
- Note: This is a mock implementation for development

### 4. Sharing

- **Public data:** Recipe content, user display names, ratings/comments visible to all users
- **Private data:** Email addresses not exposed in API responses
- **No third-party sharing:** No sharing with external services, analytics, or advertisers
- **Internal use only:** Personal data used only for platform functions

---

## 3. Privacy-by-Design (Summary of Measures)

- **Data Minimization** — Collect only necessary data (name, email for authentication; recipe content for sharing)
- **Clear Consent** — Obtain consent through terms of service acceptance before collecting data
- **Retention Policy** — Delete data when users delete their accounts
- **Access Control** — Restrict access to user's own data; admin can manage all content
- **Security by Default** — Input validation, XSS protection, ownership verification

---

## 4. Security Checklist (5 Important Points)

1. **Input Validation & Output Encoding** — Validate all form inputs, sanitize data before saving, use React's built-in XSS protection

2. **Authentication Management (Mock Mode)** — Do not store passwords in localStorage, use mock tokens, verify user ID before operations, use Protected Routes

3. **XSS Protection** — Use React's built-in XSS protection, sanitize data before saving to localStorage, avoid dangerouslySetInnerHTML, validate and sanitize URLs

4. **Ownership Verification** — Verify user_id from localStorage before edit/delete operations, use Protected Routes, check authentication state before showing Edit/Delete buttons

5. **Secure localStorage Management** — Limit data stored in localStorage, separate data by user_id, verify data before reading from localStorage, handle errors when localStorage is full

---

**Note:** This is a mock implementation for development — for production, real backend API and database must be used for proper security.

---

# Task 3 — AI-Assisted System Design

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

---

**Document Version:** 1.0  
**Date:** November 25, 2025  
**Status:** Final

