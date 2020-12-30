const express = require('express');
const router = express.Router()
const myTable = require('../models/SignupModels')


router.post('/signup', (req, res) => {
    
     const signedUpUser = new myTable({
         fullname: req.body.fullname,
         username: req.body.username,
         email: req.body.email,
         password: req.body.password
     })

     

     signedUpUser.save()
     .then(data => res.json(data))
     .catch(error => res.json(error))
})


module.exports = router