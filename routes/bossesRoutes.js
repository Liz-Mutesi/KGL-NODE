const express = require("express")
// const workerModel = require("../models/workerModel")
const connectEnsureLogin = require("connect-ensure-login");
const saleModel = require("../models/saleModel");
const workerModel = require("../models/workerModel");



const router = express.Router()

router.get("/snitch", connectEnsureLogin.ensureLoggedIn(), (req, res) => {
    if(req.user.role === 'dev' || req.user.role === 'ceo'){
    res.render('snitch') }
    else{
        res.redirect('/snitch')
    }
   
})

router.get("/bosses", connectEnsureLogin.ensureLoggedIn(), async(req, res) => {
    if (req.user.role === "ceo" || req.user.role === "manager") {
        let items = await workerModel.find()
        res.render("bosses", { workers: items, username: req.user.role })
    }
    else {
        res.redirect("/managerDash")
    }
})












module.exports = router