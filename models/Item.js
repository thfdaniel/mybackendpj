const mongoose = require('mongoose');

// Define the schema for the Item model
const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
});

// Create the Item model based on the schema
const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
