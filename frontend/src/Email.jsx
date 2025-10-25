import React, { useState } from "react";
import "./Register.css";
import Chat from "./Chat.jsx";
import { loginWithEmail } from './api'; // ✅ updated function name
import { useNavigate } from "react-router-dom";
import yai from "./assets/yai.png";


function Email() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const resp = await loginWithEmail(email, password); // ✅ use updated function
            setMsg("Login successful!");

            // Optional: store token
            // localStorage.setItem("token", resp.data.token);

            navigate("/chat", {
                state: { senderId: email, receiverId: 'anotherUserId' }
        }); // change to your actual route
        } catch (err) {
            console.error(err);
            setMsg(err.response?.data?.message || "Login failed. Please try again.");
        }
    };

    return (
        <div className="container-reg">
            <div>
                <h1><img src={yai} alt="image"></img>Login Page</h1>
            </div>
            <form onSubmit={handleLogin}>
                <div className="input-des">
                    <label>Email:</label>
                    <input
                        value={email}
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                    />
                    <label>Password:</label>
                    <input
                        value={password}
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                    />
                </div>
                <div className="button-des">
                    <button type="submit">Login</button>
                </div>

                {msg && (
                    <p style={{ color: msg.includes("success") ? "green" : "red" }}>{msg}</p>
                )}
            </form>
        </div>
    );
}

export default Email;
