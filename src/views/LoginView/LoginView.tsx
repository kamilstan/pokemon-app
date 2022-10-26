import React from "react";
import {PageNavbar} from "../../components/PageNavbar/PageNavbar";
import {LoginForm} from "../../components/LoginForm/LoginForm";

export const LoginView = () => {
    return (
        <>
            <PageNavbar/>
            <LoginForm/>
        </>
    )
}