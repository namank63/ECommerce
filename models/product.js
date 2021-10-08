const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: String,
    price: Number,
    description: String,
    brand: String,
    model: String,
    category: String,
    units: Number,
    image: String,
    rating: Number,
    location: String,
    dealer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    tags: String,
    customers: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
});

module.exports = mongoose.model('Product', ProductSchema);