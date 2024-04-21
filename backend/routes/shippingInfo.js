const express = require('express');
const { User } = require("../services");


const router = express.Router();


router.get('/:dumbId', async (req, res) => {
    const { currentUser } = req;
    if (!currentUser) {
        return res.status(403).json({ error: "You have no access right to this resource." });
    }
    try {
        const id = currentUser.id;
        let data;
        if (id) {
            data = await User.findById(id).exec();
        } else {
            data = await User.find({}).exec();
        }
        delete data.password;
        res.status(200).json({ data });
    } catch (e) {
        console.error(e);
        res.status(400).json({ error: "Unable to fulfill your request." });
    }

});


module.exports = router;
