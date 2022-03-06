const express = require('express');
const authController = require('./../controllers/authController');
const productController = require('./../controllers/productController');
const router = express.Router();

router.post('/addProduct',authController.protect , 
(req,res,next)=>{
    if(req.user.role === 'admin'){
        next();
    }else {
        return next(new AppError('Access denied! You are not Admin',401))
    }
},
productController.addProduct
);

router.post('/showProducts',authController.protect , 
(req,res,next)=>{
    if(req.user.role === 'admin'){
        next();
    }else {
        return next(new AppError('Access denied! You are not Admin',401))
    }
}, 
productController.showProducts
)

router.patch('/editProducts',authController.protect , 
(req,res,next)=>{
    if(req.user.role === 'admin'){
        next();
    }else {
        return next(new AppError('Access denied! You are not Admin',401))
    }
}, 
productController.editProducts
)

router.delete('/deleteProduct',authController.protect , 
(req,res,next)=>{
    if(req.user.role === 'admin'){
        next();
    }else {
        return next(new AppError('Access denied! You are not Admin',401))
    }
}, 
productController.deleteProducts
)

router.get('/ShowMore',productController.showMoreCategories);
router.get('/getSaleProducts',productController.getSaleProducts);
router.get('/getProducts', productController.getProducts);
router.get('/getCetegoryProducts', productController.getCategoryProducts);

module.exports = router;