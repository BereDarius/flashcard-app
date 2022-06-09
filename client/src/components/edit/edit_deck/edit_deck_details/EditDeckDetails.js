import React from "react";
import {Button, Card, Container, Form, FormLabel} from "react-bootstrap";
import {FormErrors} from "../../../../utils/FormErrors";
import axios from "axios";
import qs from "qs";

export default class EditDeckDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            deck: this.props.deck,
            user: this.props.user,
            formErrors: {
                "Title": "",
                "Subject": ""
            },
            titleValid: false,
            subjectValid: false,
            formValid: false
        }
    }

    /*
    Method that validates every field separately:
        title field must not be empty
        subject field must not be empty
     */
    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors
        let titleValid = this.state.titleValid
        let subjectValid = this.state.subjectValid

        switch(fieldName) {
            case "title":
                titleValid = value.length > 0
                fieldValidationErrors["Title"] = titleValid ? "" : "field is required"
                break
            case "subject":
                subjectValid = value.length > 0
                fieldValidationErrors["Subject"] = subjectValid ? "" : "field is required"
                break
            default:
                break
        }
        this.setState({
            formErrors: fieldValidationErrors,
            titleValid: titleValid,
            subjectValid: subjectValid
        }, this.validateForm)
    }

    /*
    Method that validates the form if every field is valid
     */
    validateForm() {
        this.setState({
            formValid:
                this.state.titleValid &&
                this.state.subjectValid
        })
    }

    /*
    Method that is called whenever a field from the form is changed
     */
    handleInput = (e) => {
        const name = e.target.name
        const value = e.target.value
        this.setState(prevState => ({
                deck: {
                    ...prevState.deck,
                    [name]: value
                }
            }),
            () => { this.validateField(name, value) })
    }

    handleUpdateDeckDetails() {
        axios({
            method: 'put',
            url: `http://localhost:5000/api/decks/${this.state.deck._id}`,
            data: qs.stringify({
                title: this.state.deck.title,
                subject: this.state.deck.subject
            }),
            headers: {
                'Authorization': `Bearer ${this.props.user.token}`
            }
        }).then(res => {
            console.log(res.data)
        }).catch(err => {
            console.log(err.response)
        })
    }

    render() {
        return (
            <Container className="form-signup text-center pb-5">

                {/*
                FORM ERRORS
                */}
                <Card bg="danger" text="white" className="mb-5 pt-0 border-0">
                    <FormErrors formErrors={this.state.formErrors} />
                </Card>

                <Form>
                    <h1 className="h3 mb-5 fw-normal">Edit your deck</h1>

                    <Button
                        className="mb-5"
                        variant="outline-success"
                        size="lg"
                        onClick={this.props.handleFinishDeckEditing}
                    >
                        Finish deck editing
                    </Button>

                    <Form.Group className="form-floating mb-2">
                        <Form.Control type="text"
                                      id="title"
                                      placeholder="Title"
                                      name="title"
                                      value={this.state.deck.title}
                                      onChange={(event) => this.handleInput(event)}
                        />
                        <FormLabel htmlFor="deck-title">Title</FormLabel>
                    </Form.Group>

                    <Form.Group className="form-floating mb-2">
                        <Form.Control type="text"
                                      id="subject"
                                      placeholder="Subject"
                                      name="subject"
                                      value={this.state.deck.subject}
                                      onChange={(event) => this.handleInput(event)}
                        />
                        <FormLabel htmlFor="deck-subject">Subject</FormLabel>
                    </Form.Group>

                    <Button
                        variant="primary"
                        size="lg"
                        className="w-75 mt-5"
                        type="button"
                        disabled={!this.state.formValid}
                        onClick={this.handleUpdateDeckDetails.bind(this)}
                    >
                        Update deck details
                    </Button>
                    <Button
                        variant="outline-primary"
                        size="lg"
                        className="w-75 mt-5"
                        type="button"
                        disabled={this.state.deck.title === "" || this.state.deck.subject === ""}
                        onClick={() => this.props.handleEditDeckFlashcardsSelected(this.state.deck)}
                    >
                        Edit this deck's flashcards
                    </Button>
                </Form>
            </Container>
        )
    }
}