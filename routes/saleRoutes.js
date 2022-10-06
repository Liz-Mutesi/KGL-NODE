const express = require("express")
const connectEnsureLogin = require("connect-ensure-login");
const saleModel = require("../models/saleModel")
const creditSaleModel = require("../models/creditSaleModel")
const productModel = require("../models/productModel");
const { isManager, isManagerOrSalesAgent } = require("../authz/authorization");


const router = express.Router()

router.get("/", async (req, res) => {
    const sale = await saleModel.find({})
    res.render("sale", {
        title: "Sales", sale

    })
})
//cash sale route
router.get("/new-order",connectEnsureLogin.ensureLoggedIn(), isManagerOrSalesAgent, 
 async (req, res) => {
    const productList = await productModel.find({branch:req.user.branch})
    res.render("createSale", {
        title: "New Order",
        productList
    })
})
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
router.get("/sales-list", connectEnsureLogin.ensureLoggedIn(), isManagerOrSalesAgent,
async (req, res)=> {
    try{
        let items = await saleModel.find()
        let name = req.user.firstname
        let branch = req.user.branch
        let totalSales = await saleModel.aggregate([
            {
                '$group':{
                    _id:'$all',
                    totalRevenue:{$sum:'$amount'},
                    totalTonnage: {$sum:'$quantity'}
                }
            }
        ])
        let totalPurchases = await productModel.aggregate([
            {
                '$group':{
                    _id:'$all',
                    totalExpenses:{$sum:'$cost'},
                    totalTonnage: {$sum:'$quantity'}
                }
            }
        ])
        res.render("salesList", {
            sale : items,
            totalSales: totalSales[0],
            totalPurchases: totalPurchases[0],
            name:name,
            branch
        })

    }
    catch(err){
        console.log(err)
        res.send("Could not retrieve order list")
    }
})


//credit sale route
router.get("/new-credit", connectEnsureLogin.ensureLoggedIn(), isManagerOrSalesAgent, 
async (req, res) => {
    res.render("creditSale", {
        title: "New Credit Sale",
    })
})

router.get("/credit-list", connectEnsureLogin.ensureLoggedIn(), isManagerOrSalesAgent,
async (req, res)=> {
    try{
        let creditSale = await creditSaleModel.find()
        res.render("creditList", {creditSale : creditSale})

    }
    catch(err){
        console.log(err)
        res.send("Could not retrieve credit list")
    }
    
})
router.post("/new-credit", async (req, res)=> {
    try{
        const newCredit = new creditSaleModel(req.body)
        await newCredit.save()
        res.redirect("/sale/new-credit")
        console.log(req.body)
    }
    catch(err){
        res.status(400).render("creditSale")
        
    }
})
//delete route
router.post("/sales-list", connectEnsureLogin.ensureLoggedIn(), isManagerOrSalesAgent,
async (req, res)=>{
    try{
        await saleModel.deleteOne({
            _id: req.body._id 
        })
        res.redirect("/sale/sales-list")
    }
    catch(err){
        res.status(400).send("Unable to delete item from the database")
    }
})
//edit route
router.get("/editSales/:id",
async (req, res)=>{
    try {
        const currentOrder = await saleModel.findById({_id:req.params.id})
        res.render("editSales", {order:currentOrder})
    }
    catch (error){
        
    }
})
router.post("/editSales",
async (req, res)=>{
    try {
        console.log(req.query)
        await saleModel.findByIdAndUpdate({_id:req.query.id}, req.body)
       res.redirect("/sale/sales-list")
    }
    catch (err){
        console.log(err)
    }
})
//Edit Credit Sales
router.get("/editCredit/:id",
async (req, res)=>{
    try {
        const currentCredit = await creditSaleModel.findById({_id:req.params.id})
        res.render("editCredit", {creditSale : currentCredit})
    }
    catch (error){
        
    }
})
router.post("/editCredit",
async (req, res)=>{
    try {
        console.log(req.query)
        await creditSaleModel.findByIdAndUpdate({_id:req.query.id}, req.body)
       res.redirect("/sale/credit-list")
    }
    catch (err){
        console.log(err)
    }
})
//Delete route credit-list
router.post("/credit-list", connectEnsureLogin.ensureLoggedIn(), isManagerOrSalesAgent,
async (req, res)=>{
    try{
        await saleModel.deleteOne({
            _id: req.body._id 
        })
        res.redirect("/sale/credit-list")
    }
    catch(err){
        res.status(400).send("Unable to delete item from the database")
    }
})


module.exports = router
