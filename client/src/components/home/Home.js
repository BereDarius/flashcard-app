import React from "react"
import {Button, Col, Container, Image, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import UserContext from "../user_authentication/UserContext";

export default class Home extends React.Component {

    static contextType = UserContext

    render() {
        let secondButton = <Link to="/signup">
                                <Button size="lg" variant="outline-secondary" className="w-100 px-4">
                                    Create a free account
                                </Button>
                           </Link>
        if (Object.keys(this.context.user).length !== 0) {
            secondButton = <Link to="/edit">
                                <Button size="lg" variant="outline-secondary" className="w-100 px-4">
                                    Edit your decks
                                </Button>
                           </Link>
        }
        return (
            <Container className="main col-xxl-8 px-4 py-5" style={{ height: "82vh" }}>
                <Row className="flex-lg-row-reverse align-items-center g-5 py-5">
                    <Col className="col-10 col-sm-8 col-lg-6">
                        <Image src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80"
                               className="d-block mx-lg-auto img-fluid"
                               style={{ borderRadius: "5%" }}
                               alt="Person learning using the computer"
                               loading="lazy" />
                    </Col>
                    <Col className="col-lg-6">
                        <h1 className="display-5 fw-bold lh-1 mb-4">Welcome to Flashcard App</h1>
                        <p className="lead mb-4">Whether you want to learn a new language or prepare yourself for an exam,
                        flashcards are the best way to memorize new things, based around spaced repetition!</p>
                        <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                            <Link to="/learn">
                                <Button size="lg" variant="primary" className="w-100 px-4 me-md-2">Start Learning</Button>
                            </Link>
                            {secondButton}
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }
}