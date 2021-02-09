const express = require('express');
const mongoose = require('mongoose');
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs');
const router = express.Router();

require('../models/Users');
const user = mongoose.model('users');

router.get('/login', (req, res) => {
    res.render('users/login');
})

router.post('/login', (req, res) => {

})

router.get('/register', (req, res) => {
    res.render('users/register');
})

router.post('/register', (req,res) => {
    let errors = [];

    if(req.body.password != req.body.password2) {
        errors.push({ text: "passwords do not much" });
    }
    if(req.body.password.length < 5) {
        errors.push({ text: "passwordmust be at least 5 chrachters" });
    }
    if(errors.length > 0) {
        res.render('users/register', {
            errors: errors,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            password2: req.body.pasword2,
        });
    } else {
        const newUser = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
          }
          new user(newUser).save().then(user => {
            req.flash('good_msg', 'Startup user added');
            res.redirect('/users');
            console.log("post user");
          })
    }
})

module.exports = router;