# Inventory & Sales API

## Overview

This project provides RESTFUL API for managing sales and inventory, using Node JS and Express JS. It support updating inventory stock and tracking changes, integrated with MYSQL database.

---

## Technology Stack

**Programming Language & Framework:**  
  Node.js with Express.js

**API Type:**  
  RESTful API

**Database:**  
  MySQL

---

## Setup Instructions

1. **Clone the repository:**
   git clone <repository-url>
   cd <repository-folder>
2. **Install Dependencies:**
   npm install
3. **Configure database connection:**
   go to config/db.js
   connection is setup there. do necessary changes as per your environment.
4. **Run Server:**
   npm start

## Inventory Endpoints

**Get All inventory**
GET /api/inventory/
Fetches the complete list of all inventory products with stock information.

**Get low stock items**
GET /api/inventory/low-stock
Returns inventory items where stock is below a certain threshold.

**Get inventory by product ID**
GET /api/inventory/:id
example (/api/inventory/1)
Returns inventory details for the product with the given ID.

**Get inventory stock change history**
GET /api/inventory/history/:id
Returns the stock change history for a specific product by ID.

**Update stock for a product**
PUT /api/inventory/update/:id
Updates the stock quantity for the product with the specified ID.

**Request body example:**
{ "change": 10 }

## Sales Endpoints

**Get all sales**
GET /api/sales/
Retrieve all sales records.

**Get sales by date range**
GET api/sales/range?start=YYYY-MM-DD&end=YYYY-MM-DD
example (api/sales/range?start=2024-05-24&end=2024-05-31)
Fetch sales between the specified start and end dates.

**Get revenue summary**
GET /sales/revenue/summary
Get overall revenue summary (e.g., total revenue, total sales).

**Get revenue by category**
GET /sales/revenue/category
Get revenue breakdown grouped by product category.

**Get sales by product ID**
GET /sales/product/:id
Fetch all sales for the specific product identified by ID.

**Get sales by category**
GET /sales/category/:category
Fetch all sales belonging to the specified category (e.g., "Furniture").


