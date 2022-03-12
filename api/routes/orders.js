const express = require('express');
const router = express.Router();


router.get('/', (req, res, next) => {

    res.status(200).json({
        message: 'Order GET',
        id: 5
    });
})

router.post('/', (req, res, next) => {
    const orders = {
        productId : req.body.productId,
        quantity : req.body.quantity
    }
    res.status(200).json({
        message: 'Order Post',
        orders: orders
    });
})

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    if (id === '123') {
        res.status(200).json({
            message: 'ok ID Order'
        })
    } else {
        res.status(200).json({
            message: 'failed ID Order'
        })
    }
});

router.patch('/:productId', (req, res, next) => {
    res.status(200).json({
        message: "Update Request Order!"
    })
})

router.delete('/:productId', (req, res, next) => {
    res.status(200).json({
        message: "Delete Request Order!"
    })
})

module.exports = router;