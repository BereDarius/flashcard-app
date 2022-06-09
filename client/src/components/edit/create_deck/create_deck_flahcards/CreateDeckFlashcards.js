import React from "react"
import {Button, Container, Form, FormLabel, Table} from "react-bootstrap";
import {FormErrors} from "../../../../utils/FormErrors";
import axios from "axios";
import qs from "qs";

export default class CreateDeckFlashcards extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            deck: this.props.deck,
            flashcards: [],
            flashcard: {
                face: "",
                back: ""
            },
            formErrors: {
                "Face": "",
                "Back": ""
            },
            faceValid: false,
            backValid: false,
            formValid: false
        }
    }

    /*
    Method that validates every field separately:
        face field must not be empty
        back field must not be empty
     */
    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors
        let faceValid = this.state.faceValid
        let backValid = this.state.backValid

        switch(fieldName) {
            case "face":
                faceValid = value.length > 0
                fieldValidationErrors["Face"] = faceValid ? "" : "field is required"
                break
            case "back":
                backValid = value.length > 0
                fieldValidationErrors["Back"] = backValid ? "" : "field is required"
                break
            default:
                break
        }
        this.setState({
            formErrors: fieldValidationErrors,
            faceValid: faceValid,
            backValid: backValid
        }, this.validateForm)
    }

    /*
    Method that validates the form if every field is valid
     */
    validateForm() {
        this.setState({
            formValid:
                this.state.faceValid &&
                this.state.backValid
        })
    }

    /*
    Method that is called whenever a field from the form is changed
     */
    handleInput = (e) => {
        const name = e.target.name
        const value = e.target.value
        this.setState(prevState => ({
                flashcard: {
                    ...prevState.flashcard,
                    [name]: value
                }
            }),
            () => { this.validateField(name, value) })
    }

    /*
    Method that is called when the user clicks on the "Add flashcard" button
    It creates a new flashcard with the form's values
    It adds the new flashcard to the new deck's list of flashcards
     */
    handleAddFlashcard = () => {
        this.setState({
            flashcards: [...this.state.flashcards, this.state.flashcard],
            flashcard: {
                face: "",
                back: ""
            }
        })
    }

    /*
    Method that is called when the user clicks on the "Delete" button
    It removes the flashcard from the new deck's list of flashcards
     */
    handleDeleteFlashcard = (f) => {
        this.setState({
            flashcards: this.state.flashcards.filter((flashcard) => {
                return flashcard !== f
            })
        })
    }

    /*
    Method that is called when the user clicks on the "Finish deck creation" button
    It adds all the flashcards to the db
     */
    async finishDeckCreation() {
        for (let index=0; index < this.state.flashcards.length; index++) {
            await axios({
                method: 'post',
                url: `http://localhost:5000/api/decks/${this.state.deck._id}/flashcards`,
                data: qs.stringify({
                    face: this.state.flashcards[index].face,
                    back: this.state.flashcards[index].back
                }),
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'Authorization': `Bearer ${this.props.user.token}`
                }
            }).then(res => {
                console.log(res.data)
            }).catch(err => {
                console.log(err.data)
            })
        }
        window.location.reload(false)
    }

    render() {
        return (
            <div>

                <Container className="form-signup text-center py-5">

                    {/*
                    FORM ERRORS
                    */}
                    <FormErrors formErrors={this.state.formErrors} />

                    <Form>
                        <h1 className="h3 mb-5 fw-normal">Add flashcards to your deck</h1>

                        <Form.Group className="form-floating mb-2">
                            <Form.Control type="text"
                                          id="face"
                                          placeholder="Face"
                                          name="face"
                                          value={this.state.flashcard.face}
                                          onChange={(event) => this.handleInput(event)}
                            />
                            <FormLabel htmlFor="face">Face</FormLabel>
                        </Form.Group>

                        <Form.Group className="form-floating mb-2">
                            <Form.Control type="text"
                                          id="back"
                                          placeholder="Back"
                                          name="back"
                                          value={this.state.flashcard.back}
                                          onChange={(event) => this.handleInput(event)}
                            />
                            <FormLabel htmlFor="back">Back</FormLabel>
                        </Form.Group>

                        <div className="d-flex">

                            <Button
                                variant="primary"
                                size="lg"
                                className="mx-2 w-75 mt-5"
                                type="button"
                                disabled={!this.state.formValid}
                                onClick={this.handleAddFlashcard}
                            >
                                Add flashcard
                            </Button>

                            <Button
                                variant="success"
                                size="lg"
                                className="w-75 mt-5"
                                type="button"
                                onClick={this.finishDeckCreation.bind(this)}
                            >
                                Finish deck creation
                            </Button>

                        </div>

                    </Form>

                </Container>

                <Container className={"text-center pb-5"}>
                    <Table striped bordered hover className="my-5">
                        <thead>
                        <tr>
                            <th>Face</th>

                            <th>Back</th>

                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.flashcards.map((flashcard, index) => {
                            return (
                                <tr key={index}>
                                    <td>{flashcard.face}</td>

                                    <td>{flashcard.back}</td>

                                    <td className="d-flex justify-content-center">
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
                </Container>

            </div>
        )
    }
}