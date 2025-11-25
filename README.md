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
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Build tool
- **React Icons** - Icon library

### Data Storage
- **localStorage** - Browser storage API (mock data)
- **JSON** - Data serialization

### State Management
- **React Context API** - Global state (authentication)
- **React Hooks** - Component state management

### Development Tools
- **Git** - Version control
- **ESLint/Prettier** - Code quality

### หมายเหตุ
- นี่เป็น **mock implementation** สำหรับ development
- ข้อมูลถูกจัดเก็บใน browser localStorage
- สำหรับ production ต้องใช้ **backend API + database จริง**

---

## Project Structure

```
recipe-platform/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout/
│   │   │   │   └── Navbar.jsx
│   │   │   ├── Recipe/
│   │   │   │   ├── RecipeCard.jsx
│   │   │   │   ├── RecipeForm.jsx
│   │   │   │   └── RecipeList.jsx
│   │   │   ├── Rating/
│   │   │   │   ├── RatingStars.jsx
│   │   │   │   └── RatingForm.jsx
│   │   │   └── Auth/
│   │   │       ├── LoginForm.jsx
│   │   │       └── RegisterForm.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── RecipeDetailPage.jsx
│   │   │   ├── CreateRecipePage.jsx
│   │   │   ├── MyRecipesPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   └── RegisterPage.jsx
│   │   ├── services/
│   │   │   ├── authService.js
│   │   │   ├── recipeService.js
│   │   │   └── ratingService.js
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── hooks/
│   │   │   └── useAuth.js
│   │   ├── data/
│   │   │   └── mockData.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── docs/
│   ├── TASK1_System_Requirements.md
│   ├── TASK2_Security_PDPA_Compliance.md
│   ├── TASK3_AI_Assisted_Design.md
│   ├── TASK4_Architecture_Design.md
│   ├── TASK5_Implementation.md
│   └── FINAL_PROJECT_SUMMARY.md
│
└── README.md
```

---

## Installation & Setup

### Prerequisites
- Node.js 18+ LTS
- npm or yarn
- Git

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

## Service Methods

### Authentication Service (authService)
| Method | Parameters | Access | Description |
|--------|-----------|--------|-------------|
| `register(userData)` | `{name, email, password}` | Public | Register new user |
| `login(credentials)` | `{email, password}` | Public | Login user |
| `getCurrentUser()` | - | Private | Get current user |
| `logout()` | - | Private | Logout user |

### Recipe Service (recipeService)
| Method | Parameters | Access | Description |
|--------|-----------|--------|-------------|
| `getAllRecipes(search)` | `search: string` | Public | Get all recipes (with search) |
| `getRecipeById(id)` | `id: number` | Public | Get recipe by ID |
| `createRecipe(recipeData)` | `{title, ingredients, instructions, image_url}` | Private | Create new recipe |
| `updateRecipe(id, recipeData)` | `id: number, recipeData: object` | Private | Update recipe (owner only) |
| `deleteRecipe(id)` | `id: number` | Private | Delete recipe (owner only) |
| `getMyRecipes()` | - | Private | Get user's recipes |

### Rating Service (ratingService)
| Method | Parameters | Access | Description |
|--------|-----------|--------|-------------|
| `getRatings(recipeId)` | `recipeId: number` | Public | Get all ratings for recipe |
| `addRating(recipeId, ratingData)` | `recipeId: number, {rating, comment}` | Private | Add rating to recipe |
| `updateRating(id, ratingData)` | `id: number, ratingData: object` | Private | Update rating |
| `deleteRating(id)` | `id: number` | Private | Delete rating |

---

## Data Structure (localStorage)

### Users Data Structure
```javascript
// localStorage key: 'users'
[
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "user",
    created_at: "2024-01-01T00:00:00.000Z"
  }
]
```

### Recipes Data Structure
```javascript
// localStorage key: 'recipes'
[
  {
    id: 1,
    user_id: 1,
    user_name: "John Doe",
    title: "Pad Thai",
    ingredients: "Rice noodles, shrimp, eggs...",
    instructions: "1. Soak noodles...",
    image_url: "https://example.com/padthai.jpg",
    average_rating: 4.5,
    rating_count: 10,
    created_at: "2024-01-01T00:00:00.000Z",
    updated_at: "2024-01-01T00:00:00.000Z"
  }
]
```

### Ratings Data Structure
```javascript
// localStorage key: 'ratings'
[
  {
    id: 1,
    recipe_id: 1,
    user_id: 2,
    user_name: "Jane Doe",
    rating: 5,
    comment: "Great recipe!",
    created_at: "2024-01-01T00:00:00.000Z"
  }
]
```

---

## Testing

### Manual Testing

1. เปิดแอปพลิเคชันใน browser: `http://localhost:5173`
2. ทดสอบการลงทะเบียนผู้ใช้ใหม่
3. ทดสอบการเข้าสู่ระบบ
4. ทดสอบการสร้างสูตรอาหาร
5. ทดสอบการแก้ไข/ลบสูตรอาหาร
6. ทดสอบการให้คะแนนสูตรอาหาร
7. ทดสอบการค้นหาสูตรอาหาร

### Example Usage

**Register User:**
- ไปที่หน้า Register
- กรอกชื่อ, อีเมล, รหัสผ่าน
- คลิก Register
- ข้อมูลจะถูกบันทึกลง localStorage

**Create Recipe:**
- เข้าสู่ระบบก่อน
- ไปที่หน้า Create Recipe
- กรอกข้อมูลสูตรอาหาร
- คลิก Create
- สูตรจะถูกบันทึกลง localStorage

**Reset Data:**
- เปิด browser console (F12)
- รันคำสั่ง: `localStorage.clear()`
- รีเฟรชหน้าเพื่อกู้คืน mock data เริ่มต้น

---

## Security Features

✅ **Authentication (Mock Mode)**
- Mock token system (localStorage-based)
- Protected Routes (React Router)
- AuthContext for global auth state
- ไม่เก็บรหัสผ่าน (mock authentication)

✅ **Input Validation & Sanitization**
- Client-side validation on all forms
- Input sanitization (ป้องกัน XSS)
- Type checking and length validation
- React's built-in XSS protection

✅ **Access Control**
- User ownership verification (client-side)
- Protected Routes สำหรับหน้าที่ต้อง authentication
- Ownership checks before update/delete

✅ **Data Security**
- localStorage management
- Data structure validation
- Error handling
- หมายเหตุ: นี่เป็น mock implementation - สำหรับ production ต้องใช้ backend API + database จริง

✅ **PDPA Compliance**
- Clear data collection purpose
- No third-party data sharing
- Data stored in browser localStorage (client-side)

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
   - Full CRUD operations (mock data via localStorage)
   - Mock authentication system
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
   - View recipe details

2. **Admin**
   - All regular user permissions
   - Edit any recipe (for content moderation)
   - Delete any recipe (for content moderation)
   - Manage all content on the platform
   - Login with: `admin@gmali.com` (any password in mock mode)

---

## Known Limitations & Future Enhancements

**Current Limitations:**
- localStorage (ประมาณ 5-10MB ต่อ domain)
- No image upload (URL only)
- No pagination (loads all recipes)
- No email verification
- Client-side only (ไม่ sync ระหว่าง devices)
- Mock authentication (ไม่เก็บรหัสผ่านจริง)
- ข้อมูลไม่ปลอดภัยสำหรับ production

**Future Enhancements:**
- Migrate to backend API + database (PostgreSQL/SQLite)
- Image upload to cloud storage (AWS S3, Cloudinary)
- Pagination and infinite scroll
- Recipe categories and tags
- Favorite recipes feature
- Social sharing
- Email notifications
- Admin dashboard
- Recipe printing functionality
- Nutritional information
- Real authentication (JWT + bcrypt)

---

## MVP Development Time

**Actual Time Spent:** ~3 hours

- Frontend Setup & Components: 1.5 hours
- Service Layer & Mock Data: 30 minutes
- Authentication (Mock): 30 minutes
- Documentation: 30 minutes

**Note:** นี่เป็น mock implementation สำหรับ development - สำหรับ production ต้องใช้ backend API + database จริง

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
- Frameworks: React.js team
- Community: Stack Overflow, MDN Web Docs

---

**Project Status:** ✅ Complete (Frontend Implementation with Mock Data + Documentation)
**Implementation Type:** Mock implementation for development
**Note:** For production, backend API + database is required
**Last Updated:** November 25, 2025
