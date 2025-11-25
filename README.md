# Recipe Sharing Platform with Ratings

**Final Take-Home Examination Project**

**Student:** Mr. Athichon Kaewla
**Student ID:** 66315030406
**Course:** 1305308 Platform Development
**Deadline:** November 26, 2025 at 23:59

---

## Project Overview

A web-based platform where users can share recipes, rate others' recipes, and discover new dishes based on community ratings. This project fulfills all requirements for the Platform Development final exam.

**One-Sentence Description:**
A community-driven recipe sharing web platform with authentication, CRUD operations, and a 5-star rating system built using React.js and Node.js/Express.

---

## Features

✅ **User Authentication**
- User registration with email and password
- Secure login with JWT tokens
- Password hashing with bcrypt

✅ **Recipe Management**
- Browse all recipes with search functionality
- Create new recipes (title, ingredients, instructions, image)
- Edit and delete own recipes
- View detailed recipe information

✅ **Rating System**
- Rate recipes from 1-5 stars
- Add optional comments with ratings
- View average ratings and all reviews
- Prevent duplicate ratings

✅ **Security & PDPA Compliance**
- JWT authentication
- Input validation on all forms
- SQL injection protection
- OWASP Top 10 mitigation
- PDPA data flow compliance

---

## Tech Stack

### Frontend
- **React.js 18+** - UI library
- **React Router 6** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Build tool

### Backend
- **Node.js 18+ LTS** - JavaScript runtime
- **Express.js 4** - Web framework
- **SQLite3** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation

### Development Tools
- **Postman** - API testing
- **Git** - Version control
- **ESLint/Prettier** - Code quality

---

## Project Structure

```
recipe-platform/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   ├── errorHandler.js
│   │   │   └── validator.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── recipeController.js
│   │   │   └── ratingController.js
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   ├── recipe.routes.js
│   │   │   └── rating.routes.js
│   │   └── server.js
│   ├── database.sqlite
│   ├── package.json
│   ├── .env
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout/
│   │   │   ├── Recipe/
│   │   │   ├── Rating/
│   │   │   └── Auth/
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── RecipeDetailPage.jsx
│   │   │   ├── CreateRecipePage.jsx
│   │   │   ├── MyRecipesPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   └── RegisterPage.jsx
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   ├── recipeService.js
│   │   │   └── ratingService.js
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── hooks/
│   │   │   └── useAuth.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── docs/
│   ├── TASK1_System_Requirements.md
│   ├── TASK2_Security_PDPA_Compliance.md
│   ├── TASK3_AI_Assisted_Design.md
│   ├── TASK4_Architecture_Design.md
│   └── Final_Exam_Documentation.pdf
│
└── README.md
```

---

## Installation & Setup

### Prerequisites
- Node.js 18+ LTS
- npm or yarn
- Git

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file (already provided)
# .env content:
# PORT=5000
# JWT_SECRET=your_jwt_secret_key_change_this_in_production_2024
# NODE_ENV=development

# Start the server
npm start

# Server will run on http://localhost:5000
```

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Install Tailwind CSS dependencies
npm install -D tailwindcss postcss autoprefixer

# Start development server
npm run dev

# Frontend will run on http://localhost:5173
```

---

## API Endpoints

### Authentication
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/auth/register` | Public | Register new user |
| POST | `/api/auth/login` | Public | Login user |
| GET | `/api/auth/me` | Private | Get current user |

### Recipes
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/recipes` | Public | Get all recipes (with search) |
| GET | `/api/recipes/:id` | Public | Get recipe by ID |
| POST | `/api/recipes` | Private | Create new recipe |
| PUT | `/api/recipes/:id` | Private | Update recipe (owner only) |
| DELETE | `/api/recipes/:id` | Private | Delete recipe (owner only) |
| GET | `/api/recipes/user/my-recipes` | Private | Get user's recipes |

### Ratings
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/recipes/:recipeId/ratings` | Public | Get all ratings for recipe |
| POST | `/api/recipes/:recipeId/ratings` | Private | Add rating to recipe |
| PUT | `/api/ratings/:id` | Private | Update rating |
| DELETE | `/api/ratings/:id` | Private | Delete rating |

---

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT DEFAULT 'user',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Recipes Table
```sql
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
```

### Ratings Table
```sql
CREATE TABLE ratings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  recipe_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE(recipe_id, user_id)
);
```

---

## Testing

### API Testing with Postman

1. Import the Postman collection: `backend/Postman_Collection.json`
2. Register a new user via `/api/auth/register`
3. Login to get JWT token
4. Set token in Authorization header: `Bearer <your_token>`
5. Test all CRUD operations

### Example Requests

**Register:**
```bash
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123"
}
```

**Create Recipe:**
```bash
POST http://localhost:5000/api/recipes
Authorization: Bearer <your_token>
Content-Type: application/json

{
  "title": "Pad Thai",
  "ingredients": "Rice noodles, shrimp, eggs, fish sauce...",
  "instructions": "1. Soak noodles... 2. Heat oil...",
  "image_url": "https://example.com/padthai.jpg"
}
```

---

## Security Features

✅ **Password Security**
- bcrypt hashing with 10 salt rounds
- No plain-text passwords stored

✅ **Authentication**
- JWT tokens with 7-day expiration
- Bearer token authorization

✅ **Input Validation**
- express-validator on all endpoints
- Type checking and sanitization

✅ **SQL Injection Protection**
- Parameterized queries only
- No string concatenation in SQL

✅ **Access Control**
- User ownership verification
- Role-based access (user/admin)

✅ **PDPA Compliance**
- Clear data collection purpose
- No third-party data sharing
- User can delete account (data erasure)

---

## Documentation

All exam tasks are documented in the `docs/` folder:

1. **Task 1:** System Requirement Analysis
   - Problem Statement (4-6 sentences)
   - Core User Stories (7 stories)
   - Non-Functional Requirements (5 items)
   - Key Risks & Threats (3 items)

2. **Task 2:** Security & PDPA Compliance
   - OWASP Top 10 Analysis (3 items with mitigation)
   - PDPA Data Flow Diagram
   - Security Checklist (5 items)

3. **Task 3:** AI-Assisted System Design
   - AI Prompts Used (3 prompts)
   - Recommended Tech Stack
   - Database Schema (3 tables)
   - 3 Key API Endpoints

4. **Task 4:** System Architecture & UX/UI Design
   - System Architecture Diagram
   - Component Interaction Flows
   - 2 UX/UI Wireframes (Home Page, Recipe Detail)

5. **Task 5:** Coding Implementation
   - Full CRUD API for recipes
   - Authentication system
   - Rating system
   - All source code in this repository

---

## Final Deliverables

As per exam requirements, the following will be submitted:

1. ✅ **PDF Documentation** - Combining all tasks (docs/Final_Exam_Documentation.pdf)
2. ✅ **Source Code** - .zip file without node_modules
3. ✅ **Diagrams/Screenshots** - Included in PDF

---

## User Roles

1. **Regular User (default)**
   - Browse and search recipes
   - Create, edit, delete own recipes
   - Rate other users' recipes
   - Add comments to ratings

2. **Admin (future enhancement)**
   - All user permissions
   - Moderate content
   - Delete any recipe
   - Ban users

---

## Known Limitations & Future Enhancements

**Current Limitations:**
- SQLite (suitable for < 100K records)
- No image upload (URL only)
- No pagination (loads all recipes)
- No email verification

**Future Enhancements:**
- Migrate to PostgreSQL for production
- Image upload to cloud storage (AWS S3, Cloudinary)
- Pagination and infinite scroll
- Recipe categories and tags
- Favorite recipes feature
- Social sharing
- Email notifications
- Admin dashboard
- Recipe printing functionality
- Nutritional information

---

## MVP Development Time

**Actual Time Spent:** ~3 hours

- Backend Setup & API: 1.5 hours
- Database Design: 30 minutes
- Authentication: 30 minutes
- Documentation: 30 minutes

**Frontend Time (For Student):** ~2.5 hours estimated

---

## License

ISC - For educational purposes only (1305308 Platform Development Final Exam)

---

## Contact

**Student:** Mr. Athichon Kaewla
**Student ID:** 66315030406
**GitHub:** https://github.com/6631503046Athichon/plattfrom-exam

---

## Acknowledgments

- Course Instructor: 1305308 Platform Development
- AI Assistant: Claude Code (Anthropic) for system design recommendations
- Frameworks: React.js, Express.js teams
- Community: Stack Overflow, MDN Web Docs

---

**Project Status:** ✅ Complete (Full-Stack Implementation - Backend + Frontend + Documentation)
**Last Updated:** November 25, 2025
