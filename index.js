const express = require("express")
const path = require("path")
const mongoose = require("mongoose")
const productRoutes = require("./routes/productRoutes")
const app = express()

const productModel = require("./models/productModel")

app.set("views", path.join(__dirname, "/views"))
app.set("view engine", "pug")

app.use(express.urlencoded({ extended: true }));


//db connect
//mongodb://localhost:27017
mongoose.connect("mongodb://localhost:27017/inventory",{
    useNewUrlParser: true,
    useUnifiedTopology: true},
    (err) => {
        if(!err) console.log("Connected to mongoDB");
        else console.log("Error connecting to mongoDB " + err)
    
    })


    app.get("/", async(req, res)=> {
        const products = await productModel.find({})
        console.log(products)
        res.render("index", {
            title: "Produce",
            data: products,
        })
    })











































































    app.listen(process.env.port || 3000)
    console.log("server running on port" + (process.env.port || 3000))
    