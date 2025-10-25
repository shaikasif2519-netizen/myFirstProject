import React from "react";
import Register from "./Register.jsx";
import Login from "./Login.jsx";
import Email from "./Email.jsx";
import Mobile from "./Mobile.jsx";
import Chat from "./Chat.jsx";
import { useLocation } from 'react-router-dom';

import { BrowserRouter, Routes, Route } from "react-router-dom";


function ChatWrapper() {
  const location = useLocation();
  const { senderId, receiverId } = location.state || {};
  return <Chat senderId={senderId} receiverId={receiverId} />;
}

function App(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/email" element={<Email />} />
                <Route path="/mobile" element={<Mobile />} />
                <Route path="/chat" element={<ChatWrapper />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;