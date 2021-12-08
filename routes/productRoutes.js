const express = require('express');

const router = express.Router();

const controller = require('./../controllers/productController')


router.post('/add', controller.createProduct);
router.get('/list', controller.listProducts);

module.exports = router;