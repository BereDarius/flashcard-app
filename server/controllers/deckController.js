const asyncHandler = require('express-async-handler')

const MODEL_PATH = '../models/'

const Flashcard = require(MODEL_PATH + 'flashcardModel')
const Deck = require(MODEL_PATH + 'deckModel')
const User = require(MODEL_PATH + 'userModel')

/**
 * @desc    Get decks
 * @route   GET /api/decks
 * @access  Public
 */
const getAllDecks = asyncHandler(
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
        const decks = await Deck.find()
        res.status(200)
            .json(decks)
    }

)

const getUserDecks = asyncHandler(
    /**
     *
     * @param       req                 request
     * @param       req.user            the currently logged-in user
     *
     * @param       res                 response
     * @param       res.status          response status
     *
     * @returns     {Promise<void>}
     */
    async (req, res) => {

        const decks = await Deck.find({
            user: req.user.id
        })
        res.status(200)
            .json(decks)

    }
)

/**
 * @desc    Create deck
 * @route   POST /api/decks
 * @access  Private
 */
const createDeck = asyncHandler(
    /**
     * @param       req                     request
     * @param       req.body                request body
     * @param       req.body.title          the deck's title
     * @param       req.body.subject        the deck's subject
     * @param       req.user                the currently logged-in deck's user
     *
     * @param       res                     response
     * @param       res.status              response status
     *
     * @returns     {Promise<void>}
     */
    async (req, res) => {

        if (!req.body.title || !req.body.subject) {
            res.status(400)
            throw new Error('Title or subject empty')
        }

        const user = await User.findById(req.user.id)

        const authorName = `${user.firstName} ${user.lastName}`

        const deck = await Deck.create({
            title: req.body.title,
            subject: req.body.subject,
            numberOfCards: 0,
            author: authorName,
            user: req.user.id
        })

        res.status(200).json(deck)
    }

)

/**
 * @desc    Update deck
 * @route   PUT /api/decks
 * @access  Private
 */
const updateDeck = asyncHandler(
    /**
     * @param       req                     request
     * @param       req.body                request body
     * @param       req.params              request parameters
     * @param       req.params.deckId       deck's id
     * @param       req.user                the deck's user
     *
     * @param       res                     response
     * @param       res.status              response status
     *
     * @returns     {Promise<void>}
     */
    async (req, res) => {

        const deck = await Deck.findById(req.params.deckId)

        if (!deck) {
            res.status(400)
            throw new Error('Deck not found')
        }

        const user = await User.findById(req.user.id)

        // Check for user
        if (!user) {
            res.status(401)
            throw new Error('User not found')
        }

        // Only the logged-in user matches the deck's user
        if (deck.user.toString() !== user.id) {
            res.status(401)
            throw new Error('User not authorized')
        }

        const updatedDeck = await Deck.findByIdAndUpdate(
            req.params.deckId,
            req.body,
            { new: true }
        )

        res.status(200)
            .json(updatedDeck)
    }

)

/**
 * @desc    Delete deck
 * @route   GET /api/decks
 * @access  Private
 */
const deleteDeck = asyncHandler(
    /**
     * @param       req                     request
     * @param       req.params              request parameters
     * @param       req.params.deckId       deck's id
     * @param       req.user                the deck's user
     *
     * @param       res                     response
     * @param       res.status              response status
     *
     * @returns     {Promise<void>}
     */
    async (req, res) => {

        const deck = await Deck.findById(req.params.deckId)

        if (!deck) {
            res.status(400)
            throw new Error('Deck not found')
        }

        const user = await User.findById(req.user.id)

        // Check for user
        if (!user) {
            res.status(401)
            throw new Error('User not found')
        }

        // Only the logged-in user matches the deck's user
        if (deck.user.toString() !== user.id) {
            res.status(401)
            throw new Error('User not authorized')
        }

        await Flashcard.deleteMany({deck: deck.id})

        await deck.deleteOne()

        res.status(200)
            .json({
                id: req.params.deckId
            })
    }

)

module.exports = {
    getAllDecks,
    getUserDecks,
    createDeck,
    updateDeck,
    deleteDeck
}