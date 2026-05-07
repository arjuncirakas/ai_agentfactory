const express = require('express');
const { Op } = require('sequelize');
const { Pharmacy } = require('../models');
const auth = require('../middleware/auth');

const router = express.Router();

router.put('/pharmacies/:id', auth, async (req, res) => {
  try {
    const id = req.params.id;
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'address', 'phone'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates' });
    }

    const pharmacy = await Pharmacy.findOne({
      where: { id: id },
    });

    if (!pharmacy) {
      return res.status(404).send({ error: 'Pharmacy not found' });
    }

    updates.forEach((update) => {
      pharmacy[update] = req.body[update];
    });

    await pharmacy.save();
    res.send(pharmacy);
  } catch (error) {
    res.status(500).send({ error: 'Failed to update pharmacy' });
  }
});

module.exports = router;