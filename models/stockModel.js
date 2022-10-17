
const mongoose = require("mongoose")

const stockSchema = mongoose.Schema({
    quantity: Number,
    available: Number,
    amount: Number,
    date: Date,
    time: String,
    recorded: Number,
    price: Number,
itemName: {
    type:String,
    required:true,
    trim:true,
    enum: ['Beans','G_nuts','Maize','Peas','Soyabean']
},
branch: {
    type:String,
    required: true,
    trim: true,
    enum: ['Jinja', 'Mubende',]
  
},
type: {
    type: String,
    required: true,
    trim: true,
    enum: ['Cereals', 'Legumes']
}
})

module.exports = mongoose.model("Stock",stockSchema)


