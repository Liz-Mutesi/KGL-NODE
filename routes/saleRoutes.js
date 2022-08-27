const express = require("express")
const saleModel = require("../models/saleModel")


const router = express.Router()

router.get("/", async (req, res) => {
    const sale = await saleModel.find({})
    res.render("sale", {
        title: "Orders", sale

    })
})
router.get("/new-order", async (req, res) => {
    res.render("createSale", {
        title: "New Order",
    })
})
router.post("/new-order", async (req, res) => {
    try{
        const newSale = new saleModel(req.body)
        await newSale.save()
        res.redirect("/sale/new-order")
        console.log(req.body)
}
catch(err){
    res.status(400).render("createSale")
}
})

module.exports = router 