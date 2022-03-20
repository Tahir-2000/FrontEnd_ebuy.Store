const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    pTitle: {
        type: String,
        required: [true, "Please enter name"]
    },
    pDescription: {
        type: String
    },
    pCategory: {
        type: String,
        required: [true, "Please select cetegory"]
    },
    pPrice: {
        type: Number,
        required: [true, "Please enter price"]
    },
    pOldPrice: {
        type: Number,
    },
    pImagePath: {
        type: String,
        required: [true, "Please Upload image"]
    },
    pStock: {
        type: Number
    },
    pOnSale: {
        type: String,
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;