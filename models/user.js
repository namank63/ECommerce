const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    profile: String,
    image: {
        type: String,
        default: "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
    },

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
    }],

    //As Admin
    uniquekey: String,
    officeLocation: String
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);

