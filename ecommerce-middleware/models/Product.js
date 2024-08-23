const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    retailer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Retailer',
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
});

module.exports = mongoose.model('Product', ProductSchema);
