import React from "react";
import {Navbar, Nav, Container} from "react-bootstrap";
import { Link } from "react-router-dom";

export default class NavigationBarNoUser extends React.Component {
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
                                        href={"/login"}
                                        to="/login"
                                        style={{
                                            textDecoration: "none",
                                            color: "black"
                                        }}
                                        className="nav-Nav.link"
                                    >
                                        Log In
                                    </Nav.Link>
                                </Nav.Item>

                                <Nav.Item>
                                    <Nav.Link
                                        as={Link}
                                        href={"/signup"}
                                        to="/signup"
                                        style={{
                                            textDecoration: "none",
                                            color: "black"
                                        }}
                                        className="nav-Nav.link"
                                    >
                                        Sign Up
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