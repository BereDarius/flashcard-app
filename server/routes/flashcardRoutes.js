const express = require('express')
const flashcardRouter = express.Router({mergeParams: true})
const {
    getFlashcards,
    createFlashcard,
    updateFlashcard,
    deleteFlashcard } = require('../controllers/flashcardController')
const { protect } = require('../middleware/authMiddleware')

flashcardRouter.route('/')
    .get(getFlashcards)
    .post(protect, createFlashcard)

flashcardRouter.route('/:flashcardId')
    .put(protect, updateFlashcard)
    .delete(protect, deleteFlashcard)

module.exports = flashcardRouter