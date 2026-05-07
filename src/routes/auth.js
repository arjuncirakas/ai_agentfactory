const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const { User } = require("../models");

const router = express.Router();

router.post(
  "/register",
  [
    body("email").isEmail(),
    body("password").isLength({ min: 8 }),
    body("name").optional().isString(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { email, password, name } = req.body;
      const hash = await bcrypt.hash(password, 10);
      const user = await User.create({
        email,
        passwordHash: hash,
        name: name || null,
      });
      const token = jwt.sign(
        { sub: user.id, email: user.email },
        process.env.JWT_SECRET || "dev",
        { expiresIn: "8h" }
      );
      return res.status(201).json({
        token,
        user: { id: user.id, email: user.email, name: user.name },
      });
    } catch (e) {
      if (e.name === "SequelizeUniqueConstraintError" || String(e.message).includes("unique")) {
        return res.status(409).json({ message: "Email already registered" });
      }
      console.error(e);
      return res.status(500).json({ message: "Registration failed" });
    }
  }
);

router.post(
  "/login",
  [body("email").isEmail(), body("password").isString()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      const token = jwt.sign(
        { sub: user.id, email: user.email },
        process.env.JWT_SECRET || "dev",
        { expiresIn: "8h" }
      );
      return res.json({
        token,
        user: { id: user.id, email: user.email, name: user.name },
      });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ message: "Login failed" });
    }
  }
);

module.exports = router;
