import React from "react";
import {Button, Card, Container, Form, FormLabel} from "react-bootstrap";
import {FormErrors} from "../../../../../utils/FormErrors";
import axios from "axios";
import qs from "qs";

export default class EditFlashcard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: this.props.user,
            deck: this.props.deck,
            flashcard: this.props.flashcard,
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
    Method that is called when the user clicks on the "Update flashcard" button
    It updates the flashcard with the new values
     */
    async handleUpdateFlashcard () {
        await axios({
            method: 'put',
            url: `http://localhost:5000/api/decks/${this.state.deck._id}/flashcards/${this.state.flashcard._id}`,
            data: qs.stringify({
                face: this.state.flashcard.face,
                back: this.state.flashcard.back
            }),
            headers: {
                'Authorization': `Bearer ${this.props.user.token}`
            }
        }).then(res => {
            console.log(res.data)
        }).catch(err => {
            console.log(err.response)
        })
        this.props.handleFlashcardUpdated(this.state.flashcard)
    }

    render() {
        return (
            <Container className="form-signup text-center py-5">

                {/*
                FORM ERRORS
                */}
                <Card bg="danger" text="white" className="mb-5 pt-0 border-0">
                    <FormErrors formErrors={this.state.formErrors} />
                </Card>

                <Form>
                    <h1 className="h3 mb-5 fw-normal">Edit flashcard</h1>

                    <Form.Group className="form-floating mb-2">
                        <Form.Control type="text"
                                      id="flashcard-face"
                                      placeholder="Face"
                                      name="face"
                                      value={this.state.flashcard.face}
                                      onChange={(event) => this.handleInput(event)}
                        />
                        <FormLabel htmlFor="flashcard-face">Face</FormLabel>
                    </Form.Group>

                    <Form.Group className="form-floating mb-2">
                        <Form.Control type="text"
                                      id="flashcard-back"
                                      placeholder="Back"
                                      name="back"
                                      value={this.state.flashcard.back}
                                      onChange={(event) => this.handleInput(event)}
                        />
                        <FormLabel htmlFor="flashcard-back">Back</FormLabel>
                    </Form.Group>

                    <Button
                        variant="primary"
                        size="lg"
                        className="w-75 mt-5"
                        type="button"
                        disabled={!this.state.formValid}
                        onClick={this.handleUpdateFlashcard.bind(this)}
                    >
                        Update flashcard
                    </Button>

                </Form>
            </Container>
        )
    }
}