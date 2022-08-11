import React, { Component } from "react";
import "./chatList.css";
import ChatListItems from "./ChatListItems";
import {HiOutlineMenuAlt1} from "react-icons/hi";
import {AiOutlineReload} from "react-icons/ai";


export default class ChatList extends Component {
  allChatUsers = [
    {
      id: 1,
      name: "Amit RG",
      active: true,
      isOnline: true,
    },
    {
      id: 2,
      name: "Hiten Saxena",
      message:"Awesome Product",
      active: false,
      isOnline: false,
    },

  ];
  constructor(props) {
    super(props);
    this.state = {
      allChats: this.allChatUsers,
    };
  }
  render() {
    return (
      <div className="main__chatlist">
        <div className="parent">
        <i className="logo1"><HiOutlineMenuAlt1></HiOutlineMenuAlt1></i>
          <span className="Convo"> Conversation</span>
          <i className="logo2"><AiOutlineReload></AiOutlineReload></i>
          </div>
          
        
        
        <div className="chatlist__items">
          {this.state.allChats.map((item, index) => {
            return (
              <ChatListItems
                name={item.name}
                key={item.id}
                animationDelay={index + 1}
                active={item.active ? "active" : ""}
                message={item.message}
                isOnline={item.isOnline ? "active" : ""}
              />
            );
          })}
        </div>
      </div>
    );
  }
}