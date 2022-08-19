
const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    name: String,
    type: String,
    quantity: Number,
    price: Number,
    amount: Number,
})

module.exports = mongoose.model("Product", productSchema)


