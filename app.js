const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { connectToDB, getDb } = require('./db'); // Import connection functions
const itemRoutes = require('./routes/itemRoutes'); // Import item routes

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Initialize DB connection
connectToDB()
  .then(() => {
    // Start the server after DB connection
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to start the server:', err);
    process.exit(1);
  });

// Use the database in your routes
app.use('/api/items', itemRoutes(getDb)); // Pass `getDb` function to routes
