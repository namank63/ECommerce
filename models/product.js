const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const user = require('./user');

const ProductSchema = new Schema({
    name: String,
    price: Number,
    brand: String,
    Model: String,
    Dealer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    tags: [{
        type: String
    }]
});

module.exports = mongoose.model('Product', ProductSchema);