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

    console.log(email);
    const checkIfUserExists = User.findOne({ "$or": [{ email }, { username }] }).select('email');

    console.log(checkIfUserExists);

    if (!checkIfUserExists) {
        const user = await User.create({
            first_name,
            last_name,
            username,
            email,
            password
        });

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user
        });
    } else {
        return sendErrorResponse(res, 422, 'Email or username already exists');
    }


}