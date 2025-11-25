# Task 4 — สถาปัตยกรรมระบบและการออกแบบ UX/UI (20 คะแนน)

**นักศึกษา:** นาย อธิชน แก้วหล้า
**รหัสนักศึกษา:** 66315030406
**รายวิชา:** 1305308 Platform Development
**โปรเจค:** Recipe Sharing Platform with Ratings

---

## Part A: แผนภาพสถาปัตยกรรมระบบ

### ภาพรวม

สถาปัตยกรรมนี้เป็นไปตามแบบ **3-tier architecture pattern** ประกอบด้วย Presentation Layer (Frontend), Application Layer (Backend) และ Data Layer (Database) ระบบใช้การสื่อสารแบบ RESTful API ระหว่างชั้นต่างๆ พร้อมกับการยืนยันตัวตนแบบ JWT

---

### สถาปัตยกรรมระบบระดับสูง

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

### ขั้นตอนการทำงานระหว่าง Components

#### **Flow 1: การลงทะเบียนผู้ใช้**

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

#### **Flow 2: การสร้างสูตรอาหาร (Protected)**

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

#### **Flow 3: การดูสูตรอาหารพร้อมคะแนน (Public)**

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

### คุณสมบัติด้านความปลอดภัยในสถาปัตยกรรม

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

### สรุป Technology Stack

| ชั้น | เทคโนโลยี | จุดประสงค์ | เวอร์ชัน |
|------|-----------|-----------|---------|
| **Frontend** | React.js | ไลบรารีสำหรับสร้าง UI | 18+ |
| | React Router | จัดการ routing ฝั่ง client | 6 |
| | Axios | ตัวจัดการ HTTP client | Latest |
| | Tailwind CSS | จัดการ styling | 3+ |
| | Vite | เครื่องมือ build | Latest |
| **Backend** | Node.js | JavaScript runtime | 18+ LTS |
| | Express.js | Web framework | 4 |
| | sqlite3 | Database driver | Latest |
| **Database** | SQLite | ฐานข้อมูล SQL | 3 |
| **Security** | jsonwebtoken | การยืนยันตัวตนด้วย JWT | 9+ |
| | bcryptjs | การแฮชรหัสผ่าน | 2+ |
| | express-validator | การตรวจสอบความถูกต้องของ input | 7+ |
| **Utilities** | cors | CORS middleware | Latest |
| | dotenv | จัดการ environment variables | Latest |

---

## Part B: Wireframes สำหรับ UX/UI (2 หน้าจอ)

### คำแนะนำในการสร้าง Wireframes

ใช้ **Figma** (https://figma.com) หรือ **Excalidraw** (https://excalidraw.com) เพื่อสร้าง wireframes เหล่านี้และ export เป็น PNG

---

### Wireframe 1: หน้าแรก (รายการสูตรอาหาร)

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

รองรับ MOBILE (320px - 768px):
- Grid เปลี่ยนเป็น 1-2 คอลัมน์
- Search bar เต็มความกว้าง
- ปุ่มที่เหมาะสำหรับการสัมผัส (ความสูงขั้นต่ำ 44px)
- Hamburger menu สำหรับการนำทาง
```

**องค์ประกอบ UI หลัก:**
1. **Navbar:** โลโก้, ลิงก์นำทาง, สถานะผู้ใช้
2. **Search Bar:** การค้นหาแบบเต็มข้อความพร้อมปุ่ม
3. **Recipe Grid:** Grid แบบ responsive 4 คอลัมน์ (3, 2, 1 บนหน้าจอเล็ก)
4. **Recipe Card:** รูปภาพ, ชื่อ, ดาวคะแนน, ผู้แต่ง, วันที่, ปุ่ม CTA
5. **Footer:** ลิขสิทธิ์และลิงก์

---

### Wireframe 2: หน้ารายละเอียดสูตรอาหาร

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

หมายเหตุการออกแบบแบบ RESPONSIVE:
- เลย์เอาต์แบบคอลัมน์เดียวบนมือถือ
- รูปภาพปรับขนาดเต็มความกว้าง
- ดาวคะแนนขนาดใหญ่ขึ้น (เหมาะสำหรับการสัมผัส)
- ความคิดเห็นเรียงแนวตั้ง
- ปุ่ม Edit/Delete แสดงเฉพาะเจ้าของสูตรอาหารเท่านั้น
```

**องค์ประกอบ UI หลัก:**
1. **Hero Image:** รูปภาพสูตรอาหารเต็มความกว้าง
2. **Recipe Header:** ชื่อ, คะแนน, ข้อมูลผู้แต่ง, ปุ่มการดำเนินการ
3. **Ingredients Section:** รายการแบบ bullet points ในการ์ด/กล่อง
4. **Instructions Section:** ขั้นตอนที่มีหมายเลข
5. **Rating Form:** ตัวเลือกดาวแบบโต้ตอบ + textarea สำหรับความคิดเห็น
6. **Reviews List:** คะแนนของผู้ใช้พร้อมชื่อ, วันที่, คะแนน, ความคิดเห็น
7. **Access Control:** ปุ่ม Edit/Delete แสดงเฉพาะเมื่อผู้ใช้ที่ล็อกอินเป็นเจ้าของสูตรอาหาร

---

### แนวทางการออกแบบ

**สี:**
- Primary: Indigo (#4F46E5) - ปุ่ม, ลิงก์
- Success: Green (#10B981) - ปุ่ม Submit
- Warning: Yellow (#F59E0B) - ปุ่ม Edit
- Danger: Red (#EF4444) - ปุ่ม Delete
- Gray: (#6B7280) - ข้อความ, ขอบ
- Background: Light gray (#F3F4F6)

**การจัดตัวอักษร:**
- หัวข้อ: Inter, SF Pro หรือ system font
- เนื้อหา: ขนาด 16px, line-height 1.5
- มือถือ: ขนาด 14px พร้อมเป้าหมายการสัมผัสที่ใหญ่ขึ้น

**ระยะห่าง:**
- หน่วยพื้นฐาน: 8px (Tailwind's spacing scale)
- การ์ด: padding 16-24px
- ช่องว่างระหว่างส่วน: 32-48px

**การเข้าถึง (Accessibility):**
- อัตราส่วน contrast ตาม WCAG AA
- ตัวบอก focus บนองค์ประกอบที่โต้ตอบได้
- ข้อความ alt บนรูปภาพทั้งหมด
- Semantic HTML (nav, main, article, section)

---

## สรุป

สถาปัตยกรรมนี้ใช้แอปพลิเคชันเว็บแบบ 3-tier ที่ทันสมัยพร้อมการแยกความรับผิดชอบอย่างชัดเจน แอปพลิเคชัน React ฝั่ง frontend สื่อสารกับ backend ด้วย Express.js ผ่าน RESTful APIs โดยมีการยืนยันตัวตนแบบ JWT เพื่อให้มั่นใจว่าการเข้าถึงทรัพยากรที่ได้รับการป้องกันมีความปลอดภัย ฐานข้อมูล SQLite ให้การจัดเก็บข้อมูลที่เชื่อถือได้พร้อม constraints และ indexes ที่เหมาะสม การออกแบบ UI/UX ให้ความสำคัญกับความสามารถในการใช้งานด้วย responsive layouts, การนำทางที่ใช้งานง่าย และลำดับชั้นภาพที่ชัดเจน คอมโพเนนต์ทั้งหมดทำงานร่วมกันเพื่อสร้าง Recipe Sharing Platform ที่ปลอดภัย มีประสิทธิภาพ และเป็นมิตรต่อผู้ใช้

---

**เวอร์ชันเอกสาร:** 1.0
**วันที่:** November 24, 2025
**สถานะ:** สมบูรณ์
**เครื่องมือที่ใช้:** ASCII Art, Figma (แนะนำสำหรับ wireframes จริง)
