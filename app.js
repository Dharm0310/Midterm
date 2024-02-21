const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');

// Connect to MongoDB
mongoose.connect('mongodb+srv://dharm:abcd@cluster0.ginegfz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Define the schema for the contact form
const contactSchema = new mongoose.Schema({
  studentNumber: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true }
});

// Create a model from the schema
const Contact = mongoose.model('Contact', contactSchema);

const app = express();

// Set the view engine to pug
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.redirect('/home');
});

app.get('/home', (req, res) => {
  res.render('home', { title: 'Home' });
});

app.get('/student', (req, res) => {
  res.render('student', { title: 'Student' });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact' });
});

app.post('/submit-form', (req, res) => {
  const { studentNumber, firstName, lastName, email } = req.body;
  const newContact = new Contact({ studentNumber, firstName, lastName, email });

  newContact.save()
    .then(() => res.send('Thank you for your submission!'))
    .catch(err => res.status(400).send(err.message));
});

// Listen on a port
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;