//requiring dependencies
const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/product')
const methodOverride = require('method-override')
const app = express();
const path = require('path')

//using middlewares
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))


const categories = ['fruit', 'vegetable', 'dairy'];
//Connecting to mongoose local dp with name myapp
mongoose.connect('mongodb://127.0.0.1:27017/FarmerGrocer')
    .then(() => {
        console.log('LOCAL DB SERVER CREATED!')
    })
    .catch(err => {
        console.log(`ERROR : ${err}`);
    })

//get routes
app.get('/products', async (req, res) => {
    const products = await Product.find({})
    res.render('products/index', { products })
})
app.get('/products/new', (req, res) => {
    res.render('products/new', { categories })
})

app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/details', { product })
})

app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id)
    res.render("products/edit", { product, categories });
})

//post routes
app.post('/products', async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`)
})

//patch routes
app.patch('/products/:id', async (req, res) => {
    const { id } = req.params;
    const productUpdate = req.body;
    const product = await Product.findByIdAndUpdate(id, productUpdate, { runValidators: true })
        .then(p => {
            console.log("PATCHED SUCCESSFULLY");
            res.redirect(`/products/${id}`)
        })
        .catch(err => console.log("ERROR"))
})

//delete routes
app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id)
        .then(p => res.redirect(`/products`))
        .catch(err => console.log("FAIL!"))
})

//listening to port 3000
app.listen(3000, () => {
    console.log("PORT 3000, LIVE!")
})


