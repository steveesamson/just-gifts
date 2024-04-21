const { scrypt, randomBytes } = require("crypto");
const { promisify } = require("util");

//Ok only for tests
const SECRET = 's3kr3t35';

const scryptAsync = promisify(scrypt);

// Manages auth tokens
const Token = {
    sign(load) {
        return require("jsonwebtoken").sign(load, SECRET);
    },
    verify(token) {
        try {
            return require("jsonwebtoken").verify(token, SECRET);
        } catch (e) {
            return null;
        }
    },
},
    // Handles password encryptions
    Encrypt = {
        async verify(suppliedPassword, storedPassword) {
            const [hashedPassword, salt] = storedPassword.split(".");
            const buf = (await scryptAsync(suppliedPassword, salt, 64));
            return buf.toString("hex") === hashedPassword;
        },
        async hash(plain) {
            const salt = randomBytes(8).toString("hex");
            const buf = (await scryptAsync(plain, salt, 64));

            return `${buf.toString("hex")}.${salt}`;
        },
    },
    // Middleware to ID session users
    SessionUser = (req, res, next) => {
        if (req.header("Authorization")) {
            const tokens = req.header("Authorization").split(' ');
            if (tokens.length > 1) {
                const token = tokens[1].trim();
                const decoded = Token.verify(token);
                if (decoded) {
                    req.currentUser = decoded;
                    // console.log(decoded);
                }
            }

        }
        next();
    },
    OnlyAdmin = (req, res, next) => {
        const { currentUser } = req;
        if (!currentUser || currentUser.role !== 'admin') {
            return res.status(403).json({ error: "You have no access right to this resource." });
        }
        next();
    };
module.exports = { Token, Encrypt, SessionUser, OnlyAdmin };
