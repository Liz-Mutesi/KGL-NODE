const mongoose = require("mongoose")

const creditSaleSchema = mongoose.Schema({
    buyer: String,
    nin: String,
    location: String,
    contact: Number,
    itemName: String,
    type: String,
    quantity: Number,
    amount: Number,
    date: Date,
    agent: String,
    date: Date,
    
})

module.exports = mongoose.model("Credit", creditSaleSchema)


 