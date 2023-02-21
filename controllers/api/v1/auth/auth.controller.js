const User = require("../../../../models/User");
const {
    sendErrorResponse,
    sendSuccessResponse
} = require("../../../../utils/Response");

/**
 * for register a new user
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @route POST /api/v1/auth/register
 * @access public
 */
exports.register = async (req, res, next) => {
    const { first_name, last_name, username, email, password } = req.body;

    // TODO: need to seperate the validation logic from the controller
    if (!first_name) {
        return sendErrorResponse(res, 422, 'First name is required');
    }

    if (!email) {
        return sendErrorResponse(res, 422, 'Email is required');
    }

    if (!password) {
        return sendErrorResponse(res, 422, 'Password is required');
    }

    if (!username) {
        return sendErrorResponse(res, 422, 'Username is required');
    }


    // TODO: needs to add validation for the username also along with the email.
    // TODO: needs to add the validation for the email and username exists in the middlewares.
    User.findOne({ email: email }, function (error, data) {
        if (!data) {

            const user = User.create({
                first_name,
                last_name,
                username,
                email,
                password
            });

            return sendSuccessResponse(res, 201, user, 'User Registered successfully');
        } else {
            return sendErrorResponse(res, 422, "Email already exists.")
        }
    })






}