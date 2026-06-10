const express = require('express');
const open = require('open');
const path = require('path');

const app = express(); // ← THIS WAS MISSING
const PORT = 3000;

// Serve static files from "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Login route
app.get('/login', (req, res) => {
  console.log('Logging in...');
  
  // Fake login token (for now)
  app.locals.tokens = { access_token: "fake-token" };

  res.redirect('/home');
});

// Protected route
app.get('/home', (req, res) => {
  if (!app.locals.tokens) {
    return res.redirect('/login');
  }

  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Root route
app.get('/', (req, res) => {
  res.redirect('/home');
});

// Dummy events endpoint
app.get('/events', (req, res) => {
  res.json([
    {
      start: { dateTime: new Date().toISOString() }
    }
  ]);
});

app.listen(PORT, async () => {
  console.log(`Server running at http://localhost:${PORT}`);

  try {
    await open(`http://localhost:${PORT}`);
  } catch (err) {
    console.log('Open manually in browser');
  }
});