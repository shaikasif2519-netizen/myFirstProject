import React from "react";
import { Link } from "react-router-dom";
import { register } from "./api";
import Register from "./Register.jsx";
import Email from "./Email.jsx";
import Mobile from "./Mobile.jsx";
import "./Login.css";
import yai from "./assets/yai.png";



function Login() {
    return(
        <div className="container-log">

            <h1><img src={yai} alt="image"></img> Home Page</h1>
            <section >
                <p>Login using <Link to="/mobile">Mobile Number</Link> </p>
                <p>Login using <Link to="/email">Email</Link></p>
                <p>Don't have a account <Link to="/register" >click here!</Link> </p>
            </section>
        </div>
    );
}

export default Login;