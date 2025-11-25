# Recipe Platform - Frontend

React.js frontend for the Recipe Sharing Platform with Ratings.

**Student:** Mr. Athichon Kaewla (66315030406)
**Course:** 1305308 Platform Development

---

## Tech Stack

- **React.js 18+** - UI library
- **React Router 6** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS
- **Vite** - Build tool

---

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will run on `http://localhost:5173`

**Important:** Make sure the backend is running on `http://localhost:5000`

---

## Project Structure

```
src/
├── components/
│   ├── Layout/
│   │   └── Navbar.jsx
│   ├── Recipe/
│   │   ├── RecipeCard.jsx
│   │   ├── RecipeList.jsx
│   │   └── RecipeForm.jsx
│   ├── Rating/
│   │   ├── RatingStars.jsx
│   │   └── RatingForm.jsx
│   └── Auth/
│       ├── LoginForm.jsx
│       └── RegisterForm.jsx
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
├── context/
│   └── AuthContext.jsx
├── hooks/
│   └── useAuth.js
├── App.jsx
├── main.jsx
└── index.css
```

---

## Features

### Pages

1. **Home Page** (`/`)
   - Browse all recipes
   - Search functionality
   - Recipe grid with cards

2. **Recipe Detail Page** (`/recipe/:id`)
   - View full recipe details
   - See all ratings and reviews
   - Add rating (if logged in)
   - Edit/Delete (if owner)

3. **Create Recipe Page** (`/create-recipe`) - Protected
   - Form to create new recipe
   - Upload image URL
   - Add ingredients and instructions

4. **My Recipes Page** (`/my-recipes`) - Protected
   - View all your created recipes
   - Quick access to edit/delete

5. **Login Page** (`/login`)
   - Login with email and password
   - Link to register page

6. **Register Page** (`/register`)
   - Create new account
   - Link to login page

### Components

#### Layout
- **Navbar** - Navigation with auth state

#### Recipe
- **RecipeCard** - Recipe preview card
- **RecipeList** - Grid of recipe cards
- **RecipeForm** - Create/edit recipe form

#### Rating
- **RatingStars** - Display star rating
- **RatingForm** - Submit rating form

#### Auth
- **LoginForm** - Login form
- **RegisterForm** - Registration form

---

## Authentication

JWT token is stored in `localStorage` and automatically attached to all API requests via Axios interceptor.

```javascript
// Automatic token handling
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

---

## Protected Routes

Routes that require authentication:
- `/create-recipe`
- `/my-recipes`

Unauthenticated users will be redirected to `/login`.

---

## API Integration

All API calls go through services:

```javascript
// Example: Creating a recipe
import { recipeService } from '../services/recipeService';

const handleSubmit = async (recipeData) => {
  const recipe = await recipeService.createRecipe(recipeData);
  console.log('Created:', recipe);
};
```

---

## Styling

Uses **Tailwind CSS** for styling. Custom utilities are defined in `tailwind.config.js`.

### Color Scheme
- Primary: Indigo (`indigo-600`)
- Success: Green (`green-600`)
- Warning: Yellow (`yellow-500`)
- Danger: Red (`red-500`)

---

## Build for Production

```bash
# Build optimized production bundle
npm run build

# Preview production build
npm run preview
```

Output will be in `dist/` folder.

---

## Environment Variables

Update `vite.config.js` if backend URL changes:

```javascript
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Change if needed
        changeOrigin: true,
      }
    }
  }
})
```

---

## Responsive Design

All components are mobile-responsive using Tailwind's responsive utilities:

- **Mobile** (< 768px): 1 column
- **Tablet** (768px - 1024px): 2 columns
- **Desktop** (> 1024px): 3-4 columns

---

## License

ISC - For educational purposes (1305308 Platform Development Final Exam)
