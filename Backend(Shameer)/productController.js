const Product = require('./../models/productModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('./../utils/appError');


exports.addProduct = catchAsync(async(req, res) => {

    let { pTitle, pCategory, pPrice, pImagePath, pDescription, pOnSale, pOldPrice } = req.body;
    if (pOldPrice === '' || pOldPrice === null) {
        pOldPrice = ' '
    }

    if (!pTitle || !pCategory || !pPrice || !pImagePath) {
        return next(new AppError('please fill all required fields', 400))
    }
    const product = await Product.create({
        pPrice: pPrice,
        pTitle: pTitle,
        pCategory: pCategory,
        pImagePath: pImagePath,
        pDescription: pDescription,
        pOnSale: pOnSale,
        pOldPrice: pOldPrice
    });
    res.status(201).json({
        status: 'success',
        product
    });
});
exports.editProducts = catchAsync(async(req, res) => {
    const requestBody = {...req.body } // hard copy of req.body
    if (requestBody.pOldPrice === '') {
        requestBody.pOldPrice = ' '
    }
    const keys = Object.keys(requestBody) // getting out all property names as keys  of object request object
        // We already filtered out those properties from object to be send here from front End that have empty data ""
    keys.forEach((key, index) => { // looping out object by its property keys
        if (requestBody[key] === '' || requestBody[key] === null) { // important '' != ' '
            delete requestBody[key]; // deleting property as well as its value which should be either null  or 'withoutSpace' means data that is empty
        } // 'withSpace' or "withSpace" means it is string data not empty
    })

    let products = await Product.findByIdAndUpdate(req.body._id, requestBody, { useFindAndModify: false });
    if (!products) {
        return (new AppError('can not get the products ', 500))
    }
    res.status(200).json({
        status: 'success',
        products
    })

});
exports.showProducts = catchAsync(async(req, res) => {

    let products = await Product.find(req.body).sort([
        ['pTitle', 1]
    ]);
    if (!products) {
        return (new AppError('can not get the products ', 500))
    }

    res.status(200).json({
        status: 'success',
        data: {
            products
        }
    });
});

exports.deleteProducts = catchAsync(async(req, res) => {

    await Product.findByIdAndDelete(req.params.id);

    res.status(204).json({
        status: 'success',
        data: null
    });


});

exports.showMoreCategories = catchAsync(async(req, res) => {

    const categories = await Product.find(pCategory);

    res.status(200).json({
        status: 'success',
        data: {
            categories
        }
    });

});

exports.getProducts = catchAsync(async(req, res) => {

    const products = await Product.find();

    res.status(200).json({
        status: 'success',
        data: {
            products
        }
    });

});

exports.getSaleProducts = catchAsync(async(req, res) => {

    const products = await Product.find({ pStock: { $gt: 0 } }).where('pOnSale').in('pOnSale');

    if (!products) {
        return new AppError("No Products On Sale", 204);
    }

    res.status(200).json({
        status: 'success',
        data: {
            products
        }
    });

});

exports.getCategoryProducts = catchAsync(async(req, res) => {

    const [category1, category2] = req.body.category.split(",");
    const category = [category1, category2];

    if (!category) {
        return new AppError("Please Select Category", 400);
    }
    const products = await Product.find({ pStock: { $gt: 0 } }).where('pCategory').in('category');
    if (!products) {
        return new AppError(`No products for ${category} category`, 204);
    }
    res.status(200).json({
        status: 'success',
        data: {
            products
        }
    });

});