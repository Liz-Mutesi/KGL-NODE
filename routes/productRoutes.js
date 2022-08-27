const express = require("express")
const productModel = require("../models/productModel")


const router = express.Router()

router.get("/", async (req, res) => {
    const product = await productModel.find({})
    res.render("product", {
        title: "Purchases", product

    })
})
router.get("/product-form", (req, res)=> {
    res.render("productForm")
})
router.get("/product-list", (req, res)=> {
    res.render("productList")
})

//error handling(try....catch)
router.post("/newProduct", async (req, res)=> {
    try{
        const newProduct = new productModel(req.body)
        await newProduct.save()
        res.redirect("/product-form")
        console.log(req.body)
    }
    catch(err){
        res.status(400).render("productForm")
        
    }
})

router.get("/product-list", async (req, res)=> {
    try{
        let items = await productModel.find()
        res.render("productList", {items : items})

    }
    catch(err){
        console.log(err)
        res.send("Could not retrieve product list")
    }
})
//delete route
router.post("/product-list", async (req, res)=>{
    try{
        await productModel.deleteOne({
            _id: req.body._id 
        })
        res.redirect("/product/product-list")
    }
    catch(err){
        res.status(400).send("Unable to delete item from the database")
    }
})





module.exports = router 