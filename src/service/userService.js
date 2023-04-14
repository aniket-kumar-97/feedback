const User = require("../model/User");
const CustomerFeedback = require("../model/CustomerFeedback");
const util = require("../util/util");

const _ = require("lodash");
const signup = async (req, res) => {
    try {
        const reqBody = req.body;
        const userData = await Promise.all(
            [
                User
                    .where("email")
                    .equals(reqBody.email)
                    .limit(1),
                User
                    .where("phone")
                    .equals(reqBody.phone)
                    .limit(1)
            ]
        );

        if (userData[0].length !== 0 || userData[1].length !== 0) {
            return res.json({statusCode: 400, msg: "User already Exists with email/password"})
        }

        const password = reqBody.password;
        const hash = await util.hash(password);

        const user = await User.create({
            name: reqBody.name,
            email: reqBody.email,
            password: hash,
            phone: reqBody.phone
        })
        return res.json({statusCode: 200});
    } catch (e) {
        console.log("err ===>", e.msg, e.stack);
        return res.json({statusCode: 500, msg: "Unexpected error occurred. Please try again"});
    }
}
const login = async (req, res) => {
    try {
        const reqBody = req.body;
        const user = await User.findOne({email: reqBody.email});

        if (user === null) {
            return res.json({statusCode: 404, msg: "Incorrect email"});
        }

        const correctPassword = await util.compare(reqBody.password, user.password);

        if (!correctPassword) {
            return res.json({statusCode: 404, msg: "Incorrect email/Password"});
        }

        return res.json({statusCode: 200, userId: user.id});
    } catch (e) {
        return res.json({statusCode: 500, msg: "Unexpected error occurred. Please try again"});
    }
}

const customerFeedback = async (req, res) => {
    try {
        const reqBody = req.body;

        const userId = _.get(reqBody, "userId")
        if (_.isNull(userId)) {
            return res.status(401).json({msg: "Please login.."});
        }

        const customerFeedback = await CustomerFeedback.create({
            userId: _.get(reqBody, "userId"),
            delivery_rating: _.get(reqBody, "rating", ""),
            delivery_wearing_mask: _.get(reqBody, "wearing_mask", ""),
            delivery_packet_left_doorstep: _.get(reqBody, "packet_left_doorstep", ""),
            delivery_comment: _.get(reqBody, "delivery_comment", ""),
            food_rating: _.get(reqBody, "food_rating", ""),
            food_quality_rating: _.get(reqBody, "food_quality_rating", ''),
            restaurant_comment: _.get(reqBody, "restaurant_comment", "")
        });
        return res.json({statusCode: 200});
    } catch (e) {
        return res.json({statusCode: 500, msg: "Unexpected error occurred. Please try again"});
    }
}

const getFeedbackByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;

        const data = await Promise.all(
            [
                User.findById(userId),
                CustomerFeedback.find()
                    .where("userId")
                    .equals(userId)
            ]
        )
        let user = null;
        if (!_.isNull(data[0])) {
            user = data[0];
        }
        let reviews = [];
        if (!_.isNull(data[1])) {
            _.each(data[1], eachReviews => {
                reviews.push(
                    {
                        "delivery_rating": _.get(eachReviews, "delivery_rating", ""),
                        "delivery_wearing_mask": _.get(eachReviews, "delivery_wearing_mask", ""),
                        "delivery_packet_left_doorstep": _.get(eachReviews, "delivery_packet_left_doorstep", ""),
                        "delivery_comment": _.get(eachReviews, "delivery_comment", ""),
                        "food_rating": _.get(eachReviews, "food_rating", ""),
                        "food_quality_rating": _.get(eachReviews, "food_quality_rating", ""),
                        "restaurant_comment": _.get(eachReviews, "restaurant_comment", "")
                    }
                )
            })
        }
        return res.json(reviews);
    } catch (e) {
        return res.json({statusCode: 500, msg: "Unexpected error occurred. Please try again"});
    }
}


module.exports = {
    signup,
    login,
    customerFeedback,
    getFeedbackByUserId
}