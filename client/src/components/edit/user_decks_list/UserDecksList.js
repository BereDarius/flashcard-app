import React from "react";
import {Button, Container, Table} from "react-bootstrap";
import axios from "axios";

export default class UserDecksList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            decksList: []
        }
    }

    componentDidMount() {
        axios({
            method: 'get',
            url: 'http://localhost:5000/api/decks/',
            headers: {
                'Authorization': `Bearer ${this.props.user.token}`
            }
        }).then(res => {
            this.setState({
                decksList: res.data
            })
        })
    }

    handleDeleteDeck = (deck) => {
        axios({
            method: 'delete',
            url: `http://localhost:5000/api/decks/${deck._id}`,
            headers: {
                'Authorization': `Bearer ${this.props.user.token}`
            }
        }).then(res => {
            console.log(res.data)
            window.location.reload(false)
        }).catch(err => {
            console.log(err.response)
        })
    }

    render() {
        return (
            <Container className="text-center">

                <Button
                    variant="outline-primary"
                    size="lg"
                    className="mt-5"
                    onClick={this.props.handleCreateDeckSelected}
                >
                    Create new deck
                </Button>

                <Table striped bordered hover className="my-5">

                    <thead>
                        <tr>
                            <th>Title</th>

                            <th>Subject</th>

                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody className={"text-center"}>
                    {this.state.decksList.map(deck => {
                        return (
                            <tr key={deck._id}>
                                <td>{deck.title}</td>

                                <td>{deck.subject}</td>

                                <td>
                                    <Button
                                        variant="outline-primary"
                                        size="sm"
                                        className="w-100"
                                        onClick={() => this.props.handleEditDeckSelected(deck)}
                                    >
                                        Edit
                                    </Button>

                                    <Button variant="outline-danger"
                                            size="sm"
                                            className="mt-1 w-100"
                                            type="submit"
                                            onClick={() => this.handleDeleteDeck(deck)}
                                    >
                                        Delete
                                    </Button>

                                </td>
                            </tr>
                        )
                    })}
                    </tbody>

                </Table>
            </Container>
        )
    }
}