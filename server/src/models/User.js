const mongoose = require('mongoose');
const { Schema } = mongoose;
const baseSchema = require('../base/schema');

const schema = new Schema({
    ...baseSchema,
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    password: String,
    address: { type: String, default: '' },
    phone_number: { type: String, default: '' },
    cartItems: {
        type: [{ 
            product: { type: Schema.Types.ObjectId, ref: 'Product' },
            quantity: { type: Number, default: 1, min: 1 },
            checkout: { type: Boolean, default: false }
        }],
        default: []
    },
    unpaidItems: {
        type: [{
            products: [{
                product: { type: Schema.Types.ObjectId, ref: 'Product' },
                quantity: { type: Number, default: 1, min: 1 }
            }],
            address: String 
        }],
        default: []
    },
    transactions: [{ type: Schema.Types.ObjectId, ref: 'Transaction'}],
    notifications: [String],
    role: { type: String, default: 'Customer' }
});

module.exports = mongoose.model('User', schema);

