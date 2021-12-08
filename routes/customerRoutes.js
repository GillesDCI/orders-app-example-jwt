const express = require('express');

const router = express.Router();

const controller = require('./../controllers/customerController')

//Insert a new customer
router.post('/add', controller.createCustomer);
router.patch('/update/:id', controller.updateCustomerById);
router.get('/list', controller.listCustomers);


module.exports = router;