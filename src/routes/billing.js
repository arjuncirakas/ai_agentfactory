const express = require("express");
const { param, body, validationResult } = require("express-validator");
const { authMiddleware } = require("../middleware/auth");
const { Billing } = require("../models");

const router = express.Router();
router.use(authMiddleware);

router.get("/", async (req, res) => {
  try {
    const rows = await Billing.findAll({ order: [["id", "ASC"]] });
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
    const row = await Billing.findByPk(req.params.id);
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
    body("amount").isFloat({ min: 0 }),
    body("patient_id").optional().isInt(),
    body("description").optional().isString(),
    body("status").optional().isString(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    try {
      const row = await Billing.create({
        patientId: req.body.patient_id,
        amount: req.body.amount,
        description: req.body.description,
        status: req.body.status || "open",
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
    const row = await Billing.findByPk(req.params.id);
    if (!row) return res.status(404).json({ message: "Not found" });
    await row.update({
      patientId: req.body.patient_id ?? row.patientId,
      amount: req.body.amount ?? row.amount,
      description: req.body.description ?? row.description,
      status: req.body.status ?? row.status,
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
    const row = await Billing.findByPk(req.params.id);
    if (!row) return res.status(404).json({ message: "Not found" });
    await row.destroy();
    return res.status(204).send();
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Delete failed" });
  }
});

module.exports = router;
