
const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    quantity: Number,
    cost: Number,
    amount: Number,
    date: Date,
    time: String,
    nameOfDealer: String,
    contactNumber: Number,
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

module.exports = mongoose.model("Product", productSchema)


