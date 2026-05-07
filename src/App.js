// Import required modules and libraries
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Sequelize } = require('sequelize');
const SequelizePostgres = require('sequelize-postgres');

// Initialize PostgreSQL connection
const sequelize = new SequelizePostgres({
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  user: 'pharmacy_user',
  password: 'pharmacy_password',
  database: 'pharmacy_db'
});

// Import models
const User = sequelize.define('User', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    unique: true
  },
  password: {
    type: Sequelize.STRING
  }
});

const Pharmacy = sequelize.define('Pharmacy', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    unique: true
  }
});

// Input validation functions
function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

function validatePassword(password) {
  if (password.length < 8) return false;
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasDigit = /\d/.test(password);
  const hasSpecialChar = /[^a-zA-Z0-9]/.test(password);
  return hasLowercase && hasUppercase && hasDigit && hasSpecialChar;
}

// Express.js app
const app = express();

// Middlewares for input validation and error handling
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res) => {
  if (req.method === 'POST') {
    const { error } = validateInput(req.body);
    if (error) return res.status(400).send(error);
  }
});

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(500).send('Internal Server Error');
};

// JWT authentication function
function authenticateJWT(token) {
  const decoded = jwt.verify(token, 'secret_key_here');
  return decoded;
}

// API routes for users and pharmacies
const apiRoutes = require('./services/api');

// Register user route
apiRoutes.post('/register', (req, res) => {
  try {
    User.create(req.body).then(user => {
      res.send({ message: 'User registered successfully' });
    }).catch(err => {
      console.error(err);
      res.status(400).send('Invalid request');
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error registering user');
  }
});

// Login user route
apiRoutes.post('/login', (req, res) => {
  try {
    const { error } = validateLogin(req.body);
    if (error) return res.status(400).send(error);
    User.findOne({ where: { email: req.body.email } }).then(user => {
      if (!user || !validatePassword(user.password)) return res.status(401).send('Invalid credentials');
      const token = jwt.sign({ userId: user.id, email: user.email }, 'secret_key_here', { expiresIn: '1h' });
      res.send({ message: 'Login successful. Token: ' + token });
    }).catch(err => {
      console.error(err);
      res.status(500).send('Error logging in');
    });
  } catch (err) {
    console.error(err);
    res.status(400).send('Invalid request');
  }
});

// Pharmacy operations
const pharmacyOperations = require('./services/pharmacyService');

app.get('/api/phyrmacy', authenticateJWT, async (req, res) => {
  try {
    const pharma = await pharmacyOperations.getAllPharmacies();
    res.send(pharma);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching pharmacies');
  }
});

// Get a specific pharmacy route
app.get('/api/phyrmacy/:id', authenticateJWT, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (!Number.isInteger(id)) return res.status(400).send({ message: 'Invalid ID' });
    const pharma = await pharmacyOperations.getPharmacyById(id);
    res.send(pharma);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching pharmacy');
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});