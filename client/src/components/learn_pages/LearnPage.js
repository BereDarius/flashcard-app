import React from "react";
import LearnDeck from "./learn_deck/LearnDeck";
import LearnDecksList from "./learn/LearnDecksList";
import axios from "axios";

export default class LearnPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            chosenDeckFlashcards: [],
            deckSelected: false
        }
        this.handleDeckChosen = this.handleDeckChosen.bind(this)
    }

    /*
    Method that sets the chosenDeck state to send to the LearnDecksList component as a prop
     */
    handleDeckChosen = (deckId) => {
        this.setState(prevState => (
            {
                deckChosen: deckId
            }
        ))
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.deckChosen !== -1) {
            if (this.state.deckChosen !== prevState.deckChosen) {
                axios.get(`http://localhost:5000/api/decks/${this.state.deckChosen}/flashcards`)
                    .then(res => {
                        this.setState(
                            {
                                chosenDeckFlashcards: res.data
                            }
                        )
                    })
            }
            if (this.state.chosenDeckFlashcards !== prevState.chosenDeckFlashcards) {
                this.setState({
                    deckSelected: true
                })
            }
        }
    }

    /*
    When the user finishes learning a deck, set the deckSelected state back to false, so the user can learn another one
     */
    handleDeckFinished = () => {
        this.setState({
            deckSelected: false,
            deckChosen: -1,
            chosenDeckFlashcards: []
        })
    }

    render() {
        // variable component that renders based on the user's actions
        let renderLearn = <LearnDecksList
            handleDeckChosen={this.handleDeckChosen}
        />
        if (this.state.deckSelected) {
            renderLearn = <LearnDeck
                flashcards={this.state.chosenDeckFlashcards}
                handleDeckFinished={this.handleDeckFinished}
            />
        }
        return (
            <div>
                {renderLearn}
            </div>
        )
    }

}