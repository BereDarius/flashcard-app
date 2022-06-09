import React from "react";
import FlashcardsList from "./flashcards_list/FlashcardsList";
import CreateFlashcard from "./create_flashcard/CreateFlashcard";
import EditFlashcard from "./edit_flashcard/EditFlashcard";

export default class EditFlashcardsMain extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: this.props.user,
            deck: this.props.deck,
            flashcards: this.props.flashcards,
            createFlashcardSelected: false,
            editFlashcardSelected: false,
            flashcard: {}
        }
        this.handleCreateFlashcardSelected = this.handleCreateFlashcardSelected.bind(this)
        this.handleFlashcardCreated = this.handleFlashcardCreated.bind(this)
        this.handleEditFlashcardSelected = this.handleEditFlashcardSelected.bind(this)
        this.handleFlashcardUpdated = this.handleFlashcardUpdated.bind(this)
        this.handleFlashcardDeleted = this.handleFlashcardDeleted.bind(this)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if ((this.state.editFlashcardSelected !== prevState.editFlashcardSelected) ||
            (this.state.createFlashcardSelected !== prevState.createFlashcardSelected)) {

            this.setState({
                flashcards: this.state.flashcards
            })

        }

    }

    /*
    Method that handles the event of a user selecting the "Create new flashcard" button
    It sets the createFlashcardSelected state to true, s.t. the CreateFlashcard component renders
     */
    handleCreateFlashcardSelected = () => {
        this.setState({
            createFlashcardSelected: true
        })
    }

    /*
    Method that handles the event when the user finished creating a new flashcard for the current deck
     */
    handleFlashcardCreated = (f) => {
        this.setState({
            createFlashcardSelected: false
        })
    }

    /*
    Method that handles the event of a user selecting the option to edit a flashcard
    It sets the editFlashcardSelected state to true, s.t. the EditFlashcard component renders
    It also sets the flashcard state to the flashcard that the user chose to edit
     */
    handleEditFlashcardSelected = (f) => {
        this.setState({
            flashcard: f,
            editFlashcardSelected: true
        })
    }

    handleFlashcardUpdated = () => {
        this.setState({
            editFlashcardSelected: false
        })
    }

    handleFlashcardDeleted = (flashcardId) => {
        this.setState({
            flashcards: this.state.flashcards.filter(card => {
                return card._id !== flashcardId
            })
        })
    }

    render() {
        // variable component that renders based on the user's actions
        let renderFlashcardsList = <FlashcardsList
            user={this.state.user}
            deck={this.state.deck}
            flashcards={this.state.flashcards}
            handleCreateFlashcardSelected={this.handleCreateFlashcardSelected}
            handleEditFlashcardSelected={this.handleEditFlashcardSelected}
            handleFlashcardDeleted={this.handleFlashcardDeleted}
            handleFinishDeckEditing={this.props.handleFinishDeckEditing}
        />
        if (this.state.createFlashcardSelected) {
            renderFlashcardsList = <CreateFlashcard
                user={this.state.user}
                handleFlashcardCreated={this.handleFlashcardCreated}
                deck={this.state.deck}
            />
        } else if (this.state.editFlashcardSelected) {
            renderFlashcardsList = <EditFlashcard
                user={this.state.user}
                deck={this.state.deck}
                handleFlashcardUpdated={this.handleFlashcardUpdated}
                flashcard={this.state.flashcard} />
        }
        return (
            <div>
                {renderFlashcardsList}
            </div>
        )
    }
}