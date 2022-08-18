
const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    name: String,
    code: Number,
    quantity: Number,
    price: Number,
    amount: Number,
})

module.exports = mongoose.model("Product", productSchema)


