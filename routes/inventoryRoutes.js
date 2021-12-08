const express = require('express');

const router = express.Router();

const controller = require('./../controllers/inventoryController')


router.post('/add', controller.createInventory);
router.get('/list', controller.listInventory);
router.get('/product/:productid', controller.getInventoryByProduct)

module.exports = router;