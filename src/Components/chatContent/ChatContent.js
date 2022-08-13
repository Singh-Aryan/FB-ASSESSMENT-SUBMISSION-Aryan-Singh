import React, { Component, useState, createRef, useEffect } from "react";
import { ref, onChildAdded, onValue} from "firebase/database";
import "./chatContent.css";
import Avatar from "../chatList/Avatar";
import ChatItem from "./ChatItem";
import { rdb } from "../../firebase"
import axios from 'axios';

function sendmsgtouser(recipentid, text)
{
   var access_token = "EAANK1zVBtcoBAO9eyM35LcXgiYc"+"NSmbqFN40nq0NdHmbhyf68hcQx85tEd4it"+"nYUl2qWZBvdGA0rflkBCN8Ym1P220EjT"+"e1gKp3rRZB2Jlt4vZAsuZARWpobLNep56de"+"GCtYhMyxsGwF5WbFZA4k0aiVWmS5A9utBnev16Hdx"+"0BZAMP4kZBLrpL";
   var options = {
    method: 'POST',
    url: `https://graph.facebook.com/v14.0/me/messages?access_token=${access_token}`,
    data: {
      messaging_type: 'Response',
      recipient: {id: recipentid},
      message: {text: text}
    }
  };
  axios.request(options);
}

export default class ChatContent extends Component {
  messagesEndRef = createRef(null);

  chatItms = [
    {
      senderid : "",
      msg : "Welcome to FB Test",
      timestamp : "",
      date : "",
      time : "",
      first_name : "",
      last_name : "",
      profile_pic : "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
      type: "",
    }
  ];
  constructor(props) {
    super(props);
    this.state = {
      chat: this.chatItms,
      message: "",
      first_name : "",
      recipentid : "",
    };

    const dbref = ref(rdb, "messages"); 
    onChildAdded(dbref, (snapshot) => {

      this.setState({ first_name: snapshot.val().first_name})
      this.setState({ recipentid: snapshot.val().senderid})

      this.chatItms.push({
        senderid : snapshot.val().senderid,
        msg : snapshot.val().message,
        timestamp : snapshot.val().timestamp,
        date : snapshot.val().date,
        time : snapshot.val().time,
        first_name : snapshot.val().first_name,
        last_name : snapshot.val().last_name,
        profile_pic : snapshot.val().profile_pic,
        type: "other",
      });
      this.setState({ chat: [...this.chatItms] });
   })
  }

  scrollToBottom = () => {
    this.messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  componentDidMount() {
    window.addEventListener("keydown", (e) => {
      if (e.keyCode == 13) {
        if (document.getElementById('sendmsg').value != "") {
          this.chatItms.push({
            profile_pic : "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
            type: "",
            msg: document.getElementById('sendmsg').value,
          });
          this.setState({ chat: [...this.chatItms] });
          sendmsgtouser(this.state.recipentid, document.getElementById('sendmsg').value)
          this.scrollToBottom();
          document.getElementById('sendmsg').value = "";
        }
      }
    });
    this.scrollToBottom();
  }

  render() {
    const dbref = ref(rdb, "messages"); 
    onValue(dbref, (snapshot) => {
      for (var index = 0; index < this.chatItms.length; ++index) {
      var test = this.chatItms[index];
        if(test.timestamp != snapshot.val().timestamp && snapshot.val().senderid)
        {
          this.chatItms.push({
            senderid : snapshot.val().senderid,
            msg : snapshot.val().message,
            timestamp : snapshot.val().timestamp,
            date : snapshot.val().date,
            time : snapshot.val().time,
            first_name : snapshot.val().first_name,
            last_name : snapshot.val().last_name,
            profile_pic : snapshot.val().profile_pic,
            type: "other",
          });
          this.setState({ chat: [...this.chatItms] });
        }
      }
    });
    return (
      <div className="main__chatcontent">
        <div className="content__header">
          <div className="blocks">
            <div className="current-chatting-user">
                <p>{this.state.first_name}</p>
            </div>
          </div>

          <div className="blocks">
            <div className="settings">
              <button className="btn-nobg">
                <i className="fa fa-cog"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="content__body">
          <div className="chat__items">
          {this.state.chat.map((itm, index) => {
              return (
                <ChatItem
                  animationDelay={index + 2}
                  user={itm.type ? itm.type : "me"}
                  msg={itm.msg}
                  image={itm.profile_pic}
                />
              );
            })}
            <div ref={this.messagesEndRef} />
          </div>
        </div>
        <div className="content__footer">
          <div className="sendNewMessage">
            <input
              type="text"
              placeholder="Type a message here"
              id="sendmsg"
            />
          </div>
        </div>
      </div>
    );
  }
}
