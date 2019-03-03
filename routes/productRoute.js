const express = require('express'),
    Product = require('../models/product');
const router = express.Router();

router.post('/product', (req,res) => {
    const newProduct = new Product({
        name:req.body.name,
        price:req.body.price,
        description:req.body.description,
        image:req.body.image,
        rating:req.body.rating,
        category:req.body.category
    })
    newProduct.save()
    .then(product => {
        res.json(product)
    })
})

router.get('/', (req, res) => {
    Product.find()
    .sort({date:-1})
    .select('_id name price')
    .exec()
    .then(products => {
        const response = {
            count: products.length,
            products: products.map(product => {
                return {
                    product, request: {
                        type:'GET',
                        url:'http://localhost:5000/api/' + product._id
                    }
                }
            })

        }
        res.json(response)
    })
})

router.get('/:id', (req,res) => {
    Product.findById(req.params.id)
    .exec()
    .then(product => res.json(product))
    .catch(err => {
        res.status(500).json({error:err})
    })
})
module.exports = router;