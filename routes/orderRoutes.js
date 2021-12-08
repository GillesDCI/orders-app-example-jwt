const express = require('express');

const router = express.Router();

const controller = require('./../controllers/orderController')


router.post('/add', controller.createOrder)
router.get('/list', controller.listOrders);
router.get('/list/:customerid', controller.listOrderByCustomer);


module.exports = router;