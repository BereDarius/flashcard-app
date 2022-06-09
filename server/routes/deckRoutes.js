const express = require('express')
const deckRouter = express.Router({mergeParams: true})
const {
    getAllDecks,
    getUserDecks,
    createDeck,
    updateDeck,
    deleteDeck } = require('../controllers/deckController')
const { protect } = require('../middleware/authMiddleware')

deckRouter.route('/all')
    .get(getAllDecks)

deckRouter.route('/')
    .get(protect, getUserDecks)
    .post(protect, createDeck)

deckRouter.route('/:deckId')
    .put(protect, updateDeck)
    .delete(protect, deleteDeck)

module.exports = deckRouter