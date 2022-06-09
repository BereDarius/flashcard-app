import React from "react";
import {Button, Container} from "react-bootstrap";
import Flashcard from "../flashcard/Flashcard";

export default class LearnDeck extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            index: 0,
            flashcards: []
        }
    }

    componentDidMount() {
        this.setState({
            flashcards: this.props.flashcards
        })
    }

    /*
    Functional component that is rendered whenever the user finishes learning a deck
     */
    DeckCompleted = () => {
        return (
            <div className="my-5 text-center">
                <h1 className="my-5">Congratulations! You finished the deck!</h1>
                <Button
                    onClick={() => this.props.handleDeckFinished()}
                    className="my-5"
                    size="lg"
                    style={{
                        cursor: "pointer"
                    }}
                >
                    Go back to Learn page
                </Button>
            </div>
        )
    }

    /*
    When the user learns a flashcard, remove it from the flashcards state (by id)
    Check the state's index. If the index is at the end of the list, then set it to 0, else don't change it
     */
    handleLearned = () => {
        this.setState({
            flashcards: this.state.flashcards.filter(card => {
                return (card._id !== this.state.flashcards[this.state.index]._id)
            }),
            index: this.state.index === this.state.flashcards.length - 1 ? 0 : this.state.index
        })
    }

    /*
    If the user didn't learn the flashcard, set the index to next, unless the index is at the end of the list,
    in which case set the index to 0
     */
    handleNotLearned = () => {
        if (this.state.index === this.state.flashcards.length - 1) {
            this.setState({
                index: 0
            })
        } else {
            this.setState({
                index: this.state.index + 1
            })
        }
    }

    render() {
        /*
        variable component that is rendered based on the deck's completion
        if the deck is completed, then the DeckCompleted component is rendered,
        else the Flashcard component is rendered based on the user's choice
         */
        let learnDeckComponent
        if (this.state.flashcards.length === 0) {
            learnDeckComponent = <this.DeckCompleted />
        } else {
            learnDeckComponent = <Flashcard
                face={this.state.flashcards[this.state.index].face}
                back={this.state.flashcards[this.state.index].back}
                handleLearned={this.handleLearned}
                handleNotLearned={this.handleNotLearned}
            />
        }
        return (
            <Container className="my-5">
                {learnDeckComponent}
            </Container>
        )
    }
}