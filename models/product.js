const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: String,
    price: Number,
    description: String,
    brand: String,
    model: String,
    category: String,
    units: Number, //Use by Dealer
    image: {
        type: String,
        default: "https://cdn2.iconfinder.com/data/icons/e-commerce-line-4-1/1024/open_box4-512.png"
    },
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
    }],
    incart: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
});

module.exports = mongoose.model('Product', ProductSchema);