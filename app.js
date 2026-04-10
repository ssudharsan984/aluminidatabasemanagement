const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const methodOverride = require('method-override');
const app = express();

// MongoDB Atlas Connection
mongoose.connect('mongodb+srv://ssudharsan984_db_user:Dgcsx2PQV3dsTP6F@cluster0.zkjpzjv.mongodb.net/alumni_db?retryWrites=true&w=majority')
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => console.log('❌ MongoDB Error:', err));

// Middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(session({ secret: 'alumni_secret', resave: false, saveUninitialized: false }));

// Auth middleware
app.use((req, res, next) => {
  res.locals.loggedUser = req.session.user;
  next();
});

// Routes
app.use('/', require('./routes/auth'));
app.use('/alumni', require('./routes/alumni'));
app.use('/events', require('./routes/events'));
app.use('/dashboard', require('./routes/dashboard'));

// Redirect root to login
app.get('/', (req, res) => res.redirect('/login'));

app.listen(3000, () => console.log('🚀 Server running at http://localhost:3000'));
