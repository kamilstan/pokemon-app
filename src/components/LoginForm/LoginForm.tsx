import React, {SyntheticEvent, useState} from "react";
import {Button, Form} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {StoreState} from "../../redux-toolkit/store";
import {
    setAccessToken,
    setExpirationTime,
    setId,
    setRole,
    setUsername
} from "../../redux-toolkit/features/user/user-slice";
import jwtDecode from "jwt-decode";
import {Loader} from "../../common/Loader/Loader";

import "./LoginForm.css";
import {apiUrl} from "../../config/api";

interface LoginFormValues {
    email: string;
    password: string;
};

interface AccessToken {
    name: string;
    exp: number;
};

export const LoginForm = () => {

    const { role } = useSelector((store: StoreState) => store.user);
    const dispatch = useDispatch();

    let navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [loginForm, setLoginForm] = useState<LoginFormValues>({
        email: '',
        password: '',
    });

    const updateForm = (key: string, value: any) => {
        setLoginForm(form => ({
            ...loginForm,
            [key]: value,
        }));
    };

    const submitLoginForm = async (e:SyntheticEvent) => {

        e.preventDefault();

        setLoading(true);

        try {
            const res = await fetch(`${apiUrl}/login`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginForm),
            });
            const result = await res.json();
            if (!result.id) {
              alert(result.message)
            }

            if (result.accessToken) {
                const decoded = jwtDecode<AccessToken>(result.accessToken);
                dispatch(setId(result.id));
                dispatch(setAccessToken(result.accessToken));
                dispatch(setExpirationTime(decoded.exp));
                dispatch(setRole(result.role));
                dispatch(setUsername(result.username));
            }

            switch (result.role) {
                case 'admin':
                    navigate(`/${result.id}`);
                    break;
                case 'user':
                    navigate(`/${result.id}`);
                    break;
            }
        } catch (err) {
            console.log(err, 'cos tu nie dziala');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Loader/>
    }

    return (
        <div className="login-wrapper">
            <Form
                className="login-form bg-dark text-warning"
                onSubmit={submitLoginForm}
            >
                <h3 style={{textAlign:"center"}} className="mb-5">Login</h3>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        required
                        name='email'
                        value={loginForm.email}
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
                        placeholder="Password"
                        required
                        name='password'
                        value={loginForm.password}
                        onChange={e => updateForm('password', e.target.value)}
                    />
                </Form.Group>
    
                <Button className="login-form-button" variant="outline-warning" type="submit">
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