import React from "react"
import "./Login.css"
import {Form, FormLabel, Button, Container} from "react-bootstrap"
import {FormErrors} from "../../../utils/FormErrors";
import UserContext from "../UserContext";
import {Link} from "react-router-dom";
import axios from "axios";
import qs from "qs";
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export default class LogIn extends React.Component {

    static contextType = UserContext

    constructor(props) {
        super(props)
        this.state = {
            userData: {
                email: "",
                password: ""
            },
            formErrors: {
                "Email": "",
                "Password": ""
            },
            emailValid: false,
            passwordValid: false,
            formValid: false
        }
    }

    /*
    Method that validates every field separately:
        email field must not be empty
        password field must not be empty
     */
    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors
        let emailValid = this.state.emailValid
        let passwordValid = this.state.passwordValid

        switch(fieldName) {
            case "email":
                emailValid = value.length > 0
                fieldValidationErrors["Email"] = emailValid ? "" : "field is required"
                break
            case "password":
                passwordValid = value.length > 0
                fieldValidationErrors["Password"] = passwordValid ? "" : "field is required"
                break
            default:
                break
        }
        this.setState({
            formErrors: fieldValidationErrors,
            emailValid: emailValid,
            passwordValid: passwordValid
        }, this.validateForm)
    }

    /*
    Method that validates the form if every field is valid
     */
    validateForm() {
        this.setState({
            formValid:
                this.state.emailValid &&
                this.state.passwordValid
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
    Method that handles the event where the user clicks on the "Login" button
     */
    handleLogIn = () => {
        axios({
            method: 'post',
            url: 'http://localhost:5000/api/users/login/',
            data: qs.stringify({
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
            if (err.response.data.message === "Invalid credentials") {
                console.log(err.response)
                toast.error("Invalid credentials")
            }
        })
    }

    render() {
        return (
            <Container className="form-signin text-center py-5">

                {/*
                FORM ERRORS
                */}
                <FormErrors formErrors={this.state.formErrors} />
                <ToastContainer className="toast-position" />
                <Form>
                    <h1 className="h3 mb-5 fw-normal">Log in to your account</h1>

                    <Form.Group className="form-floating mb-2">
                        <Form.Control
                            type="email"
                            id="email"
                            placeholder="name@example.com"
                            name="email"
                            value={this.state.userData.email}
                            onChange={(event) => this.handleInput(event)}
                        />
                            <FormLabel htmlFor="email">Email address</FormLabel>
                    </Form.Group>

                    <Form.Group className="form-floating mb-5">
                        <Form.Control
                            type="password"
                            id="password"
                            placeholder="Password"
                            name="password"
                            value={this.state.userData.password}
                            onChange={(event) => this.handleInput(event)}
                        />
                            <FormLabel htmlFor="password">Password</FormLabel>
                    </Form.Group>

                    <Link to="/">
                        <Button
                            variant="primary"
                            size="lg"
                            className="w-75"
                            type="button"
                            disabled={!this.state.formValid}
                            onClick={this.handleLogIn.bind(this)}
                        >
                            Login
                        </Button>
                    </Link>

                    <p className="mt-5 mb-3 text-muted">&copy; 2022</p>
                </Form>
            </Container>
        )
    }
}