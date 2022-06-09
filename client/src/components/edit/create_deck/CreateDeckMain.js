import React from "react"
import CreateDeckDetails from "./create_deck_details/CreateDeckDetails";
import CreateDeckFlashcards from "./create_deck_flahcards/CreateDeckFlashcards";
import axios from "axios";
import qs from "qs";

export default class CreateDeckMain extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: this.props.user,
            deck: {},
            finishDeckData: false
        }
        this.handleFinishDeckData = this.handleFinishDeckData.bind(this)
    }

    /*
    Method that handles the event of a user selecting the "Create deck" button
    It sets the createDeckSelected state to true, s.t. the CreateDeckFlashcards component renders
    It also sets the deck state to the newly created deck to send to the CreateDeckFlashcards component's deck property
     */
    handleFinishDeckData = (d) => {
        axios({
            method: 'post',
            url: 'http://localhost:5000/api/decks/',
            data: qs.stringify({
                subject: d.subject,
                title: d.title
            }),
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${this.state.user.token}`
            }
        }).then(res => {
            this.setState({
                deck: res.data,
            })
        }).catch(err => {
            console.log(err.data)
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.deck !== prevState.deck) {
            this.setState({
                finishDeckData: true
            })
        }
    }

    render() {
        // variable component that renders based on the user's actions
        let renderCreateDeck = <CreateDeckDetails handleFinishDeckData={this.handleFinishDeckData}/>
        if (this.state.finishDeckData) {
            renderCreateDeck = <CreateDeckFlashcards
                deck={this.state.deck}
                user={this.state.user}
            />
        }
        return (
            <div>
                {renderCreateDeck}
            </div>
        )
    }
}