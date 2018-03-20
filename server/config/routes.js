const product_ctrl = require('../controllers/product_controller');

var path = require('path');

module.exports = (app) => {

    app.get('/product/:id', (req, res) => {
        product_ctrl.findOne(req, res);
    });

    app.get('/product', (req, res) => {
        product_ctrl.findAll(req, res);
    });

    app.put('/product/:id', (req, res) => {
        product_ctrl.update(req, res);
    });

    app.post('/product', (req, res) => {
        product_ctrl.create(req, res);
    });

    app.delete('/product/:id', (req, res) => {
        product_ctrl.delete(req, res);
    });
    
    app.all("*", (req,res,next) => {
    	res.sendFile(path.resolve("./client/dist/index.html"))
	});

}        