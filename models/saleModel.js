const mongoose = require("mongoose")

const saleSchema = mongoose.Schema({
    buyer: String,
    itemName: String,
    quantity: Number,
    agent: String,
    amount: Number,
    date: Date,
    time: String,
})

module.exports = mongoose.model("Sale", saleSchema)


