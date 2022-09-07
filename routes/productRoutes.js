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

//error handling(try....catch)
router.post("/newProduct", async (req, res)=> {
    try{
        const newProduct = new productModel(req.body)
        await newProduct.save()
        res.redirect("/product/product-form")
        console.log(req.body)
    }
    catch(err){
        res.status(400).render("productForm")
        
    }
})

router.get("/product-list", async (req, res)=> {
    try{
        let products = await productModel.find()
        res.render("productList", {products : products})

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
//edit route
// router.get("/editProduct/:name", connectEnsureLogin.ensureLoggedIn(),
// async (req, res)=>{
//     try {
//         const currentProduct = await productModel.findOneAndUpdate({_name:req.params.name})
//         res.render("editProduct", {product:currentProduct})
//     }
//     catch {error}{
        
//     }
// })
// router.post("/editProduct", connectEnsureLogin.ensureLoggedIn(),
// async (req, res)=>{
//     try {
//         await productModel.findOneAndUpdate({_name:req.query.name}, req.body)
//        res.redirect("/product/product-list")
//     }
//     catch {err}{
         
//     }
// })




module.exports = router 