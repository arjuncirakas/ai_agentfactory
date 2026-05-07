const express = require("express");
const { param, body, validationResult } = require("express-validator");
const { authMiddleware } = require("../middleware/auth");
const { Inventory } = require("../models");

const router = express.Router();
router.use(authMiddleware);

router.get("/", async (req, res) => {
  try {
    const rows = await Inventory.findAll({ order: [["id", "ASC"]] });
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
    const row = await Inventory.findByPk(req.params.id);
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
    body("sku").isString().notEmpty(),
    body("name").isString().notEmpty(),
    body("quantity").optional().isInt({ min: 0 }),
    body("unit_price").optional().isFloat({ min: 0 }),
    body("supplier_id").optional().isInt(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    try {
      const row = await Inventory.create({
        sku: req.body.sku,
        name: req.body.name,
        quantity: req.body.quantity ?? 0,
        unitPrice: req.body.unit_price,
        supplierId: req.body.supplier_id,
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
    const row = await Inventory.findByPk(req.params.id);
    if (!row) return res.status(404).json({ message: "Not found" });
    await row.update({
      sku: req.body.sku ?? row.sku,
      name: req.body.name ?? row.name,
      quantity: req.body.quantity ?? row.quantity,
      unitPrice: req.body.unit_price ?? row.unitPrice,
      supplierId: req.body.supplier_id ?? row.supplierId,
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
    const row = await Inventory.findByPk(req.params.id);
    if (!row) return res.status(404).json({ message: "Not found" });
    await row.destroy();
    return res.status(204).send();
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Delete failed" });
  }
});

module.exports = router;
