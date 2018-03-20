const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    title:  { type: String, required: [true, "Product title is required"], minlength: [4, "Product title must be at least 4 characters long"] },
    price:  { type: Number, required: [true, "Product price is required"] },
    image_URL:  { type: String, default: 'http://via.placeholder.com/165x115?text=No%20Image' }
}, {timestamps: true });
