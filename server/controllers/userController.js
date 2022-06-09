const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')

const MODEL_PATH = '../models/'

const User = require(MODEL_PATH + 'userModel')

/**
 * @desc    Register user
 * @route   POST /api/users
 * @access  Public
 */
const registerUser = asyncHandler(

    /**
     * @param       req                   request
     * @param       req.body              request body
     *
     * @param       res                   response
     * @param       res.status            response status
     * @param       res.json              response json
     *
     * @returns     {Promise<void>}
     */

    async (req, res) => {

        const { firstName, lastName, email, password } = req.body

        if (!firstName || !lastName || !email || !password) {
            res.status(400)
            throw new Error('Please add all fields for the user')
        }

        // Check if user exists
        const userExists = await User.findOne({email})

        if (userExists) {
            res.status(400)
            throw new Error('User already exists')
        }

        // Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // Create user
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        })

        if (user) {
            res.status(201).json({
                _id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                token: generateToken(user.id)
            })
        } else {
            res.status(400)
            throw new Error('Invalid user data')
        }
    }

)

/**
 * @desc    Authenticate user
 * @route   POST /api/users/login
 * @access  Public
 */
const loginUser = asyncHandler(
    /**
     * @param   req             request
     * @param   req.body        request body
     *
     * @param   res             response
     * @param   res.json        response json
     * @param   res.status      response status
     *
     * @returns {Promise<void>}
     */
    async (req, res) => {

        const { email, password } = req.body

        // Check for user by email
        const user = await User.findOne({ email })

        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                token: generateToken(user.id)
            })
        } else {
            res.status(400)
            throw new Error('Invalid credentials')
        }
    }

)

/**
 * @desc    Get user data
 * @route   GET /api/users/me
 * @access  Private
 */
const getMe = asyncHandler(
    /**
     * @param       req                 request
     * @param       req.user            request user
     *
     * @param       res                 response
     * @param       res.json            response json
     * @param       res.status          response status
     *
     * @returns     {Promise<void>}
     */
    async (req, res) => {
        const { id, firstName, lastName, email } = await User.findById(req.user.id)

        res.status(200).json({
            id: id,
            firstName,
            lastName,
            email
        })
    }

)

/**
 * @desc    Get all users
 * @route   GET /api/users/all
 * @access  Public
 */
const getAllUsers = asyncHandler(
    /**
     *
     * @param       req                 request
     *
     * @param       res                 response
     * @param       res.status          response status
     *
     * @returns     {Promise<void>}
     */
    async (req, res) => {
        let users = await User.find()
        users = users.map(({id, firstName, lastName, email}) => {
            return { id,
                firstName,
                lastName,
                email
            }
        })
        res.status(200)
            .json(users)
    }

)

// Generate JSON Web Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe,
    getAllUsers
}