import React, {SyntheticEvent, useState} from "react";
import {Button, Form} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {Loader} from "../../common/Loader/Loader";

import "./RegistrationForm.css";

interface RegistrationFormValues {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export const RegistrationForm = () => {

    let navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [registrationForm, setRegistrationForm] = useState<RegistrationFormValues>({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const updateForm = (key: string, value: any) => {
        setRegistrationForm(form => ({
            ...registrationForm,
            [key]: value,
        }));
    };

    const saveUser = async (e: SyntheticEvent) => {
        e.preventDefault();

        setLoading(true);

        try {
            const res = await fetch(`http://localhost:8080/api/registration/user
`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(registrationForm),
            });
            const data = await res.json();
            if (data.message) {
                alert(data.message);
            } else {
                alert(`Użytkownik został zarejestrowany`);
                navigate('../login');
            }


        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <Loader/>
    }

    return(
        <Form
            className="registration-form bg-dark text-warning"
            onSubmit={saveUser}
        >
            <h3 style={{textAlign:"center"}} className="mb-5">Registration</h3>
            <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter username"
                    required
                    name='username'
                    value={registrationForm.username}
                    onChange={e => updateForm('username', e.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter email"
                    required
                    name='email'
                    value={registrationForm.email}
                    onChange={e => updateForm('email', e.target.value)}
                />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Enter password"
                    required
                    name='password'
                    value={registrationForm.password}
                    onChange={e => updateForm('password', e.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                <Form.Label>Confirm password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Confirm password"
                    required
                    name='confirmPassword'
                    value={registrationForm.confirmPassword}
                    onChange={e => updateForm('confirmPassword', e.target.value)}
                />
            </Form.Group>

            <Button className="register-form-button" variant="outline-warning" type="submit">
                Register
            </Button>

        </Form>
    )
}