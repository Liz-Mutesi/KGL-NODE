const express = require("express")
const productModel = require("../models/productModel")
const{isManager} = require('../authz/authorization')
const connectEnsureLogin = require("connect-ensure-login");


const router = express.Router()

router.get("/", connectEnsureLogin.ensureLoggedIn(), isManager,
async (req, res) => {
    const product = await productModel.find({})
    res.render("product", {
        title: "Purchases", product

    })
})
router.get("/product-form", connectEnsureLogin.ensureLoggedIn(), isManager, 
async (req, res)=> {
try {
    res.render("productForm")
} catch (error) {
    
}
  
})

//error handling(try....catch)
router.post("/newProduct", connectEnsureLogin.ensureLoggedIn(), isManager, async (req, res)=> {
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

router.get("/product-list", connectEnsureLogin.ensureLoggedIn(), isManager, async (req, res)=> {
    try{
        let products = await productModel.find({
       
        })
        let name = req.user.firstname
        let  branch = req.user.branch
        let totalPurchases = await productModel.aggregate([
            {
                '$group':{
                    _id:'$all',
                    totalExpenses:{$sum:'$amount'},
                    totalTonnage: {$sum:'$quantity'}
                }
            }
        ])
        res.render("productList", {
            products : products,
            totalPurchases: totalPurchases[0],
            name:name,
            branch
        })
       

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
 router.get("/editProduct/:id", connectEnsureLogin.ensureLoggedIn(), isManager,
 async (req, res)=>{
     try {
         const currentProduct = await productModel.findOne({_id:req.params.id})
         res.render("editProduct", {product:currentProduct})
    }
     catch {error}{
        
     }
 })
 router.post("/editProduct",
 async (req, res)=>{
     try {
         await productModel.findOneAndUpdate({_name:req.query.name}, req.body)
       res.redirect("/product/product-list")
     }
    catch {err}{
         
     }
 })




module.exports = router 