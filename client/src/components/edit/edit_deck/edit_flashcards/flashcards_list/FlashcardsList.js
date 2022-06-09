import React from "react";
import {Button, Container, Table} from "react-bootstrap";
import axios from "axios";

export default class FlashcardsList extends React.Component  {
    constructor(props) {
        super(props)
        this.state = {
            user: this.props.user,
            deck: this.props.deck,
            flashcards: this.props.flashcards,
            deletedFlashcardId: 0
        }
    }

    componentDidMount() {
        axios({
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
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.deletedFlashcardId !== prevState.deletedFlashcardId) {
            axios({
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
        }
    }

    async handleDeleteFlashcard(f) {
        await axios({
            method: 'delete',
            url: `http://localhost:5000/api/decks/${this.state.deck._id}/flashcards/${f._id}`,
            headers: {
                'Authorization': `Bearer ${this.state.user.token}`
            }
        }).then(res => {
            this.setState({
                deletedFlashcardId: res.data.id
            })
        }).catch(err => {
            console.log(err.response)
        })
        this.props.handleFlashcardDeleted(this.state.deletedFlashcardId)
    }

    render() {
        return (
            <Container className={"text-center"}>

                <Button
                    className="mt-5"
                    variant="outline-primary"
                    size="lg"
                    onClick={this.props.handleCreateFlashcardSelected}
                >
                    Create new flashcard
                </Button>

                <Table striped bordered hover className="my-5">
                    <thead>
                    <tr>
                        <th>Face</th>

                        <th>Back</th>

                        <th className="w-25">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.flashcards.map(flashcard => {
                        return (
                            <tr key={flashcard._id}>
                                <td>{flashcard.face}</td>

                                <td>{flashcard.back}</td>

                                <td className="d-flex justify-content-center">

                                    <Button variant="outline-primary"
                                            size="sm"
                                            onClick={() => this.props.handleEditFlashcardSelected(flashcard)}
                                    >
                                        Edit
                                    </Button>

                                    <br />

                                    <Button variant="outline-danger"
                                            size="sm"
                                            className="mx-1"
                                            onClick={() => this.handleDeleteFlashcard(flashcard)}
                                    >
                                        Delete
                                    </Button>

                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </Table>

                <Button
                    className="mb-5"
                    variant="outline-success"
                    size="lg"
                    onClick={this.props.handleFinishDeckEditing}
                >
                    Finish deck editing
                </Button>

            </Container>
        )
    }
}