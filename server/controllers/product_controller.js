const mongoose = require('mongoose');
const Product = mongoose.model('Product');

module.exports = {
    findAll: (req, res) => {
        Product.find({}, (err, products) => {
            if(err){
                res.json({message: "Error", error: err});
            }else{
                res.json({message: "Success", products: products});
            }
        });
    },
    findOne: (req, res) => {
        console.log('Get Product By Id: ' + req.params.id)
        Product.findById({_id: req.params.id}, (err, product) => {
            if(err){
                res.json({message: "Error", error: err});
            }else{
                res.json({message: "Success", product: product});
            }
        });
    },
    update: (req, res) => {
        var query = {'_id': req.params.id};

        console.log('Attempting to update Product by Id: '+req.body.title);
        
        // { $set: { name: 'jason bourne' }}

        Product.findByIdAndUpdate(query, { title: req.body.title, price: req.body.price, image_URL: req.body.image_URL }, {upsert: true, new: true, runValidators: true}, function(err, product){
            if(err) {
                console.log('Something went wrong, could not update Product: '+req.params.id);
                console.log("Returned error", err);
                res.json({message: "Error", error: err});
            } else {
                console.log(product)
                res.json({message: "Success", product: product});
            }
        });
    
    },
    create: (req, res) => {
        console.log(`Attempt Create new Product: ${req.body.title} - Price: ${req.body.price} - Image URL:  ${req.body.image_URL}`)
        var product = new Product({title: req.body.title, price: req.body.price, image_URL: req.body.image_URL});

        product.save((err) => {
            if(err) {
                console.log('Something went wrong while trying to create new product: ' + req.body);
                console.log("Returned error", err);
                res.json({message: "Error", error: err});
            } else {
                console.log('Successfully created a new product: ' + req.body);
                res.json({message: "Success", product: product});
            }
        });
    },
    delete: (req, res) => {
        Product.remove({ _id: req.params.id }, (err, product) => {
            if(err){
                console.log('Something went wrong, could not remove product: '+req.params.id);
                console.log("Returned error", err);
                res.json({message: "Error", error: err});
            }else{
                console.log('Successfully deleted an product!: '+req.params.id);
                res.json({message: "Success", product: product});
            }
        });
    }
} 