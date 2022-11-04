import React from "react";
import {Button, Form} from "react-bootstrap";

export const RegistrationForm = () => {
    return(
        <Form className="lg-m-5 mx-auto my-5 p-5 w-50 bg-dark text-warning">
            <h3 style={{textAlign:"center"}} className="mb-5">Registration</h3>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter username" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" required />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter password" required/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Confirm password</Form.Label>
                <Form.Control type="password" placeholder="Confirm password" required/>
            </Form.Group>

            <Button variant="outline-warning" type="submit">
                Register
            </Button>

        </Form>
    )
}