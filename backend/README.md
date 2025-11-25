# Recipe Sharing Platform - Backend API

Backend API for Recipe Sharing Platform with Ratings

**Student:** Mr. Athichon Kaewla (66315030406)
**Course:** 1305308 Platform Development
**Project:** Final Take-Home Examination

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** SQLite3
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** bcryptjs
- **Validation:** express-validator

## Installation

```bash
# Install dependencies
npm install

# Run the server
npm start

# Or run with auto-reload (requires Node.js 18+)
npm run dev
```

Server will run on `http://localhost:5000`

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
| PUT | `/api/recipes/:id` | Private | Update recipe |
| DELETE | `/api/recipes/:id` | Private | Delete recipe |
| GET | `/api/recipes/user/my-recipes` | Private | Get user's recipes |

### Ratings

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/recipes/:recipeId/ratings` | Public | Get all ratings for recipe |
| POST | `/api/recipes/:recipeId/ratings` | Private | Add rating to recipe |
| PUT | `/api/ratings/:id` | Private | Update rating |
| DELETE | `/api/ratings/:id` | Private | Delete rating |

## Request Examples

### Register User
```json
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login
```json
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Create Recipe (Protected)
```json
POST /api/recipes
Headers: { "Authorization": "Bearer <token>" }
{
  "title": "Spaghetti Carbonara",
  "ingredients": "400g spaghetti\n200g pancetta\n4 eggs\n100g Parmesan cheese",
  "instructions": "1. Boil pasta\n2. Fry pancetta\n3. Mix eggs and cheese\n4. Combine all",
  "image_url": "https://example.com/image.jpg"
}
```

### Rate Recipe (Protected)
```json
POST /api/recipes/1/ratings
Headers: { "Authorization": "Bearer <token>" }
{
  "rating": 5,
  "comment": "Delicious recipe!"
}
```

## Database Schema

### Users Table
- `id` (INTEGER, PRIMARY KEY)
- `name` (TEXT)
- `email` (TEXT, UNIQUE)
- `password_hash` (TEXT)
- `role` (TEXT, DEFAULT 'user')
- `created_at` (DATETIME)

### Recipes Table
- `id` (INTEGER, PRIMARY KEY)
- `user_id` (INTEGER, FOREIGN KEY)
- `title` (TEXT)
- `ingredients` (TEXT)
- `instructions` (TEXT)
- `image_url` (TEXT)
- `created_at` (DATETIME)
- `updated_at` (DATETIME)

### Ratings Table
- `id` (INTEGER, PRIMARY KEY)
- `recipe_id` (INTEGER, FOREIGN KEY)
- `user_id` (INTEGER, FOREIGN KEY)
- `rating` (INTEGER, 1-5)
- `comment` (TEXT)
- `created_at` (DATETIME)
- UNIQUE constraint on (recipe_id, user_id)

## Security Features

1. **Password Hashing:** bcrypt with salt rounds
2. **JWT Authentication:** 7-day token expiration
3. **Input Validation:** express-validator on all endpoints
4. **Authorization:** Role-based access control
5. **SQL Injection Protection:** Parameterized queries
6. **CORS:** Configured for frontend access

## Environment Variables

Create a `.env` file:

```env
PORT=5000
JWT_SECRET=your_jwt_secret_key_change_this_in_production_2024
NODE_ENV=development
```

## Testing with Postman

1. Import the Postman collection (if provided)
2. Register a new user
3. Login to get JWT token
4. Set token in Authorization header for protected routes
5. Test all CRUD operations

## License

ISC
