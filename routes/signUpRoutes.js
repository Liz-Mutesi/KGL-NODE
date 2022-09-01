const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

const Signup = require("../models/signUp.js");
const router = express.Router();

router.get("/workers/signup", (req, res) => {
    res.render("signup");
});

router.post("/workers/signup",
    async (req, res) => {
        const signup = new Signup(req.body);
        console.log(req.body);
        await Signup.register(signup, req.body.password, (err) => {
            if (err) {
                res.status(400).render("signUp");
                console.log(err);
            } else {
                res.redirect("/workers/login");
            }
        });
    });

router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
})







module.exports = router