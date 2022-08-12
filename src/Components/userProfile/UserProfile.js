import React, { Component } from "react";
import "./userProfile.css";

export default class UserProfile extends Component {
  
  render() {
    return (
      <div className="main__userprofile">
        <div className="profile__card user__profile__image">
          <div className="profile__image">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU" />
          </div>
          <h4>Amit RG</h4>
          <p>CEO & Founder at Highly Inc</p>
        </div>
        <div className="profile__card">
          <div className="card__header" >
            <h4>Information</h4>
            
          </div>
          <div className="card__content">
           <p  className="info"> 
            Email:amit@richpanel.com<br/>
            First name : Amit<br/>
            Last name  : RG 
            </p>
          </div>
        </div>
      </div>
    );
  }
}