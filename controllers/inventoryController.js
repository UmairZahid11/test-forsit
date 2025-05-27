const db = require('../config/db');

// Get All Inventory
exports.getAllInventory = (req, res) => {
  const query = 'SELECT id, name, category, stock FROM products';

  db.query(query, (err, rows) => {
    if (err) {
      console.error('Error:', err.message);
      return res.status(500).json({ error: 'Something went wrong' });
    }
    res.json(rows);
  });
};

// Get Low Stock
exports.getLowStock = (req, res) => {
  const threshold = parseInt(req.query.threshold) || 10;
  const query = 'SELECT id, name, category, stock FROM products WHERE stock < ?';

  db.query(query, [threshold], (err, rows) => {
    if (err) {
      console.error('DB error:', err.message);
      return res.status(500).json({ error: 'Something went wrong' });
    }
    res.json(rows);
  });
};
// Get Updated Stock
exports.updateStock = (req, res) => {
  const productId = parseInt(req.params.id);
  const { change } = req.body;

  if (!Number.isInteger(productId)) {
    return res.status(400).json({ error: 'Invalid Product ID' });
  }

  if (typeof change !== 'number') {
    return res.status(400).json({ error: "'change' should be a number" });
  }

  const updateInventorySql = 'UPDATE inventory SET stock = stock + ? WHERE product_id = ?';

  db.query(updateInventorySql, [change, productId], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Database error updating stock' });

    if (rows.affectedRows === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const updateChangeSql = `
      UPDATE inventory_changes 
      SET \`change\` = \`change\` + ?, changed_at = NOW()
      WHERE product_id = ?`;

    db.query(updateChangeSql, [change, productId], (err2, rows1) => {
      if (err2) return res.status(500).json({ error: 'Error in updating stock change inside inventory changes' });

      if (rows1.affectedRows === 0) {
        return res.status(404).json({ error: 'No inventory change record found for product' });
      }

      return res.status(200).json({ message: 'Stock and inventory change updated successfully' });
    });
  });
};

// Get Stock Change History
exports.getInventoryHistory = (req, res) => {
  const productId = req.params.id;
  const sql = `
    SELECT c.id, c.change, c.changed_at, p.name
    FROM inventory_changes c
    JOIN products p ON c.product_id = p.id
    WHERE c.product_id = ?
    ORDER BY c.changed_at DESC
  `;
  db.query(sql, [productId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

// Get Inventory By ID
exports.getInventoryById = (req, res) => {
  const id = req.params.id;

  const query = 'SELECT * FROM inventory WHERE id = ?';

  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database error', details: err });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(results[0]);
  });
};

