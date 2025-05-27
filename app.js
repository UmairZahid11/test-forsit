const express = require('express');
const app = express();
app.use(express.json());


const salesRoutes = require('./routes/salesRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');

app.get('/', (req, res) => {
  res.send('Hello Everyone, Apis are working');
});
app.use('/api/sales', salesRoutes);
app.use('/api/inventory', inventoryRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
