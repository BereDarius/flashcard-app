import React from "react"
import "./SignUp.css"
import {Form, FormLabel, Button, Container} from "react-bootstrap"
import {FormErrors} from "../../../utils/FormErrors";
import UserContext from "../UserContext";
import {Link} from "react-router-dom";
import axios from "axios";
import qs from 'qs'
import {toast, ToastContainer} from "react-toastify";

export default class SignUp extends React.Component {

    static contextType = UserContext

    constructor(props) {
        super(props)
        this.state = {
            userData: {
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                passwordConfirm: ""
            },
            formErrors: {
                "First name": "",
                "Last name": "",
                "Email": "",
                "Password": "",
                "Confirm password": "",
            },
            firstNameValid: false,
            lastNameValid: false,
            emailValid: false,
            passwordValid: false,
            passwordConfirmValid: false,
            formValid: false,
            redirectLink: ""
        }
    }

    /*
    Method that validates every field separately:
        first name field must not be empty
        last name field must not be empty
        email field must be of form "example@domain.com"
        password field must not be empty
        password confirm field value must match the password field value
     */
    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors
        let firstNameValid = this.state.firstNameValid
        let lastNameValid = this.state.lastNameValid
        let emailValid = this.state.emailValid
        let passwordValid = this.state.passwordValid
        let passwordConfirmValid = this.state.passwordConfirmValid

        switch(fieldName) {
            case "firstName":
                firstNameValid = value.length > 0
                fieldValidationErrors["First name"] = firstNameValid ? "" : "field is required"
                break
            case "lastName":
                lastNameValid = value.length > 0
                fieldValidationErrors["Last name"] = lastNameValid ? "": "field is required"
                break
            case "email":
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+(\w{2,})$/i)
                fieldValidationErrors["Email"] = emailValid ? "" : "is invalid"
                break
            case "password":
                passwordValid = value.length > 0
                fieldValidationErrors["Password"] = passwordValid ? "" : "field is required"
                break
            case "passwordConfirm":
                passwordConfirmValid = value === this.state.userData.password
                fieldValidationErrors["Confirm password"] = passwordConfirmValid ? "" : "doesn't match"
                break
            default:
                break
        }
        this.setState({
            formErrors: fieldValidationErrors,
            firstNameValid: firstNameValid,
            lastNameValid: lastNameValid,
            emailValid: emailValid,
            passwordValid: passwordValid,
            passwordConfirmValid: passwordConfirmValid
        }, this.validateForm)
    }

    /*
    Method that validates the form if every field is valid
     */
    validateForm() {
        this.setState({
            formValid:
                this.state.firstNameValid &&
                this.state.lastNameValid &&
                this.state.emailValid &&
                this.state.passwordValid &&
                this.state.passwordConfirmValid
        })
    }

    /*
    Method that is called whenever a field from the form is changed
     */
    handleInput = (e) => {
        const name = e.target.name
        const value = e.target.value
        this.setState(prevState => ({
            userData: {
                ...prevState.userData,
                [name]: value
            }
        }),
            () => { this.validateField(name, value) })
    }

    /*
    Method that handles the event where the user clicks on the "Sign up" button
     */
    handleSignUp = () => {
        // create new user in the database
        axios({
            method: 'post',
            url: 'http://localhost:5000/api/users/',
            data: qs.stringify({
                firstName: this.state.userData.firstName,
                lastName: this.state.userData.lastName,
                email: this.state.userData.email,
                password: this.state.userData.password
            }),
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            }
        }).then(res => {
            const { setUser } = this.context
            setUser(res.data)
            localStorage.setItem('user', JSON.stringify(res.data))
        }).catch(err => {
            if (err.response.data.message === "User already exists") {
                console.log(err.response)
                toast.error("User already exists")
            }
        })
    }

    render() {
        return (
            <Container className="form-signup text-center mb-5" style={{paddingBottom: "120px"}}>

                {/*
                FORM ERRORS
                */}
                <FormErrors formErrors={this.state.formErrors} />
                <ToastContainer className="toast-position" />
                <Form>
                    <h1 className="h3 mb-5 fw-normal">Create your free account</h1>

                    <Form.Group className="form-floating mb-2">
                        <Form.Control type="text"
                                      id="firstName"
                                      name="firstName"
                                      placeholder="John"
                                      value={this.state.userData.firstName}
                                      onChange={(event) => this.handleInput(event)}
                        />
                        <FormLabel htmlFor="firstName">First name</FormLabel>
                    </Form.Group>

                    <Form.Group className="form-floating mb-2">
                        <Form.Control type="text"
                                      id="lastName"
                                      name="lastName"
                                      placeholder="Smith"
                                      value={this.state.userData.lastName}
                                      onChange={(event) => this.handleInput(event)}
                        />
                        <FormLabel htmlFor="lastName">Last name</FormLabel>
                    </Form.Group>

                    <Form.Group className="form-floating mb-2">
                        <Form.Control type="email"
                                      id="email"
                                      name="email"
                                      placeholder="name@example.com"
                                      value={this.state.userData.email}
                                      onChange={(event) => this.handleInput(event)}
                        />
                        <FormLabel htmlFor="floatingInput">Email address</FormLabel>
                    </Form.Group>

                    <Form.Group className="form-floating mb-2">
                        <Form.Control type="password"
                                      id="password"
                                      name="password"
                                      placeholder="Password"
                                      value={this.state.userData.password}
                                      onChange={(event) => this.handleInput(event)}
                        />
                        <FormLabel htmlFor="floatingPassword">Password</FormLabel>
                    </Form.Group>

                    <Form.Group className="form-floating mb-4">
                        <Form.Control type="password"
                                      id="passwordConfirm"
                                      name="passwordConfirm"
                                      placeholder="Password"
                                      value={this.state.userData.passwordConfirm}
                                      onChange={(event) => this.handleInput(event)}
                        />
                        <FormLabel htmlFor="floatingPasswordConfirm">Confirm password</FormLabel>
                    </Form.Group>

                    <Link to="/">
                        <Button
                            variant="primary"
                            size="lg"
                            className="w-75"
                            type="button"
                            disabled={!this.state.formValid}
                            onClick={this.handleSignUp}
                        >
                            Sign up
                        </Button>
                    </Link>

                    <p className="mt-5 mb-3 text-muted">&copy; 2022</p>
                </Form>
            </Container>
        )
    }
}