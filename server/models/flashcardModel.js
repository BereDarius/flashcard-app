const mongoose = require('mongoose')
const { Schema } = mongoose

const flashcardSchema = new Schema(
    {
        face: {
            type: String,
            required: [true, 'Please add a value for the flashcard\'s face']
        },
        back: {
            type: String,
            required: [true, 'Please add a value for the flashcard\'s back']
        },
        deck: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Deck'
        }
    },
    {
    timestamps: true
    }
)

module.exports = mongoose.model('Flashcard', flashcardSchema)