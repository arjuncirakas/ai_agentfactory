const express = require('express');
const { Pool } = require('pg');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// User Data
const userPoolData = {
  Pool,
};

/**
 * Get user by email
 * @param {string} email - Email of the user
 * @param {string} password - Password of the user
 * @returns {Promise} - Users object with the user data
 */
userPoolData.getUserByEmail = async (email, password) => {
  const query = {
    text:
      `SELECT * FROM users WHERE email = $1 AND password = $2`,
    values: [email, password],
  };
  try {
    const result = await userPoolData.Pool.query(query);
    return result.rows[0];
  } catch (error) {
    if (error.code === 'PG_BAD_RAWSAMOUNT') throw new Error('Unexpected token Pool');
    else throw error;
  }
};

/**
 * Get user by id
 * @param {number} id - ID of the user
 * @returns {Promise} - User object with the user data
 */
userPoolData.getUserById = async (id) => {
  const query = {
    text:
      `SELECT * FROM users WHERE id = $1`,
    values: [id],
  };
  try {
    const result = await userPoolData.Pool.query(query);
    return result.rows[0];
  } catch (error) {
    if (error.code === 'PG_BAD_RAWSAMOUNT') throw new Error('Unexpected token Pool');
    else throw error;
  }
};

/**
 * Register pharmacy
 * @param {string} username - Username of the user
 * @param {string} password - Password of the user
 * @param {string} email - Email of the user
 * @returns {Promise} - User data with a new user ID if successful
 */
const register = async (username, password, email) => {
  const query = {
    text:
      `INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *`,
    values: [username, password, email],
  };
  try {
    const result = await userPoolData.Pool.query(query);
    return result.rows[0];
  } catch (error) {
    if (error.code === 'PG_BAD_RAWSAMOUNT') throw new Error('Unexpected token Pool');
    else throw error;
  }
};

/**
 * Login pharmacy
 * @param {string} email - Email of the user
 * @param {string} password - Password of the user
 * @returns {Promise} - Token with the user data if successful
 */
const login = async (email, password) => {
  const query = {
    text:
      `SELECT * FROM users WHERE email = $1 AND password = $2`,
    values: [email, password],
  };
  try {
    const result = await userPoolData.Pool.query(query);
    if (!result.rows[0]) throw new Error('Invalid credentials');
    const token = jwt.sign({ userId: result.rows[0].id }, process.env.SECRET_KEY, { expiresIn: '1h' });
    return { token };
  } catch (error) {
    if (error.code === 'PG_BAD_RAWSAMOUNT') throw new Error('Unexpected token Pool');
    else throw error;
  }
};

/**
 * Pharmacy Service
 */
const pharmacyService = {
  async registerPharmacy(data) {
    const email = data.email;
    const password = await bcrypt.hash(data.password, 10);
    try {
      if (!await userPoolData.getUserByEmail(email, password)) {
        return false;
      }
      await userPoolData.getUserById(parseInt(data.id));
      return true;
    } catch (error) {
      throw error;
    }
  },

  async loginPharmacy(email, password) {
    const token = await login(email, password);
    if (!token) throw new Error('Invalid credentials');
    return { token };
  },

  async getPharmacies() {
    try {
      const result = await userPoolData.Pool.query(
        `SELECT * FROM pharmacies WHERE id IN (
          SELECT pharmacy_id 
          FROM pharmacies
          JOIN orders ON pharmacies.id = orders.pharmacy_id
          JOIN payments ON orders.id = payments.order_id
        )`
      );
      return result.rows;
    } catch (error) {
      // Handle error
    }
  },
};

module.exports = pharmacyService;