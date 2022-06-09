const asyncHandler = require('express-async-handler')

const MODEL_PATH = '../models/'

const Flashcard = require(MODEL_PATH + 'flashcardModel')
const Deck = require(MODEL_PATH + 'deckModel')

/**
 * @desc    Get flashcards
 * @route   GET /api/decks/:deckId/flashcards
 * @access  Public
 */
const getFlashcards = asyncHandler(
    /**
     *
     * @param       req         request
     * @param       req.params  request parameters
     *
     * @param       res         response
     * @param       res.status  response status
     *
     * @returns     {Promise<void>}
     */
    async (req, res) => {

        const flashcards = await Flashcard.find({
            deck: req.params.deckId
        })

        res.status(200)
            .json(flashcards)
    }

)

/**
 * @desc    Create flashcards
 * @route   POST /api/decks/:deckId/flashcards
 * @access  Private
 */
const createFlashcard = asyncHandler(
    /**
     * @param       req                     request
     * @param       req.body                request body
     * @param       req.body.face           the flashcard's face
     * @param       req.body.back           the flashcard's back
     * @param       req.params.deckId       the flashcard's deck's id
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

        if (!req.body.face || !req.body.back) {
            res.status(400)
            throw new Error('Face or back empty')
        }

        const flashcard = await Flashcard.create({
            face: req.body.face,
            back: req.body.back,
            deck: req.params.deckId
        })

        const numCards = deck.numberOfCards

        await Deck.findByIdAndUpdate(
            req.params.deckId,
            {
                numberOfCards: numCards + 1
            }).exec()

        res.status(200).json(flashcard)
    }

)

/**
 * @desc    Update flashcard
 * @route   PUT /api/decks/:deckId/flashcards/:flashcardId
 * @access  Private
 */
const updateFlashcard = asyncHandler(
    /**
     * @param       req                     request
     * @param       req.body                request body
     * @param       req.params              request parameters
     * @param       req.params.deckId       deck's id
     * @param       req.params.flashcardId  flashcard's id
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

        const flashcard = await Flashcard.findById(req.params.flashcardId)

        if (!flashcard) {
            res.status(400)
            throw new Error('Flashcard not found')
        }

        const updatedFlashcard = await Flashcard.findByIdAndUpdate(
            req.params.flashcardId,
            req.body,
            { new: true }
        )

        res.status(200)
            .json(updatedFlashcard)
    }

)

/**
 * @desc    Delete flashcard
 * @route   DELETE /api/decks/:deckId/flashcards/:flashcardId
 * @access  Private
 */
const deleteFlashcard = asyncHandler(
    /**
     * @param       req                     request
     * @param       req.params              request parameters
     * @param       req.params.deckId       deck's id
     * @param       req.params.flashcardId  flashcard's id
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

        const flashcard = Flashcard.findById(req.params.flashcardId)

        if (!flashcard) {
            res.status(400)
            throw new Error('Flashcard not found')
        }

        await flashcard.deleteOne()

        const numCards = deck.numberOfCards

        await Deck.findByIdAndUpdate(
            req.params.deckId,
            {
                numberOfCards: numCards - 1
            }).exec()

        res.status(200)
            .json({
                id: req.params.flashcardId
            })
    }

)

module.exports = {
    getFlashcards,
    createFlashcard,
    updateFlashcard,
    deleteFlashcard
}