require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db');

const app = express()

app.use(cors())
app.use(express.json())

const productRoutes = require('./routes/productRoutes');

app.use('/api/products',productRoutes);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    app.listen(PORT , () => {
        console.log(`Server running on port ${PORT}`);
    });
});