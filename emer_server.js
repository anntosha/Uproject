const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

// Enable JSON parsing for requests
app.use(bodyParser.json());

// List of emergency services
let services = [
  { name: 'Police', number: '911' },
  { name: 'Fire department', number: '555-1234' },
  { name: 'Medical', number: '555-5678' }
];

// Endpoint for the mobile app to retrieve the list of services
app.get('/emergency', (req, res) => {
  res.json(services);
});

// Endpoint for the desktop app to update the list of services
app.put('/emergency', (req, res) => {
  // Only allow updates from desktop app
  const secretKey = 'EGEMENY&1@$';
  if (req.headers.authorization !== secretKey) {
    return res.sendStatus(401);
  }

  // Update the list of services
  services = req.body.services;

  res.sendStatus(200);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
