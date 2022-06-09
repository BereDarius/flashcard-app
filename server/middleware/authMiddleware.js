const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

const MODEL_PATH = '../models/'

const User = require(MODEL_PATH + 'userModel')

const protect = asyncHandler(
    /**
     * @param   req                 request
     * @param   req.headers         request headers
     * @param   req.user            request user
     *
     * @param   res                 response
     * @param   res.status          response status
     *
     * @param   next                next
     *
     * @returns {Promise<void>}
     */
    async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1]

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // Get user from the token
            req.user = await User.findById(decoded.id).select('-password')

            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not authorized')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

module.exports = { protect }