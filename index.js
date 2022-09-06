const express = require("express")
const path = require("path")
const mongoose = require("mongoose")
const passport = require("passport")
const moment = require("moment")


const workerRoutes = require("./routes/workerRoutes")
const productRoutes = require("./routes/productRoutes")
const saleRoutes = require("./routes/saleRoutes")
const homeRoutes = require("./routes/homeRoutes")
const signUpRoutes = require("./routes/signUpRoutes")
const loginRoutes = require("./routes/loginRoutes")
const randomRoutes = require("./routes/randomRoutes")






const SignupModel = require("./models/signUp")


const app = express()

const expressSession = require('express-session')({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
});

app.locals.moment = require("moment")

app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "/views"))
app.use(express.static(path.join(__dirname, '/public')));
app.set("view engine", "pug")



//db connect
//mongodb://localhost:27017
mongoose.connect("mongodb://localhost:27017/KARIBU", {
    useNewUrlParser: true,
    useUnifiedTopology: true
},
    (err) => {
        if (!err) console.log("Connected to mongoDB");
        else console.log("Error connecting to mongoDB " + err)

    })


app.use(expressSession)
// configuring passport
app.use(passport.initialize());
app.use(passport.session());

//-----------------------------------
passport.use(SignupModel.createStrategy());
passport.serializeUser(SignupModel.serializeUser());
passport.deserializeUser(SignupModel.deserializeUser());



app.use("/", homeRoutes)
app.use("/workers", workerRoutes)
app.use("/product", productRoutes)
app.use("/sale", saleRoutes)
app.use("/", signUpRoutes)
app.use("/", loginRoutes)
app.use("/", randomRoutes)


//http://localhost:3000
//http://localhost:3000/
//http://localhost:3000/product/
//http://localhost:3000/index/user






// always the last line in the information
app.listen(process.env.port || 5000)
console.log("server running on port" + (process.env.port || 5000))
