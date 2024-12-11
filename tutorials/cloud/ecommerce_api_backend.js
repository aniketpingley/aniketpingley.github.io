
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Fake data
let products = [
    { id: 1, name: 'Laptop', price: 1000, stock: 5 },
    { id: 2, name: 'Phone', price: 500, stock: 10 },
    { id: 3, name: 'Tablet', price: 300, stock: 8 }
];

let orders = [
    { id: 1, productId: 1, quantity: 2, status: 'Processing' },
    { id: 2, productId: 2, quantity: 1, status: 'Shipped' }
];

// 1. Get all products
app.get('/api/products', (req, res) => {
    res.json(products);
});

// 2. Get a single product by ID
app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
});

// 3. Create a new product
app.post('/api/products', (req, res) => {
    const newProduct = {
        id: products.length + 1,
        name: req.body.name,
        price: req.body.price,
        stock: req.body.stock
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// 4. Place an order
app.post('/api/orders', (req, res) => {
    const product = products.find(p => p.id === req.body.productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    if (product.stock < req.body.quantity) {
        return res.status(400).json({ message: 'Not enough stock available' });
    }
    product.stock -= req.body.quantity;
    const newOrder = {
        id: orders.length + 1,
        productId: req.body.productId,
        quantity: req.body.quantity,
        status: 'Processing'
    };
    orders.push(newOrder);
    res.status(201).json(newOrder);
});

// 5. Get all orders
app.get('/api/orders', (req, res) => {
    res.json(orders);
});

// Start the server
app.listen(PORT, () => {
    console.log(`E-commerce API backend is running at http://localhost:${PORT}`);
});
