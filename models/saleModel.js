const mongoose = require("mongoose")

const saleSchema = mongoose.Schema({
    buyer: String,
    quantity: Number,
    agent: String,
    amount: Number,
    date: Date,
    time: String,

    itemName: {
        type:String,
        required:true,
        trim:true,
        enum: ['Beans','G_nuts','Maize','Peas','Soyabean']
    }
    })

module.exports = mongoose.model("Sale", saleSchema)


