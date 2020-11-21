const mongoose= require('mongoose');

const userSchema = new mongoose.Schema({
        email: String,
        contact: Number,
        transactionId: String,
        orderId: String,
        amount: Number 
})
module.exports = mongoose.model("User", userSchema);