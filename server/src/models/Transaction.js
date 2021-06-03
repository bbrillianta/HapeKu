const mongoose = require('mongoose');
const { Schema } = mongoose;
const baseSchema = require('../base/schema');

const schema = new Schema({
    ...baseSchema,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    products: [{
        product: { type: Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, default: 1, min: 1 }
    }],
    total: Number,
    payment: {
        confirmation: String,
        verified: { type: Boolean, default: false }
    },
    delivered: { type: Boolean, default: false }
});

module.exports = mongoose.model('Transaction', schema);