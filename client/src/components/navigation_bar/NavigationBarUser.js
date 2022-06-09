import React from "react";
import {Navbar, Nav, Container} from "react-bootstrap";
import { Link } from "react-router-dom";
import UserContext from "../user_authentication/UserContext";

export default class NavigationBarUser extends React.Component {

    static contextType = UserContext

    handleUserLogOut = () => {
        const { setUser } = this.context
        setUser({})
        localStorage.clear()
    }

    render() {
        return (
            <div>
                <Navbar collapseOnSelect bg="light" expand="lg" sticky-top="true">
                    <Container>

                        <Navbar.Brand>
                            <Nav.Link
                                as={Link}
                                href={"/"}
                                to="/"
                                style={{
                                    textDecoration: "none",
                                    color: "black"
                                }}
                            >
                                Flashcard App
                            </Nav.Link>
                        </Navbar.Brand>

                        <Navbar.Toggle aria-controls="basic-navbar-nav" />

                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ms-auto" activeKey="/home">

                                <Nav.Item>
                                    <Nav.Link
                                        as={Link}
                                        href={"/"}
                                        to="/"
                                        style={{
                                            textDecoration: "none",
                                            color: "black"
                                        }}
                                        className="nav-Nav.link"
                                    >
                                        Home
                                    </Nav.Link>
                                </Nav.Item>

                                <Nav.Item>
                                    <Nav.Link
                                        as={Link}
                                        href={"/learn"}
                                        to="/learn"
                                        style={{
                                            textDecoration: "none",
                                            color: "black"
                                        }}
                                        className="nav-Nav.link"
                                    >
                                        Learn
                                    </Nav.Link>
                                </Nav.Item>

                                <Nav.Item>
                                    <Nav.Link
                                        as={Link}
                                        href={"/edit"}
                                        to="/edit"
                                        style={{
                                            textDecoration: "none",
                                            color: "black"
                                        }}
                                        className="nav-Nav.link"
                                    >
                                        My Decks
                                    </Nav.Link>
                                </Nav.Item>

                                <Nav.Item>
                                    <Nav.Link
                                        as={Link}
                                        href="/"
                                        to="/"
                                        style={{
                                            textDecoration: "none",
                                            color: "black"
                                        }}
                                        className="nav-Nav.link"
                                        onClick={this.handleUserLogOut}
                                    >
                                        Log out
                                    </Nav.Link>
                                </Nav.Item>

                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        )
    }
}