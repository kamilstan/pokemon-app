import React from "react";
import {Button, Form} from "react-bootstrap";
import {Link} from "react-router-dom";

import "./LoginForm.css"

export const LoginForm = () => {
    return (
        <div className="login-wrapper">
            <Form className="lg-m-5 mx-auto my-5 p-5 w-50 bg-dark text-warning">
                <h3 style={{textAlign:"center"}} className="mb-5">Login</h3>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" required />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
    
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" required/>
                </Form.Group>
    
                <Button variant="outline-warning" type="submit">
                    Login
                </Button>
                <p className="text-muted mt-5">Do you have an account?</p>
                <Link  to={'/registration'}>
                    <Button style={{backgroundColor:"#FFC107", color:"black"}} variant="outline-warning">
                        Sign up
                    </Button>
                </Link>
            </Form>

        </div>
    )
}