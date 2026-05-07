const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

exports.validateInput = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const existingUser = await pool.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *`,
      [name, email, hashedPassword]
    );

    return res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.checkPassword = async ({ password }, userToken) => {
  try {
    const token = userToken;
    if (!token || !userToken) {
      return false;
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const isValidPassword = await bcrypt.compare(password, decoded.password);

    return isValidPassword;
  } catch (error) {
    console.error(error);
    return false;
  }
};

exports.createPatientService = async ({ patientData }) => {
  try {
    const existingPatient = await pool.query(
      `INSERT INTO patients (name, email) VALUES ($1, $2) RETURNING *`,
      [patientData.name, patientData.email]
    );

    if (!existingPatient.rows.length > 0) {
      return res.status(400).json({ error: 'Patient already registered' });
    }

    const hashedPassword = await bcrypt.hash(patientData.password, 10);
    await pool.query(
      `UPDATE patients SET password = $1 WHERE id = $2 RETURNING *`,
      [hashedPassword, existingPatient.rows[0].id]
    );

    return res.status(201).json({ message: 'Patient created successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
