const mongoose = require('mongoose');
const { Schema } = mongoose;
const baseSchema = require('../base/schema');

const schema = new Schema({
    ...baseSchema,
    name: String,
    description: String,
    images: [String],
    thumbnail: String,
    price: Number,
    quantity: { type: Number, default: 0 }
});

module.exports = mongoose.model('Product', schema);