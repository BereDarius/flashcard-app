const mongoose = require('mongoose')
const { Schema } = mongoose

const deckSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Please add a value for the deck\'s title']
        },
        subject: {
            type: String,
            required: [true, 'Please add a value for the deck\'s subject']
        },
        author: {
            type: String
        },
        numberOfCards: {
            type: Number,
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Deck', deckSchema)