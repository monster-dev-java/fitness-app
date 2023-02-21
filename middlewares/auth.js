const User = require("../models/User");
const { sendErrorResponse } = require("../utils/Response");
// const User = db.;

const checkDuplicateUsernameOrEmail = (req, res, next) => {

    //check the username if already exists.
    User.findOne({
        username: req.body.username
    }).exec((error, user) => {
        if (error) {
            // return res.status(500).send({ message: err });
            return sendErrorResponse(res, 500, err);
        }
        if (user) {
            // return res.status(422).send({message})

            console.log("user", user);

            return sendErrorResponse(res, 422, 'Username already exists. Please create a new One.');
        }
    });

    //check if the email exists
    User.findOne({
        email: req.body.email
    }).exec((error, user) => {
        if (error) {
            return sendErrorResponse(res, 500, err);
        }

        if (user) {
            return sendErrorResponse(res, 422, 'Email already taken. Please choose a different one');
        }
    })
}

module.exports = {
    checkDuplicateUsernameOrEmail
}