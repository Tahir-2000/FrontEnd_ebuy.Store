const express = require('express');
const authController = require('./../controllers/authController');
const productController = require('./../controllers/productController');
const AppError = require('./../utils/appError');
const router = express.Router();

router.post('/addProduct', authController.protect, authController.restrictTo('admin'), productController.addProduct);
router.get('/showProducts', authController.protect, authController.restrictTo('admin'), productController.showProducts);
router.patch('/editProducts', authController.protect, authController.restrictTo('admin'), productController.editProducts);
router.delete('/deleteProduct', authController.protect, authController.restrictTo('admin'), productController.deleteProducts);

router.get('/ShowMore', productController.showMoreCategories);
router.get('/getSaleProducts', productController.getSaleProducts);
router.get('/getProducts', productController.getProducts);
router.get('/getCetegoryProducts', productController.getCategoryProducts);

module.exports = router;