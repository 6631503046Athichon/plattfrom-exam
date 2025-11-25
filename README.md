# Recipe Sharing Platform with Ratings

**Student:** นายอธิชลแก้วหล้า  
**Student ID:** 66315030406  
**Course:** 1305308 Platform Development  
**Project:** Recipe Sharing Platform with Ratings

---

## Project Overview

A community-driven recipe sharing web platform where users can discover, create, and rate recipes. Built with React.js and uses localStorage for data storage (mock implementation for development).

---

## Features

- ✅ User Authentication (Register/Login)
- ✅ Browse and Search Recipes
- ✅ Create, Edit, Delete Recipes
- ✅ Rate Recipes (1-5 stars) with Comments
- ✅ View Recipe Details
- ✅ My Recipes Page
- ✅ Admin Role (Edit/Delete any recipe)

---

## Tech Stack

- **React.js 18+** - UI Library
- **React Router 6** - Client-side Routing
- **Tailwind CSS** - Styling
- **Vite** - Build Tool
- **localStorage** - Data Storage (Mock)

---

## Installation

### Prerequisites

- Node.js 18+ LTS
- npm or yarn

### Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install
```

---

## Running the Application

### Development

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173`

### Production Build

```bash
npm run build
npm run preview
```

---

## Usage

### Default Users (Mock Authentication)

- **Regular Users:**
  - `chef.john@example.com` (any password)
  - `sarah.baker@example.com` (any password)
  - `mike.chef@example.com` (any password)

- **Admin:**
  - `admin@gmali.com` (any password)

### Features

1. **Browse Recipes** - View all recipes on the home page
2. **Search** - Search recipes by title or ingredients
3. **Register/Login** - Create account or login with existing users
4. **Create Recipe** - Add your own recipes
5. **Edit/Delete** - Manage your recipes (or all recipes if admin)
6. **Rate Recipes** - Rate and comment on recipes (cannot rate your own)

---

## Project Structure

```
frontend/
├── src/
│   ├── components/     # Reusable components
│   ├── pages/          # Page components
│   ├── services/       # Data services (localStorage)
│   ├── context/        # React Context (Auth)
│   ├── hooks/          # Custom hooks
│   └── data/           # Mock data
├── package.json
└── vite.config.js
```

---

## Notes

- This is a **mock implementation** for development
- All data is stored in browser localStorage
- For production, backend API + database is required
- No password is stored (mock authentication mode)

---

## License

ISC - For educational purposes only (1305308 Platform Development Final Exam)

---

**Last Updated:** November 25, 2025

