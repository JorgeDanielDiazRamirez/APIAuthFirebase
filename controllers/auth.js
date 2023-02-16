const firebase = require("../firebaseConfig.js");
const admin = require("firebase-admin");
const bcryptjs = require("bcrypt");

const saltRounds = 10; //Hashing + salting password: hash the password with some random number(salting)

//JSON web token
const jwt = require("jsonwebtoken");

async function Signup (req, res) {
    await bcryptjs.hash(req.body.user.password, saltRounds, (err,hash)=>{
        console.log(hash);
        try {admin.auth().createUser({
            email: req.body.user.email,
            password: hash,
            emailVerified: false,
            disabled: false
        });
        res.status(201).json({message: 'Usuario Creado'});
        } catch(e){
            console.log(e);
            res.status(500).json({message: 'Error Creando usuario'});
        }
    });
}

async function Login (req, res) {
    if (!req.body.email || !req.body.password) {
        return res.status(422).json({
            email: "email is required",
            password: "password is required"
        });
    }
    await firebase
        .auth()
        .signInWithEmailAndPassword(req.body.email, req.body.password)
        .then((user) => {                
            //console.log(user.user.uid);
            const token = createToken(user.user.uid); //Promise <pending>
            customToken = jwt.sign(user, user.user.uid);
            //console.log(customToken);
            try {                    
                return res.status(200).json({
                    message: 'Usuario Valido',
                    email: req.body.email,
                    customToken: JSON.stringify(customToken)
                });
            } catch(e){
                console.log(e);
                res.status(404).json({message: 'Usuario Invalido'});
            }
            return res.status(200).json(user);
        })
        .catch(function (error) {
            let errorCode = error.code;
            let errorMessage = error.message;
            if (errorCode === "auth/wrong-password") {
                return res.status(500).json({ error: errorMessage});
            } else {
                return res.status(500).json({ error: errorMessage});
            }
        });       
}

function Signin (req, res) {
    if (!req.body.email || !req.body.password) {
        return res.status(422).json({
            email: "email is required",
            password: "password is required"
        });
    }
    firebase
        .auth()
        .signInWithEmailAndPassword(req.body.email, req.body.password)
        .then((user) => {
            return res.status(200).json(user);
        })
        .catch(function (error) {
            let errorCode = error.code;
            let errorMessage = error.message;
            if (errorCode === "auth/wrong-password") {
                return res.status(500).json({ error: errorMessage});
            } else {
                return res.status(500).json({ error: errorMessage});
            }
        }); 
}

const createToken = async (uid) => {
    return await admin.auth().createCustomToken(uid);
} 

module.exports = {
    Signup,
    Login,
    Signin
}