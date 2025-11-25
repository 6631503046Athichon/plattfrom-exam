# Task 4 — System Architecture & UX/UI Design (20 points)

**Student:** Mr. Athichon Kaewla
**Student ID:** 66315030406
**Course:** 1305308 Platform Development
**Project:** Recipe Sharing Platform with Ratings

---

## Part A: System Architecture Diagram

### Overview

This architecture follows a **3-tier architecture pattern** consisting of Presentation Layer (Frontend), Application Layer (Backend), and Data Layer (Database). The system implements RESTful API communication between layers with JWT-based authentication.

---

### High-Level System Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           PRESENTATION LAYER                             │
│                              (Frontend)                                  │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌──────────────────────────────────────────────────────────────────┐ │
│  │                    React.js Application                           │ │
│  │                                                                    │ │
│  │  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐       │ │
│  │  │  Components   │  │     Pages     │  │   Services    │       │ │
│  │  ├───────────────┤  ├───────────────┤  ├───────────────┤       │ │
│  │  │ • Navbar      │  │ • HomePage    │  │ • authService │       │ │
│  │  │ • RecipeCard  │  │ • RecipeDetail│  │ • recipeServ. │       │ │
│  │  │ • RecipeForm  │  │ • CreateRecipe│  │ • ratingServ. │       │ │
│  │  │ • RatingStars │  │ • MyRecipes   │  │               │       │ │
│  │  │ • RatingForm  │  │ • Login       │  └───────────────┘       │ │
│  │  │ • LoginForm   │  │ • Register    │                           │ │
│  │  └───────────────┘  └───────────────┘                           │ │
│  │                                                                    │ │
│  │  ┌────────────────────────────────────────────────────┐          │ │
│  │  │           React Router (Client-side Routing)       │          │ │
│  │  └────────────────────────────────────────────────────┘          │ │
│  │                                                                    │ │
│  │  ┌────────────────────────────────────────────────────┐          │ │
│  │  │      Axios HTTP Client + JWT Interceptors          │          │ │
│  │  └────────────────────────────────────────────────────┘          │ │
│  │                                                                    │ │
│  │  ┌────────────────────────────────────────────────────┐          │ │
│  │  │  AuthContext (Global State - User & Token)         │          │ │
│  │  └────────────────────────────────────────────────────┘          │ │
│  └──────────────────────────────────────────────────────────────────┘ │
│                                                                          │
│  Running on: http://localhost:5173 (Vite Dev Server)                   │
│  Styling: Tailwind CSS                                                  │
└──────────────────────────────────┬───────────────────────────────────────┘
                                   │
                                   │ HTTP/HTTPS Requests
                                   │ (JSON + JWT Token in Header)
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                         APPLICATION LAYER                                │
│                             (Backend API)                                │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌──────────────────────────────────────────────────────────────────┐ │
│  │                   Express.js Server                               │ │
│  │                                                                    │ │
│  │  ┌─────────────────────────────────────────────────────────────┐ │ │
│  │  │                    Middleware Chain                          │ │ │
│  │  ├─────────────────────────────────────────────────────────────┤ │ │
│  │  │ 1. CORS Middleware          (Allow frontend origin)         │ │ │
│  │  │ 2. JSON Body Parser         (Parse request body)            │ │ │
│  │  │ 3. Request Logger           (Log all requests)              │ │ │
│  │  │ 4. Authentication Middleware (Verify JWT for protected)     │ │ │
│  │  │ 5. Validation Middleware    (express-validator)             │ │ │
│  │  │ 6. Error Handler Middleware (Catch all errors)              │ │ │
│  │  └─────────────────────────────────────────────────────────────┘ │ │
│  │                                                                    │ │
│  │  ┌────────────────────┐  ┌────────────────────┐                  │ │
│  │  │   Route Handlers   │  │   Controllers      │                  │ │
│  │  ├────────────────────┤  ├────────────────────┤                  │ │
│  │  │ /api/auth/*        │─>│ authController     │                  │ │
│  │  │ • POST /register   │  │ • register()       │                  │ │
│  │  │ • POST /login      │  │ • login()          │                  │ │
│  │  │ • GET  /me         │  │ • getCurrentUser() │                  │ │
│  │  │                    │  │                    │                  │ │
│  │  │ /api/recipes/*     │─>│ recipeController   │                  │ │
│  │  │ • GET    /         │  │ • getAllRecipes()  │                  │ │
│  │  │ • GET    /:id      │  │ • getRecipeById()  │                  │ │
│  │  │ • POST   /         │  │ • createRecipe()   │                  │ │
│  │  │ • PUT    /:id      │  │ • updateRecipe()   │                  │ │
│  │  │ • DELETE /:id      │  │ • deleteRecipe()   │                  │ │
│  │  │                    │  │                    │                  │ │
│  │  │ /api/recipes/:id/  │─>│ ratingController   │                  │ │
│  │  │      ratings       │  │ • getRatings()     │                  │ │
│  │  │ • GET  /           │  │ • addRating()      │                  │ │
│  │  │ • POST /           │  │ • updateRating()   │                  │ │
│  │  └────────────────────┘  │ • deleteRating()   │                  │ │
│  │                          └────────────────────┘                  │ │
│  │                                                                    │ │
│  │  ┌─────────────────────────────────────────────────────────────┐ │ │
│  │  │              Security & Validation Layer                     │ │ │
│  │  ├─────────────────────────────────────────────────────────────┤ │ │
│  │  │ • JWT Token Verification (jsonwebtoken)                     │ │ │
│  │  │ • Password Hashing (bcryptjs - 10 salt rounds)              │ │ │
│  │  │ • Input Validation (express-validator)                      │ │ │
│  │  │ • SQL Injection Protection (Parameterized queries)          │ │ │
│  │  │ • Access Control (User ownership checks)                    │ │ │
│  │  └─────────────────────────────────────────────────────────────┘ │ │
│  └──────────────────────────────────────────────────────────────────┘ │
│                                                                          │
│  Running on: http://localhost:5000                                      │
│  Environment: .env file (JWT_SECRET, PORT)                              │
└──────────────────────────────────┬───────────────────────────────────────┘
                                   │
                                   │ SQL Queries
                                   │ (Parameterized)
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                            DATA LAYER                                    │
│                           (Database)                                     │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌──────────────────────────────────────────────────────────────────┐ │
│  │                    SQLite3 Database                               │ │
│  │                   (database.sqlite)                               │ │
│  │                                                                    │ │
│  │  ┌────────────┐     ┌────────────┐     ┌────────────┐           │ │
│  │  │   users    │     │  recipes   │     │  ratings   │           │ │
│  │  ├────────────┤     ├────────────┤     ├────────────┤           │ │
│  │  │ id (PK)    │     │ id (PK)    │     │ id (PK)    │           │ │
│  │  │ name       │────<│ user_id FK │     │ recipe_id  │           │ │
│  │  │ email      │     │ title      │<────│ user_id    │           │ │
│  │  │ pass_hash  │     │ ingredient │     │ rating     │           │ │
│  │  │ role       │     │ instructio │     │ comment    │           │ │
│  │  │ created_at │     │ image_url  │     │ created_at │           │ │
│  │  └────────────┘     │ created_at │     └────────────┘           │ │
│  │                     │ updated_at │                               │ │
│  │                     └────────────┘                               │ │
│  │                                                                    │ │
│  │  Relationships:                                                   │ │
│  │  • users(1) -> recipes(many)                                     │ │
│  │  • users(1) -> ratings(many)                                     │ │
│  │  • recipes(1) -> ratings(many)                                   │ │
│  │  • UNIQUE(recipe_id, user_id) in ratings                         │ │
│  │                                                                    │ │
│  │  Indexes:                                                         │ │
│  │  • idx_users_email                                               │ │
│  │  • idx_recipes_user_id                                           │ │
│  │  • idx_recipes_title                                             │ │
│  │  • idx_ratings_recipe_id                                         │ │
│  │  • idx_ratings_user_id                                           │ │
│  │                                                                    │ │
│  │  Constraints:                                                     │ │
│  │  • CHECK(rating >= 1 AND rating <= 5)                           │ │
│  │  • CHECK(role IN ('user', 'admin'))                             │ │
│  │  • FOREIGN KEY with CASCADE DELETE                              │ │
│  └──────────────────────────────────────────────────────────────────┘ │
│                                                                          │
│  Storage: File-based (database.sqlite)                                  │
│  Query Interface: Parameterized queries via sqlite3 npm package         │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│                        EXTERNAL SERVICES                                 │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐      │
│  │ Image Hosting   │   │  Email Service  │   │   Monitoring    │      │
│  │ (Future: CDN)   │   │ (Future: SMTP)  │   │ (Future: Sentry)│      │
│  └─────────────────┘   └─────────────────┘   └─────────────────┘      │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

### Component Interactions Flow

#### **Flow 1: User Registration**

```
┌──────────┐     1. Submit Form      ┌──────────┐     2. Validate   ┌──────────┐
│          │   (name,email,pass)     │          │     & Hash Pass   │          │
│ Register │────────────────────────>│  Express │─────────────────>│  bcrypt  │
│   Form   │                         │  Server  │                   │          │
│          │<────────────────────────│          │<──────────────────│          │
└──────────┘   8. Return JWT Token   └──────────┘   3. password_hash└──────────┘
                                           │
                                           │ 4. INSERT user
                                           ▼
                                      ┌──────────┐
                                      │  SQLite  │
                                      │ Database │
                                      └──────────┘
                                           │
                                           │ 5. Return user.id
                                           ▼
                                      ┌──────────┐
                                      │   JWT    │
                                      │ Generate │
                                      └──────────┘
                                           │
                                           │ 6. Sign token with userId
                                           │ 7. Return to client
                                           ▼
                                      [Store in localStorage]
```

---

#### **Flow 2: Create Recipe (Protected)**

```
┌──────────┐   1. Submit + JWT      ┌──────────┐   2. Verify JWT   ┌──────────┐
│  Recipe  │   in Authorization     │   Auth   │                   │   JWT    │
│   Form   │──────────────────────>│Middleware│─────────────────>│  Verify  │
│          │       Header           │          │                   │          │
└──────────┘                        └──────────┘                   └──────────┘
                                         │                               │
                                         │ 3. Valid? Attach req.user    │
                                         │<──────────────────────────────┘
                                         ▼
                                    ┌──────────┐
                                    │ Validate │
                                    │  Input   │
                                    └──────────┘
                                         │ 4. Check title, ingredients, etc.
                                         ▼
                                    ┌──────────┐
                                    │  Recipe  │
                                    │Controller│
                                    └──────────┘
                                         │ 5. INSERT recipe with req.user.id
                                         ▼
                                    ┌──────────┐
                                    │  SQLite  │
                                    │ Database │
                                    └──────────┘
                                         │ 6. Return created recipe
                                         ▼
                                    [Send 201 Response]
```

---

#### **Flow 3: View Recipe with Ratings (Public)**

```
┌──────────┐   1. GET /recipes/:id   ┌──────────┐                   ┌──────────┐
│  Recipe  │───────────────────────>│  Recipe  │  2. Complex Query │  SQLite  │
│ Detail   │                         │Controller│─────────────────>│ Database │
│  Page    │                         │          │  (JOIN 3 tables)  │          │
│          │                         │          │<──────────────────│          │
└──────────┘                         └──────────┘  3. Recipe + Avg  └──────────┘
     ▲                                    │            Rating
     │                                    │
     │ 5. Display recipe + ratings        │
     │                                    ▼
     └────────────────────────────────  4. Send JSON Response
                                          {
                                            recipe: {...},
                                            average_rating: 4.5,
                                            rating_count: 12,
                                            ratings: [...]
                                          }
```

---

### Security Features in Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     SECURITY LAYERS                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Layer 1: Transport Security                                    │
│  ├─ HTTPS (Production)                                          │
│  ├─ CORS restrictions                                           │
│  └─ Secure headers (helmet.js)                                  │
│                                                                  │
│  Layer 2: Authentication & Authorization                        │
│  ├─ JWT tokens (7-day expiration)                              │
│  ├─ Bearer token in Authorization header                        │
│  ├─ Password hashing (bcrypt, 10 rounds)                       │
│  └─ User ownership verification                                 │
│                                                                  │
│  Layer 3: Input Validation                                      │
│  ├─ express-validator on all endpoints                          │
│  ├─ Type checking (string, number, email)                      │
│  ├─ Length validation (min/max)                                 │
│  └─ Sanitization (trim, escape HTML)                           │
│                                                                  │
│  Layer 4: Database Security                                     │
│  ├─ Parameterized queries (NO string concatenation)            │
│  ├─ Foreign key constraints                                     │
│  ├─ CHECK constraints (rating 1-5)                             │
│  ├─ UNIQUE constraints (prevent duplicates)                    │
│  └─ CASCADE DELETE for data integrity                          │
│                                                                  │
│  Layer 5: Error Handling                                        │
│  ├─ Global error handler middleware                             │
│  ├─ No sensitive data in error messages                        │
│  ├─ Logging (access logs, error logs)                          │
│  └─ 404 handler for undefined routes                           │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

### Technology Stack Summary

| Layer | Technology | Purpose | Version |
|-------|------------|---------|---------|
| **Frontend** | React.js | UI library | 18+ |
| | React Router | Client-side routing | 6 |
| | Axios | HTTP client | Latest |
| | Tailwind CSS | Styling | 3+ |
| | Vite | Build tool | Latest |
| **Backend** | Node.js | JavaScript runtime | 18+ LTS |
| | Express.js | Web framework | 4 |
| | sqlite3 | Database driver | Latest |
| **Database** | SQLite | SQL database | 3 |
| **Security** | jsonwebtoken | JWT auth | 9+ |
| | bcryptjs | Password hashing | 2+ |
| | express-validator | Input validation | 7+ |
| **Utilities** | cors | CORS middleware | Latest |
| | dotenv | Environment vars | Latest |

---

## Part B: UX/UI Wireframes (2 Screens)

### Instructions for Creating Wireframes

Use **Figma** (https://figma.com) or **Excalidraw** (https://excalidraw.com) to create these wireframes and export as PNG.

---

### Wireframe 1: Home Page (Recipe List)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ [🍳 Recipe Platform]          [Home] [My Recipes] [Create] [Login]     │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  Discover Amazing Recipes                                           │   │
│  │  ┌──────────────────────────────────────────┐  ┌────────┐          │   │
│  │  │ Search recipes...                         │  │ Search │          │   │
│  │  └──────────────────────────────────────────┘  └────────┘          │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐      │
│  │  ┌───────┐  │  │  ┌───────┐  │  │  ┌───────┐  │  │  ┌───────┐  │      │
│  │  │ IMAGE │  │  │  │ IMAGE │  │  │  │ IMAGE │  │  │  │ IMAGE │  │      │
│  │  │       │  │  │  │       │  │  │  │       │  │  │  │       │  │      │
│  │  └───────┘  │  │  └───────┘  │  │  └───────┘  │  │  └───────┘  │      │
│  │              │  │              │  │              │  │              │      │
│  │ Pad Thai     │  │ Spaghetti   │  │ Tom Yum     │  │ Green Curry  │      │
│  │              │  │ Carbonara   │  │ Soup        │  │              │      │
│  │ ★★★★★ (4.8) │  │ ★★★★☆ (4.2) │  │ ★★★★★ (5.0) │  │ ★★★★☆ (4.5) │      │
│  │              │  │              │  │              │  │              │      │
│  │ By John Doe  │  │ By Jane      │  │ By Mike     │  │ By Sarah     │      │
│  │ Nov 20, 2025 │  │ Nov 22, 2025 │  │ Nov 23, 2025│  │ Nov 24, 2025 │      │
│  │              │  │              │  │              │  │              │      │
│  │ [View Recipe]│  │ [View Recipe]│  │ [View Recipe]│  │ [View Recipe]│      │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘      │
│                                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐      │
│  │  ┌───────┐  │  │  ┌───────┐  │  │  ┌───────┐  │  │  ┌───────┐  │      │
│  │  │ IMAGE │  │  │  │ IMAGE │  │  │  │ IMAGE │  │  │  │ IMAGE │  │      │
│  │  │       │  │  │  │       │  │  │  │       │  │  │  │       │  │      │
│  │  └───────┘  │  │  └───────┘  │  │  └───────┘  │  │  └───────┘  │      │
│  │              │  │              │  │              │  │              │      │
│  │ Mango Sticky │  │ Caesar      │  │ Fried Rice  │  │ Tacos       │      │
│  │ Rice         │  │ Salad       │  │              │  │              │      │
│  │ ★★★★★ (4.9) │  │ ★★★★☆ (4.1) │  │ ★★★★☆ (4.3) │  │ ★★★★★ (4.7) │      │
│  │              │  │              │  │              │  │              │      │
│  │ By Amy       │  │ By Tom       │  │ By Lisa     │  │ By Carlos    │      │
│  │ Nov 18, 2025 │  │ Nov 21, 2025 │  │ Nov 19, 2025│  │ Nov 23, 2025 │      │
│  │              │  │              │  │              │  │              │      │
│  │ [View Recipe]│  │ [View Recipe]│  │ [View Recipe]│  │ [View Recipe]│      │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘      │
│                                                                             │
│                          [Load More Recipes]                                │
│                                                                             │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ © 2025 Recipe Platform | About | Contact | Privacy Policy               │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘

MOBILE RESPONSIVE (320px - 768px):
- Grid changes to 1-2 columns
- Search bar full width
- Touch-friendly buttons (min 44px height)
- Hamburger menu for navigation
```

**Key UI Elements:**
1. **Navbar:** Logo, navigation links, user status
2. **Search Bar:** Full-text search with button
3. **Recipe Grid:** Responsive 4-column grid (3, 2, 1 on smaller screens)
4. **Recipe Card:** Image, title, rating stars, author, date, CTA button
5. **Footer:** Copyright and links

---

### Wireframe 2: Recipe Detail Page

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ [🍳 Recipe Platform]    [Home] [My Recipes] [Create] [Hello, John ▼]   │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                      │   │
│  │                    ┌─────────────────────────┐                      │   │
│  │                    │                         │                      │   │
│  │                    │    RECIPE IMAGE         │                      │   │
│  │                    │    (Full Width)         │                      │   │
│  │                    │    800 x 400px          │                      │   │
│  │                    │                         │                      │   │
│  │                    └─────────────────────────┘                      │   │
│  │                                                                      │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                      │   │
│  │  Spaghetti Carbonara                                    [Edit] [Del]│   │
│  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │   │
│  │                                                                      │   │
│  │  ★★★★☆ 4.2 / 5.0  (12 ratings)                                     │   │
│  │                                                                      │   │
│  │  Created by: Jane Smith | November 22, 2025                         │   │
│  │                                                                      │   │
│  ├─────────────────────────────────────────────────────────────────────┤   │
│  │                                                                      │   │
│  │  📝 INGREDIENTS                                                      │   │
│  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │   │
│  │                                                                      │   │
│  │  ┌──────────────────────────────────────────────────────────────┐  │   │
│  │  │  • 400g spaghetti                                            │  │   │
│  │  │  • 200g pancetta or bacon, diced                             │  │   │
│  │  │  • 4 large eggs                                              │  │   │
│  │  │  • 100g Parmesan cheese, grated                              │  │   │
│  │  │  • Black pepper, to taste                                    │  │   │
│  │  │  • Salt                                                       │  │   │
│  │  └──────────────────────────────────────────────────────────────┘  │   │
│  │                                                                      │   │
│  ├─────────────────────────────────────────────────────────────────────┤   │
│  │                                                                      │   │
│  │  👨‍🍳 INSTRUCTIONS                                                     │   │
│  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │   │
│  │                                                                      │   │
│  │  1. Bring a large pot of salted water to boil. Cook spaghetti      │   │
│  │     according to package directions until al dente.                 │   │
│  │                                                                      │   │
│  │  2. While pasta cooks, fry pancetta in a large skillet over        │   │
│  │     medium heat until crispy. Set aside.                            │   │
│  │                                                                      │   │
│  │  3. In a bowl, beat eggs with grated Parmesan cheese and           │   │
│  │     generous black pepper.                                          │   │
│  │                                                                      │   │
│  │  4. Drain pasta, reserving 1 cup pasta water. Add pasta to         │   │
│  │     skillet with pancetta.                                          │   │
│  │                                                                      │   │
│  │  5. Remove from heat. Quickly stir in egg mixture, tossing          │   │
│  │     constantly to create creamy sauce (not scrambled eggs!).        │   │
│  │                                                                      │   │
│  │  6. Add reserved pasta water if needed to loosen sauce.             │   │
│  │                                                                      │   │
│  │  7. Serve immediately with extra Parmesan and black pepper.         │   │
│  │                                                                      │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  ⭐ RATINGS & REVIEWS (12)                                           │   │
│  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │   │
│  │                                                                      │   │
│  │  ┌──────────────────────────────────────────────────────────────┐  │   │
│  │  │  Leave a Rating                                              │  │   │
│  │  │                                                              │  │   │
│  │  │  Your Rating: ☆ ☆ ☆ ☆ ☆  (Click to rate)                  │  │   │
│  │  │                                                              │  │   │
│  │  │  ┌────────────────────────────────────────────────────────┐ │  │   │
│  │  │  │ Add your comment (optional)...                         │ │  │   │
│  │  │  │                                                        │ │  │   │
│  │  │  │                                                        │ │  │   │
│  │  │  └────────────────────────────────────────────────────────┘ │  │   │
│  │  │                                                              │  │   │
│  │  │  [Submit Rating]                                             │  │   │
│  │  └──────────────────────────────────────────────────────────────┘  │   │
│  │                                                                      │   │
│  │  ┌──────────────────────────────────────────────────────────────┐  │   │
│  │  │  Mike Johnson                               ★★★★★ (5.0)     │  │   │
│  │  │  November 23, 2025                                           │  │   │
│  │  │  ──────────────────────────────────────────────────────────  │  │   │
│  │  │  Best carbonara recipe I've tried! The egg mixture ratio     │  │   │
│  │  │  was perfect and created such a creamy sauce.                │  │   │
│  │  └──────────────────────────────────────────────────────────────┘  │   │
│  │                                                                      │   │
│  │  ┌──────────────────────────────────────────────────────────────┐  │   │
│  │  │  Sarah Lee                                  ★★★★☆ (4.0)     │  │   │
│  │  │  November 21, 2025                                           │  │   │
│  │  │  ──────────────────────────────────────────────────────────  │  │   │
│  │  │  Good recipe! I added some mushrooms. Turned out great.      │  │   │
│  │  └──────────────────────────────────────────────────────────────┘  │   │
│  │                                                                      │   │
│  │  ┌──────────────────────────────────────────────────────────────┐  │   │
│  │  │  Tom Brown                                  ★★★☆☆ (3.0)     │  │   │
│  │  │  November 19, 2025                                           │  │   │
│  │  │  ──────────────────────────────────────────────────────────  │  │   │
│  │  │  Decent but I prefer more garlic in my carbonara.            │  │   │
│  │  └──────────────────────────────────────────────────────────────┘  │   │
│  │                                                                      │   │
│  │  [Show More Reviews]                                                 │   │
│  │                                                                      │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ © 2025 Recipe Platform | About | Contact | Privacy Policy               │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘

RESPONSIVE DESIGN NOTES:
- Single column layout on mobile
- Image scales to full width
- Rating stars become larger (touch-friendly)
- Comments stack vertically
- Edit/Delete buttons only visible to recipe owner
```

**Key UI Elements:**
1. **Hero Image:** Full-width recipe photo
2. **Recipe Header:** Title, rating, author info, action buttons
3. **Ingredients Section:** Bulleted list in card/box
4. **Instructions Section:** Numbered steps
5. **Rating Form:** Interactive star selector + comment textarea
6. **Reviews List:** User ratings with names, dates, scores, comments
7. **Access Control:** Edit/Delete buttons only visible if logged-in user is the recipe owner

---

### Design Guidelines

**Colors:**
- Primary: Indigo (#4F46E5) - Buttons, links
- Success: Green (#10B981) - Submit buttons
- Warning: Yellow (#F59E0B) - Edit buttons
- Danger: Red (#EF4444) - Delete buttons
- Gray: (#6B7280) - Text, borders
- Background: Light gray (#F3F4F6)

**Typography:**
- Headings: Inter, SF Pro, or system font
- Body: 16px base, 1.5 line-height
- Mobile: 14px base with larger touch targets

**Spacing:**
- Base unit: 8px (Tailwind's spacing scale)
- Cards: 16-24px padding
- Section gaps: 32-48px

**Accessibility:**
- WCAG AA contrast ratios
- Focus indicators on interactive elements
- Alt text on all images
- Semantic HTML (nav, main, article, section)

---

## Summary

This architecture implements a modern 3-tier web application with clear separation of concerns. The frontend React application communicates with the Express.js backend via RESTful APIs, with JWT-based authentication ensuring secure access to protected resources. The SQLite database provides reliable data persistence with proper constraints and indexes. The UI/UX design prioritizes usability with responsive layouts, intuitive navigation, and clear visual hierarchy. All components work together to create a secure, performant, and user-friendly Recipe Sharing Platform.

---

**Document Version:** 1.0
**Date:** November 24, 2025
**Status:** Final
**Tools Used:** ASCII Art, Figma (recommended for actual wireframes)
