const mongoose = require("mongoose");

const customerFeedbackSchema = new mongoose.Schema({
    userId: String,
    delivery_rating: String,
    delivery_wearing_mask: String,
    delivery_packet_left_doorstep: String,
    delivery_comment: String,
    food_rating: String,
    food_quality_rating: String,
    restaurant_comment: String
})

module.exports = mongoose.model("customer_feedback", customerFeedbackSchema);