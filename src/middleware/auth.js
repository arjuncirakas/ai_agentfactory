const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const db = require('../services/db');
require('dotenv').config();

const authenticate = async (req, res, next) => {
  try {
    const token = getTokenFromRequest(req);
    if (!token) {
      return res.status(401).send({ message: 'Access denied. No JWT token provided.' });
    }

    const decoded = verifyToken(token);
    req.user = decoded;

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Internal server error' });
  }
};

const getTokenFromRequest = (req) => {
  const authorizationHeader = req.header('Authorization');
  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    return null;
  }
  return authorizationHeader.replace('Bearer ', '');
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.SECRET_KEY);
};

const protectRoute = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await getUserFromDatabase(userId);
    if (!user) {
      return next();
    }

    const supplierId = req.user.supplierId;
    const supplier = await getSupplierFromDatabase(supplierId);
    if (!supplier) {
      return next();
    }

    req.user.supplier = supplier;
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Internal server error' });
  }
};

const getUserFromDatabase = async (userId) => {
  const query = 'SELECT * FROM users WHERE id = $1';
  const result = await db.query(query, [userId]);
  return result.rows[0];
};

const getSupplierFromDatabase = async (supplierId) => {
  const query = 'SELECT * FROM suppliers WHERE id = $1';
  const result = await db.query(query, [supplierId]);
  return result.rows[0];
};

module.exports = { authenticate, protectRoute };