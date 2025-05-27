const express = require('express');
const router = express.Router();
const salesController = require('../controllers/salesController');

router.get('/', salesController.getAllSales);
router.get('/range', salesController.getSalesByDateRange);
router.get('/revenue/summary', salesController.getRevenueSummary);
router.get('/revenue/category', salesController.getRevenueByCategory);
router.get('/product/:id', salesController.getSalesByProduct);
router.get('/category/:category', salesController.getSalesByCategory);

module.exports = router;
