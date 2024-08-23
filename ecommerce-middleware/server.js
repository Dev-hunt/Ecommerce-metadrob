const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
const Username="currentUser";
const password="currentUser";
const URL=`mongodb+srv://${Username}:${password}@cluster0.2jssa6l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Check if connected
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
});

// API Endpoints
app.get('/', (req, res) => {
    res.send('E-commerce Middleware API');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


const retailerRoutes = require('./routes/retailer');

app.use('/api/retailers', retailerRoutes);
const categoryRoutes = require('./routes/category');

app.use('/api/categories', categoryRoutes );
const productRoutes = require('./routes/product');

app.use('/api/products', productRoutes);
