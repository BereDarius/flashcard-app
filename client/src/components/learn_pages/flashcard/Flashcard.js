import React from "react";
import { Card, Button } from 'react-bootstrap';
import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class Flashcard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            face: "",
            back: "",
            status: "Face",
            showing: ""
        }
    }

    /*
    After the component mounts, set the face, the back and what is shown initially to the user (i.e. the card's face)
     */
    componentDidMount() {
        this.setState({
            face: this.props.face,
            back: this.props.back,
            showing: this.props.face
        })
    }

    /*
    Method that switches the showing and status states form face to back and the other way around, flipping the flashcard
     */
    flipFlashcard = () => {
        let showingText = this.state.showing === this.state.face ? this.state.back : this.state.face
        let statusText = this.state.status === "Face" ? "Back" : "Face"
        this.setState({
            showing: showingText,
            status: statusText
        })
    }

    /*
    The Flashcard component updates when the face and back states change,
    so when this happens, reset the status state to "Face" and showing state to the flashcard's face
    (so when the user goes to another flashcard, it initially shows the face)
     */
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.face !== this.props.face && prevProps.back !== this.props.back) {
            this.setState({
                face: this.props.face,
                back: this.props.back,
                showing: this.props.face,
                status: "Face"
            })
        }
    }

    render() {
        return (
            <Card className="text-center">

                <Card.Header>{this.state.status}</Card.Header>

                <Card.Body>

                    <Card.Title className="display-4 my-5">{this.state.showing}</Card.Title>

                    <Button
                        className="w-50"
                        variant="primary"
                        size="lg"
                        onClick={this.flipFlashcard}
                    >
                        Flip
                    </Button>

                    <div className="my-5">

                        <Button
                            variant="danger"
                            className="mx-1"
                            size="lg"
                            onClick={this.props.handleNotLearned}
                        >
                            <FontAwesomeIcon icon={faX}></FontAwesomeIcon>
                        </Button>

                        <Button
                            variant="success"
                            size="lg"
                            onClick={this.props.handleLearned}
                        >
                            <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
                        </Button>
                    </div>

                </Card.Body>

            </Card>
        )
    }
}