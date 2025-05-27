const db = require("../config/db");
const seed = () => {
  db.query("INSERT INTO products (name, category, price, stock) VALUES ?", [
    ["Laptop", "Electronics", 1200.99, 8],
    ["Shampoo", "Personal Care", 10.99, 30],
    ["Microwave", "Electronics", 300.50, 4],
  ]);
  db.query("INSERT INTO sales (product_id, quantity, sale_date) VALUES ?", [
    [1, 2, "2024-05-01"],
    [1, 1, "2024-05-02"],
    [2, 3, "2024-05-03"],
  ]);
  db.query("INSERT INTO inventory (product_id, stock, updated_at) VALUES ?", [
    [1, 10, "2024-05-01 10:00:00"],
    [2, 4, "2024-05-02 14:30:00"],
    [3, 15, "2024-05-03 09:15:00"]
  ]
  );
  db.query( "INSERT INTO inventory_changes (product_id, change, changed_at) VALUES ?",[
      [1, -2, "2024-05-01 10:05:00"],
      [1, -1, "2024-05-02 11:20:00"],
      [2, -3, "2024-05-03 08:45:00"],
      [3, +5, "2024-05-04 13:10:00"]
    ]
  );
};
seed();