const express = require("express")
const saleModel = require("../models/saleModel")


const router = express.Router()

router.get("/", async (req, res) => {
    const sale = await saleModel.find({})
    res.render("sale", {
        title: "Orders", sale

    })
})
router.get("/new", async (req, res) => {
    res.render("createSale", {
        title: "New Order",
    })
})
router.post("/new", async (req, res) => {
//  console.log(req.body)
 const newSale = new saleModel(req.body)
 await newSale.save()
 res.redirect("/sale")
})

module.exports = router 