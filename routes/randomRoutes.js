const express = require("express")
const workerModel = require("../models/workerModel")
const connectEnsureLogin = require("connect-ensure-login");
const multer = require('multer');
const imageModel = require("../models/imageModel");
const { isDirector, isManager, isSalesAgent, isManagerOrSalesAgent } = require("../authz/authorization");
const productModel = require("../models/productModel");
const saleModel = require("../models/saleModel");
const creditSaleModel = require("../models/creditSaleModel");



const router = express.Router()

// Generate a random number to name
const name = () => Math.floor(Math.random() * 10000);


// Working with multer diskStorage method
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/');
    },
    filename: function (req, file, cb) {
        cb(null, name() + file.originalname);
        //  console.log(file);
    }
});

const fileFilter = (req, file, cb) => {
    //reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 7 },
    fileFilter: fileFilter
});





router.get("/directorDash", connectEnsureLogin.ensureLoggedIn(), isDirector, async (req, res) => {
    const creditSales = await creditSaleModel.aggregate([{
        "$group": {
            _id: "$all",
            amount: { $sum: "$amount" }
        }
    }])
    const JinjaCreditSales = await creditSaleModel.aggregate([
        {
            $match: { branch: "Jinja" }
        },

        {
            "$group": {
                _id: "$all",
                amount: { $sum: "$amount" }
            }
        }])
    const MubendeCreditSales = await creditSaleModel.aggregate([
        {
            $match: { branch: "Mubende" }
        },

        {
            "$group": {
                _id: "$all",
                amount: { $sum: "$amount" }
            }
        }])
    const cashSales = await saleModel.aggregate([{
        "$group": {
            _id: "$all",
            amount: { $sum: "$amount" }
        }
    }])
    const purchases = await productModel.aggregate([{
        "$group": {
            _id: "$all",
            amount: { $sum: "$amount" }
        }
    }])
    const total = (creditSales.length > 0 && cashSales.length > 0) ? creditSales[0].amount + cashSales[0].amount : 0
    console.log(creditSales)
    res.render("directorDash", {
        credit: (creditSales[0].amount).toLocaleString("en", { style: "currency", currency: "UGX" }),
        sales: (cashSales[0].amount).toLocaleString("en", { style: "currency", currency: "UGX" }),
        products: (purchases[0].amount).toLocaleString("en", { style: "currency", currency: "UGX" }),
        totalSales: total.toLocaleString("en", { style: "currency", currency: "UGX" })
    })
})
router.get("/managerDash", connectEnsureLogin.ensureLoggedIn(), isManager, async (req, res) => {
    try {
        let productList = []
        if (req.user.branch === "Jinja") {
            productList = await productModel.find({
                branch: "Jinja"
            })
        } else if (req.user.branch === "Mubende") {
            productList = await productModel.find({
                branch: "Mubende"
            })
        }
        const purchasesmgr = await productModel.aggregate([{
            "$group": {
                _id: "$all",
                amount: { $sum: "$amount" }
            }
        }])
        const qtySold = await saleModel.aggregate([{
            "$group": {
                _id: "$all",
                amount: { $sum: "$quantity" }
            }
        }])
        const cashSalesmgr = await saleModel.aggregate([{
            "$group": {
                _id: "$all",
                amount: { $sum: "$amount" }
            }
        }])
        const creditSalesmgr = await creditSaleModel.aggregate([{
            "$group": {
                _id: "$all",
                amount: { $sum: "$amount" }
            }
        }])
        const totalSales = await saleModel.aggregate([
            {
                '$group':{
                    _id:'$all',
                    totalTonnage: {$sum:'$quantity'}
                }
            }
        ])
        //const mgrTotal = (creditSalesmgr.length > 0 && cashSalesmgr.length > 0) ?creditSalesmgr[0].amount + cashSalesmgr[0].amount : 0 

        res.render("managerDash", {
            product: productList,
            totalSales: totalSales[0],
            totalProducts: (purchasesmgr[0].amount).toLocaleString("en", { style: "currency", currency: "UGX" }),
            mgrSales: (cashSalesmgr[0].amount).toLocaleString("en", { style: "currency", currency: "UGX" }),
            creditSales: (creditSalesmgr[0].amount).toLocaleString("en", { style: "currency", currency: "UGX" }),
            tonnageSold: (qtySold[0].quantity),
            //mgrTotal: (mgrTotal[0].amount).toLocaleString("en", {style : "currency", currency:"UGX"}),
        })
    } catch (error) {

    }
})
router.get("/managerDash", connectEnsureLogin.ensureLoggedIn(), isManager, async (req, res) => {
    try {
        let salesList = []
        if (req.user.branch === "Jinja") {
            productList = await saleModel.find({
                branch: "Jinja"
            })
        } else if (req.user.branch === "Mubende") {
            salesList = await saleModel.find({
                branch: "Mubende"
            })
        }
        res.render("managerDash", {
            sale: salesList
        })
    } catch (error) {

    }
})
router.get("/regularDash", connectEnsureLogin.ensureLoggedIn(), isSalesAgent, async (req, res) => {
    try {
        let salesList = []
        if (req.user.branch === "Jinja") {
            salesList = await saleModel.find({
                branch: "Jinja"
            })
        } else if (req.user.branch === "Mubende") {
            salesList = await saleModel.find({
                branch: "Mubende"
            })
        }
        const cashSalesagent = await saleModel.aggregate([{
            "$group": {
                _id: "$all",
                amount: { $sum: "$amount" }
            }
        }])
        const creditSalesagent = await creditSaleModel.aggregate([{
            "$group": {
                _id: "$all",
                amount: { $sum: "$amount" }
            }
        }])
    
        
        //const agentTotalSales = (creditSalesagent.length > 0 && cashSalesagent.length > 0) ?creditSalesagent[0].amount + cashSalesagent[0].amount : 0 
        res.render("regularDash", {
            sale: salesList,
            agentSales: (cashSalesagent[0].amount).toLocaleString("en", { style: "currency", currency: "UGX" }),
            agentCredits: (creditSalesagent[0].amount).toLocaleString("en", { style: "currency", currency: "UGX" }),
            //agentTotals: (agentTotalSales[0].amount).toLocaleString("en", {style : "currency", currency:"UGX"}),
        })
    } catch (error) {

    }
})
//Images
router.get("/uploads", (req, res) => {
    res.render("uploads")
})
router.post("/uploads", upload.single('image'),
    (req, res) => {
        console.log(req.file)
        imageModel.create({ image: req.file.path })
        res.redirect("/gallery")
    })


router.get("/gallery", async (req, res) => {
    try {
        const images = await imageModel.find()
        res.render("gallery", { images })
    } catch (error) {

    }
})














module.exports = router