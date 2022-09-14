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
    dueDate: Date,
    agent: String,
    dispatchDate: Date,
    
})

module.exports = mongoose.model("Credit", creditSaleSchema)


 