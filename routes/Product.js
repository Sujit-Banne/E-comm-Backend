const express = require('express');
const router = express.Router();
const productSchema = require('../models/product');


// Add a product
router.post('/products', async (req, res) => {
    try {
        const { name, price, image, totalAvailable } = req.body;

        // Validation (if necessary)
        if (!name || !price || !image || !totalAvailable) {
            return res.status(400).json({ error: 'Invalid product data' });
        }

        const newProduct = new productSchema({
            productId: generateProductId(),
            name,
            price,
            image,
            totalAvailable,
        });

        await newProduct.save();
        res.json(newProduct);
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ error: 'Failed to add product' });
    }
});

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await productSchema.find();
        if (!products) {
            res.status(404).json({ message: 'No products found' });
        } else {
            res.status(200).json(products);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});



// Generate a unique product ID
function generateProductId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

module.exports = router;
