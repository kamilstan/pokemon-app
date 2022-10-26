import React from "react";
import {Button, Form} from "react-bootstrap";

import "./SearchingBar.css"

export const SearchingBar = () => {
    return (
        <>
            <Form className="p-3 w-100 searching-form">

                <Form.Group className="w-100 searching-input" controlId="formBasicEmail">
                    <Form.Label className="font-monospace w-50 mx-5 searching-label">Find your pokemon card!</Form.Label>
                    <Form.Control className="w-50 mx-4 py-2 px-3" type="text" placeholder="Enter pokemon name" required />
                </Form.Group>
                         <Button variant="outline-warning" className="py-2 px-5 " type="submit">Search</Button>
            </Form>
        </>

    )
}