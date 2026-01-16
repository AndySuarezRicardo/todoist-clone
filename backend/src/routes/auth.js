const express = require('express');
const { body } = require('express-validator');
const AuthController = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/register',
  [
    body('email').isEmail().normalizeEmail(),
    body('username').isLength({ min: 3, max: 50 }).trim(),
    body('password').isLength({ min: 6 }),
    body('full_name').optional().trim()
  ],
  AuthController.register
);

router.post('/login',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty()
  ],
  AuthController.login
);

router.get('/me', authMiddleware, AuthController.getCurrentUser);

module.exports = router;
