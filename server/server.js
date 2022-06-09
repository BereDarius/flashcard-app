const express = require('express')
const dotenv = require('dotenv').config()
const cors = require('cors')
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDatabase = require('./config/db')
const port = process.env.PORT

// Connect to the database
connectDatabase()

const app = express()
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Flashcard routes
app.use('/api/decks/:deckId/flashcards', require('./routes/flashcardRoutes'))

// Deck routes
app.use('/api/decks', require('./routes/deckRoutes'))

// User routes
app.use('/api/users', require('./routes/userRoutes'))

// Error handler
app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))