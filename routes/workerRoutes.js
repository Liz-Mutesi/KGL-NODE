const express = require("express")
const workerModel = require("../models/workerModel")



const router = express.Router()

router.get("/", async (req, res) => {
    const workers = await workerModel.find({})
    res.render("workerList", {
        title: "Employees", workers

    })
})
 router.get("/profile", (req, res)=> {
     res.render("test")
})
router.get("/worker-form", (req, res)=> {
    res.render("workerForm")
})

//error handling(try....catch)
router.post("/newWorker", async (req, res)=> {
    try{
        const newWorker = new workerModel(req.body)
        await newWorker.save()
        res.redirect("/workers/worker-form")
        console.log(req.body)
    }
    catch(err){
        res.status(400).render("workerForm")
        
    }
})


router.get("/worker-list", async (req, res)=> {
    try{
        let items = await workerModel.find()
        res.render("workersList", {workers : items})

    }
    catch(err){
        console.log(err)
        res.send("Could not retrieve workers list")
    }
})
//delete route
router.post("/worker-list", async (req, res)=>{
    try{
        await workerModel.deleteOne({
            _id: req.body._id 
        })
        res.redirect("/workers/worker-list")
    }
    catch(err){
        res.status(400).send("Unable to delete item from the database")
    }
})






//res.render(display) is used when pointing to a file
//res.redirect is used to point to a path


module.exports = router
