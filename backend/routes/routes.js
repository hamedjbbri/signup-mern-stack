const express = require('express');
const router = express.Router()
const signUpTemplate = require('../models/SignupModels')
const bcrypt = require('bcrypt');



// Add a new user to DB
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


// Get users frokm DB
router.get('/grab', (req, res) => {

    signUpTemplate.find().then(data => {
        res.json(data)
    })
})


// 
router.delete('/delete', (req, res) => {
    
    signUpTemplate.deleteOne({ _id: req.body.id })
    .then((data) => {

       res.json(data);
    })
     
        
} )

module.exports = router