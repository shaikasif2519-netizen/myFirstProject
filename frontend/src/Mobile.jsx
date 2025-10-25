import React, { useState } from "react";
import "./Register.css";
import Chat from "./Chat.jsx";
import {  loginWithMobile } from './api'; // ✅ updated function name
import { useNavigate } from "react-router-dom";
import yai from "./assets/yai.png";


function Mobile() {
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const resp = await loginWithMobile(mobile, password); // ✅ use updated function
            setMsg("Login successful!");

            // Optional: store token
            // localStorage.setItem("token", resp.data.token);

            navigate("/chat", {
                state: { senderId: mobile, receiverId: 'anotherUserId' }
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
                    <label>Mobile Number:</label>
                    <input
                        value={mobile}
                        type="number"
                        onChange={(e) => setMobile(e.target.value)}
                        placeholder="Enter your mobile"
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

export default Mobile;
