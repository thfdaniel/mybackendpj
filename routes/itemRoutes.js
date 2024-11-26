const { ObjectId } = require('mongodb');

module.exports = (getDb) => {
  const router = require('express').Router();

  // POST: Create a new item
  router.post('/', async (req, res) => {
    try {
      const db = getDb(); // Get the database instance
      const itemsCollection = db.collection('items'); // Reference to the "items" collection

      const { name, description, price } = req.body;
      const newItem = { name, description, price };
      
      const result = await itemsCollection.insertOne(newItem);
      res.status(201).json({ message: 'Item created successfully', item: result.ops[0] });
    } catch (error) {
      res.status(400).json({ message: 'Error creating item', error: error.message });
    }
  });

  // GET: Retrieve all items
  router.get('/', async (req, res) => {
    try {
      const db = getDb(); // Get the database instance
      const itemsCollection = db.collection('items'); // Reference to the "items" collection
      
      const items = await itemsCollection.find().toArray();
      res.status(200).json(items);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching items', error });
    }
  });

  // GET: Retrieve a single item by ID
  router.get('/:id', async (req, res) => {
    try {
      const db = getDb(); // Get the database instance
      const itemsCollection = db.collection('items'); // Reference to the "items" collection

      const itemId = req.params.id;
      const item = await itemsCollection.findOne({ _id: new ObjectId(itemId) });

      if (!item) {
        return res.status(404).json({ message: 'Item not found' });
      }

      res.status(200).json(item);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching item', error });
    }
  });

  // PUT: Update an item by ID
  router.put('/:id', async (req, res) => {
    try {
      const db = getDb(); // Get the database instance
      const itemsCollection = db.collection('items'); // Reference to the "items" collection

      const itemId = req.params.id;
      const { name, description, price } = req.body;
      const updatedItem = { name, description, price };

      const result = await itemsCollection.updateOne(
        { _id: new ObjectId(itemId) },
        { $set: updatedItem }
      );

      if (result.matchedCount === 0) {
        return res.status(404).json({ message: 'Item not found' });
      }

      res.status(200).json({ message: 'Item updated successfully' });
    } catch (error) {
      res.status(400).json({ message: 'Error updating item', error: error.message });
    }
  });

  // DELETE: Delete an item by ID
  router.delete('/:id', async (req, res) => {
    try {
      const db = getDb(); // Get the database instance
      const itemsCollection = db.collection('items'); // Reference to the "items" collection

      const itemId = req.params.id;
      const result = await itemsCollection.deleteOne({ _id: new ObjectId(itemId) });

      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'Item not found' });
      }

      res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting item', error });
    }
  });

  return router;
};
