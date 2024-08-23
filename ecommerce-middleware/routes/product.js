const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Retailer = require('../models/Retailer');

// Create a product
router.post('/', async (req, res) => {
    const { name, description, price, retailerId, categoryId } = req.body;

    try {
        const retailer = await Retailer.findById(retailerId);
        if (!retailer) {
            return res.status(404).json({ error: 'Retailer not found' });
        }

        const newProduct = new Product({
            name,
            description,
            price,
            retailer: retailerId,
            category: categoryId,
        });

        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find()
            .populate('retailer', 'name')
            .populate('category', 'name');
        res.status(200).json(products);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get a single product by ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate('retailer', 'name')
            .populate('category', 'name');
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update a product by ID
router.put('/:id', async (req, res) => {
    const { name, description, price, retailerId, categoryId } = req.body;

    try {
        const retailer = await Retailer.findById(retailerId);
        if (!retailer) {
            return res.status(404).json({ error: 'Retailer not found' });
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { name, description, price, retailer: retailerId, category: categoryId },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


// Delete a product by ID
router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
