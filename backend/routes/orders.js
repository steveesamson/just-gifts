const express = require('express');
const { Encrypt } = require("../security");
const { Order, User } = require("../services");

const router = express.Router();

router.get('/detail/:id', async (req, res) => {

    try {
        const orderId = req.params.id;
        const data = await Order.findById(orderId).exec();
        res.status(200).json({ data });
    } catch (e) {
        console.error(e);
        res.status(400).json({ error: "Unable to fulfill your request." });
    }

});

router.get('/:id?', async (req, res) => {
    const { currentUser } = req;
    if (!currentUser) {
        return res.status(403).json({ error: "You have no access right to this resource." });
    }
    try {

        const orderId = req.params.id;
        let data;
        if (orderId) {
            data = await Order.findById(orderId).exec();
        } else {
            const { id, role } = currentUser;
            const filter = (role === 'admin') ? {} : { userId: id };
            data = await Order.find(filter).exec();
        }
        res.status(200).json({ data });
    } catch (e) {
        console.error(e);
        res.status(400).json({ error: "Unable to fulfill your request." });
    }

});

router.post('/', async (req, res) => {
    const { currentUser, body } = req;

    try {
        const {
            fullName,
            phone,
            address,
            city,
            emailAddress,
            password,
            province,
            postalCode,
            creditCardNo,
            cardExpiryMonth,
            cardExpiryYear,
            total: orderTotal,
            items } = body;


        let userId;
        if (currentUser) {
            const { id } = currentUser;
            userId = id;
        } else {
            // Register the user
            const encPassword = await Encrypt.hash(password);
            const user = await User.create({ fullName, emailAddress, role: 'shopper', password: encPassword });
            delete user.password;
            // Assign the id
            userId = user._id;
        }
        if (userId) {

            // shipping detail
            const shippingInfo = {
                fullName,
                emailAddress,
                phone,
                address,
                city,
                province,
                postalCode
            };
            // Update user with shipping info for later use
            await User.findOneAndUpdate({ _id: userId }, { shippingInfo });

            // populate order items
            const orderItems = items.map(({ productName, productImage, quantity, unitPrice, total }) => ({
                productName,
                productImage,
                quantity,
                unitPrice,
                total
            }));

            // Create order payload
            const maskCard = "XXXX-XXXX-XXXX-" + creditCardNo.split("-").pop();
            const orderLoad = {
                userId,
                creditCardNo: maskCard,
                cardExpiryMonth,
                cardExpiryYear,
                orderTotal,
                orderDate: new Date(),
                shippingInfo,
                orderItems
            };

            const order = await Order.create(orderLoad);

            res.status(200).json({ data: { _id: order._id } });
        }

    } catch (e) {
        console.error(e);
        if (e.toString().includes("duplicate key error")) {
            return res.status(400).json({ error: "User with same Email Address already exists." });
        }
        res.status(400).json({ error: "Unable to fullfil your request." });
    }
});


module.exports = router;
