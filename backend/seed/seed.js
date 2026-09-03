require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product')

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Connected for seeding....'))
.catch((err) => {
    console.error('Connection failed: ' , err.message);
    process.exit(1);
});

const products = [
    {
        name : 'iPhone 17 Pro',
        slug : 'iphone-17-pro',
        brand : 'Apple',
        category : 'Smartphones',
        description: 'Apple iPhone 17 Pro with A19 Pro chip and titanium design.',
        variants : [
            {
                variantName : '256GB - Silver',
                attributes : {storage : '256GB' , color : 'Silver'},
                mrp : 134900,
                price : 127400,
                image : '/images/iphone-silver.jpg',
                stock : 15,
            },
            {
                variantName : '256GB - Orange',
                attributes : {storage : '256GB' , color : 'Orange'},
                mrp : 134900,
                price : 127400,
                image: '/images/iphone-orange.jpg',
                stock : 10,
            },
            {
                variantName : '512GB - Silver',
                attributes : {storage : '512GB' , color : 'Silver'},
                mrp: 154900,
                price: 147400,
                image : '/images/iphone-silver.jpg',
                stock : 15,
            },
            {
                variantName: '512GB - Orange',
                attributes: { storage: '512GB', color: 'Orange' },
                mrp: 154900,
                price: 147400,
                image: '/images/iphone-orange.jpg',
                stock: 8,
            },
        ],
        emiPlanRules : [
            { tenureMonths: 3, interestRate: 0, cashback: 7500 },
            { tenureMonths: 6, interestRate: 0, cashback: 7500 },
            { tenureMonths: 12, interestRate: 0, cashback: 7500 },
            { tenureMonths: 24, interestRate: 0, cashback: 7500 },
            { tenureMonths: 36, interestRate: 10.5, cashback: 7500 },
            { tenureMonths: 48, interestRate: 10.5, cashback: 7500 },
            { tenureMonths: 60, interestRate: 10.5, cashback: 7500 },
        ],
    },
    {
        name : 'Samsung Galaxy Z Fold 8',
        slug : 'samsung-galaxy-Z-fold-8',
        brand : 'Samsung',
        category : 'Smartphones',
        description: 'Samsung Galaxy Z Fold 8 with lightest fold and dual 50 MP camera.',
        variants : [
            {
                variantName : '256GB - Lavender',
                attributes : {storage : '256GB' , color : 'Lavender'},
                mrp : 184999,
                price : 179999,
                image : '/images/samsung-lavender.jpg',
                stock : 10,
            },
            {
                variantName: '512GB - Pistachio',
                attributes: { storage: '512GB', color: 'Pistachio' },
                mrp: 204999,
                price: 199999,
                image: '/images/samsung-pistachio.jpg',
                stock: 8,
            },
            {
                variantName : '1TB - Graphite',
                attributes : {storage : '1TB' , color : 'Graphite'},
                mrp : 244999,
                price : 239999,
                image : '/images/samsung-graphite.jpg',
                stock : 5,
            },
        ],
        emiPlanRules : [
            { tenureMonths: 3, interestRate: 0, cashback: 7500 },
            { tenureMonths: 6, interestRate: 0, cashback: 7500 },
            { tenureMonths: 12, interestRate: 0, cashback: 7500 },
            { tenureMonths: 24, interestRate: 0, cashback: 7500 },
            { tenureMonths: 36, interestRate: 10.5, cashback: 7500 },
            { tenureMonths: 48, interestRate: 10.5, cashback: 7500 },
            { tenureMonths: 60, interestRate: 10.5, cashback: 7500 },
        ],
    },
    {
        name : 'OnePlus 15',
        slug : 'oneplus-15',
        brand : 'OnePlus',
        category : 'Smartphones',
        description: 'OnePlus 15 5G with Snapdragon 8Elite Gen 5 and 7300mAh battery.',
        variants : [
            {
                variantName : '256GB - Sand Storm',
                attributes : {storage : '256GB' , color : 'Sand Storm'},
                mrp : 89999,
                price : 85999,
                image : '/images/oneplus-sand-storm.jpg',
                stock : 7,
            },
            {
                variantName: '512GB - Infinity Black',
                attributes: { storage: '512GB', color: 'Infinity Black' },
                mrp: 96999,
                price: 93999,
                image: '/images/oneplus-black.jpg',
                stock: 8,
            },
        ],
        emiPlanRules : [
            { tenureMonths: 3, interestRate: 0, cashback: 7500 },
            { tenureMonths: 6, interestRate: 0, cashback: 7500 },
            { tenureMonths: 12, interestRate: 0, cashback: 7500 },
            { tenureMonths: 24, interestRate: 0, cashback: 7500 },
            { tenureMonths: 36, interestRate: 10.5, cashback: 7500 },
            { tenureMonths: 48, interestRate: 10.5, cashback: 7500 },
            { tenureMonths: 60, interestRate: 10.5, cashback: 7500 },
        ],
    },
];

const seedDB = async () => {
    try{
        await Product.deleteMany({});
        await Product.insertMany(products);
        console.log('Database seeded successfully');
    }catch (err){
        console.log('Seeding failed :' , err.message);
    } finally{
        mongoose.connection.close();
    }
};

mongoose.connection.once('open' , () => {
    seedDB();
});