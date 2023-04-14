const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phone: Number,
    role: String,
    createdAt: {
        type: Date,
        default: () => new Date()
    }
})

module.exports = mongoose.model("User", userSchema);