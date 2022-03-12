const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const productModel = require('./../../models/productsModel');


router.get('/', (req, res, next) => {
    productModel.find()
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error : err
            })
        })
})

router.post('/', (req, res, next) => {
    const products = new productModel({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    })
    products.save()
        .then(result => {
            console.log(result)
            res.status(201).json({
                message: 'product POST',
                createdProducts: result
            });
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })

})

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    productModel.findById(id)
        .exec()
        .then(result => {
            console.log(result)
            result ?
                res.status(200).json(result) :
                res.status(404).json({'message' : 'Invalid Url'})
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err})
        })
});

router.patch('/:productId', (req, res, next) => {
    res.status(200).json({
        message: "Update Request Product!"
    })
})

router.delete('/:productId', (req, res, next) => {
    res.status(200).json({
        message: "Delete Request Product!"
    })
})

module.exports = router;