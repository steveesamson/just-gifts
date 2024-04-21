const express = require('express');
const cors = require('cors');
// Import routes
const products = require("./routes/products");
const users = require("./routes/users");
const orders = require("./routes/orders");
const shippings = require("./routes/shippingInfo");
// App
const PORT = 3000;

// Middleware to populate session with active session owner
const { SessionUser } = require("./security");
// Db
const { connectDB } = require("./services");

const app = express();
app.use(cors());
app.use(express.json());
app.use(SessionUser);

// Register routes
app.get("/", (req, res) => {
    res.send("Hello from Just Gifts backend!");
})
app.use("/users", users);
app.use("/products", products);
app.use("/orders", orders);
app.use("/shippings", shippings);


const startApp = () => {
    app.listen(PORT, () => {
        console.log(`Just Gifts backend runs at http://localhost:${PORT}`);
    });
};
// Ensure Db is connected before starting server
connectDB().then(startApp);



