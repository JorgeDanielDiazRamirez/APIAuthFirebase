const express = require('express');
const Router = express.Router();

const admin = require("firebase-admin");
const serviceAccount = require("../serviceAccountKey.json");


const {
    Signup,
    Login,
    Signin
} = require("../controllers/auth.js")

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

//Sign up endpoint
Router.post('/signup', async(req, res) => {
    const userResponse = await admin.auth().createUser({
        email: req.body.email,
        password: req.body.password,
        emailVerified: false,
        disabled: false
    });
    res.status(201).json(userResponse);
});

Router.post('/Signup', Signup);

//Sign in or Login endpoint
Router.post("/Login", Login);


module.exports = Router;