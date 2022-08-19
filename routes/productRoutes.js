const express = require("express")
const productModel = require("../models/productModel")


const router = express.Router()

router.get("/", async (req, res) => {
    const product = await productModel.find({})
    res.render("product", {
        title: "Stock", product

    })
})
router.get("/new", async (req, res) => {
    res.render("createProduct", {
        title: "Inventory",
    })
})
router.post("/new", async (req, res) => {
//  console.log(req.body)
 const newProduct = new productModel(req.body)
 await newProduct.save()
 res.redirect("/product")
})

module.exports = router 