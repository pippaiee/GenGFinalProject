const path = require('path');
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const apiRoutes = require('./routes/api');
const authRoutes = require('./routes/auth')
const verifyToken = require(path.join(__dirname, 'middlewares', 'authMiddleware'));
const protectedRoutes = require('./routes/protected');
const PORT = 8000;

//serve static file
app.use(express.static(path.join(__dirname, '/public')));
  // Middleware to parse form data and JSON 
  app.use(bodyParser.urlencoded({ extended: true })); 
  app.use(bodyParser.json());

//Middleware to authentication
app.use('/protected', protectedRoutes);

// Middleware to parse JSON
app.use(express.json());

// Use API routes
app.use('/api', apiRoutes);

//Auth Routes
app.use('/auth', authRoutes);

// Basic route to serve UserPage
app.get('/UserPage', (req, res) => {
    res.sendFile(path.join(__dirname, 'HTML', 'UserPage.html'));
  });

// Basic route to serve the landing page HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'HTML', 'Kadoin.html'));
});


// Run server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
