import React from 'react';
import '../App.css';
import Nav from '../Components/Nav/nav';
import ChatBody from "../Components/chatBody/ChatBody";
import Home from "../pages/signuppage/home";

function Dash() {
  return (
    <div className="__main">
      <Nav/>
      <ChatBody />
    </div>
  );
}

export default Dash;
