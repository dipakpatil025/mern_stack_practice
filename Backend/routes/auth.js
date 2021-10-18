const express = require('express');
const router = express.Router();
const { Mongoose } = require('mongoose');
const userSchema = require("../models/User");
const { body, validationResult } = require('express-validator');
const user = require('../models/User');
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");

// create user usesing post

router.post("/api/auth", [
    body('name', 'Enter valid name').isLength({ min: 3 }),
    body('email', "Enter valid email ").isEmail(),
    body('password', 'enter valid password').isLength({ min: 6 }),

], async (req, res) => {


    // if tehetre are error retunr error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {

        let userEmail = await userSchema.findOne({ email: req.body.email });
        // console.log(userEmail);
        if (userEmail) {
            return res.status(400).json({ error: "sorry !, user is aleardy exist" })
        }


        // // usrinf bcrypt password hash
        const salt = await bcrypt.genSalt(10);
        const secpass = await bcrypt.hash(req.body.password, salt);
        // console.log(secpass);

        let user = await userSchema.create({
            name: req.body.name,
            email: req.body.email,
            password: secpass
        });
        const data = {
            user: {
                id: user._id,
            }
        }
        const jwt_data = jwt.sign(data, 'shhhhh');
        console.log(jwt_data)
        // .then(user => res.json(user))
        //     .catch(err => res.json({ message: err.message }));
        res.send(user);
    } catch (error) {
        res.status(500).send("error")
    }
})

module.exports = router;