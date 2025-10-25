import React, {useState} from "react";
import "./Register.css";
import { register as apiRegister } from './api';
import {  useNavigate } from "react-router-dom";
import yai from "./assets/yai.png";


// import { Link } from "react-router-dom";



function Register() {
    const [userName, setUserName] = useState("");
    const [userId, setUserId] = useState("");
    const [email, setEmail] = useState("")
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    // const [submitedButton, setSubmitedButton] = useState(null);
    // const [dpPreview, setDpPreview] = useState(null);
    const [msg, setMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const resp = await apiRegister(userName,userId, email,mobile, password);
            setMsg('Registration successful. You can login now.');
            setTimeout(()=>{
                navigate("/");
            },1500);
        }   catch (err) {
            console.error(err);
            setMsg(err.response?.data?.message || 'Error registering');
        } finally {
            setIsLoading(false);
        }
        }
    
    return(
        <div className="container-reg">
            <div >
                <h1><img src={yai} alt="image"></img> Registration Page for New Users</h1>
            </div>
            <form onSubmit={handleSubmit} >
                <div className="input-des">
                    <label >User Name: </label>
                    <input value={userName} type="text" onChange={(e) => setUserName(e.target.value)} autoComplete="off" placeholder="Enter Your Name" required />
                    <label >User Id: </label>
                    <input value={userId} type="text" onChange={(e) => setUserId(e.target.value)} placeholder="Enter User ID " required  />
                    <label >Mobile Number: </label>
                    <input value={mobile} type="number" onChange={(e) => setMobile(e.target.value)} placeholder="Enter Your Mobile Number" required />
                    <label >Email: </label>
                    <input value={email} type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email Id" required />
                    <label >Password: </label>
                    <input value={password} type="password" onChange={(e) => setPassword(e.target.value)} placeholder="password" required />
                </div>
                <div className="button-des">
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? "Registering..." : "Register"}
                    </button>
                </div>
                {msg && (
                        <p style={{ color: msg.includes("successful") ? "green" : "red" }}>{msg}</p>
                    )}
            </form>
            {/* <p>
                Already have an account? <Link to="/">Login Now</Link>
            </p> */}
        </div>
    );
    }



export default Register;