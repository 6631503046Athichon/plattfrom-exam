import { body, param, validationResult } from 'express-validator';

// Validation middleware to check for errors
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Validation failed',
      details: errors.array()
    });
  }
  next();
};

// User registration validation
export const validateRegistration = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be 2-100 characters'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  validate
];

// Login validation
export const validateLogin = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Password is required'),
  validate
];

// Recipe validation
export const validateRecipe = [
  body('title')
    .trim()
    .notEmpty().withMessage('Recipe title is required')
    .isLength({ min: 3, max: 200 }).withMessage('Title must be 3-200 characters'),
  body('ingredients')
    .trim()
    .notEmpty().withMessage('Ingredients are required')
    .isLength({ min: 10 }).withMessage('Please provide detailed ingredients'),
  body('instructions')
    .trim()
    .notEmpty().withMessage('Instructions are required')
    .isLength({ min: 20 }).withMessage('Please provide detailed instructions'),
  body('image_url')
    .optional()
    .trim()
    .isURL().withMessage('Invalid image URL'),
  validate
];

// Rating validation
export const validateRating = [
  body('rating')
    .notEmpty().withMessage('Rating is required')
    .isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('comment')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('Comment must not exceed 500 characters'),
  validate
];

// ID parameter validation
export const validateId = [
  param('id')
    .isInt({ min: 1 }).withMessage('Invalid ID'),
  validate
];
