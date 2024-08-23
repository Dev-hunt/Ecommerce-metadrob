const express = require('express');
const router = express.Router();
const Retailer = require('../models/Retailer');

// Create a retailer
router.post('/', async (req, res) => {
    const newRetailer = new Retailer(req.body);
    try {
        const savedRetailer = await newRetailer.save();
        res.status(201).json(savedRetailer);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all retailers
router.get('/', async (req, res) => {
    try {
        const retailers = await Retailer.find();
        res.status(200).json(retailers);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get a single retailer by ID
router.get('/:id', async (req, res) => {
    try {
        const retailer = await Retailer.findById(req.params.id);
        res.status(200).json(retailer);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update a retailer by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedRetailer = await Retailer.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updatedRetailer);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete a retailer by ID
router.delete('/:id', async (req, res) => {
    try {
        await Retailer.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Retailer deleted' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
