const express = require('express');
const authController = require('./../controllers/authController');
const productController = require('./../controllers/productController');
const router = express.Router();

router.post('/addProduct', authController.protect, authController.restrictTo('admin'), productController.addProduct);
router.patch('/editProducts', authController.protect, authController.restrictTo('admin'), productController.editProducts);
router.get('/showProducts', authController.protect, authController.restrictTo('admin'), productController.showProducts);
router.delete('/:productId', authController.protect, authController.restrictTo('admin'), productController.deleteProducts);

router.get('/ShowMore', productController.showMoreCategories);
router.get('/getProducts', productController.getProducts);
router.get('/getSaleProducts', productController.getSaleProducts);
router.get('/getCetegoryProducts', productController.getCategoryProducts);
router.get('/:productId', productController.getOneProduct);


module.exports = router;