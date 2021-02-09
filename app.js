const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const flash = require('connect-flash');
const session = require('express-session');
const methodOverride = require('method-override');
const app = express();

//mongoose
mongoose.connect('mongodb+srv://mor:1515@start-up.japnr.mongodb.net/<dbname>?retryWrites=true&w=majority', {
  useNewUrlParser: true, 
  useUnifiedTopology: true
});
mongoose.connection.on('connected', () => {
  console.log('mongodb is connected')
});
//loading routes
const ideas = require('./routes/ideas');
const users = require('./routes/users');
//handlbars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
//body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
//method-overide
app.use(methodOverride('_method'))
//express session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}));
//flash
app.use(flash());
//global variables
app.use(function(req, res, next) {
  res.locals.good_msg = req.flash('good_msg');
  res.locals.bad_msg = req.flash('bad_msg');
  res.locals.bad = req.flash('bad');
  next();
})
//routes
//home
app.get('/', (req, res) =>  res.render('home'))
//about
app.get('/about', (req, res) => res.render('about'))
//using routes
app.use('/ideas', ideas);
app.use('/users', users);
//PORT
app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});