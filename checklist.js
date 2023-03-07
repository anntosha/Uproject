// Import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// app and middleware
const app = express();
app.use(bodyParser.json());
const port = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect('YOUR_MONGODB_CONNECTION_STRING', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// checklist schema and model
const checklistSchema = new mongoose.Schema({
  items: [{ name: String, status: String }],
  lastUpdate: Date,
});
const Checklist = mongoose.model('Checklist', checklistSchema);

// Endpoints

// Get the current checklist data
app.get('/checklist', async (req, res) => {
  try {
    const checklist = await Checklist.findOne();
    if (checklist) {
      res.json(checklist);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error('Failed to get checklist from database', error);
    res.sendStatus(500);
  }
});

// Handle POST requests to update the checklist data
app.post('/checklist/update', async (req, res) => {
  const updatedChecklist = req.body;
  try {
    const checklist = await Checklist.findOne();
    if (checklist) {
      checklist.items = updatedChecklist.items;
      checklist.lastUpdate = new Date();
      await checklist.save();
      // TODO: Send the updated checklist data to the mobile app
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error('Failed to update checklist in database', error);
    res.sendStatus(500);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
