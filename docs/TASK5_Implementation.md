# Task 5 — Implementation (Coding)

**Course**: 1305308 Platform Development
**Student**: นายอธิชนม์ แก้วหล้า (66315030406)
**Project**: Recipe Sharing Platform

---

## Implementation Approach

For this project, I implemented **BOTH Option A (CRUD API) and Option B (Frontend Pages)** to create a complete, fully functional Recipe Sharing Platform. This demonstrates comprehensive understanding of full-stack development.

---

## Option A: CRUD API Implementation

### Technology Stack
- **Runtime**: Node.js v18+
- **Framework**: Express.js v4
- **Database**: SQLite3
- **Authentication**: JWT (jsonwebtoken)
- **Validation**: express-validator
- **Security**: bcryptjs for password hashing

### Database Schema

```sql
-- Users Table
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT DEFAULT 'user',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Recipes Table
CREATE TABLE recipes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  ingredients TEXT NOT NULL,
  instructions TEXT NOT NULL,
  image_url TEXT,
  user_id INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Ratings Table
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

### API Endpoints Implemented

#### Authentication Endpoints
1. **POST /api/auth/register** - User registration
2. **POST /api/auth/login** - User login with JWT
3. **GET /api/auth/me** - Get current user (protected)

#### Recipe CRUD Endpoints
4. **GET /api/recipes** - Get all recipes (with search)
5. **GET /api/recipes/:id** - Get single recipe by ID
6. **POST /api/recipes** - Create new recipe (protected)
7. **PUT /api/recipes/:id** - Update recipe (protected, owner only)
8. **DELETE /api/recipes/:id** - Delete recipe (protected, owner only)
9. **GET /api/recipes/my/list** - Get current user's recipes (protected)

#### Rating Endpoints
10. **GET /api/recipes/:id/ratings** - Get all ratings for a recipe
11. **POST /api/recipes/:id/ratings** - Add rating (protected)
12. **PUT /api/ratings/:id** - Update rating (protected, owner only)
13. **DELETE /api/ratings/:id** - Delete rating (protected, owner only)

### Key Code Snippets

#### 1. JWT Authentication Middleware
```javascript
// backend/src/middleware/auth.js
export const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await get(
      'SELECT id, name, email, role FROM users WHERE id = ?',
      [decoded.userId]
    );

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};
```

#### 2. Recipe Controller with SQL Injection Prevention
```javascript
// backend/src/controllers/recipeController.js
export const getAllRecipes = async (req, res) => {
  try {
    const { search } = req.query;
    let sql = `
      SELECT
        r.*,
        u.name as user_name,
        COUNT(DISTINCT rt.id) as rating_count,
        COALESCE(AVG(rt.rating), 0) as average_rating
      FROM recipes r
      LEFT JOIN users u ON r.user_id = u.id
      LEFT JOIN ratings rt ON r.id = rt.recipe_id
    `;

    const params = [];
    if (search) {
      sql += ` WHERE r.title LIKE ? OR r.ingredients LIKE ?`;
      params.push(`%${search}%`, `%${search}%`);
    }

    sql += ` GROUP BY r.id ORDER BY r.created_at DESC`;

    const recipes = await query(sql, params);
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
```

#### 3. Password Hashing with bcrypt
```javascript
// backend/src/controllers/authController.js
export const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const existingUser = await get('SELECT id FROM users WHERE email = ?', [email]);
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const result = await run(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );

    // Generate JWT
    const token = jwt.sign(
      { userId: result.lastID },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      user: { id: result.lastID, name, email },
      token
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
```

### API Testing Results

All endpoints were tested using curl and verified to work correctly:

- ✅ User Registration: Successfully creates users with hashed passwords
- ✅ User Login: Returns JWT token with 7-day expiration
- ✅ Recipe CRUD: All operations work with proper authorization
- ✅ Rating System: Users can rate recipes with 1-5 stars and comments
- ✅ Search: Recipe search by title and ingredients works correctly
- ✅ Authorization: Owner-only operations properly restricted

---

## Option B: Frontend Implementation

### Technology Stack
- **Framework**: React 18+ with Hooks
- **Build Tool**: Vite
- **Routing**: React Router 6
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS 3
- **State Management**: React Context API

### Project Structure

```
frontend/src/
├── components/
│   ├── Auth/
│   │   ├── LoginForm.jsx
│   │   └── RegisterForm.jsx
│   ├── Layout/
│   │   └── Navbar.jsx
│   ├── Rating/
│   │   ├── RatingStars.jsx
│   │   └── RatingForm.jsx
│   └── Recipe/
│       ├── RecipeCard.jsx
│       ├── RecipeForm.jsx
│       └── RecipeList.jsx
├── context/
│   └── AuthContext.jsx
├── hooks/
│   └── useAuth.js
├── pages/
│   ├── HomePage.jsx
│   ├── RecipeDetailPage.jsx
│   ├── CreateRecipePage.jsx
│   ├── MyRecipesPage.jsx
│   ├── LoginPage.jsx
│   └── RegisterPage.jsx
├── services/
│   ├── api.js
│   ├── authService.js
│   ├── recipeService.js
│   └── ratingService.js
└── App.jsx
```

### Key Features Implemented

#### 1. Authentication Context (Global State)
```javascript
// frontend/src/context/AuthContext.jsx
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      loadUser();
    } else {
      setLoading(false);
    }
  }, []);

  const loadUser = async () => {
    try {
      const userData = await authService.getCurrentUser();
      setUser(userData);
    } catch (error) {
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    const { user, token } = await authService.login(credentials);
    localStorage.setItem('token', token);
    setUser(user);
  };

  // ... logout, register methods
};
```

#### 2. Protected Routes
```javascript
// frontend/src/App.jsx
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;

  return children;
};

// Usage in routes
<Route
  path="/create-recipe"
  element={
    <ProtectedRoute>
      <CreateRecipePage />
    </ProtectedRoute>
  }
/>
```

#### 3. API Service with Axios Interceptors
```javascript
// frontend/src/services/api.js
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' }
});

// Request interceptor - Add JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor - Handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

### Pages Implemented

#### 1. Home Page
- Hero section with platform branding
- Search bar for finding recipes
- Grid layout displaying all recipes
- Responsive design (1-3 columns based on screen size)

#### 2. Recipe Detail Page
- Full recipe information display
- Ingredients and instructions sections
- Rating system with stars and comments
- Edit/Delete buttons (for recipe owner only)
- User avatar circles with initials

#### 3. Create/Edit Recipe Page
- Form with title, ingredients, instructions, image URL
- Client-side validation
- Helper tips for better UX
- Required field indicators

#### 4. My Recipes Page
- Lists all recipes created by the logged-in user
- Quick access to edit/delete
- Same card-based layout as home page

#### 5. Login/Register Pages
- Clean, centered forms
- Error message display
- Form validation
- Responsive design

### UX/UI Design Principles Applied

1. **Visual Hierarchy**: Clear heading sizes, proper spacing
2. **Consistency**: Uniform button styles, color scheme throughout
3. **Feedback**: Loading states, hover effects, error messages
4. **Accessibility**: Proper labels, focus states, semantic HTML
5. **White Space**: Generous padding and margins for readability
6. **Typography**: Clear font hierarchy with Tailwind's default font stack
7. **Color System**:
   - Primary: Indigo-600 (#4F46E5)
   - Success: Green-600
   - Warning: Yellow-500
   - Danger: Red-500
   - Neutral: Gray scale

### Responsive Design
- Mobile-first approach using Tailwind's responsive utilities
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Flexible grid layouts that adapt to screen size
- Hamburger menu considerations for mobile

---

## Screenshots

### 1. Home Page
![Home Page](screenshots/homepage.png)
*Features: Hero section with search bar, recipe grid layout with ratings*

### 2. Recipe Detail Page
![Recipe Detail](screenshots/recipe-detail.png)
*Features: Full recipe view, ingredients/instructions sections, rating form*

### 3. Create Recipe Form
![Create Recipe](screenshots/create-recipe.png)
*Features: Comprehensive form with validation, helper tips*

### 4. My Recipes Page
![My Recipes](screenshots/my-recipes.png)
*Features: User's recipe collection with edit/delete options*

### 5. Login Page
![Login](screenshots/login.png)
*Features: Clean authentication form with error handling*

### 6. Register Page
![Register](screenshots/register.png)
*Features: User registration with password confirmation*

---

## How to Run the Project

### Prerequisites
- Node.js v18 or higher
- npm or yarn

### Backend Setup
```bash
cd backend
npm install
npm start
# Server runs on http://localhost:5000
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
# App runs on http://localhost:5173 or 5174
```

### Environment Variables
Create `backend/.env`:
```
PORT=5000
JWT_SECRET=your-secret-key-here
NODE_ENV=development
```

---

## Security Features Implemented

1. **Password Hashing**: bcrypt with 10 salt rounds
2. **JWT Authentication**: 7-day token expiration
3. **SQL Injection Prevention**: Parameterized queries
4. **Input Validation**: express-validator on backend
5. **CORS Configuration**: Restricted to frontend origin
6. **Authorization Checks**: Owner-only operations protected
7. **XSS Prevention**: React's built-in escaping

---

## Challenges & Solutions

### Challenge 1: State Management
**Problem**: Sharing authentication state across components
**Solution**: Implemented React Context API for global auth state

### Challenge 2: Route Protection
**Problem**: Preventing unauthorized access to protected pages
**Solution**: Created ProtectedRoute wrapper component with authentication checks

### Challenge 3: API Error Handling
**Problem**: Gracefully handling API errors and expired tokens
**Solution**: Axios interceptors for centralized error handling

---

## Future Enhancements

If given more time, I would add:
1. Image upload with cloud storage (Cloudinary/S3)
2. Recipe categories and tags
3. Advanced search with filters
4. User profiles with avatars
5. Recipe bookmarking/favorites
6. Social sharing features
7. Email verification
8. Password reset functionality

---

## Conclusion

This implementation demonstrates:
- ✅ Full CRUD operations on multiple entities
- ✅ RESTful API design with 13 endpoints
- ✅ Complete React frontend with routing
- ✅ Authentication and authorization
- ✅ Database design with relationships
- ✅ Security best practices
- ✅ Modern UX/UI design
- ✅ Responsive layout
- ✅ Professional code organization

The Recipe Sharing Platform is a fully functional MVP that can be used immediately for sharing and discovering recipes within a community.
