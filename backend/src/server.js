import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import recipeRoutes from './routes/recipe.routes.js';
import ratingRoutes from './routes/rating.routes.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import './config/database.js'; // Initialize database

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Health check route
app.get('/', (req, res) => {
  res.json({
    message: 'Recipe Sharing Platform API',
    version: '1.0.0',
    status: 'Running',
    endpoints: {
      auth: '/api/auth',
      recipes: '/api/recipes',
      ratings: '/api'
    }
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api', ratingRoutes);

// 404 handler
app.use(notFoundHandler);

// Error handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
  console.log(`✅ Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log('\n📡 Available endpoints:');
  console.log(`   POST   /api/auth/register`);
  console.log(`   POST   /api/auth/login`);
  console.log(`   GET    /api/auth/me`);
  console.log(`   GET    /api/recipes`);
  console.log(`   GET    /api/recipes/:id`);
  console.log(`   POST   /api/recipes`);
  console.log(`   PUT    /api/recipes/:id`);
  console.log(`   DELETE /api/recipes/:id`);
  console.log(`   GET    /api/recipes/user/my-recipes`);
  console.log(`   GET    /api/recipes/:recipeId/ratings`);
  console.log(`   POST   /api/recipes/:recipeId/ratings`);
  console.log(`   PUT    /api/ratings/:id`);
  console.log(`   DELETE /api/ratings/:id`);
  console.log('\n🚀 Ready to accept requests!');
});

export default app;
