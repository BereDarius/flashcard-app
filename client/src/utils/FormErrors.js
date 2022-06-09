import React from "react"
import {Alert} from "react-bootstrap";

export const FormErrors = ({formErrors}) =>
    <div className="formErrors">
        {Object.keys(formErrors).map((fieldName, i) => {
            if (formErrors[fieldName].length > 0) {
                return (
                    <Alert variant="danger" className="m-0 p-0 border-0" key={i}>
                        <p key={i}>{fieldName} {formErrors[fieldName]}</p>
                    </Alert>
                )
            } else {
                return ""
            }
        })}
    </div>
