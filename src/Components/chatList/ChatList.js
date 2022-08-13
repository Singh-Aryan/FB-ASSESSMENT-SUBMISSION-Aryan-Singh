import React, { Component } from "react";
import "./chatList.css";
import ChatListItems from "./ChatListItems";
import {HiOutlineMenuAlt1} from "react-icons/hi";
import {AiOutlineReload} from "react-icons/ai";
import { ref, onChildAdded, onValue} from "firebase/database";
import { rdb } from "../../firebase"
export default class ChatList extends Component {
  allChatUsers = [
    {
      name: "",
      time: ""
    },
  ];
  constructor(props) {
    super(props);
    this.state = {
      allChats: this.allChatUsers,
    };

    const dbref = ref(rdb, "messages"); 
    onChildAdded(dbref, (snapshot) => {
      localStorage.setItem('Name', `${snapshot.val().first_name}`);
      localStorage.setItem('Time', `${snapshot.val().time}`);
      localStorage.setItem('Message', `${snapshot.val().message}`);
   })
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
                name={localStorage.getItem('Name')}
                animationDelay={index + 1}
                time={localStorage.getItem('Time')}
                message={localStorage.getItem('Message')}
              />
            );
          })}
        </div>
      </div>
    );
  }
}