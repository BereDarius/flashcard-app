import React from "react";
import UserDecksList from "./user_decks_list/UserDecksList"
import EditDeckMain from "./edit_deck/EditDeckMain";
import CreateDeckMain from "./create_deck/CreateDeckMain";
import UserContext from "../user_authentication/UserContext";

export default class EditMain extends React.Component {

    static contextType = UserContext

    constructor(props, context) {
        super(props, context)
        this.state = {
            user: this.context.user,
            createDeckSelected: false,
            editDeckSelected: false
        }
        this.handleCreateDeckSelected = this.handleCreateDeckSelected.bind(this)
        this.handleEditDeckSelected = this.handleEditDeckSelected.bind(this)
    }

    /*
    Method that handles the event of a user selecting the "Create new deck" button
    It sets the createDeckSelected state to true, s.t. the CreateDeckMain component renders
     */
    handleCreateDeckSelected = () => {
        this.setState({
            createDeckSelected: true
        })
    }

    /*
    Method that handles the event of a user selecting the option to edit a deck
    It sets the editDeckSelected state to true, s.t. the EditDeckMain component renders
    It also sets the editDeckChosen state to the deck that the user chose to edit
     */
    handleEditDeckSelected = (d) => {
        this.setState({
            editDeckChosen: d,
            editDeckSelected: true
        })
    }

    handleFinishDeckEditing = () => {
        this.setState({
            editDeckSelected: false
        })
    }

    render() {
        // variable component that renders based on the user's actions
        let renderEditDeck = <UserDecksList
            user={this.state.user}
            handleCreateDeckSelected={this.handleCreateDeckSelected}
            handleEditDeckSelected={this.handleEditDeckSelected}
        />
        if (this.state.editDeckSelected) {
            renderEditDeck = <EditDeckMain
                user={this.state.user}
                deck={this.state.editDeckChosen}
                handleFinishDeckEditing={this.handleFinishDeckEditing}
            />
        } else if (this.state.createDeckSelected) {
            renderEditDeck = <CreateDeckMain user={this.state.user} />
        }
        return (
            <div>
                {renderEditDeck}
            </div>
        )
    }
}