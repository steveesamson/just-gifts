const express = require('express');
const { Product } = require("../services");
const { OnlyAdmin } = require("../security/");

const router = express.Router();


router.get('/:id?', async (req, res) => {
    try {
        const id = req.params.id;
        let data;
        if (id) {
            data = await Product.findById(id).exec();
        } else {
            data = await Product.find({}).exec();
        }
        res.status(200).json({ data });
    } catch (e) {
        console.error(e);
        res.status(400).json({ error: "Unable to fulfill your request." });
    }

});

router.post('/', [OnlyAdmin], async (req, res) => {

    try {
        const { productName, productImage, imageName, description, unitPrice, quantityInStock } = req.body;
        const product = new Product({ productName, productImage, imageName, description, unitPrice, quantityInStock });
        const data = await product.save();
        res.status(200).json({ data });
    } catch (e) {
        console.error(e);
        res.status(400).json({ error: "Unable to add product." });
    }
});


router.put('/:id', [OnlyAdmin], async (req, res) => {

    try {
        const id = req.params.id;
        const filter = { _id: id };
        const update = req.body;
        const data = await Product.findOneAndUpdate(filter, update);
        res.status(201).json({ data });
    } catch (e) {
        console.error(e);
        res.status(400).json({ error: "Unable to update product." });
    }
});

router.delete('/:id', [OnlyAdmin], async (req, res) => {

    try {
        const id = req.params.id;
        const { deletedCount } = await Product.deleteOne({ _id: id });
        res.status(200).json({ data: { id, deletedCount } });
    } catch (e) {
        console.error(e);
        res.status(400).json({ error: "Unable to delete product." });
    }
});

module.exports = router;
