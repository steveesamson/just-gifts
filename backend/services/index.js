const { ObjectId } = require('mongodb');
const { connect, Schema, model, disconnect } = require('mongoose');
const CONSTR = "atlas mongodb connection string here";


const connectDB = async () => {
    // connect to Your MongoDB Atlas Database
    await connect(CONSTR);
};

const userSchema = new Schema({
    fullName: {
        type: String,
        unique: true
    },
    emailAddress: {
        type: String,
        unique: true
    },
    password: String,
    role: String,
    shippingInfo: {
        phone: String,
        address: String,
        city: String,
        province: String,
        postalCode: String,
    }
});


const productSchema = new Schema({
    productName: String,
    productImage: String,
    imageName: String,
    quantityInStock: Number,
    description: String,
    unitPrice: Number
});


const orderSchema = new Schema({
    userId: ObjectId,
    creditCardNo: String,
    cardExpiryMonth: String,
    cardExpiryYear: String,
    orderTotal: Number,
    orderDate: Date,
    shippingInfo: {
        fullName: String,
        emailAddress: String,
        phone: String,
        address: String,
        city: String,
        province: String,
        postalCode: String,
    },
    orderItems: [{
        productName: String,
        productImage: String,
        quantity: Number,
        unitPrice: Number,
        total: Number
    }],
});

module.exports = {
    User: model('user', userSchema),
    Product: model('product', productSchema),
    Order: model('order', orderSchema),
    disconnectDB: disconnect,
    connectDB,
};



