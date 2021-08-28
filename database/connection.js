const mongoose = require("mongoose");
const catchAsync = require('../utils/catchAsync');
require('dotenv').config();

const DataBaseUrl = process.env.DATABASE_OFFLINE_URL;

const DataBaseConnect = catchAsync(async() => {
    await mongoose.connect(DataBaseUrl, { useUnifiedTopology: true, useNewUrlParser: true });
    console.log("DataBase Connected!!");
});

module.exports = DataBaseConnect;