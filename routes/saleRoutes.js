const express = require("express")
const connectEnsureLogin = require("connect-ensure-login");
const saleModel = require("../models/saleModel")


const router = express.Router()

router.get("/", async (req, res) => {
    const sale = await saleModel.find({})
    res.render("sale", {
        title: "Sales", sale

    })
})
router.get("/new-order", async (req, res) => {
    res.render("createSale", {
        title: "New Order",
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
router.get("/sales-list",
async (req, res)=> {
    try{
        let items = await saleModel.find()
        res.render("salesList", {sale : items})

    }
    catch(err){
        console.log(err)
        res.send("Could not retrieve order list")
    }
})
//delete route
router.post("/sales-list",
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
router.get("/editSales/:id", connectEnsureLogin.ensureLoggedIn(),
async (req, res)=>{
    try {
        const currentOrder = await saleModel.findById({_id:req.params.id})
        res.render("editSales", {order:currentOrder})
    }
    catch {error}{
        
    }
})
router.post("/editSales", connectEnsureLogin.ensureLoggedIn(),
async (req, res)=>{
    try {
        await workerModel.findByIdAndUpdate({_id:req.query.id}, req.body)
       res.redirect("/sale/sales-list")
    }
    catch {err}{
         
    }
})



module.exports = router 