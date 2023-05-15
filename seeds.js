const mongoose = require('mongoose')
const Product = require('./models/product')


mongoose.connect('mongodb://127.0.0.1:27017/FarmerGrocer')
    .then(() => {
        console.log('LOCAL DB SERVER CREATED!')
    })
    .catch(err => {
        console.log(`ERROR : ${err}`);
    })

const seedProducts = [
    {
        name: 'Brocolli',
        price: 3.59,
        category: 'vegetable'
    },
    {
        name: 'Tomato',
        price: 2.59,
        category: 'fruit'
    },
    {
        name: 'Orange',
        price: 1.59,
        category: 'fruit'
    },
    {
        name: 'Papaya',
        price: 1.40,
        category: 'fruit'
    },
    {
        name: 'cabbage',
        price: 3,
        category: 'vegetable'
    },
    {
        name: 'Capsicum',
        price: 5.59,
        category: 'vegetable'
    }
];

Product.insertMany(seedProducts)
    .then(res => console.log(res))
    .catch(err => console.log(`ERROR: ${err}`))