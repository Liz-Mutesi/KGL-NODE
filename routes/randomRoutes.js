const express = require("express")
const workerModel = require("../models/workerModel")
const connectEnsureLogin = require("connect-ensure-login");
const multer = require('multer');
const imageModel = require("../models/imageModel");
const { isDirector, isManager, isSalesAgent, isManagerOrSalesAgent } = require("../authz/authorization");
const productModel = require("../models/productModel");



const router = express.Router()

// Generate a random number to name
const name = ()=> Math.floor(Math.random()*10000);


// Working with multer diskStorage method
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'images/');
   },
    filename: function(req, file, cb){
        cb(null, name() + file.originalname);
       //  console.log(file);
    }
});

const fileFilter = (req, file, cb)=>{
    //reject a file
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const upload = multer({
    storage: storage,
    limits: {fileSize: 1024 * 1024 * 7},
    fileFilter: fileFilter
});





 router.get("/directorDash",connectEnsureLogin.ensureLoggedIn(), isDirector, (req, res) => {
     res.render("directorDash")
})
 router.get("/managerDash",connectEnsureLogin.ensureLoggedIn(), isManager, async(req, res) => {
    try {
        let productList = []
        if (req.user.branch === "Jinja"){
            productList = await productModel.find({
                branch:"Jinja"
            })
        }else if (req.user.branch === "Mubende"){
            productList = await productModel.find({
                branch:"Mubende"
            })
        }
     res.render("managerDash", {
        product : productList
     })
    } catch (error) {
        
    }
})
 router.get("/managerDash",connectEnsureLogin.ensureLoggedIn(), isManager, async(req, res) => {
    try {
        let salesList = []
        if (req.user.branch === "Jinja"){
            productList = await productModel.find({
                branch:"Jinja"
            })
        }else if (req.user.branch === "Mubende"){
            salesList = await productModel.find({
                branch:"Mubende"
            })
        }
     res.render("managerDash", {
        sale : salesList
     })
    } catch (error) {
        
    }
})
 router.get("/regularDash",connectEnsureLogin.ensureLoggedIn(), isManagerOrSalesAgent, (req, res) => {
     res.render("regularDash")
})

//Images
router.get("/uploads", (req, res) => {
    res.render("uploads")
})
router.post("/uploads", upload.single('image'),
(req, res) => {
    console.log(req.file)
    imageModel.create({image : req.file.path})
    res.redirect("/gallery")
})


router.get("/gallery", async(req, res) => {
    try {
        const images = await imageModel.find()
        res.render("gallery", {images})
    } catch (error) {
        
    }
})














module.exports = router