const express = require("express")
const workerModel = require("../models/workerModel")
const connectEnsureLogin = require("connect-ensure-login");

const router = express.Router()


router.get("/", connectEnsureLogin.ensureLoggedIn(),
async (req, res) => {
    const workers = await workerModel.find({})
    res.render("worker", {
        title: "Employees", workers

    })
})
router.get("/profile", connectEnsureLogin.ensureLoggedIn(),
(req, res)=> {
    res.render("test")
})
router.get("/worker-form", connectEnsureLogin.ensureLoggedIn(),
(req, res)=> {
    res.render("workerForm")
})

//error handling(try....catch)
router.post("/newWorker", connectEnsureLogin.ensureLoggedIn(),
async (req, res)=> {
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

router.get("/worker-list", connectEnsureLogin.ensureLoggedIn(),
async (req, res)=> {
    try{
        console.log(req.user.firstname)
        let items = await workerModel.find()
        res.render("workersList", {workers : items, username: req.user.firstname})

    }
    catch(err){
        console.log(err)
        res.send("Could not retrieve workers list")
    }
})
//delete route
router.post("/worker-list", connectEnsureLogin.ensureLoggedIn(),
async (req, res)=>{
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

router.get("/editWorker/:id", connectEnsureLogin.ensureLoggedIn(),
async (req, res)=>{
    try {
        const currentWorker = await workerModel.findById({_id:req.params.id})
        res.render("editWorker", {worker:currentWorker})
    }
    catch {error}{
        
    }
})
router.post("/editWorker", connectEnsureLogin.ensureLoggedIn(),
async (req, res)=>{
    try {
        await workerModel.findByIdAndUpdate({_id:req.query.id}, req.body)
       res.redirect("/workers/worker-list")
    }
    catch {error}{

    }
})





//res.render(display) is used when pointing to a file
//res.redirect is used to point to a path


module.exports = router

