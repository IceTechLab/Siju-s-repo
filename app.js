const express = require('express')
const app = express() 
const products = require('./data.json')
const logger = require('./logger')
const fs = require('fs')

app.get('/', (req,res) => {
    res.send('hi there')
    
});

app.use('/about', logger)

app.get('/about/:id', (req,res) => {
    const {id} = req.params
    const product = products.find(p => p.id === Number(id))

    if(!product){
        res.status(404).send('<h1>Product not found</h1>')
    }
    res.status(200).send(product)
});


app.get('/test', (req,res) => {
    const {name} = req.query
    const result = products.find(p => p.name.toLowerCase().startsWith(name.toLowerCase())) 
    if(!result){
        res.status(404).send('<h1> Product Not Found</h1>')
    }
    res.status(200).send(result)
})

app.post('/post', (req,res) => {
    const {name, category, price, in_stock, rating} = req.body

    const newProduct = {
        id: products.length + 1,
        name,
        category,
        price,
        in_stock,
        rating
    }
    products.push(newProduct)
    fs.writeFileSync('./data.json', JSON.stringify(products, null, 2))
    res.status(201).send(newProduct)
})


app.put('/put/:id', (req,res) => {
    const {id} = req.params
    const product = products.find(p => p.id === Number(id))
    if(!product){
        return res.status(404).send('<h1>Product not found</h1>')
    }
    const {name, category, price, in_stock, rating} = req.body

    product.name = name
    product.category = category
    product.price = price
    product.in_stock = in_stock
    product.rating = rating

    fs.writeFileSync('./data.json', JSON.stringify(products, null, 2))
    res.status(200).send(product)
})

app.delete('/delete/:id', (req,res) => {
    const {id} = req.params
    const productIndex = products.findIndex(p => p.id === Number(id))
    if(productIndex === -1){
        return res.status(404).send('<h1>Product not found</h1>')
    }

    const deletedProduct = products.splice(productIndex, 1)[0]
    fs.writeFileSync('./data.json', JSON.stringify(products, null, 2))
    res.status(200).send(deletedProduct)
})

app.listen(5000, () => {
    console.log('server running')
})
