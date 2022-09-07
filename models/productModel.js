
const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    name: String,
    type: String,
    quantity: Number,
    cost: Number,
    date: Date,
    time: String,
    nameOfDealer: String,
    branch: String,
    contactNumber: Number,
    price: Number,
})

module.exports = mongoose.model("Product", productSchema)


