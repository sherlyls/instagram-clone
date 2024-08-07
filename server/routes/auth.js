const express = require("express");
const router = express.Router()
const mongoose = require("mongoose")
const User = mongoose.model("User")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const { JWT_SECRET} = require('../keys')
const requireLogin = require("../middleware/requireLogin")

router.get('/protected', requireLogin, (req, res) => {
    res.send('hello userr')
})

router.post('/signup', (req, res) => {
    const { name, email, password } = req.body
    if (!email || !password || !name) {
        return res.status(422).json({ error: "please add all the field" })
    
    }
    User.findOne({ email: email })
        .then((savedUser) => {
            console.log(savedUser, "saveduser")
            if (savedUser) {
                return res.status(422).json({ error: "user already exist" })
            }
            bcrypt.hash(password, 12)
                .then(hashedpassword => {
                    console.log(hashedpassword, "hashedpassword")
                    const user = new User({
                        email,
                        password: hashedpassword,
                        name
                    })

                    user.save()
                        .then(user => {
                            res.json({ message: "saved successfully" })
                        })
                        .catch(err => {
                            console.log(err)
                        })
                })
        })
        .catch(err => {
            console.log(err)
        })
})

router.post('/signin', (req, res) => {
    const {email, password} = req.body
    // const email = req.body.email
    // const password = req.body.password
    if (!email || !password) {
        return res.status(422).json({error: "please provide email and password"})
    }
    User.findOne({email: email})
        .then(savedUser => {
            console.log(savedUser, "moliat")
            if(!savedUser) {
                return res.status(422).json({error: "invalid email and password" })
            }
            bcrypt.compare(password, savedUser.password)
            .then(doMatch => {
                if(doMatch) {
                    // res.json({message: "successfully signed in"})
                    const token = jwt.sign({_id:savedUser._id}, JWT_SECRET)
                    res.json({token})
                }
                else {
                    res.json({message: "Invalid Email or Password"})
                }
            })
            .catch(err => {
                console.log(err, "mana errornya")
            })
        })
})

module.exports = router
