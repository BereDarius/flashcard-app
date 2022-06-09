import React from "react"
import {Badge, Container, Form, FormLabel, ListGroup} from "react-bootstrap";
import {Link} from "react-router-dom";
import axios from "axios";

export default class LearnDecksList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            decksList: [],
            filteredDecksList: [],
            deckSelected: false
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:5000/api/decks/all`)
            .then(res => {
                const decks = res.data
                this.setState(prevState => (
                    {
                        ...prevState,
                        decksList: decks,
                        filteredDecksList: decks
                    }
                ))
            })
    }

    /*
    Method that handles the search field change
    It sets the decksList state to a filtered decks list based on the search field value
     */
    inputHandler = (e) => {
        let lowerCaseInput = e.target.value.toLowerCase()
        let filteredDeck = this.state.decksList.filter(d => {
            if (lowerCaseInput === "") {
                return d
            } else {
                return d.subject.toLowerCase().startsWith(lowerCaseInput)
            }
        })
        this.setState({
            filteredDecksList: filteredDeck
        })
    }

    render() {
        return (
            <Container className={"my-5"} style={{paddingBottom: "60px"}}>

                <Form.Group className="form-floating my-5 w-100">
                    <Form.Control type="text" id="floatingInput"
                                  placeholder="Languages" onChange={this.inputHandler} />
                    <FormLabel htmlFor="floatingInput">Search subject</FormLabel>
                </Form.Group>

                <ListGroup>
                {this.state.filteredDecksList.map(deck => {
                    return (
                        <ListGroup.Item
                            key={deck._id}
                            as="li"
                            className="d-flex justify-content-between align-items-start"
                        >
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">
                                    <Link
                                        to="#"
                                        onClick={() => this.props.handleDeckChosen(deck._id)}
                                        style={{
                                            textDecoration: "none"
                                        }}
                                    >
                                        {deck.title}
                                    </Link>
                                </div>
                                Subject: {deck.subject} <br/>
                                Author: {deck.author} <br/>
                                Created: {`${Date(deck.createdAt).split(" ")[1]} ${Date(deck.createdAt).split(" ")[3]}`}
                            <br/>
                            </div>
                            <Badge bg="primary" pill>
                                {deck.numberOfCards}
                            </Badge>
                        </ListGroup.Item>
                    )
                })}
                </ListGroup>
            </Container>
        )
    }
}