const mongoose = require('mongoose');
const { Schema } = mongoose;
const baseSchema = require('../base/schema');

const schema = new Schema({
    ...baseSchema,
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    password: String,
    cartItems: {
        type: [{ 
            product: { type: Schema.Types.ObjectId, ref: 'Product' },
            quantity: { type: Number, default: 1, min: 1 }
        }],
        default: []
    },
    unpaidItems: [{ 
        products: [{
            product: { type: Schema.Types.ObjectId, ref: 'Product' },
            quantity: { type: Number, default: 1, min: 1 }
        }],
        total: Number 
    }],
    transactions: [{ type: Schema.Types.ObjectId, ref: 'Transaction'}],
    role: { type: String, default: 'Customer' }
});

module.exports = mongoose.model('User', schema);

