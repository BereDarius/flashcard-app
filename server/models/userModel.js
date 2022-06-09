const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: [true, 'Please add a value for the user\'s first name']
        },
        lastName: {
            type: String,
            required: [true, 'Please add a value for the user\'s last name']
        },
        email: {
            type: String,
            required: [true, 'Please add a value for the user\'s email'],
            unique: true
        },
        password: {
            type: String,
            required: [true, 'Please add a value for the user\'s password']
        }
    },
    {
        timestamps: true
    })

module.exports = mongoose.model('User', userSchema)