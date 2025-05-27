const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

router.get('/', inventoryController.getAllInventory);
router.get('/low-stock', inventoryController.getLowStock);
router.get('/:id', inventoryController.getInventoryById);
router.get('/history/:id', inventoryController.getInventoryHistory);
router.put('/update/:id', inventoryController.updateStock);

module.exports = router;
