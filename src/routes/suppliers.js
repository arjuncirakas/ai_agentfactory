const express = require("express");
const { param, body, validationResult } = require("express-validator");
const { authMiddleware } = require("../middleware/auth");
const { Supplier } = require("../models");

const router = express.Router();
router.use(authMiddleware);

router.get("/", async (req, res) => {
  try {
    const rows = await Supplier.findAll({ order: [["id", "ASC"]] });
    return res.json(rows);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "List failed" });
  }
});

router.get("/:id", [param("id").isInt()], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const row = await Supplier.findByPk(req.params.id);
    if (!row) return res.status(404).json({ message: "Not found" });
    return res.json(row);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Fetch failed" });
  }
});

router.post(
  "/",
  [
    body("name").isString().notEmpty(),
    body("contact_email").optional().isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    try {
      const row = await Supplier.create({
        name: req.body.name,
        contactEmail: req.body.contact_email,
      });
      return res.status(201).json(row);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ message: "Create failed" });
    }
  }
);

router.put("/:id", [param("id").isInt()], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const row = await Supplier.findByPk(req.params.id);
    if (!row) return res.status(404).json({ message: "Not found" });
    await row.update({
      name: req.body.name ?? row.name,
      contactEmail: req.body.contact_email ?? row.contactEmail,
    });
    return res.json(row);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Update failed" });
  }
});

router.delete("/:id", [param("id").isInt()], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const row = await Supplier.findByPk(req.params.id);
    if (!row) return res.status(404).json({ message: "Not found" });
    await row.destroy();
    return res.status(204).send();
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Delete failed" });
  }
});

module.exports = router;
