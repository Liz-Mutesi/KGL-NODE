const express = require("express")
const stockModel = require("../models/stockModel")
const productModel = require("../models/productModel")
const{isManager, isManagerOrSalesAgent} = require('../authz/authorization')
const connectEnsureLogin = require("connect-ensure-login");


const router = express.Router()

router.get("/", connectEnsureLogin.ensureLoggedIn(), isManagerOrSalesAgent,
async (req, res) => {
    const stock = await stockModel.find({})
    res.render("stock", {
        title: "inventory", stock

    })
})
router.get("/new-stock",connectEnsureLogin.ensureLoggedIn(), isManager, 
 async (req, res) => {
    const productList = await productModel.find({branch:req.user.branch})
    res.render("stockForm", {
        title: "New Stock",
        stockList,
        productList
    })
})
// router.get("/new-order",connectEnsureLogin.ensureLoggedIn(), isManagerOrSalesAgent, 
//  async (req, res) => {
//     const productList = await productModel.find({branch:req.user.branch})
//     res.render("createSale", {
//         title: "New Order",
//         productList
//     })
// })
router.post("/new-order", async (req, res)=> {
    try{
        const newOrder = new saleModel(req.body)
        await newOrder.save()
        res.redirect("/sale/new-order")
        console.log(req.body)
    }
    catch(err){
        res.status(400).render("createSale")
        
    }
})

//error handling(try....catch)
router.post("/stock/newStock", connectEnsureLogin.ensureLoggedIn(), isManager, async (req, res)=> {
    try{
        const newStock = new stockModel(req.body)
        await newStock.save()
        res.redirect("/stock/stock-form")
        console.log(req.body)
    }
    catch(err){
        res.status(400).render("stockForm")
        
    }
})
router.post("/new-stock", async (req, res)=> {
    try{
        const newStock = new stockModel(req.body)
        await newStock.save()
        res.redirect("/stock/new-stock")
        console.log(req.body)
    }
    catch(err){
        res.status(400).render("stockForm")
        
    }
})
router.get("/stock-list", connectEnsureLogin.ensureLoggedIn(), isManager, async (req, res)=> {
    try{
        let stocks = await stockModel.find({
       
        })
        let name = req.user.firstname
        let  branch = req.user.branch
        let totalStock = await stockModel.aggregate([
             {
                '$group':{
                     _id:'$all',
                     totalExpenses:{$sum:'$amount'},
                     totalTonnage: {$sum:'$quantity'}
                 }
             }
         ])
        res.render("stockList", {
            stocks : stocks,
            totalStock: totalStock[0],
            name:name,
            branch
        })
       

    }
    catch(err){
        console.log(err)
        res.send("Could not retrieve stock list")
    }
})
//delete route
router.post("/stock/stock-list", async (req, res)=>{
    try{
        await stockModel.deleteOne({
            _id: req.body._id 
        })
        res.redirect("/stock/stock-list")
    }
    catch(err){
        res.status(400).send("Unable to delete item from the database")
    }
})
//edit route
 router.get("/editstock/:id", connectEnsureLogin.ensureLoggedIn(), isManager,
 async (req, res)=>{
     try {
         const currentstock = await stockModel.findOne({_id:req.params.id})
         res.render("editstock", {stock:currentstock})
    }
     catch {error}{
        
     }
 })
 router.post("/editstock",
 async (req, res)=>{
     try {
         await stockModel.findOneAndUpdate({_name:req.query.name}, req.body)
       res.redirect("/stock/stock-list")
     }
    catch {err}{
         
     }
 })




module.exports = router 