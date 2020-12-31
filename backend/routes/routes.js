const express = require('express');
const router = express.Router()
const signUpTemplate = require('../models/SignupModels')
const bcrypt = require('bcrypt');

router.post('/signup', async (req, res) => {

    const saltPassword = await bcrypt.genSalt(10)
    const securePassword = await bcrypt.hash(req.body.password, saltPassword)


    const signedUpUser = new signUpTemplate({
        fullname: req.body.fullname,
        username: req.body.username,
        email: req.body.email,
        password: securePassword
    })



    signedUpUser.save()
        .then(data => res.json(data))
        .catch(error => res.json(error))
})


module.exports = router