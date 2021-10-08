const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    profile: String,

    email: {
        type: String,
        required: true,
        unique: true
    },
    
    mobile: String,

    //As Customer
    address: String,
    cart: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }],

    //As Seller
    storeLocation: String,
    items: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }]
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);