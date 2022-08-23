const mongoose = require("mongoose")

const saleSchema = mongoose.Schema({
    customer: String,
    type: String,
    item: String,
    quantity: Number,
    price: Number,
    amount: Number,
})

module.exports = mongoose.model("Sale", saleSchema)


