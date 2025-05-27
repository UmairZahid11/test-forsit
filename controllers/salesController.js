const db = require('../config/db');
// Get all sales
exports.getAllSales = (req, res) => {
  const sql = `
    SELECT s.id, s.product_id, p.name, p.category, s.quantity, s.sale_date
    FROM sales s
    JOIN products p ON s.product_id = p.id
    ORDER BY s.sale_date DESC
  `;
  db.query(sql, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

// Get sales within a date range
exports.getSalesByDateRange = (req, res) => {
  const { start, end } = req.query;
  if (!start || !end) return res.status(400).json({ error: "Start and end dates required" });

  const sql = `
    SELECT s.id, s.product_id, p.name, p.category, s.quantity, s.sale_date
    FROM sales s
    JOIN products p ON s.product_id = p.id
    WHERE s.sale_date BETWEEN ? AND ?
    ORDER BY s.sale_date DESC
  `;
  db.query(sql, [start, end], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

// Get sales for a specific product
exports.getSalesByProduct = (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT s.id, s.product_id, p.name, p.category, s.quantity, s.sale_date
    FROM sales s
    JOIN products p ON s.product_id = p.id
    WHERE s.product_id = ?
    ORDER BY s.sale_date DESC
  `;
  db.query(sql, [id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    if (rows.length === 0) return res.status(404).json({ error: "No sales found for this product" });
    res.json(rows);
  });
};

// Get sales for a specific category
exports.getSalesByCategory = (req, res) => {
  const { category } = req.params;

  const sql = `
    SELECT s.id, s.product_id, p.name, p.category, s.quantity, s.sale_date
    FROM sales s
    JOIN products p ON s.product_id = p.id
    WHERE p.category = ?
    ORDER BY s.sale_date DESC
  `;
  db.query(sql, [category], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

// Get revenue summary grouped by day, week, month, year
exports.getRevenueSummary = (req, res) => {
  const sql = `
    SELECT
      DATE(s.sale_date) AS day,
      WEEK(s.sale_date) AS week,
      MONTH(s.sale_date) AS month,
      YEAR(s.sale_date) AS year,
      SUM(s.quantity * p.price) AS revenue
    FROM sales s
    JOIN products p ON s.product_id = p.id
    GROUP BY day, week, month, year
    ORDER BY day DESC
  `;
  db.query(sql, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

// Get revenue grouped by product category
exports.getRevenueByCategory = (req, res) => {
  const sql = `
    SELECT p.category, SUM(s.quantity * p.price) AS revenue
    FROM sales s
    JOIN products p ON s.product_id = p.id
    GROUP BY p.category
    ORDER BY revenue DESC
  `;
  db.query(sql, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

// Flexible filtered sales endpoint
exports.getFilteredSales = (req, res) => {
  const { start, end, productId, category } = req.query;

  let sql = `
    SELECT s.id, s.product_id, p.name, p.category, s.quantity, s.sale_date
    FROM sales s
    JOIN products p ON s.product_id = p.id
    WHERE 1=1
  `;

  const params = [];

  if (start && end) {
    sql += ' AND s.sale_date BETWEEN ? AND ?';
    params.push(start, end);
  }
  if (productId) {
    sql += ' AND s.product_id = ?';
    params.push(productId);
  }
  if (category) {
    sql += ' AND p.category = ?';
    params.push(category);
  }

  sql += ' ORDER BY s.sale_date DESC';

  db.query(sql, params, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};
