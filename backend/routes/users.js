const express = require('express');
const router = express.Router();
const { Encrypt, Token, OnlyAdmin } = require("../security");
const { User } = require("../services");


router.post('/login', async (req, res) => {

    try {
        const { emailAddress, password } = req.body;

        const user = await User.findOne({ emailAddress }).exec();

        if (!user) {
            return res.status(400).json({ error: 'Invalid login credentials.' });
        }
        const { password: storedPassword } = user;
        delete user.password;
        const passwordMatches = await Encrypt.verify(password, storedPassword);

        if (!passwordMatches) {
            return res.status(400).json({ error: 'Invalid login credentials.' });
        }

        const payload = {
            id: user.id,
            email: user.emailAddress,
            name: user.fullName,
            role: user.role,
        };
        const jwt = Token.sign(payload);
        const { name, role } = payload;
        res.status(200).json({ data: { key: jwt, user: { name, role } } });
    } catch (e) {
        console.error(e);
        res.status(400).json({ error: "Unable to log you in." });
    }
});

router.get('/:id?', [OnlyAdmin], async (req, res) => {

    try {
        const id = req.params.id;
        let data;
        if (id) {
            data = await User.findById(id).exec();
        } else {
            data = await User.find({}).exec();
        }
        res.status(200).json({ data });
    } catch (e) {
        console.error(e);
        res.status(400).json({ error: "Unable to fulfill your request." });
    }

});

router.post('/', [OnlyAdmin], async (req, res) => {
    const { currentUser } = req;
    if (!currentUser) {
        return res.status(403).json({ error: "You have no access right to this resource." });
    }
    const body = req.body;
    const { role: toBeCreatedRole } = body
    const { role: senderRole } = currentUser;

    if (toBeCreatedRole === 'admin' && senderRole != 'admin') {
        return res.status(403).json({ error: "You have no access right to this resource." });
    }

    try {
        const { fullName, emailAddress, password, role } = body;
        const encPassword = await Encrypt.hash(password);
        const user = new User({ fullName, emailAddress, role, password: encPassword });
        const data = await user.save();
        delete data.password;
        res.status(200).json({ data });
    } catch (e) {
        console.error(e);
        if (e.toString().includes("duplicate key error")) {
            return res.status(400).json({ error: "User with same Email Address already exists." });
        }
        res.status(400).json({ error: "Unable to add user." });
    }
});


router.put('/:id', [OnlyAdmin], async (req, res) => {
    try {
        const id = req.params.id;
        const filter = { _id: id };
        const update = req.body;
        const data = await User.findOneAndUpdate(filter, update);
        res.status(201).json({ data });
    } catch (e) {
        console.error(e);
        res.status(400).json({ error: "Unable to update user." });
    }
});

router.delete('/:id', [OnlyAdmin], async (req, res) => {
    try {
        const id = req.params.id;
        const { deletedCount } = await User.deleteOne({ _id: id });
        res.status(200).json({ data: { id, deletedCount } });
    } catch (e) {
        console.error(e);
        res.status(400).json({ error: "Unable to delete user." });
    }
});

module.exports = router;
