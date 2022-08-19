const express = require("express")
const workerModel = require("../models/workerModel")


const router = express.Router()

router.get("/", async (req, res) => {
    const workers = await workerModel.find({})
    res.render("workers", {
        title: "Employees", workers

    })
})
router.get("/new", async (req, res) => {
    const workers = await workerModel.find({})
    res.render("createWorker", {
        title: "Team", workers

    })
})
router.post("/new", async (req, res) => {
     const newWorker = new workerModel(req.body)
     await newWorker.save()
     res.redirect("/workers")
    })


module.exports = router 