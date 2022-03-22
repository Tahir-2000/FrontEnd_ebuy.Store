const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const Product = require('./productModel');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter userName']
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Please provide emanil"],
        validate: [validator.isEmail, 'Please Provide a valid Email']
    },
    password: {
        type: String,
        min: 4,
        max: 12,
        required: [true, "Please enter password"]
    },
    confirmPassword: {
        type: String,
        validate: {
            validator: function(val) {
                return val === this.password
            },
            message: 'Passwords are not same'
        }
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin']
    },
    address: {
        name: { type: String },
        contact: { type: String },
        address: { type: String },
        cityName: { type: String },
        provinceName: { type: String },

    },
    orderedProducts: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Product'

    }],
    passwordResetToken: String,
    passwordResetExpires: Date,
    passwordChangedAt: Date

});

userSchema.pre('save', async function(next) {
    // Only run this function if password was actually modified
    if (!this.isModified('password')) return next();

    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);

    // Delete passwordConfirm field
    this.passwordConfirm = undefined;
    next();
});

userSchema.pre('save', function(next) {
    if (!this.isModified('password') || this.isNew) return next();

    this.passwordChangedAt = Date.now() - 1000;
    next();
});

userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {

    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);

        return JWTTimestamp < changedTimestamp;
    }

    return false;

};

userSchema.methods.createPasswordResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    console.log({ resetToken }, this.passwordResetToken);

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;