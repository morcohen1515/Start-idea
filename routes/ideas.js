const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

require('../models/Idea');
const Idea = mongoose.model('ideas');

//Idea index
router.get('/', (req, res) => {
    Idea.find({}).lean().sort({date: 'desc'})
    .then(ideas => {
      res.render('ideas/index', {
        ideas: ideas
      });
      console.log("get ideas");
    });
  });
//add idea
router.get('/add', (req, res) => res.render('ideas/add')) 
//edit idea
router.get('/edit/:id', (req, res) => {
  Idea.findOne({_id: req.params.id})
  .lean()
  .then(idea => {
    res.render('ideas/edit', {idea:idea});}
    );
  });
//post form
router.post('/', (req, res) =>{
  let errors =[];

  if(!req.body.title){
    errors.push({ text: 'please add a title' })
  }
  if(!req.body.details){
    errors.push({ text: 'please add some details' })
  }
  if(errors.length > 0) {
    res.render('ideas/add', {
      errors: errors,
      title: req.body.title,
      details: req.body.details
    });
  } else {
    const newUser = {
      title:req.body.title,
      details:req.body.details
    }
    new Idea(newUser).save().then(idea => {
      req.flash('good_msg', 'Startup idea added');
      res.redirect('/ideas');
      console.log("post idea");
    })
  }
});
//Edit form PUT
router.put('/:id', (req,res) => {
  Idea.findOne({
    _id: req.params.id
  })
  .then(idea => {
    idea.title = req.body.title;
    idea.details = req.body.details

    idea.save().then(idea => {
      req.flash('good_msg', 'Startup idea updated');
      res.redirect('/ideas');
    });
  });
});
//delete idea
router.delete('/:id', (req, res) => {
  Idea.remove({_id: req.params.id})
  .then(() => {
    req.flash('good_msg', 'Startup idea removed');
    res.redirect('/ideas');
  });
});

module.exports = router;