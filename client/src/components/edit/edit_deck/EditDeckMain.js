import React from "react"
import EditDeckDetails from "./edit_deck_details/EditDeckDetails";
import EditFlashcardsMain from "./edit_flashcards/EditFlashcardsMain";
import axios from "axios";

export default class EditDeckMain extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            deck: this.props.deck ? this.props.deck : {},
            flashcards: [],
            user: this.props.user,
            editDeckFlashcardsSelected: false
        }
        this.handleEditDeckFlashcardsSelected = this.handleEditDeckFlashcardsSelected.bind(this)
    }

    componentDidMount() {
        this.setState({
            flashcards: axios({
                method: 'get',
                url: `http://localhost:5000/api/decks/${this.state.deck._id}/flashcards`,
                headers: {
                    'Authorization': `Bearer ${this.state.user.token}`
                }
            }).then(res => {
                this.setState({
                    flashcards: res.data
                })
            }).catch(err => {
                console.log(err.response)
            })
        })
    }

    /*
    Method that handles the event of a user selecting the "Edit this deck's flashcards" button
    It sets the editDeckFlashcardsSelected state to true, s.t. the EditFlashcardsMain component renders
    It also sets the deck state to the deck which is being edited
     */
    handleEditDeckFlashcardsSelected = (d) => {
        this.setState({
            deck: d,
            editDeckFlashcardsSelected: true
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.editDeckFlashcardsSelected !== prevState.editDeckFlashcardsSelected) {
            axios({
                method: 'get',
                url: `http://localhost:5000/api/decks/${this.state.deck._id}/flashcards`,
                headers: {
                    'Authorization': `Bearer ${this.props.user.token}`
                }
            }).then(res => {
                this.setState({
                    flashcards: res.data
                })
            }).catch(err => {
                console.log(err.response)
            })
        }
    }

    render() {
        // variable component that renders based on the user's actions
        let renderEditDeckDetails = <EditDeckDetails
            deck={this.state.deck}
            user={this.state.user}
            handleEditDeckFlashcardsSelected={this.handleEditDeckFlashcardsSelected}
            handleFinishDeckEditing={this.props.handleFinishDeckEditing}
        />
        if (this.state.editDeckFlashcardsSelected) {
            renderEditDeckDetails = <EditFlashcardsMain
                user={this.state.user}
                deck={this.state.deck}
                flashcards={this.state.flashcards}
                handleFinishDeckEditing={this.props.handleFinishDeckEditing}
            />
        }
        return (
            <div>
                {renderEditDeckDetails}
            </div>
        )
    }
}