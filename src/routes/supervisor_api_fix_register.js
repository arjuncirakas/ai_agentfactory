const express = require('express');
const router = express.Router();
const { register } = require('../controllers/register.controller'); // Assuming this is where register function is defined
const jwt = require('jsonwebtoken');

router.post('/addPharmacy', async (req, res) => {
  try {
    const pharmacyData = req.body;
    // Validate the input data
    if (!pharmacyData.name || !pharmacyData.address || !pharmacyData.phone || !pharmacyData.email) {
      return res.status(400).send({ message: 'All fields are required' });
    }

    // Register a new pharmacy with the provided details
    const newPharmacy = await register(pharmacyData);

    if (newPharmacy) {
      res.send(newPharmacy);
    } else {
      res.status(400).send({ message: 'Failed to create new pharmacy' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

module.exports = router;