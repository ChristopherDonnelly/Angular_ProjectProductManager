const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/products');

var ProductSchema = require('../models/product_model');

const Product = mongoose.model('Product', ProductSchema);