import React from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import { faFacebookF, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class Footer extends React.Component {
    render() {
        return (
            <footer className="footer">
                <Container>
                    <div className="d-flex justify-content-between">
                        <span className="text-muted">Flashcard App</span>
                        <span>
                            <Link className="text-muted me-3" to="/">
                                <FontAwesomeIcon icon={faFacebookF}></FontAwesomeIcon>
                            </Link>
                            <Link className="text-muted me-3" to="/">
                                <FontAwesomeIcon icon={faInstagram}></FontAwesomeIcon>
                            </Link>
                            <Link className="text-muted me-3" to="/">
                                <FontAwesomeIcon icon={faTwitter}></FontAwesomeIcon>
                            </Link>
                        </span>
                    </div>
                </Container>
            </footer>
        )
    }
}