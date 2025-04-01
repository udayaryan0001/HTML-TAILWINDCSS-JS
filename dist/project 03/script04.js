// server.js
const express = require('express');
const { body, validationResult } = require('express-validator');
const cors = require('cors');
const app = express();
const port = 3000;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Validation middleware
const validateForm = [
  body('name')
    .notEmpty().withMessage('Please enter your name'),
  body('email')
    .isEmail().withMessage('Please enter a valid email'),
  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

// Submit route
app.post('/submit', validateForm, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Here you would typically save to a database
  console.log('Form data:', req.body);
  
  res.status(200).json({ 
    message: 'Account created successfully! 🎉',
    user: req.body
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});