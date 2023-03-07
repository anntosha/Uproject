const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// connect to MongoDB
mongoose.connect('mongodb://localhost/login', { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

// create user schema
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  securityQuestions: [{
    question: String,
    answer: String,
  }],
});

const User = mongoose.model('User', userSchema);

// middleware
app.use(bodyParser.json());

// routes
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (user) {
    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
});

app.post('/signup', async (req, res) => {
  const { email, password, securityQuestions } = req.body;
  const user = new User({ email, password, securityQuestions });
  await user.save();
  res.status(200).json({ message: 'User created successfully' });
});

app.post('/forgot', async (req, res) => {
  const { email, securityQuestions } = req.body;
  const user = await User.findOne({ email, securityQuestions });
  if (user) {
    res.status(200).json({ message: 'Security questions answered successfully' });
  } else {
    res.status(401).json({ message: 'Invalid email or security questions' });
  }
});

// start server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
